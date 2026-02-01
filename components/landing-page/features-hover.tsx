'use client';

import { features } from '@/config/features';
import { motion } from 'framer-motion';
import React from 'react';

export default function FeaturesHover() {
  return (
    <section
      id="features"
      className="container py-8 mb-10 space-y-6 bg-zinc-50 dark:bg-zinc-900 md:py-12 lg:py-24 rounded-6xl"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Livestream Healing: The Fastest Path to Collective Awakening
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Tap into the power of Livestream Healing—through 1-on-1 and group sessions—to heal yourself and the world.
          True transformation happens when we align together, heart to heart, soul to soul. We are not healing alone;
          we are healing as one, tapped into the same journey, guided by the same universal energy.
          This is sacred space in motion. This is healing amplified through presence.
        </p>
      </div>
      <div className="mx-auto grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 md:max-w-[64rem]">
        {features.map((feature) => (
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', bounce: 0.7 }}
            key={feature.title}
            className="relative p-6 overflow-hidden border rounded-lg bg-background dark:bg-zinc-950"
          >
            {feature.link ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={feature.link}
                className="block"
              >
                {/* Use img tag for emoji URLs instead of SVG */}
                <img 
                  src={feature.emoji} 
                  alt={feature.title}
                  className="w-12 h-12 mb-4"
                />
                <div className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  {feature.title}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-500">
                  {feature.description}
                </div>
              </a>
            ) : (
              <div>
                {/* Use img tag for emoji URLs instead of SVG */}
                <img 
                  src={feature.emoji} 
                  alt={feature.title}
                  className="w-12 h-12 mb-4"
                />
                <div className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  {feature.title}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-500">
                  {feature.description}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mx-auto text-center md:max-w-[58rem]">
        {/* optional footer text */}
      </div>
    </section>
  );
}