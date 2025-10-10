# Form Validation Testing Guide

**Browser:** http://localhost:4000
**Status:** Testing in Progress
**Date:** October 9, 2025

---

## Setup: Login to Access Forms

1. Navigate to http://localhost:4000
2. Use demo credentials (visible on page in dev mode):
   - Email: `demo@example.com`
   - Password: `Demo123!`
3. Click "Sign In"

---

## Test 1: Contact Forms (2 forms)

### 1A. Add Contact Form

**How to Access:**
1. After login, go to `/dashboard/contacts`
2. Click "Add Contact" button

**Name Field Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `John Doe` | ✅ Valid (letters + space) | ⏳ |
| `John O'Brien` | ✅ Valid (apostrophe allowed) | ⏳ |
| `Anne-Marie` | ✅ Valid (hyphen allowed) | ⏳ |
| `J` | ❌ Error: "Name must be at least 2 characters" | ⏳ |
| `John123` | ❌ Error: "Name can only contain letters, spaces, hyphens, and apostrophes" | ⏳ |
| `<script>alert('XSS')</script>` | ❌ Error: Rejected by regex | ⏳ |
| (101 char string) | ❌ Error: "Name must not exceed 100 characters" | ⏳ |

**Email Field Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `john@example.com` | ✅ Valid email | ⏳ |
| `john.doe+tag@company.co.uk` | ✅ Valid complex email | ⏳ |
| `invalid-email` | ❌ Error: "Invalid email format" | ⏳ |
| `@example.com` | ❌ Error: "Invalid email format" | ⏳ |
| `john@` | ❌ Error: "Invalid email format" | ⏳ |

**Job Title Field (Optional):**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `Software Engineer` | ✅ Valid | ⏳ |
| (empty) | ✅ Valid (optional) | ⏳ |
| `A` | ❌ Error: "Job title must be at least 2 characters" | ⏳ |

**Company Field (Optional):**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `Acme Corporation` | ✅ Valid | ⏳ |
| (empty) | ✅ Valid (optional) | ⏳ |
| `A` | ❌ Error: "Company name must be at least 2 characters" | ⏳ |

**General Validation Checks:**
- [ ] Submit empty form → Inline errors appear for required fields
- [ ] Error toast appears: "Please fix the errors before submitting"
- [ ] Submit button stays enabled after error
- [ ] Fix invalid field → Error clears in real-time
- [ ] Submit valid data → Success toast: "Contact added successfully!"
- [ ] Modal closes on success

---

### 1B. Edit Contact Modal

**How to Access:**
1. Go to `/dashboard/contacts`
2. Click edit icon (pencil) on any contact card

**Validation Tests:**
- [ ] Pre-populated fields show existing data
- [ ] Test same name validations as Add Contact
- [ ] Test same email validations as Add Contact
- [ ] Submit invalid data → Inline errors + error toast
- [ ] Submit valid changes → Success toast: "Contact updated successfully!"
- [ ] Modal closes on success

---

## Test 2: Deal Forms (3 forms)

### 2A. Add Deal Modal

**How to Access:**
1. Go to `/dashboard/deals`
2. Click "Add Deal" button

**Deal Name Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `Q4 Enterprise Deal` | ✅ Valid | ⏳ |
| `A` | ❌ Error: "Deal name must be at least 2 characters" | ⏳ |
| (201 char string) | ❌ Error: "Deal name must not exceed 200 characters" | ⏳ |

**Amount Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `50000` | ✅ Valid positive number | ⏳ |
| `999999999` | ✅ Valid (max allowed) | ⏳ |
| `0` | ❌ Error: "Amount must be greater than 0" | ⏳ |
| `-100` | ❌ Error: "Amount must be greater than 0" | ⏳ |
| `1000000000` | ❌ Error: "Amount must not exceed 999,999,999" | ⏳ |
| `abc` | ❌ Error: "Amount must be a number" | ⏳ |

**Deal Stage Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| Select "Lead" | ✅ Valid | ⏳ |
| Select "Qualified" | ✅ Valid | ⏳ |
| Select "Proposal" | ✅ Valid | ⏳ |
| (no selection) | ❌ Error: "Please select a valid deal stage" | ⏳ |

**Contact Selection:**
- [ ] Must select a contact from dropdown
- [ ] Error if no contact selected

**General Checks:**
- [ ] Submit empty form → Inline errors + error toast
- [ ] Submit valid data → Success toast + modal closes
- [ ] Deal appears in deals list

---

### 2B. Add New Deal Form (Legacy)

**How to Access:**
1. Go to `/dashboard/contacts/:id` (click any contact)
2. Find "Add New Deal" section on the page

**Validation Tests:**
- [ ] Same deal_name validation as 2A
- [ ] Same amount validation as 2A
- [ ] Same deal_stage validation as 2A
- [ ] Contact is pre-selected (from current contact page)
- [ ] Submit invalid → Inline errors + error toast
- [ ] Submit valid → Success toast

---

### 2C. Edit Deal Form

**How to Access:**
1. Go to `/dashboard/deals/:id` (click any deal)
2. Click "Edit Deal" toggle/button

