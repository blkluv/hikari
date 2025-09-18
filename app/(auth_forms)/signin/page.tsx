'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Chrome, Linkedin } from 'lucide-react'; // Added Linkedin icon
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignIn() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClientComponentClient();

  // ---- Email + Password Login ----
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      router.push('/');
    } catch (err: any) {
      alert(err.message || 'Failed to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- OAuth Login ----
  const handleOAuthSignIn = async (provider: 'github' | 'google' | 'linkedin') => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      alert(err.message || 'Failed to sign in with OAuth');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="p-2 transition-colors rounded-md hover:bg-muted" prefetch={false}>
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="sr-only">Back</span>
        </Link>
      </div>

      <div className="flex items-center justify-center flex-1">
        <Card className="w-full max-w-md">
          <CardContent className="grid gap-4 px-4 pb-4 my-10">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="my-2 text-muted-foreground">
                Enter your email or use an OAuth provider to sign in.
              </p>
            </div>

            {/* Email + Password Login */}
            <form noValidate className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="flex justify-center">
              <Link href="/signup" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/forgot_password" className="text-sm font-bold hover:underline underline-offset-4" prefetch={false}>
                Forgot your password?
              </Link>
            </div>

            <Separator className="my-6" />

            {/* OAuth Buttons */}
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleOAuthSignIn('github')}
                disabled={isSubmitting}
              >
                <Github className="w-4 h-4 mr-2" /> Sign in with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isSubmitting}
              >
                <Chrome className="w-4 h-4 mr-2" /> Sign in with Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleOAuthSignIn('linkedin')}
                disabled={isSubmitting}
              >
                <Linkedin className="w-4 h-4 mr-2" /> Sign in with LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}