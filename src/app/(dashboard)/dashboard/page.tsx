import prisma from '@/lib/prisma'
import PoleMap from '@/components/map/PoleMapClient'
import { PoleStatus } from '@/lib/generated/prisma/client'

async function getDashboardStats() {
  const [poles, openFaults, resolvedOrders] = await Promise.all([
    prisma.pole.groupBy({ by: ['status'], _count: true }),
    prisma.faultReport.count({ where: { status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
    prisma.workOrder.findMany({
      where: { status: 'RESOLVED', resolvedAt: { not: null } },
      select: { assignedAt: true, resolvedAt: true },
    }),
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
  return {
    totalPoles,
    activePoles: statusMap[PoleStatus.ACTIVE] ?? 0,
    faultyPoles: statusMap[PoleStatus.FAULTY] ?? 0,
    underMaintenancePoles: statusMap[PoleStatus.UNDER_MAINTENANCE] ?? 0,
    openFaults,
    avgResolutionHours,
  }
}

const statCards = (stats: Awaited<ReturnType<typeof getDashboardStats>>) => [
  { label: 'Total poles', value: stats.totalPoles, color: 'text-gray-900' },
  { label: 'Active', value: stats.activePoles, color: 'text-green-600' },
  { label: 'Faulty', value: stats.faultyPoles, color: 'text-red-500' },
  { label: 'Under maintenance', value: stats.underMaintenancePoles, color: 'text-amber-500' },
  { label: 'Open fault reports', value: stats.openFaults, color: 'text-orange-500' },
  {
    label: 'Avg resolution time',
    value: stats.avgResolutionHours != null ? `${stats.avgResolutionHours}h` : '—',
    color: 'text-blue-600',
  },
]

export default async function DashboardPage() {
  const [stats, poles] = await Promise.all([
    getDashboardStats(),
    prisma.pole.findMany({ select: { id: true, poleCode: true, address: true, latitude: true, longitude: true, status: true } }),
  ])
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards(stats).map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500">{card.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Pole locations</p>
        <div style={{ height: '420px' }}>
          <PoleMap poles={poles} />
        </div>
      </div>
    </div>
  )
}