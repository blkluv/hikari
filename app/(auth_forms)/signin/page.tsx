'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Chrome, Wallet } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Ensure client-only helpers
import { handleRequestClient, signInWithOAuthClient } from '@/utils/auth-helpers/client';

// Define window types for Web3 wallets
declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
    phantom?: any;
    braveSolana?: any;
  }
}

export default function SignIn() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasEthereum, setHasEthereum] = useState(false);
  const [hasSolana, setHasSolana] = useState(false);
  const supabase = createClientComponentClient();

  // Check for Web3 wallets on component mount
  useEffect(() => {
    setHasEthereum(typeof window !== 'undefined' && !!window.ethereum);
    setHasSolana(typeof window !== 'undefined' && !!window.solana);
  }, []);

  // ---- Email + Password Login ----
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleRequestClient(e, router);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- OAuth Providers ----
  const oAuthProviders = [
    { name: 'github', displayName: 'GitHub', icon: <Github className="w-4 h-4 mr-2" /> },
    { name: 'google', displayName: 'Google', icon: <Chrome className="w-4 h-4 mr-2" /> },
  ];

  const handleOAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signInWithOAuthClient(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- Web3 Sign In ----
  const signInWithEthereum = async () => {
    if (!hasEthereum) {
      alert('No Ethereum wallet detected. Please install MetaMask or another Ethereum wallet.');
      return;
    }
    try {
      setIsSubmitting(true);
      const { data, error } = await supabase.auth.signInWithWeb3({
        chain: 'ethereum',
        statement: 'I accept the Terms of Service at https://example.com/tos',
      });
      if (error) throw error;
      if (data.session) router.push('/');
    } catch (err: any) {
      console.error('Ethereum sign-in error:', err);
      alert(err.message || 'Failed to sign in with Ethereum');
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWithSolana = async () => {
    if (!hasSolana) {
      alert('No Solana wallet detected. Please install Phantom or another Solana wallet.');
      return;
    }
    try {
      setIsSubmitting(true);
      
      // Connect to Solana wallet first
      if (window.solana && !window.solana.isConnected) {
        await window.solana.connect();
      }
      
      const { data, error } = await supabase.auth.signInWithWeb3({
        chain: 'solana',
        statement: 'I accept the Terms of Service at https://example.com/tos',
      });
      if (error) throw error;
      if (data.session) router.push('/');
    } catch (err: any) {
      console.error('Solana sign-in error:', err);
      alert(err.message || 'Failed to sign in with Solana');
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
                Enter your email or use a Web3 wallet to sign in.
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
                  required 
                  autoComplete="email"
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
                  autoComplete="current-password"
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

            {/* OAuth Providers */}
            <div className="grid gap-2">
              {oAuthProviders.map((provider) => (
                <form key={provider.name} className="pb-2" onSubmit={handleOAuthSubmit}>
                  <input type="hidden" name="provider" value={provider.name} />
                  <Button 
                    variant="outline" 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {provider.icon} Sign in with {provider.displayName}
                  </Button>
                </form>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Web3 Buttons */}
            <div className="grid gap-2">
              <Button 
                variant="outline" 
                onClick={signInWithEthereum} 
                className="w-full" 
                disabled={isSubmitting || !hasEthereum}
              >
                <Wallet className="w-4 h-4 mr-2" /> 
                {hasEthereum ? 'Sign in with Ethereum' : 'Install Ethereum Wallet'}
              </Button>
              <Button 
                variant="outline" 
                onClick={signInWithSolana} 
                className="w-full" 
                disabled={isSubmitting || !hasSolana}
              >
                <Wallet className="w-4 h-4 mr-2" /> 
                {hasSolana ? 'Sign in with Solana' : 'Install Solana Wallet'}
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