'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      setUser(user);
      setLoading(false);

      // In a real application, we would fetch saved searches from the database
      // For now, we'll just show a placeholder
      setSavedSearches([]);
    };

    checkUser();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p>Loading your saved searches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Saved Searches</h1>

      {savedSearches.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">You haven't saved any searches yet</h2>
          <p className="text-gray-600 mb-6">
            Save search filters to get notified when new properties match your criteria.
          </p>
          <Link href="/">
            <Button className="bg-trulia-primary hover:bg-trulia-primary/90">
              Start Searching
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Saved searches would be mapped here */}
        </div>
      )}
    </div>
  );
}
