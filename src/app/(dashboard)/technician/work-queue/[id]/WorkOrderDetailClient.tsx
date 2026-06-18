'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  AlertTriangle,
  Wrench,
  CheckCircle2,
  PlayCircle,
  Navigation,
  Zap,
  FileText,
} from 'lucide-react'
import { updateWorkOrderStatusById, addMaintenanceLog } from '@/actions/technician'

const PoleLocationMap = dynamic(
  () => import('@/components/map/PoleLocationMap'),
  { ssr: false }
)

interface MaintenanceLog {
  id: string
  partsUsed: string | null
  timeSpent: number | null
  notes: string | null
  createdAt: Date
  technician: { firstName: string; lastName: string }
}

interface WorkOrder {
  id: string
  status: string
  assignedAt: Date
  resolvedAt: Date | null
  resolutionNotes: string | null
  faultReport: {
    faultType: string
    description: string
    reportedAt: Date
    latitude: number | null
    longitude: number | null
    reporterName: string | null
    reporterEmail: string | null
    reporterPhone: string | null
    pole: {
      poleCode: string
      address: string
      barangay: string
      latitude: number
      longitude: number
    }
    reportedBy: { firstName: string; lastName: string } | null
  }
  maintenanceLogs: MaintenanceLog[]
  assignedBy: { firstName: string; lastName: string }
}

const faultLabels: Record<string, string> = {
  NO_POWER: 'No Power',
  FLICKERING: 'Flickering',
  DAMAGED_FIXTURE: 'Damaged Fixture',
  VANDALISM: 'Vandalism',
  OTHER: 'Other',
}

const faultIcons: Record<string, typeof Zap> = {
  NO_POWER: Zap,
  FLICKERING: Zap,
  DAMAGED_FIXTURE: Wrench,
  VANDALISM: AlertTriangle,
  OTHER: AlertTriangle,
}

const statusBadges: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-600',
  ASSIGNED: 'bg-blue-50 text-blue-700',
  IN_PROGRESS: 'bg-amber-50 text-amber-700',
  RESOLVED: 'bg-green-50 text-green-700',
  CANCELLED: 'bg-red-50 text-red-500',
}

