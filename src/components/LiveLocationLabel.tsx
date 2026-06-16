"use client"

import { useState, useEffect } from "react"

export default function LiveLocationLabel() {
  const [cityName, setCityName] = useState("Quezon City")

  useEffect(() => {
    // Read the location parsed by the main controller after a 1-second delay
    const interval = setInterval(() => {
      const geoEl = document.querySelector(".hidden-geo-data")
      const dynamicName = geoEl?.getAttribute("data-location")
      if (dynamicName) {
        setCityName(dynamicName)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <p className="text-sm text-gray-500 mt-0.5">{cityName}</p>
}