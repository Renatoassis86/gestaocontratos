# Mobile Experience Optimization: Arkos Intelligence Hub

This plan outlines the systematic optimization of the mobile experience for the Arkos Intelligence digital hub, addressing critical video playback issues and refining the UI for premium mobile usage.

## 📋 Objectives

1.  **Fix Hero Video Autoplay**: Resolve issues preventing background videos from playing automatically on iOS/Android.
2.  **Premium Layout (Thumb Zone)**: Reposition critical elements (CTAs, navigation) to be easily reachable by the thumb.
3.  **Visual Excellence**: Polish typography, spacing, and micro-interactions for a consistent "top-tier" feel.
4.  **Performance & Battery**: Ensure media loading and animations are efficient for mobile resources.

## 🛠️ Phases

### Phase 1: Video Autoplay Recovery
Mobile browsers are strict. We need to ensure the `video` tags have all necessary flags and a reliable user interaction trigger that bypasses low-power mode restrictions.

**Actions:**
- [x] Verify `muted`, `playsInline`, `autoPlay`, and `loop` attributes are correctly applied in `src/app/page.tsx`.
- [ ] Implement a robust `playOnInteraction` service that handles mobile edge cases (iOS Low Power Mode).
- [ ] Add a `loading="lazy"` strategy for background videos to prioritize the main hero.
- [ ] Ensure a high-quality fallback image (poster) is visible if the video fails to load.

### Phase 2: Layout & Positioning (Thumb Zone Mastery)
Refactor `src/app/page.tsx` and `src/app/page.module.css` to prioritize mobile ergonomics.

**Actions:**
- [ ] **Mobile Navbar Enhancement**: Move primary actions (Diagnóstico, Login, Consultor) to a floating, blur-enabled "Dynamic Island" at the bottom.
- [ ] **Hero Repositioning**: Shift the text content slightly higher on small screens to avoid obstruction and improve readability over the background video.
- [ ] **Module & Card Refinement**: Adjust card padding and font sizes for better touch targets (min 44px).
- [ ] **Competidores Table**: Ensure the mobile list view is visually hierarchical and clean.

### Phase 3: Visual Polish & Micro-interactions
Enhance the premium feel using `framer-motion` and optimized CSS.

**Actions:**
- [ ] Add staggered entry animations for all sections on scroll (optimized for mobile).
- [ ] Improve button states (active/hover) with subtle scaling and haptic-like transitions.
- [ ] Polish the mobile hamburger menu with a "full-page overlay" and glassmorphism.

### Phase 4: Verification & Build
- [ ] Run `scripts/mobile_audit.py` to check for touch target and accessibility attribute issues.
- [ ] Verify functionality across simulated viewports (360px to 800px).
- [ ] Ensure the build compiles successfully with `next build`.

---

## 🎨 Design Commitment

**Style: "Liquid Intelligence Architecture"**

- **Geometry**: Sharp and net edges (0px - 2px radius) for technical elements; large, organic curves (24px+) for containing layout segments to create a sense of intelligence and fluidity.
- **Palette**: Acid Neon Green (#C8F542) on Deep Charcoal (#0A0C0F) – ensuring maximum contrast and battery efficiency on OLED screens.
- **Motion**: High-frequency spring physics for micro-interactions (fast feedback) and slow, fluid parallax for background layers (depth).
- **Unique Hook**: A floating "Operational Dock" at the bottom on mobile instead of a simple static bar.
