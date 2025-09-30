#!/usr/bin/env node

// Simple Node.js runner for the Supabase seed script
// This file can be run with: node run-seed.js

import { runSeedScript } from './supabase-seed.js';

console.log('🚀 Starting CRM database seeding...\n');

runSeedScript()
  .then(() => {
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  });