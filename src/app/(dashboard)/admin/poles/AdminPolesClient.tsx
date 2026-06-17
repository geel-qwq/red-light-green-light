"use client";

import { useState, useMemo } from 'react'
import { updatePoleStatus } from '@/actions/poles'

const statusBadge: Record<string, string> = {
  ACTIVE: 'bg-green-50 text-green-700',
  FAULTY: 'bg-red-50 text-red-600',
  UNDER_MAINTENANCE: 'bg-amber-50 text-amber-700',
  DECOMMISSIONED: 'bg-gray-100 text-gray-500',
}

const statusColors: Record<string, string> = {
  ACTIVE: 'text-green-700',
  FAULTY: 'text-red-600',
  UNDER_MAINTENANCE: 'text-amber-700',
  DECOMMISSIONED: 'text-gray-500',
}

interface Pole {
  id: string
  poleCode: string
  address: string
  barangay: string
  latitude: number
  longitude: number
  status: string
  installedAt: Date
  updatedAt: Date
  _count: { faultReports: number }
}

interface Props {
  poles: Pole[]
  barangays: string[]
  userId: string
}

export default function AdminPolesClient({ poles, barangays, userId }: Props) {
  const [search, setSearch] = useState('')
  const [barangayFilter, setBarangayFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return poles.filter((p) => {
      if (search) {
        const q = search.toLowerCase()
        if (!p.poleCode.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) return false
      }
      if (barangayFilter && p.barangay !== barangayFilter) return false
      if (statusFilter && p.status !== statusFilter) return false
      return true
    })
  }, [poles, search, barangayFilter, statusFilter])

  async function handleStatusChange(poleId: string, toStatus: string) {
    setUpdatingId(poleId)
    try {
      await updatePoleStatus(poleId, toStatus as any, userId)
    } catch (e) {
      console.error(e)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by code or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        />
        <select
          value={barangayFilter}
          onChange={(e) => setBarangayFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        >
          <option value="">All Barangays</option>
          {barangays.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="FAULTY">Faulty</option>
          <option value="UNDER_MAINTENANCE">Under Maintenance</option>
          <option value="DECOMMISSIONED">Decommissioned</option>
        </select>
        <span className="text-sm text-gray-400 self-center ml-auto">
          {filtered.length} of {poles.length} poles
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Code</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Address</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Barangay</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Faults</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((pole) => (
              <tr key={pole.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-gray-700">{pole.poleCode}</td>
                <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{pole.address}</td>
                <td className="px-4 py-3 text-gray-500">{pole.barangay}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[pole.status]}`}>
                    {pole.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{pole._count.faultReports}</td>
                <td className="px-4 py-3">
                  <select
                    value={pole.status}
                    disabled={updatingId === pole.id}
                    onChange={(e) => handleStatusChange(pole.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${statusColors[pole.status]} ${updatingId === pole.id ? 'opacity-50' : ''}`}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="FAULTY">Faulty</option>
                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                    <option value="DECOMMISSIONED">Decommissioned</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8 text-sm">No poles match your filters.</p>
        )}
      </div>
    </div>
  )
}
