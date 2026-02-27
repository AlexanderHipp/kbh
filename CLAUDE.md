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
- **Supabase** for categories and media storage
- **shadcn/ui** with nova style (Radix UI primitives)
- **Three.js** with @react-three/fiber for 3D hero scene
- **Framer Motion** (via `motion` package) for animations
- **Resend** for contact form emails

## Architecture

### Internationalization (i18n)
Client-side locale switching without page reloads:
- `src/lib/i18n/dictionary.ts` - All translations (EN/DE) with typed `Dictionary` interface
- `src/lib/i18n/get-locale.ts` - Server-side locale detection from cookies
- `LocaleProvider` + `useLocale()` hook for client components
- Locale stored in cookie, toggled via `LanguageToggle` component

### Data Layer - Hybrid Static/Database
Categories support both static fallback and Supabase storage:
- `src/data/work-items.ts` - Static `WorkItem[]` definitions (fallback data)
- `src/lib/supabase-categories.ts` - Category CRUD operations
- `src/lib/supabase-media.ts` - Media upload/delete/reorder operations
- `src/hooks/use-categories.ts` - React hooks with automatic fallback to static data when Supabase is empty or unavailable

### Content Structure
```
Categories (Supabase: categories table)
├── Bilingual fields: title_en/de, subtitle_en/de, description_en/de
├── thumbnail_path (stored in Supabase storage)
└── Admin: position (for ordering), is_published flag

Category Media (Supabase: category_media table)
├── Links media files to categories via category_slug
├── type: "image" | "gif" | "video"
└── Storage in Supabase bucket "media"
```

### Page Structure
- `/` - Home page with sections: Hero, ImageComparison, WorkGallery, Services, Process, Clients, Contact
- `/work/[slug]` - Individual category detail pages
- `/admin` - Content management interface (password protected)
- `/imprint` - Legal information

### Component Patterns
- Section components in `src/components/sections/` compose the home page
- Layout components (Navigation, Footer) in `src/components/layout/`
- Work display: `WorkGallery` → `WorkModal` (modal view) or `WorkDetailPage` (full page)
- 3D components in `src/components/three/` using @react-three/fiber
- Drag-and-drop reordering uses `@dnd-kit`

## Environment Setup

Copy `.env.example` to `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - For server-side operations
- `NEXT_PUBLIC_ADMIN_PASSWORD` - Password for /admin page
- `RESEND_API_KEY` - For contact form emails

Required Supabase tables: `categories`, `category_media`
Required Supabase bucket: `media` (public)

## Conventions

- `@/` path alias for `src/` imports
- Server components by default; `'use client'` only for interactivity
- All container widths use `max-w-6xl` for consistency
- shadcn/ui components in `src/components/ui/`
- Remote images from `*.supabase.co` allowed in next.config.ts
