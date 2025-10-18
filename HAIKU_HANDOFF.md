# Haiku Handoff: Companies CRUD UI Implementation

**Date**: October 18, 2025
**Branch**: `companies-crud-feature`
**Phase**: 2-6 (UI Components & Integration)
**Estimated Task Count**: ~22 tasks

---

## ✅ Phase 1 Complete (Database)

**Sonnet completed:**
- ✅ Database schema migration (company_id columns added)
- ✅ Data migration (13 companies created, 20 contacts linked)
- ✅ Indexes created for JOIN query performance
- ✅ 100% data integrity verified
- ✅ Safety measures in place (original data preserved)

**You can now build on top of this database schema.**

---

## 🎯 Your Mission: Build Companies CRUD UI

You will implement **Phases 2-6** following the detailed specifications in `COMPANIES_CRUD_IMPLEMENTATION_PLAN.md`.

### Phase Overview
1. **Phase 2**: Validation schema (Zod with Unicode support)
2. **Phase 3**: Core UI components (8 new React components)
3. **Phase 4**: Company detail page (with JOIN queries)
4. **Phase 5**: Navigation & integration (React Select, update existing components)
5. **Phase 6**: Delete logic (cascade nullify confirmation)

---

## 📦 Phase 2: Validation Schema

### Task: Create `companySchema` in `client/src/utils/validation.js`

**Location**: Add to existing validation.js file (line ~90, after noteSchema)

**Code to add:**
```javascript
// Company validation schema (with Unicode support for international names)
export const companySchema = z.object({
  company_name: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must not exceed 200 characters')
    .regex(/^[\p{L}\p{N}\s&.,'\-()]+$/u, 'Company name contains invalid characters'),
    // ^\p{L} allows all Unicode letters (French, Japanese, German, etc.)
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

**Checklist:**
- [ ] Add companySchema to validation.js
- [ ] Export companySchema
- [ ] Test Unicode regex with international company names

---

## 📦 Phase 3: Core UI Components (8 files)

### Step 1: Install React Select
```bash
cd client
npm install react-select
```

### Component 1: CompanyDropdown.js

**Path**: `client/src/components/CompanyDropdown.js`
**Pattern**: New component (uses React Select library)
**Purpose**: Reusable searchable company selector for forms

**Props**:
- `companies` - Array of company objects
- `value` - Selected company ID
- `onChange` - Callback function
- `isClearable` - Boolean (allow deselection)

**Features**:
- Searchable dropdown using React Select
- "None" option for no selection
- Keyboard navigable
- Accessible (aria-labels)

**Example usage:**
```javascript
<CompanyDropdown
  companies={companies}
  value={formData.company_id}
  onChange={(companyId) => setFormData({ ...formData, company_id: companyId })}
  isClearable={true}
