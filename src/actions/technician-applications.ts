"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notifications";
import { Role } from "@/lib/generated/prisma/client";

export async function applyAsTechnician(data: {
  skills: string;
  reason: string;
}) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Unauthorized");
  if (session.user.role !== "USER") throw new Error("Only users can apply");

  const existing = await prisma.technicianApplication.findFirst({
    where: { applicantId: session.user.id, status: "PENDING" },
  });
  if (existing) throw new Error("You already have a pending application");

  const application = await prisma.technicianApplication.create({
    data: {
      applicantId: session.user.id,
      skills: data.skills,
      reason: data.reason,
    },
  });

  const fullUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { firstName: true, lastName: true, email: true },
  });

  const admins = await prisma.user.findMany({
    where: { role: Role.ADMIN },
    select: { id: true },
  });

  const name = fullUser
    ? `${fullUser.firstName} ${fullUser.lastName}`
    : session.user.name ?? "A user";
  await Promise.all(
    admins.map((a) =>
      createNotification({
        userId: a.id,
        title: "New Technician Application",
        message: `${name} (${fullUser?.email ?? ""}) has applied to become a technician.`,
        type: "TECHNICIAN_APPLICATION",
      })
    )
  );

  revalidatePath("/user/dashboard");
  return application;
}

export async function getTechnicianApplications(status?: string) {
  const session = await getSession();
  if (!session || !["ADMIN", "SUPERADMIN"].includes(session.user.role)) {
    throw new Error("Unauthorized");
  }

  const where: any = {};
  if (status) where.status = status;

  return prisma.technicianApplication.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      applicant: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          barangay: true,
          city: true,
          createdAt: true,
        },
      },
      verifiedBy: {
        select: { id: true, firstName: true, lastName: true },
      },
      rejectedBy: {
        select: { id: true, firstName: true, lastName: true },
      },
    },
  });
}

export async function verifyTechnicianApplication(applicationId: string) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: only ADMIN can verify applications");
  }

  const application = await prisma.technicianApplication.findUnique({
    where: { id: applicationId },
    include: { applicant: { select: { firstName: true, lastName: true } } },
  });
  if (!application) throw new Error("Application not found");
  if (application.status !== "PENDING")
    throw new Error("Application is not pending");

  const [updated] = await prisma.$transaction([
    prisma.technicianApplication.update({
      where: { id: applicationId },
      data: {
        status: "VERIFIED",
        verifiedById: session.user.id,
        verifiedAt: new Date(),
      },
    }),
    prisma.user.update({
      where: { id: application.applicantId },
      data: { role: Role.TECHNICIAN },
    }),
  ]);

  const adminUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { firstName: true, lastName: true },
  });

  const superadmins = await prisma.user.findMany({
    where: { role: Role.SUPERADMIN },
    select: { id: true },
  });

  const applicantName = application.applicant
    ? `${application.applicant.firstName} ${application.applicant.lastName}`
    : "A user";
  const adminName = adminUser
    ? `${adminUser.firstName} ${adminUser.lastName}`
    : "An admin";

  await Promise.all([
    createNotification({
      userId: application.applicantId,
      title: "Application Approved",
      message: `Your technician application has been approved by ${adminName}. You are now a technician!`,
      type: "APPLICATION_VERIFIED",
    }),
    ...superadmins.map((s) =>
      createNotification({
        userId: s.id,
        title: "Technician Application Verified",
        message: `${applicantName}'s application was verified by ${adminName}.`,
        type: "APPLICATION_VERIFIED",
      })
    ),
  ]);

  revalidatePath("/admin/technician-applications");
  revalidatePath("/superadmin/technician-applications");
  return updated;
}

export async function rejectTechnicianApplication(
  applicationId: string,
  reason: string
) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: only ADMIN can reject applications");
  }

  const application = await prisma.technicianApplication.findUnique({
    where: { id: applicationId },
  });
  if (!application) throw new Error("Application not found");
  if (application.status !== "PENDING")
    throw new Error("Application is not pending");

  const updated = await prisma.technicianApplication.update({
    where: { id: applicationId },
    data: {
      status: "REJECTED",
      rejectedById: session.user.id,
      rejectedAt: new Date(),
      rejectedReason: reason,
    },
  });

  const adminUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { firstName: true, lastName: true },
  });

  const adminName = adminUser
    ? `${adminUser.firstName} ${adminUser.lastName}`
    : "An admin";

  await createNotification({
    userId: application.applicantId,
    title: "Application Rejected",
    message: `Your technician application has been rejected by ${adminName}. Reason: ${reason}`,
    type: "APPLICATION_REJECTED",
  });

  revalidatePath("/admin/technician-applications");
  return updated;
}

export async function getMyApplication() {
  const session = await getSession();
  if (!session?.user?.id) return null;

  return prisma.technicianApplication.findFirst({
    where: { applicantId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      verifiedBy: { select: { firstName: true, lastName: true } },
      rejectedBy: { select: { firstName: true, lastName: true } },
    },
  });
}
