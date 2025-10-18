# Database Migration Guide: Company Relationships

**Migration Date**: October 2025
**Branch**: `companies-crud-feature`
**Purpose**: Migrate from TEXT-based company storage to relational company management

---

## 📋 Overview

This migration adds company relationship support to the CRM database by:
1. Adding `company_id` foreign key to `contacts` table
2. Adding `company_id` foreign key to `deals` table (future-proofing)
3. Extracting unique company names from existing `contacts.company` TEXT field
4. Creating company records in `companies` table
5. Linking contacts to companies via the new foreign key relationship

**Safety**: All changes are non-destructive. Original `contacts.company` TEXT column is preserved for 2+ weeks.

---

## ⚠️ Pre-Migration Checklist

Before running this migration, ensure:

- [ ] Database backup completed (Supabase Dashboard → Settings → Database → Backups)
- [ ] You have admin access to Supabase SQL Editor
- [ ] No other migrations are running
- [ ] All users are notified of brief maintenance window (if applicable)
- [ ] You have reviewed all migration scripts:
  - `01_add_company_relationships.sql`
  - `02_migrate_company_data.sql`

---

## 🚀 Migration Steps

### Step 1: Execute Schema Migration

**File**: `01_add_company_relationships.sql`
**Location**: Supabase Dashboard → SQL Editor → New Query

1. Open Supabase Dashboard and navigate to SQL Editor
2. Copy the entire contents of `01_add_company_relationships.sql`
3. Paste into SQL Editor
4. Review the SQL (it adds columns and indexes)
5. Click **Run** to execute
6. Verify success message appears

**Expected Duration**: ~1-2 seconds

**What This Does**:
- Adds `company_id UUID` column to `contacts` (nullable)
- Adds `company_id UUID` column to `deals` (nullable)
- Creates 3 indexes for JOIN query performance
- Does NOT modify any existing data

### Step 2: Verify Schema Changes

Run these verification queries in SQL Editor:

```sql
-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name IN ('contacts', 'deals')
  AND column_name = 'company_id';

-- Expected: 2 rows showing company_id in both tables
```

```sql
-- Verify indexes were created
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename IN ('contacts', 'deals')
  AND indexname LIKE '%company%';

-- Expected: 3 rows (idx_contacts_company_id, idx_deals_company_id, idx_contacts_user_company)
```

### Step 3: Execute Data Migration

**File**: `02_migrate_company_data.sql`
**Location**: Supabase Dashboard → SQL Editor → New Query

1. Copy the entire contents of `02_migrate_company_data.sql`
2. Paste into SQL Editor
3. **IMPORTANT**: Review the script to understand what it does
4. Click **Run** to execute
5. Note the execution time and any messages

**Expected Duration**: ~5-30 seconds (depends on data volume)

**What This Does**:
- Extracts unique company names from `contacts.company` TEXT field
- Creates new records in `companies` table (one per unique company per user)
- Updates `contacts.company_id` to point to the new company records
- Preserves original `contacts.company` TEXT data

### Step 4: Run Verification Queries

After data migration, verify success with these queries:

#### Query 1: Count Companies Created Per User
```sql
SELECT user_id, COUNT(*) as company_count
FROM public.companies
GROUP BY user_id
ORDER BY company_count DESC;
```

**Expected**: See count of unique companies per user

#### Query 2: Check Contact Linkage
```sql
SELECT
  COUNT(*) FILTER (WHERE company_id IS NOT NULL) as contacts_with_company,
  COUNT(*) FILTER (WHERE company_id IS NULL AND company IS NOT NULL) as contacts_missing_link,
  COUNT(*) FILTER (WHERE company_id IS NULL AND (company IS NULL OR TRIM(company) = '')) as contacts_no_company,
  COUNT(*) as total_contacts
FROM public.contacts;
```

**Expected**:
- `contacts_with_company`: Number of contacts that had company names
- `contacts_missing_link`: Should be **0** (if not, migration failed)
- `contacts_no_company`: Contacts that never had a company assigned
- `total_contacts`: Total number of contacts in system

#### Query 3: Verify Data Integrity
```sql
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
ORDER BY data_integrity DESC
LIMIT 100;
```

**Expected**: All rows should show `MATCH ✓` in the `data_integrity` column

#### Query 4: Find Orphaned Contacts
```sql
SELECT id, name, company, user_id
FROM public.contacts
WHERE company IS NOT NULL
  AND TRIM(company) != ''
  AND company_id IS NULL;
```

**Expected**: **0 rows returned** (if any rows appear, migration failed for those contacts)

#### Query 5: Migration Summary
```sql
SELECT
  'Migration Complete' as status,
  (SELECT COUNT(*) FROM public.companies) as total_companies,
  (SELECT COUNT(*) FROM public.contacts WHERE company_id IS NOT NULL) as contacts_linked,
  (SELECT COUNT(DISTINCT user_id) FROM public.companies) as users_with_companies,
  NOW() as migration_timestamp;
```

**Expected**: Summary statistics showing migration results

---

## ✅ Success Criteria

Migration is successful if:

- [ ] All verification queries return expected results
- [ ] No orphaned contacts found (Query 4 returns 0 rows)
- [ ] Data integrity check shows all matches (Query 3 shows MATCH ✓)
- [ ] No errors in Supabase SQL Editor
- [ ] Original `contacts.company` TEXT column still intact

---

## 🔄 Rollback Procedure

