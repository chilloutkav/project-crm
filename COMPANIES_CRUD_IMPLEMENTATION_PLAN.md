# Companies CRUD Feature - Implementation Plan

**Branch**: `companies-crud-feature`
**Status**: Phases 1-6 Complete - Ready for Testing & Documentation
**Created**: October 2025
**Last Updated**: October 18, 2025

**Completed**:
- ✅ Phase 1: Database migration (13 companies, 20 contacts linked)
- ✅ Phase 2: Validation schema with Unicode support
- ✅ Phase 3: 8 core UI components + react-select installed
- ✅ Phase 4: Company detail page with JOIN queries
- ✅ Phase 5: Navigation & integration with contact forms
- ✅ Phase 6: Delete company logic with cascade nullify confirmation

---

## 📊 Progress Summary

| Phase | Task | Status |
|-------|------|--------|
| **1** | Database Migration | ✅ COMPLETE (Oct 18) |
| **2** | Validation Schema | ✅ COMPLETE (Oct 18) |
| **3** | Core UI Components | ✅ COMPLETE (Oct 18) |
| **4** | Company Detail Page | ✅ COMPLETE (Oct 18) |
| **5** | Navigation & Integration | ✅ COMPLETE (Oct 18) |
| **6** | Delete Logic | ✅ COMPLETE (Oct 18) |
| **7** | Testing & Docs | ⏳ Final Review |

---

## 1. Feature Overview

### Purpose
Add comprehensive company management to the CRM, enabling users to:
- Create, read, update, and delete company records
- Associate multiple contacts with a single company
- View all contacts associated with a company
- Track company-level information (owner, revenue, description)
- Search and filter companies

### Business Value
- Better organization of B2B sales pipeline
- Company-level reporting and insights
- Improved contact context and relationship mapping
- Foundation for company-level deal tracking (future feature)

### Integration Points
- **Contacts**: Many-to-one relationship (multiple contacts per company)
- **Navigation**: New "Companies" section in main nav
- **Search**: Company name search functionality
- **Future**: Company-level deals and metrics

---

## 2. Database Architecture

### Companies Table (Already Exists ✅)
```sql
CREATE TABLE public.companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT,
  owner_name TEXT,
  description TEXT,
  annual_rev TEXT,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Fields**:
- `company_name`: Company name (REQUIRED via Zod validation)
- `owner_name`: Owner/CEO name (optional)
- `description`: Company description (optional)
- `annual_rev`: Annual revenue as TEXT for flexibility (e.g., "$1M-5M", "Not disclosed")
- `user_id`: Links to user who owns this company record

### Contact-Company Relationship Migration

**Current State**:
```sql
-- contacts table has:
company TEXT  -- Stores company name as plain text
```

**Target State**:
```sql
-- contacts table will have:
company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL

-- deals table will also have (future-proofing):
company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL
```

**Migration Strategy** (Smart Data Migration with Safety):
1. Add `company_id UUID` column to contacts (nullable)
2. Add `company_id UUID` column to deals (nullable) - future-proofing for company-level deals
3. Extract unique company names from existing `contacts.company` TEXT field
4. Create corresponding company records in `companies` table
5. Link contacts to new companies via `company_id`
6. **KEEP `contacts.company` TEXT column for 2 weeks** (safety period for verification)
7. After verification period, drop `contacts.company` TEXT column
8. Update schema.sql to reflect changes

**Rollback Strategy**:
```sql
-- If migration fails or needs rollback:
UPDATE public.contacts SET company_id = NULL;
-- Investigate issues and retry migration
-- Original contacts.company column remains intact during safety period
```

### Row Level Security (Already Complete ✅)
```sql
-- Users can only access their own companies
CREATE POLICY "Users can view own companies" ON public.companies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own companies" ON public.companies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own companies" ON public.companies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own companies" ON public.companies
  FOR DELETE USING (auth.uid() = user_id);
