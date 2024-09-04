import createMiddleware from 'next-intl/middleware';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { locales, localePrefix, defaultLocale } from './config';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: defaultLocale,

  // localePrefix
  localePrefix: localePrefix,
});

const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/darja-admin(.*)']);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  // Apply Clerk middleware to protected routes
  if (isProtectedRoute(req)) {
    return clerkMiddleware((auth, req) => {
      auth().protect(); // Protect the route
      return NextResponse.next(); // Proceed with the request
    })(req, event);
  }

  // Apply `next-intl` middleware to other routes
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Match paths for `next-intl`
    '/(fr|ar)/:path*',
    // Match paths for Clerk (admin panel)
    '/admin(.*)',
    '/darja-admin(.*)',
    // Ensure the root path and other paths are included
    '/',
  ],
};
