import { Database } from '@/types/database.types';

export type RentalListing = Database['public']['Tables']['rental_listings']['Row'];

export interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  limit?: number;
  offset?: number;
}

export interface PropertyQueryResult {
  data: RentalListing[];
  total: number;
  page: number;
  limit: number;
}
