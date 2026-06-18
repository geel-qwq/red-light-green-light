'use server'

import  prisma  from '@/lib/prisma'
import { PoleStatus, ReportStatus, WorkOrderStatus } from '@/lib/generated/prisma'
import { revalidatePath } from 'next/cache'
import { createNotification } from './notifications'
import { logAudit } from '@/lib/audit'

export async function getWorkOrders() {
  return prisma.workOrder.findMany({
    orderBy: { assignedAt: 'desc' },
    include: {
      faultReport: { include: { pole: true } },
      assignedTo: { select: { id: true, firstName: true, lastName: true } },
      assignedBy: { select: { id: true, firstName: true, lastName: true } },
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
    include: {
      faultReport: { include: { pole: true } },
      assignedTo: { select: { id: true, firstName: true, lastName: true } },
    },
  })

  await prisma.faultReport.update({
    where: { id: data.faultReportId },
    data: { status: ReportStatus.IN_PROGRESS },
  })

  // Notify assigned technician
  if (data.assignedToId) {
    await createNotification({
      userId: data.assignedToId,
      title: 'New Work Order Assigned',
      message: `Work order for ${order.faultReport.pole.poleCode} — ${order.faultReport.faultType.replace('_', ' ')} has been assigned to you.`,
      type: 'WORK_ORDER',
    })
  }

  await logAudit('CREATE_WORK_ORDER', 'WorkOrder', order.id, JSON.stringify({ faultReportId: data.faultReportId, assignedToId: data.assignedToId }))

  revalidatePath('/workorders')
  revalidatePath('/faults')
  return order
}

export async function updateWorkOrderStatus(
  workOrderId: string,
  status: 'IN_PROGRESS' | 'RESOLVED',
  userId: string,
  resolutionNotes?: string
) {
  const order = await prisma.workOrder.findUnique({
    where: { id: workOrderId },
    include: { faultReport: { include: { pole: true } } },
  })
  if (!order) throw new Error('Work order not found')

  if (status === 'IN_PROGRESS') {
    await prisma.workOrder.update({
      where: { id: workOrderId },
      data: { status: WorkOrderStatus.IN_PROGRESS },
    })
  } else if (status === 'RESOLVED') {
    await prisma.workOrder.update({
      where: { id: workOrderId },
      data: {
        status: WorkOrderStatus.RESOLVED,
        resolvedAt: new Date(),
        resolutionNotes: resolutionNotes ?? '',
      },
    })

    await prisma.faultReport.update({
      where: { id: order.faultReportId },
      data: { status: ReportStatus.RESOLVED },
    })

    await prisma.pole.update({
      where: { id: order.faultReport.poleId },
      data: { status: PoleStatus.ACTIVE },
    })

    await prisma.statusLog.create({
      data: {
        poleId: order.faultReport.poleId,
        changedById: userId,
        fromStatus: order.faultReport.pole.status,
        toStatus: PoleStatus.ACTIVE,
        reason: `Work order resolved: ${resolutionNotes ?? ''}`,
      },
    })
  }

  await logAudit('UPDATE_WORK_ORDER_STATUS', 'WorkOrder', workOrderId, JSON.stringify({ status, resolutionNotes }))

  revalidatePath('/workorders')
  revalidatePath('/faults')
  revalidatePath('/poles')
  revalidatePath('/')
  return order
}

export async function resolveWorkOrder(
  workOrderId: string,
  resolvedById: string,
  resolutionNotes: string
) {
  return updateWorkOrderStatus(workOrderId, 'RESOLVED', resolvedById, resolutionNotes)
}
