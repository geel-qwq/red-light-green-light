import { ClipboardList, Wrench, CheckCircle2, MapPin } from 'lucide-react'

interface Props {
  assigned: number
  inProgress: number
  resolvedThisWeek: number
  latestPole: string
}

const cards = (p: Props) => [
  {
    label: 'Assigned to Me',
    value: p.assigned,
    icon: ClipboardList,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    sublabel: 'Pending / awaiting start',
  },
  {
    label: 'In Progress',
    value: p.inProgress,
    icon: Wrench,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    sublabel: 'Active work orders',
  },
  {
    label: 'Resolved This Week',
    value: p.resolvedThisWeek,
    icon: CheckCircle2,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
    sublabel: 'Closed in last 7 days',
  },
  {
    label: 'Latest Assignment',
    value: p.latestPole,
    icon: MapPin,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    sublabel: 'Most recent pole',
  },
]

export default function TechnicianStatsRow(props: Props) {
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
              <p className="text-[10px] text-gray-400 mt-0.5">{card.sublabel}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