**Validation Tests:**
- [ ] Form pre-populated with existing deal data
- [ ] Test amount validation (positive, max value)
- [ ] Test deal_stage dropdown (valid enum only)
- [ ] Submit invalid → Inline errors + error toast
- [ ] Submit valid → Success toast: "Deal updated successfully!"

---

## Test 3: Note Forms (2 forms)

### 3A. Add Note Modal

**How to Access:**
1. Go to `/dashboard/deals/:id` (click any deal)
2. Click "Add Note" button

**Title Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `Follow-up Call` | ✅ Valid | ⏳ |
| `A` | ❌ Error: "Title must be at least 2 characters" | ⏳ |
| (201 char string) | ❌ Error: "Title must not exceed 200 characters" | ⏳ |

**Details Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `Called customer to discuss pricing options and next steps.` (50+ chars) | ✅ Valid | ⏳ |
| `Short` | ❌ Error: "Details must be at least 10 characters" | ⏳ |
| (5001 char string) | ❌ Error: "Details must not exceed 5000 characters" | ⏳ |

**General Checks:**
- [ ] Submit empty form → Inline errors + error toast
- [ ] Submit valid → Success toast: "Note added successfully!"
- [ ] Modal closes, note appears in notes list

---

### 3B. Edit Note Modal

**How to Access:**
1. Go to `/dashboard/deals/:id` (click any deal with notes)
2. Click edit icon on a note card

**Validation Tests:**
- [ ] Form pre-populated with existing note data
- [ ] Same title validation as 3A
- [ ] Same details validation as 3A
- [ ] Submit invalid → Inline errors + error toast
- [ ] Submit valid → Success toast: "Note updated successfully!"
- [ ] Modal closes, note updates in place

---

## Test 4: Authentication Forms (2 forms)

### 4A. Login Form (Error Handling)

**How to Access:**
1. Logout first (if logged in)
2. Go to http://localhost:4000

**Tests:**
| Scenario | Expected Result | Status |
|----------|----------------|--------|
| Wrong password | ❌ Error toast: "Invalid email or password" | ⏳ |
| Invalid email format | ❌ HTML5 validation (email input type) | ⏳ |
| Empty fields | ❌ HTML5 required validation | ⏳ |
| Valid credentials | ✅ Success toast: "Successfully signed in!" | ⏳ |

**General Checks:**
- [ ] No inline validation errors (uses Supabase error handling)
- [ ] Error messages are user-friendly (not technical)
- [ ] Success redirects to `/dashboard`

---

### 4B. SignUp Form (Complete Validation)

**How to Access:**
1. From login page, click "Create Account"

**First Name Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `John` | ✅ Valid | ⏳ |
| `J` | ❌ Error: "First name must be at least 2 characters" | ⏳ |
| `John123` | ❌ Error: "First name can only contain letters..." | ⏳ |

**Last Name Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `Doe` | ✅ Valid | ⏳ |
| `D` | ❌ Error: "Last name must be at least 2 characters" | ⏳ |

**Username Validation:**
| Input | Expected Result | Status |
|-------|----------------|--------|
| `johndoe` | ✅ Valid | ⏳ |
| `john_doe123` | ✅ Valid (letters, numbers, underscore) | ⏳ |
| `jo` | ❌ Error: "Username must be at least 3 characters" | ⏳ |
| `john-doe` | ❌ Error: "Username can only contain letters, numbers, and underscores" | ⏳ |

**Email Validation:**
- [ ] Same as contact email validation

**Password Validation:**
- [ ] Already tested in Section 2 (password strength)
- [ ] Verify strength meter still working

**Password Confirmation:**
- [ ] Passwords must match (if implemented)

**General Checks:**
- [ ] Submit empty form → All required field errors
- [ ] Submit invalid → Inline errors + error toast
- [ ] Submit valid → Account creation (may require email verification)

---

## Summary Checklist

### Contact Forms:
- [ ] AddContactForm.js - All validations tested
- [ ] EditContactModal.js - All validations tested

### Deal Forms:
- [ ] AddDealModal.js - All validations tested
- [ ] AddNewDealForm.js - All validations tested
- [ ] EditDealForm.js - All validations tested

### Note Forms:
- [ ] AddNoteModal.js - All validations tested
- [ ] EditNoteModal.js - All validations tested

### Auth Forms:
- [ ] Login.js - Error handling tested
- [ ] SignUp.js - All validations tested

---

## Common Validation Patterns to Verify

For ALL forms, check:
1. **Inline Errors:** Error message appears below the invalid field
2. **Error Toast:** Red toast appears: "Please fix the errors before submitting"
3. **Submit Button:** Stays enabled after validation error (allows retry)
4. **Real-time Clearing:** Error disappears when field becomes valid
5. **Success Toast:** Green toast on successful submission
6. **Modal Close:** Modal closes after successful submission (where applicable)
7. **Loading State:** Submit button shows loading text during submission
8. **User-Friendly Messages:** No technical jargon in error messages

---

## Test Results Format

For each test, mark as:
- ✅ PASSED - Works as expected
- ❌ FAILED - Doesn't work, note the issue
- ⚠️ PARTIAL - Mostly works but has minor issues

Update `PHASE_1_TEST_RESULTS.md` with detailed results after testing.
