'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenRegister?: () => void;
  onNavigateHome?: (hash?: string) => void;
  onNavigateSchedule?: () => void;
  onNavigateTeam?: () => void;
  onNavigateBadge?: () => void;
  currentPath?: string;
}

const cyclingWords = ['AI/ML', 'Data', 'DevOps', 'Cloud', 'Security', 'Serverless', 'Containers'];

export const Header: React.FC<HeaderProps> = ({
  onOpenRegister,
  onNavigateHome,
  onNavigateSchedule,
  onNavigateTeam,
  onNavigateBadge,
  currentPath: currentPathProp,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = currentPathProp || pathname || '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % cyclingWords.length);
        setWordVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  // ScrollSpy to track active homepage section
  useEffect(() => {
    if (currentPath !== '/') {
      if (currentPath === '/schedule') setActiveSection('schedule');
      else if (currentPath === '/team') setActiveSection('team');
      else if (currentPath === '/badge') setActiveSection('badge');
      else setActiveSection('');
      return;
    }

    const sections: { id: string; key: string }[] = [
      { id: 'about', key: 'about' },
      { id: 'speakers', key: 'speakers' },
      { id: 'tickets', key: 'tickets' },
      { id: 'workshops', key: 'workshops' },
      { id: 'sponsors', key: 'sponsors' },
      { id: 'agenda', key: 'schedule' },
      { id: 'team', key: 'team' },
      { id: 'faq', key: 'faq' },
    ];

    const handleScrollSpy = () => {
      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sections[i].key);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [currentPath]);

  const navItems = [
    { label: 'About', key: 'about', href: '#about' },
    { label: 'Speakers', key: 'speakers', href: '#speakers' },
    { label: 'Tickets', key: 'tickets', href: '#tickets' },
    { label: 'Sponsors', key: 'sponsors', href: '#sponsors' },
    { label: 'Workshops', key: 'workshops', href: '#workshops' },
    { label: 'Schedule', key: 'schedule', href: '#agenda' },
    { label: 'Team', key: 'team', href: '#team' },
    { label: 'FAQ', key: 'faq', href: '#faq' },
    { label: 'Badge', key: 'badge', href: '/badge' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { label: string; key: string; href: string }
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.href === '/badge') {
      if (onNavigateBadge) onNavigateBadge();
      else router.push('/badge');
      return;
    }

    if (item.href === '/schedule') {
      if (onNavigateSchedule) onNavigateSchedule();
      else router.push('/schedule');
      return;
    }

    if (item.href === '/team') {
      if (onNavigateTeam) onNavigateTeam();
      else router.push('/team');
      return;
    }

    const targetId = item.href.replace(/^#/, '').replace(/^\//, '');

    if (currentPath !== '/') {
      if (onNavigateHome) {
        onNavigateHome(`#${targetId}`);
      } else {
        router.push(`/#${targetId}`);
      }
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState({}, '', `#${targetId}`);
    }
  };

  const isItemActive = (key: string, href: string) => {
    if (currentPath === '/badge' && href === '/badge') return true;
    if (currentPath === '/schedule' && (href === '/schedule' || href === '#agenda')) return true;
    if (currentPath === '/team' && (href === '/team' || href === '#team')) return true;
    if (currentPath === '/') {
      return activeSection === key;
    }
    return false;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#EFF0F3]/95 backdrop-blur-md border-b border-[#CBD2DC]/60 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-20 max-w-[1720px] items-center justify-between px-5 sm:px-8 md:px-10 lg:px-20"
      >
        {/* Logo / Brand */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) {
              onNavigateHome();
            } else if (currentPath === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              router.push('/');
            }
          }}
          className="flex items-center gap-3 group cursor-pointer shrink-0"
        >
          <img
            src="/aws_logo_dark.svg"
            alt="AWS"
            className="h-9 w-auto object-contain shrink-0"
          />
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-[#23303E]">
              COMMUNITY DAY
            </span>
            <span className="text-[10px] uppercase tracking-wider mt-0.5 flex items-center gap-1 text-[#23303E]/70">
              MYSURU 2026
              <span className="text-[#01c1ac] mx-0.5">·</span>
              <span
                className="font-bold"
                style={{
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible ? 'translateY(0px)' : 'translateY(-4px)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                  display: 'inline-block',
                  color: '#01c1ac',
                }}
              >
                {cyclingWords[wordIndex]}
              </span>
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navItems.map((item) => {
            const active = isItemActive(item.key, item.href);
            return (
              <li key={item.key}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative py-1.5 text-sm font-medium transition-colors cursor-pointer select-none ${
                    active
                      ? 'text-[#01c1ac] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#01c1ac]'
                      : 'text-[#23303E] hover:text-[#01c1ac]'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-none border border-[#23303E]/20 text-[#23303E] hover:bg-[#23303E]/5 lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 z-40 border-b border-[#CBD2DC]/60 bg-[#EFF0F3]/98 backdrop-blur-md px-6 py-6 shadow-xl lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isItemActive(item.key, item.href);
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`block px-4 py-3 text-base font-medium rounded-none transition-colors ${
                      active
                        ? 'bg-[#01c1ac]/10 text-[#01c1ac] font-bold border-l-4 border-[#01c1ac]'
                        : 'text-[#23303E] hover:bg-[#23303E]/5 hover:text-[#01c1ac]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-3 mt-2 border-t border-[#CBD2DC]/60">
              <a
                href="https://konfhub.com/aws-student-community-day-mysuru-2026"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenRegister) onOpenRegister();
                }}
                className="block w-full text-center bg-[#23303E] text-white px-5 py-3 text-sm font-bold uppercase tracking-wider rounded-none hover:bg-[#23303E]/90 transition-colors"
              >
                GET TICKETS
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
