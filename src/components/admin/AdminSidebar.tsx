'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { UserCircle, Search, Heart } from 'lucide-react';

interface AdminSidebarProps {
  user: User;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const userEmail = user.email;
  const userName = user.user_metadata?.full_name || userEmail?.split('@')[0] || 'Home Buyer';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="bg-gray-100 rounded-full p-4 mb-2">
          <UserCircle className="h-16 w-16 text-gray-500" />
        </div>
        <div className="mt-2">
          <h2 className="font-medium">{userName}</h2>
          <p className="text-sm text-gray-500">Home Buyer</p>
        </div>
      </div>

      <nav className="space-y-1">
        <Link
          href="/admin"
          className="flex items-center py-2 px-3 rounded-md bg-gray-100 text-trulia-primary"
        >
          <UserCircle className="mr-3 h-5 w-5" />
          <span>Edit Profile</span>
        </Link>

        <Link
          href="/saved-searches"
          className="flex items-center py-2 px-3 rounded-md hover:bg-trulia-primary hover:text-white"
        >
          <Search className="mr-3 h-5 w-5" />
          <span>Saved Searches</span>
        </Link>

        <Link
          href="/saved-homes"
          className="flex items-center py-2 px-3 rounded-md hover:bg-trulia-primary hover:text-white"
        >
          <Heart className="mr-3 h-5 w-5" />
          <span>Saved Homes</span>
        </Link>
      </nav>
    </div>
  );
}
