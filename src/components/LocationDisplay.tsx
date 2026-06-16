"use client"

import { useState, useEffect } from "react"

export default function LocationDisplay() {
  const [location, setLocation] = useState("Quezon City")

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          // Querying public reverse-geocoding endpoint to translate lat/long to city name
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await res.json()
          
          // Fallback sequence targeting city, town, or village names
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.municipality ||
            "Quezon City"
          setLocation(city)
        } catch (err) {
          console.error("Error geocoding location:", err)
        }
      },
      (error) => {
        console.warn("Geolocation blocked or failed. Using fallback.", error)
      }
    )
  }, [])

  return <p className="text-sm text-gray-500 mt-0.5">{location}</p>
}