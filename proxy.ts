import { clerkMiddleware } from "@clerk/nextjs/server";

const clerkProxy = clerkMiddleware();

export default clerkProxy;
export const proxy = clerkProxy;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[^?]*$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Clerk auto-proxy path for Next.js 15+ and proxy setup
    '/__clerk/:path*',
  ],
};
