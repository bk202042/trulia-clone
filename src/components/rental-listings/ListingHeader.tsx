"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ListingHeaderProps {
  city: string;
  state: string;
  count: number;
}

export default function ListingHeader({ city, state, count }: ListingHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center text-sm text-trulia-dark-gray mb-2">
        <Link href="/" className="hover:text-trulia-primary">Home</Link>
        <ChevronRight className="h-3 w-3 mx-1" />
        <Link href="/rent" className="hover:text-trulia-primary">Rent</Link>
        <ChevronRight className="h-3 w-3 mx-1" />
        <span>{city}, {state}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold text-trulia-black mb-2">
        Rental Homes in {city}, {state}
      </h1>
      <p className="text-trulia-dark-gray">
        {count} {count === 1 ? 'rental home' : 'rental homes'} available on Trulia
      </p>
    </div>
  );
}
