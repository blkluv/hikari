'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card-header';
import { useRouter, usePathname } from 'next/navigation';
import { Moon } from 'lucide-react';

type BillingInterval = 'month' | 'year';

interface Product {
  id: string;
  name: string;
  description: string;
  prices: {
    interval: BillingInterval;
    amount: number; // in cents
    stripeUrl: string;
  }[];
  perks: string[];
}

interface Props {
  user?: any;
  subscription?: any;
}

const products: Product[] = [
  {
    id: 'prod_Tribe',
    name: 'Tribe Tier',
    description: 'Perfect for those starting their journey in the purpose economy.',
    prices: [
      { interval: 'month', amount: 4400, stripeUrl: 'https://buy.stripe.com/28E5kDd57aP4gFhbDr5wI0Z' },
      { interval: 'year', amount: 44000, stripeUrl: 'https://buy.stripe.com/00w7sL7KN8GW60D5f35wI10' }
    ],
    perks: [
      '🎥 Daily Huddles (15-min livestream pep talks)',
      '📚 Access to weekly livestream classes + replays',
      '💬 Access to a private Tribe Telegram group',
      '💰 Earn tribe memecoins for showing up & participating',
      '🏆 Unlock tokenized rewards for engagement'
    ]
  },
  {
    id: 'prod_Manifestor',
    name: 'Manifestor Tier',
    description: 'Best for those ready to level up spiritually & financially with group support.',
    prices: [
      { interval: 'month', amount: 14400, stripeUrl: 'https://buy.stripe.com/bJe7sL5CF0aq0Gj22R5wI11' },
      { interval: 'year', amount: 144000, stripeUrl: 'https://buy.stripe.com/8x2aEX9SVbT81KndLz5wI12' }
    ],
    perks: [
      '✅ Everything in Tribe Tier',
      '🧘 2x Weekly Group Spiritual Coaching Sessions (live Q&A + feedback)',
      '💹 Boosted tribe memecoin rewards (higher earning multipliers)',
      '📂 Access to resource vault (guides, meditations, crypto insights)',
      '🎁 Monthly NFT/Token drops as proof of participation',
      '💬 Access to a private Manifestor Telegram group'
    ]
  },
  {
    id: 'prod_Ascension',
    name: 'Ascension Tier',
    description: 'For serious seekers, creators, and leaders who want direct access.',
    prices: [
      { interval: 'month', amount: 44400, stripeUrl: 'https://buy.stripe.com/9B6bJ18ORg9o2Or4aZ5wI0X' },
      { interval: 'year', amount: 444000, stripeUrl: 'https://buy.stripe.com/5kQ7sLd577CSbkX22R5wI0Y' }
    ],
    perks: [
      '✅ Everything in Manifestor Tier',
      '🧘 1-on-1 Spiritual Coaching (monthly private session with Hahz)',
      '🎤 Priority spotlight coaching during livestreams',
      '🎁 Exclusive VIP Memecoin Airdrops + tokenized recognition',
      '🌐 Access to special IRL meetups / retreats (discounted or free)',
      '💬 Access to a private Ascension Telegram group'
    ]
  }
];

export default function PricingRounded({ user, subscription }: Props) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  const [loading, setLoading] = useState<string | null>(null);

  const handleStripeCheckout = (stripeUrl: string, productId: string) => {
    setLoading(productId);
    window.location.href = stripeUrl;
  };

  return (
    <section className="container mx-auto" id="pricing">
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
        <h1 className="text-3xl font-bold text-center">SUBS</h1>
        <p className="mt-2 text-center text-muted-foreground">
          Choose a subscription tier that aligns with your spiritual journey.
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
            const price = product.prices.find(p => p.interval === billingInterval);
            if (!price) return null;

            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0
            }).format(price.amount / 100);

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
                    onClick={() => handleStripeCheckout(price.stripeUrl, product.id)}
                    disabled={loading === product.id}
                    className="w-full mt-4 rounded-4xl"
                  >
                    {loading === product.id ? 'Redirecting...' : 'Subscribe'}
                  </Button>
                  <ul className="mt-4 space-y-2">
                    {product.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="text-blue-500">{perk.split(' ')[0]}</span>
                        <span>{perk.replace(perk.split(' ')[0], '')}</span>
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
