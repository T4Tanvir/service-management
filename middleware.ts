import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Redirect non-logged-in users to login
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/", req.nextUrl));
  }

  // Role-based protection
  if (isLoggedIn && req.nextUrl.pathname.startsWith("/admin")) {
    if (req.auth?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  }

  return NextResponse.next();
});
