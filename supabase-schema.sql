-- Run this in your Supabase SQL Editor to set up the database
-- Execute this entire file to create all required tables

-- ============================================
-- PROJECTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_de TEXT NOT NULL,
  subtitle_en TEXT,
  subtitle_de TEXT,
  description_en TEXT,
  description_de TEXT,
  role TEXT,
  client TEXT,
  year INTEGER,
  category TEXT,
  thumbnail TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_position ON projects(position);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Allow public read projects') THEN
    CREATE POLICY "Allow public read projects" ON projects FOR SELECT USING (is_published = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Allow all operations projects') THEN
    CREATE POLICY "Allow all operations projects" ON projects FOR ALL USING (true);
  END IF;
END $$;

-- ============================================
-- PROJECT MEDIA TABLE
-- ============================================

-- Create the project_media table
CREATE TABLE IF NOT EXISTS project_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('image', 'gif', 'video')),
  file_path TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster project lookups
CREATE INDEX IF NOT EXISTS idx_project_media_slug ON project_media(project_slug);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_project_media_position ON project_media(project_slug, position);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access
CREATE POLICY "Allow public read access" ON project_media
  FOR SELECT USING (true);

-- Policy to allow authenticated insert/update/delete (for admin)
-- Note: Adjust this based on your auth setup
CREATE POLICY "Allow all operations for authenticated users" ON project_media
  FOR ALL USING (true);

-- If you want to restrict to specific users, use something like:
-- CREATE POLICY "Allow admin operations" ON project_media
--   FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));
