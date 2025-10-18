-- Migration: Add Company Relationships to Contacts and Deals
-- Date: October 2025
-- Purpose: Enable contact-company and deal-company relationships
-- Safety: NON-DESTRUCTIVE - All columns are nullable, original data preserved

-- ============================================================================
-- STEP 1: Add company_id Foreign Key to Contacts Table
-- ============================================================================

ALTER TABLE public.contacts
ADD COLUMN company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.contacts.company_id IS
'Foreign key to companies table. NULL if contact not associated with a company. ON DELETE SET NULL preserves contacts when company is deleted.';

-- ============================================================================
-- STEP 2: Add company_id Foreign Key to Deals Table (Future-Proofing)
-- ============================================================================

ALTER TABLE public.deals
ADD COLUMN company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.deals.company_id IS
'Foreign key to companies table for company-level deals. NULL for contact-only deals. Future feature: company-level deal tracking.';

-- ============================================================================
-- STEP 3: Create Indexes for JOIN Query Performance
-- ============================================================================

-- Index for contact-company JOINs (prevents N+1 query problem)
CREATE INDEX idx_contacts_company_id ON public.contacts(company_id);

-- Index for deal-company JOINs (future feature)
CREATE INDEX idx_deals_company_id ON public.deals(company_id);

-- Composite index for user + company filtering (query optimization)
CREATE INDEX idx_contacts_user_company ON public.contacts(user_id, company_id);

-- ============================================================================
-- VERIFICATION QUERIES (Run after migration to verify success)
-- ============================================================================

-- Check that columns were added successfully
-- Expected: company_id column should exist with UUID type
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contacts' AND column_name = 'company_id';

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'deals' AND column_name = 'company_id';

-- Check that indexes were created
-- Expected: 3 new indexes should appear
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename IN ('contacts', 'deals')
  AND indexname LIKE '%company%';

-- ============================================================================
-- ROLLBACK PROCEDURE (If needed)
-- ============================================================================

-- Uncomment and run ONLY if rollback is needed:

-- DROP INDEX IF EXISTS idx_contacts_company_id;
-- DROP INDEX IF EXISTS idx_deals_company_id;
-- DROP INDEX IF EXISTS idx_contacts_user_company;
-- ALTER TABLE public.contacts DROP COLUMN company_id;
-- ALTER TABLE public.deals DROP COLUMN company_id;

-- ============================================================================
-- NOTES
-- ============================================================================

-- ✅ SAFETY: Original contacts.company TEXT column is PRESERVED
-- ✅ SAFETY: All new columns are nullable (no data required immediately)
-- ✅ SAFETY: ON DELETE SET NULL preserves contacts when companies deleted
-- ✅ PERFORMANCE: Indexes created for efficient JOIN queries
--
-- NEXT STEP: Run 02_migrate_company_data.sql to populate company_id values
