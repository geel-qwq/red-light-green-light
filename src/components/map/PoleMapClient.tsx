'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const PoleMap = dynamic(() => import('@/components/map/PoleMap'), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 animate-pulse rounded-xl" />,
})

export default function PoleMapClient(props: React.ComponentProps<typeof PoleMap>) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="h-full bg-gray-100 animate-pulse rounded-xl" />
  return <PoleMap {...props} />
}