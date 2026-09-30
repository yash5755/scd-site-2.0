'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SponsorItem {
  name: string;
  logo?: string | null;
  url?: string;
  logoClassName?: string;
}

interface SponsorTier {
  category: string;
  layout: 'full' | 'grid-4';
  sponsors: SponsorItem[];
}

export const SponsorsSection: React.FC = () => {
  const tiers: SponsorTier[] = [
    {
      category: 'TITLE SPONSOR',
      layout: 'full',
      sponsors: [
        {
          name: 'Amazon Web Services',
          logo: '/aws_partner.jpeg',
          url: 'https://builder.aws.com/',
        },
      ],
    },
    {
      category: 'VENUE SPONSOR',
      layout: 'full',
      sponsors: [
        {
          name: 'Vidyavardhaka College of Engineering',
          logo: '/vvce_logo.png',
          url: 'https://vvce.ac.in/',
        },
      ],
    },
    {
      category: 'EVENT PARTNER — TICKETING PARTNER',
      layout: 'full',
      sponsors: [
        {
          name: 'KonfHub',
          logo: '/konfhub_logo.png',
          url: 'https://konfhub.com/',
        },
      ],
    },
    {
      category: 'COMMUNITY PARTNER',
      layout: 'grid-4',
      sponsors: [
        {
          name: 'AWS User Groups Mysuru',
          logo: '/aws_user_group_mysuru_logo.png',
          logoClassName: 'max-w-[90%] sm:max-w-[210px] max-h-16 sm:max-h-32',
        },
        {
          name: 'Cloud Native Mysore',
          logo: '/cloud_native_mysore.png',
          logoClassName: 'max-w-[90%] sm:max-w-[210px] max-h-16 sm:max-h-60',
        },
        {
          name: 'AWS User Group Bengaluru',
          logo: '/awsugblr-logo.png',
          url: 'https://www.awsugblr.in/',
          logoClassName: 'max-w-[90%] sm:max-w-[620px] max-h-28 sm:max-h-60',
        },
        {
          name: 'AWS User Group Madurai',
          logo: '/logo-Tx1zCSPp.png',
          url: 'https://www.awsugmdu.in/',
          logoClassName: 'max-w-[90%] sm:max-w-[210px] max-h-16 sm:max-h-32',
        },
      ],
    },
  ];

  return (
    <section 
      id="sponsors" 
      className="flex w-full max-w-full overflow-hidden flex-col items-center justify-center gap-8 p-5 py-12 sm:gap-10 sm:p-8 sm:py-16 md:p-10 lg:gap-16 lg:p-20 bg-white scroll-mt-20"
    >
      {/* Section Header Matching Reference */}
      <div className="grid w-full grid-cols-1 items-start justify-start gap-8 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal variant="fade-left">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <h2 className="font-sans w-full text-4xl leading-[105%] font-medium tracking-[-0.03em] text-[#23303E] sm:text-5xl">
              Sponsors
            </h2>
            <p className="w-full font-sans text-base leading-[115%] font-light text-[#23303E] sm:text-xl sm:leading-[105%]">
              Backed by organizations helping shape cloud, developer, and technology communities. Previous editions have been supported by ecosystem partners committed to learning, innovation, and community growth.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-right">
          <div className="flex h-full w-full flex-col items-start justify-start lg:items-end">
            <a
              href="mailto:awscloudclub@vvce.ac.in"
              className="cursor-pointer shrink-0 items-center justify-center text-xs font-medium whitespace-nowrap transition-all flex h-11 min-h-11 rounded-none border-none bg-[#23303E] px-5 hover:bg-[#23303E]/80 flex-row gap-2"
            >
              <span className="font-mono text-sm tracking-[-0.02em] text-[#fafafa] uppercase sm:text-base">
                PARTNER WITH US
              </span>
              <ArrowUpRight className="h-5 w-5 text-[#fafafa] shrink-0" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Sponsor Categories Grid System Matching Reference */}
      <div className="flex w-full flex-col items-center justify-center gap-8 lg:gap-9">
        {tiers.map((tier) => (
          <div key={tier.category} className="flex w-full flex-col items-center justify-center gap-3">
            <h3 className="w-full font-mono text-sm tracking-[-0.02em] text-[#5A6C86] uppercase sm:text-base">
              {tier.category}
            </h3>

            <div className="flex w-full flex-wrap border-t border-l border-[#D1E5CD]">
              {tier.sponsors.map((sponsor, idx) => {
                const isFullWidth = tier.layout === 'full';
                const colClass = isFullWidth
                  ? 'basis-full flex min-h-24 grow items-center justify-center border-r border-b border-[#D1E5CD] sm:min-h-28'
                  : 'basis-1/2 sm:basis-1/2 lg:basis-1/4 flex min-h-20 min-w-0 grow items-center justify-center border-r border-b border-[#D1E5CD] sm:min-h-25';

                return (
                  <div key={idx} className={colClass}>
                    {sponsor.url ? (
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${sponsor.name}`}
                        className="flex h-full w-full items-center justify-center p-2 sm:p-4 transition-colors hover:bg-[#D1E5CD]/30"
                      >
                        {sponsor.logo ? (
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            loading="lazy"
                            className={`h-auto w-auto object-contain select-none ${
                              sponsor.logoClassName
                                ? sponsor.logoClassName
                                : isFullWidth ? 'max-w-64 sm:max-w-80 max-h-16 sm:max-h-20' : 'max-w-44 sm:max-w-56 max-h-12'
                            }`}
                          />
                        ) : (
                          <span className="font-mono text-xs uppercase tracking-wider text-[#5A6C86]/60">
                            {sponsor.name}
                          </span>
                        )}
                      </a>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-2 sm:p-4 transition-colors hover:bg-[#D1E5CD]/30">
                        {sponsor.logo ? (
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            loading="lazy"
                            className={`h-auto w-auto object-contain select-none ${
                              sponsor.logoClassName
                                ? sponsor.logoClassName
                                : isFullWidth ? 'max-w-64 sm:max-w-80 max-h-16 sm:max-h-20' : 'max-w-44 sm:max-w-56 max-h-12'
                            }`}
                          />
                        ) : (
                          <span className="font-mono text-xs uppercase tracking-wider text-[#5A6C86]/60">
                            {sponsor.name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
