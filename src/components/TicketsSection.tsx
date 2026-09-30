'use client';

import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { initKonfHub, openKonfHub, KONFHUB_BUTTONS } from '../lib/konfhub';

export const TicketsSection: React.FC = () => {
  useEffect(() => {
    initKonfHub();
  }, []);

  const tickets = [
    {
      id: 'super-early-bird',
      title: 'Super Early Bird Tickets',
      subtitle: 'Be Super, Be Early!',
      price: '₹149',
      availability: 'Available Till: 17th Sep 2026, 06:36 PM (GMT+05:30)',
      buttonText: 'SOLD OUT',
      buttonStatus: 'sold-out',
      buttonId: KONFHUB_BUTTONS.SUPER_EARLY_BIRD,
      features: [
        'Full access to the entire AWS Student Community Day Mysuru 2026 on 21st November 2026',
        'Exclusive event Swags & Goodies',
        'Morning Snacks',
        'Lunch',
        'Hi-Tea',
        'Visit to all sponsor booths and demo areas',
        'Networking opportunities with fellow students, speakers, sponsors, and industry professionals',
        'Digital Certificate of Participation from AWS.',
      ],
    },
    {
      id: 'early-bird',
      title: 'Early Bird Ticket',
      subtitle: 'Early Bird, Be Quick!',
      price: '₹249',
      availability: 'Starts On: 26th Sep 2026, 04:58 PM (GMT+05:30)',
      buttonText: 'GRAB YOUR TICKET',
      buttonStatus: 'available',
      buttonId: KONFHUB_BUTTONS.EARLY_BIRD,
      badge: 'Avail Off',
      features: [
        'Full access to the entire AWS Student Community Day Mysuru 2026 on 21st November 2026',
        'Exclusive event Swags & Goodies',
        'Morning Snacks',
        'Lunch',
        'Hi-Tea',
        'Visit to all sponsor booths and demo areas',
        'Networking opportunities with fellow students, speakers, sponsors, and industry professionals',
        'Digital Certificate of Participation from AWS.',
      ],
    },
    {
      id: 'regular',
      title: 'Regular',
      subtitle: 'Early Bird, Be Quick!',
      price: '₹349',
      availability: 'Starts On: 22nd Oct 2026, 05:54 PM (GMT+05:30)',
      buttonText: 'COMING SOON',
      buttonStatus: 'coming-soon',
      buttonId: KONFHUB_BUTTONS.REGULAR,
      features: [
        'Full access to the entire AWS Student Community Day Mysuru 2026 on 21st November 2026',
        'Exclusive event Swags & Goodies',
        'Morning Snacks',
        'Lunch',
        'Hi-Tea',
        'Visit to all sponsor booths and demo areas',
        'Networking opportunities with fellow students, speakers, sponsors, and industry professionals',
        'Digital Certificate of Participation from AWS.',
      ],
    },
  ];

  return (
    <section 
      id="tickets" 
      className="flex w-full flex-col items-start justify-center gap-8 py-16 sm:py-20 lg:py-24 bg-[#D1E5CD] px-5 sm:px-8 md:px-10 lg:px-20 overflow-hidden scroll-mt-20"
    >
      {/* Section Header Matching Reference */}
      <ScrollReveal variant="fade-left" className="w-full max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#23303E] leading-[105%]">
            Tickets for every builder
          </h2>
          <p className="mt-3 font-sans text-base leading-[115%] font-light text-[#23303E] sm:text-xl sm:leading-[105%]">
            Join AWS Student Community Day Mysuru 2026 with access to talks, workshops, and community experiences.
          </p>
        </div>
      </ScrollReveal>

      {/* 3-Column Grid Structure for 3 Ticket Tiers */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex flex-col justify-between border border-[#23303E] bg-[#23303E] p-6 sm:p-7 min-h-[620px] rounded-none select-none transition-transform duration-200 hover:-translate-y-1"
          >
            {/* Top Area */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-sans text-base sm:text-lg font-normal text-[#FAFAFA]">
                    {ticket.title}
                  </h3>
                  {ticket.subtitle && (
                    <p className="font-sans text-xs text-[#FAFAFA]/70 mt-0.5">
                      {ticket.subtitle}
                    </p>
                  )}
                </div>
                {ticket.badge && (
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold bg-[#CDE3CB] text-[#23303E] px-2 py-0.5 rounded-none shrink-0">
                    {ticket.badge}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mt-2">
                <span className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAFAFA] tracking-tight">
                  {ticket.price}
                </span>
                {ticket.availability && (
                  <p className="font-mono text-[11px] text-[#FAFAFA]/65 mt-1.5 leading-snug">
                    {ticket.availability}
                  </p>
                )}
              </div>

              {/* Features List */}
              <ul className="mt-6 flex flex-col gap-2.5">
                {ticket.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#FAFAFA]/85 leading-snug">
                    <Check className="h-3.5 w-3.5 text-[#FAFAFA] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Button */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => openKonfHub(ticket.buttonId)}
                className={`w-full h-11 rounded-none font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center transition-colors cursor-pointer ${
                  ticket.buttonStatus === 'available'
                    ? 'bg-[#CDE3CB] text-[#23303E] hover:bg-[#CDE3CB]/90 shadow-xs'
                    : 'bg-[#7B9285] text-[#23303E] hover:bg-[#7B9285]/80'
                }`}
              >
                {ticket.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
