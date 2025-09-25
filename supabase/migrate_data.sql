-- Data Migration Script from Rails to Supabase
-- Run this after setting up the schema and RLS policies

-- NOTE: This script assumes you've exported your Rails data and adapted it for Supabase
-- You'll need to replace the INSERT statements with your actual data

-- Step 1: Migrate Users to Profiles
-- IMPORTANT: Users must first be created through Supabase Auth, then profiles updated
-- This is a template - replace with actual data from your Rails users table

-- Example format for migrating users:
-- First, users sign up through Supabase Auth (or you create them programmatically)
-- Then update their profiles with Rails data:

/*
-- Update profiles with Rails user data (example):
UPDATE public.profiles SET
  first_name = 'John',
  last_name = 'Doe',
  username = 'johndoe'
WHERE id = '00000000-0000-0000-0000-000000000000'; -- Replace with actual Supabase user ID

-- Continue for each user...
*/

-- Step 2: Migrate Companies
-- Replace with actual data from your companies table
/*
INSERT INTO public.companies (id, company_name, owner_name, description, annual_rev, user_id) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Acme Corp', 'Jane Smith', 'Tech company', '$1M', '00000000-0000-0000-0000-000000000000'),
  -- Add more companies...
;
*/

-- Step 3: Migrate Contacts
-- Replace with actual data from your contacts table
/*
INSERT INTO public.contacts (id, name, image_url, email, job_title, company, user_id) VALUES
  ('22222222-2222-2222-2222-222222222222', 'Alice Johnson', 'https://example.com/alice.jpg', 'alice@example.com', 'Manager', 'Tech Co', '00000000-0000-0000-0000-000000000000'),
  -- Add more contacts...
;
*/

-- Step 4: Migrate Deals
-- Replace with actual data from your deals table
/*
INSERT INTO public.deals (id, deal_name, deal_stage, deal_type, amount, user_id, contact_id) VALUES
  ('33333333-3333-3333-3333-333333333333', 'Software License', 'Proposal', 'New Business', 50000, '00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222'),
  -- Add more deals...
;
*/

-- Step 5: Migrate Notes
-- Replace with actual data from your notes table
/*
INSERT INTO public.notes (id, title, details, deal_id) VALUES
  ('44444444-4444-4444-4444-444444444444', 'Initial Contact', 'Had a great conversation about their needs', '33333333-3333-3333-3333-333333333333'),
  -- Add more notes...
;
*/

-- Helper script to generate UUIDs for existing Rails integer IDs
-- You can use this in your Rails console to create a mapping:
/*
Rails Console Commands:
# Create UUID mapping for users
users_mapping = User.all.map { |u| { rails_id: u.id, uuid: SecureRandom.uuid } }

# Export to CSV or JSON for easier migration
File.write('user_mapping.json', users_mapping.to_json)
*/