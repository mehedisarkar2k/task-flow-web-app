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

  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Protect every route EXCEPT:
     * - /auth/* — login, signup, forgot-password
     * - /api/*  — API routes (auth handlers etc.)
     * - /_next/static, /_next/image — Next.js internals
     * - /favicon.ico, /sitemap.xml, /robots.txt — metadata files
     * - / (root landing page)
     *
     * Any new page added under (dashboard) is automatically protected.
     */
    "/((?!auth|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