/>
```

**Base on**: React Select documentation, ContactSearch.js for styling cues

### Component 2: CompanyCard.js

**Path**: `client/src/components/CompanyCard.js`
**Pattern**: Based on `ContactCard.js`
**Theme**: Orange (`bg-orange-600`, `hover:bg-orange-700`, `text-orange-600`)

**Display**:
- Company name (large, bold)
- Owner name (if present)
- Annual revenue (if present)
- Edit button (orange)
- Delete button (orange, outline)

**Interactions**:
- Click card → navigate to `/dashboard/companies/${id}`
- Edit button → opens EditCompanyModal
- Delete button → confirmation dialog

**Base on**: `ContactCard.js` (lines 1-80)

### Component 3: AddCompanyForm.js

**Path**: `client/src/components/AddCompanyForm.js`
**Pattern**: Based on `AddContactForm.js`
**Theme**: Orange

**Fields**:
1. Company Name (required, text input)
2. Owner Name (optional, text input)
3. Description (optional, textarea)
4. Annual Revenue (optional, text input)

**Features**:
- Zod validation with `companySchema`
- Inline validation errors
- Toast notifications (success/error)
- Optimistic UI (company appears immediately)
- Loading state (button disabled during submit)
- Orange theme buttons

**Base on**: `AddContactForm.js` (lines 1-150)

### Component 4: EditCompanyModal.js

**Path**: `client/src/components/EditCompanyModal.js`
**Pattern**: Based on `EditContactModal.js`
**Theme**: Orange

**Features**:
- Pre-populated form fields
- Same validation as AddCompanyForm
- Cancel/Update buttons (orange)
- Error handling with handleSupabaseError()
- Toast notifications

**Base on**: `EditContactModal.js` (lines 1-200)

### Component 5: CompanySearch.js

**Path**: `client/src/components/CompanySearch.js`
**Pattern**: Based on `ContactSearch.js`

**Features**:
- Real-time search filtering
- Search by company name
- Clear button to reset
- Orange accent color for focus states

**Base on**: `ContactSearch.js` (exact copy with prop name changes)

### Component 6: CompaniesContainer.js

**Path**: `client/src/components/CompaniesContainer.js`
**Pattern**: Based on `ContactsContainer.js`
**Theme**: Orange

**Features**:
- Fetches companies: `supabase.from('companies').select('*').eq('user_id', user.id)`
- Search functionality (by company name)
- Grid layout with CompanyCard components
- "Add Company" button (orange, top-right)
- Loading state with SkeletonLoader
- Empty state component
- Optimistic UI updates
- **Infinite scroll** (load 20 at a time)

**Route**: `/dashboard/companies`

**Base on**: `ContactsContainer.js` (lines 1-250)

### Component 7: CompanyPage.js

**Path**: `client/src/components/CompanyPage.js`
**Pattern**: Based on `ContactsPage.js`
**Theme**: Orange

**Sections**:
1. **Company Header**:
   - Company name (large heading)
   - Owner, description, revenue
   - Edit button (orange)
   - Delete button (orange, outline)

2. **Associated Contacts Section**:
   - Heading: "Contacts at [Company Name]"
   - Fetch contacts with JOIN:
     ```javascript
     const { data: contacts } = await supabase
       .from('contacts')
       .select('*, companies(company_name, id)')
       .eq('company_id', companyId)
       .eq('user_id', user.id);
     ```
   - Display contact cards in grid
   - Click contact → navigate to `/dashboard/contacts/${contactId}`
   - Empty state: "No contacts yet"

**Route**: `/dashboard/companies/:id`

**Base on**: `ContactsPage.js` (lines 1-300)

---

## 📦 Phase 4: Company Detail Page

**Task**: Already covered in Component 7 (CompanyPage.js) above

**Key requirement**: Use JOIN query to prevent N+1 problem:
```javascript
.select('*, companies(company_name, id)')
```

---

## 📦 Phase 5: Navigation & Integration

### Task 1: Update NavBar.js

**File**: `client/src/components/NavBar.js`
**Location**: Line ~30-50 (navigation links section)

**Change**: Add "Companies" link **BEFORE** "Contacts"

**New order**:
- Dashboard
- **Companies** (NEW)
- Contacts
- Deals
- Reports

**Code to add** (after Dashboard, before Contacts):
```javascript
<Link
  to="/dashboard/companies"
  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
    location.pathname.startsWith('/dashboard/companies')
      ? 'bg-orange-100 text-orange-600'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
  }`}
>
  <Building2 className="mr-3 h-5 w-5" />
  Companies
</Link>
```

**Note**: Import `Building2` icon from lucide-react

### Task 2: Update App.js (Add Routes)

**File**: `client/src/components/App.js`
**Location**: Line ~50-70 (routes section)

**Add routes** (after Dashboard route, before Contacts route):
```javascript
<Route path="/dashboard/companies" element={<CompaniesContainer user={user} />} />
<Route path="/dashboard/companies/:id" element={<CompanyPage />} />
```

**Import statements to add**:
```javascript
import CompaniesContainer from './CompaniesContainer';
import CompanyPage from './CompanyPage';
```

### Task 3: Update ContactsContainer.js (JOIN Query)

**File**: `client/src/components/ContactsContainer.js`
**Location**: Line ~30-40 (fetchContacts function)

**Change**: Update query to include company data via JOIN

**Old query**:
```javascript
const { data, error } = await supabase
  .from('contacts')
  .select('*')
  .eq('user_id', user.id);
```

**New query**:
```javascript
const { data, error } = await supabase
  .from('contacts')
  .select('*, companies(company_name, id)')
  .eq('user_id', user.id);
```

**Why**: Prevents N+1 query problem (single query instead of N lookups)

### Task 4: Update AddContactForm.js (Add CompanyDropdown)

**File**: `client/src/components/AddContactForm.js`
**Location**: Multiple changes

**Changes needed**:
1. **Import CompanyDropdown**:
   ```javascript
   import CompanyDropdown from './CompanyDropdown';
   ```

