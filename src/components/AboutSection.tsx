'use client';

import React, { useRef } from 'react';
import { 
  GraduationCap, 
  Terminal, 
  Users, 
  Briefcase, 
  Heart, 
  Gift, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const cards = [
    {
      title: 'Speaker Keynotes',
      desc: 'Hear from AWS Heroes, Community Builders, and senior engineers sharing real-world cloud insights, lessons, and systems.',
      icon: GraduationCap,
    },
    {
      title: 'Community Conversations',
      desc: 'Meet the local cloud community — engineers, founders, students, and hiring teams across Mysuru and beyond.',
      icon: Users,
    },
    {
      title: 'Technical Sessions',
      desc: 'Bring your laptop. Explore cloud architecture, AI, DevOps, serverless, and leave with working code.',
      icon: Terminal,
    },
    {
      title: 'Career Opportunities',
      desc: 'Connect directly with sponsor booths and cloud teams hiring across cloud, ML, DevOps, and platform roles.',
      icon: Briefcase,
    },
    {
      title: 'Welcoming Community',
      desc: 'A student-friendly, community-run conference. First-timers and cloud newcomers are enthusiastically welcomed at the front.',
      icon: Heart,
    },
    {
      title: 'Swag & Giveaways',
      desc: 'Surprise drops, exclusive community badges, and official AWS merchandise throughout the entire day.',
      icon: Gift,
    },
  ];

  return (
    <section 
      id="about" 
      className="flex w-full max-w-full flex-col items-center justify-center gap-8 py-12 sm:gap-10 sm:py-16 lg:gap-10 lg:py-20 bg-[#EFF0F3] overflow-hidden scroll-mt-20"
    >
      {/* Target anchor for why-attend navigation */}
      <div id="why" className="absolute -top-28 pointer-events-none" />

      {/* Header with Title and Description */}
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ScrollReveal variant="fade-left">
            <div>
              <h2 className="font-sans text-4xl leading-[105%] font-medium tracking-[-0.03em] text-[#23303E] sm:text-5xl md:text-6xl">
                What you can expect
              </h2>
              <p className="mt-3 max-w-2xl font-sans text-sm sm:text-base text-[#64748b] leading-relaxed">
                AWS Community Day is a full day of talks, workshops, and hallway conversations organized by the local AWS community. No gatekeeping. Beginners welcomed at the front.
              </p>
            </div>
          </ScrollReveal>

          {/* Desktop Scroll Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="grid h-10 w-10 place-items-center border border-[#23303E]/20 bg-white text-[#23303E] hover:bg-[#23303E] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="grid h-10 w-10 place-items-center border border-[#23303E]/20 bg-white text-[#23303E] hover:bg-[#23303E] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally Scrolling Square Cards Strip Matching Reference */}
      <div 
        ref={scrollContainerRef}
        className="no-scrollbar flex w-full flex-row flex-nowrap gap-2 sm:gap-3 overflow-x-auto px-5 sm:px-8 md:px-10 lg:px-20 pb-4 pt-1"
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="flex aspect-square w-[300px] sm:w-[340px] lg:w-[380px] h-[300px] sm:h-[340px] lg:h-[380px] flex-shrink-0 flex-col items-start justify-between border border-[#23303E] bg-[#23303E] p-6 sm:p-7 lg:p-8 rounded-none transition-transform duration-300 hover:-translate-y-1 select-none"
            >
              {/* Top: Icon */}
              <div className="w-full">
                <Icon className="h-10 w-10 sm:h-11 sm:w-11 text-[#FAFAFA] stroke-[1.5]" />
              </div>

              {/* Bottom: Heading & Description */}
              <div className="w-full">
                <h3 className="font-sans text-2xl sm:text-3xl text-[#FAFAFA] font-normal leading-[110%] tracking-tight sm:w-3/4">
                  {card.title}
                </h3>
                <p className="mt-2.5 font-sans text-xs sm:text-sm text-[#FAFAFA]/80 font-light leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}

        {/* Terminal / Code Card Preserving Project Code Details */}
        <div className="flex aspect-square w-[300px] sm:w-[340px] lg:w-[380px] h-[300px] sm:h-[340px] lg:h-[380px] flex-shrink-0 flex-col items-start justify-between border border-[#1e293b] bg-[#1a232f] p-6 sm:p-7 lg:p-8 rounded-none transition-transform duration-300 hover:-translate-y-1 select-none">
          <div className="w-full flex items-center justify-between">
            <Terminal className="h-10 w-10 sm:h-11 sm:w-11 text-[#00aa93] stroke-[1.5]" />
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">mysuru builder</span>
          </div>
          <div className="w-full font-mono text-xs sm:text-sm text-white/90">
            <p className="text-white/70"><span className="text-[#a2e048]">$</span> whoami</p>
            <p className="text-[#00aa93] font-bold my-1 text-base">builder</p>
            <p className="text-white/70"><span className="text-[#a2e048]">$</span> deploy --your potential</p>
            <p className="text-[#38bdf8] font-medium mt-1">→ Build Once. Scale Forever.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
