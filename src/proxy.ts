import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { betterFetch } from "@better-fetch/fetch";
import { authClient } from "./lib/auth-client";

// TODO: We need to add role based route protection

type Session = typeof authClient.$Infer.Session;

export const proxy = async (request: NextRequest) => {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: await headers(),
    }
  );

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith("/auth");
  const isPublicRoute = pathname === "/";

  // If user is logged in and trying to access an auth route, redirect to dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is NOT logged in, and trying to access a protected route (not auth, not public), redirect to login
  if (!session && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Run proxy on every route EXCEPT:
     * - /api/*  — API routes (auth handlers etc.)
     * - /_next/static, /_next/image — Next.js internals
     * - /favicon.ico, /sitemap.xml, /robots.txt — metadata files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
