Backend Implementation Plan for Trulia Clone
I've analyzed your codebase and can see you have a well-structured Next.js frontend for your Trulia clone. Now you need a robust backend implementation to support features like authentication, property listings, saved properties, and search functionality.

Based on the presence of @supabase/supabase-js in your dependencies, I'll create a plan using Supabase as the backend service, which is an excellent choice for this type of application.

Core Backend Features to Implement
Authentication System

User registration, login, and profile management
Session handling with Supabase Auth
Database Schema

Properties table with listing details
Users table (handled by Supabase Auth)
Saved properties/favorites table
Search history table
API Routes

Property listing endpoints (get all, get by ID, filter/search)
User profile endpoints
Saved properties endpoints
Search and filtering logic
Integration with Frontend

Supabase client setup
Authentication context/hooks
Data fetching utilities
Implementation Steps
Here's how we'll approach this implementation:

Step 1: Supabase Setup
Create and configure Supabase project
Set up authentication providers
Design and create database tables with proper RLS (Row Level Security)
Step 2: Authentication Implementation
Create auth utility functions
Implement auth middleware
Add login/signup components and flows
Step 3: Database and API Implementation
Create property listings table and API
Build saved properties functionality
Implement search and filtering logic
Step 4: Frontend Integration
Connect UI components to backend services
Add data fetching hooks
Implement proper error handling and loading states
Would you like me to proceed with any specific part of this plan first? Or would you prefer I create a complete implementation for all features?
Focus on authentication system setup first
Focus on database schema design first
Focus on API routes implementation first
Create a complete implementation plan for all features
Help me set up Supabase project first


Thinking:
The user wants me to create a complete implementation plan for all features of the Trulia clone's backend. I'll provide a comprehensive plan covering database schema design, authentication setup, API routes implementation, and frontend integration, all using Supabase. For the plan, I need to: 1. Define the database schema with detailed tables and relationships 2. Plan the authentication system including setup and integration 3. Design all necessary API routes/endpoints 4. Create a plan for frontend-backend integration 5. Include implementation details such as file structures, code organization, and specific functions I'll organize this into a detailed implementation plan with clear steps and code examples.‎

Complete Implementation Plan for Trulia Clone Backend
1. Supabase Project Setup
Project Configuration
Create a new Supabase project
Configure authentication settings (enable email/password, OAuth providers if needed)
Set up project environment variables
Environment Setup
Create .env.local file with the following variables:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (for server-side operations)
2. Database Schema Design
Properties Table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  bedrooms SMALLINT NOT NULL,
  bathrooms SMALLINT NOT NULL,
  square_feet NUMERIC,
  property_type TEXT NOT NULL, -- house, apartment, condo, etc.
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  is_furnished BOOLEAN DEFAULT false,
  is_pet_friendly BOOLEAN DEFAULT false,
  has_parking BOOLEAN DEFAULT false,
  can_apply_instantly BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT true,
  has_special_offer BOOLEAN DEFAULT false,
  main_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Enable RLS
  CONSTRAINT enforce_user_id_not_null CHECK (user_id IS NOT NULL)
);

-- Row Level Security policies
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Everyone can view properties
CREATE POLICY "Properties are viewable by everyone"
ON properties FOR SELECT USING (true);

-- Only authenticated property owners can insert/update/delete
CREATE POLICY "Users can insert their own properties"
ON properties FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties"
ON properties FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties"
ON properties FOR DELETE TO authenticated
USING (auth.uid() = user_id);
Property Images Table
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_main_image BOOLEAN DEFAULT false,
  display_order SMALLINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Enable RLS
  CONSTRAINT fk_property_id FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Row Level Security policies
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Everyone can view property images
CREATE POLICY "Property images are viewable by everyone"
ON property_images FOR SELECT USING (true);

-- Only authenticated property owners can insert/update/delete
CREATE POLICY "Users can insert images for their properties"
ON property_images FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM properties WHERE properties.id = property_images.property_id AND properties.user_id = auth.uid()));

CREATE POLICY "Users can update images for their properties"
ON property_images FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM properties WHERE properties.id = property_images.property_id AND properties.user_id = auth.uid()));

CREATE POLICY "Users can delete images for their properties"
ON property_images FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM properties WHERE properties.id = property_images.property_id AND properties.user_id = auth.uid()));
User Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  preferred_contact_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Everyone can view profiles (basic info)
CREATE POLICY "Profiles are viewable by everyone"
ON profiles FOR SELECT USING (true);

