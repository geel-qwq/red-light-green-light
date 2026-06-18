import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import BackupClient from './BackupClient'

export default async function SuperAdminBackup() {
  const session = await getSession()
  if (!session || session.user.role !== 'SUPERADMIN') redirect('/dashboard')

  return (
    <div className="p-4 sm:p-8 max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Backup & Export</h1>
        <p className="text-sm text-gray-500 mt-1">Export system data for backup, analysis, or migration purposes.</p>
      </div>
      <BackupClient />
    </div>
  )
}
