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

puts "Seeding companies..."
Company.create(company_name: "Google", owner_name: "Larry Page", description: "Technology Company", annual_rev: 256700000000, user_id: "1" )
Company.create(company_name: "Buzzfeed", owner_name: "Jonah Peretti", description: "Digital Media Company", annual_rev: 398000000, user_id: "2")

puts "Seeding contacts..."

Contact.create(name: "Bob Murray", email: "test@mail.com", lifecycle_stage: "Lead", job_title: "SDR", user_id: 1, company_id: 1)
Contact.create(name: "Charlie Copper", email: "test@mail.com", lifecycle_stage: "Lead", job_title: "SDR", user_id: 2, company_id: 2)

puts "Seeding deals..."

Deal.create(deal_name: "1 year dev retainer", deal_stage: "Contract Sent", amount: 100000, user_id: 1, contact_id: 1)
Deal.create(deal_name: "Buzzfeed Website Rebuild", deal_stage: "Proposal Accepted", amount: 120000, user_id: 2, contact_id: 2)

