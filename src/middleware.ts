import { withAuth } from "next-auth/middleware";

// This protects the routes specified in the matcher below
export default withAuth({
  callbacks: {
    // Return true if the user has a valid token
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/api/auth/signin",
  }
});

export const config = {
  // Apply middleware only to the admin route and its sub-routes
  matcher: ["/admin", "/admin/:path*"],
};
