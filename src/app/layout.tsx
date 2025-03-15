import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "./ClientBody";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Rental Listings in Your Neighborhood | Trulia Clone",
  description: "Search rental listings for houses, apartments, townhomes and condominiums in your neighborhood. Research prices, neighborhood info and more on this Trulia clone.",
  icons: {
    icon: "/images/trulia-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
