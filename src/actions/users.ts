'use server'

import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { Role } from '@/lib/generated/prisma/client'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(userId: string, newRole: string) {
  const session = await getSession()
  if (!session || session.user.role !== 'SUPERADMIN') {
    throw new Error('Unauthorized: only SUPERADMIN can change roles')
  }

  if (!Object.values(Role).includes(newRole as Role)) {
    throw new Error('Invalid role')
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole as Role },
  })

  revalidatePath('/superadmin/dashboard')
  revalidatePath('/admin/dashboard')
  revalidatePath('/dashboard')
}

export async function getUsers() {
  const session = await getSession()
  if (!session || session.user.role !== 'SUPERADMIN') {
    throw new Error('Unauthorized')
  }

  return prisma.user.findMany({
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
}
