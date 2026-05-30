import { auth } from "@/auth";

export default auth(async (req) => {
  const session = req.auth;

  if (!session?.user?.email) {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (session?.user?.role !== "ADMIN" && session?.user?.role !== "STAFF") {
      return Response.redirect(new URL("/", req.nextUrl));
    }
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
