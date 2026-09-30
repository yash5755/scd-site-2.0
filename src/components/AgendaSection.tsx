'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ScheduleSession {
  time: string;
  title: string;
  subtitle?: string;
  extra?: string;
}

interface AgendaSectionProps {
  onOpenSchedule?: () => void;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({ onOpenSchedule }) => {
  const router = useRouter();
  const schedule: ScheduleSession[] = [
    {
      time: '8:00am – 9:00am',
      title: 'Check-in & Registrations',
    },
    {
      time: '9:00am – 9:30am',
      title: 'Opening Ceremony',
    },
    {
      time: '9:30am – 11:00am',
      title: 'Keynote',
    },
    {
      time: '11:00am – 11:30am',
      title: 'TEA BREAK',
    },
    {
      time: '11:30am – 1:30pm',
      title: 'Session 1',
    },
    {
      time: '1:30pm – 2:30pm',
      title: 'LUNCH BREAK',
    },
    {
      time: '2:30pm – 4:30pm',
      title: 'Session 2',
    },
    {
      time: '4:30pm – 5:00pm',
      title: 'BREAK',
    },
    {
      time: '5:00pm – 5:30pm',
      title: 'Panel Discussion',
    },
    {
      time: '5:30pm – 6:00pm',
      title: 'Guest Felicitation and Closing Ceremony',
    },
  ];

  return (
    <section
      id="agenda"
      className="flex w-full max-w-full overflow-hidden flex-col items-center justify-center gap-8 p-5 py-12 sm:gap-10 sm:p-8 sm:py-16 md:p-10 lg:gap-16 lg:p-20 bg-[#D1E5CD] scroll-mt-20"
    >
      <div className="grid w-full grid-cols-1 items-start justify-start gap-8 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Heading, Subtitle & Action Button (matching reference) */}
        <div className="flex w-full flex-col items-start justify-start gap-4 lg:col-span-4 lg:sticky lg:top-28">
          <ScrollReveal variant="fade-left">
            <h2 className="font-sans w-full text-4xl leading-[105%] font-medium tracking-[-0.03em] text-[#23303E] sm:text-5xl">
              Featured Sessions
            </h2>
            <p className="mt-4 w-full font-sans text-base leading-[115%] font-light text-[#23303E] sm:text-xl sm:leading-[105%]">
              A full day of keynotes, technical deep dives, hands-on knowledge, and community conversations designed for builders at every stage.
            </p>
            <div className="mt-8 flex">
              <a
                href="/schedule"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenSchedule) {
                    onOpenSchedule();
                  } else {
                    router.push('/schedule');
                  }
                }}
                className="cursor-pointer shrink-0 items-center justify-center text-xs font-medium whitespace-nowrap transition-all flex h-11 min-h-11 rounded-none border-none bg-[#23303E] px-5 hover:bg-[#23303E]/80 flex-row gap-2"
              >
                <span className="font-mono text-sm tracking-[-0.02em] text-[#fafafa] uppercase sm:text-base">
                  Full Schedule
                </span>
                <ArrowUpRight className="h-5 w-5 text-[#fafafa] shrink-0" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Sessions List with Reference Styling */}
        <div className="flex w-full flex-col lg:col-span-8">
          {schedule.map((session, index) => {
            const isLast = index === schedule.length - 1;

            return (
              <ScrollReveal
                key={index}
                variant="fade-up"
                delay={Math.min(index * 40, 240)}
              >
                <div className="flex w-full flex-col">
                  <div className="grid w-full grid-cols-1 items-start justify-between gap-2 sm:grid-cols-12 sm:gap-6 py-1">
                    {/* Session Title & Time */}
                    <div className="sm:col-span-8 flex flex-col gap-1.5">
                      <h3 className="font-sans text-2xl font-medium text-[#23303E] sm:text-3xl leading-snug tracking-[-0.02em]">
                        {session.title}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-[#5A6C86] tracking-tight">
                        {session.time}
                      </p>
                    </div>

                    {/* Subtitle / Details / Parallel Sessions */}
                    {(session.subtitle || session.extra) && (
                      <div className="sm:col-span-4 flex flex-col sm:items-end justify-center gap-1 sm:text-right">
                        {session.subtitle && (
                          <p className="font-sans text-sm sm:text-base font-medium text-[#23303E]">
                            {session.subtitle}
                          </p>
                        )}
                        {session.extra && (
                          <p className="font-mono text-xs text-[#5A6C86]">
                            {session.extra}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Dark Divider Line Matching Reference */}
                  {!isLast && (
                    <div className="my-5 h-0.5 w-full bg-[#23303E]" />
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
