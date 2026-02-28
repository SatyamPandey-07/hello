# 🏎️ Porsche 911 — Immersive 3D Experience

A cinematic, luxury web experience featuring the **Porsche 911** with interactive 3D models, scroll-driven animations, AR test drive, and a premium dark-themed design.

> **Live Preview:** `http://localhost:3000`

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **3D Car Viewer** | Interactive Porsche 911 model with orbit controls, scroll-driven camera animations, and real-time lighting |
| **Model Switching** | Browse multiple Porsche variants (911 Heritage, Carrera, GT3 RS, Spyder) with smooth transitions |
| **Scroll Storytelling** | 11-scene cinematic journey revealing exterior, interior, and technical details as you scroll |
| **Feature Cards** | Hover-to-play video cards showcasing performance, aerodynamics, precision, and safety |
| **Visual Story Gallery** | Parallax gallery with YouTube video embeds playing on hover |
| **Technology Timeline** | Scroll-driven timeline with a Porsche driving along the path |
| **Model Showcase** | Carousel of all available Porsche models with specs and pricing |
| **AR Experience** | View the Porsche 911 in augmented reality using Google Model Viewer |
| **Auto-Hide Navbar** | Glassmorphic navbar that hides on scroll down and reappears on scroll up |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile |
| **Premium Aesthetics** | Dark theme, glassmorphism, micro-animations, and cinematic gradients |

---

## 🛠️ Tech Stack

### Core Framework

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.6 | React meta-framework — handles routing, SSR, static generation, and Turbopack dev server |
| **React** | 19.2.3 | UI component library — powers the entire frontend with hooks and functional components |
| **TypeScript** | ^5 | Type safety across the entire codebase — catches errors at compile time |

### 3D Graphics & Rendering

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Three.js** | 0.183.1 | 3D rendering engine — renders the Porsche models, lighting, and camera systems in WebGL |
| **React Three Fiber** | 9.5.0 | React renderer for Three.js — declarative 3D scene management using JSX |
| **React Three Drei** | 10.7.7 | Helper library for R3F — provides `useGLTF`, `Environment`, `OrbitControls`, and loading utilities |
| **React Three Postprocessing** | 3.0.4 | Visual effects pipeline — adds bloom, vignette, and other cinematic post-processing effects |
| **Three Stdlib** | 2.36.1 | Additional Three.js utilities and shader helpers |

### Animation & Motion

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Framer Motion** | 12.34.3 | Declarative animations — powers scroll-based reveals, hover effects, page transitions, and parallax |
| **GSAP** | 3.14.2 | High-performance animation engine — handles complex timeline-based 3D camera animations |
| **Lenis** | 1.3.17 | Smooth scroll library — provides buttery-smooth scrolling for the entire page |

### Styling

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | ^4 | Utility-first CSS framework — rapid styling with dark theme, glassmorphism, and responsive design |
| **tailwind-merge** | 3.5.0 | Merges conflicting Tailwind classes — prevents styling conflicts in dynamic components |
| **clsx** | 2.1.1 | Conditional class name utility — cleanly toggles CSS classes based on state |

### AR & Media

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Google Model Viewer** | 4.1.0 | AR component — lets users place the Porsche 3D model in their real-world environment via WebXR |
| **react-qr-code** | 2.0.18 | QR code generator — generates QR codes for mobile AR handoff |
| **Howler.js** | 2.2.4 | Audio library — manages engine sounds and ambient audio playback |

### UI Components

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Lucide React** | 0.575.0 | Icon library — provides all UI icons (chevrons, share, menu, external links, etc.) |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Main landing page (assembles all sections)
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── globals.css         # Global styles and design tokens
│   ├── ar/                 # AR experience page
│   └── car/[slug]/         # Dynamic car detail + checkout pages
│
├── components/
│   ├── canvas/             # 3D scene components
│   │   ├── PorscheScene.tsx    # Main 3D canvas with lighting and environment
│   │   ├── PorscheModel.tsx    # GLB model loader with material setup
│   │   ├── CameraRig.tsx       # Scroll-driven camera positioning
│   │   └── ScrollController.tsx # Maps scroll progress to 3D animations
│   │
│   ├── sections/           # Page sections
│   │   ├── FeatureCards.tsx     # Video feature cards (hover-to-play)
│   │   ├── ModelShowcase.tsx    # Car model carousel
│   │   ├── TechnologySection.tsx # Tech timeline with scroll car
│   │   ├── ParallaxGallery.tsx  # Visual Story with YouTube embeds
│   │   ├── ARExperienceCTA.tsx  # AR call-to-action section
│   │   └── Footer.tsx          # Site footer
│   │
│   ├── ui/                 # UI overlay components
│   │   ├── Navbar.tsx          # Auto-hide navigation bar
│   │   ├── OverlayUI.tsx       # Scroll-driven text overlays (11 scenes)
│   │   ├── ModelSwitcher.tsx    # Prev/Next model navigation
│   │   └── GlobalLoader.tsx    # Loading screen
│   │
│   └── ARTestDrive.tsx     # Full AR test drive component
│
├── systems/                # Shared state management
│   ├── modelSystem.ts      # Global model controller (pub/sub)
│   └── sharedTimeline.ts   # Shared scroll phase timeline
│
├── config/                 # Model configurations
│   └── models/             # Per-model camera, lighting configs
│
├── data/                   # Static data
│   └── carModels.ts        # All car model specs, pricing, features
│
├── hooks/                  # Custom React hooks
└── types/                  # TypeScript type definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd hello

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#050505` | Page background |
| `--foreground` | `#f0ece4` | Primary text color |
| `--color-porsche-accent` | `#d5001c` | Porsche red accent |
| `--font-porsche` | `Outfit` | Primary typeface |

The design follows a **dark luxury** aesthetic with:
- Glassmorphic panels (`backdrop-blur-xl`, `bg-white/5`)
- Subtle gradients and glow effects
- `font-weight: 200` extralight typography
- Micro-animations on hover and scroll

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is for educational and portfolio purposes only. Porsche® and 911® are registered trademarks of Dr. Ing. h.c. F. Porsche AG.
