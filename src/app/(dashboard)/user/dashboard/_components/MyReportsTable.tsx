import Link from 'next/link'

interface Report {
  id: string
  faultType: string
  status: string
  reportedAt: Date
  description: string
  pole: { poleCode: string; address: string; barangay: string }
  workOrder: {
    status: string
    assignedTo: { firstName: string; lastName: string } | null
  } | null
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

export default function MyReportsTable({ reports }: { reports: Report[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">My Fault Reports</h2>
          <p className="text-xs text-gray-400 mt-0.5">Your submitted reports and their current status</p>
        </div>
        <Link
          href="/report"
          className="text-xs font-semibold px-3 py-1.5 bg-[#2f4383] text-white rounded-lg hover:bg-[#243570] transition-colors"
        >
          + Report Issue
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">You haven't submitted any reports yet.</p>
          <Link
            href="/report"
            className="inline-block mt-3 text-xs font-semibold text-[#2f4383] hover:underline"
          >
            Report your first issue →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Pole</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Fault Type</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Assigned To</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Status</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Reported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 pr-4">
                    <p className="font-semibold text-gray-900">{report.pole.poleCode}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[160px]">{report.pole.address}</p>
                  </td>
                  <td className="py-3.5 pr-4 text-gray-600 whitespace-nowrap">
                    {faultLabels[report.faultType] ?? report.faultType}
                  </td>
                  <td className="py-3.5 pr-4 text-gray-500 whitespace-nowrap">
                    {report.workOrder?.assignedTo
                      ? `${report.workOrder.assignedTo.firstName} ${report.workOrder.assignedTo.lastName}`
                      : <span className="text-gray-300 italic">Unassigned</span>}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[report.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {report.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 text-xs text-gray-400 whitespace-nowrap">
                    {timeAgo(report.reportedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}