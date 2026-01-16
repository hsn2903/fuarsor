import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // 1. Check if the route is an admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 2. Fetch Session from Better Auth API
    // We make a fetch call to our own API because Better Auth stores tokens in HttpOnly cookies
    const res = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      headers: {
        // Pass the cookie from the incoming request to the API
        cookie: request.headers.get("cookie") || "",
      },
    });

    const session = await res.json();

    // 3. If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

// Only run middleware on admin routes to save performance
export const config = {
  matcher: ["/admin/:path*"],
};
