"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { FaultType, PoleStatus, ReportStatus, Role } from "@/lib/generated/prisma";
import { createNotification } from "@/actions/notifications";
import { revalidatePath } from "next/cache";

export async function getNearbyFaultyPoles(lat: number, lng: number, radiusKm = 5) {
  const degreeRadius = radiusKm / 111;
  const poles = await prisma.pole.findMany({
    where: {
      status: PoleStatus.FAULTY,
      latitude: { gte: lat - degreeRadius, lte: lat + degreeRadius },
      longitude: { gte: lng - degreeRadius, lte: lng + degreeRadius },
    },
    include: {
      _count: { select: { faultReports: { where: { status: { in: [ReportStatus.OPEN, ReportStatus.IN_PROGRESS] } } } } },
    },
  });
  return poles.map((p) => {
    const dist = Math.sqrt((p.latitude - lat) ** 2 + (p.longitude - lng) ** 2) * 111;
    return { ...p, distanceKm: Math.round(dist * 100) / 100 };
  }).sort((a, b) => a.distanceKm - b.distanceKm);
}

export async function createAnonymousFaultReport(data: {
  poleId: string
  description: string
  faultType: FaultType
  reporterName?: string
  reporterEmail?: string
  reporterPhone?: string
  latitude?: number
  longitude?: number
}) {
  const pole = await prisma.pole.findUnique({ where: { id: data.poleId } });
  if (!pole) throw new Error("Pole not found");

  const report = await prisma.faultReport.create({
    data: {
      poleId: data.poleId,
      description: data.description,
      faultType: data.faultType,
      reporterName: data.reporterName,
      reporterEmail: data.reporterEmail,
      reporterPhone: data.reporterPhone,
      latitude: data.latitude ?? pole.latitude,
      longitude: data.longitude ?? pole.longitude,
      status: ReportStatus.OPEN,
    },
  });

  if (pole.status !== PoleStatus.FAULTY) {
    await prisma.pole.update({
      where: { id: data.poleId },
      data: { status: PoleStatus.FAULTY },
    });
    await prisma.statusLog.create({
      data: {
        poleId: data.poleId,
        changedById: "anonymous",
        fromStatus: pole.status,
        toStatus: PoleStatus.FAULTY,
        reason: `Anonymous fault report: ${data.description}`,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/faults");
  revalidatePath("/poles");
  return report;
}

export async function createUserFaultReport(data: {
  poleId: string
  description: string
  faultType: FaultType
  latitude?: number
  longitude?: number
}) {
  const session = await getSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const pole = await prisma.pole.findUnique({ where: { id: data.poleId } });
  if (!pole) throw new Error("Pole not found");

  const report = await prisma.faultReport.create({
    data: {
      poleId: data.poleId,
      reportedById: session.user.id,
      description: data.description,
      faultType: data.faultType,
      latitude: data.latitude ?? pole.latitude,
      longitude: data.longitude ?? pole.longitude,
    },
  });

  if (pole.status !== PoleStatus.FAULTY) {
    await prisma.pole.update({
      where: { id: data.poleId },
      data: { status: PoleStatus.FAULTY },
    });
    await prisma.statusLog.create({
      data: {
        poleId: data.poleId,
        changedById: session.user.id,
        fromStatus: pole.status,
        toStatus: PoleStatus.FAULTY,
        reason: `Fault reported: ${data.description}`,
      },
    });
  }

  const technicians = await prisma.user.findMany({
    where: { role: Role.TECHNICIAN },
    select: { id: true },
  })
  const poleCode = pole.poleCode
  await Promise.all(technicians.map((t) =>
    createNotification({
      userId: t.id,
      title: 'New Fault Report',
      message: `A new fault report has been submitted for pole ${poleCode} — ${data.faultType}.`,
      type: 'NEW_FAULT_REPORT',
    })
  ))

  revalidatePath("/");
  revalidatePath("/faults");
  revalidatePath("/poles");
  return report;
}

export async function getUserFaultReports() {
  const session = await getSession();
  if (!session?.user?.id) return [];

  return prisma.faultReport.findMany({
    where: { reportedById: session.user.id },
    orderBy: { reportedAt: "desc" },
    include: {
      pole: { select: { poleCode: true, address: true, barangay: true } },
      workOrder: { select: { status: true, resolvedAt: true, resolutionNotes: true } },
    },
  });
}

export async function getMyReportStats() {
  const session = await getSession();
  if (!session?.user?.id) return null;

  const reports = await prisma.faultReport.findMany({
    where: { reportedById: session.user.id },
    include: {
      workOrder: { select: { resolvedAt: true } },
    },
  });

  const total = reports.length;
  const open = reports.filter((r) => r.status === ReportStatus.OPEN).length;
  const inProgress = reports.filter((r) => r.status === ReportStatus.IN_PROGRESS).length;
  const resolved = reports.filter((r) => r.status === ReportStatus.RESOLVED).length;

  const avgResolutionTime = (() => {
    const resolvedReports = reports.filter(
      (r) => r.status === ReportStatus.RESOLVED && r.workOrder?.resolvedAt
    );
    if (resolvedReports.length === 0) return null;
    const totalMs = resolvedReports.reduce((sum, r) => {
      return sum + (r.workOrder!.resolvedAt!.getTime() - r.reportedAt.getTime());
    }, 0);
    const avgHours = totalMs / resolvedReports.length / (1000 * 60 * 60);
    return Math.round(avgHours * 10) / 10;
  })();

  return { total, open, inProgress, resolved, avgResolutionTime };
}

export async function getAllPolesForMap() {
  return prisma.pole.findMany({
    select: {
      id: true,
      poleCode: true,
      latitude: true,
      longitude: true,
      status: true,
      address: true,
      barangay: true,
    },
  });
}
