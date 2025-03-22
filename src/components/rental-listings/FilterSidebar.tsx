"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  filters: {
    minPrice: number;
    maxPrice: number;
    minBeds: number;
    minBaths: number;
    petFriendly: boolean;
  };
  setFilters: (filters: {
    minPrice: number;
    maxPrice: number;
    minBeds: number;
    minBaths: number;
    petFriendly: boolean;
  }) => void;
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([filters.minPrice, filters.maxPrice]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    price: true,
    beds: true,
    baths: true,
    pets: true,
  });

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const applyPriceFilter = () => {
    setFilters({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleBedChange = (value: number) => {
    setFilters({
      ...filters,
      minBeds: value,
    });
  };

  const handleBathChange = (value: number) => {
    setFilters({
      ...filters,
      minBaths: value,
    });
  };

  const togglePetFriendly = () => {
    setFilters({
      ...filters,
      petFriendly: !filters.petFriendly,
    });
  };

  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 5000,
      minBeds: 0,
      minBaths: 0,
      petFriendly: false,
    });
    setPriceRange([0, 5000]);
  };

  const toggleSection = (section: string) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section],
    });
  };

  return (
    <aside className="w-80 flex-shrink-0 hidden md:block">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-trulia-primary text-sm font-medium"
          >
            Reset All
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("price")}
            >
              <h3 className="font-medium">Price</h3>
              <span>{expanded.price ? "−" : "+"}</span>
            </div>

            {expanded.price && (
              <div className="mt-3 space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center border rounded-md px-3 py-1">
                    <span className="text-sm text-gray-500">$</span>
                    <span className="ml-1">{priceRange[0]}</span>
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="flex items-center border rounded-md px-3 py-1">
                    <span className="text-sm text-gray-500">$</span>
                    <span className="ml-1">{priceRange[1]}</span>
                  </div>
                </div>

                <div className="px-1">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    min={0}
                    max={10000}
                    step={100}
                    onValueChange={handlePriceChange}
                    onValueCommit={applyPriceFilter}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bedrooms Section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("beds")}
            >
              <h3 className="font-medium">Bedrooms</h3>
              <span>{expanded.beds ? "−" : "+"}</span>
            </div>

            {expanded.beds && (
              <div className="mt-3">
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <Badge
                      key={num}
                      className={`rounded-full px-3 py-1 cursor-pointer ${
                        filters.minBeds === num
                          ? "bg-trulia-primary text-white"
                          : "bg-white text-trulia-dark-gray border border-gray-300"
                      }`}
                      onClick={() => handleBedChange(num)}
                    >
                      {num === 0 ? "Any" : num === 4 ? "4+" : num}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bathrooms Section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("baths")}
            >
              <h3 className="font-medium">Bathrooms</h3>
              <span>{expanded.baths ? "−" : "+"}</span>
            </div>

            {expanded.baths && (
              <div className="mt-3">
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <Badge
                      key={num}
                      className={`rounded-full px-3 py-1 cursor-pointer ${
                        filters.minBaths === num
                          ? "bg-trulia-primary text-white"
                          : "bg-white text-trulia-dark-gray border border-gray-300"
                      }`}
                      onClick={() => handleBathChange(num)}
                    >
                      {num === 0 ? "Any" : num === 4 ? "4+" : num}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pet Friendly Section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("pets")}
            >
              <h3 className="font-medium">Pet Policy</h3>
              <span>{expanded.pets ? "−" : "+"}</span>
            </div>

            {expanded.pets && (
              <div className="mt-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="petFriendly"
                    checked={filters.petFriendly}
                    onCheckedChange={togglePetFriendly}
                  />
                  <Label htmlFor="petFriendly">Pet Friendly</Label>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
