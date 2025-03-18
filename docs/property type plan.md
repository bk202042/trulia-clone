Property Type Implementation for Trulia Clone
I'll provide a complete implementation plan that ensures users can explore two main types of properties on the main page: Apartments and Offices.

1. Database Schema Updates
We'll modify the properties table to include a property type field with specific enumeration values:

-- Create an enum type for property types
CREATE TYPE property_type_enum AS ENUM ('apartment', 'office');

-- Add property_type column to properties table (if creating a new table)
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  bedrooms SMALLINT NOT NULL,
  bathrooms SMALLINT NOT NULL,
  square_feet NUMERIC,
  property_type property_type_enum NOT NULL, -- Apartment or Office
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
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);
The property_type field will specifically categorize properties as either apartments or offices.

2. Property Filtering Implementation
Property Service Updates
Update the property service to include property type filtering:

// In src/services/propertyService.ts
export interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: 'apartment' | 'office'; // Property type filter
  page?: number;
  limit?: number;
}

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
  if (filters.propertyType) query = query.eq('property_type', filters.propertyType);

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
API Route Updates
Modify the API routes to handle property type filtering:

// In src/app/api/properties/route.ts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const bedrooms = searchParams.get('bedrooms');
  const bathrooms = searchParams.get('bathrooms');
  const propertyType = searchParams.get('propertyType'); // Add property type parameter
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
  if (propertyType) query = query.eq('property_type', propertyType);

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
3. UI Components for Property Type Selection
Property Type Selector Component
Create a new component for selecting property type:

// In src/components/property-filters/PropertyTypeSelector.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Home } from 'lucide-react';

interface PropertyTypeSelectorProps {
  initialValue?: 'apartment' | 'office';
  onChange?: (value: 'apartment' | 'office') => void;
}

