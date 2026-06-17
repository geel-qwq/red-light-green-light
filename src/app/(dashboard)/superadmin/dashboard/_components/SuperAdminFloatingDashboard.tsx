"use client";

import { X, Users, Wrench, ClipboardList, AlertTriangle, MapPin } from "lucide-react";

interface SuperAdminFloatingDashboardProps {
  isOpen: boolean
  onClose: () => void
  stats: {
    totalUsers: number
    totalTechnicians: number
    totalAdmins: number
    pendingWorkOrders: number
    openFaults: number
    totalPoles: number
  }
  userName: string
}

export default function SuperAdminFloatingDashboard({
  isOpen,
  onClose,
  stats,
  userName,
}: SuperAdminFloatingDashboardProps) {
  if (!isOpen) return null

  const firstName = userName.split(' ')[0]

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-[90vw] max-w-3xl bg-white/95 backdrop-blur-md rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col p-6 md:p-8 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6 pr-8">
          <h1 className="text-xl font-bold text-slate-900">System Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Hi {firstName}! Here&apos;s a quick overview of the entire system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white border border-blue-100 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
            <span className="text-3xl font-black text-blue-600">{stats.totalUsers}</span>
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Users className="w-3 h-3" /> All accounts
            </span>
          </div>

          <div className="bg-white border border-violet-100 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Technicians</span>
            <span className="text-3xl font-black text-violet-600">{stats.totalTechnicians}</span>
            <span className="text-[10px] text-violet-500 font-medium flex items-center gap-1">
              <Wrench className="w-3 h-3" /> Field operatives
            </span>
          </div>

          <div className="bg-white border border-indigo-100 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admins</span>
            <span className="text-3xl font-black text-indigo-600">{stats.totalAdmins}</span>
            <span className="text-[10px] text-indigo-500 font-medium flex items-center gap-1">
              <Users className="w-3 h-3" /> System admins
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white border border-amber-100 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Work Orders</span>
            <span className="text-3xl font-black text-amber-500">{stats.pendingWorkOrders}</span>
            <span className="text-[10px] text-amber-600 font-medium flex items-center gap-1">
              <ClipboardList className="w-3 h-3" /> Awaiting assignment
            </span>
          </div>

          <div className="bg-white border border-red-100 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Open Faults</span>
            <span className="text-3xl font-black text-red-500">{stats.openFaults}</span>
            <span className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Unresolved reports
            </span>
          </div>

          <div className="bg-white border border-emerald-100 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Poles</span>
            <span className="text-3xl font-black text-emerald-600">{stats.totalPoles}</span>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Network infrastructure
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
