"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface HelpCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel: string;
  actionLink: string;
}

const HelpCard = ({ title, description, icon, actionLabel, actionLink }: HelpCardProps) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex items-center pb-4">
        <div className="w-14 h-14 flex items-center justify-center mb-2">
          {icon}
        </div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center px-6">
        <CardDescription className="text-trulia-dark-gray">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pt-2 pb-6">
        <Button
          asChild
          variant="outline"
          className="border-trulia-primary text-trulia-primary hover:bg-trulia-primary/5"
        >
          <Link href={actionLink}>{actionLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function HowTruliaHelps() {
  return (
    <section className="py-16 bg-white">
      <div className="container-narrow">
        <h2 className="text-2xl sm:text-3xl text-center font-semibold text-trulia-black mb-12">
          See how Trulia can help
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HelpCard
            title="Rent a home"
            description="With 35+ filters and custom keyword search, Trulia can help you easily find a home or apartment for rent that you'll love."
            icon={
              <svg className="w-10 h-10" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33 13.5L18 4.5L3 13.5V31.5H33V13.5Z" fill="#FFF0E6" stroke="#E3826C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.5 31.5V18H22.5V31.5" fill="#FFF0E6" stroke="#E3826C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            actionLabel="Find a rental"
            actionLink="/apartments-for-rent-near-me"
          />

          <HelpCard
            title="Buy a home"
            description="With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home."
            icon={
              <svg className="w-10 h-10" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33 13.5L18 4.5L3 13.5V31.5H33V13.5Z" fill="#E8FAFF" stroke="#52B7BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.5 31.5V18H22.5V31.5" fill="#E8FAFF" stroke="#52B7BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="27" cy="9" r="6" fill="#E8FAFF" stroke="#52B7BD" strokeWidth="2" />
                <path d="M27 7V11M25 9H29" stroke="#52B7BD" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
            actionLabel="Find a home"
            actionLink="/houses-for-sale-near-me"
          />

          <HelpCard
            title="See neighborhoods"
            description="With more neighborhood insights than any other real estate website, we've captured the color and diversity of communities."
            icon={
              <svg className="w-10 h-10" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 31.5H31.5" stroke="#62269E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 31.5V13.5L13.5 4.5V31.5" fill="#F9F0FF" stroke="#62269E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M31.5 31.5V18L22.5 13.5V31.5" fill="#F9F0FF" stroke="#62269E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.5 13.5H18V18H13.5V13.5Z" fill="#F9F0FF" stroke="#62269E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.5 22.5H18V27H13.5V22.5Z" fill="#F9F0FF" stroke="#62269E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            actionLabel="Learn more"
            actionLink="/neighborhoods"
          />
        </div>
      </div>
    </section>
  );
}
