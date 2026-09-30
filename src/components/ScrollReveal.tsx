'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in';
  delay?: number; // in milliseconds
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setIsVisible(true);
      return;
    }

    // Safety fallback: ensure content becomes visible within 150ms if observer is slow or blocked on localhost
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return () => clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
          clearTimeout(fallbackTimer);
        }
      },
      { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      if (el) observer.unobserve(el);
    };
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case 'fade-left':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-4';
      case 'fade-right':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-4';
      case 'zoom-in':
        return isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95';
      case 'fade-up':
      default:
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-full ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
};

