import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define admin routes that require authentication
const adminProtectedRoutes = [
  '/admin/dashboard',
  '/admin/users',
  '/admin/teams',
  '/admin/campaigns',
  '/admin/content-reports',
  '/admin/analytics',
  '/admin/integrations',
  '/admin/notifications',
  '/admin/billing',
  '/admin/logs',
];

// Define public routes (no auth required)
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/privacy',
  '/terms',
  '/admin/login',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the current route is an admin protected route
  const isAdminProtectedRoute = adminProtectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // Get the admin token from cookies
  const adminToken = request.cookies.get('admin-token')?.value;
  const userToken = request.cookies.get('auth-token')?.value || 
                   request.cookies.get('next-auth.session-token')?.value;
  
  // Admin route protection
  if (isAdminProtectedRoute && !adminToken) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Redirect authenticated admin away from login page
  if (adminToken && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  // Regular user route protection (existing logic)
  const protectedRoutes = [
    '/dashboard',
    '/team',
    '/audiences',
    '/campaigns',
    '/ai',
    '/analytics',
    '/notifications',
    '/integrations',
    '/settings',
    '/ab-tests',
    '/billing',
  ];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (isProtectedRoute && !userToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  if (userToken && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};