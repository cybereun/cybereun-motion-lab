# Cybereun Motion Lab

<div align="center">
  <img src="./public/cybereun-icon.png" alt="Cybereun Motion Lab icon" width="104" />

  <p><strong>An interactive React motion library for exploring, previewing, and reusing thoughtful micro-interactions.</strong></p>

  <p>
    <a href="https://cybereun-motion-lab.vercel.app">Live Demo</a>
    ·
    <a href="./README.ko.md">한국어 문서</a>
    ·
    <a href="https://www.threads.com/@gogo_lebi">Threads</a>
  </p>

  <p>
    <a href="https://cybereun-motion-lab.vercel.app"><img alt="Vercel deployment" src="https://img.shields.io/badge/Vercel-Live-000000?style=for-the-badge&logo=vercel&logoColor=white" /></a>
    <a href="https://github.com/cybereun/cybereun-motion-lab/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/cybereun/cybereun-motion-lab?style=for-the-badge&logo=github&color=0b5cff" /></a>
    <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge&logo=opensourceinitiative&logoColor=white" /></a>
  </p>

  <p>
    <img alt="React 19" src="https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" />
    <img alt="Motion" src="https://img.shields.io/badge/Motion-12-fff312?style=flat-square&logo=framer&logoColor=111111" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img alt="PWA ready" src="https://img.shields.io/badge/PWA-Ready-5a0fc8?style=flat-square&logo=pwa&logoColor=white" />
  </p>
</div>

## Overview

Cybereun Motion Lab is a personalized, expanded edition of the open-source Amicro project. It presents React micro-interactions in a deep navy visual system where visitors can search the catalog, change its layout, interact with every preview, and copy implementation code.

The experience begins with a full-screen introduction powered by an interactive `DotField`. Moving the pointer disturbs the field even when the operating system requests reduced motion; autonomous waves and sparkles are reduced while direct user feedback remains available.

## Highlights

- **Full-screen interactive introduction** — introduces the library before opening the catalog.
- **Reactive DotField background** — canvas dots, cursor bulging, glow, sparkle, and subtle wave effects.
- **35 button interactions** — hover, press, morph, focus, blur, shake, pulse, and other feedback patterns.
- **15 spatial layouts** — card spreads, arcs, fans, cascades, and 3D carousel variations.
- **128 loaders** — compact and physics-inspired loading animations.
- **Instant catalog search** — filters buttons, layouts, carousels, and loaders by name.
- **Multiple display modes** — list, grid, and matrix views.
- **Sorting and categories** — A–Z sorting with separate Buttons, Card Spreads, 3D Carousels, and Loaders sections.
- **Copy-ready examples** — copy an interaction implementation directly from its preview.
- **Dark and light themes** — theme-aware surfaces, borders, typography, and component stages.
- **CLI and Skills guides** — dedicated in-app pages for installation and workflow guidance.
- **Responsive navigation** — desktop pills and a mobile-friendly category menu.
- **Personal social links** — Threads links to `@gogo_lebi`; GitHub links to this repository.
- **PWA support** — installable manifest, custom application icons, and a network-first service worker.
- **Accessible interaction** — semantic buttons and links, keyboard focus states, and reduced-motion handling.

## Catalog at a glance

| Section | Contents | Interaction |
| --- | ---: | --- |
| Buttons | 35 | Hover, focus, press, copy code |
| Card Spreads & 3D Carousels | 15 | Hovered spatial previews and layout changes |
| Loaders | 128 | In-view rendering and animated previews |
| CLI Install | Guide | Commands and setup instructions |
| Skills | Guide | Workflow and integration guidance |

## Getting started

### Requirements

- Node.js 18 or later
- npm

### Local development

```bash
git clone https://github.com/cybereun/cybereun-motion-lab.git
cd cybereun-motion-lab
npm install
npm run dev
```

Open `http://localhost:3000`.

### Quality checks

```bash
npm test
npm run lint
npm run build
```

### Production preview

```bash
npm run build
npm run preview
```

## How to use the website

1. Move the pointer across the introduction to interact with the DotField.
2. Select **Enter Motion Lab**.
3. Choose Buttons, Card Spreads, 3D Carousels, or Loaders.
4. Search by component name or switch between list, grid, and matrix layouts.
5. Interact with a preview.
6. Use its copy control to copy the relevant implementation.
7. Open **CLI Install** or **Skills** for additional setup guidance.

## Project structure

```text
src/
├─ components/
│  ├─ cards/          # Card spreads and carousel previews
│  ├─ loaders/        # Loader components
│  ├─ DotField.tsx    # Interactive canvas background
│  ├─ IntroPage.tsx   # Full-screen product introduction
│  └─ AnimatedButton.tsx
├─ data/              # Catalog metadata
├─ utils/             # Code generation and copy-ready examples
├─ App.tsx            # Navigation, catalog, search, theme, and layouts
└─ main.tsx           # Application entry and service-worker registration

public/
├─ manifest.webmanifest
├─ sw.js
├─ cybereun-icon.png
└─ icon-*.png
```

## Technology

- React 19
- TypeScript 5
- Motion 12
- Tailwind CSS 4
- Vite 6
- Lucide React
- Canvas 2D and SVG
- Vercel

## Deployment

The application is configured as a Vite static site and is deployed to Vercel:

**[https://cybereun-motion-lab.vercel.app](https://cybereun-motion-lab.vercel.app)**

To deploy with the Vercel CLI:

```bash
npm run build
vercel deploy . --prod
```

## Credits

Personalized and maintained by [cybereun](https://github.com/cybereun).

This repository is based on the original **Amicro — Micro Transitions** project by **Syed Subhan Uddin**. The original copyright and MIT license notice are preserved.

- Original author: [Subhan-code](https://github.com/Subhan-code)
- Original package: [@subhanhq/amicro](https://www.npmjs.com/package/@subhanhq/amicro)
- Personalized repository: [cybereun/cybereun-motion-lab](https://github.com/cybereun/cybereun-motion-lab)

## License

Distributed under the [MIT License](./LICENSE).
