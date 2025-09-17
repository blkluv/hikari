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
          Purpose Over Profit
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Join the spiritual-purpose economy. Manifested by the Web5 creator,
          this ecosystem gives you tools, insights, and IRL experiences —
          including the first physical asset tokenized as an NFT (2021).
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
            <a target="_blank" rel="noopener noreferrer" href={feature.link}>
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 mb-4 fill-current"
                fill-rule={feature.fillRule}
              >
                <path d={feature.svgPath} />
              </svg>
              <div className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                {feature.title}
              </div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-500">
                {feature.description}
              </div>
            </a>
          </motion.div>
        ))}
      </div>
      <div className="mx-auto text-center md:max-w-[58rem]">
        {/* <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          HAHZ.LIVEalso includes a blog and a full-featured documentation site
          built using Fumadocs and MDX.
        </p> */}
      </div>
    </section>
  );
}
