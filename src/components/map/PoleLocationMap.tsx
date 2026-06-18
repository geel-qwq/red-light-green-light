'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import StreetlightLayer from './StreetlightLayer'

const markerIcon = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div style="color: #b23b3b; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
         </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
})

interface Props {
  latitude: number
  longitude: number
  poleCode: string
  address: string
}

export default function PoleLocationMap({ latitude, longitude, poleCode, address }: Props) {
  if (typeof window === 'undefined') return null

  return (
    <div className="h-48 sm:h-64 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700">
      <MapContainer
        center={[latitude, longitude]}
        zoom={17}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <StreetlightLayer interactive={false} />
        <Marker position={[latitude, longitude]} icon={markerIcon}>
          <Popup>
            <span className="text-xs font-semibold">{poleCode}</span>
            <br />
            <span className="text-[10px] text-gray-500">{address}</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
