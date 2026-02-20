# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kreativbüro Hipp** - A bilingual (EN/DE) portfolio website for a medical technology design agency based in Tuttlingen, Germany. Features project showcases, work galleries with modal views, and an admin interface for content management.

## Development Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm lint     # Run ESLint
pnpm start    # Start production server
```

## Tech Stack

- **Next.js 16** with App Router and React 19
- **TypeScript** with strict mode
- **Tailwind CSS 4** with PostCSS
- **Supabase** for projects and media storage
- **shadcn/ui** with nova style (Radix UI primitives)
- **Three.js** with @react-three/fiber for 3D hero scene
- **Framer Motion** for animations

## Architecture

### Internationalization (i18n)
Client-side locale switching without page reloads:
- `src/lib/i18n/dictionary.ts` - All translations (EN/DE)
- `src/lib/i18n/get-locale.ts` - Server-side locale detection from cookies
- `LocaleProvider` + `useLocale()` hook for client components
- Locale stored in cookie, toggled via `LanguageToggle` component

### Data Layer - Hybrid Static/Database
Projects support both static fallback and Supabase storage:
- `src/data/work-items.ts` - Static project definitions (fallback data)
- `src/lib/supabase-projects.ts` - Project CRUD operations
- `src/hooks/use-projects.ts` - React hooks with automatic fallback to static data when Supabase is empty or unavailable

### Content Structure
```
Projects (Supabase: projects table)
├── Bilingual fields: title_en/de, subtitle_en/de, description_en/de
├── Metadata: year, category, client, role
├── Media: thumbnail URL, linked via project_media table
└── Admin: position (for ordering), is_published flag

Project Media (Supabase: project_media table)
├── Links media files to projects via project_slug
└── Storage in Supabase bucket
```

### Page Structure
- `/` - Home page with sections: Hero, ImageComparison, WorkGallery, Services, Process, Clients, Contact
- `/work/[slug]` - Individual project detail pages
- `/admin` - Content management interface
- `/imprint` - Legal information

### Component Patterns
- Section components in `src/components/sections/` compose the home page
- Layout components (Navigation, Footer) in `src/components/layout/`
- Work display: `WorkGallery` → `WorkModal` (modal view) or `WorkDetailPage` (full page)
- 3D components in `src/components/three/` using @react-three/fiber

## Environment Setup

Copy `.env.example` to `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

Required Supabase tables: `projects`, `project_media`
Required Supabase bucket: `media` (public)

## Conventions

- `@/` path alias for `src/` imports
- Server components by default; `'use client'` only for interactivity
- All container widths use `max-w-6xl` for consistency
- shadcn/ui components in `src/components/ui/`
- Remote images from `*.supabase.co` allowed in next.config.ts
