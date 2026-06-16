import { Users, Wrench, ClipboardList, AlertTriangle } from 'lucide-react'

interface Props {
  totalUsers: number
  totalTechnicians: number
  totalAdmins: number
  pendingWorkOrders: number
  openFaults: number
  totalPoles: number
}

const cards = (p: Props) => [
  {
    label: 'Total Users',
    value: p.totalUsers,
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    sublabel: 'All registered accounts',
  },
  {
    label: 'Technicians',
    value: p.totalTechnicians,
    icon: Wrench,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    sublabel: 'Field operatives',
  },
  {
    label: 'Admins',
    value: p.totalAdmins,
    icon: Users,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    sublabel: 'System administrators',
  },
  {
    label: 'Pending Work Orders',
    value: p.pendingWorkOrders,
    icon: ClipboardList,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    sublabel: 'Awaiting assignment',
  },
  {
    label: 'Open Faults',
    value: p.openFaults,
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
    sublabel: 'Unresolved reports',
  },
  {
    label: 'Total Poles',
    value: p.totalPoles,
    icon: AlertTriangle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    sublabel: 'Network infrastructure',
  },
]

export default function SuperAdminStatsRow(props: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards(props).map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className={`bg-white rounded-xl border ${card.border} p-4 flex flex-col gap-2`}
          >
            <div className="flex items-center gap-3">
              <div className={`${card.bg} p-2.5 rounded-lg flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${card.color}`} strokeWidth={2} />
              </div>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{card.label}</p>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-[10px] text-gray-400">{card.sublabel}</p>
          </div>
        )
      })}
    </div>
  )
}
