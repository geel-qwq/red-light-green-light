'use client'

import { useState, useMemo } from 'react'
import { updatePoleStatus } from '@/actions/poles'
import { createPole, deletePole } from '@/actions/superadmin'

const statusBadge: Record<string, string> = {
  ACTIVE: 'bg-green-50 text-green-700',
  FAULTY: 'bg-red-50 text-red-600',
  UNDER_MAINTENANCE: 'bg-amber-50 text-amber-700',
  DECOMMISSIONED: 'bg-gray-100 text-gray-500',
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
  _count: { faultReports: number; statusLogs: number }
}

interface Props {
  poles: Pole[]
  barangays: string[]
  userId: string
}

export default function SuperAdminPolesClient({ poles, barangays, userId }: Props) {
  const [search, setSearch] = useState('')
  const [barangayFilter, setBarangayFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newPole, setNewPole] = useState({
    poleCode: '', address: '', barangay: '', latitude: '', longitude: '', status: 'ACTIVE',
  })
  const [creating, setCreating] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const filtered = useMemo(() => {
    return poles.filter(p => {
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

  async function handleDelete(poleId: string, poleCode: string) {
    if (!confirm(`Delete pole "${poleCode}"? This cannot be undone.`)) return
    setUpdatingId(poleId)
    try {
      await deletePole(poleId)
      setMsg({ type: 'success', text: `Deleted "${poleCode}"` })
    } catch {
      setMsg({ type: 'error', text: 'Failed to delete pole' })
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleCreate() {
    if (!newPole.poleCode || !newPole.address || !newPole.barangay) {
      setMsg({ type: 'error', text: 'Pole Code, Address, and Barangay are required' })
      return
    }
    setCreating(true)
    setMsg(null)
    try {
      await createPole({
        poleCode: newPole.poleCode,
        address: newPole.address,
        barangay: newPole.barangay,
        latitude: parseFloat(newPole.latitude) || 0,
        longitude: parseFloat(newPole.longitude) || 0,
        status: newPole.status,
      })
      setShowCreate(false)
      setNewPole({ poleCode: '', address: '', barangay: '', latitude: '', longitude: '', status: 'ACTIVE' })
      setMsg({ type: 'success', text: `Pole "${newPole.poleCode}" created` })
    } catch (e) {
      setMsg({ type: 'error', text: e instanceof Error ? e.message : 'Failed to create pole' })
    } finally {
      setCreating(false)
    }
  }

  return (
    <div>
      {msg && (
        <div className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium ${
          msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          {msg.text}
        </div>
      )}

      {/* Filters + Create Button */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by code or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        />
        <select
          value={barangayFilter}
          onChange={(e) => setBarangayFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        >
          <option value="">All Barangays</option>
          {barangays.map(b => (
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
        <span className="text-sm text-gray-400">{filtered.length} of {poles.length} poles</span>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="ml-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showCreate ? 'Cancel' : '+ New Pole'}
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="mb-4 bg-gray-50 border border-gray-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Pole Code *"
            value={newPole.poleCode}
            onChange={e => setNewPole({ ...newPole, poleCode: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <input
            type="text"
            placeholder="Address *"
            value={newPole.address}
            onChange={e => setNewPole({ ...newPole, address: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <select
            value={newPole.barangay}
            onChange={e => setNewPole({ ...newPole, barangay: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          >
            <option value="">Select Barangay *</option>
            {barangays.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={newPole.latitude}
            onChange={e => setNewPole({ ...newPole, latitude: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={newPole.longitude}
            onChange={e => setNewPole({ ...newPole, longitude: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <select
            value={newPole.status}
            onChange={e => setNewPole({ ...newPole, status: e.target.value })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          >
            <option value="ACTIVE">Active</option>
            <option value="FAULTY">Faulty</option>
            <option value="UNDER_MAINTENANCE">Under Maintenance</option>
            <option value="DECOMMISSIONED">Decommissioned</option>
          </select>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors sm:col-span-2 lg:col-span-3"
          >
            {creating ? 'Creating...' : 'Create Pole'}
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[750px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Code</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Address</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Barangay</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Faults</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Change Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(pole => (
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
                    onChange={e => handleStatusChange(pole.id, e.target.value)}
                    className="text-xs px-2 py-1 rounded border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="FAULTY">Faulty</option>
                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                    <option value="DECOMMISSIONED">Decommissioned</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(pole.id, pole.poleCode)}
                    disabled={updatingId === pole.id}
                    className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
                  >
                    Delete
                  </button>
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
