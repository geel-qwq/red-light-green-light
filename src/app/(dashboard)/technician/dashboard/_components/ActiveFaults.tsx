import Link from 'next/link'

interface Fault {
  id: string
  status: string
  reportedAt: Date
  faultType: string
  description: string
  pole: { poleCode: string; address: string }
}

const statusStyles: Record<string, string> = {
  OPEN: 'bg-orange-100 text-orange-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  RESOLVED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-500',
}

const faultLabels: Record<string, string> = {
  NO_POWER: 'No Power',
  FLICKERING: 'Flickering',
  DAMAGED_FIXTURE: 'Damaged Fixture',
  VANDALISM: 'Vandalism',
  OTHER: 'Other',
}

function timeAgo(date: Date) {
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

export default function ActiveFaults({ faults }: { faults: Fault[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">Active Fault Reports</h2>
          <p className="text-xs text-gray-400 mt-0.5">Open issues needing attention</p>
        </div>
        <Link href="/faults" className="text-xs font-semibold text-blue-600 hover:underline">
          View all
        </Link>
      </div>

      {faults.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400 text-sm">No active fault reports.</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100">
          {faults.map((fault) => (
            <div key={fault.id} className="py-3.5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {fault.pole.poleCode} — {fault.pole.address}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {faultLabels[fault.faultType] ?? fault.faultType} · {timeAgo(fault.reportedAt)}
                </p>
              </div>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusStyles[fault.status] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {fault.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
