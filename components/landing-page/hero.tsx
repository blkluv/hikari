'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Particles from '@/components/magicui/particles';
import Ripple from '@/components/magicui/ripple';
import AnimatedGradientText from '@/components/magicui/animated-shiny-text';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import AvatarCircles from '@/components/magicui/avatar-circles';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const { theme } = useTheme();

  const avatarUrls = [
    'https://avatars.githubusercontent.com/u/16860528',
    'https://avatars.githubusercontent.com/u/20110627',
    'https://avatars.githubusercontent.com/u/106103625',
    'https://avatars.githubusercontent.com/u/59228569',
  ];

  const quotes = [
    { text: "HEALXYZ totally changed how I approach my daily grind—love the vibes and the tribe!", author: "LunaMystic", title: "Spiritual Creator", avatarFallback: "DC", avatarImg: "/images/dcodes.png" },
    { text: "I've been following HEALXYZ on Instagram for years now!", author: "SoZen", title: "Mindfulness Coach", avatarFallback: "SK", avatarImg: "/images/SuhailKakar.jpg" },
    { text: "The 1-on-1 coaching sessions are next level. Wizard of HEALXYZ is my new spiritual mentor.", author: "AuroraLight", title: "Spiritual Guide", avatarFallback: "SA", avatarImg: "/images/said.jpg" },
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Safe href helper to avoid undefined
  const safeHref = (href: string | undefined, fallback = '/') => href ?? fallback;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          quantity={300}
          ease={80}
          color={theme === 'dark' ? '#FFFFFF' : '#000000'}
          refresh
        />
        <Ripple />
      </div>

      <div className="container px-4 py-12 mx-auto md:py-16 lg:py-32">
        <div className="relative z-10 flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
          {siteConfig.links.twitter && (
            <Link href={safeHref(siteConfig.links.twitter)} className="w-fit">
              <div
                className={cn(
                  'group rounded-full border border-black/5 bg-neutral-100 text-base text-secondary transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
                )}
              >
                <AnimatedGradientText className="inline-flex items-center justify-center px-4 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  🎉
                  <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                  <span
                    className={cn(
                      `inline animate-gradient bg-gradient-to-r from-[#b76a24] via-[#6a24b7] to-[#b76a24] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                  >
                    Ask Hahz anything on Telegram
                  </span>
                  <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
              </div>
            </Link>
          )}

          <h1 className="text-2xl font-bold tracking-tight font-heading sm:text-4xl md:text-5xl lg:text-6xl">
            🧙🏽‍♂️ Live Spiritual Counseling to Heal X,Y,Z

          </h1>

          <div className="max-w-[42rem] font-bold tracking-tight text-primary sm:text-xl sm:leading-8 rounded-full p-2">
            👁️ Tired of feeling lost, stuck, or disconnected like I was prior to
            healing myself? Find clarity, peace, and purpose through guided
            spiritual counseling—live sessions with the Wizard of Hahz designed
            to heal your mind, heart, and spirit.
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://instagram.com/healxyz"
              className={cn(buttonVariants({ size: 'xl' }), 'rounded-full border-2 border-primary dark:border-white text-bold text-white')}
            >
              HealXYZ Instagram
            </Link>

            {siteConfig.links.github && (
              <Link
                href="https://tiktok.com/@healxyz"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: 'outline', size: 'xl' }), 'rounded-full border-2 border-primary dark:border-white text-semibold')}
              >
                HealXYZ TikTok
              </Link>
            )}
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-4 mt-2 sm:flex-row">
            <AvatarCircles numPeople={155} avatarUrls={avatarUrls} />
            <div className="flex flex-col mt-2">
              <div className="flex flex-row justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-300 fill-yellow-200 size-5" />
                ))}
              </div>
              <span className="text-xs font-semibold">Join 160+ Healed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
