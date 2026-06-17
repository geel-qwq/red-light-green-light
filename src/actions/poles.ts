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

export async function getNearestPole(lat: number, lng: number) {
  const poles = await prisma.pole.findMany({
    select: { id: true, poleCode: true, address: true, barangay: true, status: true, latitude: true, longitude: true },
  })
  let nearest: (typeof poles)[number] | null = null
  let minDist = Infinity
  for (const pole of poles) {
    const dist = Math.sqrt((pole.latitude - lat) ** 2 + (pole.longitude - lng) ** 2)
    if (dist < minDist) {
      minDist = dist
      nearest = pole
    }
  }
  if (minDist < 0.0005) return nearest
  return null
}

export async function registerOsmPole(lat: number, lng: number) {
  const count = await prisma.pole.count()
  const poleCode = `OSM-${String(count + 1).padStart(4, "0")}`

  let address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  let barangay = "Unknown"

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      { headers: { "User-Agent": "ilLUMENate/1.0" } },
    )
    if (res.ok) {
      const data = await res.json()
      address = data.display_name?.split(",").slice(0, 3).join(",").trim() || address
      barangay = data.address?.village || data.address?.town || data.address?.suburb || data.address?.hamlet || barangay
    }
  } catch {
    // fallback to coordinates
  }

  const pole = await prisma.pole.create({
    data: { poleCode, address, barangay, latitude: lat, longitude: lng },
  })

  revalidatePath("/poles")
  return pole
}

export async function bulkRegisterOsmPoles(
  coords: { lat: number; lng: number }[],
) {
  if (coords.length === 0) return []

  const existing = await prisma.pole.findMany({
    select: { latitude: true, longitude: true },
  })
  const existingSet = new Set(existing.map((p) => `${p.latitude.toFixed(6)},${p.longitude.toFixed(6)}`))

  const newCoords = coords.filter(
    (c) => !existingSet.has(`${c.lat.toFixed(6)},${c.lng.toFixed(6)}`),
  )
  if (newCoords.length === 0) return []

  let count = await prisma.pole.count()
  const poles = newCoords.map((c) => {
    count++
    return {
      poleCode: `OSM-${String(count).padStart(4, "0")}`,
      address: `${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`,
      barangay: "Quezon City",
      latitude: c.lat,
      longitude: c.lng,
    }
  })

  await prisma.pole.createMany({ data: poles })
  revalidatePath("/poles")
  return count
}
