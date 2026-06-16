import { Users, Wrench, AlertTriangle, ClipboardList } from 'lucide-react'

interface Props {
  totalUsers: number
  totalTechnicians: number
  pendingWorkOrders: number
  openFaults: number
}

const cards = (p: Props) => [
  {
    label: 'Registered Users',
    value: p.totalUsers,
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    label: 'Technicians',
    value: p.totalTechnicians,
    icon: Wrench,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    label: 'Pending Work Orders',
    value: p.pendingWorkOrders,
    icon: ClipboardList,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    label: 'Open Fault Reports',
    value: p.openFaults,
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
]

export default function AdminStatsRow(props: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards(props).map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className={`bg-white rounded-xl border ${card.border} p-5 flex items-center gap-4`}
          >
            <div className={`${card.bg} p-3 rounded-lg flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${card.color}`} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{card.label}</p>
              <p className={`text-2xl font-bold mt-0.5 ${card.color}`}>{card.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}