Detailed UI Components for Property Type Implementation
Let me provide a comprehensive breakdown of the UI components needed for the property type implementation (Apartments and Offices) in your Trulia clone:

1. Property Type Selector Component
Component Details
Location: src/components/property-filters/PropertyTypeSelector.tsx
Purpose: Allows users to toggle between viewing apartments or offices
Usage: Used in the hero search section, filter sidebar, and property listings page
Implementation Details
'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Home } from 'lucide-react';

interface PropertyTypeSelectorProps {
  initialValue?: 'apartment' | 'office';
  onChange?: (value: 'apartment' | 'office') => void;
  variant?: 'default' | 'cards' | 'minimal';
  className?: string;
}

export function PropertyTypeSelector({
  initialValue = 'apartment',
  onChange,
  variant = 'default',
  className = '',
}: PropertyTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<'apartment' | 'office'>(initialValue);

  const handleChange = (value: 'apartment' | 'office') => {
    setSelectedType(value);
    if (onChange) {
      onChange(value);
    }
  };

  // Different visual variants
  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-2 gap-4 ${className}`}>
        <button
          onClick={() => handleChange('apartment')}
          className={`
            flex flex-col items-center justify-center p-4 rounded-lg border-2 transition
            ${selectedType === 'apartment'
              ? 'border-trulia-primary bg-trulia-primary/5'
              : 'border-gray-200 hover:border-trulia-primary/50'
            }
          `}
          aria-pressed={selectedType === 'apartment'}
        >
          <Home className={`h-8 w-8 mb-2 ${selectedType === 'apartment' ? 'text-trulia-primary' : 'text-gray-500'}`} />
          <span className={`font-medium ${selectedType === 'apartment' ? 'text-trulia-primary' : 'text-gray-700'}`}>
            Apartment
          </span>
        </button>

        <button
          onClick={() => handleChange('office')}
          className={`
            flex flex-col items-center justify-center p-4 rounded-lg border-2 transition
            ${selectedType === 'office'
              ? 'border-trulia-primary bg-trulia-primary/5'
              : 'border-gray-200 hover:border-trulia-primary/50'
            }
          `}
          aria-pressed={selectedType === 'office'}
        >
          <Building className={`h-8 w-8 mb-2 ${selectedType === 'office' ? 'text-trulia-primary' : 'text-gray-500'}`} />
          <span className={`font-medium ${selectedType === 'office' ? 'text-trulia-primary' : 'text-gray-700'}`}>
            Office
          </span>
        </button>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex rounded-md shadow-sm ${className}`}>
        <button
          onClick={() => handleChange('apartment')}
          className={`
            px-4 py-2 text-sm font-medium rounded-l-md border
            ${selectedType === 'apartment'
              ? 'bg-trulia-primary text-white border-trulia-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }
          `}
          aria-pressed={selectedType === 'apartment'}
        >
          Apartments
        </button>
        <button
          onClick={() => handleChange('office')}
          className={`
            px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b
            ${selectedType === 'office'
              ? 'bg-trulia-primary text-white border-trulia-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }
          `}
          aria-pressed={selectedType === 'office'}
        >
          Offices
        </button>
      </div>
    );
  }

  // Default tabs version
  return (
    <div className={className}>
      <Tabs
        defaultValue={initialValue}
        value={selectedType}
        onValueChange={(value) => handleChange(value as 'apartment' | 'office')}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="apartment" className="py-3">
            <div className="flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              <span>Apartments</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="office" className="py-3">
            <div className="flex items-center justify-center gap-2">
              <Building className="h-4 w-4" />
              <span>Offices</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
Visual Representation:
Default Variant: Standard tabs with property type icons
Cards Variant: Large icon cards with visual emphasis on selection
Minimal Variant: Simple toggle buttons for space-constrained areas
Accessibility Features:
Proper aria-pressed attributes for button states
Keyboard navigation support
Visual indicators through both color and icon changes
2. Updated Hero Section Component
Component Details
Location: src/components/home/HeroSection.tsx
Purpose: Main search interface with prominent property type selection
Usage: Featured at the top of the home page
Implementation Details
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropertyTypeSelector } from "@/components/property-filters/PropertyTypeSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("rent");
  const [propertyType, setPropertyType] = useState<'apartment' | 'office'>('apartment');
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    params.set('propertyType', propertyType);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={propertyType === 'apartment'
            ? "/images/hero-apartment.jpg"
            : "/images/hero-office.jpg"}
          alt={propertyType === 'apartment'
            ? "Apartment building exterior"
            : "Modern office building"}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container-narrow text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {propertyType === 'apartment'
            ? "Find your perfect apartment"
            : "Discover your ideal office space"}
        </h1>

        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {propertyType === 'apartment'
            ? "Search thousands of apartments for rent with virtual tours available"
            : "Browse office spaces from coworking to corporate headquarters"}
        </p>

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
              {/* Property Type Selector - Only show for rent tab */}
              {activeTab === "rent" && (
                <div className="mb-4">
                  <PropertyTypeSelector
                    initialValue={propertyType}
                    onChange={setPropertyType}
                    variant="default"
                  />
                </div>
              )}

              <div className="relative mt-4">
                <Input
                  type="text"
                  placeholder={propertyType === 'apartment'
                    ? "Search by city, neighborhood, or ZIP"
                    : "Search office spaces by location or business district"}
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

              {/* Quick search suggestions */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {propertyType === 'apartment' ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => {
                      setSearchQuery("San Francisco");
                      handleSearch();
                    }}>
                      San Francisco Apartments
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      setSearchQuery("New York");
                      handleSearch();
                    }}>
                      New York Apartments
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => {
                      setSearchQuery("Financial District");
                      handleSearch();
                    }}>
                      Financial District Offices
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      setSearchQuery("Coworking");
                      handleSearch();
                    }}>
                      Coworking Spaces
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
Visual Behavior:
Background image changes based on selected property type
Heading text adapts to context
Search placeholder changes to reflect property type
Quick search suggestions vary by property type
3. Updated PropertyCard Component
Component Details
Location: src/components/rental-listings/PropertyCard.tsx
Purpose: Display individual property listings with property type indicators
Usage: Used across search results, featured properties, and saved properties
Implementation Details
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Home, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PropertyProps {
  id: string;
  imageUrl: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: 'apartment' | 'office';
  isNew?: boolean;
  isPetFriendly?: boolean;
  isFurnished?: boolean;
  hasSpecialOffer?: boolean;
  canApplyInstantly?: boolean;
}

