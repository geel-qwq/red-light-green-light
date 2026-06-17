import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Role } from '@/lib/generated/prisma/client'
import UserTable from '../dashboard/_components/UserTable'
import RoleManagement from '../dashboard/_components/RoleManagement'

async function getData() {
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
  return { users }
}

export default async function SuperAdminUsers() {
  const session = await getSession()
  if (!session || session.user.role !== 'SUPERADMIN') redirect('/dashboard')

  const { users } = await getData()

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User & Role Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Full control over all accounts — change roles, view details, and manage system access.
        </p>
      </div>
      <RoleManagement users={users} />
      <UserTable users={users} />
    </div>
  )
}
