"use client";

import { useEffect, useCallback, useState } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import StreetlightLayer from "@/components/map/StreetlightLayer";
import { resolvePoleFromOsm } from "@/actions/poles";

interface Pole {
  id: string;
  poleCode: string;
  latitude: number;
  longitude: number;
  status: string;
  address: string;
  barangay: string;
}

interface Props {
  poles: Pole[];
  selectedPole: Pole | null;
  onSelect: (pole: Pole) => void;
  gpsLocation: [number, number] | null;
}

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

function GpsMarker({ location }: { location: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.setView(location, 16);
  }, [location, map]);
  return (
    <Marker
      position={location}
      icon={L.divIcon({
        className: "",
        html: `<div style="width:24px;height:24px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"><div style="width:8px;height:8px;background:white;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })}
    />
  );
}

export default function MapSelector({ poles: _poles, selectedPole, onSelect, gpsLocation }: Props) {
  const center: [number, number] = gpsLocation ?? [14.6507, 120.9842];

  const mapKey = gpsLocation ? `${gpsLocation[0]}-${gpsLocation[1]}` : 'default-map';

  const handleLightClick = useCallback(async (pos: [number, number]) => {
    try {
      const pole = await resolvePoleFromOsm(pos[0], pos[1]);
      onSelect(pole);
    } catch {
      // Ignore errors silently
    }
  }, [onSelect]);

  const selectedPos: [number, number] | null = selectedPole
    ? [selectedPole.latitude, selectedPole.longitude]
    : null;

  const markerPosition: [number, number] = selectedPos ?? gpsLocation ?? center;

  return (
    <div className="absolute inset-0 z-[0] map-container">
      <MapContainer
        key={mapKey}
        center={center}
        zoom={16}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        <MapUpdater targetLocation={selectedPos} />
        <StreetlightLayer onLightClick={handleLightClick} interactive={true} />
        <Marker
          position={markerPosition}
          icon={customMarkerIcon}
        />
        {gpsLocation && !selectedPole && <GpsMarker location={gpsLocation} />}
        {selectedPole && (
          <Marker
            position={selectedPos!}
            icon={L.divIcon({
              className: "bg-transparent",
              html: `<div style="width:32px;height:32px;background:#1E3A8A;border:3px solid white;border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;font-weight:bold;">⚡</div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            })}
          />
        )}
      </MapContainer>
    </div>
  );
}
