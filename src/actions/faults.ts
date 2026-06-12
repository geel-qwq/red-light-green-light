'use server'

import prisma  from '@/lib/prisma'
import { FaultType, PoleStatus, ReportStatus } from '@/lib/generated/prisma/client'
import { revalidatePath } from 'next/cache'

export async function getFaultReports() {
  return prisma.faultReport.findMany({
    orderBy: { reportedAt: 'desc' },
    include: {
      pole: true,
      reportedBy: { select: { id: true, name: true } },
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
