# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack CRM application **migrated from Ruby on Rails to Supabase**. Originally built with Rails API backend and React frontend, it has been successfully migrated to run entirely on **Supabase (backend/database) + Netlify (frontend deployment)** architecture.

**Migration Status**: 100% Complete ✅

## Current Technology Stack

- **Backend**: Supabase (PostgreSQL database + Auth + API)
- **Frontend**: React 18.2.0 with Create React App, Tailwind CSS 3.1.4
- **Authentication**: Supabase Auth with JWT tokens
- **Deployment**: Netlify (frontend) + Supabase (backend)
- **Branch**: `netlify-supabase-migration`

## Legacy Technology Stack (Original)

- **Backend**: Ruby on Rails 7.0.3 (API-only), Ruby 2.7.4, PostgreSQL
- **Frontend**: React 18.2.0 with Create React App, Tailwind CSS 3.1.4
- **Authentication**: Rails sessions with `has_secure_password`
- **Deployment**: Heroku-ready with automated build process

## Development Commands

### Current (Supabase) Setup
```bash
# Frontend development (from /client directory)
npm install                      # Install dependencies (includes @supabase/supabase-js)
npm start                        # Start dev server (port 4000, connects to Supabase)
npm run build                    # Build for production (Netlify deployment)
npm test                         # Run tests

# Environment setup
# Create .env.local in /client directory with:
# REACT_APP_SUPABASE_URL=https://your-project.supabase.co
# REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

### Supabase Database Management
```bash
# Database managed through Supabase Dashboard:
# - SQL Editor: Run migrations and queries
# - Table Editor: Manage schema visually
# - Authentication: Manage users
# - API Docs: Auto-generated API documentation