2. **Add state for companies**:
   ```javascript
   const [companies, setCompanies] = useState([]);
   ```

3. **Add company_id to formData**:
   ```javascript
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     job_title: "",
     company_id: null, // NEW
     image_url: ""
   });
   ```

4. **Fetch companies on mount**:
   ```javascript
   useEffect(() => {
     async function fetchCompanies() {
       const { data } = await supabase
         .from('companies')
         .select('id, company_name')
         .eq('user_id', user.id)
         .order('company_name');
       if (data) setCompanies(data);
     }
     fetchCompanies();
   }, [user.id]);
   ```

5. **Add CompanyDropdown to form** (after job_title field):
   ```javascript
   <div>
     <label className="block text-sm font-medium text-gray-700 mb-1">
       Company (Optional)
     </label>
     <CompanyDropdown
       companies={companies}
       value={formData.company_id}
       onChange={(companyId) => setFormData({ ...formData, company_id: companyId })}
       isClearable={true}
     />
   </div>
   ```

6. **Include company_id in insert**:
   ```javascript
   const { data, error } = await supabase
     .from('contacts')
     .insert([{
       name: formData.name,
       email: formData.email,
       job_title: formData.job_title,
       company_id: formData.company_id, // NEW
       image_url: formData.image_url,
       user_id: user.id
     }])
     .select('*, companies(company_name, id)'); // JOIN for optimistic UI
   ```

### Task 5: Update EditContactModal.js (Add CompanyDropdown)

**File**: `client/src/components/EditContactModal.js`
**Location**: Multiple changes (same pattern as AddContactForm)

**Changes needed**: Same as Task 4, but:
- Pre-populate `company_id` from existing contact data
- Use contact.company_id as initial value

### Task 6: Update ContactCard.js (Display Company)

**File**: `client/src/components/ContactCard.js`
**Location**: Line ~40-60 (card content section)

**Add company display** (after job_title, before email):
```javascript
{contact.companies?.company_name && (
  <p className="text-sm text-gray-600 flex items-center">
    <Building2 className="h-4 w-4 mr-1" />
    {contact.companies.company_name}
  </p>
)}
```

**Note**: Data comes from JOIN query (no additional fetch needed)

### Task 7: Update ContactsPage.js (Clickable Company)

**File**: `client/src/components/ContactsPage.js`
**Location**: Line ~80-100 (contact details section)

**Add clickable company link** (in contact details):
```javascript
{contact.companies?.company_name && (
  <div>
    <span className="text-sm font-medium text-gray-500">Company:</span>
    <Link
      to={`/dashboard/companies/${contact.companies.id}`}
      className="ml-2 text-sm text-orange-600 hover:text-orange-700 underline"
    >
      {contact.companies.company_name}
    </Link>
  </div>
)}
```

---

## 📦 Phase 6: Delete Company Logic

### Task: Implement Cascade Nullify Confirmation

**Files**: `CompanyPage.js` and `CompanyCard.js`

**Location**: Delete button handler in both files

**Implementation**:
```javascript
async function handleDelete() {
  // Step 1: Check for associated contacts
  const { data: contacts } = await supabase
    .from('contacts')
    .select('id')
    .eq('company_id', companyId);

  // Step 2: Show confirmation if contacts exist
  if (contacts && contacts.length > 0) {
    const confirmed = window.confirm(
      `${contacts.length} contact${contacts.length > 1 ? 's are' : ' is'} linked to this company. ${contacts.length > 1 ? 'They' : 'It'} will be unlinked. Continue?`
    );
    if (!confirmed) return;
  }

  // Step 3: Delete company (RLS + ON DELETE SET NULL handles contact unlinking)
  const { error } = await supabase
    .from('companies')
    .delete()
    .eq('id', companyId);

  if (error) {
    toast.error(handleSupabaseError(error));
    logger.error('Error deleting company:', error);
  } else {
    toast.success(
      contacts && contacts.length > 0
        ? `Company deleted. ${contacts.length} contact${contacts.length > 1 ? 's' : ''} unlinked.`
        : 'Company deleted successfully!'
    );
    navigate('/dashboard/companies');
  }
}
```

---

## 📋 Implementation Checklist

### Phase 2: Validation (1 task)
- [ ] Add companySchema to validation.js with Unicode regex

