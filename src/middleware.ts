import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@/lib/supabase';

export async function middleware(request: NextRequest) {
  // Create a Supabase client and get the response object
  const { supabase, response } = createMiddlewareClient(request);

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // Get the user from the auth session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users to login page for protected routes

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    (request.nextUrl.pathname.startsWith('/saved-homes') ||
     request.nextUrl.pathname.startsWith('/saved-searches') ||
     request.nextUrl.pathname.startsWith('/account'))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You must return the response object
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
