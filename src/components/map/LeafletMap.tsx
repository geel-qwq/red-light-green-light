'use client';

// ============================================================
// LeafletMap.tsx
// Full-screen interactive map with:
//  - Default search marker (red pin)
//  - Live streetlight circles fetched from Overpass API
//  - Clicking a circle moves the main marker there and opens
//    the LocationDetails panel with real coordinates
//  - Hover on the active marker triggers a CSS bounce
// ============================================================

import { useEffect, useRef, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, ZoomControl,
  CircleMarker, useMap, useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LocationDetails from '../LocationDetails';

// ── Existing red-pin marker icon (unchanged shape/colour) ──
const customMarkerIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div style="color: #b23b3b; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// CHANGED: Same icon as above but with the extra CSS class "marker-bounce"
// so the hover-bounce keyframe (injected below) activates only when
// the marker was placed by clicking a streetlight circle.
const customMarkerIconBounce = new L.DivIcon({
  className: 'bg-transparent marker-bounce',
  html: `<div style="color: #b23b3b; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// ── Flies the map to a new position whenever targetLocation changes ──
function MapUpdater({ targetLocation }: { targetLocation?: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (targetLocation) {
      map.flyTo(targetLocation, 16, { duration: 1.5 });
    }
  }, [targetLocation, map]);
  return null;
}

// ── Props for the streetlight layer ──
interface StreetlightLayerProps {
  // Called with [lat, lng] when a circle is clicked
  onLightClick: (pos: [number, number]) => void;
  // The currently-selected light position (for highlight styling)
  selectedLight: [number, number] | null;
}

// ── Fetches and renders live streetlight circles via Overpass API ──
function StreetlightLayer({ onLightClick, selectedLight }: StreetlightLayerProps) {
  const [lights,       setLights]       = useState<[number, number][]>([]);
  const [isFetching,   setIsFetching]   = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  // CHANGED: Track hovered circle index for visual enlarge-on-hover
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const abortRef    = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.openstreetmap.ru/api/interpreter',
  ];

  const fetchLights = async (map: L.Map) => {
    // Don't fetch when zoomed out — too many results
    if (map.getZoom() < 15) { setLights([]); setError(null); return; }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsFetching(true);
    setError(null);

    const bounds = map.getBounds();
    const bbox   = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;

    const query = `
      [out:json][timeout:25];
      (
        node["highway"="street_lamp"](${bbox});
        node["man_made"="street_lamp"](${bbox});
        node["amenity"="street_lamp"](${bbox});
        way["lit"="yes"]["highway"](${bbox});
      );
      out body geom;
    `;

    for (const endpoint of ENDPOINTS) {
      try {
        const res  = await fetch(`${endpoint}?data=${encodeURIComponent(query)}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Status ${res.status}`);

        const data = await res.json();
        const fetched: [number, number][] = [];

        for (const el of data.elements) {
          if (el.type === 'node' && typeof el.lat === 'number' && typeof el.lon === 'number') {
            fetched.push([el.lat, el.lon]);
          } else if (el.type === 'way' && Array.isArray(el.geometry)) {
            el.geometry.forEach((pt: any, idx: number) => {
              if (pt && idx % 3 === 0) fetched.push([pt.lat, pt.lon]);
            });
          }
        }

        setLights(fetched);
        setIsFetching(false);
        return; // success — stop trying other endpoints
      } catch (err: any) {
        if (err.name === 'AbortError') return; // superseded by newer request
        console.warn(`Overpass endpoint failed (${endpoint}):`, err);
      }
    }

    setIsFetching(false);
    setError('Could not load streetlight data right now.');
  };

  // Re-fetch whenever the map viewport stops moving
  const map = useMapEvents({
    moveend: () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => fetchLights(map), 500);
    },
  });

  // Initial fetch on mount
  useEffect(() => {
    fetchLights(map);
    return () => {
      abortRef.current?.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CHANGED: Returns true when this circle is the currently-selected one
  const isSelected = (pos: [number, number]) =>
    selectedLight !== null &&
    selectedLight[0] === pos[0] &&
    selectedLight[1] === pos[1];

  return (
    <>
      {/* Fetch status toasts */}
      {isFetching && (
        <div className="absolute top-20 right-4 z-[400] bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-slate-600 border border-slate-200">
          Fetching live streetlights...
        </div>
      )}
      {error && !isFetching && (
        <div className="absolute top-20 right-4 z-[400] bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-red-500 border border-slate-200">
          {error}
        </div>
      )}
      {!isFetching && !error && lights.length === 0 && (
        <div className="absolute top-20 right-4 z-[400] bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-slate-500 border border-slate-200">
          No tagged streetlights here
        </div>
      )}

      {/* Streetlight circles */}
      {lights.map((light, index) => (
        <CircleMarker
          key={`light-${light[0]}-${light[1]}-${index}`}
          center={light}
          // CHANGED: Grow on hover/selection for tactile affordance
          radius={isSelected(light) ? 7 : hoveredIndex === index ? 6 : 4}
          pathOptions={{
            color:       '#dba65d',
            fillColor:   '#FFD700',
            fillOpacity: isSelected(light) ? 1 : hoveredIndex === index ? 1 : 0.8,
            // CHANGED: Thicker stroke when selected so it reads as "active"
            weight:      isSelected(light) ? 3 : hoveredIndex === index ? 2 : 1,
          }}
          eventHandlers={{
            // CHANGED: Click → move main marker here and open details panel
            click:      () => onLightClick(light),
            // CHANGED: Hover in/out → update hoveredIndex for visual feedback
            mouseover:  () => setHoveredIndex(index),
            mouseout:   () => setHoveredIndex(null),
          }}
        />
      ))}
    </>
  );
}

// ── Main component props ──
interface LeafletMapProps {
  targetLocation?: [number, number] | null;
  onMarkerClick?:  () => void;
}

export default function LeafletMap({ targetLocation, onMarkerClick }: LeafletMapProps) {
  const defaultCenter: [number, number] = [14.6507, 120.9842];

  // Forces MapContainer to remount cleanly after a search
  const mapKey = targetLocation ? `${targetLocation[0]}-${targetLocation[1]}` : 'default-map';

  // CHANGED: Position of the last-clicked streetlight (null = use search/default)
  const [activeLight,   setActiveLight]   = useState<[number, number] | null>(null);
  // CHANGED: Mirrors activeLight — passed to StreetlightLayer for circle highlight
  const [selectedLight, setSelectedLight] = useState<[number, number] | null>(null);

  // CHANGED: When a circle is clicked, save its position and open the details panel
  const handleLightClick = (pos: [number, number]) => {
    setActiveLight(pos);
    setSelectedLight(pos);
    setShowDetails(true);       // open panel automatically
    onMarkerClick?.();
  };

  // CHANGED: Inject bounce keyframe once on mount; clean up on unmount.
  // Only .marker-bounce markers get the animation — the plain customMarkerIcon is unaffected.
  useEffect(() => {
    const styleId = 'marker-bounce-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id    = styleId;
      style.textContent = `
        @keyframes markerBounce {
          0%,  100% { transform: translateY(0px);   }
          25%        { transform: translateY(-6px);  }
          55%        { transform: translateY(-11px); }
          75%        { transform: translateY(-4px);  }
        }
        .leaflet-marker-icon.marker-bounce:hover div {
          animation: markerBounce 0.45s ease;
        }
      `;
      document.head.appendChild(style);
    }
    return () => { document.getElementById(styleId)?.remove(); };
  }, []);

  // Details panel open/close state
  const [showDetails, setShowDetails] = useState(false);

  // Close panel when clicking outside the map or the panel itself
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('.map-container') || t.closest('.location-details')) return;
      setShowDetails(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // CHANGED: Reset active streetlight whenever a new search location is set
  useEffect(() => {
    setActiveLight(null);
    setSelectedLight(null);
    setShowDetails(false);
  }, [targetLocation]);

  // CHANGED: Marker sits at the clicked light → search result → map default
  const markerPosition: [number, number] = activeLight ?? targetLocation ?? defaultCenter;

  return (
    <div className="absolute inset-0 z-[0] map-container">
      <MapContainer
        key={mapKey}
        center={targetLocation || defaultCenter}
        zoom={16}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <ZoomControl position="bottomright" />

        {/* CHANGED: Fly to the clicked streetlight if set, else the search result */}
        <MapUpdater targetLocation={activeLight ?? targetLocation} />

        {/* CHANGED: Streetlight circles with click + hover handlers */}
        <StreetlightLayer
          onLightClick={handleLightClick}
          selectedLight={selectedLight}
        />

        {/*
          CHANGED: Use customMarkerIconBounce (adds .marker-bounce class) when the
          marker was placed on a clicked streetlight so hover-bounce is active.
          Otherwise use the plain customMarkerIcon. SVG shape is identical in both.
        */}
        <Marker
          position={markerPosition}
          icon={activeLight ? customMarkerIconBounce : customMarkerIcon}
          eventHandlers={{
            click: () => {
              setShowDetails(true);
              onMarkerClick?.();
            },
          }}
        />

        {/*
          CHANGED: LocationDetails now receives real coordinates and status info.
          When activeLight is set we pass its lat/lng; for a search result we
          pass targetLocation coords. Status defaults to "ACTIVE" for OSM nodes
          since we don't have DB pole data for arbitrary map clicks.
        */}
        <div className="location-details">
          <LocationDetails
            isOpen={showDetails}
            title={
              activeLight
                ? `Streetlight @ ${activeLight[0].toFixed(4)}, ${activeLight[1].toFixed(4)}`
                : (targetLocation ? "Searched Location" : "Default Location")
            }
            address={
              activeLight
                ? "Live node — OpenStreetMap"
                : "Quezon City, Metro Manila"
            }
            status="ACTIVE"
            latitude={activeLight?.[0] ?? targetLocation?.[0] ?? defaultCenter[0]}
            longitude={activeLight?.[1] ?? targetLocation?.[1] ?? defaultCenter[1]}
          />
        </div>

      </MapContainer>
    </div>
  );
}