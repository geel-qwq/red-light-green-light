'use server'

import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { Role } from '@/lib/generated/prisma/client'
import { revalidatePath } from 'next/cache'
import { logAudit } from '@/lib/audit'

async function requireSuperadmin() {
  const session = await getSession()
  if (!session || session.user.role !== 'SUPERADMIN') {
    throw new Error('Unauthorized: SUPERADMIN only')
  }
  return session
}

// ── System Settings ──

export async function getSystemSettings() {
  await requireSuperadmin()
  const settings = await prisma.systemSetting.findMany()
  const map: Record<string, string> = {}
  for (const s of settings) map[s.key] = s.value
  return map
}

export async function updateSystemSetting(key: string, value: string) {
  await requireSuperadmin()
  await prisma.systemSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })
  await logAudit('UPDATE_SYSTEM_SETTING', 'SystemSetting', key, JSON.stringify({ key, value }))
  revalidatePath('/superadmin/settings')
}

export async function deleteSystemSetting(key: string) {
  await requireSuperadmin()
  await prisma.systemSetting.delete({ where: { key } })
  await logAudit('DELETE_SYSTEM_SETTING', 'SystemSetting', key)
  revalidatePath('/superadmin/settings')
}

// ── Audit Log ──

export async function getAuditLogs(limit = 200) {
  await requireSuperadmin()
  return prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

export async function clearAuditLogs() {
  await requireSuperadmin()
  await prisma.auditLog.deleteMany({})
  await logAudit('CLEAR_AUDIT_LOGS', 'AuditLog')
  revalidatePath('/superadmin/audit')
}

// ── Pole Registry ──

export async function getPolesFull() {
  await requireSuperadmin()
  return prisma.pole.findMany({
    orderBy: { poleCode: 'asc' },
    include: {
      _count: { select: { faultReports: true, statusLogs: true } },
    },
  })
}

export async function createPole(data: {
  poleCode: string
  address: string
  barangay: string
  latitude: number
  longitude: number
  status?: string
}) {
  const session = await requireSuperadmin()
  const pole = await prisma.pole.create({
    data: {
      poleCode: data.poleCode,
      address: data.address,
      barangay: data.barangay,
      latitude: data.latitude,
      longitude: data.longitude,
      status: (data.status ?? 'ACTIVE') as any,
    },
  })
  await logAudit('CREATE_POLE', 'Pole', pole.id, JSON.stringify({ poleCode: pole.poleCode }))
  revalidatePath('/superadmin/poles')
  revalidatePath('/admin/poles')
  revalidatePath('/poles')
  return pole
}

export async function updatePole(poleId: string, data: {
  poleCode?: string
  address?: string
  barangay?: string
  latitude?: number
  longitude?: number
  status?: string
}) {
  await requireSuperadmin()
  const pole = await prisma.pole.update({
    where: { id: poleId },
    data: data as any,
  })
  await logAudit('UPDATE_POLE', 'Pole', poleId, JSON.stringify(data))
  revalidatePath('/superadmin/poles')
  revalidatePath('/admin/poles')
  revalidatePath('/poles')
  return pole
}

export async function deletePole(poleId: string) {
  await requireSuperadmin()
  const pole = await prisma.pole.findUnique({ where: { id: poleId } })
  if (!pole) throw new Error('Pole not found')
  await prisma.pole.delete({ where: { id: poleId } })
  await logAudit('DELETE_POLE', 'Pole', poleId, JSON.stringify({ poleCode: pole.poleCode }))
  revalidatePath('/superadmin/poles')
  revalidatePath('/admin/poles')
  revalidatePath('/poles')
}

// ── User Management (extended) ──

export async function getAllUsersFull() {
  await requireSuperadmin()
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      city: true,
      barangay: true,
      isActive: true,
      createdAt: true,
    },
  })
}

export async function createUser(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  passwordHash: string
  role: string
  city: string
  barangay: string
  region: string
}) {
  await requireSuperadmin()
  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      passwordHash: data.passwordHash,
      role: data.role as Role,
      city: data.city,
      barangay: data.barangay,
      region: data.region,
    },
  })
  await logAudit('CREATE_USER', 'User', user.id, JSON.stringify({ email: user.email, role: user.role }))
  revalidatePath('/superadmin/users')
  revalidatePath('/superadmin/dashboard')
  return user
}

export async function deactivateUser(userId: string, active: boolean) {
  await requireSuperadmin()
  const target = await prisma.user.findUnique({ where: { id: userId } })
  if (!target) throw new Error('User not found')
  if (target.role === Role.SUPERADMIN && active === false) throw new Error('Cannot deactivate SUPERADMIN')
  await prisma.user.update({ where: { id: userId }, data: { isActive: active } })
  await logAudit(active ? 'ACTIVATE_USER' : 'DEACTIVATE_USER', 'User', userId)
  revalidatePath('/superadmin/users')
  revalidatePath('/superadmin/dashboard')
}

