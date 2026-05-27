# LIABL.ai — Investor Prototype

 Adaptive liability waivers built with Next.js 14 + Supabase.

## Setup

### 1. Install dependencies
```
npm install
```

### 2. Set up Supabase
1. Create a project at supabase.com
2. Open SQL Editor and paste + run: supabase/migrations/001_initial_schema.sql
3. Copy your Project URL and anon key from Settings → API

### 3. Environment variables
Create a file called `.env.local` in the root folder:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run locally
```
npm run dev
```
Open http://localhost:3000

### 5. Deploy to Vercel
- Push to GitHub
- Import repo in Vercel
- Add the two environment variables above in Vercel project settings
- Deploy

## Routes
- `/` — Home
- `/participant` — Waiver signing flow
- `/operator` — Check-in dashboard
