import { NextResponse } from 'next/server';
import { createDirectClient } from '@/lib/supabase';

// Using direct Supabase client for API routes
const supabase = createDirectClient();

export async function GET(request: Request) {
  try {
    const { data: featuredProperties, error } = await supabase
      .from('rental_listings')
      .select('*')
      .eq('city', 'Mountain View') // Filter as needed
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      throw error; // Throw the error for consistent error handling
    }

    return NextResponse.json(featuredProperties);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
