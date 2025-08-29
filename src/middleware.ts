import { NextResponse, NextRequest } from "next/server";
import { COOKIES_VALUE } from "./constants/constants";

// export async function middleware(request: NextRequest): Promise<NextResponse> {
export async function middleware(request: NextRequest) {
//   const myAccessCookie = request.cookies.get('fec-rerb');
  const myRefreshCookie = request.cookies.get('fec-refresh');

   const myAccessCookie = request.cookies.get('refreshToken');  // TEMP!!!
  // console.log('myAccessCookie = ', myAccessCookie);

  if (myAccessCookie && myAccessCookie?.value && request.nextUrl.pathname !== '/') {
    if ((myAccessCookie?.value === COOKIES_VALUE.usual) && (request.nextUrl.pathname === '/admins')) {
      return NextResponse.redirect(new URL('/about', request.url));
    }
    return NextResponse.next();
  }

  if (!myAccessCookie && (request.nextUrl.pathname === '/forget' || request.nextUrl.pathname === '/get-link')) {
    return NextResponse.next();
  }

  if (!myAccessCookie && !myRefreshCookie && request.nextUrl.pathname !== '/log-in') {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|.*\svg|.*\png|.*\jpg|.*\jpeg|.*\gif|.*\webp|_next/image|favicon.ico).*)',],
}