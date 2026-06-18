"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { logAudit } from "@/lib/audit";

export async function getProfile() {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      firstName: true,
      middleName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      barangay: true,
      city: true,
      province: true,
      region: true,
      streetAddress: true,
      dob: true,
      gender: true,
      createdAt: true,
    },
  });

  if (!user) throw new Error("User not found");
  return user;
}

export async function updateProfile(data: {
  firstName: string
  middleName?: string | null
  lastName: string
  phone: string
  barangay: string
  city: string
  province?: string | null
  region: string
  streetAddress?: string | null
  dob?: string | null
  gender?: string | null
}) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName: data.firstName,
      middleName: data.middleName ?? null,
      lastName: data.lastName,
      phone: data.phone,
      barangay: data.barangay,
      city: data.city,
      province: data.province ?? null,
      region: data.region,
      streetAddress: data.streetAddress ?? null,
      dob: data.dob ? new Date(data.dob) : null,
      gender: data.gender ?? null,
    },
  });

  await logAudit('UPDATE_PROFILE', 'User', session.user.id)

  revalidatePath("/profile");
  return { success: true };
}

export async function deleteAccount(data: {
  email: string
  password: string
}) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Unauthorized");
  if (session.user.role !== "USER") throw new Error("Only USER accounts can be deleted this way");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) throw new Error("User not found");

  if (user.email !== data.email) throw new Error("Email does not match");

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) throw new Error("Incorrect password");

  await prisma.$transaction([
    prisma.faultReport.deleteMany({ where: { reportedById: user.id } }),
    prisma.notification.deleteMany({ where: { userId: user.id } }),
    prisma.searchHistory.deleteMany({ where: { userId: user.id } }),
    prisma.technicianApplication.deleteMany({ where: { applicantId: user.id } }),
    prisma.statusLog.deleteMany({ where: { changedById: user.id } }),
    prisma.inventoryLog.deleteMany({ where: { userId: user.id } }),
    prisma.maintenanceLog.deleteMany({ where: { technicianId: user.id } }),
    prisma.passwordResetToken.deleteMany({ where: { email: user.email } }),
    prisma.user.delete({ where: { id: user.id } }),
  ]);

  await logAudit('DELETE_ACCOUNT', 'User', user.id, JSON.stringify({ email: user.email }))

  revalidatePath("/");
  return { success: true };
}
