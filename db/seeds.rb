# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding users..."

User.create(first_name: "test", last_name: "test", username: "test1", email: "test@mail.com", password: "1234", password_confirmation: "1234")
User.create(first_name: "test", last_name: "test", username: "test2", email: "test@mail.com", password: "1234", password_confirmation: "1234")


puts "Seeding contacts..."

Contact.create(name: "Bob Murray", email: "test@mail.com", lifecycle_stage: "Lead", job_title: "SDR", company: "Meta", user_id: 1 )
Contact.create(name: "Charlie Copper", email: "test@mail.com", lifecycle_stage: "Marketing Qualified Lead", job_title: "SDR", company: "Google", user_id: 1)
Contact.create(name: "Tim Cook", email: "test@mail.com", lifecycle_stage: "Subscriber", job_title: "CEO", company: "Apple", user_id: 1)
Contact.create(name: "Jeff Bezos", email: "test@mail.com", lifecycle_stage: "Lead", job_title: "CEO", company: "Amazon", user_id: 1)
Contact.create(name: "Elon Musk", email: "test@mail.com", lifecycle_stage: "Evangelist", job_title: "CEO", company: "Tesla", user_id: 1)

puts "Seeding deals..."

Deal.create(deal_name: "Dev Retainer - 1 Year", deal_stage: "Presentation Scheduled", deal_type: "New Business", amount: 100000, user_id: 1, contact_id: 1)
Deal.create(deal_name: "Blog Rebuild", deal_stage: "Appointment Scheduled", deal_type: "Existing Business", amount: "120000", user_id: 1, contact_id: 2)
Deal.create(deal_name: "Ecommerce Shop Rebuild", deal_stage: "Closed Won", deal_type: "New Business", amount: "120000", user_id: 1, contact_id: 3)
Deal.create(deal_name: "Promotional Landing Page", deal_stage: "Closed Lost", deal_type: "New Business", amount: "120000", user_id: 1, contact_id: 4)

puts "Seeding notes..."

Note.create(title: "Presented Proposal", details: "Proposal went well. We're waiting for a follow-up so we can schedule an appoint with their decision maker", deal_id: 1)
Note.create(title: "Decision Maker Conversation", details: "We need to make a few changes and remove some things they're not looking for. Looking to send an amended proposal.", deal_id: 1)
Note.create(title: "Ecommerce Rebuild", details: "Client decided to go a different direction", deal_id: 1)

