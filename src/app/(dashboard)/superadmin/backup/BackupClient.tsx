'use client'

import { useState } from 'react'
import { exportAllPolesCsv, exportAllUsersCsv, getExportJson } from '@/actions/superadmin'
import { FileDown, Download, Database } from 'lucide-react'

export default function BackupClient() {
  const [exporting, setExporting] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleExportCsv(type: 'poles' | 'users') {
    setExporting(type)
    setMsg(null)
    try {
      const csv = type === 'poles' ? await exportAllPolesCsv() : await exportAllUsersCsv()
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${type}-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
      setMsg({ type: 'success', text: `${type === 'poles' ? 'Poles' : 'Users'} CSV downloaded` })
    } catch {
      setMsg({ type: 'error', text: 'Export failed' })
    } finally {
      setExporting(null)
    }
  }

  async function handleExportJson() {
    setExporting('json')
    setMsg(null)
    try {
      const data = await getExportJson()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `full-backup-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
      setMsg({ type: 'success', text: 'Full JSON backup downloaded' })
    } catch {
      setMsg({ type: 'error', text: 'Export failed' })
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="space-y-6">
      {msg && (
        <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
          msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900">CSV Exports</h2>
        <p className="text-xs text-gray-400">Download individual datasets as CSV files for spreadsheet analysis.</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleExportCsv('poles')}
            disabled={exporting === 'poles'}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <FileDown className="w-4 h-4" />
            {exporting === 'poles' ? 'Exporting...' : 'Export Poles CSV'}
          </button>
          <button
            onClick={() => handleExportCsv('users')}
            disabled={exporting === 'users'}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 disabled:opacity-50 transition-colors"
          >
            <FileDown className="w-4 h-4" />
            {exporting === 'users' ? 'Exporting...' : 'Export Users CSV'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900">Full JSON Backup</h2>
        <p className="text-xs text-gray-400">Download all system data (users, poles, fault reports, work orders, maintenance logs) as a single JSON file.</p>
        <button
          onClick={handleExportJson}
          disabled={exporting === 'json'}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          <Database className="w-4 h-4" />
          {exporting === 'json' ? 'Exporting...' : 'Download Full Backup (JSON)'}
        </button>
      </div>
    </div>
  )
}
