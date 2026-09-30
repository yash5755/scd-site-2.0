'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FooterCtaSectionProps {
  onOpenRegister?: () => void;
}

export const FooterCtaSection: React.FC<FooterCtaSectionProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative flex w-full max-w-full items-center justify-center overflow-hidden border-t border-[#D1E5CD] bg-[#E8EBEF]">
      {/* Background graphic with curved shapes and code visual element */}
      <img
        alt=""
        aria-hidden="true"
        src="/footer-cta-background.png"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none"
      />

      <div className="relative z-10 grid min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] w-full grid-cols-1 p-5 py-12 sm:p-8 md:p-10 lg:grid-cols-2 lg:p-20">
        <ScrollReveal variant="fade-right" className="flex h-full w-full flex-col items-start justify-between gap-8">
          <h2 className="font-sans w-full max-w-xl text-4xl leading-[105%] font-medium tracking-[-0.03em] text-[#23303E] max-sm:text-3xl lg:w-4/5 sm:text-5xl">
            Meet the people building
            <br />
            what’s next with AWS
          </h2>
          <div className="flex w-full items-start justify-start mt-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://konfhub.com/aws-student-community-day-mysuru-2026"
              onClick={() => {
                if (onOpenRegister) onOpenRegister();
              }}
              className="group/button cursor-pointer shrink-0 items-center justify-center text-xs font-medium whitespace-nowrap transition-all outline-none select-none flex h-11 min-h-11 rounded-none border-none bg-[#23303E] px-5 hover:bg-[#23303E]/80 flex-row gap-2"
            >
              <span className="font-mono text-sm tracking-[-0.02em] text-[#FAFAFA] uppercase sm:text-base font-medium">
                REGISTER NOW
              </span>
              <ChevronRight className="h-5 w-5 text-[#FAFAFA] shrink-0 transition-transform group-hover/button:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
