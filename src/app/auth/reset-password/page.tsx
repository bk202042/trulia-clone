'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const supabase = createBrowserSupabaseClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during password reset');
    } finally {
      setIsLoading(false);
    }
  };

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
          <h2 className="mb-6 text-2xl font-semibold text-center">Reset Password</h2>

          {!isSubmitted ? (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </div>

              <div className="text-center text-sm">
                <Link href="/login" className="text-trulia-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-semibold">Check your email</h3>
              <p className="text-gray-600">
                We&apos;ve sent password reset instructions to {email}. Please check your email
                to continue.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mt-4"
              >
                Try another email
              </Button>
              <div className="text-center text-sm pt-2">
                <Link href="/login" className="text-trulia-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
