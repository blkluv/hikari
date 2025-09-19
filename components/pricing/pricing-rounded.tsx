'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card-header';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { Moon } from 'lucide-react';

type BillingInterval = 'lifetime' | 'year' | 'month';

// Update the Price interface to match what checkoutWithStripe expects
interface Price {
  id: string;
  active: boolean;
  currency: string;
  description: string | null;
  interval: 'month' | 'year' | 'day' | 'week' | null;
  interval_count: number | null;
  metadata: any; // Json type from Supabase
  product_id: string | null;
  trial_period_days: number | null;
  type: 'one_time' | 'recurring' | null;
  unit_amount: number | null;
}

interface Product {
  id: string;
  name: string;
  description: string;
  prices: Price[];
}

interface Props {
  user: User | null | undefined;
  subscription: any; // can refine later if needed
}

// Hard-coded Stripe products + prices with the correct structure
const products: Product[] = [
  {
    id: 'prod_T4r49Ay2aJopUV',
    name: 'Starter',
    description: 'For individuals starting out',
    prices: [
      {
        id: 'price_1S8hMVEC5zyE604bRsfskiG2',
        active: true,
        interval: 'month',
        unit_amount: 4400,
        currency: 'usd',
        description: 'Monthly Starter plan',
        interval_count: 1,
        metadata: {},
        product_id: 'prod_T4r49Ay2aJopUV',
        trial_period_days: null,
        type: 'recurring'
      },
      {
        id: 'price_1S8hN4EC5zyE604bH4f5cLDy',
        active: true,
        interval: 'year',
        unit_amount: 44000,
        currency: 'usd',
        description: 'Yearly Starter plan',
        interval_count: 1,
        metadata: {},
        product_id: 'prod_T4r49Ay2aJopUV',
        trial_period_days: null,
        type: 'recurring'
      }
    ]
  },
  {
    id: 'prod_T4r9ZgRmGrjArM',
    name: 'Pro',
    description: 'For growing teams',
    prices: [
      {
        id: 'price_1S8hRgEC5zyE604bKgn6mu3Q',
        active: true,
        interval: 'month',
        unit_amount: 14400,
        currency: 'usd',
        description: 'Monthly Pro plan',
        interval_count: 1,
        metadata: {},
        product_id: 'prod_T4r9ZgRmGrjArM',
        trial_period_days: null,
        type: 'recurring'
      },
      {
        id: 'price_1S8hRgEC5zyE604bjs8GRHZe',
        active: true,
        interval: 'year',
        unit_amount: 144000,
        currency: 'usd',
        description: 'Yearly Pro plan',
        interval_count: 1,
        metadata: {},
        product_id: 'prod_T4r9ZgRmGrjArM',
        trial_period_days: null,
        type: 'recurring'
      }
    ]
  },
  {
    id: 'prod_T4rBelLltR2W2f',
    name: 'Enterprise',
    description: 'For businesses at scale',
    prices: [
      {
        id: 'price_1S8hTbEC5zyE604b5uBWnTjd',
        active: true,
        interval: 'month',
        unit_amount: 44400,
        currency: 'usd',
        description: 'Monthly Enterprise plan',
        interval_count: 1,
        metadata: {},
        product_id: 'prod_T4rBelLltR2W2f',
        trial_period_days: null,
        type: 'recurring'
      },
      {
        id: 'price_1S8hcfEC5zyE604b0ASwjQub',
        active: true,
        interval: 'year',
        unit_amount: 444000,
        currency: 'usd',
        description: 'Yearly Enterprise plan',
        interval_count: 1,
        metadata: {},
        product_id: 'prod_T4rBelLltR2W2f',
        trial_period_days: null,
        type: 'recurring'
      }
    ]
  }
];

export default function PricingRounded({ user, subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleStripeCheckout = async (price: Price) => {
    try {
      setPriceIdLoading(price.id);

      if (!user) {
        router.push('/signup');
        return;
      }

      const { errorRedirect, sessionId } = await checkoutWithStripe(
        price,
        currentPath
      );

      if (errorRedirect) {
        router.push(errorRedirect);
        return;
      }

      if (!sessionId) {
        throw new Error('Stripe sessionId missing.');
      }

      const stripe = await getStripe();
      if (!stripe) throw new Error('Stripe failed to load.');

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
    } catch (err: any) {
      console.error('Checkout error:', err);
      router.push(
        getErrorRedirect(
          currentPath,
          'Checkout failed',
          err.message || 'Please try again later.'
        )
      );
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  return (
    <section className="container mx-auto" id="pricing">
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
        <h1 className="text-3xl font-bold text-center">
          Flat pricing, no management fees.
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Whether you're one person trying to get ahead or a big firm trying
          to take over the world, we've got a plan for you.
        </p>

        <div className="flex items-center justify-center mt-6 space-x-4">
          <Button
            className="rounded-4xl"
            variant={billingInterval === 'month' ? 'default' : 'outline'}
            onClick={() => setBillingInterval('month')}
          >
            Monthly
          </Button>
          <Button
            className="rounded-4xl"
            variant={billingInterval === 'year' ? 'default' : 'outline'}
            onClick={() => setBillingInterval('year')}
          >
            Yearly
          </Button>
        </div>

        <div className="grid gap-6 mt-10 md:grid-cols-3">
          {products.map((product) => {
            const price = product.prices.find(
              (p) => p.interval === billingInterval
            );
            if (!price) return null;

            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency,
              minimumFractionDigits: 0
            }).format((price.unit_amount || 0) / 100);

            const isActive = subscription
              ? product.name === subscription?.prices?.products?.name
              : false;

            const cardBgColor = isActive
              ? 'border-black bg-white text-black'
              : 'bg-white text-black';

            return (
              <Card
                key={product.id}
                className={`w-full max-w-sm rounded-4xl border-2 ${cardBgColor}`}
              >
                <CardHeader className="flex flex-col justify-center rounded-t-4xl">
                  <div className="flex items-center">
                    <Moon className="w-8 h-8 text-gray-600 fill-zinc-500" />
                    <CardTitle className="ml-2 text-2xl font-bold">
                      {product.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="py-8 text-4xl font-bold">{priceString}</div>
                  <p className="mt-2 text-muted-foreground">
                    {product.description}
                  </p>
                  <Button
                    variant="default"
                    type="button"
                    onClick={() => handleStripeCheckout(price)}
                    disabled={priceIdLoading === price.id}
                    className="w-full mt-4 rounded-4xl"
                  >
                    {subscription ? 'Manage' : 'Subscribe'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}