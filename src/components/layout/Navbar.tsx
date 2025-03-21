"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Menu, X, User, Search, Heart, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session?.user);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <header className="border-b border-gray-200 bg-white py-3">
      <nav className="container-wide flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/trulia-logo.svg"
              alt="Trulia"
              width={120}
              height={36}
              className="h-9 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/buy" className="text-trulia-black hover:text-trulia-primary font-medium">
              Buy
            </Link>
            <Link href="/rent" className="text-trulia-primary font-medium">
              Rent
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/saved-homes">
                <Button variant="ghost" className="text-black hover:text-white hover:bg-trulia-primary">
                  Saved Homes
                </Button>
              </Link>
              <Link href="/saved-searches">
                <Button variant="ghost" className="text-black hover:text-white hover:bg-trulia-primary">
                  Saved Searches
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-200 text-black hover:text-white hover:bg-trulia-primary">
                    <User className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <Link href="/admin">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/saved-searches">
                    <DropdownMenuItem className="cursor-pointer">
                      <Search className="h-4 w-4 mr-2" />
                      Saved Searches
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/saved-homes">
                    <DropdownMenuItem className="cursor-pointer">
                      <Heart className="h-4 w-4 mr-2" />
                      Saved Homes
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 hover:text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-black hover:text-white hover:bg-trulia-primary" disabled>
                Saved Homes
              </Button>
              <Button variant="ghost" className="text-black hover:text-white hover:bg-trulia-primary" disabled>
                Saved Searches
              </Button>
              <Link href="/login">
                <Button variant="outline" className="border-gray-200 text-black hover:text-white hover:bg-trulia-primary">
                  Sign up or Log in
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center pb-4 border-b">
                  <Image
                    src="/images/trulia-logo.svg"
                    alt="Trulia"
                    width={120}
                    height={36}
                    className="h-9 w-auto"
                  />
                  <Button variant="ghost" onClick={() => setMobileMenuOpen(false)} className="p-2" aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex flex-col py-6 space-y-4">
                  <Link href="/buy" className="text-lg px-2 py-2 hover:bg-trulia-primary hover:text-white rounded-md">
                    Buy
                  </Link>
                  <Link href="/rent" className="text-lg px-2 py-2 hover:bg-trulia-primary hover:text-white rounded-md">
                    Rent
                  </Link>
                  <div className="border-t my-2"></div>
                  <Link href="/saved-homes" className="text-lg px-2 py-2 hover:bg-trulia-primary hover:text-white rounded-md">
                    Saved Homes
                  </Link>
                  <Link href="/saved-searches" className="text-lg px-2 py-2 hover:bg-trulia-primary hover:text-white rounded-md">
                    Saved Searches
                  </Link>
                </div>
                <div className="mt-auto pt-4 border-t">
                  {isLoggedIn ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Link href="/admin" className="w-full block">
                          <Button variant="outline" className="w-full justify-start hover:bg-trulia-primary hover:text-white">
                            <User className="h-4 w-4 mr-2" />
                            Profile
                          </Button>
                        </Link>
                        <Link href="/saved-searches" className="w-full block">
                          <Button variant="outline" className="w-full justify-start hover:bg-trulia-primary hover:text-white">
                            <Search className="h-4 w-4 mr-2" />
                            Saved Searches
                          </Button>
                        </Link>
                        <Link href="/saved-homes" className="w-full block">
                          <Button variant="outline" className="w-full justify-start hover:bg-trulia-primary hover:text-white">
                            <Heart className="h-4 w-4 mr-2" />
                            Saved Homes
                          </Button>
                        </Link>
                        <Button
                          onClick={handleSignOut}
                          variant="outline"
                          className="w-full justify-start text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Log Out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Link href="/login" className="w-full">
                      <Button className="w-full bg-trulia-primary hover:bg-trulia-primary/90">
                        Sign up or Log in
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
