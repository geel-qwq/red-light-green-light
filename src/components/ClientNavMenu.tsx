"use client";

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/Logout'
import { Role } from '@/lib/generated/prisma/client'

interface NavItem {
  href: string
  label: string
  icon: string
  roles: Role[]
}

const navItems: NavItem[] = [
  { href: '/superadmin/dashboard', label: 'Dashboard',  icon: '▦',  roles: [Role.SUPERADMIN] },
  { href: '/admin/dashboard', label: 'Dashboard',       icon: '▦',  roles: [Role.ADMIN] },
  { href: '/technician/dashboard', label: 'Dashboard',  icon: '▦',  roles: [Role.TECHNICIAN] },
  { href: '/user/dashboard',  label: 'Dashboard',       icon: '▦',  roles: [Role.USER] },
  { href: '/admin/users',     label: 'User Management', icon: '👥', roles: [Role.ADMIN, Role.SUPERADMIN] },
  { href: '/poles',           label: 'Poles',           icon: '⊕',  roles: [Role.SUPERADMIN, Role.TECHNICIAN] },
  { href: '/faults',          label: 'Fault Reports',   icon: '⚠',  roles: [Role.SUPERADMIN, Role.TECHNICIAN, Role.USER] },
  { href: '/workorders',      label: 'Work Orders',     icon: '✎',  roles: [Role.SUPERADMIN, Role.TECHNICIAN] },
  { href: '/reports',         label: 'Reports',         icon: '⊞',  roles: [Role.SUPERADMIN] },
]

interface Props {
  userRole: Role
}

export default function ClientNavMenu({ userRole }: Props) {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false)
  const pathname = usePathname()

  const visibleItems = navItems.filter((item) => item.roles.includes(userRole))

  return (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1 bg-white">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#f0f4ff] text-[#2f4383] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-base w-4 text-center">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}

        {/* System Overview — only for SUPERADMIN and ADMIN */}
        {(userRole === Role.SUPERADMIN || userRole === Role.ADMIN) && (
          <button
            onClick={() => setIsOverviewOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left"
          >
            <span className="text-base w-4 text-center text-amber-500 font-bold">📊</span>
            <span className="font-medium text-gray-600">System Overview</span>
          </button>
        )}

        <LogoutButton />
      </nav>

      {/* System Overview Modal — unchanged */}
      {isOverviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setIsOverviewOpen(false)} />
          <div className="relative z-10 w-[90vw] max-w-6xl h-[80vh] bg-white rounded-[24px] shadow-2xl flex flex-col p-6 md:p-8 overflow-y-auto">
            <button
              onClick={() => setIsOverviewOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full transition-colors font-bold text-sm"
            >
              ✕
            </button>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Overview Metrics Dashboard</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Real-time operational summaries and municipal node tracking profiles.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Fixes</span>
                <span className="text-2xl font-black text-slate-800 my-1">MCRT1</span>
                <span className="text-[10px] text-emerald-600 font-medium">✅ Resolved recently</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Reported Outages</span>
                <span className="text-3xl font-black text-slate-800 my-1">9</span>
                <span className="text-[10px] text-rose-600 font-medium">🚨 Unresolved civic tickets</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ongoing Maintenance</span>
                <span className="text-3xl font-black text-slate-800 my-1">3</span>
                <span className="text-[10px] text-amber-600 font-medium">🛠️ Crew active in field</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Street With Least Lights</span>
                <span className="text-xl font-bold text-slate-800 truncate my-1">Sta. Mesa</span>
                <span className="text-[10px] text-slate-500 font-medium">💡 Total: 5 units</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Street With Most Lights</span>
                <span className="text-xl font-bold text-slate-800 truncate my-1">Pureza</span>
                <span className="text-[10px] text-slate-500 font-medium">⚡ Total: 67 units</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-3">
                <h2 className="text-base font-bold text-slate-800">Recent System Activity Logs</h2>
                <p className="text-xs text-slate-400">Real-time vertical tracking feed of infrastructure diagnostics, maintenance logs, and civic reports.</p>
              </div>
              <div className="flex-1 border border-slate-100 rounded-xl bg-slate-50 p-4 overflow-y-auto">
                <div className="text-center text-slate-400 text-sm py-12">Awaiting database log streaming inputs...</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}