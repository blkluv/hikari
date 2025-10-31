interface Plan {
  name: string;
  description: string;
  features: string[];
  monthlyPrice: number;
  yearlyPrice: number;
}

const pricingPlans: Plan[] = [
  {
    name: '💟 Tribe Tier',
    description: 'Your intro to the Web5 family. ✨ Connect, learn, and earn with purpose.',
    features: [
      '📲 Mobile number for direct Web5 alerts',
      '👻 Phantom Wallet setup (Web5 🏦 onboarding)',
      '🆔 Follow from official Web5 TikTok channel',
      '💼 Tokenized purpose',
      '💬 Private Tribe mastermind chat',
      '🟠 Livestream Web5 show alerts',
      '💖 44 tokens in $FOOD • $WATAA • $RNT • $LOVE',
      '⚡️ 4 Bitcoin $RNT • L$VE • HAI$ rewards'
    ],
    monthlyPrice: 44,
    yearlyPrice: 440
  },
  {
    name: '☮️ Manifestor Tier',
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
      '⚡️ 44 Bitcoin $RNT • L$VE • HAI$'
    ],
    monthlyPrice: 144,
    yearlyPrice: 1440
  },
  {
    name: '☯️ Ascension Tier',
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
      '⚡️ 444 Bitcoin $RNT • L$VE • HAI$ • $CBO'
    ],
    monthlyPrice: 444,
    yearlyPrice: 4440
  }
];

export default pricingPlans;

// ---------------------------------------------------------------------------

import { Tables } from '@/types/db';

type Product = Tables<'products'>;
type Price = Tables<'prices'>;

interface ProductWithPrices extends Product {
  prices: Price[];
}

export const dummyPricing: ProductWithPrices[] = [
  {
    id: 'tribe-tier',
    name: '💟 Tribe Tier',
    description: 'Your intro to the Web5 family. ✨ Connect, learn, and earn with purpose.',
    prices: [
      {
        id: 'tribe-tier-month',
        currency: 'USD',
        unit_amount: 4400,
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
        unit_amount: 44000,
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
    name: '☮️ Manifestor Tier',
    description: 'For creators & coders shaping the Purpose Economy.',
    prices: [
      {
        id: 'manifestor-tier-month',
        currency: 'USD',
        unit_amount: 14400,
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
        unit_amount: 144000,
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
    name: '☯️ Ascension Tier',
    description: 'For visionaries ready to ascend Web5 with purpose.',
    prices: [
      {
        id: 'ascension-tier-month',
        currency: 'USD',
        unit_amount: 44400,
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
        unit_amount: 444000,
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
