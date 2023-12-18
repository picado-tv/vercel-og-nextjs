import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

// The URL was from https://developers.google.com/fonts/docs/developer_api?hl=ko
const tcfont = fetch(new URL('http://fonts.gstatic.com/s/notoseriftc/v23/XLYgIZb5bJNDGYxLBibeHZ0BhnEESXFtUsM.otf')).then(
  (res) => res.arrayBuffer()
)

const scfont = fetch(new URL('http://fonts.gstatic.com/s/notoserifsc/v22/H4chBXePl9DZ0Xe7gG9cyOj7oqCcbzhqDtg.otf')).then(
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
