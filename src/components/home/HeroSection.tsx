"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("rent");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Family in front of house"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container-narrow text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover a place<br />you&apos;ll love to live
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
          <Tabs defaultValue="rent" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 bg-gray-100 rounded-none">
              <TabsTrigger
                value="buy"
                className={`py-3 ${activeTab === "buy" ? "bg-white" : "text-gray-700"}`}
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value="rent"
                className={`py-3 ${activeTab === "rent" ? "bg-white" : "text-gray-700"}`}
              >
                Rent
              </TabsTrigger>
              <TabsTrigger
                value="sold"
                className={`py-3 ${activeTab === "sold" ? "bg-white" : "text-gray-700"}`}
              >
                Sold
              </TabsTrigger>
            </TabsList>

            <div className="p-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="City, Address, School, Agent, ZIP"
                  className="h-14 pl-4 pr-12 text-gray-900 text-lg rounded-md border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  className="absolute right-0 top-0 h-full aspect-square rounded-l-none bg-trulia-primary hover:bg-trulia-primary/90"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
