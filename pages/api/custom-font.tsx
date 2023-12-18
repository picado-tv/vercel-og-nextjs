import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const tcfont = fetch(new URL('../../assets/NotoSerifTC-Regular.otf', import.meta.url)).then(
  (res) => res.arrayBuffer()
)

const scfont = fetch(new URL('../../assets/NotoSerifSC-Regular.otf', import.meta.url)).then(
  (res) => res.arrayBuffer()
)

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const hanzi = searchParams.get('hanzi') || '我'

  const [scfontData, tcfontData] = await Promise.all([scfont, tcfont])

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          fontSize: 100,
          paddingTop: 30,
          fontFamily: 'Noto Serif TC, Noto Serif SC',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {hanzi}
      </div>
    ),
    {
      width: 128,
      height: 128,
      fonts: [
        {
          name: 'Noto Serif TC',
          data: tcfontData,
          style: 'normal',
        },
        {
          name: 'Noto Serif SC',
          data: scfontData,
          style: 'normal',
        },
      ],
    }
  )
}
