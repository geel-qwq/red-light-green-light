import { getWorkOrders } from '@/actions/workorders'

const statusBadge: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-500',
  ASSIGNED: 'bg-blue-50 text-blue-600',
  IN_PROGRESS: 'bg-amber-50 text-amber-700',
  RESOLVED: 'bg-green-50 text-green-700',
  CANCELLED: 'bg-red-50 text-red-400',
}

export default async function WorkOrdersPage() {
  const orders = await getWorkOrders()

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold text-gray-900 mb-6">Work orders</h1>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Pole</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Fault</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Assigned to</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Assigned</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Resolved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-700">
                  {order.faultReport.pole.poleCode}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {order.faultReport.faultType.replace('_', ' ')}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {order.assignedTo?.name ?? <span className="text-gray-400">Unassigned</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[order.status]}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(order.assignedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {order.resolvedAt ? new Date(order.resolvedAt).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
