'use client';

import React, { useState } from 'react';
import { Users, ShieldCheck, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface Member {
  title: string;
  subtitle: string;
}

export const OrganizersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faculty' | 'crew'>('faculty');

  const faculty: Member[] = [
    { title: 'To Be Announced', subtitle: 'Faculty Advisor · VVCE' },
    { title: 'To Be Announced', subtitle: 'Faculty Advisor · VVCE' },
    { title: 'To Be Announced', subtitle: 'Faculty Coordinator · VVCE' },
    { title: 'To Be Announced', subtitle: 'Faculty Coordinator · VVCE' },
  ];

  const crew: Member[] = [
    { title: 'To Be Announced', subtitle: 'AWS Student Builder Group VVCE' },
    { title: 'To Be Announced', subtitle: 'AWS Student Builder Group VVCE' },
    { title: 'To Be Announced', subtitle: 'AWS Student Builder Group VVCE' },
    { title: 'To Be Announced', subtitle: 'AWS Student Builder Group VVCE' },
  ];

  const currentList = activeTab === 'faculty' ? faculty : crew;

  return (
    <section id="organizers" className="relative py-24 sm:py-32 bg-[#222b38]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <header className="max-w-3xl">
            <h2 className="font-serif text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
              Meet the team behind the vision
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#64748b] sm:text-lg">
              Organized by AWS Student Builder Group VVCE with guidance from faculty mentors.
            </p>
          </header>
        </ScrollReveal>

        {/* Tab Switcher */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-5 py-2.5 font-tech text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer border ${
                activeTab === 'faculty'
                  ? 'bg-[#ffffff] text-[#222b38] border-[#ffffff]'
                  : 'bg-transparent text-[#64748b] border-[#3a4759] hover:border-[#01c1ac]/40 hover:text-[#ffffff]'
              }`}
            >
              Faculty Advisors
            </button>

            <button
              onClick={() => setActiveTab('crew')}
              className={`px-5 py-2.5 font-tech text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer border ${
                activeTab === 'crew'
                  ? 'bg-[#ffffff] text-[#222b38] border-[#ffffff]'
                  : 'bg-transparent text-[#64748b] border-[#3a4759] hover:border-[#01c1ac]/40 hover:text-[#ffffff]'
              }`}
            >
              Student Crew
            </button>
          </div>
        </ScrollReveal>

        {/* TBA Organizers Banner */}
        <ScrollReveal variant="fade-up" delay={150}>
          <div className="mt-8 border border-[#01c1ac]/20 bg-[#01c1ac]/5 p-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[#01c1ac] shrink-0" />
            <p className="text-sm text-[#64748b]">
              Faculty advisor and student crew details for <strong className="text-white">AWS Student Community Day Mysuru 2026</strong> will be announced soon.
            </p>
          </div>
        </ScrollReveal>

        {/* Members Grid */}
        <div className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {currentList.map((member, idx) => (
            <ScrollReveal key={idx} variant="fade-up" delay={idx * 100}>
              <div
                className="group relative overflow-hidden bg-[#2c3746] border border-[#3a4759]/50 p-6 transition-all duration-300 hover:border-[#01c1ac]/20 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between border-b border-[#3a4759]/50 pb-4 mb-4">
                  <div className="grid h-10 w-10 place-items-center bg-[#222b38] border border-[#3a4759]/50 text-[#01c1ac]">
                    {activeTab === 'faculty' ? <ShieldCheck className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                  </div>
                  <span className="font-tech text-[10px] uppercase tracking-widest text-[#01c1ac]/80 bg-[#01c1ac]/10 px-2.5 py-1 border border-[#01c1ac]/20">
                    TBA
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-[#01c1ac] transition-colors">
                    {member.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#64748b]">{member.subtitle}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#3a4759]/50 font-tech text-[10px] uppercase tracking-widest text-[#94a3b8]">
                  // Details Coming Soon
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
