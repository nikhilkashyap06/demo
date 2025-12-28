import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For demonstration purposes, we're checking for a simple token
  // In a real application, you would validate a JWT or session
     const token = request.cookies.get('adminToken');

  // If no token and not on login page, redirect to login
  if (!token && !request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If token exists and on login page, redirect to dashboard
  if (token && request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
};