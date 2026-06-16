interface PoleStats {
  total: number
  active: number
  faulty: number
  underMaintenance: number
  decommissioned: number
}

interface Props {
  poleStats: PoleStats
  avgResolutionHours: number | null
  recentFixes: number
}

export default function SystemOverview({ poleStats, avgResolutionHours, recentFixes }: Props) {
  const cards = [
    {
      label: 'Active Poles',
      value: poleStats.active,
      total: poleStats.total,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      label: 'Faulty Poles',
      value: poleStats.faulty,
      total: poleStats.total,
      color: 'text-red-500',
      bg: 'bg-red-50',
      border: 'border-red-100',
    },
    {
      label: 'Under Maintenance',
      value: poleStats.underMaintenance,
      total: poleStats.total,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      label: 'Decommissioned',
      value: poleStats.decommissioned,
      total: poleStats.total,
      color: 'text-gray-500',
      bg: 'bg-gray-50',
      border: 'border-gray-100',
    },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="mb-5">
        <h2 className="text-base font-bold text-gray-900">System Overview</h2>
        <p className="text-xs text-gray-400 mt-0.5">Infrastructure health at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card) => (
          <div key={card.label} className={`bg-white rounded-xl border ${card.border} p-4`}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
            <p className={`text-2xl font-black mt-1 ${card.color}`}>{card.value}</p>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${card.color.replace('text-', 'bg-')}`}
                style={{ width: `${card.total > 0 ? (card.value / card.total) * 100 : 0}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{card.total > 0 ? Math.round((card.value / card.total) * 100) : 0}% of total</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Avg Resolution Time</p>
          <p className="text-xl font-black text-gray-900 mt-1">
            {avgResolutionHours != null ? `${avgResolutionHours}h` : '—'}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">Mean time to resolve</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recent Fixes</p>
          <p className="text-xl font-black text-green-600 mt-1">{recentFixes}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Resolved this week</p>
        </div>
      </div>
    </div>
  )
}
