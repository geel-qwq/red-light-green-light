import { getSession } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { Role } from '@/lib/generated/prisma'
import { getMyWorkOrderById } from '@/actions/technician'
import WorkOrderDetailClient from './WorkOrderDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export default async function WorkOrderDetailPage({ params }: Props) {
  const session = await getSession()
  if (!session) redirect('/login')
  if (session.user.role !== Role.TECHNICIAN) redirect('/dashboard')

  const { id } = await params
  const order = await getMyWorkOrderById(id)
  if (!order) notFound()

  return <WorkOrderDetailClient order={order} userId={session.user.id} />
}
