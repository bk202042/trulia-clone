import { createDirectClient } from '@/lib/supabase';
import { PropertyFilters, PropertyQueryResult, RentalListing } from './types';
import { ApiErrorResponse } from '@/lib/api/types';

class PropertyService {
  private supabase = createDirectClient();

  async getFeaturedProperties(limit = 4): Promise<RentalListing[]> {
    const { data, error } = await this.supabase
      .from('rental_listings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new ApiErrorResponse(
        'DATABASE_ERROR',
        'Failed to fetch featured properties',
        500,
        error
      );
    }

    return data;
  }

  async queryProperties(filters: PropertyFilters): Promise<PropertyQueryResult> {
    let query = this.supabase
      .from('rental_listings')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`);
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters.propertyType) {
      query = query.eq('property_type', filters.propertyType);
    }

    // Pagination
    const limit = filters.limit || 10;
    const offset = filters.offset || 0;
    const page = Math.floor(offset / limit) + 1;

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw new ApiErrorResponse(
        'DATABASE_ERROR',
        'Failed to query properties',
        500,
        error
      );
    }

    return {
      data: data || [],
      total: count || 0,
      page,
      limit,
    };
  }

  async getPropertyById(id: string): Promise<RentalListing> {
    const { data, error } = await this.supabase
      .from('rental_listings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new ApiErrorResponse(
          'NOT_FOUND',
          'Property not found',
          404,
          error
        );
      }
      throw new ApiErrorResponse(
        'DATABASE_ERROR',
        'Failed to fetch property',
        500,
        error
      );
    }

    return data;
  }
}

// Export singleton instance
export const propertyService = new PropertyService();
