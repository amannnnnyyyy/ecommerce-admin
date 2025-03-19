import { NextResponse } from 'next/server';
import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)','/sign-up(.*)']);
const LOCAL_URL = 'http://localhost:3000';

export default clerkMiddleware((auth,req)=>{
  if(!isPublicRoute(req)){
    auth.protect()
  }

  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (!isPublicRoute(req)) {
    auth.protect();
  }

    if (process.env.NODE_ENV === 'development') {
        if (pathname === '/sign-up' && req.url.startsWith('https://normal-pipefish-33.accounts.dev')) {
            return NextResponse.redirect(new URL('/sign-up', LOCAL_URL));
        }
    }

    // Return a response if no redirect is needed
    return NextResponse.next();

});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)','/','/(api|trpc)(.*)'],
};