```

---

## 3. Frontend Component Architecture

### Design Theme: Orange/Amber 🟠
- Primary: `bg-orange-600`, `hover:bg-orange-700`
- Text: `text-orange-600`
- Focus: `focus:ring-orange-500`
- Distinguishes from: Blue (contacts), Green (deals), Purple (notes)

### New Components to Create

#### 1. **CompaniesContainer.js**
**Location**: `client/src/components/CompaniesContainer.js`
**Pattern**: Based on `ContactsContainer.js`
**Purpose**: Main companies list page

**Features**:
- Fetches user's companies from Supabase with JOIN queries
- Search functionality (by company name)
- Grid layout with CompanyCard components
- "Add Company" button (orange theme)
- Loading states with SkeletonLoader
- Empty state component
- Optimistic UI updates
- **Infinite scroll** for scalability (not pagination)

**Route**: `/dashboard/companies`

#### 2. **CompanyCard.js**
**Location**: `client/src/components/CompanyCard.js`
**Pattern**: Based on `ContactCard.js`
**Purpose**: Individual company display in grid

**Features**:
- Display company name, owner, revenue
- Click to navigate to CompanyPage
- Quick actions: Edit, Delete (orange buttons)
- Hover effects and animations

#### 3. **AddCompanyForm.js**
**Location**: `client/src/components/AddCompanyForm.js`
**Pattern**: Based on `AddContactForm.js`
**Purpose**: Modal form to create new company

**Features**:
- 4 fields: company_name*, owner_name, description, annual_rev
- Zod validation with inline errors
- Orange theme styling
- Toast notifications (success/error)
- Optimistic UI - company appears immediately
- Submit button disabled during submission

**Validation**:
```javascript
const { success, errors } = validateData(companySchema, formData);
```

#### 4. **EditCompanyModal.js**
**Location**: `client/src/components/EditCompanyModal.js`
**Pattern**: Based on `EditContactModal.js`
**Purpose**: Modal to edit existing company

**Features**:
- Pre-populated form fields
- Same validation as AddCompanyForm
- Orange theme matching add modal
- Cancel/Update buttons
- Error handling with user-friendly messages

#### 5. **CompanyPage.js**
**Location**: `client/src/components/CompanyPage.js`
**Pattern**: Based on `ContactsPage.js`
**Purpose**: Full detail view for single company

**Features**:
- Company header with all details
- Edit/Delete action buttons
- **Associated Contacts Section**:
  - List all contacts linked to this company
  - Display contact cards in grid
  - Click contact to navigate to ContactsPage
  - Show "No contacts yet" empty state
- Statistics: total contacts, total deals (future)

**Route**: `/dashboard/companies/:id`

#### 6. **CompanySearch.js**
**Location**: `client/src/components/CompanySearch.js`
**Pattern**: Based on `ContactSearch.js`
**Purpose**: Search bar component

**Features**:
- Real-time search filtering
- Search by company name
- Clear button to reset search

#### 7. **CompanyDropdown.js** ⭐ NEW
**Location**: `client/src/components/CompanyDropdown.js`
**Purpose**: Reusable searchable company selector for forms

**Features**:
- Uses **React Select library** for searchable dropdown
- Props: companies, value, onChange, isClearable
- "Create new company" option inline
- Handles no-selection (None option)
- Used in AddContactForm and EditContactModal
- Accessible and keyboard navigable

**Why Reusable**: Ensures consistent UX across all forms that need company selection

---

## 4. Implementation Phases

### Phase 1: Database Migration (with Safety Measures)
**Status**: ✅ COMPLETE (October 18, 2025)
**Files**: `supabase/schema.sql`, migration scripts
**Results**: 13 companies created, 20 contacts linked, 0 orphans, 100% data integrity

**Tasks**:
1. Add `company_id UUID` column to contacts table (nullable)
2. Add `company_id UUID` column to deals table (nullable) - **future-proofing**
3. Create data migration script:
   - Extract unique company names from `contacts.company`
   - Create company records with `company_name` field
   - Link contacts to companies via `company_id`
4. Verify data integrity
5. **KEEP `contacts.company` column for 2-week safety period**
6. After verification, drop `contacts.company` TEXT column
7. Update `schema.sql` documentation

**SQL Migration Script**:
```sql
-- Step 1: Add columns (NON-DESTRUCTIVE)
ALTER TABLE public.contacts
ADD COLUMN company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL;

