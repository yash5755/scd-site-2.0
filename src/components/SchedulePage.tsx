'use client';

import React, { useState } from 'react';
import { ChevronDown, Linkedin, ArrowLeft } from 'lucide-react';

interface SpeakerInfo {
  name: string;
  role?: string;
  company?: string;
  image: string;
  linkedin?: string;
}

interface ScheduleRow {
  id: string;
  time: string;
  title: string;
  isBreak?: boolean;
  tracks: string[]; // ['MAIN STAGE', 'TRACK 1', etc.]
  description?: string;
  extra?: string;
  speakers?: SpeakerInfo[];
}

interface SchedulePageProps {
  onNavigateHome: () => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ onNavigateHome }) => {
  const [activeTab, setActiveTab] = useState<string>('MAIN STAGE');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const tabs = ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'];

  const scheduleData: ScheduleRow[] = [
    {
      id: 'item-1',
      time: '8:00am – 9:00am',
      title: 'Check-in & Registrations',
      isBreak: true,
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
    {
      id: 'item-2',
      time: '9:00am – 9:30am',
      title: 'Opening Ceremony',
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
    {
      id: 'item-3',
      time: '9:30am – 11:00am',
      title: 'Keynote',
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
    {
      id: 'item-4',
      time: '11:00am – 11:30am',
      title: 'TEA BREAK',
      isBreak: true,
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
    {
      id: 'item-5',
      time: '11:30am – 1:30pm',
      title: 'Session 1',
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
    {
      id: 'item-6',
      time: '1:30pm – 2:30pm',
      title: 'LUNCH BREAK',
      isBreak: true,
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
    {
      id: 'item-7',
      time: '2:30pm – 4:30pm',
      title: 'Session 2',
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
    {
      id: 'item-8',
      time: '4:30pm – 5:00pm',
      title: 'BREAK',
      isBreak: true,
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
    {
      id: 'item-9',
      time: '5:00pm – 5:30pm',
      title: 'Panel Discussion',
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
    {
      id: 'item-10',
      time: '5:30pm – 6:00pm',
      title: 'Guest Felicitation and Closing Ceremony',
      tracks: ['MAIN STAGE', 'TRACK 1', 'TRACK 2', 'WORKSHOPS'],
    },
  ];

  const filteredSchedule = scheduleData.filter((item) =>
    item.tracks.includes(activeTab)
  );

  const toggleRow = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#EFF0F3] text-[#23303E]">
      <main className="flex w-full flex-col items-start justify-start p-5 pt-28 pb-16 sm:p-8 sm:pt-32 sm:pb-20 md:p-10 md:pt-36 lg:p-20 lg:pt-40 bg-[#EFF0F3]">
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
        <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#23303E] leading-[0.98] tracking-[-0.045em] font-normal">
          Schedule
        </h1>
        <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-[#23303E] leading-[1.1] max-w-3xl font-light">
          From inspiring keynotes and technical deep dives to hands-on discussions and networking, explore everything happening at AWS Student Community Day Mysuru 2026.
        </p>

        {/* Track Selection Tabs Bar */}
        <div className="flex w-full items-center justify-start gap-0 py-6 overflow-x-auto mt-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer shrink-0 items-center justify-center text-xs font-mono uppercase tracking-[-0.02em] whitespace-nowrap transition-all flex h-11 px-5 rounded-none border border-[#23303E] sm:text-base ${
                  isActive
                    ? 'bg-[#23303E] text-[#FAFAFA]'
                    : 'bg-transparent text-[#23303E] hover:bg-[#23303E]/20'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Schedule Table Container */}
        <div className="w-full border border-[#A3A7AA] bg-[#EFF0F3] mt-2">
          {/* Table Header Row (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-2 w-full border-b border-[#A3A7AA]">
            <div className="col-span-2 px-4 py-5 font-mono text-xs tracking-[1.5px] text-[#5A6C86] uppercase">
              TIME
            </div>
            <div className="col-span-6 px-4 py-5 font-mono text-xs tracking-[1.5px] text-[#5A6C86] uppercase">
              SESSION
            </div>
            <div className="col-span-4 px-4 py-5 font-mono text-xs tracking-[1.5px] text-[#5A6C86] uppercase">
              SPEAKERS
            </div>
          </div>

          {/* Session Rows */}
          {filteredSchedule.map((row, index) => {
            const isExpanded = expandedRowId === row.id;
            const isLast = index === filteredSchedule.length - 1;
            const hasDetails = !row.isBreak;

            return (
              <div
                key={row.id}
                className={`w-full ${!isLast ? 'border-b border-[#A3A7AA]' : ''} ${
                  row.isBreak ? 'bg-[#A3A7AA]' : 'bg-[#EFF0F3]'
                }`}
              >
                {/* Row Header */}
                <div
                  onClick={() => toggleRow(row.id)}
                  className={`grid w-full grid-cols-1 md:grid-cols-12 md:items-center md:gap-2 p-4 md:p-0 transition-colors select-none ${
                    row.isBreak
                      ? 'cursor-pointer hover:bg-[#979ba0]'
                      : 'cursor-pointer hover:bg-[#23303E]/5'
                  }`}
                >
                  {/* Time Column */}
                  <div className="md:col-span-2 md:px-4 md:py-5 font-mono text-sm md:text-base text-[#23303E] md:text-[#5A6C86]">
                    {row.time}
                  </div>

                  {/* Title Column */}
                  <div className="md:col-span-6 md:px-4 md:py-5 font-mono text-base font-medium text-[#23303E] uppercase mt-1 md:mt-0">
                    {row.title}
                  </div>

                  {/* Speakers / Chevron Column */}
                  <div className="md:col-span-4 md:px-4 md:py-5 flex items-center justify-between md:justify-between gap-3 mt-3 md:mt-0">
                    {/* Avatars Preview */}
                    <div className="flex items-center gap-1.5">
                      {row.speakers && row.speakers.length > 0 ? (
                        row.speakers.map((sp, idx) => (
                          <div
                            key={idx}
                            className="aspect-square size-10 shrink-0 overflow-hidden bg-[#23303E]/10 border border-[#23303E]/20"
                          >
                            <img
                              src={sp.image}
                              alt={sp.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))
                      ) : row.extra ? (
                        <span className="font-mono text-xs text-[#23303E]/70 uppercase">
                          {row.extra}
                        </span>
                      ) : !row.isBreak ? (
                        <span className="font-mono text-xs text-[#23303E]/50 uppercase">
                          Speaker TBA
                        </span>
                      ) : null}
                    </div>

                    {/* Chevron Toggle Icon */}
                    <div className="flex items-center text-[#23303E] pr-2">
                      <ChevronDown
                        className={`size-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded Accordion Content */}
                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-12 md:gap-2 p-4 pt-0 md:p-0 border-t border-[#A3A7AA]/50 pb-5">
                    {/* Time Offset Column */}
                    <div className="hidden md:block md:col-span-2" />

                    {/* Description Column */}
                    <div className="md:col-span-6 md:px-4 md:py-4 font-mono text-sm text-[#23303E] whitespace-pre-line leading-relaxed">
                      <p>{row.description}</p>
                    </div>

                    {/* Speaker Profiles Column */}
                    <div className="md:col-span-4 md:px-4 md:py-4 flex flex-col gap-4">
                      {row.speakers && row.speakers.length > 0 ? (
                        row.speakers.map((speaker, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {speaker.image ? (
                                <div className="aspect-square size-10 shrink-0 overflow-hidden bg-[#23303E]/10 border border-[#23303E]/20">
                                  <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : null}
                              <div className="flex flex-col">
                                <span className="font-mono text-sm tracking-[0.02em] text-[#23303E] uppercase font-medium">
                                  {speaker.name}
                                </span>
                                {speaker.company && (
                                  <span className="font-mono text-xs tracking-[0.02em] text-[#5A6C86] uppercase">
                                    {speaker.company}
                                  </span>
                                )}
                              </div>
                            </div>

                            {speaker.linkedin && (
                              <a
                                href={speaker.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`LinkedIn for ${speaker.name}`}
                                className="bg-[#EEF0F3] border border-[#23303E]/20 size-8 flex items-center justify-center text-[#23303E] hover:bg-[#23303E] hover:text-[#FAFAFA] transition-colors shrink-0"
                              >
                                <Linkedin className="size-4" />
                              </a>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="font-mono text-xs text-[#5A6C86] uppercase">
                          {row.isBreak ? 'General Session' : 'Speakers / Mentors TBA'}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
