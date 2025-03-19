'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase';

interface ProfileEditFormProps {
  user: User;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const supabase = createBrowserSupabaseClient();
  const [fullName, setFullName] = useState(user.user_metadata?.full_name || '');
  const [phone, setPhone] = useState(user.user_metadata?.phone || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone
        }
      });

      if (error) {
        throw error;
      }

      setUpdateMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateMessage('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleUpdateProfile} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="flex justify-between items-center">
          <div className="text-gray-900">{user.email}</div>
          <Link href="/auth/update-email" className="text-trulia-primary text-sm hover:underline">
            Edit
          </Link>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="flex justify-between items-center">
          <div className="text-gray-900">******</div>
          <Link href="/auth/reset-password" className="text-trulia-primary text-sm hover:underline">
            Edit
          </Link>
        </div>
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full"
          placeholder="(555) 555-5555"
        />
      </div>

      {updateMessage && (
        <div className={`text-sm ${updateMessage.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
          {updateMessage}
        </div>
      )}

      <div className="pt-4">
        <Button
          type="submit"
          className="bg-trulia-primary hover:bg-trulia-primary/90"
          disabled={isUpdating}
        >
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
