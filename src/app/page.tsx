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
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

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

// Custom SVG to match the street lamp from your mockup
const StreetLampIcon = ({ hasWarning = false }: { hasWarning?: boolean }) => (
  <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center">
    <svg
      viewBox="0 0 64 64"
      className="w-14 h-14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="10" y1="54" x2="54" y2="54" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <rect x="28" y="46" width="8" height="8" fill="white" stroke="#1e293b" strokeWidth="2" />
      <line x1="32" y1="46" x2="32" y2="18" stroke="#1e293b" strokeWidth="2" />
      <path d="M32 18 C 32 10, 42 10, 46 10 L48 10" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M44 10 L54 10 L52 16 L46 16 Z" fill="white" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <path d="M46 16 C 47 20, 51 20, 52 16" fill="#fcd34d" stroke="#1e293b" strokeWidth="2" />
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

  // Role & Menu States
  type UserRole = "superadmin" | "admin" | "technician" | "user";
  const [userRole, setUserRole] = useState<UserRole>("user"); // Change this to test different roles
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const recentPanelRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Debounced fetch of suggestions as the user types
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

  // Close suggestions, filters, recents, and menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setIsFilterOpen(false);
      }
      if (recentPanelRef.current && !recentPanelRef.current.contains(e.target as Node)) {
        setIsRecentOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
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
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#e5e7eb] font-sans">
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-[72px] bg-[#2f4383] flex flex-col items-center py-5 z-40 shadow-xl justify-between">
        <div className="flex flex-col items-center gap-8 w-full">
          
          {/* HAMBURGER MENU WITH ROLE-BASED DROPDOWN */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-[42px] h-[42px] rounded-xl border-2 flex items-center justify-center transition-colors ${isMenuOpen ? "bg-[#3b529a] border-transparent" : "border-[#dba65d] hover:bg-[#3b529a]"}`}
            >
              <Menu
                className={`w-6 h-6 ${isMenuOpen ? "text-white" : "text-[#dba65d]"}`}
                strokeWidth={2}
              />
            </button>

            {/* The Dropdown Panel */}
            {isMenuOpen && (
              <div className="absolute top-0 left-[60px] w-60 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-left-2 duration-200">
                {/* Header showing current role */}
                <div className="px-4 py-3 bg-[#f8fafc] border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {userRole} Menu
                  </span>
                </div>

                {/* Dynamic Menu Items based on Role */}
                <div className="py-2">
                  {roleMenuConfig[userRole].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-[14px] font-medium text-gray-700 hover:bg-[#f1f5f9] hover:text-[#2f4383] transition-colors"
                      >
                        <Icon className="w-4 h-4 text-gray-400" />
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {/* END HAMBURGER MENU */}

          {/* RECENTS BUTTON: Toggles the Panel */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsRecentOpen(!isRecentOpen);
            }}
            className={`w-full py-3 flex flex-col items-center gap-1.5 cursor-pointer transition-colors ${isRecentOpen ? "bg-[#3b529a] border-l-4 border-[#dba65d]" : "hover:bg-[#3b529a]/50 border-l-4 border-transparent"}`}
          >
            <button
              className={`w-[38px] h-[38px] rounded-full border-2 border-[#dba65d] flex items-center justify-center ${isRecentOpen ? "bg-[#dba65d]" : ""}`}
            >
              <Clock
                className={`w-5 h-5 ${isRecentOpen ? "text-white" : "text-[#dba65d]"}`}
                strokeWidth={2}
              />
            </button>
            <span className="text-[#dba65d] text-[11px] font-medium tracking-wide">
              Recents
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          <button className="w-[42px] h-[42px] flex items-center justify-center hover:bg-[#3b529a] rounded-lg transition-colors">
            <Languages className="w-6 h-6 text-[#dba65d]" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 relative flex flex-col">
        <Map targetLocation={searchedLocation} />

        {/* TOP HEADER */}
        <header className="absolute top-0 left-0 w-full h-[70px] bg-[#2f4383]/90 backdrop-blur-sm z-30 flex justify-between items-center px-8 border-b border-[#2f4383]/50 pointer-events-auto">
          <Logo className="w-auto h-[60px] mt-1" />
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

        {/* --- RECENT ACTIVITIES SLIDE-OUT PANEL --- */}
        {isRecentOpen && (
          <div
            ref={recentPanelRef}
            className="absolute top-[70px] left-0 bottom-0 w-[420px] bg-white z-20 shadow-[8px_0_24px_rgba(0,0,0,0.15)] flex flex-col animate-in slide-in-from-left-8 duration-200"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200/80">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Recent Activities
              </h2>
              <button
                onClick={() => setIsRecentOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4"
                >
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex justify-between items-center mb-2 pr-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      NODE ID: {activity.id}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {activity.time}
                    </span>
                  </div>
                  <h3 className="text-md font-bold text-gray-900 mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FLOATING MAP CONTROLS */}
        <div className="absolute inset-0 z-10 pointer-events-none mt-[70px]">
          <div
            ref={containerRef}
            className="absolute top-4 left-6 pointer-events-auto w-[750px]"
          >
            <div className="relative flex items-center w-full bg-white rounded-[20px] shadow-sm border border-slate-300 px-3 py-2">
              <div className="flex-grow flex items-center">
                <Search className="w-5 h-5 text-gray-500 ml-1 flex-shrink-0" />
                <div className="w-[1px] h-6 bg-slate-300 mx-3 flex-shrink-0"></div>
                <input
                  type="text"
                  placeholder={isSearching ? "Searching..." : "Search Location"}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() =>
                    suggestions.length > 0 && setShowSuggestions(true)
                  }
                  className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-[15px] font-medium"
                />
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
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-gray-700 border-b border-slate-100"
                  >
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
              <div className="mt-3 flex flex-col gap-3">
                {suggestions.map((result, index) => {
                  const addressParts = result.display_name.split(",");
                  const mainTitle = addressParts[0].toUpperCase();
                  const subAddress = addressParts.slice(1).join(",").trim();
                  const showWarning = index === 1 || index === 2;

                  return (
                    <button
                      key={result.place_id}
                      onClick={() => selectResult(result)}
                      className="flex items-center gap-5 w-full text-left p-4 bg-white rounded-2xl shadow-sm border border-slate-300 hover:shadow-md hover:border-slate-400 transition-all"
                    >
                      <StreetLampIcon hasWarning={showWarning} />
                      <div className="flex flex-col pr-2">
                        <span className="text-xl font-medium text-gray-900 tracking-wide">
                          {mainTitle}
                        </span>
                        <span className="text-[13px] text-gray-800 font-medium leading-snug mt-1">
                          {subAddress}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}