'use client';

import React, { useState, useRef } from 'react';
import { Download, Share2, Sparkles, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScrollReveal } from './ScrollReveal';

export const BadgeSection: React.FC = () => {
  const [name, setName] = useState('Alex Developer');
  const [role, setRole] = useState('Cloud Enthusiast');
  const [company, setCompany] = useState('Vidyavardhaka College of Engineering');
  const [photo, setPhoto] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhoto(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#01c1ac', '#00728f', '#00DF89', '#ffffff'],
    });
  };

  const handleDownload = () => {
    triggerConfetti();

    // Create high-res canvas (600x800 for crisp export)
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      alert(`Badge generated for ${name}!`);
      return;
    }

    // 1. Background Gradient (Deep Navy to Teal)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, 800);
    bgGradient.addColorStop(0, '#2c3746');
    bgGradient.addColorStop(0.5, '#222b38');
    bgGradient.addColorStop(1, '#2c3746');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 600, 800);

    // 2. Decorative Glow Orbs (Teal/Green)
    const orb1 = ctx.createRadialGradient(300, 150, 10, 300, 150, 250);
    orb1.addColorStop(0, 'rgba(45, 212, 191, 0.4)');
    orb1.addColorStop(0.6, 'rgba(134, 239, 172, 0.15)');
    orb1.addColorStop(1, 'transparent');
    ctx.fillStyle = orb1;
    ctx.fillRect(0, 0, 600, 800);

    // 3. Border Frame
    ctx.strokeStyle = '#01c1ac';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, 568, 768);

    ctx.strokeStyle = 'rgba(45, 212, 191, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(24, 24, 552, 752);

    // 4. Header Bar Text
    ctx.fillStyle = '#01c1ac';
    ctx.font = 'bold 16px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('COMMUNITY EDITION', 300, 56);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.fillText('AWS STUDENT COMMUNITY DAY 2026', 300, 88);

    ctx.fillStyle = '#64748b';
    ctx.font = '500 13px "IBM Plex Mono", monospace';
    ctx.fillText('SATURDAY, NOVEMBER 21, 2026 · MYSURU', 300, 112);

    // 6. Draw Avatar Circle
    const avatarImg = new Image();
    avatarImg.crossOrigin = 'anonymous';
    avatarImg.src = photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Builder')}&background=1e293b&color=86efac&size=300`;

    avatarImg.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(300, 270, 75, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatarImg, 225, 195, 150, 150);
      ctx.restore();

      // Avatar Border Ring
      ctx.strokeStyle = '#01c1ac';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(300, 270, 77, 0, Math.PI * 2);
      ctx.stroke();

      // 7. Attendee Name & Details
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(name || 'Your Name', 300, 390);

      ctx.fillStyle = '#01c1ac';
      ctx.font = 'bold 16px "IBM Plex Mono", monospace';
      ctx.fillText(role || 'Cloud Enthusiast', 300, 420);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '14px "Inter", sans-serif';
      ctx.fillText(company || 'Vidyavardhaka College of Engineering', 300, 448);

      // 8. Venue & Organizer Box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(60, 480, 480, 160, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#01c1ac';
      ctx.font = 'bold 12px "IBM Plex Mono", monospace';
      ctx.fillText('HOST & VENUE PARTNER', 300, 510);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px "Inter", sans-serif';
      ctx.fillText('Vidyavardhaka College of Engineering', 300, 538);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '13px "Inter", sans-serif';
      ctx.fillText('Gokulam III Stage, Mysuru, Karnataka - 570002', 300, 564);

      ctx.fillStyle = '#64748b';
      ctx.font = '500 12px "IBM Plex Mono", monospace';
      ctx.fillText('Title Sponsor: AWS | Host: VVCE | Community: AWS UG Mysuru', 300, 610);

      // 9. Bottom Ticket Bar
      ctx.fillStyle = '#2c3746';
      ctx.fillRect(24, 690, 552, 60);
      ctx.strokeStyle = '#3a4759';
      ctx.lineWidth = 1;
      ctx.strokeRect(24, 690, 552, 60);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '12px "IBM Plex Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('#AWSMysuru #AWSCommunityDay', 48, 726);

      ctx.fillStyle = '#01c1ac';
      ctx.textAlign = 'right';
      ctx.fillText(`VERIFIED PASS · AWS-SCD-2026-${Math.floor(1000 + Math.random() * 9000)}`, 552, 726);

      // Save image to link
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `AWS-SCD-Mysuru-2026-Badge-${name.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    };

    // Trigger image loading fallback if fast
    if (avatarImg.complete) {
      avatarImg.onload(new Event('load'));
    }
  };

  return (
    <section id="badge" className="relative py-24 sm:py-32 bg-[#222b38]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <header className="max-w-3xl">
            <h2 className="font-serif text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
              Claim your digital pass
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#64748b] sm:text-lg">
              Personalize your official badge for AWS Student Community Day 2026 and share it with the community.
            </p>
          </header>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left: Input Form */}
          <ScrollReveal variant="fade-left" delay={150}>
            <div className="bg-[#2c3746] border border-[#3a4759]/50 p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#01c1ac]" />
                Personalize Your Badge
              </h3>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#64748b] mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#222b38] border border-[#3a4759] px-4 py-3 text-sm text-white placeholder-[#94a3b8] focus:border-[#01c1ac] focus:outline-none focus:ring-1 focus:ring-[#01c1ac]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#64748b] mb-2">Role / Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Cloud Engineer, Student, Developer"
                  className="w-full bg-[#222b38] border border-[#3a4759] px-4 py-3 text-sm text-white placeholder-[#94a3b8] focus:border-[#01c1ac] focus:outline-none focus:ring-1 focus:ring-[#01c1ac]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#64748b] mb-2">Organization / College</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Vidyavardhaka College of Engineering"
                  className="w-full bg-[#222b38] border border-[#3a4759] px-4 py-3 text-sm text-white placeholder-[#94a3b8] focus:border-[#01c1ac] focus:outline-none focus:ring-1 focus:ring-[#01c1ac]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#64748b] mb-2">Upload Profile Photo</label>
                <label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-[#3a4759] bg-[#222b38] px-4 py-3 text-xs font-semibold text-[#64748b] transition-all hover:border-[#01c1ac]/50 hover:text-[#01c1ac]">
                  <Upload className="h-4 w-4" />
                  {photo ? 'Change Photo' : 'Choose Photo File'}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#01c1ac] px-5 py-3 font-tech text-[11px] font-bold uppercase tracking-widest text-[#2c3746] transition-colors hover:bg-[#00DF89] cursor-pointer"
                >
                  <Download className="h-4 w-4" /> Download Badge
                </button>

                <button
                  onClick={triggerConfetti}
                  className="inline-flex items-center justify-center gap-2 border border-[#3a4759] bg-transparent px-5 py-3 font-tech text-[11px] font-bold uppercase tracking-widest text-[#ffffff] transition-colors hover:border-[#01c1ac] hover:text-[#01c1ac] cursor-pointer"
                >
                  <Share2 className="h-4 w-4" /> Celebrate!
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Badge Preview Card */}
          <ScrollReveal variant="zoom-in" delay={250}>
            <div className="flex justify-center">
              <div
                className="relative aspect-[3/4] w-full max-w-[370px] overflow-hidden border border-[#01c1ac]/30 bg-gradient-to-b from-[#2c3746] via-[#222b38] to-[#2c3746] p-6 shadow-2xl transition-transform duration-500 hover:scale-[1.02] flex flex-col justify-between"
              >
                {/* Decorative Elements */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20 overflow-hidden flex items-center justify-center">
                  <div className="h-64 w-64 rounded-full border border-[#01c1ac] flex items-center justify-center">
                    <div className="h-48 w-48 rounded-full border border-[#00728f] border-dashed"></div>
                  </div>
                </div>

                {/* Badge Top Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#3a4759] pb-3">
                  <div className="flex items-center gap-2">
                    <img src="/aws_partner.jpeg" alt="AWS Title Sponsor" className="h-7 w-auto object-contain bg-white rounded p-0.5" />
                    <span className="font-tech text-[10px] font-extrabold uppercase tracking-wider text-[#01c1ac]">
                      MYSURU EDITION
                    </span>
                  </div>
                  <img src="/vvce_logo.png" alt="VVCE Logo" className="h-7 w-auto object-contain bg-white rounded p-0.5" />
                </div>

                {/* Avatar Section */}
                <div className="relative z-10 mt-3 flex flex-col items-center text-center">
                  <div className="relative h-26 w-26 overflow-hidden rounded-full border-2 border-[#01c1ac] p-1 shadow-[0_0_20px_rgba(134,239,172,0.2)] bg-[#2c3746]">
                    <img
                      src={photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Builder')}&background=1e293b&color=86efac&size=200`}
                      alt="Attendee"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>

                  <h4 className="mt-4 text-xl font-bold text-white tracking-tight line-clamp-1">
                    {name || 'Your Name'}
                  </h4>
                  <p className="mt-1 text-xs font-tech uppercase tracking-widest text-[#01c1ac]">{role || 'Cloud Enthusiast'}</p>
                  <p className="mt-1.5 text-xs text-[#64748b] line-clamp-1">{company || 'Vidyavardhaka College of Engineering'}</p>
                </div>

                {/* Badge Details Box */}
                <div className="relative z-10 mt-4 border border-[#3a4759] bg-[#2c3746]/50 p-3 text-center space-y-1.5">
                  <div className="font-tech text-[9px] uppercase tracking-widest text-[#01c1ac]">HOST & VENUE PARTNER</div>
                  <div className="text-xs font-bold text-white">Vidyavardhaka College of Engineering</div>
                  <div className="text-[10px] text-[#64748b]">Saturday, November 21, 2026 · Mysuru</div>
                </div>

                {/* Footer Bar */}
                <div className="relative z-10 -mx-6 -mb-6 mt-4 flex items-center justify-between border-t border-[#3a4759] bg-[#2c3746] px-6 py-3 font-tech text-[10px] text-[#64748b]">
                  <span className="text-[#01c1ac] font-bold">#AWSMysuru</span>
                  <span>COMMUNITY-PASS</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
