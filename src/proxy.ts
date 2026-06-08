import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { betterFetch } from "@better-fetch/fetch";
import { authClient } from "./lib/auth-client";

// TODO: We need to add role based route protection

type Session = typeof authClient.$Infer.Session;

export const proxy = async (request: NextRequest) => {

  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // latter needs to be updated when we have the actual auth routes
  matcher: ["/dashboard"],
};
