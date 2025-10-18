-- Migration: Migrate Company Data from contacts.company TEXT to companies table
-- Date: October 2025
-- Purpose: Extract unique company names and create company records
-- Safety: Original contacts.company TEXT column PRESERVED for 2-week safety period

-- ============================================================================
-- PREREQUISITES
-- ============================================================================
-- 1. Run 01_add_company_relationships.sql first
-- 2. Backup your database before running this migration
-- 3. Verify companies table exists with RLS policies

-- ============================================================================
-- STEP 1: Extract Unique Companies Per User and Create Company Records
-- ============================================================================

-- This query creates company records from unique company names in contacts table
-- Only processes non-null, non-empty company names
-- Maintains user isolation (each user gets their own company records)

INSERT INTO public.companies (company_name, user_id, created_at, updated_at)
SELECT DISTINCT
  TRIM(c.company) AS company_name,
  c.user_id,
  NOW() AS created_at,
  NOW() AS updated_at
FROM public.contacts c
WHERE c.company IS NOT NULL
  AND TRIM(c.company) != ''
  -- Only create if company doesn't already exist for this user
  AND NOT EXISTS (
    SELECT 1
    FROM public.companies comp
    WHERE comp.company_name = TRIM(c.company)
      AND comp.user_id = c.user_id
  )
ORDER BY c.user_id, TRIM(c.company);

-- ============================================================================
-- STEP 2: Link Contacts to Their Company Records via company_id
-- ============================================================================

-- Update contacts to point to their corresponding company records
-- Matches by company_name and user_id to ensure correct association

UPDATE public.contacts
SET company_id = (
  SELECT comp.id
  FROM public.companies comp
  WHERE comp.company_name = TRIM(contacts.company)
    AND comp.user_id = contacts.user_id
  LIMIT 1
)
WHERE contacts.company IS NOT NULL
  AND TRIM(contacts.company) != '';

-- ============================================================================
-- VERIFICATION QUERIES (Run after migration)
-- ============================================================================

-- 1. Count companies created per user
SELECT user_id, COUNT(*) as company_count
FROM public.companies
GROUP BY user_id
ORDER BY company_count DESC;

-- 2. Check how many contacts are linked to companies
SELECT
  COUNT(*) FILTER (WHERE company_id IS NOT NULL) as contacts_with_company,
  COUNT(*) FILTER (WHERE company_id IS NULL AND company IS NOT NULL) as contacts_missing_link,
  COUNT(*) FILTER (WHERE company_id IS NULL AND (company IS NULL OR TRIM(company) = '')) as contacts_no_company,
  COUNT(*) as total_contacts
FROM public.contacts;

-- 3. Verify data integrity: Compare TEXT vs FK data
-- All rows should have matching company names
SELECT
  c.id as contact_id,
  c.name as contact_name,
  c.company as old_company_text,
  comp.company_name as new_company_name,
  CASE
    WHEN TRIM(c.company) = comp.company_name THEN 'MATCH ✓'
    ELSE 'MISMATCH ✗'
  END as data_integrity
FROM public.contacts c
LEFT JOIN public.companies comp ON c.company_id = comp.id
WHERE c.company IS NOT NULL AND TRIM(c.company) != ''
ORDER BY data_integrity DESC, c.user_id;

-- 4. Find any orphaned contacts (have company TEXT but no company_id)
-- This should return 0 rows after successful migration
SELECT id, name, company, user_id
FROM public.contacts
WHERE company IS NOT NULL
  AND TRIM(company) != ''
  AND company_id IS NULL;

-- ============================================================================
-- ROLLBACK PROCEDURE (If issues detected)
-- ============================================================================

-- Uncomment and run ONLY if migration needs to be reversed:

-- Step 1: Unlink all contacts from companies
-- UPDATE public.contacts SET company_id = NULL;

-- Step 2: Delete all companies created by this migration
-- WARNING: Only run if you're certain these companies should be removed
-- DELETE FROM public.companies WHERE created_at >= '[MIGRATION_START_TIME]';

-- Step 3: Original contacts.company TEXT data remains intact for fallback

-- ============================================================================
-- POST-MIGRATION CLEANUP (Run after 2+ week safety period)
-- ============================================================================

-- After verifying everything works correctly for 2+ weeks, you can optionally
-- drop the old contacts.company TEXT column:

-- ALTER TABLE public.contacts DROP COLUMN company;

-- ⚠️  WARNING: Only run cleanup after:
--    1. Verifying all data migrated correctly
--    2. Testing all contact-company functionality in production
--    3. Confirming no rollback is needed
--    4. At least 2 weeks have passed since migration

-- ============================================================================
-- MIGRATION STATISTICS
-- ============================================================================

-- Run this to get a summary of the migration:
SELECT
  'Migration Complete' as status,
  (SELECT COUNT(*) FROM public.companies) as total_companies,
  (SELECT COUNT(*) FROM public.contacts WHERE company_id IS NOT NULL) as contacts_linked,
  (SELECT COUNT(DISTINCT user_id) FROM public.companies) as users_with_companies,
  NOW() as migration_timestamp;
