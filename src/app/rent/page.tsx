'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchIcon, ChevronRight } from 'lucide-react';

interface CityCardProps {
  name: string;
  state: string;
  path: string;
  image: string;
  count: number;
}

const CityCard = ({ name, state, path, image, count }: CityCardProps) => (
  <Link href={path} className="block group">
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={image}
          alt={`${name}, ${state}`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-xl font-semibold text-white">{name}, {state}</h3>
          <p className="text-sm text-white/90">{count} Rental Homes</p>
        </div>
      </div>
    </Card>
  </Link>
);

export default function RentalsPage() {
  const popularCities = [
    { name: 'Atlanta', state: 'GA', path: '/rent/atlanta', image: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: 6 },
    { name: 'New York', state: 'NY', path: '#', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: 0 },
    { name: 'Los Angeles', state: 'CA', path: '#', image: 'https://images.unsplash.com/photo-1506190503914-c9505dea2738?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: 0 },
    { name: 'Chicago', state: 'IL', path: '#', image: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: 0 },
    { name: 'Miami', state: 'FL', path: '#', image: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: 0 },
    { name: 'Austin', state: 'TX', path: '#', image: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', count: 0 },
  ];

  const searchCategories = [
    "Apartments for Rent",
    "Houses for Rent",
    "Pet Friendly Rentals",
    "Cheap Apartments",
    "Luxury Apartments",
    "Studios for Rent",
    "1 Bedroom Apartments",
    "2 Bedroom Apartments",
    "3 Bedroom Apartments"
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-wide py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-trulia-black mb-2">Find Your Next Rental Home</h1>
          <p className="text-trulia-dark-gray">
            Discover apartments, houses, and townhomes for rent across the United States
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by city, address, or ZIP"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trulia-primary focus:border-trulia-primary"
              />
            </div>
            <Button className="bg-trulia-primary hover:bg-trulia-primary/90 text-white py-3 px-6">
              Search
            </Button>
          </div>
        </div>

        {/* Popular Cities */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-trulia-black mb-6">Popular Rental Markets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCities.map((city, index) => (
              <CityCard
                key={index}
                name={city.name}
                state={city.state}
                path={city.path}
                image={city.image}
                count={city.count}
              />
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-trulia-black mb-6">Popular Rental Searches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchCategories.map((category, index) => (
              <Link href="#" key={index} className="group">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-trulia-primary transition-colors">
                  <span className="text-trulia-dark-gray group-hover:text-trulia-primary">{category}</span>
                  <ChevronRight className="h-4 w-4 text-trulia-dark-gray group-hover:text-trulia-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Why Rent With Trulia */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold text-trulia-black mb-6 text-center">Why Rent With Trulia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-trulia-primary/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                <SearchIcon className="h-6 w-6 text-trulia-primary" />
              </div>
              <h3 className="font-semibold text-trulia-black mb-2">Find the Perfect Rental</h3>
              <p className="text-trulia-dark-gray">
                Search thousands of up-to-date rental listings on Trulia, with detailed filters to find exactly what you're looking for.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-trulia-primary/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-trulia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-trulia-black mb-2">Verified Listings</h3>
              <p className="text-trulia-dark-gray">
                We verify property information to help you avoid rental scams and find a home you can trust.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-trulia-primary/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-trulia-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-trulia-black mb-2">Neighborhood Info</h3>
              <p className="text-trulia-dark-gray">
                Get detailed information about neighborhoods, including schools, amenities, and local insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
