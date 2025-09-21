'use client';
import { useEffect, useState } from 'react';
import {
  StripeSvg,
  NextjsSvg,
  SupabaseSvg,
  VercelSvg,
  GithubSvg,
  LogoSupacrawler
} from '@/components/svg';

export default function LogoCloud() {
  const [primaryColor, setPrimaryColor] = useState('');

  useEffect(() => {
    // Get the computed style of the primary color
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColorValue = rootStyles.getPropertyValue('--primary');
    setPrimaryColor(primaryColorValue.trim());
  }, []);

  return (
    <div>
      <p className="mt-12 text-xs uppercase text-primary text-center font-bold tracking-[0.3em]">
        WEB5 SOCIALZ
      </p>
      <div className="grid justify-center grid-cols-1 my-12 space-y-4 place-items-center sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-10 sm:grid-cols-6">
        <div className="flex items-center justify-center w-24 h-15">
          <a href="https://atl5d.com" aria-label="atl5d.com Link">
            <NextjsSvg className="size-full" style={{ color: primaryColor }} />
          </a>
        </div>
        <div className="flex items-center justify-center w-24 h-15">
          <a href="https://healxyz.com" aria-label="healxyz.com Link">
            <VercelSvg className="size-full" style={{ color: primaryColor }} />
          </a>
        </div>
        <div className="flex items-center justify-center w-24 h-12">
          <a href="https://luvnft.com" aria-label="luvnft.com Link">
            <StripeSvg className="size-full" style={{ color: primaryColor }} />
          </a>
        </div>
        <LogoSupacrawler />
        <div className="flex items-center justify-center w-24 h-15 sm:ml-8">
          <a href="https://rnt.social" aria-label="RNT.SOCIAL Link">
            <SupabaseSvg
              className="size-full"
              style={{ color: primaryColor }}
            />
          </a>
        </div>
        <div className="flex items-center justify-center w-24 h-15">
          <a href="https://w3w.delivery" aria-label="w3w.delivery Link">
            <GithubSvg className="size-full" style={{ color: primaryColor }} />
          </a>
        </div>
      </div>
    </div>
  );
}