If issues are detected during verification, follow this rollback procedure:

### Immediate Rollback (Within Same Session)

```sql
-- Step 1: Unlink all contacts from companies
UPDATE public.contacts SET company_id = NULL;

-- Step 2: Delete companies created during migration
-- Get migration timestamp first, then:
DELETE FROM public.companies
WHERE created_at >= '[YOUR_MIGRATION_TIMESTAMP]';

-- Step 3: Verify rollback
SELECT COUNT(*) FROM public.contacts WHERE company_id IS NOT NULL;
-- Expected: 0

-- Original contacts.company TEXT data remains intact for fallback
```

### Full Rollback (Remove All Changes)

If you need to completely remove the migration:

```sql
-- Drop indexes
DROP INDEX IF EXISTS idx_contacts_company_id;
DROP INDEX IF EXISTS idx_deals_company_id;
DROP INDEX IF EXISTS idx_contacts_user_company;

-- Remove foreign key columns
ALTER TABLE public.contacts DROP COLUMN company_id;
ALTER TABLE public.deals DROP COLUMN company_id;

-- Delete all companies (if needed)
-- WARNING: Only run if you're certain
-- DELETE FROM public.companies;
```

---

## 📅 Safety Period (2+ Weeks)

After successful migration:

1. **Monitor for 2+ weeks** - Watch for any issues in production
2. **Verify functionality** - Test all contact-company features
3. **User feedback** - Ensure no data discrepancies reported
4. **Original data intact** - `contacts.company` TEXT column remains available

### After Safety Period: Optional Cleanup

Once verified (2+ weeks post-migration):

```sql
-- OPTIONAL: Drop the legacy TEXT column
-- ⚠️ WARNING: Only run after full verification
ALTER TABLE public.contacts DROP COLUMN company;
```

**Recommendation**: Keep the `company` TEXT column indefinitely for audit trail purposes. It uses minimal storage.

---

## 🐛 Troubleshooting

### Issue: Some contacts not linked to companies

**Symptom**: Query 4 returns rows (orphaned contacts)

**Diagnosis**:
```sql
-- Check for whitespace or special characters
SELECT id, name, company, length(company), company_id
FROM public.contacts
WHERE company IS NOT NULL
  AND TRIM(company) != ''
  AND company_id IS NULL;
```

**Fix**:
```sql
-- Manually create company and link contact
INSERT INTO public.companies (company_name, user_id)
VALUES ('[COMPANY_NAME]', '[USER_ID]')
RETURNING id;

UPDATE public.contacts
SET company_id = '[RETURNED_ID]'
WHERE id = '[CONTACT_ID]';
```

### Issue: Duplicate companies created

**Symptom**: Multiple company records with same name for same user

**Diagnosis**:
```sql
SELECT company_name, user_id, COUNT(*)
FROM public.companies
GROUP BY company_name, user_id
HAVING COUNT(*) > 1;
```

**Fix**:
```sql
-- Keep first company, reassign contacts, delete duplicates
-- Manual intervention required - contact support if this occurs
```

### Issue: Performance degradation after migration

**Symptom**: Queries slower than before

**Diagnosis**:
```sql
-- Check if indexes exist
SELECT indexname FROM pg_indexes
WHERE tablename IN ('contacts', 'deals')
  AND indexname LIKE '%company%';
```

**Fix**:
```sql
-- Recreate indexes if missing
CREATE INDEX idx_contacts_company_id ON public.contacts(company_id);
CREATE INDEX idx_deals_company_id ON public.deals(company_id);
CREATE INDEX idx_contacts_user_company ON public.contacts(user_id, company_id);
```

---

## 📊 Expected Results by Database Size

| Contacts Count | Migration Time | Companies Created (Est.) |
|----------------|----------------|--------------------------|
| 100            | ~1 second      | 20-50                    |
| 1,000          | ~5 seconds     | 100-300                  |
| 10,000         | ~15 seconds    | 500-2,000                |
| 100,000        | ~30 seconds    | 2,000-10,000             |

*Estimates assume ~20-50% of contacts have unique company names*

---

## 📝 Post-Migration Tasks

After successful migration and verification:

- [ ] Update CLAUDE.md with migration completion status
- [ ] Document migration timestamp and statistics
- [ ] Update codebase to use `company_id` instead of `company` TEXT
- [ ] Test all contact-company relationships in UI
- [ ] Monitor database performance for 24-48 hours
- [ ] Schedule safety period review (2+ weeks)

---

## 🆘 Support

If you encounter issues during migration:

1. **Do not panic** - Original data is preserved
2. **Take screenshots** of any error messages
3. **Run diagnostic queries** from Troubleshooting section
4. **Execute rollback** if necessary (see Rollback Procedure)
5. **Review migration logs** in Supabase Dashboard

---

## ✅ Migration Completion Checklist

- [ ] Schema migration executed successfully (Step 1)
- [ ] Schema changes verified (Step 2)
- [ ] Data migration executed successfully (Step 3)
- [ ] All verification queries passed (Step 4)
- [ ] No orphaned contacts found
- [ ] Data integrity confirmed (MATCH ✓)
- [ ] Migration timestamp documented
- [ ] Statistics recorded
- [ ] 2-week safety period scheduled
- [ ] Team notified of successful migration

---

**Document Version**: 1.0
**Last Updated**: October 2025
**Migration Scripts**: `01_add_company_relationships.sql`, `02_migrate_company_data.sql`
