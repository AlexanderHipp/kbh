# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **kbh**, a Next.js 16 media gallery application with Supabase storage integration. Users can upload, view, and delete images, GIFs, and videos.

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
- **Supabase** for media storage (bucket: `media`)
- **shadcn/ui** configured with nova style and hugeicons

## Architecture

### Data Flow
Server component (`page.tsx`) fetches media from Supabase, passes to client component (`MediaPageClient`) which manages local state for uploads/deletes. This pattern enables SSR while supporting interactive updates without page refreshes.

### File Structure
```
src/
  app/
    layout.tsx        # Root layout with Public Sans + JetBrains Mono fonts
    page.tsx          # Server component - fetches initial media
    globals.css       # Tailwind + shadcn styles
  components/
    media-page-client.tsx  # Client state wrapper
    media-upload.tsx       # Drag-and-drop upload
    media-gallery.tsx      # Grid display + modal
  lib/
    supabase.ts       # Supabase client + MediaItem type + CRUD operations
    utils.ts          # cn() helper for Tailwind class merging
```

### Supabase Integration
- Single client instance created at module load
- Public bucket `media` stores all files
- Files named with timestamp prefix: `{Date.now()}-{filename}`
- Type detection from file extension (image/gif/video)

## Environment Setup

Copy `.env.example` to `.env.local` and configure:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

Requires a public storage bucket named `media` in Supabase.

## Conventions

- Uses `@/` path alias for `src/` imports
- Server components by default; `'use client'` only where needed
- shadcn/ui components go in `src/components/ui/`
- Remote images from `*.supabase.co` are allowed in next.config.ts
