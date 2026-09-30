'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { AgendaSection } from '../components/AgendaSection';
import { SpeakersSection } from '../components/SpeakersSection';
import { TicketsSection } from '../components/TicketsSection';
import { WorkshopsSection } from '../components/WorkshopsSection';
import { SponsorsSection } from '../components/SponsorsSection';
import { FaqSection } from '../components/FaqSection';
import { FooterCtaSection } from '../components/FooterCtaSection';
import { RegisterSection } from '../components/RegisterSection';
import { Footer } from '../components/Footer';
import { NodeModal } from '../components/NodeModal';
import { TeamSection } from '../components/TeamSection';

export default function HomePage() {
  const router = useRouter();

  const [selectedNode, setSelectedNode] = useState<{
    title: string;
    category: string;
    description: string;
    icon: string;
  } | null>(null);

  const handleOpenRegister = () => {
    window.open('https://konfhub.com/aws-student-community-day-mysuru-2026', '_blank');
  };

  const navigateToSchedule = () => {
    router.push('/schedule');
  };

  const navigateToTeam = () => {
    router.push('/team');
  };

  const navigateToBadge = () => {
    router.push('/badge');
  };

  const navigateToHome = (hash?: string) => {
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        window.history.pushState({}, '', `#${targetId}`);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-clip text-[#222b38] selection:bg-[#00aa93]/30 selection:text-[#222b38] bg-[#EFF0F3]">
      {/* Navigation Header */}
      <Header
        onOpenRegister={handleOpenRegister}
        onNavigateHome={navigateToHome}
        onNavigateSchedule={navigateToSchedule}
        onNavigateTeam={navigateToTeam}
        onNavigateBadge={navigateToBadge}
        currentPath="/"
      />

      {/* Main Page Content matching Reference Flow */}
      <main className="w-full overflow-hidden">
        <HeroSection
          onOpenRegister={handleOpenRegister}
          onSelectNode={(node) => setSelectedNode(node)}
        />
        <AboutSection />
        <SpeakersSection />
        <TicketsSection />
        <WorkshopsSection onOpenRegister={handleOpenRegister} />
        <SponsorsSection />
        <AgendaSection onOpenSchedule={navigateToSchedule} />
        <TeamSection onOpenTeam={navigateToTeam} />
        <RegisterSection onOpenRegister={handleOpenRegister} />
        <FaqSection />
        <FooterCtaSection onOpenRegister={handleOpenRegister} />
      </main>

      {/* Footer */}
      <Footer
        onNavigateHome={navigateToHome}
        onNavigateSchedule={navigateToSchedule}
        onNavigateTeam={navigateToTeam}
        onNavigateBadge={navigateToBadge}
      />

      {/* Node Details Modal */}
      <NodeModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
}
