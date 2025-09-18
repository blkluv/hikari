'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  signInWithPassword
} from '@/utils/auth-helpers/server';
import { signInWithOAuth, handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Github, Chrome, Wallet } from 'lucide-react';
import { supabase } from '@/utils/supabase-client';

export default function SignIn() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signInWithPassword, router);
    setIsSubmitting(false);
  };

  const oAuthProviders = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <Github className="w-4 h-4 mr-2" />
    },
    {
      name: 'google',
      displayName: 'Google',
      icon: <Chrome className="w-4 h-4 mr-2" />
    }
  ];

  const handleOAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  // ---- Web3 Handlers ----
  const signInWithEthereum = async () => {
    try {
      setIsSubmitting(true);
      const { data, error } = await supabase.auth.signInWithWeb3({
        chain: 'ethereum',
        statement: 'I accept the Terms of Service at https://example.com/tos',
      });
      if (error) console.error(error);
      if (data.session) router.push('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWithSolana = async () => {
    try {
      if (!window.solana) {
        alert('No Solana wallet detected');
        return;
      }
      await window.solana.connect();
      setIsSubmitting(true);
      const { data, error } = await supabase.auth.signInWithWeb3({
        chain: 'solana',
        statement: 'I accept the Terms of Service at https://example.com/tos',
        wallet: window.solana
      });
      if (error) console.error(error);
      if (data.session) router.push('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="p-2 transition-colors rounded-md hover:bg-muted"
          prefetch={false}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="sr-only">Back</span>
        </Link>
        <div />
      </div>
      <div className="flex items-center justify-center flex-1">
        <Card className="w-full max-w-md">
          <CardContent className="grid gap-4 px-4 pb-4 my-10">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="my-2 text-muted-foreground">
                Enter your email below to sign in to your account
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
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
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
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Sign in
              </Button>
            </form>

            <div className="flex justify-center">
              <Link
                href="/signup"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="flex justify-center">
              <Link
                href="/forgot_password"
                className="text-sm font-bold hover:underline underline-offset-4"
                prefetch={false}
              >
                Forgot your password?
              </Link>
            </div>

            <Separator className="my-6" />

            {/* OAuth Providers */}
            <div className="grid gap-2">
              {oAuthProviders.map((provider) => (
                <form
                  key={provider.name}
                  className="pb-2"
                  onSubmit={(e) => handleOAuthSubmit(e)}
                >
                  <input type="hidden" name="provider" value={provider.name} />
                  <Button
                    variant="outline"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {provider.icon}
                    Sign in with {provider.displayName}
                  </Button>
                </form>
              ))}
            </div>

            {/* Web3 Buttons */}
            <div className="grid gap-2 mt-4">
              <Button
                variant="outline"
                onClick={signInWithEthereum}
                className="w-full"
                disabled={isSubmitting}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Sign in with Ethereum
              </Button>
              <Button
                variant="outline"
                onClick={signInWithSolana}
                className="w-full"
                disabled={isSubmitting}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Sign in with Solana
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
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
