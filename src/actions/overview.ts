"use server";

import prisma from "@/lib/prisma";
import { ReportStatus, WorkOrderStatus } from "@/lib/generated/prisma";

export async function getSystemOverview() {
  const [
    recentFix,
    openFaultsCount,
    ongoingMaintenanceCount,
    polesByBarangay,
    recentLogs,
  ] = await Promise.all([
    prisma.workOrder.findFirst({
      where: { status: WorkOrderStatus.RESOLVED },
      orderBy: { resolvedAt: "desc" },
      include: {
        faultReport: { include: { pole: { select: { poleCode: true } } } },
      },
    }),
    prisma.faultReport.count({
      where: { status: { in: [ReportStatus.OPEN, ReportStatus.IN_PROGRESS] } },
    }),
    prisma.pole.count({
      where: { status: "UNDER_MAINTENANCE" },
    }),
    prisma.pole.groupBy({
      by: ["barangay"],
      _count: true,
      orderBy: { _count: { barangay: "desc" } },
    }),
    prisma.statusLog.findMany({
      take: 20,
      orderBy: { changedAt: "desc" },
      include: {
        pole: { select: { poleCode: true } },
        changedBy: { select: { firstName: true, lastName: true } },
      },
    }),
  ]);

  const mostLights = polesByBarangay[0];
  const leastLights = polesByBarangay[polesByBarangay.length - 1];

  function timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return {
    recentFix: recentFix
      ? {
          poleCode: recentFix.faultReport.pole.poleCode,
          timeAgo: timeAgo(new Date(recentFix.resolvedAt!)),
        }
      : null,
    openFaultsCount,
    ongoingMaintenanceCount,
    mostLights: mostLights
      ? { barangay: mostLights.barangay, count: mostLights._count }
      : null,
    leastLights: leastLights
      ? { barangay: leastLights.barangay, count: leastLights._count }
      : null,
    recentLogs: recentLogs.map((log) => ({
      id: log.id,
      poleCode: log.pole.poleCode,
      fromStatus: log.fromStatus,
      toStatus: log.toStatus,
      changedBy: `${log.changedBy.firstName} ${log.changedBy.lastName}`,
      timeAgo: timeAgo(new Date(log.changedAt)),
    })),
  };
}
