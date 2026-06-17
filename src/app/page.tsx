"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Menu,
  Clock,
  Languages,
  Search,
  Filter,
  X,
  AlertTriangle,
  Users,
  Settings,
  Wrench,
  BarChart,
  MapPin,
  MessageSquare,
  Send,
  Bot,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { BarChart as BarChartIcon } from "lucide-react";
import UserFloatingDashboard from './(dashboard)/user/dashboard/_components/UserFloatingDashboard'
import TechnicianFloatingDashboard from './(dashboard)/technician/dashboard/_components/TechnicianFloatingDashboard'
import SuperAdminFloatingDashboard from './(dashboard)/superadmin/dashboard/_components/SuperAdminFloatingDashboard'

const Map = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#f4f5f7]">
      Loading interactive map...
    </div>
  ),
});

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

type UserRole = "superadmin" | "admin" | "technician" | "user";

interface UserDashboardReport {
  id: string;
  status: string;
  reportedAt: Date;
  description: string;
  pole: { poleCode: string; address: string };
}

const ROLE_MAP: Record<string, UserRole> = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  TECHNICIAN: "technician",
  USER: "user",
};

const StreetLampIcon = ({ hasWarning = false }: { hasWarning?: boolean }) => (
  <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center">
    <svg
      viewBox="0 0 64 64"
      className="w-14 h-14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="10"
        y1="54"
        x2="54"
        y2="54"
        stroke="#1e293b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="28"
        y="46"
        width="8"
        height="8"
        fill="white"
        stroke="#1e293b"
        strokeWidth="2"
      />
      <line x1="32" y1="46" x2="32" y2="18" stroke="#1e293b" strokeWidth="2" />
      <path
        d="M32 18 C 32 10, 42 10, 46 10 L48 10"
        stroke="#1e293b"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M44 10 L54 10 L52 16 L46 16 Z"
        fill="white"
        stroke="#1e293b"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M46 16 C 47 20, 51 20, 52 16"
        fill="#fcd34d"
        stroke="#1e293b"
        strokeWidth="2"
      />
    </svg>
    {hasWarning && (
      <div className="absolute bottom-2 right-0 bg-white rounded-full">
        <AlertTriangle className="w-5 h-5 text-black fill-yellow-400" />
      </div>
    )}
  </div>
);

