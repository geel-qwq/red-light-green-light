"use client";

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Role } from '@/lib/generated/prisma/client'
import { getSystemOverview } from '@/actions/overview'
import { getNotifications, getUnreadCount, markNotificationRead, markAllNotificationsRead } from '@/actions/notifications'
import { signOut } from 'next-auth/react'
import DarkModeToggle from '@/components/DarkModeToggle'
import {
  LayoutDashboard,
  Map,
  Users,
  MapPin,
  AlertTriangle,
  ClipboardList,
  Package,
  BarChart3,
  X,
  CheckCircle,
  Siren,
  Wrench,
  Lightbulb,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: Date
}

interface SystemData {
  recentFix: { poleCode: string; timeAgo: string } | null
  openFaultsCount: number
  ongoingMaintenanceCount: number
  mostLights: { barangay: string; count: number } | null
  leastLights: { barangay: string; count: number } | null
  recentLogs: { id: string; poleCode: string; fromStatus: string; toStatus: string; changedBy: string; timeAgo: string }[]
}

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  roles: Role[]
}

const navItems: NavItem[] = [
  { href: '/superadmin/dashboard', label: 'Dashboard',  icon: LayoutDashboard,  roles: [Role.SUPERADMIN] },
  { href: '/admin/dashboard', label: 'Dashboard',       icon: LayoutDashboard,  roles: [Role.ADMIN] },
  { href: '/technician/dashboard', label: 'Dashboard',  icon: LayoutDashboard,  roles: [Role.TECHNICIAN] },
  { href: '/user/dashboard',  label: 'Dashboard',       icon: LayoutDashboard,  roles: [Role.USER] },
  { href: '/',                label: 'Map View',        icon: Map,              roles: [Role.USER] },
  { href: '/superadmin/users', label: 'User & Role Management', icon: Users,    roles: [Role.SUPERADMIN] },
  { href: '/admin/users',      label: 'User Management',        icon: Users,    roles: [Role.ADMIN] },
  { href: '/admin/poles',     label: 'Pole Data',       icon: MapPin,           roles: [Role.ADMIN] },
  { href: '/poles',           label: 'Poles',           icon: MapPin,           roles: [Role.SUPERADMIN, Role.TECHNICIAN] },
  { href: '/faults',          label: 'Fault Reports',   icon: AlertTriangle,    roles: [Role.SUPERADMIN, Role.TECHNICIAN, Role.USER, Role.ADMIN] },
  { href: '/workorders',      label: 'Work Orders',     icon: ClipboardList,    roles: [Role.SUPERADMIN, Role.TECHNICIAN, Role.ADMIN] },
  { href: '/technician/inventory', label: 'Inventory',   icon: Package,         roles: [Role.TECHNICIAN] },
  { href: '/reports',         label: 'Reports',         icon: BarChart3,        roles: [Role.SUPERADMIN, Role.ADMIN] },
]

interface Props {
  userRole: Role
  userName: string
}

