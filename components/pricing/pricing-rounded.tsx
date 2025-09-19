'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card-header';
import { useRouter } from 'next/navigation';
import { Moon } from 'lucide-react';

type BillingInterval = 'month' | 'year';

interface Product {
  id: string;
  name: string;
  description: string;
  prices: Record<BillingInterval, { amount: number; stripeUrl: string }>;
  perks: string[];
}

interface Props {
  user: any;
  subscription: any;
}

const products: Product[] = [
  {
    id: 'prod_Tribe',
    name: 'Tribe Tier',
    description: 'Perfect for those starting their journey in the purpose economy.',
    prices: {
      month: {
        amount: 44,
        stripeUrl: 'https://buy.stripe.com/28E5kDd57aP4gFhbDr5wI0Z'
      },
      year: {
        amount: 440,
        stripeUrl: 'https://buy.stripe.com/00w7sL7KN8GW60D5f35wI10'
      }
    },
    perks: [
      'Daily Huddles (15-min livestream pep talks)',
      'Access to weekly livestream classes + replays',
      'Private community chat + mastermind tribe',
      'Earn tribe memecoins for showing up & participating',
      'Unlock tokenized rewards for engagement'
    ]
  },
  {
    id: 'prod_Manifestor',
    name: 'Manifestor Tier',
    description: 'Best for those ready to level up spiritually & financially with group support.',
    prices: {
      month: {
        amount: 144,
        stripeUrl: 'https://buy.stripe.com/bJe7sL5CF0aq0Gj22R5wI11'
      },
      year: {
        amount: 1440,
        stripeUrl: 'https://buy.stripe.com/8x2aEX9SVbT81KndLz5wI12'
      }
    },
    perks: [
      'Everything in Tribe Tier',
      '2x Weekly Group Spiritual Coaching Sessions (live Q&A + feedback)',
      'Boosted tribe memecoin rewards (higher earning multipliers)',
      'Access to resource vault (guides, meditations, crypto insights)',
      'Monthly NFT/Token drops as proof of participation',
      'Network in the manifested mastermind of leaders & visionaries'
    ]
  },
  {
    id: 'prod_Ascension',
    name: 'Ascension Tier',
    description: 'For serious seekers, creators, and leaders who want direct access.',
    prices: {
      month: {
        amount: 444,
        stripeUrl: 'https://buy.stripe.com/9B6bJ18ORg9o2Or4aZ5wI0X'
      },
      year: {
        amount: 4440,
        stripeUrl: 'https://buy.stripe.com/5kQ7sLd577CSbkX22R5wI0Y'
      }
    },
    perks: [
      'Everything in Manifestor Tier',
      '1-on-1 Spiritual Coaching (monthly private session with Hahz)',
      'Priority spotlight coaching during livestreams',
      'Exclusive VIP Memecoin Airdrops + tokenized recognition',
      'Access to special IRL meetups / retreats (discounted or free)',
      'Become part of the core inner circle co-creating the Web5 Purpose Economy'
    ]
  }
];

export default function PricingRounded({ user, subscription }: Props) {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  const [loadingId, setLoadingId] = useState<string>();
  const router = useRouter();

  const handleSubscribe = (url: string, id: string) => {
    setLoadingId(id);
    window.location.href = url;
  };

  return (
    <section className="container mx-auto" id="pricing">
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
        <h1 className="text-3xl font-bold text-center">Subscription Plans</h1>
        <p className="mt-2 text-center text-muted-foreground">
          Choose a tier that fits your journey in the purpose economy.
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
            const price = product.prices[billingInterval];
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2
            }).format(price.amount);

            return (
              <Card key={product.id} className="w-full max-w-sm text-black bg-white border-2 rounded-4xl">
                <CardHeader className="flex flex-col justify-center rounded-t-4xl">
                  <div className="flex items-center">
                    <Moon className="w-8 h-8 text-gray-600 fill-zinc-500" />
                    <CardTitle className="ml-2 text-2xl font-bold">{product.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="py-8 text-4xl font-bold">{priceString}</div>
                  <p className="mt-2 text-muted-foreground">{product.description}</p>
                  <Button
                    variant="default"
                    type="button"
                    onClick={() => handleSubscribe(price.stripeUrl, product.id)}
                    disabled={loadingId === product.id}
                    className="w-full mt-4 rounded-4xl"
                  >
                    Subscribe
                  </Button>
                  <ul className="mt-4 space-y-2">
                    {product.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckIcon className="text-blue-500" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
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
