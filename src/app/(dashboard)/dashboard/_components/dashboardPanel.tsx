"use client";

import { X } from "lucide-react";
import type { DashboardData, StatCard } from "./getDashboardData";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
}

interface DashboardPanelProps {
  data: DashboardData | null;
  onClose: () => void;
  activities: Activity[];
}

function StatCardItem({ card }: { card: StatCard }) {
  return (
    <div className="flex-1 min-w-[140px] bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
        {card.label}
      </p>
      <p className={`text-2xl font-bold ${card.color} truncate`}>{card.value}</p>
      {card.sublabel && (
        <p className="text-[11px] text-gray-400 mt-1.5">{card.sublabel}</p>
      )}
    </div>
  );
}

export default function DashboardPanel({ data, onClose, activities }: DashboardPanelProps) {
  return (
    <div className="absolute top-[70px] left-[88px] z-30 w-[760px] max-w-[calc(100%-110px)] bg-white rounded-2xl border-2 border-blue-400 shadow-[0_8px_30px_rgba(0,0,0,0.15)] p-6 animate-in fade-in slide-in-from-left-4 duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="mb-5 pr-8">
        <h2 className="text-xl font-bold text-gray-900">System Overview Metrics Dashboard</h2>
        <p className="text-sm text-gray-400 mt-1">
          Real-time crowd sourced operational summaries and municipal node tracking profiles.
        </p>
      </div>

      {/* Stat Cards */}
      {data ? (
        <div className="flex gap-3 flex-wrap">
          {data.cards.map((card) => (
            <StatCardItem key={card.label} card={card} />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 min-w-[140px] h-[88px] bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 my-5" />

      {/* Activity Logs */}
      <div>
        <h3 className="text-base font-bold text-gray-900">Recent System Activity Logs</h3>
        <p className="text-sm text-gray-400 mt-1 mb-4">
          Real-time vertical tracking feed of infrastructure diagnostics, maintenance logs, and civic reports.
        </p>

        <div className="max-h-[220px] overflow-y-auto flex flex-col gap-2">
          {activities.length === 0 ? (
            <div className="h-12 bg-white border border-gray-200 rounded-xl" />
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{activity.time}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}