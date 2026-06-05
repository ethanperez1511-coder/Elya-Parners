# Supabase Setup

## 1. Create Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project.

## 2. Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your Supabase credentials (found in Project Settings → API):
- `PUBLIC_SUPABASE_URL` — your project URL
- `PUBLIC_SUPABASE_ANON_KEY` — the `anon` public key
- `SUPABASE_SERVICE_ROLE_KEY` — the `service_role` secret key (never expose client-side)

## 3. Run Database Migration

Open the SQL Editor in your Supabase dashboard and paste the contents of `supabase/migration.sql`. Run it.

This creates:
- `inquiries` table (contact form submissions)
- `applications` table (loan applications with all fields)
- Row Level Security enabled (service role only)

## 4. Create Storage Buckets

In the Supabase dashboard → Storage:

1. Create bucket **`bank-statements`** — set to **Private**, max file size **10MB**
2. Create bucket **`signatures`** — set to **Private**, max file size **1MB**

Or run in SQL Editor:
```sql
insert into storage.buckets (id, name, public) values ('bank-statements', 'bank-statements', false);
insert into storage.buckets (id, name, public) values ('signatures', 'signatures', false);
```

## 5. Run Dev Server

```bash
npm run dev
```

## 6. Production Deployment

The site uses the `@astrojs/node` adapter. Deploy to any Node.js host (Vercel, Railway, Fly.io, etc).

Pages are pre-rendered (static). Only `/api/inquiry` and `/api/application` run server-side.

## Still TODO

- **Email notifications** — add a service (Resend, SendGrid, etc.) and wire into the `// TODO` hooks in the API routes
- **Photos** — replace `public/images/hero-skyline.jpg` and `partners-handshake.jpg` with licensed/owned images
- **Legal** — have counsel review the authorization/consent text in the application Terms section
- **SSN encryption** — the SSN field is stored as plain text; add encryption at rest for production
