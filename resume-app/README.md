# Resume Angular 19 App

A clean, professional resume viewer built with Angular 19 standalone components. Each section of the resume is its own component, data is loaded via `HttpClient` from `assets/resume.json`, and a sticky sidebar lets you jump between sections instantly.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Serve locally
ng serve

# 3. Open in browser
# http://localhost:4200
```

---

## Project Structure

```
src/
├── assets/
│   └── resume.json                          ← Edit this to change resume data
├── app/
│   ├── app.component.ts                     ← Root: sidebar nav + section host
│   ├── app.config.ts                        ← provideHttpClient + provideAnimations
│   ├── services/
│   │   └── resume.service.ts                ← HttpClient + TypeScript interfaces
│   └── components/
│       ├── personal-info/
│       ├── summary/
│       ├── technical-skills/
│       ├── core-competencies/
│       ├── professional-experience/
│       ├── education/
│       ├── achievements/
│       ├── certifications/
│       ├── projects/
│       ├── languages/
│       ├── availability/
│       ├── employment-gaps/
│       └── references/
├── styles.css                               ← Global tokens + section-card base styles
└── index.html
```

---

## Customising the Resume

Open `src/assets/resume.json` and edit the fields. The app re-renders automatically during `ng serve`. Every top-level key maps 1-to-1 to a component.

## Design

- **Theme**: Dark, refined — CSS custom properties throughout (`--accent`, `--surface`, etc.)
- **Fonts**: DM Serif Display (headings) + DM Sans (body) via Google Fonts
- **Layout**: Sticky 240 px sidebar on desktop; hamburger + slide-over drawer on mobile
- **Active section**: Tracked by `IntersectionObserver`-style scroll listener, highlighted in sidebar

## Tech

- Angular 19 standalone components (no NgModules)
- `@for` / `@if` control flow (Angular 17+ syntax)
- `HttpClient` with `shareReplay(1)` for single-fetch caching
- All styles scoped per component; global tokens in `styles.css`
