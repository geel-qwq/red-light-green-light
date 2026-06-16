import Link from 'next/link'

interface WorkOrder {
  id: string
  status: string
  assignedAt: Date
  assignedTo: { firstName: string; lastName: string } | null
  faultReport: {
    faultType: string
    pole: { poleCode: string; address: string }
  }
}

const statusStyles: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-600',
  ASSIGNED: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  RESOLVED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-500',
}

function timeAgo(date: Date) {
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

export default function RecentWorkOrders({ workOrders }: { workOrders: WorkOrder[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">Recent Work Orders</h2>
          <p className="text-xs text-gray-400 mt-0.5">Latest dispatched field tasks</p>
        </div>
        <Link href="/workorders" className="text-xs font-semibold text-blue-600 hover:underline">
          View all
        </Link>
      </div>

      {workOrders.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">No work orders yet.</div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100">
          {workOrders.map((wo) => (
            <div key={wo.id} className="py-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {wo.faultReport.pole.poleCode} — {wo.faultReport.pole.address}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {wo.assignedTo
                    ? `Assigned to ${wo.assignedTo.firstName} ${wo.assignedTo.lastName}`
                    : 'Unassigned'}{' '}
                  · {timeAgo(wo.assignedAt)}
                </p>
              </div>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusStyles[wo.status] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {wo.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}