function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function WorkOrderDetailClient({
  order,
  userId,
}: {
  order: WorkOrder
  userId: string
}) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [showLogForm, setShowLogForm] = useState(false)
  const [partsUsed, setPartsUsed] = useState('')
  const [timeSpent, setTimeSpent] = useState('')
  const [notes, setNotes] = useState('')
  const [resolutionNotes, setResolutionNotes] = useState('')
  const [logs, setLogs] = useState<MaintenanceLog[]>(order.maintenanceLogs)
  const [showResolveForm, setShowResolveForm] = useState(false)

  const FaultIcon = faultIcons[order.faultReport.faultType] ?? AlertTriangle
  const lat = order.faultReport.pole.latitude
  const lng = order.faultReport.pole.longitude
  const navHref = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  const isResolved = order.status === 'RESOLVED' || order.status === 'CANCELLED'
  const isInProgress = order.status === 'IN_PROGRESS'
  const isAssigned = order.status === 'ASSIGNED' || order.status === 'PENDING'

  async function handleStartWork() {
    setIsUpdating(true)
    try {
      await updateWorkOrderStatusById(order.id, 'IN_PROGRESS')
      router.refresh()
    } catch (e) {
      alert('Failed to update status')
    } finally {
      setIsUpdating(false)
    }
  }

  async function handleResolve() {
    setIsUpdating(true)
    try {
      await updateWorkOrderStatusById(order.id, 'RESOLVED', resolutionNotes || undefined)
      router.refresh()
    } catch (e) {
      alert('Failed to resolve work order')
    } finally {
      setIsUpdating(false)
    }
  }

  async function handleAddLog() {
    try {
      const log = await addMaintenanceLog({
        workOrderId: order.id,
        partsUsed: partsUsed || undefined,
        timeSpent: timeSpent ? parseInt(timeSpent) : undefined,
        notes: notes || undefined,
      })
      setLogs((prev) => [{ ...log, createdAt: new Date(log.createdAt) }, ...prev])
      setPartsUsed('')
      setTimeSpent('')
      setNotes('')
      setShowLogForm(false)
    } catch (e) {
      alert('Failed to save maintenance log')
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <Link
        href="/technician/work-queue"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to work queue
      </Link>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-slate-100">
              {order.faultReport.pole.poleCode}
            </h1>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadges[order.status]}`}>
              {order.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {faultLabels[order.faultReport.faultType] ?? order.faultReport.faultType} — {order.faultReport.pole.address}
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="mb-6">
        <PoleLocationMap
          latitude={lat}
          longitude={lng}
          poleCode={order.faultReport.pole.poleCode}
          address={order.faultReport.pole.address}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {isAssigned && (
          <button
            onClick={handleStartWork}
            disabled={isUpdating}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            {isUpdating ? 'Updating...' : 'Start Work'}
          </button>
        )}
        {isInProgress && !showResolveForm && (
          <button
            onClick={() => setShowResolveForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark Resolved
          </button>
        )}
        <a
          href={navHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 text-sm font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Navigate
        </a>
      </div>

      {/* Resolve form */}
      {showResolveForm && (
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Resolution Notes</h3>
          <textarea
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value)}
            placeholder="Describe what was done to fix the issue..."
            rows={3}
            className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 resize-none mb-3"
          />
          <div className="flex gap-2">
            <button
              onClick={handleResolve}
              disabled={isUpdating}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isUpdating ? 'Resolving...' : 'Confirm Resolve'}
            </button>
            <button
              onClick={() => setShowResolveForm(false)}
              className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Fault Details</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <FaultIcon className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-700 dark:text-slate-200">{faultLabels[order.faultReport.faultType] ?? order.faultReport.faultType}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-slate-300">{order.faultReport.description}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-600 dark:text-slate-300">Reported {formatDateTime(order.faultReport.reportedAt)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Location</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-700 dark:text-slate-200">{order.faultReport.pole.address}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 ml-6">{order.faultReport.pole.barangay}</p>
          </div>
        </div>
      </div>

      {/* Reporter info */}
      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4 mb-6">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Reported By</p>
        {order.faultReport.reportedBy ? (
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-gray-700 dark:text-slate-200">
              {order.faultReport.reportedBy.firstName} {order.faultReport.reportedBy.lastName}
            </span>
          </div>
        ) : order.faultReport.reporterName ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-700 dark:text-slate-200">{order.faultReport.reporterName}</span>
            </div>
            {order.faultReport.reporterEmail && (
              <p className="text-xs text-gray-500 dark:text-slate-400 ml-6">{order.faultReport.reporterEmail}</p>
            )}
            {order.faultReport.reporterPhone && (
              <p className="text-xs text-gray-500 dark:text-slate-400 ml-6">{order.faultReport.reporterPhone}</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-slate-400">Anonymous report</p>
        )}
      </div>

      {/* Maintenance Logs */}
      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Maintenance Log</p>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
              {logs.length} entr{logs.length !== 1 ? 'ies' : 'y'}
            </p>
          </div>
          {!isResolved && (
            <button
              onClick={() => setShowLogForm(!showLogForm)}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              {showLogForm ? 'Cancel' : '+ Add Entry'}
            </button>
          )}
        </div>

        {/* Log form */}
        {showLogForm && (
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-slate-300 mb-1 block">Parts Used</label>
              <input
                type="text"
                value={partsUsed}
                onChange={(e) => setPartsUsed(e.target.value)}
                placeholder="e.g. Bulb, Ballast, Wire (optional)"
                className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-slate-300 mb-1 block">Time Spent (minutes)</label>
              <input
                type="number"
                value={timeSpent}
                onChange={(e) => setTimeSpent(e.target.value)}
                placeholder="e.g. 45"
                min="1"
                className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-slate-300 mb-1 block">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes about the maintenance..."
                rows={2}
                className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100 placeholder-gray-400 resize-none"
              />
            </div>
            <button
              onClick={handleAddLog}
              className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Log Entry
            </button>
          </div>
        )}

        {/* Log entries */}
        {logs.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-slate-500 text-center py-6">
            No maintenance logs recorded yet.
          </p>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="border border-gray-100 dark:border-slate-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-700 dark:text-slate-200">
                    {log.technician.firstName} {log.technician.lastName}
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-slate-500">
                    {formatDateTime(log.createdAt)}
                  </span>
                </div>
                {log.partsUsed && (
                  <p className="text-xs text-gray-600 dark:text-slate-300">
                    <span className="font-medium">Parts:</span> {log.partsUsed}
                  </p>
                )}
                {log.timeSpent && (
                  <p className="text-xs text-gray-600 dark:text-slate-300">
                    <span className="font-medium">Time:</span> {log.timeSpent} min
                  </p>
                )}
                {log.notes && (
                  <p className="text-xs text-gray-600 dark:text-slate-300 mt-1">{log.notes}</p>
                )}
                {!log.partsUsed && !log.timeSpent && !log.notes && (
                  <p className="text-xs text-gray-400 dark:text-slate-500 italic">No details recorded</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
