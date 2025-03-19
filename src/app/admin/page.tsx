'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProfileEditForm from '@/components/admin/ProfileEditForm';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);

      if (!user) {
        router.push('/login');
      }
    };

    getUser();
  }, [router, supabase.auth]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login in useEffect
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64">
          <AdminSidebar user={user} />
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            <ProfileEditForm user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
