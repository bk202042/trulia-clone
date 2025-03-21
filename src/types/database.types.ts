export interface DbRentalListing {
  id: string;
  property_type: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  neighborhood?: string;
  monthly_rent: number;
  security_deposit: number;
  utilities?: string[];
  utilities_cost?: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  parking?: boolean;
  parking_fee?: number;
  pet_friendly?: boolean;
  pet_deposit?: number;
  amenities?: string[];
  minimum_lease?: number;
  available_date: string;
  application_fee?: number;
  property_management?: string;
  contact_phone?: string;
  contact_email?: string;
  latitude?: number;
  longitude?: number;
  nearby_transportation?: string[];
  created_at: string;
  user_id?: string;

  // Office-specific fields
  property_category?: string;
  office_type?: string;
  desk_capacity?: number;
  meeting_rooms?: number;
  has_reception?: boolean;
  internet_speed?: string;
  office_amenities?: string[];
  available_hours?: string;
}

export interface DbOfficeListing {
  id: string;
  property_type: string;
  office_type: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  neighborhood?: string;
  monthly_rent: number;
  security_deposit: number;
  utilities_cost?: number;
  square_feet: number;
  desk_capacity: number;
  meeting_rooms?: number;
  has_reception?: boolean;
  internet_speed?: string;
  parking?: boolean;
  parking_fee?: number;
  minimum_lease?: number;
  available_date: string;
  available_hours?: string;
  application_fee?: number;
  property_management?: string;
  contact_phone?: string;
  contact_email?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  user_id?: string;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rental_listings: {
        Row: DbRentalListing
        Insert: Omit<DbRentalListing, 'id' | 'created_at'>
        Update: Partial<Omit<DbRentalListing, 'id' | 'created_at'>>
      }
      user_favorites: {
        Row: {
          id: string
          user_id: string
          listing_id: string
          created_at: string
        }
        Insert: Omit<
          {
            id: string
            user_id: string
            listing_id: string
            created_at: string
          },
          'id' | 'created_at'
        >
        Update: Partial<
          Omit<
            {
              id: string
              user_id: string
              listing_id: string
              created_at: string
            },
            'id' | 'created_at'
          >
        >
      }
      office_listings: {
        Row: DbOfficeListing
        Insert: Omit<DbOfficeListing, 'id' | 'created_at'>
        Update: Partial<Omit<DbOfficeListing, 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