export default function ClientNavMenu({ userRole, userName }: Props) {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false)
  const pathname = usePathname()
  const [overviewData, setOverviewData] = useState<SystemData | null>(null)
  const [overviewLoading, setOverviewLoading] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isNotifOpen, setIsNotifOpen] = useState(false)

  useEffect(() => {
    getUnreadCount().then(setUnreadCount)
    const interval = setInterval(() => {
      getUnreadCount().then(setUnreadCount)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleToggleNotif = useCallback(async () => {
    if (isNotifOpen) {
      setIsNotifOpen(false)
      return
    }
    const [notifs, count] = await Promise.all([
      getNotifications(),
      getUnreadCount(),
    ])
    setNotifications(notifs)
    setUnreadCount(count)
    setIsNotifOpen(true)
  }, [isNotifOpen])

  const handleMarkRead = useCallback(async (id: string) => {
    await markNotificationRead(id)
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }, [])

  const handleMarkAllRead = useCallback(async () => {
    await markAllNotificationsRead()
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }, [])

  const visibleItems = navItems.filter((item) => item.roles.includes(userRole))

  return (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1 bg-white dark:bg-slate-800">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#f0f4ff] dark:bg-slate-700 text-[#2f4383] dark:text-slate-100 font-semibold'
                  : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100'
              }`}
            >
              <item.icon className="w-4 h-4 text-gray-400 dark:text-slate-400 shrink-0" />
              {item.label}
            </Link>
          )
        })}

        {/* System Overview — only for SUPERADMIN and ADMIN */}
        {(userRole === Role.SUPERADMIN || userRole === Role.ADMIN) && (
          <button
            onClick={() => { setOverviewData(null); setIsOverviewOpen(true) }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100 transition-colors text-left"
          >
            <BarChart3 className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-medium text-gray-600 dark:text-slate-300">System Overview</span>
          </button>
        )}
      </nav>

      {/* Footer with notification bell + user info */}
      <div className="px-3 py-3 border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 relative">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-700 dark:text-slate-200 truncate">{userName}</p>
            <p className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase mt-0.5">{userRole}</p>
          </div>
          <DarkModeToggle />
          <button
            onClick={handleToggleNotif}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => signOut()}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            title="Logout"
          >
            <svg className="w-4 h-4 text-gray-400 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Notification dropdown */}
        {isNotifOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
            <div className="fixed bottom-auto left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 md:bottom-auto md:top-20 w-[calc(100vw-1rem)] sm:w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 z-50 max-h-96 flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={handleMarkAllRead} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-gray-400 dark:text-slate-400 text-sm py-8">No notifications yet.</p>
                ) : (
                  <div className="divide-y divide-gray-50 dark:divide-slate-700">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => handleMarkRead(n.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${!n.read ? 'bg-blue-50/40 dark:bg-blue-900/20' : ''}`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-transparent'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-slate-100">{n.title}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* System Overview Modal */}
      {isOverviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0" onClick={() => setIsOverviewOpen(false)} />
          <div className="relative z-10 w-full sm:w-[95vw] md:w-[90vw] max-w-6xl h-[85vh] sm:h-[80vh] bg-white dark:bg-slate-800 rounded-[16px] sm:rounded-[24px] shadow-2xl flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto">
            <button
              onClick={() => setIsOverviewOpen(false)}
              className="absolute top-6 right-6 text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">System Overview Metrics Dashboard</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Real-time operational summaries and municipal node tracking profiles.</p>
            </div>

            {overviewLoading ? (
              <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-400 text-sm">Loading data...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                  <div className="bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">Recent Fixes</span>
                    <span className="text-2xl font-black text-slate-800 dark:text-slate-100 my-1">{overviewData?.recentFix?.poleCode ?? '—'}</span>
                    <span className="text-[10px] text-emerald-600 font-medium inline-flex items-center gap-1">
                      {overviewData?.recentFix ? <><CheckCircle className="w-3 h-3" /> Resolved {overviewData.recentFix.timeAgo}</> : 'No resolved work orders'}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">Open Fault Reports</span>
                    <span className="text-3xl font-black text-slate-800 dark:text-slate-100 my-1">{overviewData?.openFaultsCount ?? '—'}</span>
                    <span className="text-[10px] text-rose-600 font-medium inline-flex items-center gap-1"><Siren className="w-3 h-3" /> Unresolved civic tickets</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">Ongoing Maintenance</span>
                    <span className="text-3xl font-black text-slate-800 dark:text-slate-100 my-1">{overviewData?.ongoingMaintenanceCount ?? '—'}</span>
                    <span className="text-[10px] text-amber-600 font-medium inline-flex items-center gap-1"><Wrench className="w-3 h-3" /> Crew active in field</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">Street With Least Lights</span>
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-100 truncate my-1">{overviewData?.leastLights?.barangay ?? '—'}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium inline-flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Total: {overviewData?.leastLights?.count ?? 0} units</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">Street With Most Lights</span>
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-100 truncate my-1">{overviewData?.mostLights?.barangay ?? '—'}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium inline-flex items-center gap-1"><Zap className="w-3 h-3" /> Total: {overviewData?.mostLights?.count ?? 0} units</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="mb-3">
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Recent System Activity Logs</h2>
                    <p className="text-xs text-slate-400 dark:text-slate-400">Real-time vertical tracking feed of infrastructure diagnostics, maintenance logs, and civic reports.</p>
                  </div>
                  <div className="flex-1 border border-slate-100 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 p-4 overflow-y-auto">
                    {overviewData && overviewData.recentLogs.length > 0 ? (
                      <div className="space-y-2">
                        {overviewData.recentLogs.map((log) => (
                          <div key={log.id} className="flex items-center justify-between text-xs py-1.5 px-2 bg-white dark:bg-slate-600 rounded-lg border border-slate-100 dark:border-slate-500">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-medium text-slate-700 dark:text-slate-200">{log.poleCode}</span>
                              <span className="text-slate-400 dark:text-slate-400">→</span>
                              <span className={`font-medium ${log.toStatus === 'ACTIVE' ? 'text-green-600' : log.toStatus === 'FAULTY' ? 'text-red-500' : log.toStatus === 'UNDER_MAINTENANCE' ? 'text-amber-600' : 'text-gray-500'}`}>
                                {log.toStatus.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-400">
                              <span>{log.changedBy}</span>
                              <span>{log.timeAgo}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-slate-400 dark:text-slate-400 text-sm py-12">No recent activity logs.</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}