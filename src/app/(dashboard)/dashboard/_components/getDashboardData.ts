import prisma from '@/lib/prisma'
import { PoleStatus } from '@/lib/generated/prisma/client'
import { Role } from '@/lib/generated/prisma/client'

export type StatCard = {
  label: string
  value: string | number
  color: string
  sublabel?: string
}

export type DashboardData = {
  role: Role
  cards: StatCard[]
  activityLogs: { id: string; title: string; description: string; time: string }[]
}

function timeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.round(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

async function getSuperadminOrAdminData(): Promise<DashboardData['cards']> {
  const [poles, openFaults, resolvedOrders, totalUsers] = await Promise.all([
    prisma.pole.groupBy({ by: ['status'], _count: true }),
    prisma.faultReport.count({ where: { status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
    prisma.workOrder.findMany({
      where: { status: 'RESOLVED', resolvedAt: { not: null } },
      select: { assignedAt: true, resolvedAt: true },
    }),
    prisma.user.count(),
  ])

  const statusMap = Object.fromEntries(poles.map((p) => [p.status, p._count]))
  const totalPoles = poles.reduce((acc, p) => acc + p._count, 0)

  let avgResolutionHours: number | null = null
  if (resolvedOrders.length > 0) {
    const totalMs = resolvedOrders.reduce((acc, o) => {
      return acc + (o.resolvedAt!.getTime() - o.assignedAt.getTime())
    }, 0)
    avgResolutionHours = Math.round(totalMs / resolvedOrders.length / 1000 / 60 / 60)
  }

  // Recent fix = most recently resolved fault report
  const recentFix = await prisma.faultReport.findFirst({
    where: { status: 'RESOLVED' },
    orderBy: { reportedAt: 'desc' },
    include: { pole: { select: { poleCode: true } } },
  })

  // Street with least / most active poles (group by barangay as proxy for "street")
  const poleGroups = await prisma.pole.groupBy({
    by: ['barangay'],
    _count: true,
    orderBy: { _count: { barangay: 'asc' } },
  })

  const leastStreet = poleGroups[0]
  const mostStreet = poleGroups[poleGroups.length - 1]

  return [
    {
      label: 'Recent Fixes',
      value: recentFix?.pole.poleCode ?? '—',
      color: 'text-gray-900',
      sublabel: recentFix ? `Resolved ${timeAgo(recentFix.reportedAt)}` : 'No recent fixes',
    },
    {
      label: 'Recent Reported Outages',
      value: openFaults,
      color: 'text-red-500',
      sublabel: 'Unresolved civic tickets',
    },
    {
      label: 'Ongoing Maintenance',
      value: statusMap[PoleStatus.UNDER_MAINTENANCE] ?? 0,
      color: 'text-amber-500',
      sublabel: 'Crew active in field',
    },
    {
      label: 'Barangay With Least Lights',
      value: leastStreet?.barangay ?? '—',
      color: 'text-gray-900',
      sublabel: `Total counts: ${leastStreet?._count ?? 0} units`,
    },
    {
      label: 'Barangay With Most Lights',
      value: mostStreet?.barangay ?? '—',
      color: 'text-gray-900',
      sublabel: `Total counts: ${mostStreet?._count ?? 0} units`,
    },
    {
      label: 'Avg Resolution Time',
      value: avgResolutionHours != null ? `${avgResolutionHours}h` : '—',
      color: 'text-blue-600',
      sublabel: `${totalPoles} total poles · ${totalUsers} users`,
    },
  ]
}

async function getTechnicianData(userId: string): Promise<DashboardData['cards']> {
  const [assigned, inProgress, resolvedThisWeek] = await Promise.all([
    prisma.workOrder.count({ where: { assignedToId: userId, status: { in: ['ASSIGNED', 'PENDING'] } } }),
    prisma.workOrder.count({ where: { assignedToId: userId, status: 'IN_PROGRESS' } }),
    prisma.workOrder.count({
      where: {
        assignedToId: userId,
        status: 'RESOLVED',
        resolvedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    }),
  ])

  const latestAssignment = await prisma.workOrder.findFirst({
    where: { assignedToId: userId },
    orderBy: { assignedAt: 'desc' },
    include: { faultReport: { include: { pole: { select: { poleCode: true } } } } },
  })

  return [
    {
      label: 'Assigned To Me',
      value: assigned,
      color: 'text-blue-600',
      sublabel: 'Pending / awaiting start',
    },
    {
      label: 'In Progress',
      value: inProgress,
      color: 'text-amber-500',
      sublabel: 'Active work orders',
    },
    {
      label: 'Resolved This Week',
      value: resolvedThisWeek,
      color: 'text-green-600',
      sublabel: 'Closed in last 7 days',
    },
    {
      label: 'Latest Assignment',
      value: latestAssignment?.faultReport.pole.poleCode ?? '—',
      color: 'text-gray-900',
      sublabel: latestAssignment ? timeAgo(latestAssignment.assignedAt) : 'No assignments yet',
    },
  ]
}

async function getUserData(userId: string): Promise<DashboardData['cards']> {
  const [myReports, myOpenReports] = await Promise.all([
    prisma.faultReport.count({ where: { reportedById: userId } }),
    prisma.faultReport.count({ where: { reportedById: userId, status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
  ])

  const latestReport = await prisma.faultReport.findFirst({
    where: { reportedById: userId },
    orderBy: { reportedAt: 'desc' },
    include: { pole: { select: { poleCode: true } } },
  })

  return [
    {
      label: 'My Reports',
      value: myReports,
      color: 'text-gray-900',
      sublabel: 'Total submitted',
    },
    {
      label: 'Open Reports',
      value: myOpenReports,
      color: 'text-orange-500',
      sublabel: 'Awaiting resolution',
    },
    {
      label: 'Latest Report',
      value: latestReport?.pole.poleCode ?? '—',
      color: 'text-gray-900',
      sublabel: latestReport ? timeAgo(latestReport.reportedAt) : 'No reports yet',
    },
  ]
}

export type UserFloatingDashboardData = {
  stats: { total: number; open: number; resolved: number }
  recentReports: {
    id: string
    status: string
    reportedAt: Date
    description: string
    pole: { poleCode: string; address: string }
  }[]
}

export async function getUserFloatingDashboardData(userId: string): Promise<UserFloatingDashboardData> {
  const [total, open, resolved, recentReports] = await Promise.all([
    prisma.faultReport.count({ where: { reportedById: userId } }),
    prisma.faultReport.count({ where: { reportedById: userId, status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
    prisma.faultReport.count({ where: { reportedById: userId, status: { in: ['RESOLVED', 'CLOSED'] } } }),
    prisma.faultReport.findMany({
      where: { reportedById: userId },
      orderBy: { reportedAt: 'desc' },
      take: 10,
      select: {
        id: true,
        status: true,
        reportedAt: true,
        description: true,
        pole: { select: { poleCode: true, address: true } },
      },
    }),
  ])

  return { stats: { total, open, resolved }, recentReports }
}

export type TechnicianFloatingDashboardData = {
  stats: { assigned: number; inProgress: number; resolvedThisWeek: number }
  workOrders: {
    id: string
    status: string
    assignedAt: Date
    faultReport: {
      faultType: string
      description: string
      pole: { poleCode: string; address: string }
    }
  }[]
}

export async function getTechnicianFloatingDashboardData(userId: string): Promise<TechnicianFloatingDashboardData> {
  const [assigned, inProgress, resolvedThisWeek, workOrders] = await Promise.all([
    prisma.workOrder.count({ where: { assignedToId: userId, status: { in: ['ASSIGNED', 'PENDING'] } } }),
    prisma.workOrder.count({ where: { assignedToId: userId, status: 'IN_PROGRESS' } }),
    prisma.workOrder.count({
      where: {
        assignedToId: userId,
        status: 'RESOLVED',
        resolvedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    }),
    prisma.workOrder.findMany({
      where: { assignedToId: userId },
      orderBy: { assignedAt: 'desc' },
      take: 10,
      select: {
        id: true,
        status: true,
        assignedAt: true,
        faultReport: {
          select: {
            faultType: true,
            description: true,
            pole: { select: { poleCode: true, address: true } },
          },
        },
      },
    }),
  ])

  return { stats: { assigned, inProgress, resolvedThisWeek }, workOrders }
}

export type SuperAdminFloatingDashboardData = {
  stats: {
    totalUsers: number
    totalTechnicians: number
    totalAdmins: number
    pendingWorkOrders: number
    openFaults: number
    totalPoles: number
  }
}

export async function getSuperAdminFloatingDashboardData(): Promise<SuperAdminFloatingDashboardData> {
  const [totalUsers, totalTechnicians, totalAdmins, pendingWorkOrders, openFaults, totalPoles] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: Role.TECHNICIAN } }),
    prisma.user.count({ where: { role: Role.ADMIN } }),
    prisma.workOrder.count({ where: { status: { in: ['PENDING', 'ASSIGNED'] } } }),
    prisma.faultReport.count({ where: { status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
    prisma.pole.count(),
  ])

  return { stats: { totalUsers, totalTechnicians, totalAdmins, pendingWorkOrders, openFaults, totalPoles } }
}

export async function getDashboardData(role: Role, userId: string): Promise<DashboardData> {
  let cards: StatCard[]

  switch (role) {
    case 'SUPERADMIN':
      cards = await getSuperadminOrAdminData()
      break
    case 'ADMIN':
      cards = await getSuperadminOrAdminData()
      break
    case 'TECHNICIAN':
      cards = await getTechnicianData(userId)
      break
    default:
      cards = await getUserData(userId)
      break
  }

  return { role, cards, activityLogs: [] }
}