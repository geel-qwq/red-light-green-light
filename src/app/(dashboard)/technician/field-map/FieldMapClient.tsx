'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { MapPin, Navigation, Filter } from 'lucide-react'

const FieldMapView = dynamic(() => import('./FieldMapView'), { ssr: false })

interface FieldPole {
  poleCode: string
  address: string
  barangay: string
  latitude: number
  longitude: number
  status: string
  workOrderStatus: string
  faultType: string
  workOrderId: string
}

const statusColors: Record<string, string> = {
  ASSIGNED: 'bg-blue-500',
  IN_PROGRESS: 'bg-amber-500',
  RESOLVED: 'bg-green-500',
  PENDING: 'bg-gray-400',
  CANCELLED: 'bg-red-400',
}

const faultLabels: Record<string, string> = {
  NO_POWER: 'No Power',
  FLICKERING: 'Flickering',
  DAMAGED_FIXTURE: 'Damaged Fixture',
  VANDALISM: 'Vandalism',
  OTHER: 'Other',
}

export default function FieldMapClient({ poles }: { poles: FieldPole[] }) {
  const [filter, setFilter] = useState<string>('ALL')
  const [selectedPole, setSelectedPole] = useState<FieldPole | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'ALL') return poles
    return poles.filter((p) => p.workOrderStatus === filter)
  }, [poles, filter])

  const filters = ['ALL', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED']

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 sm:p-6 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-slate-100">Field Map</h1>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
              {filtered.length} pole{filtered.length !== 1 ? 's' : ''} in view
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
            <Filter className="w-3.5 h-3.5 text-gray-400 ml-1.5" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setSelectedPole(null) }}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-md transition-colors ${filter === f
                  ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100 shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
                  }`}
              >
                {f === 'ALL' ? 'All' : f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 relative min-h-0">
        <FieldMapView poles={filtered} onSelectPole={setSelectedPole} selectedPole={selectedPole} />
      </div>

      {/* Selected pole card */}
      {selectedPole && (
        <div className="border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${statusColors[selectedPole.workOrderStatus] ?? 'bg-gray-400'}`} />
                <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                  {selectedPole.poleCode}
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 truncate">
                {faultLabels[selectedPole.faultType] ?? selectedPole.faultType} — {selectedPole.address}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPole.latitude},${selectedPole.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                <Navigation className="w-4 h-4 text-gray-600 dark:text-slate-300" />
              </a>
              <Link
                href={`/ttechnician/field-mapechnician/work-queue/${selectedPole.workOrderId}`}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View Work Order
              </Link>
            </div>
          </div>
        </div>
      )}

      {!selectedPole && filtered.length > 0 && (
        <div className="border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3">
          <p className="text-xs text-gray-400 dark:text-slate-500 text-center">
            Tap a marker to see details
          </p>
        </div>
      )}
    </div>
  )
}
