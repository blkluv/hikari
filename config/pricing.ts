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
      '⚡️ 44 Bitcoin $RNT • L$VE • HAI$'
    ],
    monthlyPrice: 144,
    yearlyPrice: 1440
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
      '⚡️ 444 Bitcoin $RNT • L$VE • HAI$ • $CBO'
    ],
    monthlyPrice: 444,
    yearlyPrice: 4440
  }
];
