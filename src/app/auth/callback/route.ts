import { NextResponse } from 'next/server';
import { createDirectClient } from '@/lib/supabase';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  // If "next" is in params, use it as the redirect URL
  const next = url.searchParams.get('next') ?? '/';

  if (code) {
    // For auth callback, we use a direct client
    const supabase = createDirectClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(next, url.origin));
}
