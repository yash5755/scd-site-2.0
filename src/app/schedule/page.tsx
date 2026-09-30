'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';
import { SchedulePage } from '../../components/SchedulePage';
import { Footer } from '../../components/Footer';

export default function ScheduleRoute() {
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
        onNavigateSchedule={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateTeam={() => router.push('/team')}
        onNavigateBadge={() => router.push('/badge')}
        currentPath="/schedule"
      />
      <SchedulePage onNavigateHome={() => navigateToHome()} />
      <Footer
        onNavigateHome={navigateToHome}
        onNavigateSchedule={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateTeam={() => router.push('/team')}
        onNavigateBadge={() => router.push('/badge')}
      />
    </div>
  );
}
