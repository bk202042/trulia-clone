'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Heart, Calendar, MapPin, ArrowUpRight, Bed, Bath, Home, Car, PawPrint, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DbRentalListing } from '@/types/database.types';
import { useApi } from '@/lib/hooks/useApi';

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const [saved, setSaved] = useState(false);

  // In a real implementation, we would fetch from the specific property API
  // For this demo, we'll use our Atlanta mock data and filter for the property ID
  const { data: atlantaProperties, loading, error } = useApi<DbRentalListing[]>({
    url: '/api/rentals/atlanta'
  });

  // Find the specific property
  const property = atlantaProperties?.find(p => p.id === propertyId);

  const toggleSaved = () => {
    setSaved(!saved);
  };

  if (loading) {
    return (
      <div className="container-wide py-12">
        <div className="animate-pulse text-trulia-primary text-center">Loading property details...</div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container-wide py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || 'Property not found'}
        </div>
        <div className="mt-4">
          <Link href="/rent/atlanta">
            <Button variant="outline" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Atlanta Rentals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container-wide py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-trulia-dark-gray mb-4">
            <Link href="/" className="hover:text-trulia-primary">Home</Link>
            <ChevronLeft className="h-3 w-3 mx-1 rotate-180" />
            <Link href="/rent" className="hover:text-trulia-primary">Rent</Link>
            <ChevronLeft className="h-3 w-3 mx-1 rotate-180" />
            <Link href="/rent/atlanta" className="hover:text-trulia-primary">Atlanta, GA</Link>
            <ChevronLeft className="h-3 w-3 mx-1 rotate-180" />
            <span>{property.street_address}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-trulia-black mb-2">
                {property.street_address}
              </h1>
              <p className="text-trulia-dark-gray">
                {property.city}, {property.state} {property.zip_code}
                {property.neighborhood && ` • ${property.neighborhood}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className={`flex items-center ${saved ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                onClick={toggleSaved}
              >
                <Heart className={`h-4 w-4 mr-2 ${saved ? 'fill-red-600 text-red-600' : ''}`} />
                {saved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>

        {/* Property Images */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt={property.street_address}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Property Details and Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Section */}
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col">
                    <span className="text-trulia-dark-gray text-sm">Price</span>
                    <div className="flex items-center mt-1">
                      <span className="text-xl font-semibold text-trulia-black">${property.monthly_rent.toLocaleString()}</span>
                      <span className="text-trulia-dark-gray text-sm ml-1">/mo</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-trulia-dark-gray text-sm">Bedrooms</span>
                    <div className="flex items-center mt-1">
                      <Bed className="h-4 w-4 text-trulia-dark-gray mr-1" />
                      <span className="text-xl font-semibold text-trulia-black">{property.bedrooms}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-trulia-dark-gray text-sm">Bathrooms</span>
                    <div className="flex items-center mt-1">
                      <Bath className="h-4 w-4 text-trulia-dark-gray mr-1" />
                      <span className="text-xl font-semibold text-trulia-black">{property.bathrooms}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-trulia-dark-gray text-sm">Square Feet</span>
                    <div className="flex items-center mt-1">
                      <Home className="h-4 w-4 text-trulia-dark-gray mr-1" />
                      <span className="text-xl font-semibold text-trulia-black">{property.square_feet.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-trulia-dark-gray text-sm">Available</span>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 text-trulia-dark-gray mr-1" />
                      <span className="text-lg font-medium text-trulia-black">{formatDate(property.available_date)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-trulia-dark-gray text-sm">Type</span>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-medium text-trulia-black">{property.property_type}</span>
                    </div>
                  </div>

                  {property.parking && (
                    <div className="flex flex-col">
                      <span className="text-trulia-dark-gray text-sm">Parking</span>
                      <div className="flex items-center mt-1">
                        <Car className="h-4 w-4 text-trulia-dark-gray mr-1" />
                        <span className="text-lg font-medium text-trulia-black">
                          Yes {property.parking_fee > 0 && `(+$${property.parking_fee}/mo)`}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-trulia-dark-gray text-sm">Pets</span>
                    <div className="flex items-center mt-1">
                      <PawPrint className="h-4 w-4 text-trulia-dark-gray mr-1" />
                      <span className="text-lg font-medium text-trulia-black">
                        {property.pet_friendly ? 'Allowed' : 'Not allowed'}
                        {property.pet_friendly && property.pet_deposit > 0 && ` (Deposit: $${property.pet_deposit})`}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                {property.amenities && property.amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-trulia-dark-gray">No amenities listed for this property.</p>
                )}
              </CardContent>
            </Card>

            {/* Location & Transportation */}
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-gray-100 h-60 mb-4 flex items-center justify-center">
                  <p className="text-trulia-dark-gray">Map view not available in this demo</p>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-trulia-dark-gray mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-trulia-dark-gray">
                    {property.street_address}, {property.city}, {property.state} {property.zip_code}
                    {property.neighborhood && ` • ${property.neighborhood}`}
                  </p>
                </div>

                {property.nearby_transportation && property.nearby_transportation.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Transportation</h4>
                    <ul className="text-trulia-dark-gray">
                      {property.nearby_transportation.map((item, index) => (
                        <li key={index} className="mb-1 flex items-center">
                          <span className="w-2 h-2 bg-trulia-primary rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold">${property.monthly_rent.toLocaleString()}/mo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-trulia-dark-gray">Security Deposit</span>
                    <span className="font-medium">${property.security_deposit.toLocaleString()}</span>
                  </div>

                  {property.utilities_cost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-trulia-dark-gray">
                        Utilities
                        {property.utilities && property.utilities.length > 0 &&
                          ` (${property.utilities.join(', ')})`
                        }
                      </span>
                      <span className="font-medium">~${property.utilities_cost}/mo</span>
                    </div>
                  )}

                  {property.parking && property.parking_fee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-trulia-dark-gray">Parking</span>
                      <span className="font-medium">${property.parking_fee}/mo</span>
                    </div>
                  )}

                  {property.application_fee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-trulia-dark-gray">Application Fee</span>
                      <span className="font-medium">${property.application_fee}</span>
                    </div>
                  )}

                  {property.minimum_lease && (
                    <div className="flex justify-between">
                      <span className="text-trulia-dark-gray">Minimum Lease</span>
                      <span className="font-medium">{property.minimum_lease} months</span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Contact</h4>
                    {property.property_management && (
                      <p className="text-trulia-dark-gray mb-2">{property.property_management}</p>
                    )}

                    <div className="space-y-2">
                      {property.contact_phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-trulia-dark-gray mr-2" />
                          <span>{property.contact_phone}</span>
                        </div>
                      )}

                      {property.contact_email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-trulia-dark-gray mr-2" />
                          <span>{property.contact_email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button className="w-full bg-trulia-primary text-white">
                    Request a Tour
                  </Button>

                  <Button variant="outline" className="w-full">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
