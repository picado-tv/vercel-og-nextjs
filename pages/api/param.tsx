import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')
      : 'My default title'

    if (title.length > 200) throw new Error('the length is too long')

    let textsizeClass = '';
    if (title.length > 20*6) {
      textsizeClass = 'text-4xl'
    } else if (title.length > 14 * 5 ) {
      textsizeClass = 'text-5xl'
    } else if (title.length > 11 * 4 ) {
      textsizeClass = 'text-6xl'
    } else if (title.length > 9 * 2 ) {
      textsizeClass = 'text-7xl'
    } else {
      textsizeClass = 'text-8xl'
    }
    

    return new ImageResponse(
      (
<div
  style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
    backgroundSize: '100px 100px',
  }}
>
  <div tw="flex flex-col w-full h-full items-center justify-center">
    <div tw="flex w-full">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
        <div tw={`${textsizeClass} leading-relaxed`}>
              {title}
        </div>
      </div>
    </div>
  </div>


</div>

      ),
      {
        width: 800,
        height: 600,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
