import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['fr', 'ar'],

  // Used when no locale matches
  defaultLocale: 'fr',
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/about',
    '/derive-2024',
    '/previous',
    '/espace-darja',
    '/community',
    '/contact',
    '/(fr|ar)/:path*',
  ],
};
