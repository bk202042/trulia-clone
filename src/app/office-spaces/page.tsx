"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter, MapPin } from "lucide-react";
import Link from "next/link";
import OfficePropertyCard, { mapDbOfficeListingToProps } from "@/components/rental-listings/OfficePropertyCard";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { DbOfficeListing } from "@/types/database.types";

export default function OfficeSpacesPage() {
  const [officeListings, setOfficeListings] = useState<DbOfficeListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    minDesks: undefined as number | undefined,
    maxDesks: undefined as number | undefined,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    officeType: undefined as string | undefined,
    hasReception: undefined as boolean | undefined,
    city: undefined as string | undefined,
  });

  useEffect(() => {
    const fetchOfficeListings = async () => {
      setLoading(true);
      setError(null);

      try {
        // Construct URL with query parameters
        const params = new URLSearchParams();
        params.append('page', currentPage.toString());
        params.append('limit', '8');

        // Add filters
        if (filters.minDesks) params.append('minDesks', filters.minDesks.toString());
        if (filters.maxDesks) params.append('maxDesks', filters.maxDesks.toString());
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.officeType) params.append('officeType', filters.officeType);
        if (filters.hasReception !== undefined) params.append('hasReception', filters.hasReception.toString());
        if (filters.city) params.append('city', filters.city);

        const response = await fetch(`/api/office-properties?${params.toString()}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || errorData.message || 'Failed to fetch office listings');
        }

        const data = await response.json();
        setOfficeListings(data.data);
        setTotalPages(data.metadata.totalPages);
      } catch (error) {
        console.error('Error fetching office listings:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOfficeListings();
  }, [currentPage, filters]);

  const handleFilterChange = (key: string, value: string | number | boolean | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  if (loading && officeListings.length === 0) {
    return (
      <div className="container-wide py-12">
        <h1 className="text-3xl font-bold mb-6">Office Spaces for Rent</h1>
        <div className="flex justify-center items-center h-60">
          <div className="animate-pulse text-trulia-primary">Loading office spaces...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-wide py-12">
        <h1 className="text-3xl font-bold mb-6">Office Spaces for Rent</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Office Spaces for Rent</h1>
          <div className="flex items-center text-trulia-dark-gray">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {filters.city || "All Locations"} · {officeListings.length > 0 ? officeListings.length : "No"} offices found
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setFilters({
              minDesks: undefined,
              maxDesks: undefined,
              minPrice: undefined,
              maxPrice: undefined,
              officeType: undefined,
              hasReception: undefined,
              city: undefined,
            })}
          >
            <Filter className="w-4 h-4" />
            Reset Filters
          </Button>

          <select
            className="rounded-md border border-gray-200 px-4 py-2"
            value={filters.officeType || ''}
            onChange={(e) => handleFilterChange('officeType', e.target.value || undefined)}
            aria-label="Filter by office type"
          >
            <option value="">Office Type</option>
            <option value="Private Office">Private Office</option>
            <option value="Co-working">Co-working</option>
            <option value="Executive Suite">Executive Suite</option>
            <option value="Entire Floor">Entire Floor</option>
            <option value="Creative Loft">Creative Loft</option>
          </select>

          <select
            className="rounded-md border border-gray-200 px-4 py-2"
            value={filters.city || ''}
            onChange={(e) => handleFilterChange('city', e.target.value || undefined)}
            aria-label="Filter by city"
          >
            <option value="">All Cities</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Oakland">Oakland</option>
          </select>

          <select
            className="rounded-md border border-gray-200 px-4 py-2"
            value={filters.minDesks?.toString() || ''}
            onChange={(e) => handleFilterChange('minDesks', e.target.value ? parseInt(e.target.value) : undefined)}
            aria-label="Filter by minimum number of desks"
          >
            <option value="">Min Desks</option>
            <option value="5">5+ desks</option>
            <option value="10">10+ desks</option>
            <option value="25">25+ desks</option>
            <option value="50">50+ desks</option>
          </select>

          <select
            className="rounded-md border border-gray-200 px-4 py-2"
            value={filters.minPrice?.toString() || ''}
            onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
            aria-label="Filter by minimum price"
          >
            <option value="">Min Price</option>
            <option value="3000">$3,000+</option>
            <option value="5000">$5,000+</option>
            <option value="7500">$7,500+</option>
            <option value="10000">$10,000+</option>
          </select>

          <select
            className="rounded-md border border-gray-200 px-4 py-2"
            value={filters.maxPrice?.toString() || ''}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
            aria-label="Filter by maximum price"
          >
            <option value="">Max Price</option>
            <option value="5000">$5,000</option>
            <option value="7500">$7,500</option>
            <option value="10000">$10,000</option>
            <option value="15000">$15,000</option>
          </select>
        </div>
      </div>

      {officeListings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No office spaces match your criteria</h3>
          <p className="text-trulia-dark-gray mb-4">Try adjusting your filters or search for a different area</p>
          <Button variant="secondary" onClick={() => setFilters({
            minDesks: undefined,
            maxDesks: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            officeType: undefined,
            hasReception: undefined,
            city: undefined,
          })}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {officeListings.map((listing) => {
              const officeProps = mapDbOfficeListingToProps(
                listing,
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              );
              return <OfficePropertyCard key={listing.id} {...officeProps} />;
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? "bg-trulia-primary" : ""}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold mb-4">About Office Spaces on Trulia</h2>
        <p className="text-trulia-dark-gray mb-6">
          Whether you're looking for a private office, co-working space, or an entire floor, Trulia offers a wide range of office spaces for rent.
          Our listings include details like desk capacity, meeting rooms, internet speed, and available hours to help you find the perfect
          space for your business needs.
        </p>
        <Link href="/" className="text-trulia-primary hover:underline font-medium">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
