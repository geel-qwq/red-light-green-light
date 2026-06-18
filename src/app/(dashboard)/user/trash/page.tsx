"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, RotateCcw, ArrowLeft } from "lucide-react";
import { getDeletedUserReports, restoreUserReport } from "@/actions/community";
import { useRouter } from "next/navigation";

interface DeletedReport {
  id: string
  faultType: string
  description: string
  reportedAt: Date
  pole: { poleCode: string; address: string; barangay: string }
}

const faultLabels: Record<string, string> = {
  NO_POWER: "No Power",
  FLICKERING: "Flickering",
  DAMAGED_FIXTURE: "Damaged Fixture",
  VANDALISM: "Vandalism",
  OTHER: "Other",
}

function timeAgo(date: Date) {
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

export default function TrashPage() {
  const router = useRouter()
  const [reports, setReports] = useState<DeletedReport[]>([])
  const [loading, setLoading] = useState(true)
  const [restoring, setRestoring] = useState<string | null>(null)

  useEffect(() => {
    getDeletedUserReports().then((data) => {
      setReports(data as any)
      setLoading(false)
    })
  }, [])

  async function handleRestore(id: string) {
    setRestoring(id)
    await restoreUserReport(id)
    setReports((prev) => prev.filter((r) => r.id !== id))
    setRestoring(null)
    router.refresh()
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/user/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Trash</h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">Deleted reports can be restored from here</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
      ) : reports.length === 0 ? (
        <div className="text-center py-16">
          <Trash2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">Trash is empty</p>
          <Link href="/user/dashboard" className="inline-block mt-2 text-sm text-[#2f4383] hover:underline">
            Back to dashboard
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-gray-400">{report.pole.poleCode}</span>
                  <span className="text-[10px] text-gray-400">{timeAgo(report.reportedAt)}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{report.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {faultLabels[report.faultType] ?? report.faultType} — {report.pole.address}, {report.pole.barangay}
                </p>
              </div>
              <button
                onClick={() => handleRestore(report.id)}
                disabled={restoring === report.id}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {restoring === report.id ? "Restoring..." : "Restore"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
