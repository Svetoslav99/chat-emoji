import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

/**
 * To use server side functionality, you need to add the Clerk middleware to your Next.js app.
 * This allows you to access the session in your Next.js API routes and SSR pages.
 * 
 * In other words - This will allow us to have authentication when every server request is made
 * by embedding the auth state inside of the request itself. Via the request we know if the user is 
 * auth or not based on their cookies, but we don`t know how to process without doing it on each request
 * and rather than manually doing that when the request is received, we can do that as part of the 
 * middleware on the edge it ever hits our own servers.
 */

export default withClerkMiddleware((req: NextRequest) => {
    console.log("middleware running.");
    
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = { matcher:  '/((?!_next/image|_next/static|favicon.ico).*)',};
