import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicPaths = ["/", "/destinations", "/tours", "/about", "/contact", "/blog", "/auth"];
const adminPaths = ["/admin"];
const agentPaths = ["/agent"];
const userPaths = ["/dashboard"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = (session?.user as any)?.role;

  // Allow public routes and static assets
  const isPublic = publicPaths.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".");

  // Admin routes
  if (adminPaths.some((p) => pathname.startsWith(p))) {
    if (!session) return NextResponse.redirect(new URL("/auth/signin?callbackUrl=" + pathname, req.url));
    if (role !== "ADMIN") return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Agent routes
  if (agentPaths.some((p) => pathname.startsWith(p))) {
    if (!session) return NextResponse.redirect(new URL("/auth/signin?callbackUrl=" + pathname, req.url));
    if (role !== "AGENT" && role !== "ADMIN") return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // User dashboard
  if (userPaths.some((p) => pathname.startsWith(p))) {
    if (!session) return NextResponse.redirect(new URL("/auth/signin?callbackUrl=" + pathname, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
