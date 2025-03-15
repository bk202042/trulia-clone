"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Share2 } from "lucide-react";

const FooterCategory = ({
  title,
  links,
  initiallyExpanded = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  initiallyExpanded?: boolean;
}) => {
  return (
    <div className="py-4 sm:py-0">
      <h3 className="text-sm font-semibold text-trulia-black mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="text-sm text-trulia-dark-gray hover:text-trulia-primary hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FooterCategory
            title="Popular Rental Searches"
            links={[
              { label: "Apartment for Rent", href: "/apartment-for-rent" },
              { label: "Houses for Rent Near Me", href: "/houses-for-rent-near-me" },
              { label: "Cheap Apartments for Rent Near Me", href: "/cheap-apartments-for-rent-near-me" },
              { label: "Pet Friendly Apartments Near Me", href: "/pet-friendly-apartments-for-rent-near-me" },
              { label: "Townhomes for Rent Near Me", href: "/townhomes-for-rent-near-me" }
            ]}
            initiallyExpanded
          />

          <FooterCategory
            title="Rental Markets"
            links={[
              { label: "California Rentals", href: "/for_rent/CA" },
              { label: "Florida Rentals", href: "/for_rent/FL" },
              { label: "Texas Rentals", href: "/for_rent/TX" },
              { label: "New York Rentals", href: "/for_rent/NY" },
              { label: "Arizona Rentals", href: "/for_rent/AZ" }
            ]}
          />

          <FooterCategory
            title="Explore Trulia"
            links={[
              { label: "Facebook", href: "https://www.facebook.com/trulia" },
              { label: "Twitter", href: "https://www.twitter.com/trulia" },
              { label: "Instagram", href: "https://www.instagram.com/trulia/" },
              { label: "Pinterest", href: "https://www.pinterest.com/trulia/" },
              { label: "All Real Estate Markets", href: "/sitemaps/city-for-sale/" }
            ]}
          />

          <FooterCategory
            title="For Professionals"
            links={[
              { label: "Popular Counties", href: "/county-sitemap/" },
              { label: "Rental Communities", href: "/sitemaps/" },
              { label: "Real Estate Leads", href: "//www.zillow.com/premier-agent/contact-us-sales/" }
            ]}
          />
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-xs text-trulia-medium-gray mb-4">
            Trulia is a registered Trademark of Zillow, Inc. Zillow, Inc. holds real estate brokerage licenses in all 50 states and D.C. and Zillow (Canada) Inc. holds real estate brokerage licenses in multiple provinces.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-trulia-medium-gray">
            <Link href="/info/real-estate-licenses" className="hover:text-trulia-primary hover:underline">Licenses</Link>
            <Link href="https://s.zillow.net/pfs/static/SOP_NYS.pdf" className="hover:text-trulia-primary hover:underline">442-H New York Standard Operating Procedures</Link>
            <Link href="https://dos.ny.gov/system/files/documents/2021/08/fairhousingnotice.pdf" className="hover:text-trulia-primary hover:underline">New York Fair Housing Notice</Link>
            <Link href="#" className="hover:text-trulia-primary hover:underline">Consumer protection notice</Link>
            <Link href="#" className="hover:text-trulia-primary hover:underline">Contact Zillow, Inc Brokerage</Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-6 text-xs text-trulia-medium-gray mb-4">
            <span>Zillow Group Other Brands:</span>
            <Link href="https://www.zillow.com" className="hover:text-trulia-primary hover:underline">Zillow</Link>
            <Link href="https://www.streeteasy.com" className="hover:text-trulia-primary hover:underline">StreetEasy</Link>
            <Link href="https://www.hotpads.com" className="hover:text-trulia-primary hover:underline">HotPads</Link>
            <Link href="https://outeast.com" className="hover:text-trulia-primary hover:underline">Out East</Link>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-trulia-medium-gray">
            <Link href="https://www.zillowgroup.com/about-zillow-group/" className="hover:text-trulia-primary hover:underline">About Zillow Group</Link>
            <Link href="https://www.zillow.com/careers/" className="hover:text-trulia-primary hover:underline">Careers</Link>
            <Link href="https://investors.zillowgroup.com/" className="hover:text-trulia-primary hover:underline">Investor Relations</Link>
            <Link href="/terms/advertisers/" className="hover:text-trulia-primary hover:underline">Advertising Terms</Link>
            <Link href="https://www.zillowgroup.com/zg-privacy-policy/" className="hover:text-trulia-primary hover:underline">Privacy</Link>
            <Link href="https://www.zillowgroup.com/cookie-notice/" className="hover:text-trulia-primary hover:underline">Cookie Preference</Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 flex justify-between items-center">
          <div className="text-xs text-trulia-medium-gray">
            © 2025 Trulia, LLC. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link href="https://www.facebook.com/trulia" aria-label="Facebook" className="text-trulia-medium-gray hover:text-trulia-primary">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://www.twitter.com/trulia" aria-label="Twitter" className="text-trulia-medium-gray hover:text-trulia-primary">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://www.instagram.com/trulia/" aria-label="Instagram" className="text-trulia-medium-gray hover:text-trulia-primary">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://www.pinterest.com/trulia/" aria-label="Pinterest" className="text-trulia-medium-gray hover:text-trulia-primary">
              <Share2 className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