ALTER TABLE public.deals
ADD COLUMN company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL;

-- Step 2: Migration logic (execute via Supabase SQL Editor)
-- Extract unique company names and create company records
-- Link contacts to companies via company_id

-- Step 3: VERIFICATION PERIOD (2 weeks)
-- Keep contacts.company column intact

-- Step 4: After verification, drop old column
-- ALTER TABLE public.contacts DROP COLUMN company;  -- ONLY after verified!
```

**Rollback Plan**:
```sql
-- If issues arise during safety period:
UPDATE public.contacts SET company_id = NULL;
-- Original data remains in contacts.company column
-- Investigate and retry migration
```

### Phase 2: Validation Schema (with Unicode Support)
**Status**: ✅ COMPLETE (October 18, 2025)
**Files**: `client/src/utils/validation.js` (lines 65-87)
**Documentation**: `PHASE_2_COMPLETION.md`

**Task**: Create `companySchema` with Zod and **Unicode regex** for international company names

```javascript
export const companySchema = z.object({
  company_name: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must not exceed 200 characters')
    .regex(/^[\p{L}\p{N}\s&.,'\-()]+$/u, 'Company name contains invalid characters'),
    // \p{L} allows all Unicode letters (supports international names)
    // \p{N} allows all Unicode numbers
    // Supports: "Café Pierre" (French), "東京株式会社" (Japanese), "Löwenbräu" (German)

  owner_name: z.string()
    .min(2, 'Owner name must be at least 2 characters')
    .max(100, 'Owner name must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  description: z.string()
    .max(1000, 'Description must not exceed 1000 characters')
    .optional()
    .or(z.literal('')),

  annual_rev: z.string()
    .max(100, 'Annual revenue must not exceed 100 characters')
    .optional()
    .or(z.literal(''))
});
```

**Implementation Details**:
- ✅ Schema added to `client/src/utils/validation.js` after `noteSchema`
- ✅ Exported as `companySchema` for use in components
- ✅ Unicode regex fully supports international characters
- ✅ All optional fields properly marked with `.optional().or(z.literal(''))`
- ✅ Consistent with existing schema patterns (contactSchema, dealSchema, noteSchema)

**Why Unicode**: Allows global company names with accents, non-Latin scripts, and international characters. Critical for B2B CRM used internationally.

**Testing Verified**:
- ✅ "Café Pierre" (French accents)
- ✅ "東京株式会社" (Japanese characters)
- ✅ "Löwenbräu" (German umlauts)
- ✅ "O'Reilly & Associates" (apostrophe and ampersand)

### Phase 3: Core UI Components
**Status**: ✅ COMPLETE (October 18, 2025)
**Files**: 8 new component files + react-select installed
**Documentation**: `PHASE_3_COMPLETION.md`

**Completed Tasks**:
1. ✅ Install React Select library: `npm install react-select`
2. ✅ Create CompanyDropdown.js (React Select searchable dropdown) ⭐ NEW
3. ✅ Create CompanyCard.js (display component with orange theme)
4. ✅ Create AddCompanyForm.js (modal with validation)
5. ✅ Create EditCompanyModal.js (edit modal)
6. ✅ Create CompanySearch.js (search bar)
7. ✅ Create CompaniesContainer.js (main page with infinite scroll)
8. ✅ Create CompanyPage.js (detail page with associated contacts)

**Infinite Scroll Implementation**:
```javascript
// In CompaniesContainer.js
const loadMore = async () => {
  const { data } = await supabase
    .from('companies')
    .select('*')
    .eq('user_id', user.id)
    .range(companies.length, companies.length + 19);

  setCompanies(prev => [...prev, ...data]);
};

// Use IntersectionObserver or react-infinite-scroll-component
```

### Phase 4: Company Detail Page (with JOIN Queries)
**Status**: ✅ COMPLETE (October 18, 2025)
**Files**: `CompanyPage.js` (created in Phase 3)

**Completed Implementation**:
1. ✅ Created CompanyPage component with all details
2. ✅ Fetches company data by ID from URL params
3. ✅ Fetches associated contacts with JOIN query:
```javascript
const { data: contactsData } = await supabase
  .from('contacts')
  .select('*, companies(company_name, id)')
  .eq('company_id', id);
```
4. ✅ Displays edit/delete actions with orange theme
5. ✅ Shows associated contacts grid with click-through to ContactsPage
6. ✅ Handles navigation and back button
7. ✅ Delete confirmation with cascade nullify message
8. ✅ Loading states and error handling

**Performance**: Using JOIN prevents N+1 query problem (single query instead of individual lookups).

**Features Implemented**:
- Company header with icon and metadata
- Company details grid (owner, revenue, description)
- Associated contacts section with rich contact cards
- Edit modal integration
- Delete with confirmation
- Responsive design

### Phase 5: Navigation & Integration (with JOIN Queries)
**Status**: ✅ COMPLETE (October 18, 2025)
**Files**: `NavBar.js`, `App.js`, `AddContactForm.js`, `EditContactModal.js`, `ContactCard.js`, `ContactsPage.js`, `ContactsContainer.js`

**Completed Tasks**:

**1. Navigation (NavBar.js)**: ✅
- ✅ Added "Companies" link **BEFORE** "Contacts"
- ✅ New order: Dashboard → **Companies** → Contacts → Deals → Reports
- ✅ Orange theme applied (Building2 icon)
- ✅ Added to both desktop and mobile navigation
- Rationale: Companies are organizational level above individual contacts

**2. Routing (App.js)**: ✅
- ✅ Added route: `/dashboard/companies` → CompaniesContainer
- ✅ Added route: `/dashboard/companies/:id` → CompanyPage
- ✅ Imported both components

**3. Contact Forms Integration (with CompanyDropdown)**: ✅

**AddContactForm.js**:
- ✅ Imported CompanyDropdown component
- ✅ Added `companies` state and `companyId` state
- ✅ Fetch user's companies on mount
- ✅ Optional selection (can create contact without company)
- ✅ Submit with `company_id` field
- ✅ Updated SELECT to use JOIN for optimistic UI

**EditContactModal.js**:
- ✅ Imported CompanyDropdown component
- ✅ Added `companies` state and `companyId` state
- ✅ Fetch companies on mount
- ✅ Pre-populate with existing company (from `contact.company_id`)
- ✅ Allow changing or removing company association
- ✅ Consistent UX with AddContactForm
- ✅ Updated SELECT to use JOIN for optimistic UI

**4. Display Company on Contacts (with JOIN Queries)**: ✅

**ContactsContainer.js**:
- ✅ Updated query to use JOIN (prevent N+1):
```javascript
const { data, error } = await supabase
  .from('contacts')
  .select('*, companies(company_name, id)')
  .eq('user_id', user.id);
```

**ContactCard.js**:
- ✅ Display company name from JOIN: `contact.companies?.company_name`
- ✅ Fallback to old field: `contact.company` (safety period)
- ✅ Changed color to orange for company text
- ✅ No additional queries needed per card (performance optimization)

**ContactsPage.js**:
- ✅ Updated query to use JOIN with company data
- ✅ Made company name clickable in profile card section
- ✅ Made company name clickable in Contact Information section
- ✅ Link to `/dashboard/companies/${companyId}`
- ✅ Orange text color matching Companies theme

### Phase 6: Delete Company Logic
**Status**: ✅ COMPLETE (October 18, 2025)
**Files**: `CompanyPage.js`, `CompaniesContainer.js`

**Delete Behavior**: Cascade Nullify ✅
- When company deleted, set all linked `contact.company_id = NULL`
- Contacts remain in system, just unlinked from company
- Database ON DELETE SET NULL constraint handles the nullification

**Implementation Details**:

**CompanyPage.js**: ✅
- `handleDeleteCompany()` function with cascade confirmation
- Shows contact count in confirmation dialog
- Toast notifications for success/error
- Navigates back to company list after deletion

**CompaniesContainer.js**: ✅
- `handleDeleteClick()` function with cascade confirmation
- Same confirmation logic as CompanyPage.js
- Toast notifications for success/error
- Removes company from list (optimistic UI)
- Friendly error messages with `handleSupabaseError()`

**CompanyCard.js**: ✅
- Delete button calls `onDelete` handler
- Handler executed by parent CompaniesContainer

**Features Implemented**:
- ✅ Check for associated contacts before deletion
- ✅ Show confirmation with contact count
- ✅ Proper pluralization in messages
- ✅ Toast notifications on success/error
- ✅ Error handling with user-friendly messages
- ✅ Logging for debugging
- ✅ Optimistic UI in CompaniesContainer
- ✅ Navigation to company list in CompanyPage

**Confirmation Examples**:
- No contacts: `Delete company "Acme Corp"?`
- With contacts: `3 contacts are linked to this company. They will be unlinked. Continue?`

**Success Messages**:
- No contacts: `Company deleted successfully!`
- With contacts: `Company deleted. 3 contacts unlinked.`

### Phase 7: Testing & Documentation
**Status**: Pending
**Files**: Various, plus `CLAUDE.md`

**Tasks**:
1. Test all CRUD operations
2. Verify RLS security (users can't access others' companies)
3. Test contact-company relationships
4. Run accessibility audit (maintain 100/100 Lighthouse)
5. Test search functionality
6. Test delete cascade nullify
7. Verify optimistic UI updates
8. Update `CLAUDE.md` with Companies feature docs

---

## 5. Technical Decisions

### Decision 1: Only company_name Required
**Rationale**: Users may not always have complete company information (owner, revenue, description). Requiring only the company name allows quick data entry and progressive information gathering.

### Decision 2: Smart Data Migration
**Rationale**: Automatically creating companies from existing contact.company TEXT values preserves data and saves users manual re-entry work. The migration is reversible if issues arise.

### Decision 3: Full Detail Page (CompanyPage.js)
**Rationale**: Following the pattern of ContactsPage and DealPage, a dedicated detail view provides space for associated contacts list and future company-level metrics/deals. More scalable than modal-only approach.

### Decision 4: Delete Cascade Nullify
**Rationale**:
- Contacts are valuable and shouldn't be deleted with company
- Setting company_id to NULL preserves data integrity
- Users can re-associate contacts later if needed
- More forgiving than blocking deletion or cascading delete

### Decision 5: Orange/Amber Theme
**Rationale**: Establishes clear visual hierarchy:
- Blue: Contacts (people)
- Green: Deals (money)
- Purple: Notes (information)
- Orange: Companies (organizations)

### Decision 6: React Select for Searchable Dropdown
**Rationale**:
- Professional, accessible searchable dropdown component
- Handles keyboard navigation automatically
- Supports custom options like "Create new company"
- Better UX than native HTML select for users with many companies
- Widely used, well-maintained library

### Decision 7: Infinite Scroll Over Pagination
**Rationale**:
- Better mobile UX (no need to tap "Next" button)
- Faster browsing for users scanning many companies
- Consistent with modern SaaS applications
- Simpler implementation than pagination UI
- Graceful handling of large datasets

### Decision 8: Unicode Regex for International Support
**Rationale**:
- CRM should support global businesses with non-ASCII company names
- `/^[\p{L}\p{N}\s&.,'\-()]+$/u` allows French, German, Japanese, Chinese, Arabic names
- Prevents blocking legitimate international companies
- No performance penalty for supporting Unicode
- Future-proof for global expansion

### Decision 9: JOIN Queries to Prevent N+1 Problem
**Rationale**:
- Single query with JOIN faster than N individual lookups
- Supabase supports foreign key expansion: `.select('*, companies(company_name)')`
- Reduces database load significantly (1 query vs potentially 100+)
- Better scalability as user's contact list grows
- Industry best practice for performance optimization

### Decision 10: Add company_id to Deals Table Now
**Rationale**:
- Future-proofs for company-level deals feature
- Avoids second migration later
- Minimal cost to add column now (nullable, no data)
- Allows deals to be associated with company OR contact OR both
- Enables richer reporting capabilities when needed

---

## 6. File Changes Required

### New Files (8 total)
1. `client/src/components/CompaniesContainer.js` - Main companies page with infinite scroll
2. `client/src/components/CompanyCard.js` - Individual company display
3. `client/src/components/AddCompanyForm.js` - Create company modal
4. `client/src/components/EditCompanyModal.js` - Edit company modal
5. `client/src/components/CompanyPage.js` - Company detail page
6. `client/src/components/CompanySearch.js` - Search bar component
7. `client/src/components/CompanyDropdown.js` ⭐ **NEW** - Reusable React Select dropdown
8. Migration script (temporary, for data migration)

### Modified Files (10 total)
1. `supabase/schema.sql` - Add company_id to contacts **and deals**
2. `client/src/utils/validation.js` - Add companySchema (with Unicode regex)
3. `client/src/components/NavBar.js` - Add Companies link **before** Contacts
4. `client/src/components/App.js` - Add routes
5. `client/src/components/AddContactForm.js` - Add CompanyDropdown component
6. `client/src/components/EditContactModal.js` - Add CompanyDropdown component
7. `client/src/components/ContactCard.js` - Display company name from JOIN
8. `client/src/components/ContactsPage.js` - Make company name clickable
9. `client/src/components/ContactsContainer.js` ⭐ **NEW** - Update query with JOIN
10. `CLAUDE.md` - Document Companies feature

### Package Installation
- `react-select` - For searchable company dropdown component

---

## 7. Acceptance Criteria

### Functional Requirements ✅
- [ ] Users can create companies with validation
- [ ] Users can view all their companies in grid layout
- [ ] Users can search companies by name
- [ ] Users can edit company details
- [ ] Users can delete companies (with confirmation if contacts exist)
- [ ] Users can view company detail page with associated contacts
- [ ] Users can associate contacts with companies during create/edit
- [ ] Contact cards display associated company name
- [ ] Deleting a company sets contact.company_id to NULL
- [ ] Companies link appears in navigation
- [ ] All routes work correctly

### Technical Requirements ✅
- [ ] RLS policies enforce data isolation (users can't see others' companies)
- [ ] Zod validation prevents invalid data entry
- [ ] Toast notifications for all operations (success/error)
- [ ] Optimistic UI updates (companies appear immediately)
- [ ] Loading states with SkeletonLoader
- [ ] Empty states for no companies / no contacts
- [ ] Error handling with user-friendly messages
- [ ] Inline validation errors on forms

### Quality Requirements ✅
- [ ] Accessibility: Maintain 100/100 Lighthouse score
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Orange theme consistently applied
- [ ] Code follows existing patterns (ContactsContainer, etc.)
- [ ] No console errors or warnings
- [ ] Data integrity maintained during migration

---

## 8. Testing Plan

### Unit Tests
- Zod validation schema (companySchema)
- Company CRUD helper functions
- Search filtering logic

### Integration Tests
1. **Create Company**:
   - Valid data creates company
   - Invalid data shows errors (including Unicode test)
   - Toast notification appears
   - Optimistic UI works

2. **Read Companies**:
   - Fetches only user's companies
   - Displays in grid correctly
   - Loading state shows skeleton
   - Infinite scroll loads more companies
   - JOIN queries work (no N+1 problem)

3. **Update Company**:
   - Pre-populates form
   - Validates changes (including Unicode)
   - Updates UI immediately

4. **Delete Company**:
   - Shows confirmation if contacts exist
   - Nullifies contact.company_id
   - Removes from list
   - Redirects to companies list

5. **Contact-Company Relationship**:
   - Contact can be associated during creation (via CompanyDropdown)
   - Contact can be associated during editing (via CompanyDropdown)
   - Company dropdown is searchable (React Select)
   - Company name displays on contact card from JOIN
   - CompanyPage shows all associated contacts
   - Clicking contact navigates to ContactsPage

6. **International Support**:
   - Can create companies with Unicode names (French, Japanese, German, etc.)
   - Validation accepts international characters
   - Search works with Unicode company names

### Security Tests
- [ ] User A cannot see User B's companies
- [ ] User A cannot edit/delete User B's companies
- [ ] RLS policies prevent API bypassing

### Accessibility Audit
- [ ] Run Lighthouse audit on CompaniesContainer
- [ ] Run Lighthouse audit on CompanyPage
- [ ] Verify all interactive elements have labels
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

### Data Migration Testing
- [ ] Backup data before migration
- [ ] Verify unique companies created correctly
- [ ] Verify contacts linked to correct companies
- [ ] Verify no data loss
- [ ] Test rollback plan if needed

---

## 9. Implementation Checklist

### Phase 1: Database (Tasks 1-5)
- [ ] Task 1: Design schema ✅ (already complete)
- [ ] Task 2: Create companies table ✅ (already complete)
- [ ] Task 3: Set up RLS policies ✅ (already complete)
- [ ] Task 4: Add company_id to contacts table
- [ ] Task 5: Add company_id to deals table (future-proofing)
- [ ] Task 6: Migrate contacts.company TEXT → company_id FK (with 2-week safety period)

### Phase 2: Package Installation (Task 7)
- [ ] Task 7: Install React Select: `npm install react-select`

### Phase 3: Validation (Task 8)
- [ ] Task 8: Create companySchema with Unicode regex in validation.js

### Phase 4: Core UI (Tasks 9-15)
- [ ] Task 9: Create CompanyDropdown.js (reusable React Select component)
- [ ] Task 10: Create CompanyCard.js
- [ ] Task 11: Create AddCompanyForm.js (using CompanyDropdown)
- [ ] Task 12: Create EditCompanyModal.js (using CompanyDropdown)
- [ ] Task 13: Create CompanySearch.js
- [ ] Task 14: Build CompaniesContainer.js with infinite scroll
- [ ] Task 15: Add search and empty states

### Phase 5: Detail Page (Task 16)
- [ ] Task 16: Build CompanyPage.js with contacts list (using JOIN queries)

### Phase 6: Integration (Tasks 17-21)
- [ ] Task 17: Update NavBar with Companies link (BEFORE Contacts)
- [ ] Task 18: Update ContactsContainer.js query with JOIN
- [ ] Task 19: Update AddContactForm with CompanyDropdown
- [ ] Task 20: Update EditContactModal with CompanyDropdown
- [ ] Task 21: Update ContactCard.js to display company from JOIN
- [ ] Task 22: Update ContactsPage.js to make company clickable

### Phase 6: Delete Logic (Task 15)
- [ ] Task 15: Implement delete with cascade nullify

### Phase 7: Testing & Docs (Tasks 16-20)
- [ ] Task 16: Test all CRUD operations
- [ ] Task 17: Verify RLS security
- [ ] Task 18: Test contact-company relationships
- [ ] Task 19: Run accessibility audit
- [ ] Task 20: Update CLAUDE.md

---

## 10. Next Steps

1. **Start with Phase 1, Task 4**: Database migration for contact-company relationship
2. **Move to Phase 2**: Create validation schema
3. **Build Phase 3**: Core UI components (highest user value)
4. **Continue sequentially** through remaining phases
5. **Test thoroughly** before marking complete
6. **Document in CLAUDE.md** when feature is production-ready

---

**Document Version**: 1.0
**Last Updated**: October 2025
**Branch**: `companies-crud-feature`
