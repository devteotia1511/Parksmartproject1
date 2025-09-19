import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Get the auth token from cookies or handle client-side storage
  // Since localStorage is not available in middleware, we'll handle this differently
  
  // Protected routes
  const protectedRoutes = ['/dashboard', '/sites']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Public routes (login, register, etc.)
  const publicRoutes = ['/login', '/register', '/']
  const isPublicRoute = publicRoutes.includes(pathname)
  
  // If accessing protected route, check authentication
  if (isProtectedRoute) {
    // Since we can't access localStorage in middleware, we'll use a cookie-based approach
    // or let the client-side auth context handle the redirect
    
    // For now, let the client-side handle auth checks
    // In a production app, you'd typically use JWT tokens in HTTP-only cookies
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  // Skip middleware for API routes, static files, and favicon
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
