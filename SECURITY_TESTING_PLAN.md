# Security Testing Plan - Phase 2 & 3

**Branch:** `security-phase-2-hardening`
**Date:** October 2025
**Status:** Ready for Testing

## Overview
Comprehensive testing plan for all security hardening and quality improvements implemented in Phase 2 & 3. This document provides detailed test cases, expected results, and verification steps for each security feature.

---

## 1. Password Strength Validation Testing

### Test Location
- **Page:** Sign Up (`/signup`)
- **Component:** `SignUp.js`

### Test Cases

| Test # | Password Input | Expected Result | Strength Meter | Notes |
|--------|---------------|-----------------|----------------|-------|
| 1.1 | `abc123` | ❌ Error: Missing uppercase, special char | RED | Only 2/5 requirements (lowercase + numbers) |
| 1.2 | `Abc123` | ❌ Error: Too short, missing special char | RED | Only 3/5 requirements (6 chars) |
| 1.3 | `Abc123!@` | ✅ Success: All checks pass | GREEN | Valid strong password (5/5) |
| 1.4 | `PASSWORD123!` | ❌ Error: Missing lowercase | YELLOW | 4/5 requirements met |
| 1.5 | `password!@#` | ❌ Error: Missing uppercase, number | YELLOW | 4/5 requirements met |
| 1.6 | `short!A1` | ✅ Success: All requirements met | GREEN | Exactly 8 chars, all 5/5 requirements |
| 1.7 | `VeryLongPassword123!@#` | ✅ Success: All requirements met | GREEN | Extra long valid password (5/5) |

