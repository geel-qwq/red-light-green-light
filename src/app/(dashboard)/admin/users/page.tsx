import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export default async function AdminUsersPage() {
  const session = await getSession()
  if (!session || !['ADMIN', 'SUPERADMIN'].includes(session.user.role)) {
    redirect('/dashboard')
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      city: true,
      barangay: true,
      createdAt: true,
    },
  })

  const roleBadge: Record<string, string> = {
    SUPERADMIN: 'bg-purple-50 text-purple-700',
    ADMIN: 'bg-blue-50 text-blue-700',
    TECHNICIAN: 'bg-amber-50 text-amber-700',
    USER: 'bg-gray-50 text-gray-600',
    GUEST: 'bg-gray-100 text-gray-400',
  }

  return (
    <div className="p-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-0.5 mb-6">View all registered users and their details.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Name</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Email</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Phone</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Role</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Barangay</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-700">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-3 text-gray-500">{user.email}</td>
                <td className="px-4 py-3 text-gray-500">{user.phone}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleBadge[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{user.barangay}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
