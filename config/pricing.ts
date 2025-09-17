interface Plan {
  name: string;
  description: string;
  features: string[];
  monthlyPrice: number;
  yearlyPrice: number;
}

const pricingPlans: Plan[] = [
  {
    name: 'Tribe Tier',
    description: 'Perfect for those starting their journey in the purpose economy.',
    features: [
      'Daily Huddles (15-min livestream pep talks)',
      'Access to weekly livestream classes + replays',
      'Private community chat + mastermind tribe',
      'Earn tribe memecoins for showing up & participating',
      'Unlock tokenized rewards for engagement'
    ],
    monthlyPrice: 44,
    yearlyPrice: 440
  },
  {
    name: 'Manifestor Tier',
    description: 'Best for those ready to level up spiritually & financially with group support.',
    features: [
      'Everything in Tribe Tier',
      '2x Weekly Group Spiritual Coaching Sessions (live Q&A + feedback)',
      'Boosted tribe memecoin rewards (higher earning multipliers)',
      'Access to resource vault (guides, meditations, crypto insights)',
      'Monthly NFT/Token drops as proof of participation',
      'Network in the manifested mastermind of leaders & visionaries'
    ],
    monthlyPrice: 144,
    yearlyPrice: 1440
  },
  {
    name: 'Ascension Tier',
    description: 'For serious seekers, creators, and leaders who want direct access.',
    features: [
      'Everything in Manifestor Tier',
      '1-on-1 Spiritual Coaching (monthly private session with Hahz)',
      'Priority spotlight coaching during livestreams',
      'Exclusive VIP Memecoin Airdrops + tokenized recognition',
      'Access to special IRL meetups / retreats (discounted or free)',
      'Become part of the core inner circle co-creating the Web5 Purpose Economy'
    ],
    monthlyPrice: 444,
    yearlyPrice: 4440
  }
];

export default pricingPlans;

import { Tables } from '@/types/db';

type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}

export const dummyPricing: ProductWithPrices[] = [
  {
    id: 'tribe-tier',
    name: 'Tribe Tier',
    description: 'Perfect for those starting their journey in the purpose economy.',
    prices: [
      {
        id: 'tribe-tier-month',
        currency: 'USD',
        unit_amount: 4400, // $44
        interval: 'month',
        interval_count: 1,
        trial_period_days: null,
        type: 'recurring',
        active: true,
        product_id: 'tribe-tier',
        description: null,
        metadata: null
      },
      {
        id: 'tribe-tier-year',
        currency: 'USD',
        unit_amount: 44000, // $440
        interval: 'year',
        interval_count: 1,
        trial_period_days: null,
        type: 'recurring',
        active: true,
        product_id: 'tribe-tier',
        description: null,
        metadata: null
      }
    ],
    image: null,
    metadata: null,
    active: null
  },
  {
    id: 'manifestor-tier',
    name: 'Manifestor Tier',
    description: 'Best for those ready to level up spiritually & financially with group support.',
    prices: [
      {
        id: 'manifestor-tier-month',
        currency: 'USD',
        unit_amount: 14400, // $144
        interval: 'month',
        interval_count: 1,
        trial_period_days: null,
        type: 'recurring',
        active: true,
        product_id: 'manifestor-tier',
        description: null,
        metadata: null
      },
      {
        id: 'manifestor-tier-year',
        currency: 'USD',
        unit_amount: 144000, // $1,440
        interval: 'year',
        interval_count: 1,
        trial_period_days: null,
        type: 'recurring',
        active: true,
        product_id: 'manifestor-tier',
        description: null,
        metadata: null
      }
    ],
    image: null,
    metadata: null,
    active: null
  },
  {
    id: 'ascension-tier',
    name: 'Ascension Tier',
    description: 'For serious seekers, creators, and leaders who want direct access.',
    prices: [
      {
        id: 'ascension-tier-month',
        currency: 'USD',
        unit_amount: 44400, // $444
        interval: 'month',
        interval_count: 1,
        trial_period_days: null,
        type: 'recurring',
        active: true,
        product_id: 'ascension-tier',
        description: null,
        metadata: null
      },
      {
        id: 'ascension-tier-year',
        currency: 'USD',
        unit_amount: 444000, // $4,440
        interval: 'year',
        interval_count: 1,
        trial_period_days: null,
        type: 'recurring',
        active: true,
        product_id: 'ascension-tier',
        description: null,
        metadata: null
      }
    ],
    image: null,
    metadata: null,
    active: null
  }
];
