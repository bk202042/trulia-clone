'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [initialSession, setInitialSession] = useState(false);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      } else {
        setInitialSession(true);
      }
    };

    checkSession();
  }, [router, supabase.auth]);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      setIsComplete(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while updating password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!initialSession) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Image
              src="/images/trulia-logo.svg"
              alt="Trulia"
              width={150}
              height={45}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold text-center">Update Password</h2>

          {!isComplete ? (
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="New password (minimum 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full"
                />
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-trulia-primary hover:bg-trulia-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-semibold">Password Updated</h3>
              <p className="text-gray-600">
                Your password has been successfully updated.
              </p>
              <Button
                onClick={() => router.push('/')}
                className="mt-4 bg-trulia-primary hover:bg-trulia-primary/90"
              >
                Go to Homepage
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
