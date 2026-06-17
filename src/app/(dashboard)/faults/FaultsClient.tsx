"use client";

import { useState } from 'react'
import { fixFaultReport } from '@/actions/faults'

interface Props {
  faultReportId: string
  role: string
  userId?: string
}

export default function FaultsClient({ faultReportId, role, userId }: Props) {
  const [showFix, setShowFix] = useState(false)
  const [resolution, setResolution] = useState('')
  const [loading, setLoading] = useState(false)
  const [fixed, setFixed] = useState(false)

  if (!userId) return null
  if (role !== 'TECHNICIAN') return null
  if (fixed) return <span className="text-green-600 text-xs font-medium">Fixed</span>

  async function handleFix() {
    if (!resolution.trim()) return
    setLoading(true)
    try {
      await fixFaultReport(faultReportId, userId!, resolution)
      setFixed(true)
      setShowFix(false)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (showFix) {
    return (
      <div className="flex gap-1">
        <input
          type="text"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          placeholder="Resolution notes..."
          className="w-28 px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          onClick={handleFix}
          disabled={loading || !resolution.trim()}
          className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          Fix
        </button>
        <button
          onClick={() => setShowFix(false)}
          className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowFix(true)}
      className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
    >
      Fix
    </button>
  )
}
