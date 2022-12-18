import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const ua = userAgent(request);
  const isMobile = getIsMobile(ua.ua);
  if (pathname === '/' && isMobile) {
    return NextResponse.redirect(new URL('/mobile', request.url));
  }
  return NextResponse.next();
  // return NextResponse.redirect(new URL('/about-2', request.url))
}
// export const config = {
//   matcher: ['/'],
// }

export const getIsMobile = (userAgentString: string) => {
  const platforms = [
    'Android',
    'BlackBerry',
    'iPhone',
    'iPad',
    'iPod',
    'Opera',
    'Mini',
    'IEMobile',
    'WPDesktop',
  ];

  for (let index = 0; index < platforms.length; index++) {
    const platform = platforms[index];
    if (userAgentString.includes(platform as string)) {
      return true;
    }
  }

  return false;
};
