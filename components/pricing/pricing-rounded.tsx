'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card-header';
import { useRouter } from 'next/navigation';

type BillingInterval = 'month' | 'year';

interface Plan {
  id: string;
  name: string;
  emoji: string;
  description: string;
  features: string[];
  monthlyPrice: number;
  yearlyPrice: number;
}

const pricingPlans: Plan[] = [
  {
    id: 'tribe-tier',
    emoji: '💟',
    name: 'Tribe Tier',
    description: 'Your intro to the Web5 family. ✨ Connect, learn, and earn with purpose.',
    features: [
      '📲 Mobile number for direct Web5 alerts',
      '👻 Phantom Wallet setup (Web5 🏦 onboarding)',
      '🆔 Follow from official Web5 TikTok channel',
      '💼 Tokenized purpose',
      '💬 Private Tribe mastermind chat',
      '🟠 Livestream Web5 show alerts',
      '💖 44 tokens in $FOOD • $WATAA • $RNT • $LOVE',
      '⚡️ 4 Bitcoin $RNT • L$VE • HAI$ rewards',
    ],
    monthlyPrice: 44,
    yearlyPrice: 440,
  },
  {
    id: 'manifestor-tier',
    emoji: '☮️',
    name: 'Manifestor Tier',
    description: 'For creators & coders shaping the Purpose Economy.',
    features: [
      '📲 Mobile number for direct updates',
      '👻 Phantom Wallet Account (Web5 🏦)',
      '🆔 Custom TikTok AR Effect ID (+💟 bonus)',
      '💼 Tokenized purpose',
      '🗺️ Purpose spotlight on the HAHZ.LIVE Map',
      '💬 Private Manifestor mastermind group',
      '🟠 Livestream show alerts via 📲',
      '🎙️ Branded TikTok AR effect for ReelViews',
      '💖 444 tokens in $FOOD • $WATAA • $RNT • $LOVE',
      '⚡️ 44 Bitcoin $RNT • L$VE • HAI$',
    ],
    monthlyPrice: 144,
    yearlyPrice: 1440,
  },
  {
    id: 'ascension-tier',
    emoji: '☯️',
    name: 'Ascension Tier',
    description: 'For visionaries ready to ascend Web5 with purpose.',
    features: [
      '📲 Mobile number for private updates',
      '🤖 5 AI content articles a month',
      '👻 Phantom Wallet Account (Web5 🏦)',
      '🆔 Tokenized Bitcoin Identity',
      '🪙 Custom stablecoin (CreatorCoin)',
      '🌴 Link to CreatorCoin in Web5D LinkTree',
      '💼 Tokenized purchase',
      '🗺️ Purpose spotlight on the HAHZ.LIVE Map',
      '💬 Private Ascension mastermind circle',
      '📺 WEB5DTV access',
      '🟠 Livestream show alerts via 📲',
      '🧙🏽 Ask HAHZ — Spiritual Healthcare sessions',
      '📚 LUMEE BOOTH AI Academy course grant',
      '💖 4,444 tokens in $FOOD • $WATAA • $RNT • $LOVE',
      '⚡️ 444 Bitcoin $RNT • L$VE • HAI$ • $CBO',
    ],
    monthlyPrice: 444,
    yearlyPrice: 4440,
  },
];

interface Props {
  user?: any;
  subscription?: any;
}

export default function PricingRounded({ user, subscription }: Props) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = (planId: string) => {
    setLoading(planId);
    // 🪙 Replace this with your actual checkout URLs or logic
    const stripeLinks: Record<string, string> = {
      'tribe-tier': 'https://buy.stripe.com/28E5kDd57aP4gFhbDr5wI0Z',
      'manifestor-tier': 'https://buy.stripe.com/bJe7sL5CF0aq0Gj22R5wI11',
      'ascension-tier': 'https://buy.stripe.com/9B6bJ18ORg9o2Or4aZ5wI0X',
    };
    window.location.href = stripeLinks[planId];
  };

  return (
    <section className="container mx-auto" id="pricing">
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
        <h1 className="text-3xl font-bold text-center">🌐 Web5 Subscription Tiers</h1>
        <p className="mt-2 text-center text-muted-foreground max-w-md">
          Choose a Web5 tier that aligns with your purpose and access exclusive tokenized rewards.
        </p>

        <div className="flex items-center justify-center mt-6 space-x-4">
          <Button
            variant={billingInterval === 'month' ? 'default' : 'outline'}
            onClick={() => setBillingInterval('month')}
            className="rounded-3xl"
          >
            Monthly
          </Button>
          <Button
            variant={billingInterval === 'year' ? 'default' : 'outline'}
            onClick={() => setBillingInterval('year')}
            className="rounded-3xl"
          >
            Yearly
          </Button>
        </div>

        <div className="grid gap-6 mt-10 md:grid-cols-3">
          {pricingPlans.map((plan) => {
            const price =
              billingInterval === 'month'
                ? plan.monthlyPrice
                : plan.yearlyPrice;

            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(price);

            return (
              <Card
                key={plan.id}
                className="w-full max-w-sm text-black bg-white border-2 rounded-4xl shadow-md"
              >
                <CardHeader className="flex flex-col justify-center rounded-t-4xl">
                  <div className="flex items-center justify-center text-4xl">
                    <span>{plan.emoji}</span>
                    <CardTitle className="ml-2 text-2xl font-bold text-center">
                      {plan.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="py-6 text-4xl font-bold text-center text-gray-800">
                    {priceString}
                    <span className="text-base font-medium text-gray-500">
                      /{billingInterval}
                    </span>
                  </div>
                  <p className="mt-2 text-center text-muted-foreground">
                    {plan.description}
                  </p>
                  <Button
                    variant="default"
                    type="button"
                    onClick={() => handleCheckout(plan.id)}
                    disabled={loading === plan.id}
                    className="w-full mt-4 rounded-3xl"
                  >
                    {loading === plan.id ? 'Redirecting...' : 'Subscribe'}
                  </Button>
                  <ul className="mt-4 space-y-2 text-sm">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-2 text-gray-700"
                      >
                        <span>{feature}</span>
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
