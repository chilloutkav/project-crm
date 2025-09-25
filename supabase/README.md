# Supabase Setup Instructions - Phase 1

This directory contains the SQL scripts needed to set up your CRM database in Supabase.

## Prerequisites

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project in your Supabase dashboard
3. Note down your project credentials:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Public Key**: Found in Settings > API
   - **Service Role Key**: Found in Settings > API (keep this secret!)

## Database Setup Steps

### 1. Run the Schema Script
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `schema.sql`
4. Click **Run** to create all tables, indexes, and triggers

### 2. Set Up Row Level Security
1. In the SQL Editor, create a new query
2. Copy and paste the contents of `rls_policies.sql`
3. Click **Run** to enable RLS and create all security policies

### 3. Verify Setup
1. Go to **Table Editor** in your dashboard
2. You should see these tables:
   - `profiles` (extends Supabase auth.users)
   - `companies`
   - `contacts`
   - `deals`
   - `notes`
3. Each table should show "RLS enabled" in the table settings

### 4. Test Authentication Flow
1. Go to **Authentication** > **Users**
2. Create a test user or enable email signup
3. Try signing up with a new account
4. Check that a `profiles` record was automatically created

## Key Differences from Rails

- **User IDs**: UUIDs instead of integers
- **Authentication**: Supabase Auth instead of Rails sessions
- **Security**: Row Level Security policies instead of controller-based authorization
- **Timestamps**: Automatic `created_at`/`updated_at` via triggers

## Data Migration (Optional)

If you have existing data in your Rails app:

1. Export your current data: `rails dbconsole` then `\copy users TO 'users.csv' CSV HEADER;`
2. Use the `migrate_data.sql` template to format your data for Supabase
3. Import via SQL Editor or use the Supabase CLI

## Next Steps

After Phase 1 is complete:
- **Phase 2**: Install Supabase JavaScript client in React app
- **Phase 3**: Replace Rails API calls with Supabase client calls
- **Phase 4**: Deploy to Netlify

## Troubleshooting

- **RLS errors**: Make sure policies are created AFTER enabling RLS
- **Auth trigger not working**: Check that `handle_new_user()` function exists
- **Foreign key errors**: Ensure parent records exist before creating child records

## Environment Variables for Next Phase

Save these for when we set up the React client:
```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```