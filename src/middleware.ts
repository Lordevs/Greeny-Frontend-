import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from './constants/routes';

/**
 * Next.js Middleware for page-level route protection.
 * Follows the gluco-wizard pattern:
 * 1. Redirect authenticated users away from /login and /signup.
 * 2. Redirect unauthenticated users to /login from protected routes.
 */
export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Define Route categories
    const authRoutes = [ROUTES.AUTH.LOGIN, ROUTES.AUTH.SIGNUP];
    const protectedRoutes = [
        ROUTES.CHAT.ROOT,
        '/chats', // base interface
    ];


    const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));
    const isProtectedPage = protectedRoutes.some((route) => pathname.startsWith(route));

    // 2. Auth State Check
    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;
    const isAuthenticated = !!accessToken || !!refreshToken;

    // console.log(`[Middleware] Path: ${pathname}, Auth: ${isAuthenticated} (AT: ${!!accessToken}, RT: ${!!refreshToken})`);

    // 3. Logic: Authenticated users can still visit auth pages if they wish (Public access)
    // Removed redirect logic to ROUTES.CHAT.ROOT


    // 4. Logic: Redirect unauthenticated users AWAY from Protected pages
    if (isProtectedPage && !isAuthenticated) {
        // console.log(`[Middleware] Redirecting UNAUTH user away from ${pathname} to ${ROUTES.AUTH.LOGIN}`);
        return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
    }


    // 5. Logic: Handle Force Logout (Loop Breaker)
    const forceLogout = request.nextUrl.searchParams.get('force') === 'true';
    if (forceLogout) {
        // console.log('[Middleware] Force logout detected, clearing cookies and staying on login');
        const res = NextResponse.next();
        res.cookies.delete('access_token');
        res.cookies.delete('refresh_token');
        return res;
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes intercepted by standard fetch)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
