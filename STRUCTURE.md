# haysync structure

Bare-minimum scaffold for the haysync Next.js (App Router) app. Tailwind is configured but not used in components yet. Components are intentionally unstyled placeholders to be filled in later.

## Directory outline

.
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.mjs
├── next-env.d.ts
├── STRUCTURE.md
├── public/
│ └── fonts/
│ └── (place Satoshi font files here)
└── src
├── app
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ ├── sign-in/
│ │ └── page.tsx
│ ├── join/
│ │ └── [token]/
│ │ └── page.tsx
│ └── api/
│ └── calendar/
│ ├── create/
│ │ └── route.ts
│ ├── share/
│ │ └── route.ts
│ └── join/
│ └── route.ts
├── components
│ ├── Header.tsx
│ └── Footer.tsx
├── features
│ ├── auth/
│ ├── calendar/
│ └── invites/
├── lib
└── types

## Folder purpose

- `src/app`: Next.js App Router entry point. Contains global styles (Tailwind directives only), root layout, signed-in dashboard at the root, sign-in page, invite token page, and placeholder API route handlers for calendar actions.
- `src/components`: Shared layout/UI building blocks used across pages (header/footer/theme toggle), left unstyled for now.
- `src/features`: Feature-focused slices with clear separation:
  - `auth`: Client auth helpers, Google sign-in button, and a hook to read the current user from Firebase Auth.
  - `calendar`: Hooks, components, and client services for calendars/events (all placeholder logic ready for Firestore wiring).
  - `invites`: Hooks and services for generating and consuming invite/share tokens.
- `src/lib`: Environment-driven config plus minimal Firebase client/admin setup, auth verification helper, and Firestore helper stubs.
- `src/types`: Shared TypeScript interfaces for calendars, events, members, and users (barrel exported via `index.ts`).
- `public/fonts`: Place custom font files (e.g., Satoshi) for project typography.

This repository is intentionally minimal: Tailwind is installed and configured but unused in components, and all feature implementations are thin placeholders with TODOs to fill in real logic later. The root route serves the signed-in dashboard, while `/sign-in` is the unauthenticated entry point.
