import { Wrench } from 'lucide-react'

interface Technician {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  barangay: string
  workOrdersAssigned: { id: string; status: string }[]
}

const statusColor: Record<string, string> = {
  PENDING: 'bg-gray-200 text-gray-600',
  ASSIGNED: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
}

export default function TechnicianOverview({ technicians }: { technicians: Technician[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">Technician Overview</h2>
          <p className="text-xs text-gray-400 mt-0.5">Active workload per field technician</p>
        </div>
        <span className="text-xs font-semibold bg-violet-50 text-violet-600 px-2.5 py-1 rounded-full">
          {technicians.length} technician{technicians.length !== 1 ? 's' : ''}
        </span>
      </div>

      {technicians.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">No technicians registered yet.</div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100">
          {technicians.map((tech) => {
            const activeCount = tech.workOrdersAssigned.length
            const statusGroups = tech.workOrdersAssigned.reduce<Record<string, number>>((acc, wo) => {
              acc[wo.status] = (acc[wo.status] ?? 0) + 1
              return acc
            }, {})

            return (
              <div key={tech.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {tech.firstName} {tech.lastName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{tech.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {activeCount === 0 ? (
                    <span className="text-xs text-gray-400 font-medium">Idle</span>
                  ) : (
                    Object.entries(statusGroups).map(([status, count]) => (
                      <span
                        key={status}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusColor[status] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        {count} {status.replace('_', ' ')}
                      </span>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}