export default function Page() {
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState<[number, number] | null>(null);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // States for panels
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRecentOpen, setIsRecentOpen] = useState(false);

  // --- NEW GPS STATE FOR SIDEBAR ---
  const [gpsLocation, setGpsLocation] = useState("Quezon City");

  // --- NEW FLOATING OVERVIEW STATE ---
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  // Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am LumenCHAT your map chatbot assistant. How can I help you handle node telemetry fields or street maps today?",
    },
  ]);

  // Dev fallback when no session; real session role takes precedence
  const [userRole] = useState<UserRole>("superadmin");
  const [sessionUser, setSessionUser] = useState<{ role: UserRole; name: string } | null>(null);
  const effectiveRole = sessionUser?.role ?? userRole;
  const [userDashboard, setUserDashboard] = useState<{
    stats: { total: number; open: number; resolved: number };
    recentReports: UserDashboardReport[];
  }>({ stats: { total: 0, open: 0, resolved: 0 }, recentReports: [] });
  const [technicianDashboard, setTechnicianDashboard] = useState<{
    stats: { assigned: number; inProgress: number; resolvedThisWeek: number };
    workOrders: {
      id: string;
      status: string;
      assignedAt: Date;
      faultReport: { faultType: string; description: string; pole: { poleCode: string; address: string } };
    }[];
  }>({ stats: { assigned: 0, inProgress: 0, resolvedThisWeek: 0 }, workOrders: [] });
  const [superadminDashboard, setSuperadminDashboard] = useState<{
    stats: { totalUsers: number; totalTechnicians: number; totalAdmins: number; pendingWorkOrders: number; openFaults: number; totalPoles: number }
  }>({ stats: { totalUsers: 0, totalTechnicians: 0, totalAdmins: 0, pendingWorkOrders: 0, openFaults: 0, totalPoles: 0 } });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const recentPanelRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    {
      id: "MCRT1",
      title: "Bonifacio Public Market",
      description: "Inspected Lamp Failure telemetry specs",
      time: "2 minutes ago",
    },
    {
      id: "MCRT2",
      title: "Gov. Pascual Ave",
      description: "Operational / Healthy check",
      time: "1 hour ago",
    },
  ]);

  const roleMenuConfig = {
    superadmin: [
      { title: "Dashboard Overview", icon: BarChart },
      { title: "User Management", icon: Users },
      { title: "System Settings", icon: Settings },
    ],
    admin: [
      { title: "Network Dashboard", icon: BarChart },
      { title: "Manage Nodes", icon: MapPin },
      { title: "Generate Reports", icon: BarChart },
    ],
    technician: [
      { title: "My Task Assignments", icon: Wrench },
      { title: "Maintenance Logs", icon: Settings },
      { title: "Active Alerts", icon: AlertTriangle },
    ],
    user: [
      { title: "View Map", icon: MapPin },
      { title: "Report an Issue", icon: AlertTriangle },
    ],
  };

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user?.role) {
          setSessionUser({
            role: ROLE_MAP[data.user.role] ?? "user",
            name: data.user.name ?? "User",
          });
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    if (!isOverviewOpen) return;

    fetch("/api/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load dashboard");
        return res.json();
      })
      .then((data) => {
        if (effectiveRole === "user" && data.userDashboard) {
          setUserDashboard({
            stats: data.userDashboard.stats,
            recentReports: data.userDashboard.recentReports.map(
              (report: UserDashboardReport & { reportedAt: string }) => ({
                ...report,
                reportedAt: new Date(report.reportedAt),
              }),
            ),
          });
        }
        if (effectiveRole === "technician" && data.technicianDashboard) {
          setTechnicianDashboard({
            stats: data.technicianDashboard.stats,
            workOrders: data.technicianDashboard.workOrders.map(
              (wo: { assignedAt: string } & Omit<typeof data.technicianDashboard.workOrders[0], "assignedAt">) => ({
                ...wo,
                assignedAt: new Date(wo.assignedAt),
              }),
            ),
          });
        }
        if (effectiveRole === "superadmin" && data.superadminDashboard) {
          setSuperadminDashboard({ stats: data.superadminDashboard.stats });
        }
      })
      .catch((err) => console.error(err));
  }, [isOverviewOpen, effectiveRole]);

  // --- DEVICE GEOLOCATION INITIALIZER ---
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Reverse lookup with OSM Nominatim API
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const locationName = data.address.city || data.address.town || data.address.village || data.address.municipality || "Quezon City";
          setGpsLocation(locationName);
        } catch (err) {
          console.error("Reverse geocoding processing error:", err);
        }
      },
      (error) => {
        console.warn("GPS Access withheld. Reverting telemetry fallback to Quezon City.", error);
      }
    );
  }, []);

  // Auto scroll down logic for chat window
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  // Handle AI Submission Event
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiLoading) return;

    const userMessageText = chatInput.trim();
    setChatInput("");

    const updatedMessages = [
      ...messages,
      { role: "user" as const, content: userMessageText },
    ];
    setMessages(updatedMessages);
    setIsAiLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `System Connection Error: ${data.error || "Failed payload resolution parsing execution sequence."}`,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Unable to connect to service network links. Check backend configuration environments.",
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Debounced search engine hooks
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const query = searchInput.trim();
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=5&q=${encodeURIComponent(query + ", Philippines")}`,
          { signal: controller.signal },
        );
        const data: SearchResult[] = await response.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error fetching suggestions:", err);
        }
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput]);

  // Click outside click trap routines
  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Ignore Leaflet map interactions
    if (target.closest(".leaflet-container")) {
      return;
    }

    if (containerRef.current && !containerRef.current.contains(target)) {
      setShowSuggestions(false);
      setIsFilterOpen(false);
    }

    if (recentPanelRef.current && !recentPanelRef.current.contains(target)) {
      setIsRecentOpen(false);
    }

    if (menuRef.current && !menuRef.current.contains(target)) {
      setIsMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const selectResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    setSearchedLocation([lat, lon]);
    const mainTitle = result.display_name.split(",")[0];
    setSearchInput(mainTitle);
    setShowSuggestions(false);

    const newActivity: Activity = {
      id: `NODE-${Math.floor(Math.random() * 1000)}`,
      title: mainTitle,
      description: "Searched location",
      time: "Just now",
    };

    setRecentActivities((prevActivities) => [newActivity, ...prevActivities]);
  };

  const handleDeleteActivity = (idToDelete: string) => {
    setRecentActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== idToDelete),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      selectResult(suggestions[0]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setIsFilterOpen(false);
      setIsRecentOpen(false);
      setIsMenuOpen(false);
      setIsDashboardOpen(false);
      setIsOverviewOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#e5e7eb] font-sans relative">

      {/* 1. LEFT SIDEBAR */}
      <style>{`
  @keyframes bounce-click {
    0%   { transform: scale(1); }
    30%  { transform: scale(0.82); }
    60%  { transform: scale(1.18); }
    80%  { transform: scale(0.95); }
    100% { transform: scale(1); }
  }
  .sidebar-btn-bounce:active .sidebar-icon-btn {
    animation: bounce-click 0.35s ease forwards;
  }
