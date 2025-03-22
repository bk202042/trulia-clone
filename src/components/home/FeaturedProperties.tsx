"use client";

import PropertyCard, { PropertyProps } from "@/components/rental-listings/PropertyCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { DbRentalListing } from "@/types/database.types";
import { useApi } from "@/lib/hooks/useApi";

export default function FeaturedProperties() {
  const { data: properties, loading, error } = useApi<DbRentalListing[]>({
    url: '/api/featured-properties'
  });

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-3xl font-semibold text-trulia-black mb-4">
            Newly listed rental properties
          </h2>
          <div className="flex justify-center items-center h-60">
            <div className="animate-pulse text-trulia-primary">Loading properties...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-3xl font-semibold text-trulia-black mb-4">
            Newly listed rental properties
          </h2>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </section>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-3xl font-semibold text-trulia-black mb-4">
            Newly listed rental properties
          </h2>
          <p>No properties found in this area. Try expanding your search.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-wide">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-trulia-black">Newly listed rental properties</h2>
          <Link href="/rentals" className="hidden sm:block text-trulia-primary hover:underline font-medium">
            See more homes
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => {
            // Convert database properties to PropertyCard format
            const propertyCardProps: PropertyProps = {
              id: property.id,
              imageUrl:
                "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder image
              price: Number(property.monthly_rent),
              bedrooms: Number(property.bedrooms),
              bathrooms: Number(property.bathrooms),
              squareFeet: Number(property.square_feet),
              address: property.street_address,
              city: property.city,
              state: property.state,
              zip: property.zip_code,
              isNew:
                new Date(property.created_at) >
                new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // New if within last 7 days
              isPetFriendly: property.pet_friendly,
              isFurnished: property.amenities?.includes("Furnished") || false,
              hasSpecialOffer: false, // Could implement based on your business logic
              canApplyInstantly: false, // Could implement based on your business logic
            };

            return <PropertyCard key={property.id} {...propertyCardProps} />;
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/rentals"
            className="text-trulia-primary hover:underline font-medium inline-flex items-center"
          >
            See more homes
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
