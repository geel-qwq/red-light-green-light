import { NextRequest, NextResponse } from 'next/server'

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('data')
  if (!query) {
    return NextResponse.json({ error: 'Missing "data" query parameter' }, { status: 400 })
  }

  for (const endpoint of ENDPOINTS) {
    try {
      const url = `${endpoint}?data=${encodeURIComponent(query)}`
      const res = await fetch(url, {
        headers: { 'User-Agent': 'ilLUMENate/1.0 (municipal lighting map)' },
        signal: AbortSignal.timeout(15000),
      })
      if (res.status === 429) continue
      if (!res.ok) continue
      const text = await res.text()
      return new NextResponse(text, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch {
      continue
    }
  }

  return NextResponse.json({ error: 'Overpass API unreachable' }, { status: 502 })
}
