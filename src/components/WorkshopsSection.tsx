'use client';

import React from 'react';
import { Terminal, Clock, Laptop, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface WorkshopsSectionProps {
  onOpenRegister?: () => void;
}

export const WorkshopsSection: React.FC<WorkshopsSectionProps> = ({ onOpenRegister }) => {
  const workshops = [
    {
      title: 'Building Generative AI Applications with Amazon Bedrock',
      duration: '2.5 Hours',
      level: 'Intermediate',
      prerequisites: 'Laptop with AWS Account / CLI configured',
      desc: 'Step-by-step hands-on guide to building multi-agent RAG (Retrieval-Augmented Generation) applications using Claude 3, Bedrock Knowledge Bases, and LangChain.',
      instructor: 'AWS GenAI Community Leads',
      tag: 'GenAI & LLMs',
    },
    {
      title: 'Kubernetes on AWS: Deploying & Scaling Elastic Microservices',
      duration: '2 Hours',
      level: 'Advanced',
      prerequisites: 'Docker basics & basic Terminal experience',
      desc: 'Set up an Amazon EKS cluster, configure Helm charts, deploy microservices, and configure autoscaling with Karpenter and Prometheus monitoring.',
      instructor: 'Container Solutions Engineers',
      tag: 'Cloud & Containers',
    },
  ];

  return (
    <section
      id="workshops"
      className="relative w-full max-w-full overflow-hidden bg-[#23303E] p-5 py-16 sm:p-8 sm:py-20 md:p-10 lg:p-20 lg:py-24 scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1720px]">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <header className="max-w-4xl">
            <h2 className="font-sans text-4xl sm:text-5xl font-medium tracking-[-0.03em] text-[#FAFAFA] leading-[105%]">
              Build real projects in{' '}
              <span className="text-[#D1E5CD]">hands-on sessions.</span>
            </h2>
            <p className="mt-4 font-sans text-base sm:text-xl font-light leading-[125%] text-[#FAFAFA]/80 max-w-3xl">
              Bring your laptop and code side-by-side with AWS experts. Walk away with working cloud projects.
            </p>
          </header>
        </ScrollReveal>

        {/* Workshop Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {workshops.map((ws, idx) => (
            <ScrollReveal key={idx} variant="fade-up" delay={idx * 150}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden bg-[#D1E5CD] rounded-none border border-[#23303E]/10 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
                <div>
                  {/* Header Row: Tag & Duration */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center bg-[#23303E] text-[#D1E5CD] px-3.5 py-1 font-mono text-xs font-medium uppercase tracking-wider rounded-none">
                      {ws.tag}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-xs sm:text-sm text-[#23303E]/80 font-medium">
                      <Clock className="h-4 w-4 text-[#23303E]" />
                      {ws.duration}
                    </span>
                  </div>

                  {/* Workshop Title */}
                  <h3 className="mt-6 font-sans text-2xl sm:text-3xl font-medium text-[#23303E] tracking-[-0.02em] leading-snug">
                    {ws.title}
                  </h3>

                  {/* Workshop Description */}
                  <p className="mt-4 font-sans text-base leading-relaxed text-[#23303E]/85 font-light">
                    {ws.desc}
                  </p>

                  {/* Details: Prerequisites & Instructor */}
                  <div className="mt-8 space-y-3 pt-6 border-t border-[#23303E]/20 text-sm text-[#23303E]/90 font-sans">
                    <div className="flex items-center gap-2.5">
                      <Laptop className="h-4 w-4 text-[#23303E] shrink-0" />
                      <span>
                        <strong className="font-semibold text-[#23303E]">Requirements:</strong>{' '}
                        {ws.prerequisites}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Terminal className="h-4 w-4 text-[#23303E] shrink-0" />
                      <span>
                        <strong className="font-semibold text-[#23303E]">Instructor:</strong>{' '}
                        {ws.instructor}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Area: Level & Reserve Seat CTA */}
                <div className="mt-8 pt-6 border-t border-[#23303E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#23303E]/70 uppercase tracking-widest font-medium">
                    Level: {ws.level}
                  </span>
                  <a
                    href="https://konfhub.com/aws-student-community-day-mysuru-2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (onOpenRegister) onOpenRegister();
                    }}
                    className="group/btn inline-flex items-center justify-center gap-2 bg-[#23303E] hover:bg-[#1A242F] text-[#FAFAFA] font-mono text-xs sm:text-sm uppercase tracking-wider px-6 h-11 transition-all rounded-none cursor-pointer text-center"
                  >
                    <span>Reserve Seat</span>
                    <ArrowRight className="h-4 w-4 text-[#FAFAFA] transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

