import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Role } from '@/lib/generated/prisma'
import { getMyWorkOrders } from '@/actions/technician'
import WorkQueueClient from './WorkQueueClient'

export default async function WorkQueuePage() {
  const session = await getSession()
  if (!session) redirect('/login')
  if (session.user.role !== Role.TECHNICIAN) redirect('/dashboard')

  const orders = await getMyWorkOrders()

  return <WorkQueueClient orders={orders} />
}