`}</style>

      <aside className="w-[64px] bg-brand-blue/90 backdrop-blur-[0.5px] flex flex-col items-center py-5 z-40 shadow-xl justify-between">
        <div className="flex flex-col items-center w-full">
          <div
            className="relative w-full py-3 flex flex-col items-center gap-1.5"
            ref={menuRef}
          >
            <div className="sidebar-btn-bounce w-full flex flex-col items-center gap-1.5">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`sidebar-icon-btn w-[38px] h-[38px] rounded-[2px] border-2 flex items-center justify-center transition-colors hover:cursor-pointer hover:rounded-full hover:bg-[#dba65d] hover:border-[#dba65d] group ${isMenuOpen ? "bg-[#dba65d] border-[#dba65d]" : "border-[#dba65d]"}`}
              >
                <Menu
                  className={`w-5 h-5 group-hover:text-white ${isMenuOpen ? "text-white" : "text-[#dba65d]"}`}
                  strokeWidth={2}
                />
              </button>
              <span className="text-[#dba65d] text-[10px] text-center px-0.5 font-bold tracking-wide leading-tight">
                Menu
              </span>
            </div>

            {/* Dropdown Menu Overlay */}
            {isMenuOpen && (
              <div className="absolute top-0 left-[60px] w-60 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-left-2 duration-200">
                <div className="px-4 py-3 bg-[#f8fafc] border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {effectiveRole} Menu
                  </span>
                </div>

                <div className="py-2">
                  {roleMenuConfig[effectiveRole].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-[14px] font-medium text-gray-700 hover:bg-[#dba65d] hover:text-white transition-colors group"
                      >
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* #2 FLOATING ACTION TRIGGER: System Overview */}
          {(effectiveRole === "admin" || effectiveRole === "superadmin") && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsOverviewOpen(!isOverviewOpen);
              }}
              className={`sidebar-btn-bounce w-full py-3 flex flex-col items-center gap-1.5 cursor-pointer transition-colors hover:cursor-pointer hover:bg-[#3b529a]/50 group ${isOverviewOpen ? "bg-[#3b529a] border-l-4 border-[#dba65d]" : "border-l-4 border-transparent"}`}
            >
              <button
                className={`sidebar-icon-btn w-[38px] h-[38px] rounded-[2px] border-2 border-[#dba65d] flex items-center justify-center hover:rounded-full hover:cursor-pointer hover:bg-[#dba65d] transition-all group-hover:bg-[#dba65d] ${isOverviewOpen ? "bg-[#dba65d]" : ""}`}
              >
                <BarChartIcon
                  className={`w-5 h-5 group-hover:text-white ${isOverviewOpen ? "text-white" : "text-[#dba65d]"}`}
                  strokeWidth={2}
                />
              </button>
              <span className="text-[#dba65d] text-[10px] text-center px-0.5 font-bold tracking-wide leading-tight">
                System Overview
              </span>
            </div>
          )}

          {effectiveRole === "user" && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsOverviewOpen(!isOverviewOpen);
              }}
              className={`sidebar-btn-bounce w-full py-3 flex flex-col items-center gap-1.5 cursor-pointer transition-colors hover:cursor-pointer hover:bg-[#3b529a]/50 group ${isOverviewOpen ? "bg-[#3b529a] border-l-4 border-[#dba65d]" : "border-l-4 border-transparent"}`}
            >
              <button
                className={`sidebar-icon-btn w-[38px] h-[38px] rounded-[2px] border-2 border-[#dba65d] flex items-center justify-center hover:rounded-full transition-all group-hover:bg-[#dba65d] ${isOverviewOpen ? "bg-[#dba65d]" : ""}`}
              >
                <BarChartIcon
                  className={`w-5 h-5 group-hover:text-white ${isOverviewOpen ? "text-white" : "text-[#dba65d]"}`}
                  strokeWidth={2}
                />
              </button>
              <span className="text-[#dba65d] text-[10px] text-center px-0.5 font-bold tracking-wide leading-tight">
                My Dashboard
              </span>
            </div>
          )}

          {/* #3 RECENTS SIDE-TAB TRIGGER */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsRecentOpen(!isRecentOpen);
            }}
            className={`sidebar-btn-bounce w-full py-3 flex flex-col items-center gap-1.5 cursor-pointer transition-colors justify-center hover:cursor-pointer hover:bg-[#3b529a]/50 group ${isRecentOpen ? "bg-[#3b529a] border-l-4 border-[#dba65d]" : "border-l-4 border-transparent"}`}
          >
            <button
              className={`sidebar-icon-btn w-[38px] h-[38px] rounded-[2px] border-2 border-[#dba65d] flex items-center justify-center hover:rounded-full transition-all hover:cursor-pointer group-hover:bg-[#dba65d] ${isRecentOpen ? "bg-[#dba65d]" : ""}`}
            >
              <Clock
                className={`w-5 h-5 group-hover:text-white ${isRecentOpen ? "text-white" : "text-[#dba65d]"}`}
                strokeWidth={2}
              />
            </button>
            <span className="text-[#dba65d] text-[11px] font-medium tracking-wide">
              Recents
            </span>
          </div>

        </div>

        {/* Bottom language button */}
        <div className="flex flex-col items-center w-full">
          <div className="sidebar-btn-bounce">
            <button className="sidebar-icon-btn w-[42px] h-[42px] flex items-center justify-center hover:bg-[#dba65d] rounded-lg transition-colors group">
              <Languages className="w-6 h-6 text-[#dba65d] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN MAP PAGE SPACE */}
      <main className="flex-1 relative flex flex-col">
        <Map targetLocation={searchedLocation} onMarkerClick={() => setShowSuggestions(false)}/>

        {/* TOP SYSTEM LOGO NAVIGATION BAR */}
        <header className="absolute top-0 left-0 w-full h-auto bg-brand-blue/90 backdrop-blur-[0.5px] z-30 flex justify-between items-center px-8 border-b border-[#2f4383]/50 pointer-events-auto">
          <div className="-ml-5 flex justify-center">
            <Logo className="mt-3 w-auto h-[44px]" />
            {/* ilLUMENate */}
            <div className="flex flex-col">
              <h1
                className="w-auto max-w-118 mx-auto text-[42px] font-koulen text-white text-center select-none"
                style={{
                  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextStrokeColor: "#1E3A8A",
                  font: "'koulen'"
                }}
              >
                il<span className="text-[#F4D35E]">lumen</span>ate
              </h1>
            </div>
            {/* REAL-TIME CLIENT-SIDE REVERSE GEOLOCATION NODE FIELD TEXT DISPLAY */}
            <p className="text-[11px] text-amber-300 font-bold tracking-wider uppercase pl-1 flex items-center gap-1">
              <span className="ml-5 mr-2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              Location Context: {gpsLocation}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href={"/login"}>
              <button className="cursor-pointer px-8 py-2.5 rounded-full font-bold text-[14px] text-[#dba65d] bg-white hover:bg-gray-100 transition-colors shadow-md">
                Login
              </button>
            </Link>
            <Link href={"/register"}>
              <button className="cursor-pointer px-8 py-2.5 rounded-full font-bold text-[14px] text-white bg-[#dba65d] hover:bg-[#c59553] transition-colors shadow-md">
                Sign Up
              </button>
            </Link>
          </div>
        </header>

        {/* --- RECENTS ACTIVITIES SLIDE PANEL TRAY --- */}
        {isRecentOpen && (
          <div
            ref={recentPanelRef}
            className="absolute top-[70px] left-0 bottom-0 w-[420px] bg-white z-20 shadow-[8px_0_24px_rgba(0,0,0,0.15)] flex flex-col animate-in slide-in-from-left-8 duration-200"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200/80">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Recent Activities</h2>
              <button
                onClick={() => setIsRecentOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4">
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex justify-between items-center mb-2 pr-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">NODE ID: {activity.id}</span>
                    <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                  </div>
                  <h3 className="text-md font-bold text-gray-900 mb-1">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FLOATING MAP CONTROLS CODES */}
        <div className="absolute inset-0 z-10 pointer-events-none mt-[70px]">
          <div ref={containerRef} className="absolute top-4 left-6 pointer-events-auto w-[480px] transition-all duration-300 hover:w-[650px]">
            <div className="relative flex items-center w-full bg-white rounded-[20px] shadow-sm border border-slate-300 px-3 py-2">
              <div className="flex items-center flex-1">
                <input
                  type="text"
                  placeholder={isSearching ? "Searching..." : "Search Location"}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-[15px] font-medium"
                />
                <div className="w-[1px] h-6 bg-slate-300 mx-3 shrink-0"></div>
              </div>

              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-slate-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter</span>
                </button>
                <button className="px-4 py-1.5 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-slate-50 transition-colors text-sm font-medium">
                  Barangay
                </button>
                <button className="px-4 py-1.5 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-slate-50 transition-colors text-sm font-medium">
                  Street
                </button>
              </div>

              {isFilterOpen && (
                <div className="absolute top-[110%] right-[140px] w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  <button onClick={() => setIsFilterOpen(false)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-gray-700 border-b border-slate-100">
                    <X className="w-4 h-4" />
                    <span className="text-sm">Clear Filter</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-gray-700 bg-slate-100">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Operational / Healthy</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm">Lamp Failure Fault</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span className="text-sm">Structural Pole Damage</span>
                  </button>
                </div>
              )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div
                className={`mt-3 flex flex-col gap-3 transition-all duration-200 ease-out ${showSuggestions && suggestions.length > 0
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
              >
                {suggestions.map((result, index) => {
                  const addressParts = result.display_name.split(",");
                  const mainTitle = addressParts[0].toUpperCase();
                  const subAddress = addressParts.slice(1).join(",").trim();
                  const showWarning = index === 1 || index === 2;

                  return (
                    <button
                      key={result.place_id}
                      onClick={() => selectResult(result)}
                      className="flex items-center gap-5 w-full text-left p-4 bg-white rounded-2xl shadow-sm border border-slate-300 hover:shadow-md hover:border-slate-400 hover:bg-gray-300 transition-all hover:cursor-pointer"
                    >
                      <StreetLampIcon hasWarning={showWarning} />
                      <div className="flex flex-col pr-2">
                        <span className="text-xl font-medium text-gray-900 tracking-wide">{mainTitle}</span>
                        <span className="text-[13px] text-gray-800 font-medium leading-snug mt-1">{subAddress}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* --- NEW FLOATING SYSTEM METRICS MODAL GLASS OVERLAY CONTROLLER --- */}
          {isOverviewOpen && (effectiveRole === "admin" || effectiveRole === "superadmin") && (
            <div className="absolute inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
              {/* Clicking outside the modal dashboard card cancels it */}
              <div className="absolute inset-0" onClick={() => setIsOverviewOpen(false)} />

              <div className="relative z-10 w-[90vw] max-w-6xl h-[80vh] bg-white/95 border border-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col p-6 md:p-8 overflow-y-auto">

                {/* Dismiss Modal Trigger Button */}
                <button
                  onClick={() => setIsOverviewOpen(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full transition-colors text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>

                {/* Dashboard Panel Metadata Header */}
                <div className="mb-6 pr-8">
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    System Overview Metrics Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Real-time crowd sourced operational summaries and municipal node tracking profiles for {gpsLocation}.
                  </p>
                </div>

                {/* Metric Summary Rows Card Matrix Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                  <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Fixes</span>
                    <span className="text-2xl font-black text-slate-800 my-1">MCRT1</span>
                    <span className="text-[10px] text-emerald-600 font-medium">✅ Resolved in last 2 hours</span>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Reported Outages</span>
                    <span className="text-3xl font-black text-slate-800 my-1">9</span>
                    <span className="text-[10px] text-rose-600 font-medium">🚨 Unresolved civic tickets</span>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ongoing Maintenance</span>
                    <span className="text-3xl font-black text-slate-800 my-1">3</span>
                    <span className="text-[10px] text-amber-600 font-medium">🛠️ Crew active in field</span>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Street With Least Lights</span>
                    <span className="text-xl font-bold text-slate-800 truncate my-1">Sta. Mesa</span>
                    <span className="text-[10px] text-slate-500 font-medium">💡 Total: 5 units</span>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col justify-between min-h-[110px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Street With Most Lights</span>
                    <span className="text-xl font-bold text-slate-800 truncate my-1">Pureza</span>
                    <span className="text-[10px] text-slate-500 font-medium">⚡ Total: 67 units</span>
                  </div>
                </div>

                {/* System Activity Stream Component Slot */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="mb-3">
                    <h2 className="text-base font-bold text-slate-800">Recent System Activity Logs</h2>
                    <p className="text-xs text-slate-400">Real-time tracking grid of infrastructure diagnostics and maintenance dispatches.</p>
                  </div>
                  <div className="flex-1 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-4 overflow-y-auto">
                    <div className="text-center text-slate-400 text-sm py-12">
                      Awaiting dynamic infrastructure database entries...
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* FLOATING AI TELEMETRY COPILOT PANEL */}
          <div className="absolute bottom-6 right-13 pointer-events-auto flex flex-col items-end z-40">
            {isChatOpen && (
              <div className="w-[380px] h-[480px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-slate-200 flex flex-col mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
                <div className="bg-[#2f4383] text-white px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      <Bot className="w-5 h-5 text-[#dba65d]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-wide">LumenCHAT</h3>
                      <p className="text-[11px] text-slate-300 font-medium">Your AI chatbot assistant</p>
                    </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5 text-slate-300 hover:text-white hover:cursor-pointer" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}>
                      <div className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed font-medium shadow-sm ${msg.role === "user" ? "bg-[#2f4383] text-white rounded-br-none" : "bg-white text-gray-800 border border-slate-200 rounded-bl-none"}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {isAiLoading && (
                    <div className="self-start flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-bl-none shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendChatMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about anomalies or hardware specs..."
                    className="flex-1 text-[14px] font-medium px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#2f4383] transition-colors"
                  />
                  <button type="submit" disabled={isAiLoading || !chatInput.trim()} className="p-2 bg-[#2f4383] text-white rounded-xl hover:bg-[#203063] disabled:bg-slate-200 disabled:text-slate-400 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${isChatOpen ? "bg-white border border-slate-200 text-gray-700 hover:bg-slate-50 rotate-90" : "bg-[#dba65d] text-white hover:bg-[#c59553] scale-100 hover:scale-105 hover:cursor-pointer"}`}
            >
              {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </main>

      {effectiveRole === "user" && (
        <UserFloatingDashboard
          isOpen={isOverviewOpen}
          onClose={() => setIsOverviewOpen(false)}
          stats={userDashboard.stats}
          recentReports={userDashboard.recentReports}
          userName={sessionUser?.name ?? "User"}
        />
      )}
      {effectiveRole === "technician" && (
        <TechnicianFloatingDashboard
          isOpen={isOverviewOpen}
          onClose={() => setIsOverviewOpen(false)}
          stats={technicianDashboard.stats}
          workOrders={technicianDashboard.workOrders}
          userName={sessionUser?.name ?? "Technician"}
        />
      )}
      {effectiveRole === "superadmin" && (
        <SuperAdminFloatingDashboard
          isOpen={isOverviewOpen}
          onClose={() => setIsOverviewOpen(false)}
          stats={superadminDashboard.stats}
          userName={sessionUser?.name ?? "Super Admin"}
        />
      )}
    </div>
  );
}