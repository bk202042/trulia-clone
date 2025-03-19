'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage() {
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
    };

    checkUser();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Saved Homes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              View and manage your saved rental listings.
            </p>
            <Link href="/saved-homes">
              <Button variant="outline" className="w-full">View Saved Homes</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Access your saved search filters and preferences.
            </p>
            <Link href="/saved-searches">
              <Button variant="outline" className="w-full">View Saved Searches</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Update your profile information and preferences.
            </p>
            <Link href="/account">
              <Button variant="outline" className="w-full">Manage Account</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            You have no recent activity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
