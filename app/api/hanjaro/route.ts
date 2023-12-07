import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio'

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get('text') || '대한민국은 민주공화국이다.'

  const res = await fetch("https://hanjaro.juntong.or.kr/text_translater.aspx", {
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
    },
    "body": `__VIEWSTATE=ZveLFOU2cnJ5tsTcZLoVwsoFbCE7ERzZsOwB%2FNtZi0NP%2F3TO1Y%2F53JHPmFcGPew7cj8DUDyG%2FWxhYiiksbx%2FydoBmTwLRfUMEzcHDmVTg5eboPPT0Oc0TZgyEER5VRSGpkeEqKK4lsobULi2wiFx9xnx2%2F2SIQZ%2BwTNa7dZ0gEc7WaOEEhvV4%2FuUC2csoNdQcBNGMFbACN50FoqfhvK29KbljZEBYW37YPShjOAN1ZKfeLnd80OwkMVdyzYwoA4slBluC3yBMsPeDAdixpy6upK9ELdrA3IAiN1DWhsilWenRYSTThM4QDnreya3mKzboZlCcg2GvBhUpfMAbLwyqjwOnbVadKj9WO5f8WHB2JvUvHqrlN9bR1GjCpFZP8fUWcBbWInaTdimKMwsz9Bq6cZks7%2BGs%2BDSoSBSDXVK%2FtWtjaOQx3cy2FW%2BGZal4VEwfvkTCD%2FMkisMiCM2xoy%2F12j7bj1xyaEanUEst4jCFpyiIUZParzXotJ1JTb7Yzg4NaSiObzeYI%2Fi9sX4FtMHfeOXKbXkoDh7zY8JQdY%2BKLD2wwo1uxJgZhBhlZqrJmz6&__VIEWSTATEGENERATOR=4820CEBC&__EVENTVALIDATION=EQSS7agbUPcZwl%2B3vd7h8MzL23XcagUIhjIedfHc5bqCdiyULiTQnt6ZUPcA8MR4hNx8KeU7nHztGXr%2Fwe6eckkXgsqRPQsjhC05Rb6zh55VY9myvnnfa2cSzoTB4dLx5oRF9WbxoXek0L3JGPUF5mDJEnIsUcJokfKVWCRph401lPi24zJ1NAuvrZpALaGOFcjovaKUvd0r0DPZJ0AePiA88vmiBZdnIskZTnm19iMY5jAa6j3wqvwyLuBJyB6jVIV9noLk1KwK5sOAAGD5gTvpJ3noFuYLtPkN8VgU1XMk%2FMDQR08XbMKVV1Fuf1wuZw7YK8CMDGrX0ZoO%2BSpzoQguDKX25fXMXGLwMo644bUrV99i6Suyi26o8zHsfowhRG5Jjyy%2Bvu8TGNBFErYWLNXfhJScyBvj8OEHHYJlpTm%2BQoRwdE9R4OHR%2BvU3tCBPtCD19Y%2BlyVzOqWoqQJb9xFmm7yFlzTQWIDD26NFGe7EdGcu3rG7YW9%2BJrHPWyb5MKgzPJrpYJyejex%2BC%2Ff9pb1HksFdWwE95beRz0RKQ7znjDa4BWQNBufIz5HAEvGMkhWOCnI4X7ii066NQceqNXjg2AeYYoH6zWx2dnirQ1uw%3D&1=RadioButton1&CheckBox1=on&CheckBox2=on&CheckBox3=on&CheckBox4=on&CheckBox5=on&CheckBox6=on&CheckBox7=on&CheckBox8=on&TextBox1=${encodeURIComponent(text)}&ImageButton1.x=0&ImageButton1.y=0`,
    "method": "POST",
  });

  const resText = await res.text()
  const $ = cheerio.load(resText)
  return NextResponse.json({ result: $('#TextBox2').val() })
}
