interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  city: string
  barangay: string
  createdAt: Date
}

const roleBadge: Record<string, string> = {
  SUPERADMIN: 'bg-red-100 text-red-700',
  ADMIN: 'bg-violet-100 text-violet-700',
  TECHNICIAN: 'bg-blue-100 text-blue-700',
  USER: 'bg-gray-100 text-gray-600',
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function UserTable({ users }: { users: User[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">All Registered Users</h2>
          <p className="text-xs text-gray-400 mt-0.5">Complete list of accounts in the system</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Name</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Email</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Phone</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Location</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Role</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400 text-sm">
                  No users registered yet.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-gray-900 whitespace-nowrap">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-3.5 pr-4 text-gray-500">{user.email}</td>
                  <td className="py-3.5 pr-4 text-gray-500">{user.phone}</td>
                  <td className="py-3.5 pr-4 text-gray-500 whitespace-nowrap">
                    {user.barangay}, {user.city}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${roleBadge[user.role] ?? 'bg-gray-100 text-gray-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 text-gray-400 whitespace-nowrap text-xs">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
