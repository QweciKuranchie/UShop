import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

const clerkHandler = clerkMiddleware();

export function proxy(request: NextRequest) {
  return clerkHandler(request);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[^?]*$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

