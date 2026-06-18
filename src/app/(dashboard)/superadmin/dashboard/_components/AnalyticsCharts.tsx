interface BarItem {
  type: string
  count: number
}

const barColors = [
  'bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500',
  'bg-orange-500', 'bg-cyan-500',
]

const typeLabels: Record<string, string> = {
  NO_POWER: 'No Power',
  FLICKERING: 'Flickering',
  DAMAGED_FIXTURE: 'Damaged Fixture',
  VANDALISM: 'Vandalism',
  OTHER: 'Other',
}

function BarChart({ data, title, maxCount }: { data: BarItem[]; title: string; maxCount?: number }) {
  const max = maxCount ?? Math.max(...data.map(d => d.count), 1)
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No data available</p>
        )}
        {data.map((item, i) => (
          <div key={item.type}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium">{typeLabels[item.type] ?? item.type.replace(/_/g, ' ')}</span>
              <span className="text-gray-400 font-semibold">{item.count}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${barColors[i % barColors.length]} transition-all`}
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PieChartSimple({ data, title }: { data: BarItem[]; title: string }) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-4">{title}</h3>
      <div className="flex flex-col gap-2.5">
        {data.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No data available</p>
        )}
        {data.map((item, i) => (
          <div key={item.type} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${barColors[i % barColors.length]}`} />
            <span className="text-xs text-gray-600 flex-1">{item.type.replace(/_/g, ' ')}</span>
            <span className="text-xs font-semibold text-gray-900">{item.count}</span>
            <span className="text-[10px] text-gray-400 w-10 text-right">{Math.round((item.count / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface AnalyticsData {
  faultTypes: BarItem[]
  faultStatuses: BarItem[]
  usersByRole: BarItem[]
  workOrderStatuses: BarItem[]
  topFaultBarangays: { barangay: string; count: number }[]
  monthlyFaults: number
  monthlyResolved: number
  poleStats: { active: number; faulty: number; underMaintenance: number; decommissioned: number }
}

export default function AnalyticsCharts({ data }: { data: AnalyticsData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Advanced Analytics</h2>
        <p className="text-xs text-gray-400 mt-0.5">Breakdown of system metrics for data-driven decisions.</p>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Faults This Month</p>
          <p className="text-2xl font-black text-blue-700 mt-1">{data.monthlyFaults}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Resolved This Month</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">{data.monthlyResolved}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Open Work Orders</p>
          <p className="text-2xl font-black text-amber-700 mt-1">
            {data.workOrderStatuses.find(w => w.type === 'ASSIGNED' || w.type === 'PENDING' || w.type === 'IN_PROGRESS')
              ?.count ?? 0}
          </p>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 border border-rose-200">
          <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Faulty Poles</p>
          <p className="text-2xl font-black text-rose-700 mt-1">{data.poleStats.faulty}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={data.faultTypes} title="Fault Types Breakdown" />
        <PieChartSimple data={data.faultStatuses} title="Fault Report Statuses" />
        <BarChart data={data.usersByRole} title="Users by Role" />
        <PieChartSimple data={data.workOrderStatuses} title="Work Order Statuses" />
      </div>

      {/* Top Fault Barangays */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Top Barangays by Fault Count</h3>
        {data.topFaultBarangays.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No fault data by barangay.</p>
        ) : (
          <div className="space-y-3">
            {data.topFaultBarangays.map((b, i) => {
              const maxCount = data.topFaultBarangays[0]?.count || 1
              return (
                <div key={b.barangay}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">{b.barangay}</span>
                    <span className="text-gray-400 font-semibold">{b.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all"
                      style={{ width: `${(b.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
