'use client';

import { useEffect } from 'react';

interface ScrollbarTheme {
  thumb: [number, number, number];
  thumbHover: [number, number, number];
  track: [number, number, number, number];
}

// Brand color themes matching website sections
const THEMES: Record<string, ScrollbarTheme> = {
  // Hero (Teal/Green radial gradient) -> Bright Lime thumb (#a2e048)
  hero: {
    thumb: [162, 224, 72],
    thumbHover: [0, 223, 192],
    track: [0, 35, 50, 0.35],
  },
  // About (Light Grey #EFF0F3) -> Dark Navy thumb (#23303E)
  about: {
    thumb: [35, 48, 62],
    thumbHover: [0, 170, 147],
    track: [35, 48, 62, 0.08],
  },
  // Speakers (Dark Navy #23303E) -> Mint thumb (#00DFC0)
  speakers: {
    thumb: [0, 223, 192],
    thumbHover: [162, 224, 72],
    track: [255, 255, 255, 0.08],
  },
  // Tickets (Sage Green #D1E5CD) -> Dark Navy thumb (#23303E)
  tickets: {
    thumb: [35, 48, 62],
    thumbHover: [0, 170, 147],
    track: [35, 48, 62, 0.12],
  },
  // Workshops (Dark Navy #23303E) -> Sage Green thumb (#D1E5CD)
  workshops: {
    thumb: [209, 229, 205],
    thumbHover: [0, 223, 192],
    track: [255, 255, 255, 0.08],
  },
  // Sponsors (White #ffffff) -> Dark Navy thumb (#23303E)
  sponsors: {
    thumb: [35, 48, 62],
    thumbHover: [0, 170, 147],
    track: [35, 48, 62, 0.08],
  },
  // Agenda (Sage Green #D1E5CD) -> Dark Navy thumb (#23303E)
  agenda: {
    thumb: [35, 48, 62],
    thumbHover: [0, 170, 147],
    track: [35, 48, 62, 0.12],
  },
  // Team (Dark Navy #23303E) -> Mint thumb (#00DFC0)
  team: {
    thumb: [0, 223, 192],
    thumbHover: [162, 224, 72],
    track: [255, 255, 255, 0.08],
  },
  // Venue / Register (Dark Navy #23303E) -> Sage thumb (#D1E5CD)
  venue: {
    thumb: [209, 229, 205],
    thumbHover: [0, 223, 192],
    track: [255, 255, 255, 0.08],
  },
  // FAQ (Light Grey #EFF0F3) -> Dark Navy thumb (#23303E)
  faq: {
    thumb: [35, 48, 62],
    thumbHover: [0, 170, 147],
    track: [35, 48, 62, 0.08],
  },
  // Footer CTA (Light Grey #E8EBEF) -> Dark Navy thumb (#23303E)
  'footer-cta': {
    thumb: [35, 48, 62],
    thumbHover: [0, 170, 147],
    track: [35, 48, 62, 0.08],
  },
  // Footer (Dark Navy #23303E) -> Mint thumb (#00DFC0)
  footer: {
    thumb: [0, 223, 192],
    thumbHover: [162, 224, 72],
    track: [255, 255, 255, 0.08],
  },
  // Fallbacks for other pages/views
  defaultDark: {
    thumb: [0, 223, 192],
    thumbHover: [162, 224, 72],
    track: [255, 255, 255, 0.08],
  },
  defaultLight: {
    thumb: [35, 48, 62],
    thumbHover: [0, 170, 147],
    track: [35, 48, 62, 0.08],
  },
};

