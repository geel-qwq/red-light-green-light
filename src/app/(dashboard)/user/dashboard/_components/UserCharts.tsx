"use client";

import { BarChart3, AlertTriangle } from "lucide-react";

interface ReportItem {
  faultType: string;
  status: string;
  reportedAt: Date;
}

const FAULT_LABELS: Record<string, string> = {
  NO_POWER: "No Power",
  FLICKERING: "Flickering",
  DAMAGED_FIXTURE: "Damaged Fixture",
  VANDALISM: "Vandalism",
  OTHER: "Other",
};

const FAULT_COLORS: Record<string, string> = {
  NO_POWER: "#ef4444",
  FLICKERING: "#f59e0b",
  DAMAGED_FIXTURE: "#8b5cf6",
  VANDALISM: "#ec4899",
  OTHER: "#6b7280",
};

const STATUS_COLORS: Record<string, string> = {
  OPEN: "#f97316",
  IN_PROGRESS: "#f59e0b",
  RESOLVED: "#22c55e",
  CLOSED: "#6b7280",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function UserCharts({ reports }: { reports: ReportItem[] }) {
  const total = reports.length;

  const faultCounts: Record<string, number> = {};
  const statusCounts: Record<string, number> = {};
  const monthlyCounts: Record<string, number> = {};

  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthlyCounts[`${d.getFullYear()}-${d.getMonth()}`] = 0;
  }

  for (const r of reports) {
    faultCounts[r.faultType] = (faultCounts[r.faultType] ?? 0) + 1;
    statusCounts[r.status] = (statusCounts[r.status] ?? 0) + 1;

    const d = new Date(r.reportedAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (key in monthlyCounts) monthlyCounts[key] = (monthlyCounts[key] ?? 0) + 1;
    else monthlyCounts[key] = (monthlyCounts[key] ?? 0) + 1;
  }

  const maxFault = Math.max(...Object.values(faultCounts), 1);
  const maxMonthly = Math.max(...Object.values(monthlyCounts), 1);

  const faultEntries = Object.entries(faultCounts).sort((a, b) => b[1] - a[1]);
  const monthlyEntries = Object.entries(monthlyCounts).slice(-6);
  const statusEntries = Object.entries(statusCounts);

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-blue-500" />
        Report Analytics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Fault Type Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">By Fault Type</h3>
          <div className="space-y-2.5">
            {faultEntries.map(([type, count]) => (
              <div key={type}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{FAULT_LABELS[type] ?? type}</span>
                  <span className="text-gray-500 font-medium">{count}</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${(count / maxFault) * 100}%`, backgroundColor: FAULT_COLORS[type] ?? "#3b82f6" }}
                  />
                </div>
              </div>
            ))}
            {faultEntries.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">No data</p>
            )}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">Monthly Trend</h3>
          <div className="flex items-end gap-2 h-32">
            {monthlyEntries.map(([key, count]) => {
              const [, month] = key.split("-");
              const label = MONTHS[parseInt(month)] ?? month;
              return (
                <div key={key} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] text-gray-400 font-medium">{count}</span>
                  <div
                    className="w-full rounded-t bg-blue-500 transition-all"
                    style={{ height: `${(count / maxMonthly) * 100}%`, minHeight: count > 0 ? "4px" : "0px" }}
                  />
                  <span className="text-[10px] text-gray-500">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">By Status</h3>
          <div className="space-y-2.5">
            {statusEntries.map(([status, count]) => (
              <div key={status}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{status.replace("_", " ")}</span>
                  <span className="text-gray-500 font-medium">{count}</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${(count / total) * 100}%`, backgroundColor: STATUS_COLORS[status] ?? "#3b82f6" }}
                  />
                </div>
              </div>
            ))}
            {statusEntries.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">No data</p>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between text-xs text-gray-500">
            <span>Total reports</span>
            <span className="font-bold text-gray-800">{total}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
