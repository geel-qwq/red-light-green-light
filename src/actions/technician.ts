'use server'

import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { PoleStatus, ReportStatus, WorkOrderStatus } from '@/lib/generated/prisma'
import { revalidatePath } from 'next/cache'
import { createNotification } from './notifications'
import { logAudit } from '@/lib/audit'

export async function getMyWorkOrders() {
  const session = await getSession()
  if (!session?.user?.id) return []

  return prisma.workOrder.findMany({
    where: { assignedToId: session.user.id },
    orderBy: [{ status: 'asc' }, { assignedAt: 'desc' }],
    include: {
      faultReport: {
        include: { pole: true },
      },
      maintenanceLogs: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}

export async function getMyWorkOrderById(id: string) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  return prisma.workOrder.findFirst({
    where: { id, assignedToId: session.user.id },
    include: {
      faultReport: {
        include: { pole: true, reportedBy: { select: { firstName: true, lastName: true } } },
      },
      maintenanceLogs: {
        orderBy: { createdAt: 'desc' },
        include: { technician: { select: { firstName: true, lastName: true } } },
      },
      assignedBy: { select: { firstName: true, lastName: true } },
    },
  })
}

export async function updateWorkOrderStatusById(
  workOrderId: string,
  status: 'IN_PROGRESS' | 'RESOLVED',
  resolutionNotes?: string
) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const order = await prisma.workOrder.findUnique({
    where: { id: workOrderId, assignedToId: session.user.id },
    include: { faultReport: { include: { pole: true, reportedBy: { select: { id: true } } } } },
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
        changedById: session.user.id,
        fromStatus: order.faultReport.pole.status,
        toStatus: PoleStatus.ACTIVE,
        reason: `Work order resolved: ${resolutionNotes ?? ''}`,
      },
    })

    if (order.faultReport.reportedBy?.id) {
      await createNotification({
        userId: order.faultReport.reportedBy.id,
        title: 'Fault Report Resolved',
        message: `The fault at ${order.faultReport.pole.poleCode} (${order.faultReport.faultType.replace('_', ' ')}) has been resolved.`,
        type: 'FAULT_RESOLVED',
      })
    }
  }

  await logAudit('UPDATE_WORK_ORDER_STATUS', 'WorkOrder', workOrderId, JSON.stringify({ status, resolutionNotes }))

  revalidatePath('/technician/work-queue')
  revalidatePath('/workorders')
  revalidatePath('/faults')
  revalidatePath('/poles')
  return order
}

export async function addMaintenanceLog(data: {
  workOrderId: string
  partsUsed?: string
  timeSpent?: number
  notes?: string
}) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const log = await prisma.maintenanceLog.create({
    data: {
      workOrderId: data.workOrderId,
      technicianId: session.user.id,
      partsUsed: data.partsUsed,
      timeSpent: data.timeSpent,
      notes: data.notes,
    },
    include: { technician: { select: { firstName: true, lastName: true } } },
  })

  await logAudit('ADD_MAINTENANCE_LOG', 'MaintenanceLog', log.id, JSON.stringify({ workOrderId: data.workOrderId, partsUsed: data.partsUsed }))

  revalidatePath('/technician/work-queue')
  return log
}

export async function getMyWorkOrdersOffline() {
  const data = await getMyWorkOrders()
  return data
}

export async function getTechnicianStats() {
  const session = await getSession()
  if (!session?.user?.id) return null

  const [assigned, inProgress, resolvedThisWeek] = await Promise.all([
    prisma.workOrder.count({
      where: { assignedToId: session.user.id, status: { in: [WorkOrderStatus.ASSIGNED, WorkOrderStatus.PENDING] } },
    }),
    prisma.workOrder.count({
      where: { assignedToId: session.user.id, status: WorkOrderStatus.IN_PROGRESS },
    }),
    prisma.workOrder.count({
      where: {
        assignedToId: session.user.id,
        status: WorkOrderStatus.RESOLVED,
        resolvedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    }),
  ])

  return { assigned, inProgress, resolvedThisWeek }
}

export async function getTechnicianFieldPoles() {
  const session = await getSession()
  if (!session?.user?.id) return []

  const workOrders = await prisma.workOrder.findMany({
    where: { assignedToId: session.user.id },
    include: {
      faultReport: {
        include: { pole: true },
      },
    },
  })

  const poleMap = new Map<string, {
    poleCode: string
    address: string
    barangay: string
    latitude: number
    longitude: number
    status: string
    workOrderStatus: string
    faultType: string
    workOrderId: string
  }>()

  for (const wo of workOrders) {
    const pole = wo.faultReport.pole
    if (!poleMap.has(pole.id)) {
      poleMap.set(pole.id, {
        poleCode: pole.poleCode,
        address: pole.address,
        barangay: pole.barangay,
        latitude: pole.latitude,
        longitude: pole.longitude,
        status: pole.status,
        workOrderStatus: wo.status,
        faultType: wo.faultReport.faultType,
        workOrderId: wo.id,
      })
    }
  }

  return Array.from(poleMap.values())
}
