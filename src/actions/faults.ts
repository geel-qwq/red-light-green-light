'use server'

import prisma from '@/lib/prisma'
import { FaultType, PoleStatus, ReportStatus, WorkOrderStatus } from '@/lib/generated/prisma'
import { revalidatePath } from 'next/cache'

export async function getFaultReports() {
  return prisma.faultReport.findMany({
    orderBy: { reportedAt: 'desc' },
    include: {
      pole: true,
      // Fixed: Replaced 'name: true' with 'firstName: true, lastName: true'
      reportedBy: { select: { id: true, firstName: true, lastName: true } },
      workOrder: true,
    },
  })
}

export async function createFaultReport(data: {
  poleId: string
  reportedById: string
  description: string
  faultType: FaultType
}) {
  const pole = await prisma.pole.findUnique({ where: { id: data.poleId } })
  if (!pole) throw new Error('Pole not found')

  const report = await prisma.faultReport.create({ data })

  // Auto-flip pole to FAULTY
  await prisma.pole.update({
    where: { id: data.poleId },
    data: { status: PoleStatus.FAULTY },
  })

  // Audit log
  await prisma.statusLog.create({
    data: {
      poleId: data.poleId,
      changedById: data.reportedById,
      fromStatus: pole.status,
      toStatus: PoleStatus.FAULTY,
      reason: `Fault reported: ${data.description}`,
    },
  })

  revalidatePath('/faults')
  revalidatePath('/poles')
  revalidatePath('/')
  return report
}

export async function closeFaultReport(reportId: string, closedById: string) {
  const report = await prisma.faultReport.update({
    where: { id: reportId },
    data: { status: ReportStatus.CLOSED },
  })
  revalidatePath('/faults')
  return report
}

export async function fixFaultReport(
  faultReportId: string,
  technicianId: string,
  resolutionNotes: string
) {
  const report = await prisma.faultReport.findUnique({
    where: { id: faultReportId },
    include: { pole: true },
  })
  if (!report) throw new Error('Fault report not found')
  if (report.status !== ReportStatus.OPEN) throw new Error('Fault report is not open')

  await prisma.workOrder.create({
    data: {
      faultReportId,
      assignedToId: technicianId,
      assignedById: technicianId,
      status: WorkOrderStatus.RESOLVED,
      resolvedAt: new Date(),
      resolutionNotes,
    },
  })

  await prisma.faultReport.update({
    where: { id: faultReportId },
    data: { status: ReportStatus.RESOLVED },
  })

  await prisma.pole.update({
    where: { id: report.poleId },
    data: { status: PoleStatus.ACTIVE },
  })

  await prisma.statusLog.create({
    data: {
      poleId: report.poleId,
      changedById: technicianId,
      fromStatus: report.pole.status,
      toStatus: PoleStatus.ACTIVE,
      reason: `Fault fixed by technician: ${resolutionNotes}`,
    },
  })

  revalidatePath('/faults')
  revalidatePath('/poles')
  revalidatePath('/workorders')
  revalidatePath('/')
}