export function PropertyTypeSelector({
  initialValue = 'apartment',
  onChange
}: PropertyTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<'apartment' | 'office'>(initialValue);

  const handleChange = (value: 'apartment' | 'office') => {
    setSelectedType(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Property Type</h3>
      <Tabs
        defaultValue={initialValue}
        value={selectedType}
        onValueChange={(value) => handleChange(value as 'apartment' | 'office')}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="apartment" className="py-3">
            <div className="flex flex-col items-center">
              <Home className="h-5 w-5 mb-1" />
              <span>Apartment</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="office" className="py-3">
            <div className="flex flex-col items-center">
              <Building className="h-5 w-5 mb-1" />
              <span>Office</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
Update the ExploreRentals Component
Modify the ExploreRentals component to include property type filtering:

// In src/components/home/ExploreRentals.tsx
"use client";

import { useState } from "react";
import { PropertyTypeSelector } from "@/components/property-filters/PropertyTypeSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

// ... (existing code)

export default function ExploreRentals() {
  const [propertyType, setPropertyType] = useState<'apartment' | 'office'>('apartment');

  // Filter cities based on property type if needed
  // This is just an example - you might want to fetch cities from the API based on propertyType
  const filteredCities = cities.filter(city => {
    // For demonstration - in real implementation you'd use data from API
    if (propertyType === 'office') {
      // Maybe only show certain cities for offices
      return ['atlanta', 'austin', 'boston', 'san-jose'].includes(city.id);
    }
    return true;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wide">
        <h2 className="text-2xl sm:text-3xl text-center font-semibold text-trulia-black mb-4">
          Explore rentals on Trulia
        </h2>
        <p className="text-center text-trulia-dark-gray max-w-2xl mx-auto mb-12">
          Take a deep dive and browse homes or apartments for rent and local insights to find what is right for you.
        </p>

        {/* Add property type selector */}
        <div className="max-w-md mx-auto mb-8">
          <PropertyTypeSelector
            initialValue="apartment"
            onChange={(value) => setPropertyType(value)}
          />
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {filteredCities.map((city) => (
              <CarouselItem key={city.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2">
                <Link href={`/for_rent/${city.slug}?propertyType=${propertyType}`} className="block h-full">
                  <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={city.imageUrl}
                        alt={`${city.name}, ${city.state}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <h3 className="text-xl font-semibold text-white">
                          {city.name}, {city.state}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-trulia-primary text-trulia-primary hover:bg-trulia-primary/5"
                      >
                        <span>View {propertyType === 'apartment' ? 'Apartments' : 'Offices'}</span>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* ... rest of component */}
        </Carousel>

        {/* ... rest of component */}
      </div>
    </section>
  );
}
Update the Hero Section Component
Modify the HeroSection component to include property type in the search:

// In src/components/home/HeroSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("rent");
  const [propertyType, setPropertyType] = useState<'apartment' | 'office'>('apartment');
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Redirect to search page with parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    params.set('propertyType', propertyType);

    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Family in front of house"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container-narrow text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover a place<br />you&apos;ll love to live
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
          <Tabs defaultValue="rent" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 bg-gray-100 rounded-none">
              <TabsTrigger
                value="buy"
                className={`py-3 ${activeTab === "buy" ? "bg-white" : "text-gray-700"}`}
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value="rent"
                className={`py-3 ${activeTab === "rent" ? "bg-white" : "text-gray-700"}`}
              >
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="sold"
                className={`py-3 ${activeTab === "sold" ? "bg-white" : "text-gray-700"}`}
              >
                Sold
              </TabsTrigger>
            </TabsList>

            <div className="p-4">
              {activeTab === "rent" && (
                <div className="mb-4">
                  <Tabs
                    defaultValue="apartment"
                    value={propertyType}
                    onValueChange={(value) => setPropertyType(value as 'apartment' | 'office')}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-2 w-full bg-gray-100">
                      <TabsTrigger value="apartment">Apartments</TabsTrigger>
                      <TabsTrigger value="office">Offices</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}

              <div className="relative">
                <Input
                  type="text"
                  placeholder="City, Address, School, Agent, ZIP"
                  className="h-14 pl-4 pr-12 text-gray-900 text-lg rounded-md border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />
                <Button
                  className="absolute right-0 top-0 h-full aspect-square rounded-l-none bg-trulia-primary hover:bg-trulia-primary/90"
                  aria-label="Search"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
Add Property Type Icons
Add dedicated icons for property types:

public/icons/apartment.svg
public/icons/office.svg
4. Search and Filter Implementation
Update the search utils to incorporate property type:

// In src/utils/searchUtils.ts
import { PropertyFilters } from '@/services/propertyService';

export function buildSearchParams(filters: PropertyFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.city) params.set('city', filters.city);
  if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
  if (filters.bedrooms) params.set('bedrooms', filters.bedrooms.toString());
  if (filters.bathrooms) params.set('bathrooms', filters.bathrooms.toString());
  if (filters.propertyType) params.set('propertyType', filters.propertyType);
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
    propertyType: (params.get('propertyType') as 'apartment' | 'office') || undefined,
    page: params.has('page') ? Number(params.get('page')) : 1,
    limit: params.has('limit') ? Number(params.get('limit')) : 10,
  };
}
5. Update Search Results Page
Create or update the search results page to handle property type filtering:

// In src/app/search/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PropertyCard } from '@/components/rental-listings/PropertyCard';
import { PropertyTypeSelector } from '@/components/property-filters/PropertyTypeSelector';
import { PropertyFilters, getProperties } from '@/services/propertyService';
import { parseSearchParams } from '@/utils/searchUtils';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialFilters = parseSearchParams(searchParams);

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);

  const updateFilters = (newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const result = await getProperties(filters);
        setProperties(result.properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  return (
    <div className="container-wide py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Property Type Selector */}
          <PropertyTypeSelector
            initialValue={filters.propertyType || 'apartment'}
            onChange={(value) => updateFilters({ propertyType: value })}
          />

          {/* Other filters */}
          {/* ... */}
        </div>

        {/* Results */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">
            {filters.propertyType === 'office' ? 'Office' : 'Apartment'} Rentals
            {filters.city ? ` in ${filters.city}` : ''}
          </h1>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.length > 0 ? (
                properties.map(property => (
                  <PropertyCard key={property.id} {...property} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  No properties found. Try adjusting your filters.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
6. Update Sample Data
Until you have real data in your database, update the sample property data to include property types:

// In src/components/home/FeaturedProperties.tsx
// Sample data for featured properties
const sampleProperties: PropertyProps[] = [
  {
    id: "prop-1",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 2200,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    address: "260 Higdon Ave",
    city: "Mountain View",
    state: "CA",
    zip: "94041",
    isNew: true,
    canApplyInstantly: true,
    isFurnished: true,
    propertyType: 'apartment' // Add property type
  },
  {
    id: "prop-2",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 6890,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2164,
    address: "829 Moraga Dr",
    city: "Mountain View",
    state: "CA",
    zip: "94041",
    isNew: true,
    isPetFriendly: true,
    canApplyInstantly: true,
    propertyType: 'apartment' // Add property type
  },
  {
    id: "prop-3",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 4500,
    bedrooms: 0,
    bathrooms: 2,
    squareFeet: 1200,
    address: "500 Castro St",
    city: "Mountain View",
    state: "CA",
    zip: "94041",
    isNew: true,
    canApplyInstantly: true,
    propertyType: 'office' // Add property type for office
  },
  {
    id: "prop-4",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 3200,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 800,
    address: "100 View St",
    city: "Mountain View",
    state: "CA",
    zip: "94041",
    isNew: true,
    canApplyInstantly: true,
    propertyType: 'office' // Add property type for office
  }
];
With these updates, your Trulia clone will support the two main property types (Apartments and Offices) as requested, allowing users to easily filter and view properties by type throughout the application.

Let me know if you need any clarification or have any questions about the implementation!