# Key files:
# - /supabase/schema.sql - Database schema
# - /supabase/rls_policies.sql - Row Level Security
# - /client/src/supabaseClient.js - Supabase connection
# - /client/src/contexts/AuthContext.js - Authentication context
```

### Legacy (Rails) Commands
```bash
# These are NO LONGER NEEDED after migration:
bundle install                    # Install Ruby dependencies
rails db:setup                   # Create, migrate, and seed database
rails server                     # Start Rails API server (port 3000)
rails console                    # Access Rails console
```

## Current Architecture (Post-Migration)

### Supabase Database Schema
- **profiles**: User data (extends auth.users with first_name, last_name, username) - UUID primary keys
- **contacts**: Customer data (name, image_url, email, job_title, company) - belongs to user
- **deals**: Sales opportunities (deal_name, deal_stage, deal_type, amount) - belongs to user and contact
- **notes**: Deal updates (title, details) - belongs to deal
- **Row Level Security (RLS)**: Automatic data isolation by user

### API Structure (Supabase Auto-Generated)
- **REST API**: Auto-generated from database schema
- **Real-time**: WebSocket connections for live updates
- **Authentication**: JWT-based with Supabase Auth
- **Authorization**: Row Level Security policies enforce data access

### Frontend Structure (Updated)
- React components in `/client/src/components/` - **Updated for Supabase**
- **AuthContext**: `src/contexts/AuthContext.js` - Supabase auth management
- **Supabase Client**: `src/supabaseClient.js` - Database connection
- **Edit Modal Components**:
  - `EditContactModal.js` - Full contact editing with blue theme
  - `EditNoteModal.js` - Full note editing with purple theme
  - `EditDealForm.js` - Deal editing with green theme (updated for Supabase)
- **100% Tailwind CSS** for styling - All legacy CSS removed
- React Router for navigation (unchanged)

### Authentication Flow (New)
1. **Supabase Auth** handles JWT-based authentication
2. **Row Level Security** automatically protects data access
3. **React Context** manages authentication state
4. **JWT tokens** stored client-side, sent with requests

### Legacy Architecture (Original Rails)
- **Backend**: Rails API controllers (`UsersController`, `ContactsController`, etc.)
- **Authentication**: Session-based with cookies and `before_action :authorize`
- **Database**: Rails ActiveRecord with integer primary keys
- **Deployment**: Heroku with Rails serving React build

## Current Development Workflow (Supabase)

### Making Database Changes
1. **Supabase Dashboard**: Use Table Editor or SQL Editor
2. **Migration files**: Update `supabase/schema.sql` for version control
3. **RLS Policies**: Update `supabase/rls_policies.sql` as needed
4. **No migrations needed**: Supabase handles schema changes directly

### Adding New Features
1. **Database**: Add tables/columns via Supabase Dashboard
2. **Frontend**: Create React components using Supabase client
3. **Authentication**: Use `useAuth()` hook from AuthContext
4. **API Calls**: Use `supabase.from('table').select/insert/update/delete()`
5. **Styling**: Use Tailwind utility classes (unchanged)

### Deployment Process (Netlify + Supabase)
1. **Frontend**: `npm run build` in `/client` directory
2. **Netlify**: Auto-deploy from git push to branch
3. **Environment**: Set `REACT_APP_SUPABASE_*` vars in Netlify
4. **Database**: Supabase handles all backend infrastructure

## Key Patterns (Updated)

### Supabase Integration
- **Client**: `import { supabase } from '../supabaseClient'`
- **Authentication**: `const { user, signIn, signOut } = useAuth()`
- **Data Queries**: `const { data, error } = await supabase.from('contacts').select()`
- **Real-time**: `supabase.from('table').on('INSERT', callback).subscribe()`

### React Components (Updated)
- Functional components with hooks (unchanged)
- **Authentication**: Use `useAuth()` context instead of prop drilling
- **API calls**: Use Supabase client instead of fetch to Rails
- **State management**: Component state + Supabase real-time updates
- **Error handling**: Handle Supabase error objects

### Current Data Flow
1. **React components** use Supabase client for data operations
2. **Supabase** handles authentication via JWT tokens
3. **Row Level Security** automatically filters data by user
4. **Real-time updates** available via Supabase subscriptions

## 🎨 Current UI/UX Patterns (100% Tailwind CSS)

### **Design System Themes**
- **Blue Theme**: Contacts functionality (buttons, modals, focus states)
- **Green Theme**: Deals functionality (buttons, modals, focus states)
- **Purple Theme**: Notes functionality (buttons, modals, focus states)

### **Modal Patterns**
- **Edit Modals**: `EditContactModal.js`, `EditNoteModal.js`
  - Pre-populated forms with existing data
  - Modern Tailwind styling with icons and animations
  - Error handling and loading states
  - Consistent button layouts (Cancel/Update)
- **Add Modals**: `AddContactForm.js`, `AddDealModal.js`, `AddNoteModal.js`
  - Clean form interfaces with validation
  - Theme-specific styling and icons

### **Component Architecture**
- **100% Functional Components** with React Hooks
- **Context-based State Management** (`useAuth()` for authentication)
- **Supabase Integration** for all CRUD operations
- **Real-time Data Updates** without page refresh
- **Mobile-First Responsive Design** with Tailwind breakpoints

## 🎯 Claude Code Agent Usage

### **When to Use the UI/UX Designer Agent**

**ALWAYS use the `ui-ux-designer` agent proactively for:**

1. **New UI Component Development**
   - Creating new modals, forms, dashboards, or any visual component
   - Before writing React component code, consult the agent for design specs
   - Example: "I need to build a new analytics dashboard" → Use agent first

2. **UI/UX Improvements & Refactoring**
   - Improving existing user flows or interfaces
   - Addressing user experience issues or conversion problems
   - Modernizing outdated UI patterns
   - Example: "The contact form has low conversion" → Use agent to analyze

3. **Design System Work**
   - Establishing or extending design tokens (colors, typography, spacing)
   - Creating reusable component patterns
   - Ensuring visual consistency across the application
   - Example: "Need to standardize button styles" → Use agent

4. **Accessibility Audits**
   - WCAG compliance checks for existing or new features
   - Keyboard navigation and screen reader optimization
   - Color contrast and touch target verification
   - Example: "Is this modal accessible?" → Use agent to audit

5. **Responsive Design Challenges**
   - Mobile-first vs desktop-first strategy decisions
   - Complex layout breakpoint planning
   - Touch vs mouse interaction patterns
   - Example: "Need mobile version of data table" → Use agent

**Agent Workflow:**
```bash
# Step 1: Engage agent for design
→ Use ui-ux-designer agent to create specifications

# Step 2: Implement based on agent's output
→ Build React components following the design specs

# Step 3: Review & iterate
→ If needed, re-engage agent for refinements
```

**Integration with Existing Design System:**
- Agent is aware of the CRM's Blue/Green/Purple theme system
- Agent will provide Tailwind CSS specifications matching existing patterns
- Agent ensures new components fit within the established design language