export const DynamicScrollbar: React.FC = () => {
  useEffect(() => {
    let currentThumb = [...THEMES.hero.thumb];
    let currentThumbHover = [...THEMES.hero.thumbHover];
    let currentTrack = [...THEMES.hero.track];

    let targetTheme = THEMES.hero;
    let animFrame: number | null = null;

    const applyStyles = () => {
      const thumbRgb = `rgb(${Math.round(currentThumb[0])}, ${Math.round(currentThumb[1])}, ${Math.round(currentThumb[2])})`;
      const hoverRgb = `rgb(${Math.round(currentThumbHover[0])}, ${Math.round(currentThumbHover[1])}, ${Math.round(currentThumbHover[2])})`;
      const trackRgba = `rgba(${Math.round(currentTrack[0])}, ${Math.round(currentTrack[1])}, ${Math.round(currentTrack[2])}, ${currentTrack[3].toFixed(2)})`;

      const root = document.documentElement;
      root.style.setProperty('--scrollbar-thumb', thumbRgb);
      root.style.setProperty('--scrollbar-thumb-hover', hoverRgb);
      root.style.setProperty('--scrollbar-track', trackRgba);
      root.style.scrollbarColor = `${thumbRgb} ${trackRgba}`;
    };

    const animate = () => {
      const speed = 0.14; // Smooth ~250ms transition
      let diff = 0;

      for (let i = 0; i < 3; i++) {
        const dThumb = targetTheme.thumb[i] - currentThumb[i];
        const dHover = targetTheme.thumbHover[i] - currentThumbHover[i];
        const dTrack = targetTheme.track[i] - currentTrack[i];
        currentThumb[i] += dThumb * speed;
        currentThumbHover[i] += dHover * speed;
        currentTrack[i] += dTrack * speed;
        diff += Math.abs(dThumb) + Math.abs(dHover) + Math.abs(dTrack);
      }

      const dTrackA = targetTheme.track[3] - currentTrack[3];
      currentTrack[3] += dTrackA * speed;
      diff += Math.abs(dTrackA) * 100;

      applyStyles();

      if (diff > 0.8) {
        animFrame = requestAnimationFrame(animate);
      } else {
        currentThumb = [...targetTheme.thumb];
        currentThumbHover = [...targetTheme.thumbHover];
        currentTrack = [...targetTheme.track];
        applyStyles();
        animFrame = null;
      }
    };

    const setTargetTheme = (theme: ScrollbarTheme) => {
      if (targetTheme === theme) return;
      targetTheme = theme;
      if (!animFrame) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    const detectActiveSection = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Top of page
      if (scrollY <= 50) {
        setTargetTheme(THEMES.hero);
        return;
      }

      // Bottom of page
      if (scrollY + windowHeight >= docHeight - 50) {
        setTargetTheme(THEMES.footer);
        return;
      }

      // Evaluation probe line at 45% of viewport
      const targetY = windowHeight * 0.45;

      const registeredSections: { key: string; el: HTMLElement }[] = [];

      // Hero
      const hero = document.getElementById('hero') || document.querySelector('section');
      if (hero) registeredSections.push({ key: 'hero', el: hero });

      // Core sections by ID
      const ids = ['about', 'speakers', 'tickets', 'workshops', 'sponsors', 'agenda', 'team', 'venue', 'faq'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) registeredSections.push({ key: id, el });
      }

      // Footer CTA
      const footerCta = document.querySelector('section img[src*="footer-cta"]')?.closest('section');
      if (footerCta) registeredSections.push({ key: 'footer-cta', el: footerCta as HTMLElement });

      // Footer
      const footer = document.querySelector('footer');
      if (footer) registeredSections.push({ key: 'footer', el: footer as HTMLElement });

      // Find section spanning probe line
      for (const item of registeredSections) {
        const rect = item.el.getBoundingClientRect();
        if (rect.top <= targetY && rect.bottom > targetY) {
          const theme = THEMES[item.key];
          if (theme) {
            setTargetTheme(theme);
            return;
          }
        }
      }

      // Fallback: probe DOM element at center
      const probeEl = document.elementFromPoint(window.innerWidth / 2, targetY);
      if (probeEl) {
        let curr: HTMLElement | null = probeEl as HTMLElement;
        let bg = '';
        while (curr && curr !== document.body && curr !== document.documentElement) {
          const style = window.getComputedStyle(curr);
          const color = style.backgroundColor;
          if (color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)') {
            bg = color;
            break;
          }
          curr = curr.parentElement;
        }

        const match = bg.match(/\d+/g);
        if (match && match.length >= 3) {
          const [r, g, b] = match.map(Number);
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          setTargetTheme(lum < 0.5 ? THEMES.defaultDark : THEMES.defaultLight);
          return;
        }
      }

      setTargetTheme(THEMES.defaultDark);
    };

    // Initial setup
    applyStyles();
    detectActiveSection();

    window.addEventListener('scroll', detectActiveSection, { passive: true });
    window.addEventListener('resize', detectActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', detectActiveSection);
      window.removeEventListener('resize', detectActiveSection);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  return null;
};
