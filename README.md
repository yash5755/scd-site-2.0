# AWS Student Community Day Mysuru 2026

Official web application for AWS Student Community Day Mysuru 2026, organized by the AWS Student Builder Group VVCE at Vidyavardhaka College of Engineering (VVCE), Mysuru, India.

---

## Overview

AWS Student Community Day Mysuru 2026 is a community-driven technology conference for students, developers, and cloud architects. This web platform serves as the central digital hub for event information, ticket registration, agenda tracking, speaker profiles, and community engagement.

- **Event Date**: November 21, 2026
- **Location**: Vidyavardhaka College of Engineering (VVCE), Mysuru, Karnataka, India
- **Registration**: [KonfHub Event Page](https://konfhub.com/aws-student-community-day-mysuru-2026)

---

## Purpose of the Website

The website provides an interactive, accessible platform to:

- Showcase keynote speakers, technical sessions, and hands-on workshops.
- Facilitate seamless ticket purchases via direct KonfHub integration.
- Deliver a dedicated multi-track event schedule and timeline.
- Enable attendees to generate and download personalized, social-ready digital badges.
- Highlight the organizing student team, sponsors, and partner communities.
- Provide practical event information including venue maps, FAQs, and contact links.

---

## Key Website Features

- **Dynamic Hero Section**: Features live animated focus tracks (AI/ML, Data, DevOps, Cloud, Security, Serverless, Containers) and animated key metrics counters.
- **Ticketing & Registration**: Multi-tier ticket cards (Super Early Bird, Early Bird, Regular) integrated directly with KonfHub checkout widgets.
- **Dedicated Schedule Page (`/schedule`)**: Multi-track agenda timeline covering all sessions from morning check-in to closing ceremonies.
- **Personalized Digital Badge Generator (`/badge`)**: Client-side HTML5 canvas tool allowing attendees to upload photos, adjust framing and zoom, choose social formats (Square, Story, Twitter), and download with celebratory confetti.
- **Organizing Team Showcase (`/team`)**: 12-member profile grid with official photos, gradient backdrops, and automated silhouette fallbacks.
- **Dynamic Section Scrollbar**: Custom scrollbar that automatically adapts its thumb and track colors based on the section currently in the viewport.
- **Interactive Navigation & ScrollSpy**: Sticky desktop header and mobile drawer with real-time section highlight tracking.
- **Collapsible FAQ Accordion**: Expandable answers addressing common attendee inquiries.

---

## Technologies Used

Verified from `package.json`:

| Category | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router, Turbopack) | `^16.3.5` |
| **UI Library** | React / React DOM | `^19.0.0` |
| **Language** | TypeScript | `^5.7.2` |
| **Styling** | Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/postcss`, `postcss`) | `^4.3.3` |
| **Icons** | Lucide React | `^0.469.0` |
| **Effects** | Canvas Confetti | `^1.9.4` |
| **Ticketing** | KonfHub Embedded Widget API | — |

---

## Project Changes

### 1. Added

- **Organizing Team Member Photos**: Added official portraits for all 12 organizing team members in `public/team/` (`yashwanth.jpg`, `vibha.jpg`, `gagan.jpg`, `reethu.jpg`, `yashas_mv.jpg`, `falkia.jpg`, `yuvika.jpg`, `yashas_u.jpg`, `varsha.jpg`, `vinay.jpg`, `shreya.jpg`, `ananya.jpg`), along with directory documentation in `public/team/README.md`.
- **Dynamic Scrollbar Component**: Implemented `DynamicScrollbar.tsx` which calculates visible viewport sections on scroll and smoothly transitions the browser scrollbar thumb and track colors across brand themes (Hero, About, Speakers, Tickets, Workshops, Sponsors, Agenda, Team, FAQ, and Footer).
- **Community Partner Assets**: Added official high-resolution logos for community partners:
  - Cloud Native Community Mysore (`public/cloud_native_mysore.png`)
  - AWS User Group Bengaluru (`public/awsugblr-logo.png`)
  - AWS User Group Madurai (`public/logo-Tx1zCSPp.png`)
  - AWS User Groups Mysuru (`public/aws_user_group_mysuru_logo.png`)
- **Vector Monochrome AWS Logo**: Added `public/aws_logo_dark.svg` featuring official vector paths in monochrome dark navy (`#161D27`), ensuring clean, high-DPI rendering without raster artifacts.
- **Next.js App Router Structure**: Created page routes under `src/app/` (`page.tsx`, `schedule/page.tsx`, `team/page.tsx`, `badge/page.tsx`, `layout.tsx`, and `globals.css`).
- **KonfHub Helper Module**: Created `src/lib/konfhub.ts` to manage sequential script injection, button click handlers, modal backdrop dismissal, and body scroll locking.

### 2. Updated

