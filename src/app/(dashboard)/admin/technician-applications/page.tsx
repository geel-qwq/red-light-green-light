import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTechnicianApplications } from '@/actions/technician-applications'
import AdminApplicationsClient from './AdminApplicationsClient'

export default async function AdminTechnicianApplicationsPage() {
  const session = await getSession()
  if (!session || !['ADMIN', 'SUPERADMIN'].includes(session.user.role)) {
    redirect('/dashboard')
  }

  const applications = await getTechnicianApplications()

  return <AdminApplicationsClient applications={applications as any} />
}
