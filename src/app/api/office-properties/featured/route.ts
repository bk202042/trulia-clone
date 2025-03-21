import { NextResponse } from 'next/server';
import { createDirectClient } from '@/lib/supabase';

// Using direct Supabase client for API routes
const supabase = createDirectClient();

export async function GET(request: Request) {
  try {
    // Get featured office properties - most recent 4 listings
    const { data: featuredOfficeProperties, error } = await supabase
      .from('office_listings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      throw error;
    }

    return NextResponse.json(featuredOfficeProperties);
  } catch (error) {
    console.error("Error fetching featured office properties:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
