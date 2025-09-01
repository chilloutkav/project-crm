# Project CRM

A full-stack Customer Relationship Management (CRM) application built with Ruby on Rails (API backend) and React (frontend).

## Features

- **User Authentication** - Session-based login/logout
- **Contact Management** - Create, view, edit, and delete customer contacts
- **Deal Pipeline** - Track sales opportunities through various stages
- **Note Taking** - Add notes and updates to deals
- **Responsive UI** - Built with Tailwind CSS

## Tech Stack

- **Backend**: Ruby on Rails 7.0.3 (API-only), PostgreSQL
- **Frontend**: React 18.2.0, Tailwind CSS 3.1.4
- **Authentication**: Rails sessions with bcrypt

## Prerequisites

- Ruby 2.7.4 (use rbenv, rvm, or asdf for version management)
- Node.js (for React frontend)
- PostgreSQL 14+

## Getting Started

### 1. Install Ruby Version Manager (if needed)

```bash
# Using rbenv (recommended)
brew install rbenv ruby-build
rbenv install 2.7.4
rbenv local 2.7.4
```

### 2. Install Dependencies

**Backend:**
```bash
bundle install
```

**Frontend:**
```bash
cd client
npm install
cd ..
```

### 3. Start PostgreSQL

```bash
brew services start postgresql@14
```

### 4. Database Setup

```bash
rails db:create          # Create databases
rails db:migrate         # Run migrations
rails db:seed            # Seed with sample data
```

### 5. Start the Servers

**Terminal 1 - Rails API:**
```bash
rails server             # Starts on http://localhost:3000
```

**Terminal 2 - React Frontend:**
```bash
cd client
npm start                # Starts on http://localhost:4000
```

## Demo Login

The seed data includes a demo account:

- **Username**: `demo1`
- **Password**: `1234`

## API Endpoints

- `POST /login` - User authentication
- `GET /me` - Current user profile
- `DELETE /logout` - User logout
- `GET|POST|PUT|DELETE /contacts` - Contact management
- `GET|POST|PUT|DELETE /deals` - Deal management
- `GET|POST|PUT|DELETE /notes` - Note management

## Database Schema

- **Users** - Authentication and user management
- **Contacts** - Customer/prospect information
- **Deals** - Sales opportunities
- **Notes** - Deal-related notes and updates

## Deployment

The application is Heroku-ready with automated build process that compiles React and serves from Rails public directory.

## Troubleshooting

If you encounter PostgreSQL timezone errors, ensure your `config/database.yml` includes:

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  variables:
    timezone: 'America/New_York'  # Match your PostgreSQL timezone
```

Check your PostgreSQL timezone with:
```bash
psql postgres -c "SHOW timezone;"
```
