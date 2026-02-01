interface Plan {
  id: string;
  name: string;
  emoji: string;
  description: string;
  features: string[];
  monthlyPrice: number;
  yearlyPrice: number;
}

export const pricingPlans: Plan[] = [
  {
    id: 'tribe-tier',
    emoji: '💟',
    name: 'Tribe Tier',
    description: 'Your 5D Tribe.',
    features: [
      '💬 Private Tribe mastermind chat invite',
      '🟠 Livestream show alerts',
      '💖 Exclusive content',
    ],
    monthlyPrice: 44,
    yearlyPrice: 440
  },
  {
    id: 'manifestor-tier',
    emoji: '☮️',
    name: 'Manifestor Tier',
    description: 'For manifestors in training.',
    features: [
      '📲 Two 1-on-1 sessions per month',
      '💬 Private Manifestor mastermind group',
      '🟠 Livestream show alerts',
      '💖 Exclusive content',
    ],
    monthlyPrice: 144,
    yearlyPrice: 1440
  },
  {
    id: 'ascension-tier',
    emoji: '☯️',
    name: 'Ascension Tier',
    description: 'For visionaries and leaders.',
    features: [
      '📲 4 1-on-1 sessions per month',
      '💬 Private Ascension mastermind circle',
      '🟠 Livestream show alerts',
      '🧙🏽 Ask HAHZ unlimited sessions',
      '💖 Exclusive content',
    ],
    monthlyPrice: 444,
    yearlyPrice: 4440
  }
];
