"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PropertyCard, { PropertyProps } from "@/components/rental-listings/PropertyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
    isFurnished: true
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
    canApplyInstantly: true
  },
  {
    id: "prop-3",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 4200,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1158,
    address: "500 W Middlefield Rd #89",
    city: "Mountain View",
    state: "CA",
    zip: "94043",
    isNew: true,
    isFurnished: true,
    canApplyInstantly: true
  },
  {
    id: "prop-4",
    imageUrl: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 2500,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 668,
    address: "505 Cypress Point Dr #124",
    city: "Mountain View",
    state: "CA",
    zip: "94043",
    isNew: true,
    isPetFriendly: true,
    canApplyInstantly: true
  }
];

export default function FeaturedProperties() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-wide">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-trulia-black">Newly listed rentals in Mountain View</h2>
          <Link href="/rentals/mountain-view-ca" className="hidden sm:block text-trulia-primary hover:underline font-medium">
            See more homes
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/rentals/mountain-view-ca"
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
