import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
const protectedRoutes = ["/cart", "/checkout", "/profile"];
const authRoutes = ["/login", "/register"];
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (!isLoggedIn && isProtectedRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
  return NextResponse.next();
});
export const config = {
  matcher: [
    "/((?!api/auth/session/refresh|_next/static|_next/image|favicon.ico).*)",
  ],
};