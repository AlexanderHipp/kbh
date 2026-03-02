-- Run this in your Supabase SQL Editor to set up the database
-- Execute this entire file to create all required tables

-- ============================================
-- CATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_de TEXT NOT NULL,
  subtitle_en TEXT,
  subtitle_de TEXT,
  description_en TEXT,
  description_de TEXT,
  thumbnail_path TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_position ON categories(position);
CREATE INDEX IF NOT EXISTS idx_categories_published ON categories(is_published);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean re-runs)
DROP POLICY IF EXISTS "Allow public read categories" ON categories;
DROP POLICY IF EXISTS "Allow all operations categories" ON categories;

-- Policy to allow public read access for published categories
CREATE POLICY "Allow public read categories" ON categories
  FOR SELECT USING (is_published = true);

-- Policy to allow all operations (for admin - consider restricting in production)
CREATE POLICY "Allow all operations categories" ON categories
  FOR ALL USING (true);

-- ============================================
-- CATEGORY MEDIA TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS category_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_slug TEXT NOT NULL REFERENCES categories(slug) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('image', 'gif', 'video')),
  file_path TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_category_media_slug ON category_media(category_slug);
CREATE INDEX IF NOT EXISTS idx_category_media_position ON category_media(category_slug, position);

ALTER TABLE category_media ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean re-runs)
DROP POLICY IF EXISTS "Allow public read category_media" ON category_media;
DROP POLICY IF EXISTS "Allow all operations category_media" ON category_media;

-- Policy to allow public read access
CREATE POLICY "Allow public read category_media" ON category_media
  FOR SELECT USING (true);

-- Policy to allow all operations (for admin - consider restricting in production)
CREATE POLICY "Allow all operations category_media" ON category_media
  FOR ALL USING (true);

-- ============================================
-- STORAGE BUCKET SETUP
-- ============================================
-- Note: Run these in separate SQL statements or via Supabase Dashboard
--
-- 1. Create a storage bucket named "media" via Dashboard > Storage > New Bucket
--    - Set it to PUBLIC for serving images
--
-- Or via SQL (may require service role):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
--
-- Storage policies (run via Dashboard > Storage > Policies):
-- - Allow public read: SELECT for all users
-- - Allow authenticated upload: INSERT for authenticated users
-- - Allow authenticated delete: DELETE for authenticated users

-- ============================================
-- HELPER: Update timestamp trigger
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
