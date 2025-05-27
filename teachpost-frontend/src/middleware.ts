// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Rotas protegidas
  const protectedRoutes = [
    '/posts',
    '/post/:path*', // Protege qualquer rota que comece com /post/
    '/newpost'
  ]

  // Verifica se a rota atual está protegida
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.includes(':path*')) {
      const baseRoute = route.replace('/:path*', '')
      return pathname.startsWith(baseRoute)
    }
    return pathname === route
  })

  // Redirecionamento para logout
  if (pathname.startsWith('/logout')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('logout', 'success')
    return NextResponse.redirect(url)
  }

  // Proteção das rotas
  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // Redireciona usuários autenticados que tentam acessar login
  if (['/login', '/registro'].includes(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/posts',
    '/post/:path*',
    '/newpost',
    '/login',
    '/logout'
  ]
}