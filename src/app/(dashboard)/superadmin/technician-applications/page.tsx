import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTechnicianApplications } from '@/actions/technician-applications'
import SuperAdminApplicationsClient from './SuperAdminApplicationsClient'

export default async function SuperAdminTechnicianApplicationsPage() {
  const session = await getSession()
  if (!session || session.user.role !== 'SUPERADMIN') redirect('/dashboard')

  const applications = await getTechnicianApplications()

  return <SuperAdminApplicationsClient applications={applications as any} />
}
