import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect logged-in users from "/" to "/dashboard"
    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Redirect logged-in users away from auth pages
    if (token && (pathname === "/login" || pathname === "/signup")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Allow access to auth pages even if not logged in
        if (pathname === "/login" || pathname === "/signup") {
          return true;
        }
        // For protected routes, allow only if logged in
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/dashboard", "/login", "/signup"],
};
