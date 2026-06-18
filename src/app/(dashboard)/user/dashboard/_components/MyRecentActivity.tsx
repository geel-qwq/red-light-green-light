"use client";

import { useState, useEffect } from "react";
import { MapPin, Search, Wrench, AlertTriangle } from "lucide-react";
import { getUserActivities, type UnifiedActivity } from "@/actions/activities";

const iconMap: Record<string, React.ElementType> = {
  FAULT_REPORT: AlertTriangle,
  TECHNICIAN_APPLICATION: Wrench,
  SEARCH: Search,
};

const statusDot: Record<string, string> = {
  OPEN: "bg-orange-400",
  IN_PROGRESS: "bg-amber-400",
  RESOLVED: "bg-green-500",
  CLOSED: "bg-gray-300",
  PENDING: "bg-blue-400",
  VERIFIED: "bg-green-500",
  REJECTED: "bg-red-400",
};

function timeAgo(date: Date) {
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default function MyRecentActivity() {
  const [activities, setActivities] = useState<UnifiedActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserActivities().then((data) => {
      setActivities(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="mb-5">
        <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
        <p className="text-xs text-gray-400 mt-0.5">Your latest actions</p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400 text-sm">Loading...</div>
      ) : activities.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">No activity yet.</div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[420px] pr-1">
          {activities.map((item) => {
            const Icon = iconMap[item.type];
            return (
              <div key={item.id} className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${statusDot[item.status ?? ""] ?? "bg-gray-300"}`} />
                  <div className="w-px flex-1 bg-gray-100 min-h-[20px]" />
                </div>
                <div className="pb-2 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                  <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                    {Icon && <Icon className="w-3 h-3" />}
                    {timeAgo(item.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