// ── Dashboard Analytics ──

export async function getDashboardAnalytics() {
  await requireSuperadmin()
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [
    totalUsers,
    totalPoles,
    totalFaults,
    totalWorkOrders,
    faultsByType,
    faultsByStatus,
    polesByStatus,
    usersByRole,
    faultsByBarangay,
    monthlyFaults,
    monthlyResolved,
    workOrdersByStatus,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.pole.count(),
    prisma.faultReport.count(),
    prisma.workOrder.count(),
    prisma.faultReport.groupBy({ by: ['faultType'], _count: true }),
    prisma.faultReport.groupBy({ by: ['status'], _count: true }),
    prisma.pole.groupBy({ by: ['status'], _count: true }),
    prisma.user.groupBy({ by: ['role'], _count: true }),
    prisma.faultReport.findMany({
      where: { pole: { barangay: { not: undefined } } },
      include: { pole: { select: { barangay: true } } },
    }).then(reports => {
      const map: Record<string, number> = {}
      for (const r of reports) {
        const b = r.pole.barangay
        map[b] = (map[b] ?? 0) + 1
      }
      return Object.entries(map)
        .map(([barangay, count]) => ({ barangay, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
    }),
    prisma.faultReport.count({ where: { reportedAt: { gte: startOfMonth } } }),
    prisma.workOrder.count({ where: { status: 'RESOLVED', resolvedAt: { gte: startOfMonth } } }),
    prisma.workOrder.groupBy({ by: ['status'], _count: true }),
  ])

  const poleStatusMap = Object.fromEntries(polesByStatus.map(p => [p.status, p._count]))
  const faultTypeMap = Object.fromEntries(faultsByType.map(f => [f.faultType, f._count]))
  const faultStatusMap = Object.fromEntries(faultsByStatus.map(f => [f.status, f._count]))
  const roleMap = Object.fromEntries(usersByRole.map(r => [r.role, r._count]))
  const woStatusMap = Object.fromEntries(workOrdersByStatus.map(w => [w.status, w._count]))

  return {
    totalUsers,
    totalPoles,
    totalFaults,
    totalWorkOrders,
    poleStats: {
      active: poleStatusMap['ACTIVE'] ?? 0,
      faulty: poleStatusMap['FAULTY'] ?? 0,
      underMaintenance: poleStatusMap['UNDER_MAINTENANCE'] ?? 0,
      decommissioned: poleStatusMap['DECOMMISSIONED'] ?? 0,
    },
    faultTypes: Object.entries(faultTypeMap).map(([type, count]) => ({ type, count })),
    faultStatuses: Object.entries(faultStatusMap).map(([status, count]) => ({ status, count })),
    usersByRole: Object.entries(roleMap).map(([role, count]) => ({ role, count })),
    workOrderStatuses: Object.entries(woStatusMap).map(([status, count]) => ({ status, count })),
    topFaultBarangays: faultsByBarangay,
    monthlyFaults,
    monthlyResolved,
  }
}

// ── Data Export / Backup ──

export async function exportAllPolesCsv() {
  await requireSuperadmin()
  const poles = await prisma.pole.findMany({ orderBy: { poleCode: 'asc' } })
  const header = 'Pole Code,Address,Barangay,Latitude,Longitude,Status,Installed At\n'
  const rows = poles.map(p =>
    [p.poleCode, `"${p.address.replace(/"/g, '""')}"`, p.barangay, p.latitude, p.longitude, p.status, p.installedAt.toISOString()].join(',')
  )
  return header + rows.join('\n')
}

export async function exportAllUsersCsv() {
  await requireSuperadmin()
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  const header = 'First Name,Last Name,Email,Phone,Role,City,Barangay,Active,Created At\n'
  const rows = users.map(u =>
    [u.firstName, u.lastName, u.email, u.phone, u.role, u.city, u.barangay, u.isActive, u.createdAt.toISOString()].join(',')
  )
  return header + rows.join('\n')
}

export async function getExportJson() {
  await requireSuperadmin()
  const [users, poles, faultReports, workOrders, maintenanceLogs] = await Promise.all([
    prisma.user.findMany(),
    prisma.pole.findMany(),
    prisma.faultReport.findMany(),
    prisma.workOrder.findMany(),
    prisma.maintenanceLog.findMany(),
  ])
  return {
    exportedAt: new Date().toISOString(),
    users,
    poles,
    faultReports,
    workOrders,
    maintenanceLogs,
  }
}
