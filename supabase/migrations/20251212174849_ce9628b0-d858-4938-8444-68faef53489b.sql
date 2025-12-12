-- Add new columns to profiles table for user info and settings
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS starting_weight numeric,
ADD COLUMN IF NOT EXISTS dark_mode boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS use_metric boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS email_notifications boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS push_notifications boolean DEFAULT false;

-- Set starting_weight to current weight if not set (for existing users)
UPDATE public.profiles 
SET starting_weight = weight 
WHERE starting_weight IS NULL AND weight IS NOT NULL;