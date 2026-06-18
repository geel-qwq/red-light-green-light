import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Role } from '@/lib/generated/prisma'
import { getTechnicianFieldPoles } from '@/actions/technician'
import FieldMapClient from './FieldMapClient'

export default async function FieldMapPage() {
  const session = await getSession()
  if (!session) redirect('/login')
  if (session.user.role !== Role.TECHNICIAN) redirect('/dashboard')

  const poles = await getTechnicianFieldPoles()

  return <FieldMapClient poles={poles} />
}
