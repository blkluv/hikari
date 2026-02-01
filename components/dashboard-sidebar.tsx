'use client';

import { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Link from 'next/link';
import {
  LineChart,
  Package,
  Package2,
  Eclipse,
  ShoppingCart,
  Users2,
  Inbox
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavItem, iconComponents } from '@/config/dashboard';

const Sidebar = ({ navConfig }: { navConfig: NavItem[] }) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-lg font-semibold rounded-lg group h-9 w-9 shrink-0 bg-primary text-primary-foreground md:h-8 md:w-8 md:text-base"
          prefetch={false}
        >
          <Eclipse className="w-5 h-5 transition-all group-hover:scale-110" />
          <span className="sr-only">HEALXYZ Inc</span>
        </Link>
        {navConfig.map((item, index) => {
          const IconComponent =
            iconComponents[item.icon as keyof typeof iconComponents];
          const isActive = pathname === item.href;
          const isDisabled = item.disabled;
          
          // Add fallback for href to prevent undefined errors
          const href = item.href || '#';
          
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    isDisabled
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                      : isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isDisabled ? (
                    <IconComponent className="w-5 h-5 opacity-50" />
                  ) : (
                    <Link
                      href={href} // ← Use the fallback value
                      className="flex items-center justify-center w-full h-full"
                      prefetch={false}
                    >
                      <IconComponent className="w-5 h-5" />
                    </Link>
                  )}
                  <span className="sr-only">{item.label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                {isDisabled ? `${item.label} (Disabled)` : item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </nav>
  );
};

export default Sidebar;