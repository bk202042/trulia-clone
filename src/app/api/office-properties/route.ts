import { NextResponse } from 'next/server';
import { createDirectClient } from '@/lib/supabase';

// Using direct Supabase client for API routes
const supabase = createDirectClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    // Parse query parameters
    const minDesks = url.searchParams.get('minDesks') ? parseInt(url.searchParams.get('minDesks') as string) : undefined;
    const maxDesks = url.searchParams.get('maxDesks') ? parseInt(url.searchParams.get('maxDesks') as string) : undefined;
    const minMeetingRooms = url.searchParams.get('minMeetingRooms') ? parseInt(url.searchParams.get('minMeetingRooms') as string) : undefined;
    const officeType = url.searchParams.get('officeType');
    const hasReception = url.searchParams.get('hasReception') === 'true';
    const internetSpeed = url.searchParams.get('internetSpeed');
    const city = url.searchParams.get('city');
    const state = url.searchParams.get('state');
    const minPrice = url.searchParams.get('minPrice') ? parseInt(url.searchParams.get('minPrice') as string) : undefined;
    const maxPrice = url.searchParams.get('maxPrice') ? parseInt(url.searchParams.get('maxPrice') as string) : undefined;

    // Pagination
    const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page') as string) : 1;
    const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit') as string) : 10;
    const offset = (page - 1) * limit;

    // Build the query from office_listings table
    let query = supabase
      .from('office_listings')
      .select('*', { count: 'exact' });

    // Apply filters
    if (minDesks !== undefined) {
      query = query.gte('desk_capacity', minDesks);
    }

    if (maxDesks !== undefined) {
      query = query.lte('desk_capacity', maxDesks);
    }

    if (minMeetingRooms !== undefined) {
      query = query.gte('meeting_rooms', minMeetingRooms);
    }

    if (officeType) {
      query = query.eq('office_type', officeType);
    }

    if (hasReception !== undefined) {
      query = query.eq('has_reception', hasReception);
    }

    if (internetSpeed) {
      query = query.ilike('internet_speed', `%${internetSpeed}%`);
    }

    if (city) {
      query = query.eq('city', city);
    }

    if (state) {
      query = query.eq('state', state);
    }

    if (minPrice !== undefined) {
      query = query.gte('monthly_rent', minPrice);
    }

    if (maxPrice !== undefined) {
      query = query.lte('monthly_rent', maxPrice);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    // Sort by newest first
    query = query.order('created_at', { ascending: false });

    // Execute the query
    const { data: officeProperties, error, count } = await query;

    if (error) {
      throw error;
    }

    // Calculate pagination metadata
    const totalPages = count ? Math.ceil(count / limit) : 0;
    const hasMore = page < totalPages;

    // Construct the response
    const response = {
      data: officeProperties,
      metadata: {
        total: count,
        page,
        limit,
        totalPages,
        hasMore
      },
      filters: {
        applied: {
          minDesks,
          maxDesks,
          minMeetingRooms,
          officeType,
          hasReception,
          internetSpeed,
          city,
          state,
          minPrice,
          maxPrice
        }
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching office properties:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      {
        error: 'DATABASE_ERROR',
        message: errorMessage
      },
      { status: 500 }
    );
  }
}
