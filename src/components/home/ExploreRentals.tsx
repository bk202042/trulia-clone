"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface CityCard {
  id: string;
  name: string;
  state: string;
  imageUrl: string;
  slug: string;
}

const cities: CityCard[] = [
  {
    id: "atlanta",
    name: "Atlanta",
    state: "GA",
    imageUrl: "https://images.unsplash.com/photo-1575919539234-d1ec0d8bb709?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "atlanta-ga"
  },
  {
    id: "austin",
    name: "Austin",
    state: "TX",
    imageUrl: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "austin-tx"
  },
  {
    id: "scottsdale",
    name: "Scottsdale",
    state: "AZ",
    imageUrl: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "scottsdale-az"
  },
  {
    id: "boston",
    name: "Boston",
    state: "MA",
    imageUrl: "https://images.unsplash.com/photo-1501979376754-2ff867a4f360?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "boston-ma"
  },
  {
    id: "oakland",
    name: "Oakland",
    state: "CA",
    imageUrl: "https://images.unsplash.com/photo-1577641479872-55e52e0c2ab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "oakland-ca"
  },
  {
    id: "san-jose",
    name: "San Jose",
    state: "CA",
    imageUrl: "https://images.unsplash.com/photo-1538097304804-2a1b932466a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "san-jose-ca"
  },
  {
    id: "sandy-springs",
    name: "Sandy Springs",
    state: "GA",
    imageUrl: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "sandy-springs-ga"
  },
  {
    id: "carlsbad",
    name: "Carlsbad",
    state: "CA",
    imageUrl: "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    slug: "carlsbad-ca"
  }
];

interface TestimonialProps {
  quote: string;
  author: string;
  location: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "I just moved to the neighborhood 2 years ago and love it! It's a great mix of families, seniors and...",
    author: "Trulia User",
    location: "San Francisco Resident"
  },
  {
    quote: "A good mix of young adults/good night life as well as families and family friendly activities...",
    author: "Brianne",
    location: "Chicago Resident"
  },
  {
    quote: "We live living in the Oakwood community of Sun Lakes. There are so many activities...",
    author: "Trulia User",
    location: "Chandler Resident"
  },
  {
    quote: "Farmers markets, street fairs, and brewery tours are great to experience in this area.",
    author: "Trulia User",
    location: "San Diego Resident"
  }
];

const Testimonial = ({ quote, author, location }: TestimonialProps) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <div className="font-medium text-trulia-black mb-1">{author}</div>
    <div className="text-sm text-trulia-medium-gray mb-2">{location}</div>
    <p className="text-sm text-trulia-dark-gray">{quote}</p>
  </div>
);

export default function ExploreRentals() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wide">
        <h2 className="text-2xl sm:text-3xl text-center font-semibold text-trulia-black mb-4">
          Explore rentals on Trulia
        </h2>
        <p className="text-center text-trulia-dark-gray max-w-2xl mx-auto mb-12">
          Take a deep dive and browse homes or apartments for rent and local insights to find what is right for you.
        </p>

        <Carousel className="w-full">
          <CarouselContent>
            {cities.map((city, index) => (
              <CarouselItem key={city.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2">
                <Link href={`/for_rent/${city.slug}`} className="block h-full">
                  <Card className="overflow-hidden h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={city.imageUrl}
                        alt={`${city.name}, ${city.state}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <h3 className="text-xl font-semibold text-white">
                          {city.name}, {city.state}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-trulia-primary text-trulia-primary hover:bg-trulia-primary/5"
                      >
                        <span>View Homes</span>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </div>
        </Carousel>

        {/* Testimonials intermixed with cities - Mobile only */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:hidden">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              location={testimonial.location}
            />
          ))}
        </div>

        {/* Check out neighborhood search */}
        <div className="mt-16 bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">Check out a neighborhood</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for City, Neighborhood, ZIP, County, School"
              className="w-full h-12 pl-4 pr-12 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-trulia-primary focus:border-transparent"
            />
            <Button
              className="absolute right-0 top-0 h-full aspect-square rounded-l-none bg-trulia-primary hover:bg-trulia-primary/90"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Button>
          </div>
        </div>

        {/* Slogan */}
        <div className="mt-16 text-center">
          <p className="text-xl font-medium">
            discover
            <span className="inline-flex items-center mx-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
              </svg>
            </span>
            a place
            <span className="inline-flex items-center mx-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-200">
                <path d="M21 7L13 15L9 11L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 13V7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            you'll love
            <span className="inline-flex items-center mx-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" />
              </svg>
            </span>
            to live
          </p>
        </div>
      </div>
    </section>
  );
}
