// Supabase Seed Data Migration Script
// Run this script to populate your Supabase database with demo data

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client directly for Node.js environment
const supabaseUrl = 'https://qiwzcfxekpztmytfivfk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpd3pjZnhla3B6dG15dGZpdmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MTIyMjAsImV4cCI6MjA3NDI4ODIyMH0.Khs4DB1qg7mA5TVjcMmSsOdmIEdBRaKH78yVNCmA2HE';

const supabase = createClient(supabaseUrl, supabaseKey);

const DEMO_USER_EMAIL = 'demo@example.com';
const DEMO_USER_PASSWORD = 'demo123456';

// Demo contacts data (from Rails seeds.rb)
const contacts = [
  { name: "John Demo", email: "john@democompany.com", job_title: "Demo Manager", company: "Demo Company", image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { name: "Sundar Pichai", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Sundar_Pichai_Attr-Maurizio-Pesce-1.jpg", email: "Sundar@gmail.com", job_title: "CEO", company: "Alphabet" },
  { name: "Elon Musk", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/ElonMusk.png", email: "Elon@tesla.com", job_title: "CEO", company: "Tesla" },
  { name: "Satya Nadella", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Satya_Nadella-Official-Leweb-Photos.jpg", email: "Satya@live.com", job_title: "CEO", company: "Microsoft" },
  { name: "Bill Gates", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/BillGates-1.jpg", email: "Bill@live.com", job_title: "Founder", company: "Microsoft" },
  { name: "Jeff Bezos", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/JeffBezos.jpg", email: "Jeff@amazon.com", job_title: "CEO", company: "Amazon" },
  { name: "Daniel Zhang", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/%E9%80%8D%E9%81%A5%E5%AD%90%E6%A0%87%E5%87%86%E7%85%A71-1-732x1024.png", email: "Daniel@alibaba.com", job_title: "CEO", company: "Alibaba" },
  { name: "Mark Zuckerberg", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Mark-Zuckerberg.jpg", email: "Mark@meta.com", job_title: "CEO", company: "Meta" },
  { name: "Lakshmi Mittal", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/LakshmiMittal.jpg", email: "Lakshmi@ArcelorMittal.com", job_title: "CEO", company: "Arcelor" },
  { name: "Indra Nooyi", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Indra-Nooyi-attr-Jeff-Bedford.jpg", email: "Indra@pepsi.com", job_title: "CEO", company: "Pepsi" },
  { name: "Tim Cook", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Tim_Cook_2009-attr-Valery-Marchive-LeMagIT.jpg", email: "Tim@apple.com", job_title: "CEO", company: "Apple" },
  { name: "Aliko Dangote", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/AlikoDangote.jpg", email: "Aliko@dangotegroup.com", job_title: "CEO", company: "Dangote Group" },
  { name: "Larry Page", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/LarryPage.jpg", email: "Larry@alphabet.com", job_title: "Founder", company: "Alphabet" },
  { name: "Abigail Johnson", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/AbigailJohnson.jpg", email: "Abigail@fidelity.com", job_title: "CEO", company: "Fidelity Investments" },
  { name: "Michael Dell", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/MichaelDell-2.jpg", email: "Micheal@dell.com", job_title: "Founder", company: "Dell" },
  { name: "Lei Jun", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Lei-Jun-Attribution-Stefen-Chow-Fortune-Global-Forum-600x400.jpg", email: "Lei@xiaomi.com", job_title: "Founder", company: "Xiaomi" },
  { name: "Jaime Diamond", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Jamie_Dimon-attr-World-Economic-Forum.jpg", email: "Jaime@chase.com", job_title: "CEO", company: "Chase" },
  { name: "Jack Dorsey", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Jack_Dorsey_2014-cellanr-Flickr.jpg", email: "Jack@twitter.com", job_title: "Founder", company: "Twitter" },
  { name: "Jen-Hsun Huang", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Jen-Hsun_Huang_Headshot_attr-Nvidia-Corporation.jpg", email: "Jen@nvidia.com", job_title: "Co-Founder", company: "Nvidia" },
  { name: "Richard D. Fairbank", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Richard-Fairbank-Attr-Stanford-Business-School.jpg", email: "Richard@capitalone.com", job_title: "Co-Founder", company: "Capital One" },
  { name: "Bernard Arnault", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/BernardArnault.jpg", email: "Bernard@lvmh.com", job_title: "CEO", company: "LVMH" },
  { name: "Marc Benioff", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Marc_Benioff_2013-attr-By-TechCrunch.jpg", email: "Mark@salesforce.com", job_title: "Founder", company: "Salesforce" },
  { name: "Charles Koch", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/CharlesKoch-1.jpg", email: "Charles@koch.com", job_title: "CEO", company: "Koch Industries" },
  { name: "Zhang Xin", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Zhang_Xin_20171206.jpg", email: "Zhang@SOHOChina.com", job_title: "Co-Founder", company: "SOHO China" },
  { name: "Michael Bloomberg", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/MichaelRBloomberg.jpg", email: "Micheal@bloomberg.com", job_title: "Founder", company: "Bloomberg" },
  { name: "Robin Li", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Robin-Li.jpg", email: "Robin@baidu.com", job_title: "Co-Founder", company: "Baidu" },
  { name: "Evan Spiegel", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Evan-Spiegel.jpg", email: "Evan@snap.com", job_title: "Co-Founder", company: "Snap" },
  { name: "Meg Whiteman", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Meg_Whitman_crop-attr-Max-Morse.jpg", email: "Meg@NewTV.com", job_title: "CEO", company: "NewTV" },
  { name: "Safra A. Catz", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Safra-Catz-attr-Hartmann-Studios.jpg", email: "Safra@oracle.com", job_title: "CEO", company: "Oracle" },
  { name: "Karl-Johan Persson", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Karl-Johan_Persson-Attr-Peter-J%C3%B6nsson.jpg", email: "Karl@HM.com", job_title: "CEO", company: "H&M" },
  { name: "Judith R. Faulkner", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Judith-Faulkner-Attr-Epic-Systems.jpg", email: "Judith@epicsystems.com", job_title: "Founder", company: "Epic Systems" },
  { name: "Dara Khosrowshahi", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Dara_Khosrowshahi_-attr-George-Grinsted.jpg", email: "Dara@uber.com", job_title: "CEO", company: "Uber" },
  { name: "Ivan Glasenburg", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Ivan_Glasenberg-Attr-By-Financial-Times-photos-co-Dianna-Bonner.jpg", email: "Ivan@glencore.com", job_title: "CEO", company: "Glencore" },
  { name: "Reed Hastings", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Reed_Hastings_Web_2.0_Conference-Attr-James-Duncan-Davidson.OReilly-Media-Inc..jpg", email: "Reed@netflix.com", job_title: "Co-Founder", company: "Netflix" },
  { name: "Masayoshi Son", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Masayoshi-Son-763x1024.jpg", email: "Masayoshi@softbank.com", job_title: "Founder", company: "SoftBank Group" }
];

// Demo deals data (simplified from Rails faker data)
const dealTemplates = [
  { deal_name: "Q1 Enterprise Software Deal", deal_stage: "Lead", amount: 100000 },
  { deal_name: "Marketing Platform Integration", deal_stage: "Qualified", amount: 120000 },
  { deal_name: "Cloud Infrastructure Upgrade", deal_stage: "Proposal", amount: 130000 },
  { deal_name: "Digital Transformation Project", deal_stage: "Negotiation", amount: 145000 },
  { deal_name: "Security Consulting Package", deal_stage: "Closed", amount: 135000 },
  { deal_name: "Analytics Platform Implementation", deal_stage: "Lost", amount: 125000 },
  { deal_name: "Mobile App Development", deal_stage: "Lead", amount: 140000 },
  { deal_name: "Database Migration Service", deal_stage: "Qualified", amount: 150000 },
  { deal_name: "AI/ML Consulting Contract", deal_stage: "Proposal", amount: 180000 },
  { deal_name: "DevOps Automation Suite", deal_stage: "Negotiation", amount: 165000 },
  { deal_name: "Cybersecurity Assessment", deal_stage: "Closed", amount: 95000 },
  { deal_name: "Data Warehouse Modernization", deal_stage: "Lead", amount: 200000 },
  { deal_name: "E-commerce Platform Build", deal_stage: "Qualified", amount: 175000 },
  { deal_name: "CRM System Implementation", deal_stage: "Proposal", amount: 110000 },
  { deal_name: "Blockchain Integration Project", deal_stage: "Negotiation", amount: 190000 },
  { deal_name: "IoT Infrastructure Setup", deal_stage: "Lost", amount: 155000 },
  { deal_name: "Software License Renewal", deal_stage: "Closed", amount: 85000 },
  { deal_name: "Training and Development Program", deal_stage: "Lead", amount: 75000 },
  { deal_name: "API Integration Services", deal_stage: "Qualified", amount: 90000 },
  { deal_name: "Legacy System Modernization", deal_stage: "Proposal", amount: 225000 },
  { deal_name: "Quality Assurance Automation", deal_stage: "Negotiation", amount: 135000 },
  { deal_name: "Performance Optimization Project", deal_stage: "Closed", amount: 115000 },
  { deal_name: "Compliance and Audit Support", deal_stage: "Lead", amount: 125000 },
  { deal_name: "Backup and Disaster Recovery", deal_stage: "Qualified", amount: 105000 }
];

// Demo notes data
const noteTemplates = [
  { title: "Initial Discovery Call", details: "Had a great conversation about their current challenges and pain points. They're looking to modernize their tech stack and improve efficiency." },
  { title: "Technical Requirements Review", details: "Reviewed detailed technical requirements with the engineering team. They need scalable solutions that can handle their growing user base." },
  { title: "Budget Discussion", details: "Discussed budget parameters and timeline constraints. They have Q4 budget available and want to start implementation by next month." },
  { title: "Stakeholder Presentation", details: "Presented our solution to key stakeholders including CTO and VP of Engineering. Received positive feedback on our approach." },
  { title: "Competitive Analysis", details: "Discussed how our solution compares to competitors. Our unique value proposition in integration capabilities resonated well." },
  { title: "Implementation Timeline", details: "Worked out detailed implementation timeline with project milestones. They're comfortable with our proposed 3-month delivery schedule." },
  { title: "Contract Negotiation", details: "Reviewing contract terms and conditions. Legal teams from both sides are working through the details." },
  { title: "Technical Deep Dive", details: "Conducted detailed technical architecture review with their development team. Addressed all technical concerns and questions." },
  { title: "Reference Call Feedback", details: "Client spoke with our existing customer references and received very positive feedback about our delivery and support." },
  { title: "Final Proposal Review", details: "Presented final proposal with updated pricing and timeline. Waiting for board approval scheduled for next week." },
  { title: "Follow-up Meeting", details: "Scheduled follow-up to address remaining questions about ongoing support and maintenance packages." },
  { title: "Decision Pending", details: "Client is evaluating between us and one other vendor. Expected decision by end of week." },
  { title: "Closed Won!", details: "Successfully closed the deal! Contract signed and project kickoff scheduled for next Monday." },
  { title: "Lost to Competitor", details: "Unfortunately lost this opportunity to a competitor who offered a lower price point. Good learnings for future deals." },
  { title: "Proposal Submitted", details: "Submitted comprehensive proposal including technical solution, timeline, and pricing. Client review meeting scheduled for next week." }
];

async function createDemoUser() {
  console.log('🔐 Getting current user...');

  // Try to get current session first
  const { data: session } = await supabase.auth.getSession();

  if (session?.session?.user) {
    console.log('✅ Using existing session user');
    return session.session.user;
  }

  // If no session, try to sign in with demo credentials
  try {
    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email: DEMO_USER_EMAIL,
      password: DEMO_USER_PASSWORD
    });

    if (!error && signInData.user) {
      console.log('✅ Signed in with demo credentials');
      return signInData.user;
    }
  } catch (error) {
    console.log('Demo user does not exist, will create new one...');
  }

  // Create new demo user if needed
  const { data, error } = await supabase.auth.signUp({
    email: DEMO_USER_EMAIL,
    password: DEMO_USER_PASSWORD,
    options: {
      data: {
        first_name: 'Demo',
        last_name: 'User',
        username: 'demo1'
      }
    }
  });

  if (error) {
    console.error('❌ Error creating demo user:', error);
    throw error;
  }

  console.log('✅ Demo user created successfully');
  return data.user;
}

async function seedContacts(userId) {
  console.log('👥 Seeding contacts...');

  // Clear existing contacts for this user
  await supabase
    .from('contacts')
    .delete()
    .eq('user_id', userId);

  // Add user_id to each contact
  const contactsWithUser = contacts.map(contact => ({
    ...contact,
    user_id: userId
  }));

  const { data, error } = await supabase
    .from('contacts')
    .insert(contactsWithUser)
    .select();

  if (error) {
    console.error('❌ Error seeding contacts:', error);
    throw error;
  }

  console.log(`✅ Seeded ${data.length} contacts`);
  return data;
}

async function seedDeals(userId, contacts) {
  console.log('💼 Seeding deals...');

  // Clear existing deals for this user
  await supabase
    .from('deals')
    .delete()
    .eq('user_id', userId);

  // Create deals with random contact assignments
  const dealsWithUser = dealTemplates.map(deal => ({
    ...deal,
    user_id: userId,
    contact_id: contacts[Math.floor(Math.random() * contacts.length)].id
  }));

  const { data, error } = await supabase
    .from('deals')
    .insert(dealsWithUser)
    .select();

  if (error) {
    console.error('❌ Error seeding deals:', error);
    throw error;
  }

  console.log(`✅ Seeded ${data.length} deals`);
  return data;
}

async function seedNotes(deals) {
  console.log('📝 Seeding notes...');

  // Clear existing notes for these deals
  const dealIds = deals.map(deal => deal.id);
  await supabase
    .from('notes')
    .delete()
    .in('deal_id', dealIds);

  // Create notes with random deal assignments
  const notes = [];

  // Add 1-3 notes per deal
  deals.forEach(deal => {
    const notesCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < notesCount; i++) {
      const randomNote = noteTemplates[Math.floor(Math.random() * noteTemplates.length)];
      notes.push({
        ...randomNote,
        deal_id: deal.id
      });
    }
  });

  const { data, error } = await supabase
    .from('notes')
    .insert(notes)
    .select();

  if (error) {
    console.error('❌ Error seeding notes:', error);
    throw error;
  }

  console.log(`✅ Seeded ${data.length} notes`);
  return data;
}

async function runSeedScript() {
  console.log('🌱 Starting Supabase seed script...');

  try {
    // Create demo user and get their ID
    const demoUser = await createDemoUser();

    // Sign in as demo user to get proper session
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: DEMO_USER_EMAIL,
      password: DEMO_USER_PASSWORD
    });

    if (signInError) {
      console.error('❌ Error signing in:', signInError);
      throw signInError;
    }

    const userId = signInData.user.id;

    // Seed data in order (contacts first, then deals, then notes)
    const contacts = await seedContacts(userId);
    const deals = await seedDeals(userId, contacts);
    const notes = await seedNotes(deals);

    console.log('\n🎉 Seed script completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   • 1 demo user created`);
    console.log(`   • ${contacts.length} contacts`);
    console.log(`   • ${deals.length} deals`);
    console.log(`   • ${notes.length} notes`);
    console.log('\n🔑 Demo Login Credentials:');
    console.log(`   Email: ${DEMO_USER_EMAIL}`);
    console.log(`   Password: ${DEMO_USER_PASSWORD}`);

  } catch (error) {
    console.error('💥 Seed script failed:', error);
    throw error;
  }
}

// Export for use as module or run directly
export { runSeedScript };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeedScript().catch(console.error);
}