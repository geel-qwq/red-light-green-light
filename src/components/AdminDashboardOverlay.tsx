"use client"

import { useState } from "react"
import { BarChart3, X, CheckCircle, Siren, Wrench, Lightbulb, Zap } from "lucide-react"

interface AdminOverlayProps {
  userRole: string
}

export default function AdminDashboardOverlay({ userRole }: AdminOverlayProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Only display the overlay activator button if the user is authorized
  if (userRole !== "ADMIN" && userRole !== "SUPERADMIN") return null

  return (
    <>
      {/* SIDEBAR BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer text-left"
      >
        <BarChart3 className="w-4 h-4" />
        System Overview
      </button>

      {/* FLOATING GLASSMORPHISM OVERLAY BOX */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          
          {/* Overlay Container Background click trap to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Metrics Card */}
          <div className="relative z-10 w-[92vw] max-w-6xl h-[85vh] bg-white/95 backdrop-blur-md border border-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col p-6 md:p-8 overflow-y-auto pointer-events-auto">
            
            {/* Close Button Trigger */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 size-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Dashboard Title Header */}
            <div className="mb-6 pr-8">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                System Overview Metrics Dashboard
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Real-time crowd sourced operational summaries and municipal node tracking profiles.
              </p>
            </div>

            {/* Metrics Row Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Fixes</span>
                <span className="text-2xl font-black text-slate-800 my-1">MCRT1</span>
                <span className="text-[10px] text-emerald-600 inline-flex items-center gap-1 font-medium"><CheckCircle className="w-3 h-3" /> Resolved in last 2 hours</span>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Reported Outages</span>
                <span className="text-3xl font-black text-slate-800 my-1">9</span>
                <span className="text-[10px] text-rose-600 inline-flex items-center gap-1 font-medium"><Siren className="w-3 h-3" /> Unresolved civic tickets</span>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ongoing Maintenance</span>
                <span className="text-3xl font-black text-slate-800 my-1">3</span>
                <span className="text-[10px] text-amber-600 inline-flex items-center gap-1 font-medium"><Wrench className="w-3 h-3" /> Crew active in field</span>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Street With Least Lights</span>
                <span className="text-xl font-bold text-slate-800 truncate my-1">Sta. Mesa</span>
                <span className="text-[10px] text-slate-500 font-medium inline-flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Total count: 5 units</span>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Street With Most Lights</span>
                <span className="text-xl font-bold text-slate-800 truncate my-1">Pureza</span>
                <span className="text-[10px] text-slate-500 font-medium inline-flex items-center gap-1"><Zap className="w-3 h-3" /> Total count: 67 units</span>
              </div>
            </div>

            {/* Activity Logs Area */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-3">
                <h2 className="text-lg font-bold text-slate-800">Recent System Activity Logs</h2>
                <p className="text-xs text-slate-400">Real-time vertical tracking feed of infrastructure diagnostics, maintenance logs, and civic reports.</p>
              </div>
              <div className="flex-1 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-4 overflow-y-auto">
                <div className="text-center text-slate-400 text-sm py-12">
                  Awaiting systemic log stream entries...
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}