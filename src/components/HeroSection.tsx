'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { openKonfHub, initKonfHub, KONFHUB_BUTTONS } from '../lib/konfhub';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onSelectNode?: (node: { title: string; category: string; description: string; icon: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  const [attendees, setAttendees] = useState(0);
  const [speakers, setSpeakers] = useState(0);
  const [sessions, setSessions] = useState(0);

  const cyclingWords = ['AI/ML', 'Data', 'DevOps', 'Cloud', 'Security', 'Serverless', 'Containers'];
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAttendees(Math.floor(500 * Math.min(progress, 1)));
      setSpeakers(Math.floor(15 * Math.min(progress, 1)));
      setSessions(Math.floor(12 * Math.min(progress, 1)));

      if (step >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    initKonfHub();
  }, []);

  useEffect(() => {
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % cyclingWords.length);
        setWordVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <section 
      id="top" 
      className="relative flex min-h-[100svh] min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#23303E]"
    >
      {/* Exact Fluid Organic Artwork from reference site */}
      <img
        src="/hero-image.png"
        alt="AWS Community Day Mysuru 2026"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none z-0"
        loading="eager"
      />
      {/* Content Container positioned with mt-auto matching reference */}
      <div className="relative z-10 mt-auto flex w-full flex-col gap-8 px-5 pt-28 pb-8 sm:px-8 sm:pb-10 md:px-10 lg:gap-16 lg:p-20 lg:pt-32">
        <div className="max-w-3xl">
          {/* Heading - sans-serif style like reference */}
          <h1 className="font-sans font-bold text-5xl leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-sm">
            Where Builders<br className="hidden sm:inline" />{' '}
            Meet{' '}
            <span
              className="inline-block"
              style={{
                opacity: wordVisible ? 1 : 0,
                transform: wordVisible ? 'translateY(0px)' : 'translateY(-12px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              {cyclingWords[wordIndex]}.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg drop-shadow-sm">
            A one-day, community-run AWS conference for students, developers, architects, and the cloud-curious. Deep talks, hands-on workshops, and the kind of people you'll want to build the future with.
          </p>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
            <div className="bg-[#222b38]/10 backdrop-blur-sm border border-white/20 p-3 sm:p-4 text-center rounded-lg">
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                <span>{attendees}</span><span className="text-white">+</span>
              </p>
              <p className="mt-1 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80">Attendees</p>
            </div>

            <div className="bg-[#222b38]/10 backdrop-blur-sm border border-white/20 p-3 sm:p-4 text-center rounded-lg">
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                <span>{speakers}</span><span className="text-white">+</span>
              </p>
              <p className="mt-1 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80">Speakers</p>
            </div>

            <div className="bg-[#222b38]/10 backdrop-blur-sm border border-white/20 p-3 sm:p-4 text-center rounded-lg">
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                <span>{sessions}</span><span className="text-white">+</span>
              </p>
              <p className="mt-1 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-widest text-white/80">Sessions</p>
            </div>
          </div>
        </div>

        {/* Bottom bar with date/location and CTA matching reference */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-8 lg:gap-16">
            <p className="font-mono text-sm font-normal tracking-[-0.02em] text-[#fafafa] uppercase mix-blend-overlay sm:text-base">
              MYSURU, INDIA
            </p>
            <p className="font-mono text-sm font-normal tracking-[-0.02em] text-[#fafafa] uppercase mix-blend-overlay sm:text-base">
              NOVEMBER 21, 2026
            </p>
          </div>

          <button
            type="button"
            onClick={() => openKonfHub(KONFHUB_BUTTONS.GET_TICKETS)}
            className="cursor-pointer shrink-0 items-center justify-center flex h-11 min-w-40 rounded-none border-none bg-[#23303E] px-5 hover:bg-[#23303E]/80 flex-row gap-2 transition-colors"
          >
            <span className="font-mono text-sm tracking-[-0.02em] text-[#fafafa] uppercase sm:text-base">
              GET TICKETS
            </span>
            <ArrowRight className="h-4 w-4 text-[#fafafa]" />
          </button>
        </div>
      </div>
    </section>
  );
};

