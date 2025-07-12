import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/add-item", "/admin"]
  const adminRoutes = ["/admin"]
  const authRoutes = ["/login", "/signup"]

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Get token from cookies
  const token = request.cookies.get("token")?.value

  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const user = verifyToken(token)

      if (isAdminRoute && user.role !== "admin") {
        // Redirect to dashboard if not admin
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("token")
      return response
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    try {
      const user = verifyToken(token)
      if (user.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url))
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // Invalid token, let them access auth pages
      const response = NextResponse.next()
      response.cookies.delete("token")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/add-item/:path*", "/admin/:path*", "/login", "/signup"],
}
