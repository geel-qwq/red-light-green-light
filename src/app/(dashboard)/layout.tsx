import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ClientNavMenu from '@/components/ClientNavMenu'
import LocationDisplay from '@/components/LocationDisplay'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col justify-between">
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">SLMS</p>
            <LocationDisplay />
          </div>

          {/* Role-aware nav */}
          <ClientNavMenu userRole={(session.user as any).role} />
        </div>

        {/* User profile footer */}
        <div className="px-4 py-4 border-t border-gray-100 bg-white">
          <p className="text-xs font-medium text-gray-700">{session.user?.name}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
            {(session.user as any)?.role}
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}