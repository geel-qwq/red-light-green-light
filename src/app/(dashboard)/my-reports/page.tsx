"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, AlertTriangle, CheckCircle, Wrench, ArrowRight, BarChart3, Plus } from "lucide-react";
import { getUserFaultReports, getMyReportStats } from "@/actions/community";

interface ReportWithDetails {
  id: string;
  faultType: string;
  description: string;
  status: string;
  reportedAt: Date;
  pole: { poleCode: string; address: string; barangay: string };
  workOrder: { status: string; resolvedAt: Date | null; resolutionNotes: string | null } | null;
}

interface ReportStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  avgResolutionTime: number | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  OPEN: { label: "Open", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20", icon: AlertTriangle },
  IN_PROGRESS: { label: "In Progress", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", icon: Wrench },
  RESOLVED: { label: "Resolved", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", icon: CheckCircle },
  CLOSED: { label: "Closed", color: "text-gray-600", bg: "bg-gray-50 dark:bg-gray-900/20", icon: CheckCircle },
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function MyReportsPage() {
  const [reports, setReports] = useState<ReportWithDetails[]>([]);
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    Promise.all([getUserFaultReports(), getMyReportStats()]).then(([reportsData, statsData]) => {
      setReports(reportsData as any);
      setStats(statsData as any);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "ALL" ? reports : reports.filter((r) => r.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 dark:text-slate-400 text-sm">
        Loading reports…
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-slate-100">My Reports</h1>
          <p className="text-sm text-gray-400 dark:text-slate-400">Track your fault reports and their status</p>
        </div>
        <Link
          href="/report"
          className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-xl text-sm font-medium hover:bg-brand-royal-blue transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Report
        </Link>
      </div>

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total</p>
            <p className="text-2xl font-black text-gray-800 dark:text-slate-100 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-3">
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Open</p>
            <p className="text-2xl font-black text-red-600 mt-1">{stats.open}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-3">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">In Progress</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{stats.inProgress}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-3">
            <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Resolved</p>
            <p className="text-2xl font-black text-green-600 mt-1">{stats.resolved}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-3 col-span-2 sm:col-span-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Avg Resolution</p>
            <p className="text-2xl font-black text-gray-800 dark:text-slate-100 mt-1">
              {stats.avgResolutionTime != null ? `${stats.avgResolutionTime}h` : "—"}
            </p>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { key: "ALL", label: "All", color: "" },
          { key: "OPEN", label: "Open", color: "text-red-600" },
          { key: "IN_PROGRESS", label: "In Progress", color: "text-amber-600" },
          { key: "RESOLVED", label: "Resolved", color: "text-green-600" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              filter === tab.key
                ? "bg-brand-blue text-white"
                : "bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Report list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-gray-400 dark:text-slate-400">No reports found</p>
          <Link href="/report" className="mt-3 inline-flex items-center gap-1 text-sm text-brand-blue hover:underline">
            Submit your first report <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((report) => {
            const cfg = STATUS_CONFIG[report.status] ?? STATUS_CONFIG.OPEN;
            const Icon = cfg.icon;
            return (
              <div
                key={report.id}
                className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-gray-400 dark:text-slate-400">
                        {report.pole.poleCode}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.color}`}>
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-slate-400">{timeAgo(report.reportedAt)}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-slate-100 mt-1.5">
                      {report.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                      {report.faultType.replace("_", " ")} — {report.pole.address}, {report.pole.barangay}
                    </p>
                    {report.workOrder?.resolutionNotes && (
                      <div className="mt-2 text-xs text-gray-500 dark:text-slate-300 bg-gray-50 dark:bg-slate-700 rounded-lg px-3 py-2">
                        <span className="font-medium">Resolution:</span> {report.workOrder.resolutionNotes}
                      </div>
                    )}
                  </div>

                  {/* Status timeline dots */}
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-1">
                    {["OPEN", "IN_PROGRESS", "RESOLVED"].map((step, i) => {
                      const statusOrder = ["OPEN", "IN_PROGRESS", "RESOLVED"];
                      const idx = statusOrder.indexOf(report.status);
                      const done = i <= idx;
                      return (
                        <div key={step} className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${done ? "bg-brand-blue" : "bg-gray-200 dark:bg-slate-600"}`} />
                          {i < 2 && <div className={`w-0.5 h-3 ${i < idx ? "bg-brand-blue" : "bg-gray-200 dark:bg-slate-600"}`} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