### Phase 3: Core Components (8 tasks)
- [ ] Install react-select package
- [ ] Create CompanyDropdown.js (React Select component)
- [ ] Create CompanyCard.js (orange theme)
- [ ] Create AddCompanyForm.js (with validation)
- [ ] Create EditCompanyModal.js (with validation)
- [ ] Create CompanySearch.js (search bar)
- [ ] Create CompaniesContainer.js (main page with infinite scroll)
- [ ] Create CompanyPage.js (detail page with associated contacts)

### Phase 4: Company Detail (covered in Phase 3, task 8)
- [ ] Verify JOIN query in CompanyPage.js

### Phase 5: Integration (7 tasks)
- [ ] Update NavBar.js (add Companies link before Contacts)
- [ ] Update App.js (add routes)
- [ ] Update ContactsContainer.js (JOIN query)
- [ ] Update AddContactForm.js (CompanyDropdown)
- [ ] Update EditContactModal.js (CompanyDropdown)
- [ ] Update ContactCard.js (display company name)
- [ ] Update ContactsPage.js (clickable company link)

### Phase 6: Delete Logic (1 task)
- [ ] Implement cascade nullify confirmation in CompanyPage.js and CompanyCard.js

**Total Tasks: ~22**

---

## 🎨 Design System Reference

### Orange Theme (Companies)
- Primary button: `bg-orange-600 hover:bg-orange-700 text-white`
- Secondary button: `border-orange-600 text-orange-600 hover:bg-orange-50`
- Text accent: `text-orange-600`
- Background: `bg-orange-50`
- Focus ring: `focus:ring-orange-500`

### Existing Themes (For Reference)
- Blue: Contacts
- Green: Deals
- Purple: Notes

---

## 📚 Key Files to Reference

### For Patterns
- `ContactsContainer.js` → CompaniesContainer pattern
- `ContactCard.js` → CompanyCard pattern
- `AddContactForm.js` → AddCompanyForm pattern
- `EditContactModal.js` → EditCompanyModal pattern
- `ContactsPage.js` → CompanyPage pattern
- `ContactSearch.js` → CompanySearch pattern

### For Utilities
- `utils/validation.js` → Add companySchema here
- `utils/errorHandler.js` → Use handleSupabaseError()
- `utils/logger.js` → Use logger.error() for logging
- `contexts/ToastContext.js` → Use toast.success/error()

### For Integration
- `NavBar.js` → Add Companies link
- `App.js` → Add routes

---

## 🧪 Testing Checklist

After implementation, verify:

- [ ] Can create company with all fields
- [ ] Can create company with only required field (company_name)
- [ ] Validation errors display correctly
- [ ] Can edit company
- [ ] Can delete company (with confirmation if contacts exist)
- [ ] Can search companies by name
- [ ] Companies appear in navigation
- [ ] Can associate contact with company (dropdown works)
- [ ] Can edit contact's company association
- [ ] Company name displays on contact cards
- [ ] Clicking company name navigates to CompanyPage
- [ ] CompanyPage shows associated contacts
- [ ] No console errors or warnings
- [ ] Orange theme consistently applied
- [ ] Responsive design works on mobile

---

## 🚀 Getting Started

1. **Read** `COMPANIES_CRUD_IMPLEMENTATION_PLAN.md` for full context
2. **Start with Phase 2** (validation schema)
3. **Move to Phase 3** (build components one by one)
4. **Continue through Phase 5** (integrate with existing components)
5. **Finish with Phase 6** (delete logic)
6. **Test thoroughly** (use checklist above)

---

## 💡 Tips for Success

1. **Follow existing patterns** - Copy structure from reference files
2. **Use orange theme consistently** - Match blue/green/purple pattern
3. **Test incrementally** - Verify each component works before moving on
4. **Use JOIN queries** - Prevent N+1 problems with `.select('*, companies(...)')`
5. **Validate everything** - Use companySchema for all forms
6. **Toast all operations** - Success and error notifications
7. **Optimistic UI** - Show changes immediately, then sync with DB
8. **Handle errors gracefully** - Use handleSupabaseError() for user-friendly messages

---

## ❓ Questions?

Refer to:
- `COMPANIES_CRUD_IMPLEMENTATION_PLAN.md` - Comprehensive specifications
- `CLAUDE.md` - Project patterns and conventions
- Existing contact components - Copy/paste/modify approach

---

**Good luck! You've got this! 🚀**

---

**Handoff Version**: 1.0
**Date**: October 18, 2025
**Estimated Effort**: 3-4 hours for experienced developer
