'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';
import { TeamPage } from '../../components/TeamPage';
import { Footer } from '../../components/Footer';

export default function TeamRoute() {
  const router = useRouter();

  const handleOpenRegister = () => {
    window.open('https://konfhub.com/aws-student-community-day-mysuru-2026', '_blank');
  };

  const navigateToHome = (hash?: string) => {
    if (hash) {
      router.push(`/${hash}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-clip text-[#222b38] selection:bg-[#00aa93]/30 selection:text-[#222b38] bg-[#EFF0F3]">
      <Header
        onOpenRegister={handleOpenRegister}
        onNavigateHome={navigateToHome}
        onNavigateSchedule={() => router.push('/schedule')}
        onNavigateTeam={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateBadge={() => router.push('/badge')}
        currentPath="/team"
      />
      <TeamPage onNavigateHome={() => navigateToHome()} />
      <Footer
        onNavigateHome={navigateToHome}
        onNavigateSchedule={() => router.push('/schedule')}
        onNavigateTeam={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateBadge={() => router.push('/badge')}
      />
    </div>
  );
}