-- Only the profile owner can update their profile
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE TO authenticated
USING (auth.uid() = id);
Saved Properties Table
CREATE TABLE saved_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure a property can only be saved once per user
  UNIQUE (user_id, property_id)
);

-- Row Level Security policies
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

-- Users can only view their own saved properties
CREATE POLICY "Users can view their own saved properties"
ON saved_properties FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Users can save properties
CREATE POLICY "Users can save properties"
ON saved_properties FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can remove saved properties
CREATE POLICY "Users can remove saved properties"
ON saved_properties FOR DELETE TO authenticated
USING (auth.uid() = user_id);
Search History Table
CREATE TABLE search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  search_query JSONB NOT NULL, -- Store search parameters as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security policies
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- Users can only view their own search history
CREATE POLICY "Users can view their own search history"
ON search_history FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Users can create search history entries
CREATE POLICY "Users can create search history"
ON search_history FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can delete their search history
CREATE POLICY "Users can delete their search history"
ON search_history FOR DELETE TO authenticated
USING (auth.uid() = user_id);
3. Authentication Implementation
Supabase Client Setup
Create a file src/lib/supabase/client.ts:

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
Create a file src/lib/supabase/server.ts:

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
Auth Middleware
Create a file src/middleware.ts:

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect routes that require authentication
  const protectedPaths = ['/saved-homes', '/saved-searches', '/profile'];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
Auth Routes and Components
Login Page
Create a file src/app/login/page.tsx:

// Implement login page UI and functionality
// Connect to Supabase auth for sign-in
Sign Up Page
Create a file src/app/signup/page.tsx:

// Implement signup page UI and functionality
// Connect to Supabase auth for registration
Auth Utility Hooks
Create a file src/hooks/useAuth.ts:

