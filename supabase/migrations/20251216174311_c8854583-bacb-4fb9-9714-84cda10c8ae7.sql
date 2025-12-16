-- Add columns to track actual active days
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS active_days_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_active_date date;