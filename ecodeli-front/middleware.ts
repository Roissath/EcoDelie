import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value

  const isPublicPage = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register'

  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token) {
    try {
      const decoded = jwt.decode(token) as { type?: string; role?: string }
      const role = decoded?.type || decoded?.role

      const path = req.nextUrl.pathname

      //  Protection des routes dashboard en fonction du rôle
      if (path.startsWith('/dashboard/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }

      if (path.startsWith('/dashboard/client') && role !== 'client') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }

      if (path.startsWith('/dashboard/livreur') && role !== 'livreur') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }

      if (path.startsWith('/dashboard/prestataire') && role !== 'prestataire') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }

      if (path.startsWith('/dashboard/commercant') && role !== 'commercant') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }

    } catch (err) {
      console.error('Erreur de décodage du token', err)
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
