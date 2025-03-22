"use client";

import { useState, useEffect } from "react";
import { useApi } from "@/lib/hooks/useApi";
import { DbRentalListing } from "@/types/database.types";
import PropertyCard, { PropertyProps } from "@/components/rental-listings/PropertyCard";
import FilterSidebar from "@/components/rental-listings/FilterSidebar";
import ListingHeader from "@/components/rental-listings/ListingHeader";
import { Button } from "@/components/ui/button";
import { MapIcon, GridIcon } from "lucide-react";

export default function AtlantaRentalsPage() {
  const [view, setView] = useState<"grid" | "map">("grid");
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000,
    minBeds: 0,
    minBaths: 0,
    petFriendly: false,
  });

  // Use our Atlanta-specific API endpoint
  const { data: properties, loading, error } = useApi<DbRentalListing[]>({
    url: '/api/rentals/atlanta',
    params: {
      minPrice: String(filters.minPrice),
      maxPrice: String(filters.maxPrice),
      minBeds: String(filters.minBeds),
      minBaths: String(filters.minBaths),
      petFriendly: filters.petFriendly ? 'true' : 'false'
    }
  });

  const toggleView = () => {
    setView(view === "grid" ? "map" : "grid");
  };

  if (loading) {
    return (
      <div className="container-wide py-8">
        <ListingHeader city="Atlanta" state="GA" count={0} />
        <div className="mt-6 flex justify-center">
          <div className="animate-pulse text-trulia-primary">Loading properties...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-wide py-8">
        <ListingHeader city="Atlanta" state="GA" count={0} />
        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  const propertyCount = properties?.length || 0;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container-wide py-8">
        <ListingHeader city="Atlanta" state="GA" count={propertyCount} />

        <div className="flex mt-6 gap-6">
          <FilterSidebar filters={filters} setFilters={setFilters} />

          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-trulia-dark-gray">
                {propertyCount} {propertyCount === 1 ? 'Home' : 'Homes'}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className={view === "grid" ? "bg-trulia-primary text-white" : ""}
                >
                  <GridIcon className="h-4 w-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={view === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("map")}
                  className={view === "map" ? "bg-trulia-primary text-white" : ""}
                >
                  <MapIcon className="h-4 w-4 mr-1" />
                  Map
                </Button>
              </div>
            </div>

            {properties?.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                <h3 className="text-xl font-medium text-trulia-black mb-2">No properties found</h3>
                <p className="text-trulia-dark-gray mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    minPrice: 0,
                    maxPrice: 5000,
                    minBeds: 0,
                    minBaths: 0,
                    petFriendly: false,
                  })}
                >
                  Reset Filters
                </Button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties?.map((property) => {
                  // Convert database properties to PropertyCard format
                  const propertyCardProps: PropertyProps = {
                    id: property.id,
                    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder image
                    price: Number(property.monthly_rent),
                    bedrooms: Number(property.bedrooms),
                    bathrooms: Number(property.bathrooms),
                    squareFeet: Number(property.square_feet),
                    address: property.street_address,
                    city: property.city,
                    state: property.state,
                    zip: property.zip_code,
                    isNew: new Date(property.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // New if within last 7 days
                    isPetFriendly: property.pet_friendly,
                    isFurnished: property.amenities?.includes("Furnished") || false,
                  };

                  return <PropertyCard key={property.id} {...propertyCardProps} />;
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4 h-[600px] shadow-sm flex items-center justify-center">
                <p className="text-trulia-dark-gray">Map view is not implemented in this demo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