export default function PropertyCard({
  id,
  imageUrl,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  address,
  city,
  state,
  zip,
  propertyType,
  isNew = false,
  isPetFriendly = false,
  isFurnished = false,
  hasSpecialOffer = false,
  canApplyInstantly = false
}: PropertyProps) {
  // Format price with commas
  const formattedPrice = price.toLocaleString();

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/property/${id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${address}, ${city}, ${state} ${zip}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-9 w-9 rounded-full bg-white/90 hover:bg-white"
            aria-label="Save property"
          >
            <Heart className="h-5 w-5 text-gray-600 hover:text-trulia-red" />
          </Button>

          {/* Property Type Badge - Always show */}
          <Badge
            className={`absolute top-2 left-2 flex items-center gap-1
              ${propertyType === 'apartment'
                ? 'bg-trulia-secondary/90 text-white'
                : 'bg-trulia-tertiary/90 text-white'}`}
          >
            {propertyType === 'apartment'
              ? <><Home className="h-3 w-3" /> Apartment</>
              : <><Building className="h-3 w-3" /> Office</>}
          </Badge>

          {/* Additional Tags */}
          <div className="absolute top-10 left-2 flex flex-wrap gap-1 mt-1">
            {isNew && (
              <Badge className="bg-trulia-blue text-white">NEW</Badge>
            )}
            {canApplyInstantly && (
              <Badge className="bg-trulia-green text-white">APPLY INSTANTLY</Badge>
            )}
            {hasSpecialOffer && (
              <Badge className="bg-trulia-primary text-white">SPECIAL OFFER</Badge>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-medium text-trulia-black">${formattedPrice}/mo</h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-trulia-dark-gray mb-2">
          {propertyType === 'apartment' ? (
            <>
              <span>{bedrooms} bd</span>
              <span className="h-1 w-1 rounded-full bg-trulia-light-gray"></span>
              <span>{bathrooms} ba</span>
            </>
          ) : (
            <span>Office Space</span>
          )}
          {squareFeet && (
            <>
              <span className="h-1 w-1 rounded-full bg-trulia-light-gray"></span>
              <span>{squareFeet.toLocaleString()} sqft</span>
            </>
          )}
        </div>

        <address className="text-trulia-dark-gray text-sm not-italic">
          {address}, {city}, {state} {zip}
        </address>

        {/* Feature tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {propertyType === 'apartment' && isPetFriendly && (
            <Badge variant="outline" className="border-trulia-light-gray text-trulia-dark-gray">
              PET FRIENDLY
            </Badge>
          )}
          {propertyType === 'apartment' && isFurnished && (
            <Badge variant="outline" className="border-trulia-light-gray text-trulia-dark-gray">
              FURNISHED
            </Badge>
          )}
          {propertyType === 'office' && (
            <Badge variant="outline" className="border-trulia-light-gray text-trulia-dark-gray">
              COMMERCIAL
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
Visual Differentiation:
Distinct badges with icons for apartment vs. office
Different color schemes for each property type
Layout adaptations based on type (e.g., offices don't show bedroom count)
Type-specific features and amenities
4. ExploreRentals Component with Property Type Filtering
Component Details
Location: src/components/home/ExploreRentals.tsx
Purpose: Allow users to browse cities with property type filtering
Usage: Featured on the home page
Implementation Details
"use client";

import { useState, useEffect } from "react";
import { PropertyTypeSelector } from "@/components/property-filters/PropertyTypeSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface CityCard {
  id: string;
  name: string;
  state: string;
  imageUrl: string;
  slug: string;
  hasApartments: boolean;
  hasOffices: boolean;
}

// Enhanced city data with property type availability
const cities: CityCard[] = [
  {
    id: "atlanta",
    name: "Atlanta",
    state: "GA",
    imageUrl: "https://images.unsplash.com/photo-1575919539234-d1ec0d8bb709?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "atlanta-ga",
    hasApartments: true,
    hasOffices: true
  },
  {
    id: "austin",
    name: "Austin",
    state: "TX",
    imageUrl: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "austin-tx",
    hasApartments: true,
    hasOffices: true
  },
  {
    id: "scottsdale",
    name: "Scottsdale",
    state: "AZ",
    imageUrl: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "scottsdale-az",
    hasApartments: true,
    hasOffices: false
  },
  {
    id: "boston",
    name: "Boston",
    state: "MA",
    imageUrl: "https://images.unsplash.com/photo-1501979376754-2ff867a4f360?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "boston-ma",
    hasApartments: true,
    hasOffices: true
  },
  {
    id: "oakland",
    name: "Oakland",
    state: "CA",
    imageUrl: "https://images.unsplash.com/photo-1577641479872-55e52e0c2ab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "oakland-ca",
    hasApartments: true,
    hasOffices: false
  },
  {
    id: "san-jose",
    name: "San Jose",
    state: "CA",
    imageUrl: "https://images.unsplash.com/photo-1538097304804-2a1b932466a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "san-jose-ca",
    hasApartments: true,
    hasOffices: true
  },
  {
    id: "new-york",
    name: "New York",
    state: "NY",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "new-york-ny",
    hasApartments: true,
    hasOffices: true
  },
  {
    id: "chicago",
    name: "Chicago",
    state: "IL",
    imageUrl: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "chicago-il",
    hasApartments: true,
    hasOffices: true
  }
];

export default function ExploreRentals() {
  const [propertyType, setPropertyType] = useState<'apartment' | 'office'>('apartment');
  const [filteredCities, setFilteredCities] = useState<CityCard[]>([]);

  // Filter cities based on property type
  useEffect(() => {
    if (propertyType === 'apartment') {
      setFilteredCities(cities.filter(city => city.hasApartments));
    } else {
      setFilteredCities(cities.filter(city => city.hasOffices));
    }
  }, [propertyType]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wide">
        <h2 className="text-2xl sm:text-3xl text-center font-semibold text-trulia-black mb-4">
          {propertyType === 'apartment'
            ? "Explore apartments for rent"
            : "Find office spaces for rent"}
        </h2>

        <p className="text-center text-trulia-dark-gray max-w-2xl mx-auto mb-8">
          {propertyType === 'apartment'
            ? "Take a deep dive and browse apartments for rent and local insights to find what is right for you."
            : "Discover office spaces from small startups to corporate headquarters in top business districts."}
        </p>

        {/* Property Type Selector */}
        <div className="max-w-md mx-auto mb-12">
          <PropertyTypeSelector
            initialValue={propertyType}
            onChange={setPropertyType}
            variant="cards"
          />
        </div>

        {filteredCities.length > 0 ? (
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
                          className={`w-full ${
                            propertyType === 'apartment'
                              ? 'border-trulia-secondary text-trulia-secondary hover:bg-trulia-secondary/5'
                              : 'border-trulia-tertiary text-trulia-tertiary hover:bg-trulia-tertiary/5'
                          }`}
                        >
                          <span>View {propertyType === 'apartment' ? 'Apartments' : 'Offices'}</span>
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="left-1" />
              <CarouselNext className="right-1" />
            </div>
          </Carousel>
        ) : (
          <div className="text-center py-8 text-trulia-dark-gray">
            No {propertyType === 'apartment' ? 'apartments' : 'offices'} available in selected cities.
          </div>
        )}

        {/* Rest of component remains the same */}
      </div>
    </section>
  );
}
Visual Adaptations:
Dynamic heading and description based on property type
Color-coded buttons for visual distinction
City filtering based on property type availability
Empty state handling for filtered results
5. Property Filters Component
Component Details
Location: src/components/property-filters/PropertyFilters.tsx
Purpose: Comprehensive filtering sidebar for property search
Usage: Used on search results pages
Implementation Details
'use client';

import { useState } from 'react';
import { PropertyTypeSelector } from './PropertyTypeSelector';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { PropertyFilters as PropertyFiltersType } from '@/services/propertyService';

interface PropertyFiltersProps {
  initialFilters: PropertyFiltersType;
  onApplyFilters: (filters: PropertyFiltersType) => void;
}

export function PropertyFilters({ initialFilters, onApplyFilters }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFiltersType>(initialFilters);

  // Price range for both apartment and office
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 0,
    filters.maxPrice || 10000
  ]);

  const updateFilters = (partialFilters: Partial<PropertyFiltersType>) => {
    setFilters(prev => ({ ...prev, ...partialFilters }));
  };

  const handleApply = () => {
    onApplyFilters({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    });
  };

  const handleReset = () => {
    const defaultFilters = {
      propertyType: filters.propertyType,
      city: filters.city,
      page: 1
    };
    setFilters(defaultFilters);
    setPriceRange([0, 10000]);
    onApplyFilters(defaultFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      {/* Property Type Selector */}
      <div className="mb-8">
        <h3 className="text-sm font-medium mb-3">Property Type</h3>
        <PropertyTypeSelector
          initialValue={filters.propertyType || 'apartment'}
          onChange={(value) => updateFilters({ propertyType: value })}
          variant="default"
        />
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <h3 className="text-sm font-medium">Price Range</h3>
          <span className="text-sm text-trulia-dark-gray">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={priceRange}
          min={0}
          max={filters.propertyType === 'office' ? 20000 : 10000}
          step={100}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-trulia-dark-gray">
          <span>$0</span>
          <span>${filters.propertyType === 'office' ? '20,000+' : '10,000+'}</span>
        </div>
      </div>

      {/* Apartment-specific filters */}
      {filters.propertyType === 'apartment' && (
        <>
          {/* Bedrooms */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Bedrooms</h3>
            <div className="grid grid-cols-5 gap-2">
              {['Any', 'Studio', '1', '2', '3+'].map((bed, index) => (
                <Button
                  key={bed}
                  variant="outline"
                  size="sm"
                  className={`
                    ${(index === 0 && filters.bedrooms === undefined) ||
                      (
