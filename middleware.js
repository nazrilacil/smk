import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Lindungi route dashboard
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return res
}

// Tentukan routes mana yang kena middleware
export const config = {
  matcher: ['/dashboard/:path*'],
}