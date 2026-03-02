-- Run this in Supabase SQL Editor to fix storage upload permissions
-- This allows public access to the media bucket

-- Allow public uploads to media bucket
CREATE POLICY "Allow public upload to media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media');

-- Allow public read from media bucket
CREATE POLICY "Allow public read from media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Allow public delete from media bucket
CREATE POLICY "Allow public delete from media"
ON storage.objects FOR DELETE
USING (bucket_id = 'media');

-- Allow public update in media bucket
CREATE POLICY "Allow public update in media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media');
