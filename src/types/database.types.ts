export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface DbRentalListing {
  id: string;
  property_type: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  neighborhood: string;
  monthly_rent: number;
  security_deposit: number;
  utilities: string[];
  utilities_cost: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  parking: boolean;
  parking_fee: number;
  pet_friendly: boolean;
  pet_deposit: number;
  amenities: string[];
  minimum_lease: number;
  available_date: string;
  application_fee: number;
  property_management: string;
  contact_phone: string;
  contact_email: string;
  latitude: number;
  longitude: number;
  nearby_transportation: string[];
  created_at: string;
  user_id: string | null;
}

export interface Database {
  public: {
    Tables: {
      rental_listings: {
        Row: DbRentalListing;
        Insert: Omit<DbRentalListing, 'created_at'> & { created_at?: string };
        Update: Partial<Omit<DbRentalListing, 'id' | 'created_at'>>;
        Relationships: [
          {
            foreignKeyName: "rental_listings_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      },
      user_favorites: {
        Row: {
          id: string;
          user_id: string;
          listing_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          listing_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          listing_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_favorites_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_favorites_listing_id_fkey";
            columns: ["listing_id"];
            referencedRelation: "rental_listings";
            referencedColumns: ["id"];
          }
        ];
      }
    };
  };
}
