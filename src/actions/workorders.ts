'use server'

import  prisma  from '@/lib/prisma'
import { PoleStatus, ReportStatus, WorkOrderStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function getWorkOrders() {
  return prisma.workOrder.findMany({
    orderBy: { assignedAt: 'desc' },
    include: {
      faultReport: { include: { pole: true } },
      assignedTo: { select: { id: true, name: true } },
      assignedBy: { select: { id: true, name: true } },
    },
  })
}

export async function createWorkOrder(data: {
  faultReportId: string
  assignedById: string
  assignedToId?: string
}) {
  const order = await prisma.workOrder.create({
    data: {
      ...data,
      status: data.assignedToId ? WorkOrderStatus.ASSIGNED : WorkOrderStatus.PENDING,
    },
  })

  await prisma.faultReport.update({
    where: { id: data.faultReportId },
    data: { status: ReportStatus.IN_PROGRESS },
  })

  revalidatePath('/workorders')
  revalidatePath('/faults')
  return order
}

export async function resolveWorkOrder(
  workOrderId: string,
  resolvedById: string,
  resolutionNotes: string
) {
  const order = await prisma.workOrder.update({
    where: { id: workOrderId },
    data: {
      status: WorkOrderStatus.RESOLVED,
      resolvedAt: new Date(),
      resolutionNotes,
    },
    include: { faultReport: { include: { pole: true } } },
  })

  // Close the fault report
  await prisma.faultReport.update({
    where: { id: order.faultReportId },
    data: { status: ReportStatus.RESOLVED },
  })

  // Flip pole back to ACTIVE
  await prisma.pole.update({
    where: { id: order.faultReport.poleId },
    data: { status: PoleStatus.ACTIVE },
  })

  // Audit log
  await prisma.statusLog.create({
    data: {
      poleId: order.faultReport.poleId,
      changedById: resolvedById,
      fromStatus: order.faultReport.pole.status,
      toStatus: PoleStatus.ACTIVE,
      reason: `Work order resolved: ${resolutionNotes}`,
    },
  })

  revalidatePath('/workorders')
  revalidatePath('/faults')
  revalidatePath('/poles')
  revalidatePath('/')
  return order
}