// Implement authentication hooks for login, signup, logout, etc.
4. API Routes Implementation
Property Listings API
Create a file src/app/api/properties/route.ts:

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const bedrooms = searchParams.get('bedrooms');
  const bathrooms = searchParams.get('bathrooms');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  const supabase = await createClient();

  let query = supabase
    .from('properties')
    .select('*, property_images(*)');

  // Apply filters
  if (city) query = query.ilike('city', `%${city}%`);
  if (minPrice) query = query.gte('price', minPrice);
  if (maxPrice) query = query.lte('price', maxPrice);
  if (bedrooms) query = query.eq('bedrooms', bedrooms);
  if (bathrooms) query = query.eq('bathrooms', bathrooms);

  // Apply pagination
  const { data: properties, error, count } = await query
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    properties,
    totalCount: count,
    page,
    limit
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get property data from request
  const propertyData = await request.json();

  // Insert property
  const { data, error } = await supabase
    .from('properties')
    .insert({
      ...propertyData,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
Property Details API
Create a file src/app/api/properties/[id]/route.ts:

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const propertyId = params.id;
  const supabase = await createClient();

  // Get property details
  const { data: property, error } = await supabase
    .from('properties')
    .select('*, property_images(*)')
    .eq('id', propertyId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  return NextResponse.json(property);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const propertyId = params.id;
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get property data from request
  const propertyData = await request.json();

  // Update property
  const { data, error } = await supabase
    .from('properties')
    .update(propertyData)
    .eq('id', propertyId)
    .eq('user_id', user.id) // Ensure user owns the property
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const propertyId = params.id;
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Delete property
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', propertyId)
    .eq('user_id', user.id); // Ensure user owns the property

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
Saved Properties API
Create a file src/app/api/saved-properties/route.ts:

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get saved properties for the user
  const { data: savedProperties, error } = await supabase
    .from('saved_properties')
    .select('*, property:properties(*)')
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(savedProperties);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get property ID from request
  const { property_id } = await request.json();

  // Save property
  const { data, error } = await supabase
    .from('saved_properties')
    .insert({
      user_id: user.id,
      property_id
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get property ID from request
  const url = new URL(request.url);
  const property_id = url.searchParams.get('property_id');

  if (!property_id) {
    return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
  }

  // Delete saved property
  const { error } = await supabase
    .from('saved_properties')
    .delete()
    .eq('user_id', user.id)
    .eq('property_id', property_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
User Profile API
Create a file src/app/api/profile/route.ts:

import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(profile);
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get profile data from request
  const profileData = await request.json();

  // Update profile
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
5. Frontend Integration
Property Service
Create a file src/services/propertyService.ts:

import { createClient } from '@/lib/supabase/client';

// Types
export interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  page?: number;
  limit?: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  property_type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  is_furnished: boolean;
  is_pet_friendly: boolean;
  has_parking: boolean;
  can_apply_instantly: boolean;
  is_new: boolean;
  has_special_offer: boolean;
  main_image_url: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  property_images: PropertyImage[];
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  alt_text: string;
  is_main_image: boolean;
  display_order: number;
  created_at: string;
}

// Functions
export async function getProperties(filters: PropertyFilters = {}) {
  const supabase = createClient();

  let query = supabase
    .from('properties')
    .select('*, property_images(*)');

  // Apply filters
  if (filters.city) query = query.ilike('city', `%${filters.city}%`);
  if (filters.minPrice) query = query.gte('price', filters.minPrice);
  if (filters.maxPrice) query = query.lte('price', filters.maxPrice);
  if (filters.bedrooms) query = query.eq('bedrooms', filters.bedrooms);
  if (filters.bathrooms) query = query.eq('bathrooms', filters.bathrooms);

  // Apply pagination
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const offset = (page - 1) * limit;

  const { data, error, count } = await query
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return {
    properties: data as Property[],
    totalCount: count,
    page,
    limit
  };
}

export async function getPropertyById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('properties')
    .select('*, property_images(*)')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Property;
}

export async function saveProperty(propertyId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('saved_properties')
    .insert({
      property_id: propertyId,
      user_id: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function unsaveProperty(propertyId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('saved_properties')
    .delete()
    .eq('property_id', propertyId)
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function getSavedProperties() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('saved_properties')
    .select('*, property:properties(*)')
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
Profile Service
Create a file src/services/profileService.ts:

import { createClient } from '@/lib/supabase/client';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  phone: string;
  preferred_contact_method: string;
  created_at: string;
  updated_at: string;
}

export async function getProfile() {
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.user?.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile;
}

export async function updateProfile(profileData: Partial<Profile>) {
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', user.user?.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Profile;
}
Custom Hooks
Create a file src/hooks/useProperties.ts:

import { useState, useEffect } from 'react';
import {
  PropertyFilters,
  Property,
  getProperties
} from '@/services/propertyService';

export function useProperties(initialFilters: PropertyFilters = {}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const result = await getProperties(filters);
        setProperties(result.properties);
        setTotalCount(result.totalCount || 0);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const updateFilters = (newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    properties,
    loading,
    error,
    filters,
    updateFilters,
    totalCount
  };
}
Create a file src/hooks/useSavedProperties.ts:

import { useState, useEffect } from 'react';
import {
  getSavedProperties,
  saveProperty,
  unsaveProperty
} from '@/services/propertyService';

export function useSavedProperties() {
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSavedProperties = async () => {
    try {
      setLoading(true);
      const data = await getSavedProperties();
      setSavedProperties(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const handleSaveProperty = async (propertyId: string) => {
    try {
      await saveProperty(propertyId);
      fetchSavedProperties();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  const handleUnsaveProperty = async (propertyId: string) => {
    try {
      await unsaveProperty(propertyId);
      fetchSavedProperties();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  return {
    savedProperties,
    loading,
    error,
    saveProperty: handleSaveProperty,
    unsaveProperty: handleUnsaveProperty
  };
}
Auth Context
Create a file src/contexts/AuthContext.tsx:

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User, Session } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Check active session
    const getSession = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      set
Auth Context (continued)
setUser(session?.user ?? null);
      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
6. File Upload Implementation
Storage Service
Create a file src/services/storageService.ts:

import { createClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export async function uploadPropertyImage(file: File, propertyId: string) {
  const supabase = createClient();

  // Create a unique file name
  const fileName = `${propertyId}/${uuidv4()}-${file.name}`;

  // Upload file to Supabase Storage
  const { data, error } = await supabase
    .storage
    .from('property-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(error.message);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('property-images')
    .getPublicUrl(data.path);

  return publicUrl;
}

export async function deletePropertyImage(imagePath: string) {
  const supabase = createClient();

  // Extract path from full URL
  const urlParts = imagePath.split('property-images/');
  if (urlParts.length < 2) {
    throw new Error('Invalid image path');
  }

  const path = urlParts[1];

  // Delete file from Supabase Storage
  const { error } = await supabase
    .storage
    .from('property-images')
    .remove([path]);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function uploadProfileAvatar(file: File, userId: string) {
  const supabase = createClient();

  // Create a unique file name
  const fileName = `${userId}/avatar-${uuidv4()}.${file.name.split('.').pop()}`;

  // Upload file to Supabase Storage
  const { data, error } = await supabase
    .storage
    .from('avatars')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    throw new Error(error.message);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('avatars')
    .getPublicUrl(data.path);

  return publicUrl;
}
7. Property Listing Pages
Property Listing Page
Create a file src/app/property/[id]/page.tsx:

// Implement property listing details page
// Display property images, details, amenities, etc.
// Include favorite/save functionality
Search Results Page
Create a file src/app/search/page.tsx:

// Implement search results page
// Display filtered properties based on search criteria
// Include filters and sorting options
Saved Properties Page
Create a file src/app/saved-homes/page.tsx:

// Implement saved properties page
// Display user's saved properties
// Include options to remove properties from saved list
8. User Profile Pages
Profile Page
Create a file src/app/profile/page.tsx:

// Implement user profile page
// Display and edit user details
// Include profile image upload functionality
Search History Page
Create a file src/app/search-history/page.tsx:

// Implement search history page
// Display user's recent searches
// Include functionality to reuse previous searches
9. Storage Setup
Supabase Storage Buckets
Create storage buckets in Supabase:

property-images - For property listing images

Configure public access
Set up RLS policies:
-- Everyone can read property images
CREATE POLICY "Public read access for property images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'property-images');

-- Only authenticated property owners can upload/delete
CREATE POLICY "Authenticated users can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images' AND (auth.uid() = (SELECT user_id FROM properties WHERE id::text = SPLIT_PART(storage.objects.name, '/', 1))));

CREATE POLICY "Users can delete their own property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'property-images' AND (auth.uid() = (SELECT user_id FROM properties WHERE id::text = SPLIT_PART(storage.objects.name, '/', 1))));
avatars - For user profile pictures

Configure public access
Set up RLS policies:
-- Everyone can read avatars
CREATE POLICY "Public read access for avatars"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

-- Only authenticated users can upload/update their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = SPLIT_PART(storage.objects.name, '/', 1));

CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = SPLIT_PART(storage.objects.name, '/', 1));

CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = SPLIT_PART(storage.objects.name, '/', 1));
10. Search and Filtering Implementation
Search Utility
Create a file src/utils/searchUtils.ts:

import { PropertyFilters } from '@/services/propertyService';

export function buildSearchParams(filters: PropertyFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.city) params.set('city', filters.city);
  if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
  if (filters.bedrooms) params.set('bedrooms', filters.bedrooms.toString());
  if (filters.bathrooms) params.set('bathrooms', filters.bathrooms.toString());
  if (filters.page) params.set('page', filters.page.toString());
  if (filters.limit) params.set('limit', filters.limit.toString());

  return params;
}

export function parseSearchParams(params: URLSearchParams): PropertyFilters {
  return {
    city: params.get('city') || undefined,
    minPrice: params.has('minPrice') ? Number(params.get('minPrice')) : undefined,
    maxPrice: params.has('maxPrice') ? Number(params.get('maxPrice')) : undefined,
    bedrooms: params.has('bedrooms') ? Number(params.get('bedrooms')) : undefined,
    bathrooms: params.has('bathrooms') ? Number(params.get('bathrooms')) : undefined,
    page: params.has('page') ? Number(params.get('page')) : 1,
    limit: params.has('limit') ? Number(params.get('limit')) : 10,
  };
}

export function saveSearchHistory(filters: PropertyFilters) {
  // Implement saving search history to database
}
11. Deployment Configuration
Environment Variables Setup
Create a .env.example file:

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
Deployment Instructions
Set up a Supabase project and configure as described above
Copy .env.example to .env.local and fill in your Supabase project details
Run database migrations to create the required tables and policies
Create storage buckets with appropriate permissions
Build and deploy your Next.js application
Configure any additional environment variables for your hosting provider
Integration Recommendations
To fully integrate this backend with your existing Trulia clone frontend:

Update your existing PropertyCard component to fetch real property data instead of using sample data:
// Update src/components/rental-listings/PropertyCard.tsx to use real data
Connect HeroSection search functionality to the backend search API:
// Update src/components/home/HeroSection.tsx to connect with search API
Implement authentication UI components for login/signup:
// Create login/signup components that use the Supabase Auth API
Add property creation/editing functionality for property owners:
// Create property listing management components
These implementations will integrate your database, authentication, and API endpoints with your existing UI components to create a fully functional Trulia clone.

Let me know if you want more detailed implementation for any specific component or if you're ready to begin the implementation!
