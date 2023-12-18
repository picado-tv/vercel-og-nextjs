import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const hanzi = searchParams.get('hanzi') || '我'

  const res = await fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@latest/${hanzi}.json`)
  const hwdHanzi: { strokes: string[], medians: number[][] } = await res.json()

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg width="128pt" height="128pt" viewBox="0 0 128 128">
          <g transform="translate(0, 112.5) scale(0.125, -0.125)">
            { hwdHanzi.strokes.map((d, i) => <path key={i} d={d} />) }
          </g>
        </svg>
      </div>
    ),
    {
      width: 128,
      height: 128,
    }
  )
}
