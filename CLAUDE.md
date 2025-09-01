# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack CRM application built with Ruby on Rails (API backend) and React (frontend). The Rails API serves JSON data while React handles the UI, with authentication managed through Rails sessions.

## Technology Stack

- **Backend**: Ruby on Rails 7.0.3 (API-only), Ruby 2.7.4, PostgreSQL
- **Frontend**: React 18.2.0 with Create React App, Tailwind CSS 3.1.4
- **Authentication**: Rails sessions with `has_secure_password`
- **Deployment**: Heroku-ready with automated build process

## Development Commands

### Backend (Rails)
```bash
# Setup and database
bundle install                    # Install Ruby dependencies
rails db:setup                   # Create, migrate, and seed database
rails db:migrate                 # Run new migrations
rails db:seed                    # Seed with sample data (demo user: username="demo1", password="1234")

# Development
rails server                     # Start Rails API server (port 3000)
rails console                    # Access Rails console
```

### Frontend (React)
```bash
# From /client directory
npm install                      # Install dependencies  
npm start                        # Start dev server (port 4000, proxies to Rails on 3000)
npm run build                    # Build for production
npm test                         # Run tests

# From root directory (deployment)
npm run build                    # Build client and deploy to Rails public/
npm run heroku-postbuild         # Full Heroku deployment build
```

## Architecture

### Database Schema
- **Users**: Authentication (first_name, last_name, username, email, password_digest)
- **Contacts**: Customer data (name, image_url, email, job_title, company) - belongs to user
- **Deals**: Sales opportunities (deal_name, deal_stage, deal_type, amount) - belongs to user and contact
- **Notes**: Deal updates (title, details) - belongs to deal

### API Structure
Rails API controllers follow RESTful conventions:
- `UsersController`, `ContactsController`, `DealsController`, `NotesController`
- Authentication: `SessionsController` (POST /login, DELETE /logout, GET /me)
- All controllers use `authorize` before_action for session-based auth

### Frontend Structure
- React components in `/client/src/components/`
- Tailwind CSS for styling
- React Router for navigation
- Create React App configuration with proxy to Rails backend

### Authentication Flow
1. Rails handles session-based authentication with cookies
2. `before_action :authorize` protects all API endpoints
3. Frontend maintains login state and makes authenticated requests
4. Session data stored server-side, cookies sent with requests

## Development Workflow

### Making Database Changes
1. Generate migration: `rails generate migration CreateModelName`
2. Edit migration file in `db/migrate/`
3. Run: `rails db:migrate`
4. Update seed file if needed: `db/seeds.rb`

### Adding New Features
1. **Backend**: Create/modify controllers in `app/controllers/`, models in `app/models/`, serializers in `app/serializers/`
2. **Frontend**: Create React components in `client/src/components/`, update routing as needed
3. **Styling**: Use Tailwind utility classes, custom styles in `client/src/styles/`

### Deployment Process
The app auto-deploys to Heroku with:
1. `npm run heroku-postbuild` builds React app and copies to Rails `public/`
2. Rails serves the React app at root path via fallback route
3. Release command runs database migrations

## Key Patterns

### Rails API Controllers
- All inherit from `ApplicationController` with shared `authorize` method
- Use Active Model Serializers for consistent JSON responses
- Follow Rails conventions for parameter handling and error responses

### React Components
- Functional components with hooks
- State management through component state and props
- API calls typically made in useEffect hooks
- Error handling integrated into component logic

### Data Flow
1. React components make HTTP requests to Rails API endpoints
2. Rails controllers authenticate via session, query database, return JSON
3. React updates state and re-renders based on API responses
4. All database relationships properly serialized in API responses