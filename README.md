# Project CRM

A modern, full-stack Customer Relationship Management (CRM) application built with **Supabase** (backend) and **React** (frontend), deployed on **Netlify**.

## ✨ Features

- **🔐 User Authentication** - Secure JWT-based authentication with Supabase Auth
- **👥 Contact Management** - Full CRUD operations with modern edit modals for customer contacts
- **💼 Deal Pipeline** - Track and edit sales opportunities through various stages
- **📝 Note Management** - Create, edit, and organize notes with intuitive modal interfaces
- **📊 Analytics Dashboard** - View sales metrics and pipeline performance
- **🎨 Modern UI Design** - 100% Tailwind CSS with consistent blue/green/purple theme system
- **⚡ Real-time Updates** - Live data synchronization with Supabase
- **📱 Mobile Responsive** - Optimized experience across all devices

## 🚀 Tech Stack

- **Frontend**: React 18.2.0, Tailwind CSS 3.1.4, React Router
- **Backend**: Supabase (PostgreSQL database + Auth + API)
- **Authentication**: Supabase Auth with JWT tokens
- **Deployment**: Netlify (frontend) + Supabase (backend)
- **Styling**: Tailwind CSS with modern design system

## 🏗️ Architecture

- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **API**: Auto-generated REST API from Supabase
- **Real-time**: WebSocket connections for live updates
- **State Management**: React Context + Supabase client
- **Security**: JWT tokens + automatic data isolation per user

## 📋 Prerequisites

- **Node.js 16+** (for React development)
- **Supabase Account** (free tier available)
- **Netlify Account** (free tier available)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project-crm
```

### 2. Install Dependencies

```bash
cd client
npm install
```

### 3. Environment Setup

Create `.env.local` in the `/client` directory:

```bash
# Supabase Configuration
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server

```bash
npm start                # Starts on http://localhost:4000
```

## 🗄️ Database Setup

### Option 1: Use Supabase Dashboard
1. Create a new project at [supabase.com](https://supabase.com)
2. Use the SQL Editor to run the schema from `/supabase/schema.sql`
3. Set up Row Level Security policies from `/supabase/rls_policies.sql`

### Option 2: Supabase CLI (Advanced)
```bash
npx supabase init
npx supabase link --project-ref your-project-id
npx supabase db push
```

## 🌱 Demo Data

### Quick Setup (Browser Console)
1. Log into the application
2. Open browser developer tools (F12)
3. Go to Console tab
4. Copy and paste the contents of `/client/src/scripts/browser-seed.js`
5. Press Enter to populate with demo data

### What Gets Created:
- **15 High-Profile Contacts** (Tech CEOs, founders)
- **15 Business Deals** ($85k-$200k range across all pipeline stages)
- **30+ Contextual Notes** (realistic deal progression updates)

## 🔧 Core Functionality

### **Complete CRUD Operations**
- **Contacts**: Create → View → **Edit** → Delete (with modern modal interfaces)
- **Deals**: Create → View → Edit → Delete (with stage and amount editing)
- **Notes**: Create → View → **Edit** → Delete (with title and details editing)

### **New Edit Features**
- **📝 Edit Contact Modal** - Update name, email, job title, and company with blue-themed interface
- **📝 Edit Note Modal** - Modify note titles and details with purple-themed interface
- **🎨 Consistent Design** - All edit modals follow the same modern Tailwind CSS design patterns
- **⚡ Real-time Updates** - Changes reflect immediately without page refresh

## 🔑 Demo Credentials

Try the application with these demo credentials:

- **Email**: `demo1@example.com`
- **Password**: `1234`

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Base directory: `client`
3. **Environment Variables**: Add your Supabase credentials
4. **Deploy**: Automatic deployment on git push

### Environment Variables for Production

```bash
REACT_APP_SUPABASE_URL=your_production_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_production_anon_key
```

## 📊 Database Schema

- **Users** - Managed by Supabase Auth (UUID primary keys)
- **Contacts** - Customer/prospect information (name, email, company, job_title)
- **Deals** - Sales opportunities (deal_name, stage, amount, contact relationship)
- **Notes** - Deal updates and progress tracking (title, details, timestamps)

## 🔧 Development

### Key Files Structure
```
client/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React context providers
│   ├── scripts/        # Seed data scripts
│   └── supabaseClient.js # Database connection
└── public/
```

### Available Scripts

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from Create React App (one-way)
```

### Design System

- **Blue Theme** - Contacts functionality
- **Green Theme** - Deals functionality
- **Purple Theme** - Notes functionality
- **Modern Components** - Cards, modals, forms with consistent styling

## 🔒 Security Features

- **Row Level Security** - Automatic data isolation per user
- **JWT Authentication** - Secure token-based auth
- **Environment Variables** - Secure credential management
- **HTTPS Only** - Secure data transmission

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**: Check Supabase URL and anon key
2. **Build Failures**: Ensure Node.js 16+ is installed
3. **Data Not Loading**: Verify RLS policies are set correctly

### Getting Help

- Check browser console for error messages
- Verify Supabase project configuration
- Ensure environment variables are set correctly

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with code splitting
- **Real-time**: Efficient WebSocket connections
- **Caching**: Static asset optimization via Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**🎉 Built with Modern Technologies**: Supabase + React + Netlify for a scalable, production-ready CRM solution.
