# Quick Start: Database Migration Execution

**For detailed instructions, see `MIGRATION_GUIDE.md`**

---

## 🚀 Execute Migration (3 Steps)

### Step 1: Run Schema Migration
1. Open Supabase Dashboard → SQL Editor
2. Copy/paste `01_add_company_relationships.sql`
3. Click **Run**
4. Verify success ✅

### Step 2: Run Data Migration
1. Still in SQL Editor
2. Copy/paste `02_migrate_company_data.sql`
3. Click **Run**
4. Note execution time ⏱️

### Step 3: Verify Migration
Run this verification query:
```sql
SELECT
  'Migration Complete' as status,
  (SELECT COUNT(*) FROM public.companies) as total_companies,
  (SELECT COUNT(*) FROM public.contacts WHERE company_id IS NOT NULL) as contacts_linked,
  (SELECT COUNT(DISTINCT user_id) FROM public.companies) as users_with_companies;
```

**Expected**: See counts showing companies created and contacts linked

---

## ✅ Success Indicators

- No errors in SQL Editor
- Verification query returns results
- `contacts_linked` > 0 (if you had company data)
- Original `contacts.company` column still intact

---

## ⚠️ If Issues Occur

**Quick Rollback**:
```sql
UPDATE public.contacts SET company_id = NULL;
```

Then review `MIGRATION_GUIDE.md` for full troubleshooting steps.

---

## 📅 Next Steps

1. Monitor for 2+ weeks
2. Test contact-company features in UI
3. Keep `contacts.company` TEXT column for safety period
4. Proceed to Phase 2: Building UI components

---

**Full Documentation**: See `MIGRATION_GUIDE.md`
