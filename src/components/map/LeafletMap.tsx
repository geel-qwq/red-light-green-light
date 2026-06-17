
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, ZoomControl,
  useMap, useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LocationDetails from '../LocationDetails';

// ── Existing red-pin marker icon ──
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

// ── Pole/light status, mirroring polemap.tsx's statusColor + LocationDetails'
type PoleStatus = 'ACTIVE' | 'FAULTY' | 'UNDER_MAINTENANCE' | 'DECOMMISSIONED';

// ── Status → icon file in public/marker_icons ──
// NOTE: these filenames are placeholders — rename them (and the extension,
// if you're using .svg instead of .png) to match whatever actually lives
// in public/marker_icons.
const STATUS_ICON_FILE: Record<PoleStatus, string> = {
  ACTIVE:            '/marker_icons/lamp-active.png',
  FAULTY:            '/marker_icons/lamp-faulty.png',
  UNDER_MAINTENANCE: '/marker_icons/lamp-under_maintenance.png',
  DECOMMISSIONED:    '/marker_icons/lamp-decommissioned.png',
};

type LightVisualState = 'default' | 'hovered' | 'selected';

// Base icon size in px — hover/selected just scale this up via CSS below,
// so bump this single number if the icons read too small/large overall.
const STREETLIGHT_ICON_PX = 22;

// Finite (status × state) combinations, so build each L.Icon once and
// reuse it across markers/re-renders instead of recreating on every render.
const statusIconCache = new Map<string, L.Icon>();

function getStatusIcon(status: PoleStatus, state: LightVisualState): L.Icon {
  const cacheKey = `${status}-${state}`;
  const cached = statusIconCache.get(cacheKey);
  if (cached) return cached;

  const icon = new L.Icon({
    iconUrl: STATUS_ICON_FILE[status] ?? STATUS_ICON_FILE.ACTIVE,
    iconSize: [STREETLIGHT_ICON_PX, STREETLIGHT_ICON_PX],
    iconAnchor: [STREETLIGHT_ICON_PX / 2, STREETLIGHT_ICON_PX / 2],
    className: [
      'streetlight-status-icon',
      state !== 'default' ? `streetlight-status-icon--${state}` : '',
    ].filter(Boolean).join(' '),
  });

  statusIconCache.set(cacheKey, icon);
  return icon;
}

// ── Flies the map to a new position whenever targetLocation changes ──
function MapUpdater({ targetLocation }: { targetLocation?: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (targetLocation) {
      map.flyTo(targetLocation, map.getZoom(), {
        duration: 0.8,
      });
    }
  }, [targetLocation, map]);
  return null;
}

// A streetlight pulled live from OpenStreetMap. OSM carries no fault/
// operational status of its own — these default to ACTIVE until/unless
// cross-referenced with this app's real pole records.
interface OsmLight {
  position: [number, number];
  status: PoleStatus;
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
  const [lights,       setLights]       = useState<OsmLight[]>([]);
  const [isFetching,   setIsFetching]   = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const abortRef    = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.openstreetmap.ru/api/interpreter',
  ];

  const fetchLights = async (map: L.Map) => {
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
        const fetched: OsmLight[] = [];

        for (const el of data.elements) {
          if (el.type === 'node' && typeof el.lat === 'number' && typeof el.lon === 'number') {
            fetched.push({ position: [el.lat, el.lon], status: 'ACTIVE' });
          } else if (el.type === 'way' && Array.isArray(el.geometry)) {
            el.geometry.forEach((pt: any, idx: number) => {
              if (pt && idx % 3 === 0) fetched.push({ position: [pt.lat, pt.lon], status: 'ACTIVE' });
            });
          }
        }

        setLights(fetched);
        setIsFetching(false);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
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

      {/* Streetlight icons — status-coded, same status set as polemap.tsx */}
      {lights.map((light, index) => {
        const state: LightVisualState = isSelected(light.position)
          ? 'selected'
          : hoveredIndex === index
            ? 'hovered'
            : 'default';

        return (
          <Marker
            key={`light-${light.position[0]}-${light.position[1]}-${index}`}
            position={light.position}
            icon={getStatusIcon(light.status, state)}
            eventHandlers={{
              click:      () => onLightClick(light.position),
              mouseover:  () => setHoveredIndex(index),
              mouseout:   () => setHoveredIndex(null),
            }}
          />
        );
      })}
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

  const [activeLight,   setActiveLight]   = useState<[number, number] | null>(null);
  const [selectedLight, setSelectedLight] = useState<[number, number] | null>(null);

  const handleLightClick = (pos: [number, number]) => {
    setActiveLight(pos);
    setSelectedLight(pos);
    setShowDetails(true);       // open panel automatically
    onMarkerClick?.();
  };

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

        /* Status-coded streetlight icons — replaces the old CircleMarker's
           radius/opacity/weight feedback with a scale + drop-shadow, and
           reuses the same bounce keyframes above for the "selected" pop. */
        .streetlight-status-icon {
          transition: transform 0.2s ease, filter 0.2s ease;
          transform-origin: center center;
        }
        .streetlight-status-icon--hovered {
          transform: scale(1.3);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));
        }
        .streetlight-status-icon--selected {
          transform: scale(1.5);
          filter: drop-shadow(0 0 6px rgba(0,0,0,0.5));
          animation: markerBounce 0.45s ease;
        }
      `;
      document.head.appendChild(style);
    }
    return () => { document.getElementById(styleId)?.remove(); };
  }, []);

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

  useEffect(() => {
    setActiveLight(null);
    setSelectedLight(null);
    setShowDetails(false);
  }, [targetLocation]);

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
        <MapUpdater targetLocation={activeLight ?? targetLocation} />

        <StreetlightLayer
          onLightClick={handleLightClick}
          selectedLight={selectedLight}
        />
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