### Verification Steps
1. Navigate to login page (`http://localhost:4000`)
2. Click "Create Account" button at bottom to access SignUp page
3. Focus on password field
4. Type password characters slowly
5. **Verify real-time updates:**
   - Strength meter changes color (red → yellow → green)
   - Progress bar animates (0% → 100%)
   - Checklist items show ✓ or ✗ for each requirement:
     - ✓ At least 8 characters
     - ✓ Contains uppercase letter (A-Z)
     - ✓ Contains lowercase letter (a-z)
     - ✓ Contains number (0-9)
     - ✓ Contains special character (!@#$%^&*)
6. Try submitting form with weak password
7. **Expected:** Form submission prevented, error toast displayed

### Testing Status: ✅ COMPLETED (Oct 9, 2025)
- All 7 test cases passed
- Real-time validation working as expected
- Bug fix applied: Added "Create Account" button to Login page

### Password Requirements
- **Minimum Length:** 8 characters
- **Maximum Length:** 128 characters
- **Required:** At least one uppercase letter (A-Z)
- **Required:** At least one lowercase letter (a-z)
- **Required:** At least one number (0-9)
- **Required:** At least one special character (!@#$%^&*)

---

## 2. Form Validation Testing

### 2.1 Contact Form Validation

**Components to Test:**
- `AddContactForm.js` - Add new contact modal
- `EditContactModal.js` - Edit existing contact modal

#### Name Field Validation

| Test Input | Valid? | Expected Error Message |
|------------|--------|------------------------|
| `John Doe` | ✅ | None |
| `John O'Brien` | ✅ | None (apostrophes allowed) |
| `Anne-Marie` | ✅ | None (hyphens allowed) |
| `J` | ❌ | "Name must be at least 2 characters" |
| `John123` | ❌ | "Name can only contain letters, spaces, hyphens, and apostrophes" |
| `<script>alert</script>` | ❌ | "Name can only contain letters, spaces, hyphens, and apostrophes" |
| (101 chars long) | ❌ | "Name must not exceed 100 characters" |

#### Email Field Validation

| Test Input | Valid? | Expected Error Message |
|------------|--------|------------------------|
| `john@example.com` | ✅ | None |
| `john.doe+tag@company.co.uk` | ✅ | None |
| `invalid-email` | ❌ | "Invalid email format" |
| `@example.com` | ❌ | "Invalid email format" |
| `john@` | ❌ | "Invalid email format" |
| (255 chars long) | ❌ | "Email must not exceed 254 characters" |

#### Job Title Field Validation

| Test Input | Valid? | Expected Error Message |
|------------|--------|------------------------|
| `Software Engineer` | ✅ | None (optional field) |
| (empty string) | ✅ | None (optional field) |
| `A` | ❌ | "Job title must be at least 2 characters" |
| (101 chars long) | ❌ | "Job title must not exceed 100 characters" |

#### Company Field Validation

| Test Input | Valid? | Expected Error Message |
|------------|--------|------------------------|
| `Acme Corporation` | ✅ | None (optional field) |
| (empty string) | ✅ | None (optional field) |
| `A` | ❌ | "Company name must be at least 2 characters" |
| (201 chars long) | ❌ | "Company name must not exceed 200 characters" |

### 2.2 Deal Form Validation

**Components to Test:**
- `AddDealModal.js` - Add new deal modal
- `AddNewDealForm.js` - Legacy add deal form
- `EditDealForm.js` - Edit deal form

#### Deal Name Field Validation

| Test Input | Valid? | Expected Error Message |
|------------|--------|------------------------|
| `Q4 Enterprise Deal` | ✅ | None |
| `A` | ❌ | "Deal name must be at least 2 characters" |
| (201 chars long) | ❌ | "Deal name must not exceed 200 characters" |

#### Deal Amount Validation

| Test Input | Valid? | Expected Error Message |
|------------|--------|------------------------|
| `50000` | ✅ | None |
| `999999999` | ✅ | None (max allowed) |
| `0` | ❌ | "Amount must be greater than 0" |
| `-100` | ❌ | "Amount must be greater than 0" |
| `1000000000` | ❌ | "Amount must not exceed 999,999,999" |
| `abc` | ❌ | "Amount must be a number" |

#### Deal Stage Validation

| Test Input | Valid? | Expected Error Message |
|------------|--------|------------------------|
| `Lead` | ✅ | None |
| `Qualified` | ✅ | None |
| `Proposal` | ✅ | None |
| `Negotiation` | ✅ | None |
| `Closed Won` | ✅ | None |
| `Closed Lost` | ✅ | None |
| (no selection) | ❌ | "Please select a valid deal stage" |
| `Invalid Stage` | ❌ | "Please select a valid deal stage" |

### 2.3 Note Form Validation

**Components to Test:**
- `AddNoteModal.js` - Add note to deal
- `EditNoteModal.js` - Edit existing note

#### Note Title Validation

| Test Input | Valid? | Expected Error Message |
|------------|--------|------------------------|
| `Follow-up Call` | ✅ | None |
| `A` | ❌ | "Title must be at least 2 characters" |
| (201 chars long) | ❌ | "Title must not exceed 200 characters" |

#### Note Details Validation

| Test Input | Valid? | Expected Error Message |
|------------|--------|------------------------|
| `Called customer to discuss pricing options and next steps for the deal.` | ✅ | None |
| `Short` | ❌ | "Details must be at least 10 characters" |
| (5001 chars long) | ❌ | "Details must not exceed 5000 characters" |

### 2.4 Form Validation Test Steps

**For Each Form (9 total):**

1. **Empty Form Submission Test:**
   - Open form/modal
   - Click Submit without entering data
   - **Expected:** Inline error messages appear below required fields
   - **Expected:** Error toast: "Please fix the errors before submitting"
   - **Expected:** Submit button remains enabled (allow retries)

2. **Invalid Data Test:**
   - Enter invalid data in each field (see tables above)
   - Tab away or blur field
   - **Expected:** Inline error appears immediately below field
   - **Expected:** Error message matches validation rule

3. **Real-time Error Clearing:**
   - Enter invalid data → see error
   - Fix the data to be valid
   - **Expected:** Error clears immediately (real-time)
   - **Expected:** Success styling (if implemented)

4. **Valid Data Submission:**
   - Fill all required fields with valid data
   - Click Submit
   - **Expected:** Form submits successfully
   - **Expected:** Success toast appears: "[Item] added/updated successfully!"
   - **Expected:** Modal closes (if applicable)
   - **Expected:** Data appears in UI immediately (optimistic update)

---

## 3. Demo Credentials Visibility Testing

### 3.1 Development Mode Test

**Environment:** `NODE_ENV=development`

**Steps:**
1. Start development server: `npm start`
2. Navigate to `http://localhost:4000/login`
3. **Expected Results:**
   - ✅ Blue demo credentials box is visible
   - ✅ Shows "Demo Account" heading
   - ✅ Displays email: `demo@example.com`
   - ✅ Displays password: `Demo123!`
   - ✅ Includes "For testing purposes only" disclaimer

**Visual Check:**
- Box has blue background (`bg-blue-50`)
- Blue border (`border-blue-200`)
- Clearly labeled as demo/test account

### 3.2 Production Build Test

**Environment:** `NODE_ENV=production`

**Steps:**
1. Create production build:
   ```bash
   cd client
   npm run build
   ```

2. Serve production build:
   ```bash
   npx serve -s build -p 5000
   ```

3. Navigate to `http://localhost:5000/login`

4. **Expected Results:**
   - ❌ NO demo credentials box visible
   - ❌ No "Demo Account" text anywhere
   - ❌ No hardcoded credentials in UI

5. **Security Verification:**
   - Open DevTools → Elements tab
   - Search page source for: `demo@example.com`, `Demo123!`, "Demo Account"
   - **Expected:** Zero matches found
   - Check `build/static/js/main.*.js` file
   - **Expected:** Demo credentials code removed or wrapped in unreachable conditional

---

## 4. Console Logging Testing

### 4.1 Development Mode Console Test

**Steps:**
1. Start dev server: `npm start`
2. Open browser DevTools → Console tab
3. Trigger various scenarios:
   - Submit invalid form
   - Create/edit/delete items
   - Cause network errors
   - Navigate between pages

**Expected Results:**
- ✅ Error messages visible in console
- ✅ `logger.error()` outputs appear
- ✅ Helpful debugging information shown
- ✅ Format: `[timestamp] Error adding contact: [error details]`

### 4.2 Production Build Console Test

**Steps:**
1. Build and serve production: `npm run build` → `npx serve -s build`
2. Open DevTools → Console tab
3. Clear console
4. Trigger same scenarios as dev mode:
   - Form errors
   - CRUD operations
   - Network failures
   - Page navigation

**Expected Results:**
- ❌ ZERO console logs/errors (completely silent)
- ❌ No `logger.error()` output
- ❌ No debugging information
- ✅ Only browser-native warnings/errors (if any)

**Code Verification:**
1. Search build files: `grep -r "console.error" build/static/js/`
2. **Expected:** All console statements wrapped in `process.env.NODE_ENV === 'development'` checks
3. **Expected:** Dead code elimination removed all dev-only logs

---

## 5. Error Handling & User-Friendly Messages

### 5.1 Supabase Error Translation Test

**Test Scenarios:**

| Error Type | How to Trigger | Expected User Message | Technical Error (hidden) |
|------------|----------------|----------------------|--------------------------|
| Duplicate Entry | Create contact with existing email | "This record already exists" | `duplicate key value violates unique constraint` |
| Foreign Key Violation | Try to delete contact with deals | "Cannot delete - related records exist" | `foreign key constraint fails` |
| Not Found | Access non-existent record | "Record not found" | `404 not found` |
| Network Error | Disconnect internet, submit form | "Network error. Please check your connection." | `Failed to fetch` |
| Invalid Credentials | Wrong password on login | "Invalid email or password" | `Invalid login credentials` |
| Unauthorized | Access without login | "Please log in to continue" | `401 Unauthorized` |

### 5.2 Error Handling Test Steps

1. **Duplicate Entry Test:**
   - Add contact: `test@example.com`
   - Try adding same email again
   - **Expected:** Red error toast: "This record already exists"
   - **Expected:** NO raw SQL error shown

2. **Foreign Key Test:**
   - Create contact with deals
   - Try deleting the contact
   - **Expected:** Error message about related records
   - **Expected:** Helpful guidance to user

3. **Network Error Test:**
   - Open DevTools → Network tab
   - Set to "Offline"
   - Submit any form
   - **Expected:** Friendly error message (not "fetch failed")
   - **Expected:** Retry mechanism activates (see Section 6)

4. **Validation Errors:**
   - Submit form with invalid data
   - **Expected:** Field-specific error messages
   - **Expected:** Toast: "Please fix the errors before submitting"

### 5.3 Error Message Quality Checklist

For each error scenario, verify:
- ✅ Message is user-friendly (no technical jargon)
- ✅ Message is actionable (tells user what to do)
- ✅ Message is specific (not generic "error occurred")
- ✅ Toast auto-dismisses after 5 seconds
- ✅ Toast can be manually dismissed
- ✅ No sensitive data exposed in error messages

---

## 6. Retry Logic Testing

### 6.1 Network Failure Scenarios

**Test Setup:**
- Open DevTools → Network tab
- Use throttling to simulate network issues

#### Test Case 1: Temporary Network Failure

**Steps:**
1. Set Network to "Offline"
2. Submit a form (e.g., add contact)
3. Within 2 seconds, set Network to "Online"
4. Wait and observe

**Expected Results:**
- ✅ First request fails (offline)
- ✅ Retry #1 after 1 second → fails (still offline)
- ✅ Retry #2 after 2 seconds → succeeds (back online)
- ✅ Success toast appears
- ✅ Data saved correctly
- ✅ Total time: ~3 seconds

#### Test Case 2: Persistent Network Failure

**Steps:**
1. Set Network to "Offline"
2. Submit a form
3. Keep offline for 10+ seconds

**Expected Results:**
- ✅ Retry #1 after 1 second → fails
- ✅ Retry #2 after 2 seconds → fails
- ✅ Retry #3 after 4 seconds → fails
- ✅ Final error after all retries exhausted
- ✅ Error toast: "Unable to connect. Please check your internet connection."
- ✅ Optimistic UI rolls back (if applicable)

#### Test Case 3: Slow Network (3G)

**Steps:**
1. Set Network to "Slow 3G"
2. Submit form
3. Observe request timing

**Expected Results:**
- ✅ Request completes (slowly)
- ✅ No retries triggered (request succeeds)
- ✅ Loading state shows during slow request
- ✅ User can still interact with UI (optimistic update)

### 6.2 Retry Exemption Tests

**Verify these errors DON'T trigger retries:**

1. **Authentication Errors:**
   - Wrong password → Immediate error, no retry
   - Expired session → Immediate redirect, no retry

2. **Validation Errors:**
   - Invalid email format → Immediate error, no retry
   - Constraint violation → Immediate error, no retry

3. **Authorization Errors:**
   - Access denied → Immediate error, no retry
   - Insufficient permissions → Immediate error, no retry

### 6.3 Exponential Backoff Verification

**Timing Test:**
1. Trigger retry scenario
2. Use DevTools Performance tab or console timestamps
3. Measure time between retries

**Expected Delays:**
- First retry: 1 second after initial failure
- Second retry: 2 seconds after first retry
- Third retry: 4 seconds after second retry
- Total max time: ~7 seconds (1 + 2 + 4)

---

## 7. Offline Detection Testing

### 7.1 Offline Banner Display Test

**Initial State:**
1. Load app with internet connection
2. **Expected:** No offline banner visible
3. **Expected:** Normal UI display

**Offline Trigger:**
1. Disconnect internet (turn off WiFi or unplug ethernet)
2. **Expected:** Yellow warning banner appears at top within 1 second
3. **Banner Content:**
   - ⚠️ Warning icon (triangle with exclamation)
   - Text: "You are offline. Please check your internet connection."
   - Yellow/amber background (`bg-yellow-50`)
   - Dark text for contrast

**Reconnect Test:**
1. Reconnect internet
2. **Expected:** Banner disappears automatically within 1 second
3. **Expected:** Smooth fade-out animation

### 7.2 Offline Functionality Test

**While Offline:**
1. Try submitting forms
2. Try navigating pages
3. Try searching/filtering

**Expected Behavior:**
- Forms show error: "You are offline..."
- Offline banner remains visible
- Previously loaded data still accessible
- Optimistic UI changes still visible locally
- Retry logic activates when connection restored

### 7.3 Browser API Verification

**Test in Multiple Browsers:**
- Chrome: Works via `navigator.onLine`
- Firefox: Works via `navigator.onLine`
- Safari: Works via `navigator.onLine`
- Edge: Works via `navigator.onLine`

**Event Listener Test:**
1. Add console log to `useOnlineStatus` hook
2. Toggle WiFi on/off
3. Verify 'online' and 'offline' events fire correctly

---

## 8. Toast Notification Testing

### 8.1 Toast Variants Test

#### Success Toast (Green)

**Triggers:**
- Add contact → "Contact added successfully!"
- Edit deal → "Deal updated successfully!"
- Delete note → Success confirmation
- Login → "Welcome back!"

**Visual Verification:**
- ✅ Green background (`bg-green-50` or similar)
- ✅ Green border/accent
- ✅ Checkmark icon (✓)
- ✅ Success message text

#### Error Toast (Red)

**Triggers:**
- Submit invalid form → "Please fix the errors before submitting"
- Network error → Error message
- Delete failure → "Failed to delete. Please try again."

**Visual Verification:**
- ✅ Red background (`bg-red-50` or similar)
- ✅ Red border/accent
- ✅ Error icon (✗ or ⚠)
- ✅ Error message text

#### Warning Toast (Yellow)

**Triggers:**
- (If implemented) Deprecation warnings, caution messages

**Visual Verification:**
- ✅ Yellow background
- ✅ Warning icon (⚠)

#### Info Toast (Blue)

**Triggers:**
- (If implemented) Informational messages, tips

**Visual Verification:**
- ✅ Blue background
- ✅ Info icon (ℹ)

### 8.2 Toast Behavior Tests

#### Auto-Dismiss Test

**Steps:**
1. Trigger a toast (any variant)
2. Start timer
3. Do not interact with toast

**Expected:**
- ✅ Toast visible immediately
- ✅ Toast auto-dismisses after exactly 5 seconds
- ✅ Smooth fade-out animation
- ✅ Toast removed from DOM after animation

#### Manual Dismiss Test

**Steps:**
1. Trigger a toast
2. Click the X (close) button

**Expected:**
- ✅ Toast dismisses immediately (< 0.3s)
- ✅ Fade-out animation plays
- ✅ Toast removed from DOM

#### Multiple Toast Stack Test

**Steps:**
1. Trigger 3-4 toasts rapidly (e.g., submit multiple forms)

**Expected:**
- ✅ Toasts stack vertically (not overlap)
- ✅ Newest toast appears at top (or bottom, depending on design)
- ✅ Each toast auto-dismisses after its own 5s timer
- ✅ Smooth animations when toasts appear/disappear
- ✅ No layout jumping or flickering

### 8.3 Toast Positioning Test

**Verify:**
- ✅ Toasts appear in top-right corner (or configured position)
- ✅ Toasts are above all other content (z-index)
- ✅ Toasts don't interfere with page interaction
- ✅ Toasts are responsive (mobile-friendly)

### 8.4 Toast Accessibility Test

**Keyboard Navigation:**
- Tab to close button → works
- Enter/Space to dismiss → works
- Esc key to dismiss → (if implemented)

**Screen Reader:**
- Toast announces message (role="alert" or aria-live)
- Message is clear and complete

---

## 9. Optimistic UI Testing

### 9.1 Add Operations Testing

#### Test: Add Contact

**Steps:**
1. Navigate to Contacts page
2. Click "Add Contact" button
3. Fill form with valid data:
   - Name: "Test Contact"
   - Email: "test@example.com"
   - Job Title: "Tester"
   - Company: "Test Corp"
4. Click "Add Contact" button
5. Observe carefully

**Expected Results:**
- ✅ Modal closes **immediately** (< 50ms)
- ✅ Contact appears in list **instantly** with temp ID (`temp-1696...`)
- ✅ Green success toast: "Contact added successfully!"
- ✅ After 1-2 seconds: Contact updates with real ID from server
- ✅ No UI flicker or flash
- ✅ No visible loading state for user

**Error Scenario:**
1. Disconnect internet
2. Add contact
3. **Expected:**
   - Contact appears briefly (optimistic)
   - After retry timeout (~7s): Contact disappears (rollback)
   - Red error toast: "Unable to add contact. Please check your connection."

#### Test: Add Deal

**Steps:**
1. Navigate to Deals page
2. Click "Add Deal"
3. Fill form, select contact
4. Click "Add Deal"

**Expected:**
- ✅ Modal closes immediately
- ✅ Deal appears at top of list instantly
- ✅ Success toast shows
- ✅ Deal stats update optimistically
- ✅ Real ID replaces temp ID after server response

#### Test: Add Note

**Steps:**
1. Navigate to Deal detail page
2. Click "Add Note"
3. Fill note form
4. Click "Add Note"

**Expected:**
- ✅ Modal closes immediately
- ✅ Note appears in notes section instantly
- ✅ Note count updates (+1)
- ✅ Success toast shows

### 9.2 Edit Operations Testing

#### Test: Edit Contact

**Steps:**
1. Click edit button on existing contact
2. Change name to "Updated Name"
3. Change email to "updated@example.com"
4. Click "Update Contact"

**Expected Results:**
- ✅ Modal closes **immediately**
- ✅ Contact card updates **instantly** with new data
- ✅ No placeholder or loading state
- ✅ Success toast: "Contact updated successfully!"
- ✅ After server confirms: Data stays updated (or updates if server returned different data)

**Rollback Scenario:**
1. Edit contact email to an existing email (duplicate)
2. Click "Update Contact"

**Expected:**
- ✅ Contact appears to update (optimistic)
- ✅ After server rejects (~1s): Contact reverts to original data (rollback)
- ✅ Red error toast: "This record already exists"
- ✅ Smooth rollback animation (no jarring jump)

#### Test: Edit Deal

**Steps:**
1. Navigate to deal detail page
2. Toggle "Edit Deal" button
3. Change deal stage to "Closed Won"
4. Change amount to 100000
5. Click "Update Deal"

**Expected:**
- ✅ Form shows success feedback immediately
- ✅ Deal data updates instantly in header
- ✅ Success toast shows
- ✅ If error: data reverts to original values

#### Test: Edit Note

**Steps:**
1. Click edit on a note
2. Change title and details
3. Click "Update Note"

**Expected:**
- ✅ Modal closes immediately
- ✅ Note updates in place instantly
- ✅ Success toast shows
- ✅ No flash of old content

### 9.3 Delete Operations Testing

#### Test: Delete Note (Only Delete Implemented)

**Steps:**
1. Navigate to deal page with notes
2. Click delete button on a note
3. Confirm deletion in alert dialog

**Expected Results:**
- ✅ Note disappears **immediately** from UI
- ✅ Note count decrements (-1)
- ✅ No loading spinner or placeholder
- ✅ After server confirms: Note stays deleted
- ✅ Grid layout adjusts smoothly (no jarring shift)

**Rollback Scenario:**
1. Disconnect internet
2. Delete a note
3. Confirm deletion

**Expected:**
- ✅ Note disappears (optimistic)
- ✅ After retry timeout: Note reappears (rollback)
- ✅ Error toast: "Failed to delete note. Please try again."
- ✅ Note is in same position as before

### 9.4 Optimistic UI Quality Checklist

For each operation (add/edit/delete):

**Performance:**
- ✅ UI updates in < 50ms (perceived as instant)
- ✅ No perceptible delay between click and UI change
- ✅ Modal/form closes immediately on submit

**Visual Feedback:**
- ✅ Success toast appears
- ✅ Data appears/updates in correct location
- ✅ No layout shift or flicker
- ✅ Smooth animations (if any)

**Error Handling:**
- ✅ Rollback occurs if server fails
- ✅ Error toast explains what happened
- ✅ UI returns to previous state seamlessly
- ✅ User can retry action

**Data Integrity:**
- ✅ Temporary IDs work correctly
- ✅ Real IDs replace temp IDs on success
- ✅ No duplicate items in list
- ✅ Data matches server after sync

---

## 10. Loading States Testing

### 10.1 Skeleton Loader Display Test

**Test Each Page:**

#### Contacts Page (`/contacts`)

**Steps:**
1. Clear browser cache: Cmd/Ctrl + Shift + R
2. Navigate to `/contacts`
3. Observe loading state (may be brief with fast connection)

**Expected Skeleton:**
- ✅ 6 card skeletons in grid layout (3x2 on desktop)
- ✅ Each skeleton matches contact card dimensions
- ✅ Animated pulse effect (gray shimmer)
- ✅ No layout shift when real data loads
- ✅ Skeleton appears for < 2 seconds (with good connection)

#### Deals Page (`/deals`)

**Expected Skeleton:**
- ✅ 3 stat skeletons at top (deals stats)
- ✅ 4 deal card skeletons in grid below
- ✅ Matching dimensions to real cards
- ✅ Pulse animation

#### Deal Detail Page (`/deals/:id`)

**Expected Skeleton:**
- ✅ Deal header skeleton (deal name, stage, amount)
- ✅ 2 info card skeletons (contact info, deal info)
- ✅ Notes list skeleton
- ✅ All sections load simultaneously

#### Contact Page (`/contacts/:id`)

**Expected Skeleton:**
- ✅ Profile header skeleton (contact name, company)
- ✅ 2 info card skeletons (contact details)
- ✅ Deals list skeleton
- ✅ Replaced spinner completely

#### Reports Page (`/reports`)

**Expected Skeleton:**
- ✅ 4 stat card skeletons (report metrics)
- ✅ 2 chart skeletons (graphs/visualizations)
- ✅ Matching heights and widths

### 10.2 Skeleton Quality Verification

**For Each Skeleton:**

1. **Dimensions Match:**
   - Skeleton height ≈ actual content height (±5px)
   - Skeleton width = 100% of container
   - No noticeable size change when data loads

2. **Animation:**
   - Pulse effect is smooth (not janky)
   - Animation loops continuously
   - Color: light gray (`bg-gray-200` or similar)
   - Shimmer moves left to right

3. **Layout Stability:**
   - No cumulative layout shift (CLS = 0 or near 0)
   - Content loads in place (no jump)
   - Grid structure maintained

4. **Performance:**
   - Skeleton renders immediately (< 100ms)
   - No delay before skeleton appears
   - Smooth transition to real content

### 10.3 Network Throttling Test

**Simulate Slow Connection:**
1. Open DevTools → Network tab
2. Set throttling to "Slow 3G"
3. Reload each page
4. Observe skeleton for longer duration

**Expected:**
- ✅ Skeleton remains visible for 3-5 seconds
- ✅ Animation continues smoothly
- ✅ No timeout errors
- ✅ Eventually loads real data

---

## 11. Production Build Testing

### 11.1 Build Process

**Commands:**
```bash
cd client
npm run build
```

**Expected Output:**
```
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  XX.XX kB  build/static/js/main.[hash].js
  XX.XX kB  build/static/css/main.[hash].css

The build folder is ready to be deployed.
```

**Verification Checklist:**
- ✅ Build completes without errors
- ✅ Build completes without warnings
- ✅ No deprecated dependency warnings
- ✅ JavaScript bundle < 500 KB (reasonable size)
- ✅ CSS bundle < 100 KB
- ✅ build/ folder created with proper structure

**Build Folder Structure:**
```
build/
├── index.html
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   └── main.[hash].js
│   └── media/
├── _headers (Netlify security headers)
└── ...
```

### 11.2 Serve & Test Production Build

**Serve Build:**
```bash
npx serve -s build -p 5000
```

**Access:** `http://localhost:5000`

### 11.3 Critical Production Checks

#### 1. Demo Credentials Check
- Navigate to `/login`
- **Expected:** ❌ No demo credentials visible
- **Expected:** ❌ No "Demo Account" text
- Inspect HTML source
- **Expected:** ❌ No hardcoded credentials in source

#### 2. Console Silence Check
- Open DevTools → Console
- Interact with entire app:
  - Login/logout
  - Add/edit/delete items
  - Navigate pages
  - Trigger errors
- **Expected:** ✅ ZERO console logs
- **Expected:** ✅ ZERO console errors (from our code)
- **Expected:** ✅ Console is completely silent

#### 3. Validation Check
- Test all 9 forms with invalid data
- **Expected:** ✅ All validation works correctly
- **Expected:** ✅ Error messages display
- **Expected:** ✅ Toast notifications appear

#### 4. Toast Notifications Check
- Trigger success/error scenarios
- **Expected:** ✅ All toast variants work
- **Expected:** ✅ Auto-dismiss works
- **Expected:** ✅ Manual dismiss works

#### 5. Optimistic UI Check
- Add/edit/delete items
- **Expected:** ✅ Instant updates work
- **Expected:** ✅ Rollback works on errors
- Test with network offline
- **Expected:** ✅ Proper error handling

#### 6. Error Handling Check
- Disconnect internet, submit form
- **Expected:** ✅ User-friendly error messages
- **Expected:** ✅ Retry logic activates
- **Expected:** ✅ No technical jargon exposed

#### 7. Security Headers Check

**Verify Netlify Headers:**
```bash
curl -I http://localhost:5000
```

**Expected Headers:**
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: ...
Content-Security-Policy: ...
```

#### 8. Source Maps Check
- Open DevTools → Sources tab
- **Expected:** ✅ Minified code (no source maps in production)
- **Expected:** ❌ No readable source code
- **Expected:** ✅ Difficult to reverse-engineer

### 11.4 Performance Metrics

**Measure with Lighthouse:**
```bash
npm install -g lighthouse
lighthouse http://localhost:5000 --view
```

**Target Scores:**
- ✅ Performance: > 90
- ✅ Accessibility: > 95
- ✅ Best Practices: > 95
- ✅ SEO: > 90

**Key Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Time to Interactive (TTI): < 3.5s
- Total Blocking Time (TBT): < 300ms
- Cumulative Layout Shift (CLS): < 0.1

---

## 12. Edge Cases & Security Tests

### 12.1 XSS Prevention Tests

**Test XSS Payloads in Text Fields:**

| Field | XSS Payload | Expected Behavior |
|-------|-------------|-------------------|
| Name | `<script>alert('XSS')</script>` | ❌ Rejected by validation regex |
| Name | `<img src=x onerror=alert('XSS')>` | ❌ Rejected by validation regex |
| Email | `test@example.com<script>alert(1)</script>` | ❌ Rejected by email validation |
| Note Details | `<script>alert('XSS')</script>` | ✅ Stored safely, rendered as text (not executed) |
| Deal Name | `<iframe src="evil.com">` | ❌ Rejected or safely escaped |

**Verification:**
1. Submit form with XSS payload
2. **Expected:** Validation error OR safe storage
3. If stored: View in UI
4. **Expected:** Rendered as plain text, not executed HTML
5. Check database
6. **Expected:** Stored as-is (escaped by DB or Supabase)

### 12.2 SQL Injection Prevention

**Test SQL Injection Patterns:**

| Field | Payload | Expected Behavior |
|-------|---------|-------------------|
| Name | `'; DROP TABLE contacts; --` | ❌ Rejected by validation regex |
| Email | `admin'--` | ❌ Invalid email format |
| Deal Amount | `1; DELETE FROM deals; --` | ❌ Not a number |
| Note Details | `1' OR '1'='1` | ✅ Stored safely (Supabase parameterizes queries) |

**Note:** Supabase automatically prevents SQL injection via prepared statements/parameterized queries. Our validation provides additional defense-in-depth.

### 12.3 Unicode & Special Characters

**Test International Characters:**

| Test Case | Input | Expected Behavior |
|-----------|-------|-------------------|
| Chinese | `张伟` | ❌ Rejected by name regex (letters only) |
| Emoji | `Hello 👋` | ❌ Rejected by regex |
| Accented | `François Müller` | ❌ Rejected (only a-zA-Z allowed) |
| Arabic | `محمد` | ❌ Rejected by regex |

**Current Limitation:** Name/text fields only allow `a-zA-Z` + spaces/hyphens/apostrophes. This is intentional for security but may need expansion for international users.

**If International Support Needed:**
- Update regex to allow Unicode letters: `/^[\p{L}\s'-]+$/u`
- Test with various languages
- Ensure database stores UTF-8 correctly

### 12.4 Boundary Value Tests

**Test Extreme Values:**

| Field | Test Value | Expected Result |
|-------|-----------|-----------------|
| Name | 1 char | ❌ Min 2 chars error |
| Name | 100 chars | ✅ Valid (at max) |
| Name | 101 chars | ❌ Max 100 chars error |
| Email | 254 chars | ✅ Valid (at max) |
| Email | 255 chars | ❌ Max 254 chars error |
| Deal Amount | 999,999,999 | ✅ Valid (at max) |
| Deal Amount | 1,000,000,000 | ❌ Max exceeded error |
| Note Details | 5000 chars | ✅ Valid (at max) |
| Note Details | 5001 chars | ❌ Max 5000 chars error |

### 12.5 Authentication Edge Cases

**Test Scenarios:**

1. **Expired Session:**
   - Login
   - Wait 24 hours (or manipulate JWT expiration)
   - Try to access protected page
   - **Expected:** Redirect to login

2. **Concurrent Sessions:**
   - Login on Browser A
   - Login on Browser B (same account)
   - **Expected:** Both sessions work OR one invalidates other (depending on design)

3. **Logout:**
   - Login
   - Logout
   - Try to access protected page
   - **Expected:** Redirect to login
   - Try to use browser back button
   - **Expected:** Still logged out

4. **Password Reset (if implemented):**
   - Request reset
   - Use reset link
   - Change password
   - Old password no longer works
   - New password works

---

## 13. Browser Compatibility Testing

### 13.1 Test Matrix

Test in the following browsers:

| Browser | Version | Platform | Priority |
|---------|---------|----------|----------|
| Chrome | Latest | Windows/Mac | HIGH |
| Firefox | Latest | Windows/Mac | HIGH |
| Safari | Latest | Mac | HIGH |
| Edge | Latest | Windows | MEDIUM |
| Chrome Mobile | Latest | iOS/Android | MEDIUM |
| Safari Mobile | Latest | iOS | MEDIUM |

### 13.2 Feature Checklist Per Browser

For each browser, verify:

1. **Offline Detection:**
   - Toggle WiFi/airplane mode
   - Offline banner appears/disappears correctly

2. **Toast Notifications:**
   - All toast variants display correctly
   - Auto-dismiss works (5 seconds)
   - Manual dismiss works

3. **Form Validation:**
   - Real-time validation works
   - Error messages display correctly
   - Submit prevention works

4. **Optimistic UI:**
   - Instant updates work
   - Rollback works on errors
   - No visual glitches

5. **Loading States:**
   - Skeletons display correctly
   - Pulse animation is smooth
   - No layout shift

6. **General Functionality:**
   - Navigation works
   - CRUD operations work
   - Authentication works

### 13.3 Known Browser Issues

**Potential Issues to Check:**

- **Safari:** `navigator.onLine` may be less reliable
- **Firefox:** Console API differences (logger should handle)
- **Mobile:** Touch targets must be ≥ 44x44px
- **IE11:** Not supported (modern browsers only)

---

## 14. Performance Testing

### 14.1 Bundle Size Analysis

**Analyze Build:**
```bash
npm run build
```

**Check Output:**
```
File sizes after gzip:

  XXX kB  build/static/js/main.[hash].js
  XXX kB  build/static/css/main.[hash].css
```

**Target Sizes:**
- ✅ Main JS bundle: < 500 KB (gzipped)
- ✅ Main CSS bundle: < 100 KB (gzipped)
- ✅ Total page weight: < 1 MB

**If Too Large:**
- Use `npm run analyze` (if configured)
- Consider code splitting
- Lazy load routes
- Optimize images

### 14.2 Load Time Testing

**Test with Chrome DevTools:**
1. Open DevTools → Network tab
2. Disable cache
3. Set throttling to "Fast 3G"
4. Reload page
5. Measure timing

**Target Metrics:**
- ✅ DOMContentLoaded: < 2s
- ✅ Load: < 3s
- ✅ First Contentful Paint: < 1.5s
- ✅ Largest Contentful Paint: < 2.5s

### 14.3 Form Validation Performance

**Test Validation Speed:**
1. Type in text field
2. Measure time from keyup to error message display
3. **Expected:** < 100ms (imperceptible to user)

**Test with:**
- Chrome DevTools Performance tab
- Record typing and validation
- Check for long tasks (> 50ms)

### 14.4 Optimistic UI Performance

**Measure Update Speed:**
1. Click submit on form
2. Measure time to UI update
3. **Expected:** < 50ms (perceived as instant)

**Tools:**
- `performance.now()` before/after update
- Chrome DevTools Performance recording
- Lighthouse performance audit

---

## Testing Checklist Summary

### ✅ Phase 1: Development Testing

- [ ] **Password Validation** (7 test cases)
  - [ ] All strength levels tested
  - [ ] Real-time meter updates
  - [ ] Submit prevention works

- [ ] **Form Validation** (9 forms × multiple fields)
  - [ ] Contact forms (Add/Edit)
  - [ ] Deal forms (Add/Edit)
  - [ ] Note forms (Add/Edit)
  - [ ] Login form
  - [ ] Signup form
  - [ ] All error messages correct

- [ ] **Demo Credentials**
  - [ ] Visible in dev mode
  - [ ] Hidden in production

- [ ] **Console Logging**
  - [ ] Logs visible in dev
  - [ ] Silent in production

- [ ] **Error Handling**
  - [ ] User-friendly messages
  - [ ] No technical jargon
  - [ ] Retry logic works

- [ ] **Offline Detection**
  - [ ] Banner appears when offline
  - [ ] Banner disappears when online
  - [ ] Works in all browsers

- [ ] **Toast Notifications**
  - [ ] All variants work (success/error/warning/info)
  - [ ] Auto-dismiss (5s)
  - [ ] Manual dismiss
  - [ ] Multiple toasts stack

- [ ] **Optimistic UI**
  - [ ] Add operations instant
  - [ ] Edit operations instant
  - [ ] Delete operations instant
  - [ ] Rollback on errors

- [ ] **Loading States**
  - [ ] Skeletons on all 5 pages
  - [ ] Correct dimensions
  - [ ] Pulse animation
  - [ ] No layout shift

### ✅ Phase 2: Production Build Testing

- [ ] **Build Process**
  - [ ] Build completes without errors
  - [ ] Reasonable bundle size
  - [ ] No warnings

- [ ] **Production Functionality**
  - [ ] Demo credentials hidden
  - [ ] Console completely silent
  - [ ] All features work
  - [ ] Security headers present
  - [ ] No source maps

### ✅ Phase 3: Edge Cases & Security

- [ ] **XSS Prevention**
  - [ ] Script tags rejected/escaped
  - [ ] HTML injection prevented

- [ ] **SQL Injection Prevention**
  - [ ] Malicious SQL rejected
  - [ ] Supabase parameterization works

- [ ] **Input Edge Cases**
  - [ ] Unicode handling
  - [ ] Boundary values
  - [ ] Special characters

- [ ] **Authentication**
  - [ ] Session expiration
  - [ ] Concurrent sessions
  - [ ] Logout

### ✅ Phase 4: Cross-Browser & Performance

- [ ] **Browser Compatibility**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
  - [ ] Mobile browsers

- [ ] **Performance**
  - [ ] Bundle size acceptable
  - [ ] Load time < 3s
  - [ ] Lighthouse score > 90
  - [ ] Validation < 100ms
  - [ ] Optimistic UI < 50ms

---

## Success Criteria

### All Tests Must Pass Before Merging to Main

**Security:**
- ✅ Zero XSS vulnerabilities
- ✅ Zero SQL injection vulnerabilities
- ✅ No sensitive data exposed in production
- ✅ Console silent in production
- ✅ Demo credentials hidden in production

**Functionality:**
- ✅ All 9 forms validate correctly with proper error messages
- ✅ Password strength enforced (8+ chars, uppercase, lowercase, number, special)
- ✅ Error handling provides user-friendly messages
- ✅ Retry logic recovers from transient failures
- ✅ Offline detection alerts users appropriately

**User Experience:**
- ✅ Optimistic UI works with automatic rollback on errors
- ✅ Loading states smooth with no layout shift
- ✅ Toast notifications clear and actionable
- ✅ Form validation is real-time and helpful

**Performance:**
- ✅ Load time < 3 seconds
- ✅ Lighthouse performance > 90
- ✅ Validation feedback < 100ms
- ✅ Optimistic updates < 50ms

**Compatibility:**
- ✅ Works in Chrome, Firefox, Safari, Edge (latest versions)
- ✅ Mobile-friendly (responsive design)
- ✅ Accessible (keyboard navigation, screen readers)

---

## Testing Tools & Resources

### Recommended Tools

1. **Browser DevTools**
   - Network tab (throttling, offline)
   - Console (logging verification)
   - Performance (timing analysis)
   - Application (storage, cache)

2. **Lighthouse**
   ```bash
   npm install -g lighthouse
   lighthouse http://localhost:5000 --view
   ```

3. **Network Simulators**
   - Chrome DevTools Network Throttling
   - Network Link Conditioner (Mac)
   - Charles Proxy

4. **Accessibility**
   - axe DevTools extension
   - WAVE browser extension
   - Screen reader (VoiceOver/NVDA)

### Testing Commands

```bash
# Development server
npm start

# Production build
npm run build

# Serve production build
npx serve -s build -p 5000

# Run tests (if configured)
npm test

# Lighthouse audit
lighthouse http://localhost:5000
```

---

## Reporting Issues

### When You Find a Bug

**Create GitHub Issue with:**

1. **Title:** Clear, descriptive (e.g., "Password validation allows weak passwords")
2. **Description:**
   - What you were testing
   - Expected behavior
   - Actual behavior
   - Steps to reproduce
3. **Environment:**
   - Browser & version
   - OS
   - Dev or Production
4. **Screenshots/Videos:** If applicable
5. **Console Logs:** If relevant (errors, warnings)

### Issue Template

```markdown
## Bug Description
[Clear description of the issue]

## Steps to Reproduce
1. Navigate to...
2. Click on...
3. Enter...
4. Observe...

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser: Chrome 119
- OS: macOS Sonoma
- Mode: Production build

## Screenshots
[Attach screenshots]

## Additional Context
[Any other relevant information]
```

---

## Post-Testing

### After All Tests Pass

1. **Update Documentation:**
   - Mark test plan as complete
   - Update SECURITY_PHASE_2_3_PLAN.md
   - Document any known issues

2. **Create Summary Report:**
   - List all tests performed
   - Note any failures (with fixes)
   - Record performance metrics

3. **Prepare for Deployment:**
   - Ensure branch is up-to-date with main
   - Create pull request with test results
   - Request code review

4. **Deployment Checklist:**
   - [ ] All tests pass
   - [ ] Code reviewed
   - [ ] Documentation updated
   - [ ] Environment variables set in Netlify
   - [ ] Ready for production deployment

---

**Test Plan Version:** 1.0
**Last Updated:** October 2025
**Maintainer:** Development Team
