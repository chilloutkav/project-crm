# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding users..."

User.create(first_name: "Demo User", last_name: "test", username: "demo1", email: "test@mail.com", password: "1234", password_confirmation: "1234")


puts "Seeding contacts..."

Contact.create(name: "Sundar Pichai", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Sundar_Pichai_Attr-Maurizio-Pesce-1.jpg", email: "Sundar@gmail.com", job_title: "CEO", company: "Alphabet", user_id: 1)
Contact.create(name: "Elon Musk", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/ElonMusk.png", email: "Elon@tesla.com", job_title: "CEO", company: "Tesla", user_id: 1)
Contact.create(name: "Satya Nadella", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Satya_Nadella-Official-Leweb-Photos.jpg",email: "Satya@live.com", job_title: "CEO", company: "Microsoft", user_id: 1)
Contact.create(name: "Bill Gates", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/BillGates-1.jpg",email: "Bill@live.com", job_title: "Founder", company: "Microsoft", user_id: 1)
Contact.create(name: "Jeff Bezos", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/JeffBezos.jpg", email: "Jeff@amazon.com", job_title: "CEO", company: "Amazon", user_id: 1)
Contact.create(name: "Daniel Zhang", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/%E9%80%8D%E9%81%A5%E5%AD%90%E6%A0%87%E5%87%86%E7%85%A71-1-732x1024.png", email: "Daniel@alibaba.com", job_title: "CEO", company: "Alibaba", user_id: 1)
Contact.create(name: "Mark Zuckerberg", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Mark-Zuckerberg.jpg", email: "Mark@meta.com", job_title: "CEO", company: "Meta", user_id: 1)
Contact.create(name: "Lakshmi Mittal", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/LakshmiMittal.jpg", email: "Lakshmi@ArcelorMittal.com", job_title: "CEO", company: "Arcelor", user_id: 1)
Contact.create(name: "Indra Nooyi", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Indra-Nooyi-attr-Jeff-Bedford.jpg", email: "Indra@pepsi.com", job_title: "CEO", company: "Pepsi", user_id: 1)
Contact.create(name: "Tim Cook", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Tim_Cook_2009-attr-Valery-Marchive-LeMagIT.jpg", email: "Tim@apple.com", job_title: "CEO", company: "Apple", user_id: 1)
Contact.create(name: "Aliko Dangote", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/AlikoDangote.jpg",email: "Aliko@dangotegroup.com", job_title: "CEO", company: "Dangote Group", user_id: 1)
Contact.create(name: "Larry Page", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/LarryPage.jpg", email: "Larry@alphabet.com", job_title: "Founder", company: "Alphabet", user_id: 1)
Contact.create(name: "Abigail Johnson", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/AbigailJohnson.jpg", email: "Abigail@fidelity.com", job_title: "CEO", company: "Fidelity Investments", user_id: 1)
Contact.create(name: "Michael Dell", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/MichaelDell-2.jpg", email: "Micheal@dell.com", job_title: "Founder", company: "Dell", user_id: 1)
Contact.create(name: "Lei Jun", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Lei-Jun-Attribution-Stefen-Chow-Fortune-Global-Forum-600x400.jpg", email: "Lei@xiaomi.com", job_title: "Founder", company: "Xiaomi", user_id: 1)
Contact.create(name: "Jaime Diamond", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Jamie_Dimon-attr-World-Economic-Forum.jpg", email: "Jaime@chase.com", job_title: "CEO", company: "Chase", user_id: 1)
Contact.create(name: "Jack Dorsey", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Jack_Dorsey_2014-cellanr-Flickr.jpg", email: "Jack@twitter.com", job_title: "Founder", company: "Twitter", user_id: 1)
Contact.create(name: "Jen-Hsun Huang", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Jen-Hsun_Huang_Headshot_attr-Nvidia-Corporation.jpg", email: "Jen@nvidia.com", job_title: "Co-Founder", company: "Nvidia", user_id: 1)
Contact.create(name: "Richard D. Fairbank", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Richard-Fairbank-Attr-Stanford-Business-School.jpg", email: "Richard@capitalone.com", job_title: "Co-Founder", company: "Capital One", user_id: 1)
Contact.create(name: "Bernard Arnault", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/BernardArnault.jpg", email: "Bernard@lvmh.com", job_title: "CEO", company: "LVMH", user_id: 1)
Contact.create(name: "Marc Benioff", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Marc_Benioff_2013-attr-By-TechCrunch.jpg", email: "Mark@salesforce.com", job_title: "Founder", company: "Salesforce", user_id: 1)
Contact.create(name: "Charles Koch", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/CharlesKoch-1.jpg", email: "Charles@koch.com", job_title: "CEO", company: "Koch Industries", user_id: 1)
Contact.create(name: "Zhang Xin", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Zhang_Xin_20171206.jpg", email: "Zhang@SOHOChina.com", job_title: "Co-Founder", company: "SOHO China", user_id: 1)
Contact.create(name: "Michael Bloomberg", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/MichaelRBloomberg.jpg", email: "Micheal@bloomberg.com", job_title: "Founder", company: "Bloomberg", user_id: 1)
Contact.create(name: "Robin Li", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Robin-Li.jpg", email: "Robin@baidu.com", job_title: "Co-Founder", company: "Baidu", user_id: 1)
Contact.create(name: "Evan Spiegel", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Evan-Spiegel.jpg", email: "Evan@snap.com", job_title: "Co-Founder", company: "Snap", user_id: 1)
Contact.create(name: "Meg Whiteman", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Meg_Whitman_crop-attr-Max-Morse.jpg", email: "Meg@NewTV.com", job_title: "CEO", company: "NewTV", user_id: 1)
Contact.create(name: "Safra A. Catz", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Safra-Catz-attr-Hartmann-Studios.jpg", email: "Safra@oracle.com", job_title: "CEO", company: "Oracle", user_id: 1)
Contact.create(name: "Karl-Johan Persson", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Karl-Johan_Persson-Attr-Peter-J%C3%B6nsson.jpg", email: "Karl@HM.com", job_title: "CEO", company: "H&M", user_id: 1)
Contact.create(name: "Judith R. Faulkner", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Judith-Faulkner-Attr-Epic-Systems.jpg", email: "Judith@epicsystems.com", job_title: "Founder", company: "Epic Systems", user_id: 1)
Contact.create(name: "Dara Khosrowshahi", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/02/Dara_Khosrowshahi_-attr-George-Grinsted.jpg", email: "Dara@uber.com", job_title: "CEO", company: "Uber", user_id: 1)
Contact.create(name: "Ivan Glasenburg", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Ivan_Glasenberg-Attr-By-Financial-Times-photos-co-Dianna-Bonner.jpg", email: "Ivan@glencore.com", job_title: "CEO", company: "Glencore", user_id: 1)
Contact.create(name: "Reed Hastings", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Reed_Hastings_Web_2.0_Conference-Attr-James-Duncan-Davidson.OReilly-Media-Inc..jpg", email: "Reed@netflix.com", job_title: "Co-Founder", company: "Netflix", user_id: 1)
Contact.create(name: "Masayoshi Son", image_url: "https://www.ceotodaymagazine.com/CEO-Today/wp-content/uploads/2018/03/Masayoshi-Son-763x1024.jpg", email: "Masayoshi@softbank.com", job_title: "Founder", company: "SoftBank Group", user_id: 1)

puts "Seeding deals..."

Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Presentation Scheduled", deal_type: "New Business", amount: 100000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Appointment Scheduled", deal_type: "Existing Business", amount: 120000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Qualified to Buy", deal_type: "Existing Business", amount: 130000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Presentation Scheduled", deal_type: "Existing Business", amount: 145000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Decision Maker Bought-In", deal_type: "Existing Business", amount: 135000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Contract Sent", deal_type: "Existing Business", amount: 125000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Closed Won", deal_type: "New Business", amount: 140000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Closed Lost", deal_type: "New Business", amount: 150000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Presentation Scheduled", deal_type: "New Business", amount: 100000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Appointment Scheduled", deal_type: "Existing Business", amount: 120000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Qualified to Buy", deal_type: "Existing Business", amount: 130000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Presentation Scheduled", deal_type: "Existing Business", amount: 145000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Decision Maker Bought-In", deal_type: "Existing Business", amount: 135000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Contract Sent", deal_type: "Existing Business", amount: 125000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Closed Won", deal_type: "New Business", amount: 140000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Closed Lost", deal_type: "New Business", amount: 150000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Presentation Scheduled", deal_type: "New Business", amount: 100000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Appointment Scheduled", deal_type: "Existing Business", amount: 120000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Qualified to Buy", deal_type: "Existing Business", amount: 130000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Presentation Scheduled", deal_type: "Existing Business", amount: 145000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Decision Maker Bought-In", deal_type: "Existing Business", amount: 135000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Contract Sent", deal_type: "Existing Business", amount: 125000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Closed Won", deal_type: "New Business", amount: 140000, user_id: 1, contact_id:rand(1..35))
Deal.create(deal_name:Faker::Movies::BackToTheFuture.quote, deal_stage: "Closed Lost", deal_type: "New Business", amount: 150000, user_id: 1, contact_id:rand(1..35))

puts "Seeding notes..."

Note.create(title:Faker::JapaneseMedia::OnePiece.quote, details:Faker::Lorem.paragraph, deal_id:rand(1..25))

