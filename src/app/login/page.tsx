'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState('login');
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      setTab('confirmation');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during signup');
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
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
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
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    {isLoading ? 'Logging in...' : 'Log In'}
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <Link href="/auth/reset-password" className="text-trulia-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
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
                <div>
                  <Input
                    type="password"
                    placeholder="Password (minimum 6 characters)"
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
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500">
                  By signing up, you agree to Trulia&apos;s Terms of Use and Privacy Policy.
                </div>
              </form>
            </TabsContent>

            <TabsContent value="confirmation">
              <div className="space-y-4 text-center">
                <h3 className="text-xl font-semibold">Check your email</h3>
                <p className="text-gray-600">
                  We&apos;ve sent a confirmation link to {email}. Please check your email and click the link to
                  complete your registration.
                </p>
                <Button
                  onClick={() => setTab('login')}
                  variant="outline"
                  className="mt-4"
                >
                  Return to Login
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
