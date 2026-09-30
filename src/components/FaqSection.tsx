'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is AWS Community Day?",
      answer: "AWS Community Days are community-led conferences where event logistics and content is planned, sourced, and delivered by community leaders. They feature technical discussions, workshops, and hands-on labs led by expert AWS users and industry leaders from around the world."
    },
    {
      question: "Who should attend this event?",
      answer: "The event is designed for cloud builders of all levels. Whether you're a student just starting with AWS, a developer looking to deploy your first container, or an experienced architect running production workloads, you'll find sessions tailored to your expertise."
    },
    {
      question: "Do I need to bring my laptop?",
      answer: "Yes, if you plan to participate in the hands-on workshops. We recommend bringing a fully charged laptop. Wi-Fi will be provided at the venue. For standard talks and keynotes, a laptop is not required but can be useful for taking notes."
    },
    {
      question: "Are there any prerequisites for the workshops?",
      answer: "Prerequisites vary by workshop. Most will require an active AWS Account (Free Tier is fine) and basic familiarity with the command line. Specific requirements will be shared with registered attendees closer to the event date."
    },
    {
      question: "Will food and beverages be provided?",
      answer: "Yes, your ticket includes morning tea/coffee, a full buffet lunch, and evening high-tea. We will have vegetarian options available. If you have specific dietary requirements, please mention them during registration."
    },
    {
      question: "How can I become a speaker or sponsor?",
      answer: "Call for Speakers (CFP) is currently open! Check the 'Register' section for the application link. For sponsorships, we have multiple tiers available. Please contact us at awsugmysuru@gmail.com for the sponsorship prospectus."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative flex w-full max-w-full overflow-hidden flex-col items-center justify-center p-5 py-16 sm:p-8 sm:py-20 md:p-10 lg:p-20 bg-[#EFF0F3] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1720px]">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-1">
            <ScrollReveal variant="fade-right">
              <h2 className="font-sans w-full text-4xl leading-[105%] font-medium tracking-[-0.03em] text-[#23303E] sm:text-5xl">
                FAQ's
              </h2>
            </ScrollReveal>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-2">
            <div className="flex w-full flex-col">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <ScrollReveal key={index} variant="fade-up" delay={index * 40}>
                    <div className="border-b border-[#5A6C86]/40">
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                        className="group flex w-full items-center justify-between py-5 text-left font-sans text-2xl leading-[105%] font-normal tracking-[-0.03em] text-[#23303E] sm:text-3xl cursor-pointer transition-colors"
                      >
                        <span className="pr-4">{faq.question}</span>
                        <Plus
                          className={`h-6 w-6 text-[#23303E] shrink-0 transition-transform duration-200 ease-out ${
                            isOpen ? 'rotate-45' : 'rotate-0'
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="font-sans text-base sm:text-lg font-light leading-relaxed text-[#23303E]/85">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
