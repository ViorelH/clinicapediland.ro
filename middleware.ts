import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.headers.get('authorization')

  const username = 'admin'
  const password = 'Pedil@nd123!'

  if (auth) {
    const encoded = auth.split(' ')[1]
    const decoded = Buffer.from(encoded, 'base64').toString()
    const [user, pass] = decoded.split(':')

    if (user === username && pass === password) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}