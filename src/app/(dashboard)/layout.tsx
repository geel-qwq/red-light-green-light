import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '▦' },
  { href: '/poles', label: 'Poles', icon: '⊕' },
  { href: '/faults', label: 'Fault Reports', icon: '⚠' },
  { href: '/workorders', label: 'Work Orders', icon: '✎' },
  { href: '/reports', label: 'Reports', icon: '⊞' },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">SLMS</p>
          <p className="text-sm text-gray-500 mt-0.5">Quezon City</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">{session.user?.name}</p>
          <p className="text-xs text-gray-400">{(session.user as any)?.role}</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
