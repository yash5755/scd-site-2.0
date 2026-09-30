'use client';

import React from 'react';
import { GraduationCap, Terminal, Users, Briefcase, Heart, Gift } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const WhyAttendSection: React.FC = () => {
  const reasons = [
    {
      num: '01',
      title: 'Learn from Experts',
      desc: 'Talks from AWS Heroes, Community Builders, and senior engineers shipping real-world cloud systems.',
      icon: GraduationCap,
    },
    {
      num: '02',
      title: 'Hands-on Workshops',
      desc: 'Bring your laptop. Leave with working code across serverless, AI, containers, and more.',
      icon: Terminal,
    },
    {
      num: '03',
      title: 'Networking',
      desc: 'Meet the local cloud community — engineers, founders, students, and hiring teams.',
      icon: Users,
    },
    {
      num: '04',
      title: 'Career Opportunities',
      desc: 'Connect with sponsor booths hiring across cloud, ML, DevOps, and platform roles.',
      icon: Briefcase,
    },
    {
      num: '05',
      title: 'Community',
      desc: 'A welcoming, community-run event. First timers and students strongly encouraged.',
      icon: Heart,
    },
    {
      num: '06',
      title: 'Swag & Giveaways',
      desc: 'Surprise drops and more from AWS throughout the day.',
      icon: Gift,
    },
  ];

  return (
    <section id="why" className="relative py-24 sm:py-32 bg-[#222b38]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <header className="max-w-3xl">
            <h2 className="font-serif text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
              Six good reasons. <span className="text-[#64748b]">One extraordinary day.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#64748b] sm:text-lg">
              From your first Lambda to your next architecture decision — there's a room for every stage of your cloud journey.
            </p>
          </header>
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.num} variant="fade-up" delay={idx * 100}>
                <div className="group relative overflow-hidden bg-[#2c3746] border border-[#3a4759]/50 p-7 transition-all duration-300 hover:border-[#01c1ac]/20">
                  {/* Subtle glow on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-40"
                    style={{ background: 'radial-gradient(circle, rgba(134, 239, 172, 0.15), transparent 70%)' }}
                  ></div>

                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-10 w-10 place-items-center border border-[#3a4759] transition-colors duration-300 group-hover:border-[#01c1ac]/30"
                    >
                      <Icon className="h-5 w-5 text-[#01c1ac]" />
                    </div>
                    <span className="font-tech text-[10px] uppercase tracking-widest text-[#94a3b8]">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
