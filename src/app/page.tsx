'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Menu, Clock, Languages, Search, Filter, MapPin } from 'lucide-react';

const Map = dynamic(() => import('@/components/map/LeafletMap'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center bg-[#f4f5f7]">Loading interactive map...</div>
});

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function Page() {
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState<[number, number] | null>(null);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=6&q=${encodeURIComponent(query + ', Philippines')}`,
          { signal: controller.signal }
        );
        const data: SearchResult[] = await response.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching suggestions:', err);
        }
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput]);

  // Close suggestions when clicking outside the search box
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    setSearchedLocation([lat, lon]);
    setSearchInput(result.display_name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      selectResult(suggestions[0]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#e5e7eb] font-sans">

      {/* 1. LEFT SIDEBAR (Unchanged) */}
      <aside className="w-[72px] bg-[#2f4383] flex flex-col items-center py-5 z-20 shadow-xl justify-between">
        <div className="flex flex-col items-center gap-8 w-full">
          <button className="w-[42px] h-[42px] rounded-xl border-2 border-[#dba65d] flex items-center justify-center hover:bg-[#3b529a] transition-colors">
            <Menu className="w-6 h-6 text-[#dba65d]" strokeWidth={2} />
          </button>

          <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
            <button className="w-[38px] h-[38px] rounded-full border-2 border-[#dba65d] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#dba65d]" strokeWidth={2} />
            </button>
            <span className="text-[#dba65d] text-[11px] font-medium tracking-wide">Recents</span>
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

        {/* B. TOP HEADER */}
        <header className="absolute top-0 left-0 w-full h-[70px] bg-[#2f4383]/90 backdrop-blur-sm z-10 flex justify-between items-center px-8 border-b border-[#2f4383]/50 pointer-events-auto">
          <h1 className="text-3xl font-bold text-white tracking-widest drop-shadow-md">ILLUMENATE</h1>
          <div className="flex items-center gap-4">
            <button className="px-8 py-2.5 rounded-full font-bold text-[14px] text-[#dba65d] bg-white hover:bg-gray-100 transition-colors shadow-md">Log-in</button>
            <button className="px-8 py-2.5 rounded-full font-bold text-[14px] text-white bg-[#dba65d] hover:bg-[#c59553] transition-colors shadow-md">Sign Up</button>
          </div>
        </header>

        {/* C. FLOATING MAP CONTROLS */}
        <div className="absolute inset-0 z-10 pointer-events-none mt-[70px]">

          <div ref={containerRef} className="absolute top-4 left-6 pointer-events-auto w-[450px]">
            <div className="flex items-center w-full bg-white rounded-xl shadow-lg border border-slate-200 p-1.5">
              <Search className="w-5 h-5 text-gray-400 ml-3" />

              <input
                type="text"
                placeholder={isSearching ? "Searching..." : "Search Location"}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                className="flex-grow bg-transparent outline-none text-gray-800 placeholder:text-gray-400 p-2.5 text-[15px] font-medium"
              />

              <button className="flex items-center gap-2 px-5 py-2 bg-white text-[#2f4383] rounded-lg border-2 border-[#2f4383]/20 hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide">Filter</span>
              </button>
            </div>

            {/* AUTOCOMPLETE DROPDOWN */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="mt-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                {suggestions.map((result) => (
                  <button
                    key={result.place_id}
                    onClick={() => selectResult(result)}
                    className="flex items-start gap-3 w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-[#2f4383] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{result.display_name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}