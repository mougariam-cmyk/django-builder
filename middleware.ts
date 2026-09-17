import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const MAIN_DOMAIN = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'vercel.app';
  const currentHost = hostname.replace(`.${MAIN_DOMAIN}`, '');

  if (hostname.includes(`.${MAIN_DOMAIN}`) && currentHost !== MAIN_DOMAIN && !hostname.startsWith('www.')) {
    return NextResponse.rewrite(new URL(`/site/${currentHost}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
