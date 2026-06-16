"use client";

import { X, FileText, AlertCircle, CheckCircle2, MapPin } from "lucide-react";

interface Report {
  id: string
  status: string
  reportedAt: Date
  description: string
  pole: { poleCode: string; address: string }
}

interface UserFloatingDashboardProps {
  isOpen: boolean
  onClose: () => void
  stats: {
    total: number
    open: number
    resolved: number
  }
  recentReports: Report[]
  userName: string
}

const statusStyles: Record<string, string> = {
  OPEN: 'bg-orange-100 text-orange-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-700',
  RESOLVED: 'bg-green-100 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-500',
}

function timeAgo(date: Date) {
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

export default function UserFloatingDashboard({
  isOpen,
  onClose,
  stats,
  recentReports,
  userName,
}: UserFloatingDashboardProps) {
  if (!isOpen) return null

  const firstName = userName.split(' ')[0]

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-[90vw] max-w-3xl bg-white/95 backdrop-blur-md rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col p-6 md:p-8 max-h-[85vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <h1 className="text-xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Hi {firstName}! Here's a quick summary of your submitted reports.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-blue-100 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Reports</span>
            <span className="text-3xl font-black text-blue-600">{stats.total}</span>
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <FileText className="w-3 h-3" /> All submissions
            </span>
          </div>

          <div className="bg-white border border-orange-100 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Open / Active</span>
            <span className="text-3xl font-black text-orange-500">{stats.open}</span>
            <span className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Awaiting resolution
            </span>
          </div>

          <div className="bg-white border border-green-100 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resolved</span>
            <span className="text-3xl font-black text-green-600">{stats.resolved}</span>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Fixed issues
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-5" />

        {/* Recent Reports */}
        <div>
          <h2 className="text-sm font-bold text-slate-800 mb-1">Recent Reports</h2>
          <p className="text-xs text-slate-400 mb-4">Your latest submitted fault reports</p>

          {recentReports.length === 0 ? (
            <div className="border border-dashed border-slate-200 rounded-xl bg-slate-50 py-10 text-center">
              <p className="text-slate-400 text-sm">You haven't submitted any reports yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <MapPin className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {report.pole.poleCode} — {report.pole.address}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[report.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {report.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-300 whitespace-nowrap">{timeAgo(report.reportedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}