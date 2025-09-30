// Browser Console Seed Script
// Copy and paste this into your browser console while logged into the CRM app

// Demo contacts data
const contacts = [
  { name: "John Demo", email: "john@democompany.com", job_title: "Demo Manager", company: "Demo Company" },
  { name: "Sundar Pichai", email: "Sundar@gmail.com", job_title: "CEO", company: "Alphabet" },
  { name: "Elon Musk", email: "Elon@tesla.com", job_title: "CEO", company: "Tesla" },
  { name: "Satya Nadella", email: "Satya@live.com", job_title: "CEO", company: "Microsoft" },
  { name: "Bill Gates", email: "Bill@live.com", job_title: "Founder", company: "Microsoft" },
  { name: "Jeff Bezos", email: "Jeff@amazon.com", job_title: "CEO", company: "Amazon" },
  { name: "Mark Zuckerberg", email: "Mark@meta.com", job_title: "CEO", company: "Meta" },
  { name: "Tim Cook", email: "Tim@apple.com", job_title: "CEO", company: "Apple" },
  { name: "Larry Page", email: "Larry@alphabet.com", job_title: "Founder", company: "Alphabet" },
  { name: "Jack Dorsey", email: "Jack@twitter.com", job_title: "Founder", company: "Twitter" },
  { name: "Marc Benioff", email: "Mark@salesforce.com", job_title: "Founder", company: "Salesforce" },
  { name: "Michael Dell", email: "Micheal@dell.com", job_title: "Founder", company: "Dell" },
  { name: "Reed Hastings", email: "Reed@netflix.com", job_title: "Co-Founder", company: "Netflix" },
  { name: "Evan Spiegel", email: "Evan@snap.com", job_title: "Co-Founder", company: "Snap" },
  { name: "Dara Khosrowshahi", email: "Dara@uber.com", job_title: "CEO", company: "Uber" }
];

// Demo deals data
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
  { deal_name: "Software License Renewal", deal_stage: "Closed", amount: 85000 }
];

// Demo notes data
const noteTemplates = [
  { title: "Initial Discovery Call", details: "Had a great conversation about their current challenges and pain points. They're looking to modernize their tech stack and improve efficiency." },
  { title: "Technical Requirements Review", details: "Reviewed detailed technical requirements with the engineering team. They need scalable solutions that can handle their growing user base." },
  { title: "Budget Discussion", details: "Discussed budget parameters and timeline constraints. They have Q4 budget available and want to start implementation by next month." },
  { title: "Stakeholder Presentation", details: "Presented our solution to key stakeholders including CTO and VP of Engineering. Received positive feedback on our approach." },
  { title: "Implementation Timeline", details: "Worked out detailed implementation timeline with project milestones. They're comfortable with our proposed 3-month delivery schedule." },
  { title: "Contract Negotiation", details: "Reviewing contract terms and conditions. Legal teams from both sides are working through the details." },
  { title: "Technical Deep Dive", details: "Conducted detailed technical architecture review with their development team. Addressed all technical concerns and questions." },
  { title: "Final Proposal Review", details: "Presented final proposal with updated pricing and timeline. Waiting for board approval scheduled for next week." },
  { title: "Follow-up Meeting", details: "Scheduled follow-up to address remaining questions about ongoing support and maintenance packages." },
  { title: "Decision Pending", details: "Client is evaluating between us and one other vendor. Expected decision by end of week." },
  { title: "Closed Won!", details: "Successfully closed the deal! Contract signed and project kickoff scheduled for next Monday." },
  { title: "Lost to Competitor", details: "Unfortunately lost this opportunity to a competitor who offered a lower price point. Good learnings for future deals." }
];

// Get supabase client from window object (should be available in the app)
const supabase = window.supabase || window._supabase;

if (!supabase) {
  console.error('❌ Supabase client not found. Make sure you\'re running this in the CRM app.');
  throw new Error('Supabase client not available');
}

async function runBrowserSeed() {
  console.log('🌱 Starting browser seed script...');

  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('❌ No user logged in. Please log in first.');
      return;
    }

    console.log('✅ Using current user:', user.email);

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await supabase.from('notes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('deals').delete().eq('user_id', user.id);
    await supabase.from('contacts').delete().eq('user_id', user.id);

    // Seed contacts
    console.log('👥 Seeding contacts...');
    const contactsWithUser = contacts.map(contact => ({
      ...contact,
      user_id: user.id
    }));

    const { data: createdContacts, error: contactError } = await supabase
      .from('contacts')
      .insert(contactsWithUser)
      .select();

    if (contactError) {
      console.error('❌ Error seeding contacts:', contactError);
      throw contactError;
    }

    console.log(`✅ Created ${createdContacts.length} contacts`);

    // Seed deals
    console.log('💼 Seeding deals...');
    const dealsWithUser = dealTemplates.map(deal => ({
      ...deal,
      user_id: user.id,
      contact_id: createdContacts[Math.floor(Math.random() * createdContacts.length)].id
    }));

    const { data: createdDeals, error: dealError } = await supabase
      .from('deals')
      .insert(dealsWithUser)
      .select();

    if (dealError) {
      console.error('❌ Error seeding deals:', dealError);
      throw dealError;
    }

    console.log(`✅ Created ${createdDeals.length} deals`);

    // Seed notes
    console.log('📝 Seeding notes...');
    const notes = [];

    // Add 1-2 notes per deal
    createdDeals.forEach(deal => {
      const notesCount = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < notesCount; i++) {
        const randomNote = noteTemplates[Math.floor(Math.random() * noteTemplates.length)];
        notes.push({
          ...randomNote,
          deal_id: deal.id
        });
      }
    });

    const { data: createdNotes, error: noteError } = await supabase
      .from('notes')
      .insert(notes)
      .select();

    if (noteError) {
      console.error('❌ Error seeding notes:', noteError);
      throw noteError;
    }

    console.log(`✅ Created ${createdNotes.length} notes`);

    console.log('\n🎉 Seed script completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   • ${createdContacts.length} contacts`);
    console.log(`   • ${createdDeals.length} deals`);
    console.log(`   • ${createdNotes.length} notes`);
    console.log('\n🔄 Refresh the page to see the new data!');

  } catch (error) {
    console.error('💥 Seed script failed:', error);
  }
}

// Run the seed script
runBrowserSeed();