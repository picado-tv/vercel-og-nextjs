import { extract } from '@extractus/article-extractor'
import { NextResponse } from 'next/server';
 
// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url') || ''

  const res = await extract(url)
  return NextResponse.json(res)
}
