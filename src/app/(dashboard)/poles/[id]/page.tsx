import { getPoleById } from '@/actions/poles'
import { notFound } from 'next/navigation'

const statusBadge: Record<string, string> = {
  ACTIVE: 'bg-green-50 text-green-700',
  FAULTY: 'bg-red-50 text-red-600',
  UNDER_MAINTENANCE: 'bg-amber-50 text-amber-700',
  DECOMMISSIONED: 'bg-gray-100 text-gray-500',
}

export default async function PoleDetailPage({ params }: { params: { id: string } }) {
  const pole = await getPoleById(params.id)
  if (!pole) notFound()

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{pole.poleCode}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{pole.address}, {pole.barangay}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[pole.status]}`}>
          {pole.status.replace('_', ' ')}
        </span>
      </div>

      {/* Fault Reports */}
      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-3">Fault reports</h2>
        {pole.faultReports.length === 0 ? (
          <p className="text-sm text-gray-400">No fault reports.</p>
        ) : (
          <div className="space-y-2">
            {pole.faultReports.map((report) => (
              <div key={report.id} className="bg-white border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{report.faultType.replace('_', ' ')}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(report.reportedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{report.description}</p>
                <p className="text-xs text-gray-400 mt-1">Reported by {report.reportedBy.firstName} {report.reportedBy.lastName}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Status History */}
      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-3">Status history</h2>
        {pole.statusLogs.length === 0 ? (
          <p className="text-sm text-gray-400">No history yet.</p>
        ) : (
          <div className="border-l-2 border-gray-100 pl-4 space-y-4">
            {pole.statusLogs.map((log) => (
              <div key={log.id}>
                <p className="text-xs text-gray-500">
                  {log.fromStatus} → {log.toStatus}
                </p>
                {log.reason && <p className="text-sm text-gray-700">{log.reason}</p>}
                <p className="text-xs text-gray-400 mt-0.5">
                  {log.changedBy.firstName} {log.changedBy.lastName} · {new Date(log.changedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
