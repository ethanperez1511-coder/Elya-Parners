-- Run this in your Supabase SQL Editor to set up the database.

-- ============ INQUIRIES (contact form) ============
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  message text,
  created_at timestamptz default now()
);

-- ============ APPLICATIONS (loan application) ============
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  ref_id text unique not null,           -- e.g. ELYA-839201
  status text default 'received',        -- received | reviewing | approved | declined

  -- 01 Business Information
  legal_name text not null,
  dba text,
  ein text not null,
  entity_type text not null,
  capital_amount text not null,
  nature_of_business text not null,
  product_service text,
  ownership_length text,
  incorp_date date,
  biz_street text not null,
  biz_city text not null,
  biz_state text not null,
  biz_zip text not null,
  use_of_funds text not null,
  credit_cards text,                     -- yes | no
  mca_positions text,                   -- yes | no

  -- 02 Owner Information
  owner_name text not null,
  ssn text not null,                     -- stored encrypted in production
  dob date not null,
  credit_score text not null,
  home_street text not null,
  home_city text not null,
  home_state text not null,
  home_zip text not null,

  -- 03 Bank Statements (file paths in storage)
  bank_statement_paths text[] default '{}',

  -- 04 Terms
  agreed_to_terms boolean default false,
  signature_path text,                   -- path to signature image in storage
  sign_date date not null,

  created_at timestamptz default now()
);

-- ============ ROW LEVEL SECURITY ============
-- Only service role can insert/read (no public access)
alter table inquiries enable row level security;
alter table applications enable row level security;

-- No RLS policies = only service role key can access.
-- Add policies later if you need client-side auth access.

-- ============ STORAGE BUCKETS ============
-- Run these separately or via the Supabase dashboard:
--
-- 1. Create bucket "bank-statements" (private, 10MB max)
-- 2. Create bucket "signatures" (private, 1MB max)
--
-- In SQL:
-- insert into storage.buckets (id, name, public) values ('bank-statements', 'bank-statements', false);
-- insert into storage.buckets (id, name, public) values ('signatures', 'signatures', false);
