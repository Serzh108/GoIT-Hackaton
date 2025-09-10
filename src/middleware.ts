import { NextResponse, NextRequest } from "next/server";
import { COOKIES_VALUE } from "./constants/constants";

export async function middleware(request: NextRequest) {
  const myAccessCookie = request.cookies.get('fec-rerb');
  // const myAccessCookie = request.cookies.get('accessToken');
  const myRefreshCookie = request.cookies.get('refreshToken');
  // console.log(' - !!! --- myAccessCookie =', myAccessCookie);
  //  console.log(' - !!! --- myRefreshCookie =', myRefreshCookie);

  if (myAccessCookie && myAccessCookie?.value && request.nextUrl.pathname !== '/') {
    if ((myAccessCookie?.value === COOKIES_VALUE.usual) && (request.nextUrl.pathname === '/admin')) {
      return NextResponse.redirect(new URL('/donations', request.url));
    }
    return NextResponse.next();
  }

  if (!myAccessCookie && (request.nextUrl.pathname === '/forget' || request.nextUrl.pathname === '/get-link')) {
    return NextResponse.next();
  }

  // --- - ---
  if (!myAccessCookie && myRefreshCookie) {
    return NextResponse.next();
  }
  // --- / - ---

  if (!myAccessCookie && !myRefreshCookie && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|.*\svg|.*\png|.*\jpg|.*\jpeg|.*\gif|.*\webp|_next/image|favicon.ico).*)',],
}