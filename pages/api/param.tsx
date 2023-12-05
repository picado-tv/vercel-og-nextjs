import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import hanja from 'hanja'

export const config = {
  runtime: 'edge',
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')!
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
    
    const hanjaRegex = /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/;

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
      <div tw="flex flex-row w-full py-12 px-4 items-center justify-between p-8">
        <p tw={`${textsizeClass} flex leading-relaxed flex-wrap justify-center`}>
              {title.split(' ').map((v, k) => {
                return (<>
                  <span style={{ whiteSpace: 'pre' }}>{hanja.split(v).map((hSegment) => {
                    return (<>
                      { !hanjaRegex.test(hSegment) ?
                        (<span>{hSegment}</span>) :
                        (<ruby tw='flex max-w'>{hSegment}<rt tw='absolute text-xl w-full justify-center -mt-1'>{hanja.translate(hSegment, hanja.TRANSLATE_TYPES.SUBSTITUTION)}</rt></ruby>)
                      }
                    </>);
                  })} </span>

                </>);
          })}
        </p>
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
