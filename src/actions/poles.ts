'use server'

import prisma  from '@/lib/prisma'
import { PoleStatus } from '@/lib/generated/prisma/client'
import { revalidatePath } from 'next/cache'

export async function getPoles() {
  return prisma.pole.findMany({
    orderBy: { poleCode: 'asc' },
    include: { _count: { select: { faultReports: true } } },
  })
}

export async function getPoleById(id: string) {
  return prisma.pole.findUnique({
    where: { id },
    include: {
      faultReports: {
        include: { reportedBy: true, workOrder: true },
        orderBy: { reportedAt: 'desc' },
      },
      statusLogs: {
        include: { changedBy: true },
        orderBy: { changedAt: 'desc' },
      },
    },
  })
}

export async function createPole(data: {
  poleCode: string
  address: string
  barangay: string
  latitude: number
  longitude: number
}) {
  const pole = await prisma.pole.create({ data })
  revalidatePath('/poles')
  return pole
}

export async function updatePoleStatus(
  poleId: string,
  toStatus: PoleStatus,
  changedById: string,
  reason?: string
) {
  const pole = await prisma.pole.findUnique({ where: { id: poleId } })
  if (!pole) throw new Error('Pole not found')

  await prisma.statusLog.create({
    data: {
      poleId,
      changedById,
      fromStatus: pole.status,
      toStatus,
      reason,
    },
  })

  const updated = await prisma.pole.update({
    where: { id: poleId },
    data: { status: toStatus },
  })

  revalidatePath('/poles')
  revalidatePath(`/poles/${poleId}`)
  return updated
}
