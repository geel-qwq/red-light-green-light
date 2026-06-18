'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ClipboardList,
  MapPin,
  Zap,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Wrench,
} from 'lucide-react'

interface WorkOrder {
  id: string
  status: string
  faultReport: {
    faultType: string
    description: string
    reportedAt: Date
    pole: { poleCode: string; address: string; barangay: string }
  }
  maintenanceLogs: { id: string }[]
}

const statusStyles: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-600',
  ASSIGNED: 'bg-blue-50 text-blue-700',
  IN_PROGRESS: 'bg-amber-50 text-amber-700',
  RESOLVED: 'bg-green-50 text-green-700',
  CANCELLED: 'bg-red-50 text-red-500',
}

const faultIcons: Record<string, typeof Zap> = {
  NO_POWER: Zap,
  FLICKERING: Zap,
  DAMAGED_FIXTURE: Wrench,
  VANDALISM: AlertTriangle,
  OTHER: AlertTriangle,
}

const faultLabels: Record<string, string> = {
  NO_POWER: 'No Power',
  FLICKERING: 'Flickering',
  DAMAGED_FIXTURE: 'Damaged Fixture',
  VANDALISM: 'Vandalism',
  OTHER: 'Other',
}

function formatDate(date: Date | string) {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString()
}

export default function WorkQueueClient({ orders }: { orders: WorkOrder[] }) {
  const [offlineReady, setOfflineReady] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('technician_work_queue', JSON.stringify(orders))
      localStorage.setItem('technician_work_queue_synced', new Date().toISOString())
      setOfflineReady(true)
    } catch {}
  }, [orders])

  const pending = orders.filter((o) => o.status === 'ASSIGNED' || o.status === 'PENDING')
  const inProgress = orders.filter((o) => o.status === 'IN_PROGRESS')
  const resolved = orders.filter((o) => o.status === 'RESOLVED' || o.status === 'CANCELLED')

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">My Work Queue</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            {orders.length} assigned work order{orders.length !== 1 ? 's' : ''}
          </p>
        </div>
        {offlineReady && (
          <span className="text-[11px] text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Offline cache ready
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
          <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{pending.length}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Pending</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-600">{inProgress.length}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">In Progress</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-600">{resolved.length}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Resolved</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <ClipboardList className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-slate-400 text-sm">No work orders assigned to you yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const FaultIcon = faultIcons[order.faultReport.faultType] ?? AlertTriangle
            return (
              <Link
                key={order.id}
                href={`/technician/work-queue/${order.id}`}
                className="block bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4 hover:shadow-sm hover:border-gray-200 dark:hover:border-slate-600 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl ${
                    order.status === 'RESOLVED' || order.status === 'CANCELLED'
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : order.status === 'IN_PROGRESS'
                        ? 'bg-amber-50 dark:bg-amber-900/20'
                        : 'bg-blue-50 dark:bg-blue-900/20'
                  }`}>
                    <FaultIcon className={`w-5 h-5 ${
                      order.status === 'RESOLVED' || order.status === 'CANCELLED'
                        ? 'text-green-600 dark:text-green-400'
                        : order.status === 'IN_PROGRESS'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 truncate">
                        {order.faultReport.pole.poleCode}
                      </p>
                      <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 truncate">
                      {faultLabels[order.faultReport.faultType] ?? order.faultReport.faultType} — {order.faultReport.pole.address}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {order.faultReport.pole.barangay}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(order.faultReport.reportedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
