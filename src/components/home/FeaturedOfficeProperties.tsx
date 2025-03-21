"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { DbOfficeListing } from "@/types/database.types";
import OfficePropertyCard, { mapDbOfficeListingToProps } from "@/components/rental-listings/OfficePropertyCard";

export default function FeaturedOfficeProperties() {
  const [properties, setProperties] = useState<DbOfficeListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedOfficeProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/office-properties/featured');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch featured office properties');
        }
        const data: DbOfficeListing[] = await response.json();
        setProperties(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedOfficeProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-3xl font-semibold text-trulia-black mb-4">
            Featured Office Spaces
          </h2>
          <div className="flex justify-center items-center h-60">
            <div className="animate-pulse text-trulia-primary">Loading office properties...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-3xl font-semibold text-trulia-black mb-4">
            Featured Office Spaces
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
      <section className="py-12 bg-white">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-3xl font-semibold text-trulia-black mb-4">
            Featured Office Spaces
          </h2>
          <p>No office properties found. Check back soon for new listings.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container-wide">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-trulia-black">Featured Office Spaces</h2>
          <Link href="/office-spaces" className="hidden sm:block text-trulia-primary hover:underline font-medium">
            See more office spaces
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => {
            // Use the helper function to convert DbOfficeListing to OfficePropertyProps
            const officePropertyProps = mapDbOfficeListingToProps(property,
              "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");

            return <OfficePropertyCard key={property.id} {...officePropertyProps} />;
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/office-spaces"
            className="text-trulia-primary hover:underline font-medium inline-flex items-center"
          >
            See more office spaces
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
