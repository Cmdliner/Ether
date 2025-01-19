import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ['/appointments', '/dashboard'];
const publicRoutes = [ '', '/', '/register', '/login', '/forgot-password' ];

export async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // Proceed unchanged if public route
    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Get cookie and decrypt sesssion stored inside
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);


    // Redirect if no userId stored in session for protected routes
    if(isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Set the userId has a header
    req.headers.set('x-user', session?.userId as string);

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }
