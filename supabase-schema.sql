-- Run this in your Supabase SQL Editor to create the project_media table

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
