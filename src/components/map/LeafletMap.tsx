'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl, CircleMarker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSession } from 'next-auth/react';
import { bulkRegisterOsmPoles } from '@/actions/poles';
import StreetlightPopup from './StreetlightPopup';

// --- Custom Main Location Marker ---
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

// --- Map Updater (Handles Search Navigation) ---
function MapUpdater({ targetLocation }: { targetLocation?: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (targetLocation) {
      map.flyTo(targetLocation, 16, { duration: 1.5 });
    }
  }, [targetLocation, map]);
  return null;
}

// --- Real Streetlight Fetcher Component ---
function StreetlightLayer() {
  const [lights, setLights] = useState<[number, number][]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLight, setSelectedLight] = useState<[number, number] | null>(null);
  const [registeringAll, setRegisteringAll] = useState(false);
  const { data: session } = useSession();

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.openstreetmap.ru/api/interpreter',
  ];

  const fetchLights = async (map: L.Map) => {
    if (map.getZoom() < 15) {
      setLights([]);
      setError(null);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsFetching(true);
    setError(null);

    const bounds = map.getBounds();
    const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;

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
        const response = await fetch(`${endpoint}?data=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Status ${response.status}`);

        const data = await response.json();
        const fetchedLights: [number, number][] = [];

        for (const el of data.elements) {
          if (el.type === 'node' && typeof el.lat === 'number' && typeof el.lon === 'number') {
            // Individual lamp node
            fetchedLights.push([el.lat, el.lon]);
          } else if (el.type === 'way' && Array.isArray(el.geometry)) {
            // Lit road — sample points along the way to avoid clutter
            el.geometry.forEach((pt: any, idx: number) => {
              if (pt && idx % 3 === 0) {
                fetchedLights.push([pt.lat, pt.lon]);
              }
            });
          }
        }

        setLights(fetchedLights);
        setIsFetching(false);
        return; // success, stop trying other endpoints
      } catch (err: any) {
        if (err.name === 'AbortError') {
          // A newer request superseded this one; just stop quietly.
          return;
        }
        console.warn(`Overpass endpoint failed (${endpoint}):`, err);
        // try next endpoint
      }
    }

    // All endpoints failed
    setIsFetching(false);
    setError('Could not load streetlight data right now.');
  };

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

  return (
    <>
      {isFetching && (
        <div className="absolute top-4 right-4 z-[400] bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-slate-600 border border-slate-200">
          Fetching live streetlights...
        </div>
      )}

      {error && !isFetching && (
        <div className="absolute top-4 right-4 z-[400] bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-red-500 border border-slate-200">
          {error}
        </div>
      )}

      {!isFetching && !error && lights.length === 0 && (
        <div className="absolute top-4 right-4 z-[400] bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-slate-500 border border-slate-200">
          No tagged streetlights here
        </div>
      )}

      {!isFetching && !error && lights.length > 0 && session?.user && (
        <div className="absolute top-4 right-4 z-[400] flex items-center gap-2">
          <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-slate-600 border border-slate-200">
            {lights.length} lights
          </div>
          <button
            onClick={async () => {
              setRegisteringAll(true);
              try {
                await bulkRegisterOsmPoles(
                  lights.map((l) => ({ lat: l[0], lng: l[1] })),
                );
              } finally {
                setRegisteringAll(false);
              }
            }}
            disabled={registeringAll}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {registeringAll ? "Registering..." : `Register All`}
          </button>
        </div>
      )}

      {lights.map((light, index) => (
        <CircleMarker
          key={`light-${light[0]}-${light[1]}-${index}`}
          center={light}
          radius={session?.user ? 6 : 4}
          pathOptions={{
            color: '#dba65d',
            fillColor: '#FFD700',
            fillOpacity: 0.8,
            weight: session?.user ? 2 : 1,
          }}
          eventHandlers={
            session?.user
              ? {
                  click: () => setSelectedLight(light),
                }
              : undefined
          }
          className={session?.user ? 'cursor-pointer' : ''}
        />
      ))}

      {selectedLight && (
        <StreetlightPopup
          lat={selectedLight[0]}
          lng={selectedLight[1]}
          onClose={() => setSelectedLight(null)}
        />
      )}
    </>
  );
}

// --- Main Map Component ---
interface LeafletMapProps {
  targetLocation?: [number, number] | null;
}

export default function LeafletMap({ targetLocation }: LeafletMapProps) {
  const defaultCenter: [number, number] = [14.6507, 120.9842];

  // Generate a unique map key based on coordinates or initialization.
  // This forces Next.js to completely teardown the previous DOM wrapper on hot reload
  // instead of running into conflict issues with an already initialized container.
  const mapKey = targetLocation ? `${targetLocation[0]}-${targetLocation[1]}` : 'default-map';

  return (
    <div className="absolute inset-0 z-[0]">
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
        <MapUpdater targetLocation={targetLocation} />
        <StreetlightLayer />
        <Marker position={targetLocation || defaultCenter} icon={customMarkerIcon} />
      </MapContainer>
    </div>
  );
}