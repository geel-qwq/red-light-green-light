import { FileText, AlertCircle, CheckCircle2 } from 'lucide-react'

interface Props {
  total: number
  open: number
  resolved: number
}

export default function UserStatsRow({ total, open, resolved }: Props) {
  const cards = [
    {
      label: 'My Reports',
      value: total,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      label: 'Open / In Progress',
      value: open,
      icon: AlertCircle,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
    {
      label: 'Resolved',
      value: resolved,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-100',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
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