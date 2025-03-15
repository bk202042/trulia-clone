"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
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

          {/* Tags */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
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
          <span>{bedrooms} bd</span>
          <span className="h-1 w-1 rounded-full bg-trulia-light-gray"></span>
          <span>{bathrooms} ba</span>
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
        {(isPetFriendly || isFurnished) && (
          <div className="mt-3 flex flex-wrap gap-1">
            {isPetFriendly && (
              <Badge variant="outline" className="border-trulia-light-gray text-trulia-dark-gray">
                PET FRIENDLY
              </Badge>
            )}
            {isFurnished && (
              <Badge variant="outline" className="border-trulia-light-gray text-trulia-dark-gray">
                FURNISHED
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
