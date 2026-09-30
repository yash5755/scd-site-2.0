'use client';

import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Cloud, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Student',
    college: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#01c1ac', '#00DF89', '#222b38', '#ffffff'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#222b38]/10 bg-white p-6 sm:p-8 shadow-[0_8px_40px_rgba(35,48,62,0.15)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-[#222b38]/10 text-[#5A6B7B] hover:bg-[#ffffff] hover:text-[#222b38] cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: 'linear-gradient(135deg, #01c1ac 0%, #00DF89 100%)' }}>
                <Cloud className="h-6 w-6 text-white stroke-[2.5]" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#222b38] tracking-tight">Register for AWS SCD Mysuru 2026</h3>
                <p className="text-xs text-[#5A6B7B]"> Vidyavardhaka College of Engineering · 21 Nov 2026</p>
              </div>
            </div>

            {/* Direct KonfHub CTA Banner */}
            <div className="mt-6 rounded-2xl border border-[#01c1ac]/30 bg-[#01c1ac]/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-[#059E8C]">Official KonfHub Ticketing</h4>
                  <p className="text-xs text-[#5A6B7B] mt-0.5">Instant confirmation & badge issuance</p>
                </div>
                <a
                  href="https://konfhub.com/aws-student-community-day-mysuru-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-sm cursor-pointer transition-all hover:scale-105 bg-[#01c1ac] hover:bg-[#059E8C]"
                >
                  KonfHub Page <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Registration Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#5A6B7B] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[#222b38]/12 bg-[#F5F6F8] px-4 py-2.5 text-sm text-[#222b38] placeholder-[#5A6B7B]/50 focus:border-[#01c1ac] focus:outline-none focus:ring-2 focus:ring-[#01c1ac]/15"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#5A6B7B] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-[#222b38]/12 bg-[#F5F6F8] px-4 py-2.5 text-sm text-[#222b38] placeholder-[#5A6B7B]/50 focus:border-[#01c1ac] focus:outline-none focus:ring-2 focus:ring-[#01c1ac]/15"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#5A6B7B] mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-xl border border-[#222b38]/12 bg-[#F5F6F8] px-3 py-2.5 text-sm text-[#222b38] focus:border-[#01c1ac] focus:outline-none"
                  >
                    <option value="Student">Student</option>
                    <option value="Developer">Developer</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#5A6B7B] mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full rounded-xl border border-[#222b38]/12 bg-[#F5F6F8] px-4 py-2.5 text-sm text-[#222b38] placeholder-[#5A6B7B]/50 focus:border-[#01c1ac] focus:outline-none focus:ring-2 focus:ring-[#01c1ac]/15"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-full py-3.5 text-sm font-bold text-white shadow-sm cursor-pointer transition-all hover:scale-[1.02] bg-[#222b38] hover:bg-[#3A4D5E]"
              >
                Complete Pre-Registration
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="h-16 w-16 text-[#01c1ac] mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-[#222b38]">Registration Submitted!</h3>
            <p className="text-sm text-[#5A6B7B]">
              Thank you, <strong className="text-[#222b38]">{formData.name}</strong>! We look forward to seeing you at Vidyavardhaka College of Engineering on Saturday, November 21, 2026.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="rounded-full bg-[#222b38] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#3A4D5E] cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
