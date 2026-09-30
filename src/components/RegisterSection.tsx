'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface RegisterSectionProps {
  onOpenRegister?: () => void;
}

export const RegisterSection: React.FC<RegisterSectionProps> = ({ onOpenRegister }) => {
  return (
    <section
      id="venue"
      className="relative flex h-full w-full max-w-full items-center justify-center overflow-hidden bg-[#23303E] scroll-mt-20"
    >
      {/* Anchor for any existing register link compatibility */}
      <span id="register" className="sr-only" aria-hidden="true" />

      {/* Solid Dark Navy Base Layer on Left side to guarantee 100% solid background behind text */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-full lg:block lg:w-[50%] bg-[#23303E] select-none" />

      {/* Desktop Cloud & Concentric Contour Pattern with Embedded VVCE Entrance Photograph */}
      <div className="pointer-events-none absolute right-0 bottom-0 hidden w-full lg:block select-none z-0">
        <img
          alt="Venue Pattern Background"
          loading="lazy"
          width="1440"
          height="480"
          className="absolute right-0 bottom-0 aspect-auto"
          src="/venue/Cloud-Desktop.svg"
        />
      </div>

      {/* Mobile Cloud & Concentric Contour Pattern with Embedded VVCE Entrance Photograph */}
      <div className="pointer-events-none absolute right-0 -bottom-10 block w-full lg:hidden select-none z-0">
        <img
          alt="Mobile Venue Background"
          loading="lazy"
          width="360"
          height="480"
          className="aspect-auto w-full"
          src="/venue/Cloud-Mobile.svg"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-[480px] lg:min-h-[480px] w-full flex-col items-center justify-center px-5 py-12 sm:px-8 sm:py-16 md:px-10 lg:px-20 lg:py-20">
        <div className="flex h-full w-full flex-col items-start gap-8 lg:justify-between">
          
          {/* Left-Aligned Text Content Constrained to Stay 100% Inside Dark Navy Region */}
          <ScrollReveal variant="fade-left" className="w-full">
            <div className="flex w-full flex-col items-start justify-center gap-3 max-w-[340px] sm:max-w-[420px] lg:max-w-[380px] xl:max-w-[440px]">
              <h2 className="w-full font-mono text-xs tracking-[0.1em] text-[#D1E5CD] uppercase sm:text-sm font-semibold">
                VENUE
              </h2>
              
              <h3 className="w-full font-sans text-3xl leading-[108%] font-medium tracking-[-0.03em] text-[#FAFAFA] sm:text-4xl lg:text-5xl">
                Vidyavardhaka<br />College of Engineering
              </h3>

              <p className="w-full font-sans text-sm sm:text-base lg:text-lg leading-[135%] font-light tracking-[-0.015em] text-[#FAFAFA]/95 mt-1">
                Kannada Sahithya Parishath Road, III Stage, Gokulam, Mysuru - 570002.
                <br className="hidden sm:inline" />
                Providing the premier setting for a full day of cloud learning, workshops, and community networking.
              </p>
            </div>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal variant="fade-up" className="w-full">
            <div className="flex w-full flex-row flex-wrap items-center justify-start gap-3">
              {/* Button 1: VIEW DIRECTIONS */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Vidyavardhaka+College+of+Engineering,Mysuru,Karnataka"
                target="_blank"
                rel="noopener noreferrer"
                className="group/button cursor-pointer shrink-0 items-center justify-center text-xs font-medium whitespace-nowrap transition-all outline-none select-none flex h-11 min-h-11 rounded-none border-none bg-[#D1E5CD] px-5 hover:bg-[#D1E5CD]/80 flex-row gap-2"
              >
                <span className="font-mono text-sm tracking-[-0.02em] text-[#23303E] uppercase sm:text-base">
                  View Directions
                </span>
                <ArrowUpRight className="h-5 w-5 text-[#23303E] shrink-0 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </a>

              {/* Button 2: REGISTER */}
              <a
                href="https://konfhub.com/aws-student-community-day-mysuru-2026"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (onOpenRegister) onOpenRegister();
                }}
                className="group/button cursor-pointer shrink-0 items-center justify-center text-xs font-medium whitespace-nowrap transition-all outline-none select-none flex h-11 min-h-11 rounded-none border border-[#D1E5CD] bg-[#23303E] px-5 hover:bg-[#23303E]/80 flex-row gap-2"
              >
                <span className="font-mono text-sm tracking-[-0.02em] text-[#D1E5CD] uppercase sm:text-base">
                  Register
                </span>
                <ArrowUpRight className="h-5 w-5 text-[#D1E5CD] shrink-0 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </a>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
