# Supabase Seed Scripts

This directory contains scripts to populate your Supabase database with demo data migrated from the original Rails application.

## Files

- `supabase-seed.js` - Main seed script with all data and logic
- `run-seed.js` - Simple Node.js runner for the seed script
- `README.md` - This documentation file

## What Gets Created

The seed script will populate your Supabase database with:

### 📋 Demo User
- **Email**: `demo@example.com`
- **Password**: `1234`
- **Name**: Demo User
- **Username**: demo1

### 👥 Contacts (35 contacts)
- High-profile CEOs and business leaders
- Complete with photos, emails, job titles, and companies
- Includes tech leaders like Elon Musk, Tim Cook, Sundar Pichai, etc.

### 💼 Deals (24 deals)
- Realistic business deals with various stages:
  - Lead, Qualified, Proposal, Negotiation, Closed, Lost
- Deal values ranging from $75,000 to $225,000
- Each deal is associated with a random contact

### 📝 Notes (60-72 notes)
- 1-3 notes per deal with realistic content
- Various note types: discovery calls, technical reviews, negotiations, etc.
- Provides context for deal progression

## How to Run

### Option 1: Direct Node.js execution
```bash
cd client/src/scripts
node run-seed.js
```

### Option 2: Import and run from another script
```javascript
import { runSeedScript } from './supabase-seed.js';

runSeedScript()
  .then(() => console.log('Seeding complete!'))
  .catch(console.error);
```

## Prerequisites

1. **Supabase Project Setup**: Ensure your Supabase project is configured
2. **Environment Variables**: Make sure your `.env.local` file has:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   ```
3. **Database Schema**: The following tables should exist:
   - `contacts` (id, name, email, job_title, company, image_url, user_id, created_at)
   - `deals` (id, deal_name, deal_stage, amount, user_id, contact_id, created_at)
   - `notes` (id, title, details, deal_id, created_at)

## Features

- **Idempotent**: Can be run multiple times safely
- **Cleanup**: Removes existing data for the demo user before seeding
- **Error Handling**: Comprehensive error handling with clear messages
- **Progress Logging**: Shows progress as data is being created
- **Realistic Data**: Based on actual Rails seed data with improvements

## Data Safety

⚠️ **Warning**: This script will DELETE existing data for the demo user before seeding new data. Make sure you're running this on the correct Supabase project.

The script only affects:
- Data belonging to the demo user (`demo@example.com`)
- Does not affect other users' data
- Does not modify database schema

## Troubleshooting

### Common Issues

1. **Authentication Error**: Make sure your Supabase URL and anon key are correct
2. **Table Not Found**: Ensure your database schema is set up correctly
3. **Permission Denied**: Check that Row Level Security policies allow the operations

### Getting Help

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your Supabase project configuration
3. Ensure database tables exist with correct schema
4. Check Row Level Security policies

## Customization

You can modify the seed data by editing the arrays in `supabase-seed.js`:
- `contacts` - Add/modify contact information
- `dealTemplates` - Change deal names, stages, or amounts
- `noteTemplates` - Customize note titles and content

After making changes, simply run the script again to update the data.