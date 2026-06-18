import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import SettingsClient from './SettingsClient'

export default async function SuperAdminSettings() {
  const session = await getSession()
  if (!session || session.user.role !== 'SUPERADMIN') redirect('/dashboard')

  const settings = await prisma.systemSetting.findMany()
  const settingsMap: Record<string, string> = {}
  for (const s of settings) settingsMap[s.key] = s.value

  const barangays = await prisma.pole.findMany({
    distinct: ['barangay'],
    select: { barangay: true },
    orderBy: { barangay: 'asc' },
  })

  return (
    <div className="p-4 sm:p-8 max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Configure city name, barangay list, map defaults, and other system-wide preferences.</p>
      </div>
      <SettingsClient
        settings={settingsMap}
        existingBarangays={barangays.map(b => b.barangay)}
      />
    </div>
  )
}
