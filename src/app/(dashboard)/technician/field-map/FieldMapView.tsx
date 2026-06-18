'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import StreetlightLayer from '@/components/map/StreetlightLayer'

interface FieldPole {
  poleCode: string
  address: string
  barangay: string
  latitude: number
  longitude: number
  status: string
  workOrderStatus: string
  faultType: string
  workOrderId: string
}

const iconColors: Record<string, string> = {
  ASSIGNED: '#3b82f6',
  IN_PROGRESS: '#f59e0b',
  RESOLVED: '#22c55e',
  PENDING: '#9ca3af',
  CANCELLED: '#ef4444',
}

function createMarkerIcon(color: string, selected = false) {
  const size = selected ? 32 : 26
  return new L.DivIcon({
    className: 'bg-transparent',
    html: `<div style="color: ${color}; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.3)); transition: transform 0.2s;">
            <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="1.5">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
           </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  })
}

const iconCache = new Map<string, L.DivIcon>()

function getIcon(status: string, selected: boolean) {
  const key = `${status}-${selected}`
  const cached = iconCache.get(key)
  if (cached) return cached
  const icon = createMarkerIcon(iconColors[status] ?? '#9ca3af', selected)
  iconCache.set(key, icon)
  return icon
}

interface Props {
  poles: FieldPole[]
  onSelectPole: (pole: FieldPole | null) => void
  selectedPole: FieldPole | null
}

function FitBounds({ poles }: { poles: FieldPole[] }) {
  const map = useMap()
  const fitted = useRef(false)

  useEffect(() => {
    if (poles.length === 0 || fitted.current) return
    const bounds = L.latLngBounds(poles.map((p) => [p.latitude, p.longitude] as [number, number]))
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 })
    fitted.current = true
  }, [poles, map])

  return null
}

export default function FieldMapView({ poles, onSelectPole, selectedPole }: Props) {
  if (typeof window === 'undefined') return null

  const defaultCenter: [number, number] = poles.length > 0
    ? [poles[0].latitude, poles[0].longitude]
    : [14.6507, 120.9842]

  return (
    <div className="absolute inset-0">
      <MapContainer
        center={defaultCenter}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <FitBounds poles={poles} />
        <StreetlightLayer />
        {poles.map((pole) => (
          <Marker
            key={pole.workOrderId}
            position={[pole.latitude, pole.longitude]}
            icon={getIcon(
              pole.workOrderStatus,
              selectedPole?.workOrderId === pole.workOrderId
            )}
            eventHandlers={{
              click: () => onSelectPole(pole),
            }}
          >
            <Popup>
              <div className="text-xs">
                <p className="font-semibold">{pole.poleCode}</p>
                <p className="text-gray-500 mt-0.5">{pole.address}</p>
                <p className="text-gray-400 mt-0.5">{pole.barangay}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
