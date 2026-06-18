"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { softDeleteUserReport, editUserReport } from "@/actions/community";
import { useRouter } from "next/navigation";

interface Report {
  id: string
  faultType: string
  status: string
  reportedAt: Date
  description: string
  pole: { poleCode: string; address: string; barangay: string }
  workOrder: {
    status: string
    assignedTo: { firstName: string; lastName: string } | null
  } | null
}

const statusStyles: Record<string, string> = {
  OPEN: "bg-orange-100 text-orange-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-500",
}

const faultLabels: Record<string, string> = {
  NO_POWER: "No Power",
  FLICKERING: "Flickering",
  DAMAGED_FIXTURE: "Damaged Fixture",
  VANDALISM: "Vandalism",
  OTHER: "Other",
}

const faultOptions = [
  { value: "NO_POWER", label: "No Power" },
  { value: "FLICKERING", label: "Flickering" },
  { value: "DAMAGED_FIXTURE", label: "Damaged Fixture" },
  { value: "VANDALISM", label: "Vandalism" },
  { value: "OTHER", label: "Other" },
]

function timeAgo(date: Date) {
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

function DeleteConfirm({ reportId, onClose }: { reportId: string; onClose: () => void }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base font-bold text-gray-900">Delete Report</h3>
        <p className="text-sm text-gray-500">Are you sure you want to delete this report? It will be moved to trash and can be restored later.</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">Cancel</button>
          <button
            onClick={async () => {
              setDeleting(true)
              await softDeleteUserReport(reportId)
              router.refresh()
              onClose()
            }}
            disabled={deleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}

function EditForm({ report, onClose }: { report: Report; onClose: () => void }) {
  const router = useRouter()
  const [description, setDescription] = useState(report.description)
  const [faultType, setFaultType] = useState(report.faultType)
  const [saving, setSaving] = useState(false)

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full space-y-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base font-bold text-gray-900">Edit Report</h3>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fault Type</label>
          <select
            value={faultType}
            onChange={(e) => setFaultType(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]"
          >
            {faultOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2f4383]"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">Cancel</button>
          <button
            onClick={async () => {
              if (!description.trim()) return
              setSaving(true)
              await editUserReport(report.id, { description, faultType: faultType as any })
              router.refresh()
              onClose()
            }}
            disabled={saving || !description.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-[#2f4383] hover:bg-[#243570] rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MyReportsTable({ reports }: { reports: Report[] }) {
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const canEdit = (status: string) => ["OPEN", "IN_PROGRESS"].includes(status)

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">My Fault Reports</h2>
          <p className="text-xs text-gray-400 mt-0.5">Your submitted reports and their current status</p>
        </div>
        <Link
          href="/report"
          className="text-xs font-semibold px-3 py-1.5 bg-[#2f4383] text-white rounded-lg hover:bg-[#243570] transition-colors"
        >
          + Report Issue
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">You haven't submitted any reports yet.</p>
          <Link
            href="/report"
            className="inline-block mt-3 text-xs font-semibold text-[#2f4383] hover:underline"
          >
            Report your first issue →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Pole</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Fault Type</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Assigned To</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Status</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pr-4">Reported</th>
                <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 pr-4">
                    <p className="font-semibold text-gray-900">{report.pole.poleCode}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[160px]">{report.pole.address}</p>
                  </td>
                  <td className="py-3.5 pr-4 text-gray-600 whitespace-nowrap">
                    {faultLabels[report.faultType] ?? report.faultType}
                  </td>
                  <td className="py-3.5 pr-4 text-gray-500 whitespace-nowrap">
                    {report.workOrder?.assignedTo
                      ? `${report.workOrder.assignedTo.firstName} ${report.workOrder.assignedTo.lastName}`
                      : <span className="text-gray-300 italic">Unassigned</span>}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[report.status] ?? "bg-gray-100 text-gray-500"}`}>
                      {report.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 text-xs text-gray-400 whitespace-nowrap">
                    {timeAgo(report.reportedAt)}
                  </td>
                  <td className="py-3.5 text-right whitespace-nowrap">
                    {canEdit(report.status) && (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditId(report.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#2f4383] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(report.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editId && <EditForm report={reports.find((r) => r.id === editId)!} onClose={() => setEditId(null)} />}
      {deleteId && <DeleteConfirm reportId={deleteId} onClose={() => setDeleteId(null)} />}
    </div>
  )
}
