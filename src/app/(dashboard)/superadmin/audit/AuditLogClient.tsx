'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { clearAuditLogs, getAuditLogs } from '@/actions/superadmin'

interface AuditLog {
  id: string
  userId: string
  userEmail: string
  userName: string
  role: string
  action: string
  entityType: string
  entityId: string | null
  metadata: string | null
  createdAt: Date
}

export default function AuditLogClient({ logs: initialLogs }: { logs: AuditLog[] }) {
  const [logs, setLogs] = useState(initialLogs)
  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState('')
  const [clearing, setClearing] = useState(false)
  const pollingRef = useRef(false)

  useEffect(() => {
    setLogs(initialLogs)
  }, [initialLogs])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (pollingRef.current) return
      pollingRef.current = true
      try {
        const fresh = await getAuditLogs()
        setLogs(fresh)
      } catch {
        // ignore polling errors
      } finally {
        pollingRef.current = false
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const actions = useMemo(() => [...new Set(logs.map(l => l.action))], [logs])

  const filtered = useMemo(() => {
    return logs.filter(l => {
      if (search) {
        const q = search.toLowerCase()
        if (!l.action.toLowerCase().includes(q) &&
            !l.entityType.toLowerCase().includes(q) &&
            !l.userName.toLowerCase().includes(q) &&
            !l.userEmail.toLowerCase().includes(q)) return false
      }
      if (actionFilter && l.action !== actionFilter) return false
      return true
    })
  }, [logs, search, actionFilter])

  function formatDate(d: Date) {
    return new Date(d).toLocaleString('en-PH', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
    })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by action, entity, user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        />
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        >
          <option value="">All Actions</option>
          {actions.map(a => (
            <option key={a} value={a}>{a.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <span className="text-sm text-gray-400 ml-auto">{filtered.length} entries</span>
        <span className="text-[10px] text-gray-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </span>
        <button
          onClick={async () => {
            if (!confirm('Clear all audit logs? This cannot be undone.')) return
            setClearing(true)
            try {
              await clearAuditLogs()
              const fresh = await getAuditLogs()
              setLogs(fresh)
            } catch {}
            setClearing(false)
          }}
          disabled={clearing}
          className="px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
        >
          {clearing ? 'Clearing...' : 'Clear All'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Timestamp</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">User</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Action</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Entity</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-10 text-sm">No audit entries found.</td>
              </tr>
            ) : (
              filtered.map(log => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap font-mono">
                    {formatDate(log.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-700 font-medium text-xs">{log.userName}</p>
                    <p className="text-gray-400 text-[10px]">{log.userEmail}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700">
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {log.entityType}{log.entityId ? ` #${log.entityId.slice(0, 8)}` : ''}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 max-w-xs truncate">
                    {log.metadata ?? '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
