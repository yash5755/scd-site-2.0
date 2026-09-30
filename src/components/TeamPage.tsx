'use client';

import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { teamMembers, TeamCard } from './TeamSection';

interface TeamPageProps {
  onNavigateHome: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#EFF0F3] text-[#23303E]">
      <main className="mx-auto w-full max-w-[1720px] px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 md:px-10 md:pt-36 lg:px-20 lg:pt-40">
        {/* Back Link */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="mb-8 flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#5A6C86] hover:text-[#23303E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        {/* Page Title & Subtitle Matching Reference */}
        <div className="max-w-3xl">
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#23303E] leading-[0.98] tracking-[-0.045em] font-medium">
            <span>Meet the Team</span>
            <br />
            <span>Behind the Experience</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-[#23303E] leading-[1.1] font-light">
            Behind every keynote, workshop, and community moment is a team committed to creating an unforgettable experience for every attendee.
          </p>
        </div>

        {/* Team Grid with Blank Placeholder Cards */}
        <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="w-full">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
