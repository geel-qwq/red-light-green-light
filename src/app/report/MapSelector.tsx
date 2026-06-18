"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import StreetlightLayer from "@/components/map/StreetlightLayer";

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

function createIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:28px;height:28px;background:${color};border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:bold;">⚡</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function PoleMarkers({ poles, selectedPole, onSelect }: { poles: Pole[]; selectedPole: Pole | null; onSelect: (p: Pole) => void }) {
  useMapEvents({
    click() {},
  });
  return (
    <>
      {poles.map((pole) => {
        const color = pole.status === "FAULTY" ? "#ef4444" : pole.status === "UNDER_MAINTENANCE" ? "#d97706" : pole.status === "DECOMMISSIONED" ? "#9ca3af" : "#22c55e";
        const isSelected = selectedPole?.id === pole.id;
        return (
          <Marker
            key={pole.id}
            position={[pole.latitude, pole.longitude]}
            icon={isSelected ? createIcon("#1E3A8A") : createIcon(color)}
            eventHandlers={{ click: () => onSelect(pole) }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{pole.poleCode}</p>
                <p className="text-xs text-gray-500">{pole.address}</p>
                <p className="text-xs text-gray-400">{pole.barangay}</p>
                <p className="text-xs font-medium mt-1" style={{ color }}>{pole.status.replace("_", " ")}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

function GpsMarker({ location }: { location: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.setView(location, 14);
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
    >
      <Popup>Your location</Popup>
    </Marker>
  );
}

function haversineDistance(a: [number, number], b: [number, number]): number {
  const R = 6371000;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat + Math.cos((a[0] * Math.PI) / 180) * Math.cos((b[0] * Math.PI) / 180) * sinLng * sinLng;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function findNearestPole(pos: [number, number], poles: Pole[], maxDist = 100): Pole | null {
  let nearest: Pole | null = null;
  let minDist = maxDist;
  for (const pole of poles) {
    const d = haversineDistance(pos, [pole.latitude, pole.longitude]);
    if (d < minDist) {
      minDist = d;
      nearest = pole;
    }
  }
  return nearest;
}

export default function MapSelector({ poles, selectedPole, onSelect, gpsLocation }: Props) {
  const center: [number, number] = gpsLocation ?? [14.65, 121.03];

  const handleLightClick = (pos: [number, number]) => {
    const nearest = findNearestPole(pos, poles, 100);
    if (nearest) onSelect(nearest);
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <StreetlightLayer onLightClick={handleLightClick} interactive={true} />
      <PoleMarkers poles={poles} selectedPole={selectedPole} onSelect={onSelect} />
      {gpsLocation && <GpsMarker location={gpsLocation} />}
    </MapContainer>
  );
}
