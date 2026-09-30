'use client';

import React, { useState } from 'react';
import { Linkedin, ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  topic?: string;
  badge?: string;
  linkedin?: string;
  isConfirmed?: boolean;
}

export const SpeakersSection: React.FC = () => {
  // Only the confirmed speaker Jessica Gilmore has full information and image.
  // Other speaker cards are intentionally empty placeholders ready to be filled when confirmed.
  const speakers: Speaker[] = [
    {
      id: 'jessica-gilmore',
      name: 'Jessica Gilmore',
      role: 'Manager, Community Groups',
      company: 'Amazon',
      image: '/speakers/Jessica.jpg',
      topic: 'Keynote: Empowering Global Builders & Community Growth',
      badge: 'AWS Keynote',
      linkedin: 'https://www.linkedin.com/in/jessicagilmore1/',
      isConfirmed: true,
    },
    {
      id: 'speaker-2',
      name: '',
      role: '',
      company: '',
      image: '',
      topic: '',
      badge: '',
      linkedin: '',
      isConfirmed: false,
    },
    {
      id: 'speaker-3',
      name: '',
      role: '',
      company: '',
      image: '',
      topic: '',
      badge: '',
      linkedin: '',
      isConfirmed: false,
    },
    {
      id: 'speaker-4',
      name: '',
      role: '',
      company: '',
      image: '',
      topic: '',
      badge: '',
      linkedin: '',
      isConfirmed: false,
    },
    {
      id: 'speaker-5',
      name: '',
      role: '',
      company: '',
      image: '',
      topic: '',
      badge: '',
      linkedin: '',
      isConfirmed: false,
    },
    {
      id: 'speaker-6',
      name: '',
      role: '',
      company: '',
      image: '',
      topic: '',
      badge: '',
      linkedin: '',
      isConfirmed: false,
    },
  ];

  const [activeSpeakerIndex, setActiveSpeakerIndex] = useState<number>(0);
  const activeSpeaker = speakers[activeSpeakerIndex];

  return (
    <section 
      id="speakers" 
      className="relative flex w-full max-w-full flex-col items-center justify-center overflow-hidden bg-[#23303E] py-16 sm:py-20 lg:py-24 scroll-mt-20"
    >
      {/* Subtle architectural wavy vector lines in background like reference */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        <svg 
          className="absolute -right-24 -top-24 h-[800px] w-[800px] stroke-white/40 fill-none" 
          viewBox="0 0 800 800"
        >
          <path d="M0,200 Q200,100 400,300 T800,200" strokeWidth="1" />
          <path d="M0,250 Q200,150 400,350 T800,250" strokeWidth="1" />
          <path d="M0,300 Q200,200 400,400 T800,300" strokeWidth="1" />
          <path d="M0,350 Q200,250 400,450 T800,350" strokeWidth="1" />
          <path d="M0,400 Q200,300 400,500 T800,400" strokeWidth="1" />
          <path d="M0,450 Q200,350 400,550 T800,450" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 w-full px-5 sm:px-8 md:px-10 lg:px-20">
        {/* Section Header Matching Reference */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <ScrollReveal variant="fade-left">
            <h2 className="font-sans flex flex-col text-4xl sm:text-5xl lg:text-6xl leading-[105%] font-medium tracking-[-0.03em] text-[#FAFAFA]">
              <span>Meet the Speakers</span>
              <span>Shaping What's Next</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-right">
            <a
              href="#agenda"
              className="flex h-11 min-h-11 rounded-none border-none bg-[#D1E5CD] px-6 hover:bg-[#D1E5CD]/90 flex-row items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-[#23303E] font-bold transition-all duration-200 cursor-pointer self-start md:self-end"
            >
              VIEW ALL SESSIONS <ArrowRight className="h-4 w-4" />
            </a>
          </ScrollReveal>
        </div>

        {/* Desktop & Tablet Interactive Speaker Component (Matches Reference) */}
        <div className="mt-12 hidden md:grid md:grid-cols-[1.25fr_1fr] border-2 border-[#2D3C4E] bg-[#23303E] overflow-hidden">
          {/* Left Column: Speaker Rows */}
          <div className="flex flex-col divide-y-2 divide-[#2D3C4E]">
            {speakers.map((speaker, index) => {
              const isActive = index === activeSpeakerIndex;
              const isConfirmed = speaker.isConfirmed && Boolean(speaker.name);

              return (
                <div
                  key={speaker.id}
                  onMouseEnter={() => setActiveSpeakerIndex(index)}
                  onClick={() => setActiveSpeakerIndex(index)}
                  className={`group relative flex cursor-pointer flex-col justify-center px-8 transition-all duration-200 min-h-[96px] ${
                    isActive 
                      ? 'bg-[#2D3C4E] py-7' 
                      : 'bg-[#23303E] hover:bg-[#2D3C4E]/40 py-6'
                  }`}
                >
                  {isConfirmed ? (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 
                          className={`font-sans tracking-tight transition-colors duration-200 ${
                            isActive 
                              ? 'text-3xl lg:text-4xl font-medium text-[#FAFAFA]' 
                              : 'text-2xl lg:text-3xl font-normal text-[#FAFAFA]/70 group-hover:text-[#FAFAFA]'
                          }`}
                        >
                          {speaker.name}
                        </h3>

                        {speaker.linkedin && (
                          <a
                            href={speaker.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#FAFAFA]/80 hover:text-[#D1E5CD] transition-colors p-1"
                            aria-label={`${speaker.name} LinkedIn Profile`}
                          >
                            <Linkedin className="h-5 w-5 fill-current" />
                          </a>
                        )}
                      </div>

                      {/* Active Speaker Details */}
                      {isActive && (
                        <div className="mt-2 flex flex-col gap-1">
                          <p className="font-mono text-xs uppercase tracking-wider text-[#D1E5CD]">
                            {speaker.role} <span className="text-[#a2e048]">@{speaker.company}</span>
                          </p>
                          {speaker.topic && (
                            <p className="font-sans text-xs sm:text-sm text-[#FAFAFA]/80 mt-1 leading-snug">
                              {speaker.topic}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Intentionally blank placeholder card maintaining exact same dimensions and style */
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-2">
                        <div className="h-6 w-48 sm:w-64 rounded-none bg-[#29384A]/60 transition-colors group-hover:bg-[#29384A]" />
                        <div className="h-3.5 w-32 rounded-none bg-[#29384A]/40 transition-colors group-hover:bg-[#29384A]/70" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A6C86] opacity-60 group-hover:opacity-100 transition-opacity">
                        To Be Announced
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Featured Portrait Image of Active Speaker */}
          <div className="relative border-l-2 border-[#2D3C4E] bg-[#1a232f] flex items-end justify-center overflow-hidden min-h-[520px]">
            {activeSpeaker && activeSpeaker.isConfirmed && activeSpeaker.image ? (
              <>
                <img
                  src={activeSpeaker.image}
                  alt={activeSpeaker.name}
                  className="h-full w-full object-cover object-center grayscale-[15%] transition-all duration-300"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#23303E] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#23303E] bg-[#D1E5CD] px-2.5 py-1 font-bold inline-block">
                      {activeSpeaker.badge}
                    </span>
                    {activeSpeaker.linkedin && (
                      <a
                        href={activeSpeaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-[#23303E]/90 border border-[#D1E5CD]/40 text-[#FAFAFA] hover:bg-[#D1E5CD] hover:text-[#23303E] px-3 py-1.5 font-mono text-xs font-semibold transition-colors"
                        aria-label={`${activeSpeaker.name} LinkedIn Profile`}
                      >
                        <Linkedin className="h-4 w-4 fill-current" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                  <p className="font-sans text-2xl font-bold text-white">{activeSpeaker.name}</p>
                  <p className="font-mono text-xs text-[#a2e048]">{activeSpeaker.role} @{activeSpeaker.company}</p>
                  {activeSpeaker.topic && (
                    <p className="mt-2 font-sans text-xs text-[#FAFAFA]/85 leading-snug">
                      {activeSpeaker.topic}
                    </p>
                  )}
                </div>
              </>
            ) : (
              /* Ready placeholder state when hovering an empty card */
              <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-[#29384A]/30">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#2D3C4E] p-10 w-4/5">
                  <div className="h-12 w-12 rounded-none bg-[#2D3C4E] flex items-center justify-center text-[#5A6C86]">
                    <span className="font-mono text-lg font-bold">AWS</span>
                  </div>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[#D1E5CD]/80">
                    Speaker Slot Available
                  </p>
                  <p className="mt-1 font-sans text-xs text-[#FAFAFA]/50">
                    More exciting speakers to be announced soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile View: 2-Column Grid Matching Reference Mobile Layout */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 border-t-2 border-l-2 border-[#2D3C4E] md:hidden">
          {speakers.map((speaker) => {
            const isConfirmed = speaker.isConfirmed && Boolean(speaker.name);

            return (
              <div
                key={speaker.id}
                className="flex flex-col border-r-2 border-b-2 border-[#2D3C4E] bg-[#23303E] overflow-hidden"
              >
                {isConfirmed ? (
                  <>
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1a232f]">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="h-full w-full object-cover object-top grayscale-[15%]"
                      />
                      {speaker.badge && (
                        <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-widest text-[#23303E] bg-[#D1E5CD] px-2 py-0.5 font-bold">
                          {speaker.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-sans text-lg font-bold text-[#FAFAFA]">{speaker.name}</h3>
                        {speaker.linkedin && (
                          <a
                            href={speaker.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FAFAFA] hover:text-[#a2e048] p-1"
                            aria-label={`${speaker.name} LinkedIn Profile`}
                          >
                            <Linkedin className="h-4 w-4 fill-current" />
                          </a>
                        )}
                      </div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#D1E5CD]">
                        {speaker.role} <span className="text-[#a2e048]">@{speaker.company}</span>
                      </p>
                      {speaker.topic && (
                        <p className="font-sans text-xs text-[#FAFAFA]/70 mt-1 leading-snug">
                          {speaker.topic}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  /* Empty mobile card maintaining exact same dimensions, borders and layout */
                  <>
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#29384A]/30 flex flex-col items-center justify-center p-4">
                      <div className="w-full h-full border border-dashed border-[#2D3C4E] flex flex-col items-center justify-center text-center p-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A6C86]">
                          Speaker TBA
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-2 min-h-[96px] justify-center">
                      <div className="h-4 w-3/4 bg-[#29384A]/50" />
                      <div className="h-3 w-1/2 bg-[#29384A]/30" />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
