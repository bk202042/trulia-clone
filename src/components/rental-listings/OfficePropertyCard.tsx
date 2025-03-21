"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DbOfficeListing } from "@/types/database.types";

export interface OfficePropertyProps {
  id: string;
  imageUrl: string;
  price: number;
  squareFeet: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  officeType: string;
  deskCapacity?: number;
  meetingRooms?: number;
  hasReception?: boolean;
  internetSpeed?: string;
  availableHours?: string;
  amenities?: string[];
  isNew?: boolean;
}

export default function OfficePropertyCard({
  id,
  imageUrl,
  price,
  squareFeet,
  address,
  city,
  state,
  zip,
  officeType,
  deskCapacity,
  meetingRooms,
  hasReception,
  internetSpeed,
  availableHours,
  amenities = [],
  isNew = false
}: OfficePropertyProps) {
  // Format price with commas
  const formattedPrice = price.toLocaleString();

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/office-spaces/${id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={`Office space at ${address}, ${city}, ${state} ${zip}`}
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
            <Badge className="bg-trulia-green text-white">OFFICE</Badge>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-medium text-trulia-black">${formattedPrice}/mo</h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-trulia-dark-gray mb-2">
          <span>{squareFeet.toLocaleString()} sqft</span>
          {officeType && (
            <>
              <span className="h-1 w-1 rounded-full bg-trulia-light-gray"></span>
              <span>{officeType}</span>
            </>
          )}
        </div>

        <address className="text-trulia-dark-gray text-sm not-italic mb-2">
          {address}, {city}, {state} {zip}
        </address>

        {/* Office specific details */}
        <div className="mt-2 space-y-1 text-sm text-trulia-dark-gray">
          {deskCapacity && (
            <div className="flex items-center">
              <span className="font-medium">Capacity:</span>
              <span className="ml-1">{deskCapacity} desks</span>
            </div>
          )}

          {meetingRooms && (
            <div className="flex items-center">
              <span className="font-medium">Meeting rooms:</span>
              <span className="ml-1">{meetingRooms}</span>
            </div>
          )}

          {internetSpeed && (
            <div className="flex items-center">
              <span className="font-medium">Internet:</span>
              <span className="ml-1">{internetSpeed}</span>
            </div>
          )}

          {availableHours && (
            <div className="flex items-center">
              <span className="font-medium">Hours:</span>
              <span className="ml-1">{availableHours}</span>
            </div>
          )}
        </div>

        {/* Feature tags */}
        {amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {hasReception && (
              <Badge variant="outline" className="border-trulia-light-gray text-trulia-dark-gray">
                RECEPTION
              </Badge>
            )}
            {amenities.slice(0, 2).map((amenity, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-trulia-light-gray text-trulia-dark-gray"
              >
                {amenity.toUpperCase()}
              </Badge>
            ))}
            {amenities.length > 2 && (
              <Badge variant="outline" className="border-trulia-light-gray text-trulia-dark-gray">
                +{amenities.length - 2} MORE
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to convert DbOfficeListing to OfficePropertyProps
export function mapDbOfficeListingToProps(
  listing: DbOfficeListing,
  placeholderImage: string = "/images/office-placeholder.jpg"
): OfficePropertyProps {
  return {
    id: listing.id,
    imageUrl: placeholderImage,
    price: Number(listing.monthly_rent),
    squareFeet: Number(listing.square_feet),
    address: listing.street_address,
    city: listing.city,
    state: listing.state,
    zip: listing.zip_code,
    officeType: listing.office_type,
    deskCapacity: listing.desk_capacity,
    meetingRooms: listing.meeting_rooms,
    hasReception: listing.has_reception,
    internetSpeed: listing.internet_speed,
    availableHours: listing.available_hours,
    amenities: [],
    isNew: new Date(listing.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // New if within last 7 days
  };
}