- **AWS Header Logo Presentation**: Replaced raster header graphics with the vector monochrome dark logo (`/aws_logo_dark.svg`), preserving official design proportions, sharp edges at all resolutions, and home click navigation.
- **Badge Generator (`BadgePage.tsx`)**: Refined canvas drawing dimensions, balanced the AWS logo proportions to a clean 13% width, updated canvas title typography to "STUDENT COMMUNITY DAY MYSURU 2026", and enhanced responsive controls for mobile.
- **Agenda & Schedule (`AgendaSection.tsx` & `SchedulePage.tsx`)**: Updated timeline sessions with confirmed event timings from 8:00 AM check-in through 6:00 PM felicitation and closing ceremony.
- **Ticket Section & KonfHub Integration (`TicketsSection.tsx`)**: Configured specific KonfHub widget button IDs for each tier (`SUPER_EARLY_BIRD`, `EARLY_BIRD`, `REGULAR`), updated pricing tiers (₹149, ₹249, ₹349), availability dates, and status styling (Sold Out, Available, Coming Soon).
- **Team Section (`TeamSection.tsx` & `TeamPage.tsx`)**: Transitioned from placeholder cards to the 12 official members in ordered layout with `object-cover object-top` portrait framing, subtle gradient badges, and image fallback handling.
- **Footer & Social Links (`Footer.tsx`)**: Updated social links with verified community URLs:
  - LinkedIn: `https://www.linkedin.com/company/aws-student-builder-group/`
  - Meetup: `https://www.meetup.com/awsvvce/`
  - WhatsApp: `https://chat.whatsapp.com/GiyK49su1Nb5Q1Q9GoKc91`
- **Sponsors & Community Partners Section (`SponsorsSection.tsx`)**: Structured into distinct tiers (Title Sponsor, Venue Sponsor, Event/Ticketing Partner, Community Partners) with custom logo sizing and external links.
- **UI/UX Refinements**: Refined ScrollSpy scroll tracking offsets, smooth in-page navigation, animated cycling keywords in header and hero, and responsive drawer navigation for mobile viewports.

### 3. Removed

- **Vite Build Tooling**: Removed legacy Vite configuration and entry files (`vite.config.ts`, `index.html`, `src/App.tsx`, `src/main.tsx`, and `@tailwindcss/vite`) during migration to Next.js App Router.
- **Unconfirmed Social Links**: Removed generic, unverified social links from the footer (placeholder X/Twitter, Instagram, and YouTube links).
- **Unused Custom Registration Modal**: Removed obsolete custom modal overlay in favor of the direct KonfHub embedded widget checkout flow.

---

## Repository Structure

```text
scd-site/
├── public/                     # Static assets
│   ├── team/                   # 12 team member photos & README
│   ├── aws_logo.svg            # Standard AWS SVG logo
│   ├── aws_logo_dark.svg       # Monochrome dark AWS vector logo
│   ├── awsugblr-logo.png       # AWS UG Bengaluru logo
│   ├── logo-Tx1zCSPp.png       # AWS UG Madurai logo
│   ├── cloud_native_mysore.png # Cloud Native Mysore logo
│   ├── aws_user_group_mysuru_logo.png
│   ├── konfhub_logo.png        # KonfHub logo
│   ├── vvce_logo.png           # VVCE logo
│   └── hero-image.png          # Hero background artwork
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── badge/page.tsx      # Badge generator page
│   │   ├── schedule/page.tsx   # Schedule page
│   │   ├── team/page.tsx       # Team page
│   │   ├── globals.css         # Global styles & scrollbar CSS
│   │   ├── layout.tsx          # Root layout & metadata
│   │   └── page.tsx            # Main landing page
│   ├── components/             # Reusable UI components
│   │   ├── AgendaSection.tsx
│   │   ├── BadgePage.tsx
│   │   ├── DynamicScrollbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SchedulePage.tsx
│   │   ├── SponsorsSection.tsx
│   │   ├── TeamPage.tsx
│   │   ├── TeamSection.tsx
│   │   └── TicketsSection.tsx
│   └── lib/
│       └── konfhub.ts          # KonfHub widget integration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
└── tsconfig.json               # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.18 or higher (Node 20+ recommended)
- **npm**: v9 or higher

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ananyayk288/AWS-VVCE-Mysuru.git
   cd AWS-VVCE-Mysuru
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

To test and run the production build locally:

1. **Create the production bundle**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm run start
   ```

---

## Deployment

The application is built on Next.js 16 (App Router) and can be deployed to:

- **Vercel**: Native zero-configuration deployment for Next.js.
- **AWS Amplify / AWS App Runner / Amazon S3 + CloudFront**: Containerized or serverless hosting on AWS infrastructure.
- **Node.js Host**: Any container or VM running Node.js via `npm run start`.

---

## Community Partners & Organizers

- **Organized By**: AWS Student Builder Group VVCE
- **Venue Partner**: Vidyavardhaka College of Engineering (VVCE), Mysuru
- **Title Sponsor**: Amazon Web Services (AWS)
- **Ticketing Partner**: KonfHub
- **Community Partners**:
  - AWS User Groups Mysuru
  - Cloud Native Community Mysore
  - [AWS User Group Bengaluru](https://www.awsugblr.in/)
  - [AWS User Group Madurai](https://www.awsugmdu.in/)
