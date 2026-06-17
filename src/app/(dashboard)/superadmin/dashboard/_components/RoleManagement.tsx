'use client'

import { useState } from 'react'
import { updateUserRole } from '@/actions/users'
import { Role } from '@/lib/generated/prisma/client'

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

const allRoles = [Role.SUPERADMIN, Role.ADMIN, Role.TECHNICIAN, Role.USER]

export default function RoleManagement({ users }: { users: User[] }) {
  const [changingId, setChangingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleRoleChange(userId: string, newRole: string) {
    setChangingId(userId)
    setError(null)
    try {
      await updateUserRole(userId, newRole)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update role')
    } finally {
      setChangingId(null)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">Role Management</h2>
          <p className="text-xs text-gray-400 mt-0.5">Change user roles across the system</p>
        </div>
        <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
          {users.length} user{users.length !== 1 ? 's' : ''}
        </span>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-100 text-red-600 text-xs font-medium px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm min-w-[550px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Name</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Email</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Location</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Current Role</th>
              <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Change Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 pr-4 font-semibold text-gray-900 whitespace-nowrap">
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-3.5 pr-4 text-gray-500">{user.email}</td>
                <td className="py-3.5 pr-4 text-gray-500 whitespace-nowrap">
                  {user.barangay}, {user.city}
                </td>
                <td className="py-3.5 pr-4">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${roleBadge[user.role] ?? 'bg-gray-100 text-gray-600'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3.5">
                  <select
                    defaultValue=""
                    disabled={changingId === user.id}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
                  >
                    <option value="" disabled>Change to...</option>
                    {allRoles.filter((r) => r !== user.role).map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
