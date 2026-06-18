"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export interface UnifiedActivity {
  id: string
  type: "FAULT_REPORT" | "TECHNICIAN_APPLICATION" | "SEARCH"
  title: string
  description: string
  timestamp: Date
  status?: string
  metadata?: Record<string, string>
}

export async function getUserActivities(): Promise<UnifiedActivity[]> {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) return [];

  const [faultReports, applications, searches] = await Promise.all([
    prisma.faultReport.findMany({
      where: { reportedById: userId, status: { not: "DELETED" } },
      orderBy: { reportedAt: "desc" },
      take: 10,
      include: { pole: { select: { poleCode: true } } },
    }),
    prisma.technicianApplication.findMany({
      where: { applicantId: userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const activities: UnifiedActivity[] = [
    ...faultReports.map((r) => ({
      id: `fr-${r.id}`,
      type: "FAULT_REPORT" as const,
      title: `Reported fault at ${r.pole.poleCode}`,
      description: r.description,
      timestamp: r.reportedAt,
      status: r.status,
      metadata: { faultType: r.faultType, poleCode: r.pole.poleCode },
    })),
    ...applications.map((a) => ({
      id: `ta-${a.id}`,
      type: "TECHNICIAN_APPLICATION" as const,
      title: "Applied as technician",
      description: a.skills,
      timestamp: a.createdAt,
      status: a.status,
      metadata: { reason: a.reason },
    })),
    ...searches.map((s) => ({
      id: `sh-${s.id}`,
      type: "SEARCH" as const,
      title: `Searched: ${s.title}`,
      description: s.description,
      timestamp: s.createdAt,
    })),
  ];

  activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  return activities.slice(0, 10);
}
