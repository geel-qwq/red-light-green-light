"use client";

import { useState } from 'react'
import { updateWorkOrderStatus } from '@/actions/workorders'

interface Props {
  orderId: string
  status: string
  userId?: string
  assignedToId?: string
}

export default function WorkOrdersClient({ orderId, status, userId, assignedToId }: Props) {
  const [showResolve, setShowResolve] = useState(false)
  const [resolution, setResolution] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(status)

  if (!userId) return null

  const uid: string = userId

  const isMyOrder = assignedToId === uid
  const canAct = isMyOrder && (currentStatus === 'ASSIGNED' || currentStatus === 'IN_PROGRESS')

  async function handleStart() {
    setLoading(true)
    try {
      await updateWorkOrderStatus(orderId, 'IN_PROGRESS', uid)
      setCurrentStatus('IN_PROGRESS')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleResolve() {
    if (!resolution.trim()) return
    setLoading(true)
    try {
      await updateWorkOrderStatus(orderId, 'RESOLVED', uid, resolution)
      setCurrentStatus('RESOLVED')
      setShowResolve(false)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (currentStatus === 'RESOLVED') return null

  if (showResolve) {
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
          onClick={handleResolve}
          disabled={loading || !resolution.trim()}
          className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          Done
        </button>
        <button
          onClick={() => setShowResolve(false)}
          className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-1">
      {canAct && currentStatus === 'ASSIGNED' && (
        <button
          onClick={handleStart}
          disabled={loading}
          className="px-2 py-1 bg-amber-500 text-white text-xs rounded hover:bg-amber-600 disabled:opacity-50 transition-colors"
        >
          Start
        </button>
      )}
      {canAct && currentStatus === 'IN_PROGRESS' && (
        <button
          onClick={() => setShowResolve(true)}
          disabled={loading}
          className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          Resolve
        </button>
      )}
    </div>
  )
}
