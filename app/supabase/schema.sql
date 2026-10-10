-- ============================================================
-- INOMARK — Complete Supabase Database Schema & RLS Setup
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Base user table linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('creator', 'brand')),
  full_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. CREATOR PROFILES
create table if not exists public.creator_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique not null references public.profiles(id) on delete cascade,
  display_name text not null default '',
  headline text default '',
  bio text default '',
  avatar_url text,
  location text,
  specializations text[] default '{}',
  content_types text[] default '{}',
  ai_tools text[] default '{}',
  skills text[] default '{}',
  visual_styles text[] default '{}',
  industries text[] default '{}',
  content_formats text[] default '{}',
  languages text[] default '{}',
  availability text default 'Available for new briefs',
  portfolio_url text,
  website_url text,
  social_links jsonb default '{}'::jsonb,
  is_public boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. BRAND PROFILES
create table if not exists public.brand_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique not null references public.profiles(id) on delete cascade,
  company_name text not null default '',
  logo_url text,
  cover_url text,
  industry text not null default 'Beauty & Wellness',
  business_type text default 'Direct to Consumer (D2C)',
  tagline text,
  website text,
  location text,
  about text,
  creative_preferences text[] default '{}',
  brand_guidelines_url text,
  contact_email text,
  contact_visible boolean default true,
  is_public boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. PORTFOLIO PROJECTS
create table if not exists public.portfolio_projects (
  id uuid primary key default uuid_generate_v4(),
  creator_id uuid not null references public.creator_profiles(id) on delete cascade,
  title text not null,
  description text default '',
  cover_url text,
  media_urls text[] default '{}',
  content_type text default '3D & Generative Video',
  ai_tools text[] default '{}',
  skills text[] default '{}',
  industry text,
  external_url text,
  format text default '16:9 4K UHD',
  is_published boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. BRIEFS (Campaign Briefs created by Brands)
create table if not exists public.briefs (
  id uuid primary key default uuid_generate_v4(),
  brand_id uuid not null references public.brand_profiles(id) on delete cascade,
  title text not null,
  objective text default '',
  description text not null default '',
  industry text not null default 'Botanical Skincare',
  target_audience text,
  content_types text[] default '{}',
  deliverables jsonb default '[]'::jsonb,
  creative_direction text,
  key_message text,
  call_to_action text,
  brand_guidelines text,
  required_elements text,
  elements_to_avoid text,
  target_platforms text[] default '{}',
  aspect_ratio text default '9:16 Vertical & 16:9 Landscape',
  technical_specs jsonb default '{}'::jsonb,
  desired_style text default 'Nordic Minimalist, Atmospheric Macro, Clean Scientific Elegance',
  preferred_tools text[] default '{}',
  start_date timestamptz,
  deadline timestamptz,
  milestones jsonb default '[]'::jsonb,
  budget_type text default 'range' check (budget_type in ('fixed', 'range', 'open', 'discuss')),
  budget_min numeric default 3500,
  budget_max numeric default 7500,
  currency text default 'USD',
  status text not null default 'active' check (status in ('draft', 'active', 'in_progress', 'completed', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. BRIEF APPLICATIONS
create table if not exists public.brief_applications (
  id uuid primary key default uuid_generate_v4(),
  brief_id uuid not null references public.briefs(id) on delete cascade,
  creator_id uuid not null references public.creator_profiles(id) on delete cascade,
  pitch text not null,
  portfolio_sample_ids text[] default '{}',
  proposed_rate numeric,
  estimated_delivery_days integer default 14,
  status text not null default 'submitted' check (status in ('submitted', 'under_review', 'shortlisted', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brief_id, creator_id)
);

-- 7. SAVED CREATORS (Brand bookmarks creator)
create table if not exists public.saved_creators (
  id uuid primary key default uuid_generate_v4(),
  brand_id uuid not null references public.brand_profiles(id) on delete cascade,
  creator_id uuid not null references public.creator_profiles(id) on delete cascade,
  notes text default '',
  created_at timestamptz not null default now(),
  unique (brand_id, creator_id)
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

alter table public.profiles enable row level security;
alter table public.creator_profiles enable row level security;
alter table public.brand_profiles enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.briefs enable row level security;
alter table public.brief_applications enable row level security;
alter table public.saved_creators enable row level security;

-- Profiles: Anyone can read, users can update their own
create policy "Allow read public profiles" on public.profiles
  for select using (true);
create policy "Allow users update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Allow insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Creator Profiles: Public can read public creators, creators can update own
create policy "Allow read public creator profiles" on public.creator_profiles
  for select using (is_public = true or auth.uid() = user_id);
create policy "Allow creators update own profile" on public.creator_profiles
  for update using (auth.uid() = user_id);
create policy "Allow creators insert own profile" on public.creator_profiles
  for insert with check (auth.uid() = user_id);

-- Brand Profiles: Public can read public brands, brands can update own
create policy "Allow read public brand profiles" on public.brand_profiles
  for select using (is_public = true or auth.uid() = user_id);
create policy "Allow brands update own profile" on public.brand_profiles
  for update using (auth.uid() = user_id);
create policy "Allow brands insert own profile" on public.brand_profiles
  for insert with check (auth.uid() = user_id);

-- Portfolio: Anyone can read published portfolios, creator can CRUD own
create policy "Allow read published portfolio projects" on public.portfolio_projects
  for select using (is_published = true or exists (
    select 1 from public.creator_profiles cp where cp.id = creator_id and cp.user_id = auth.uid()
  ));
create policy "Allow creators manage own portfolio" on public.portfolio_projects
  for all using (exists (
    select 1 from public.creator_profiles cp where cp.id = creator_id and cp.user_id = auth.uid()
  ));

-- Briefs: Anyone can view active briefs, brands can manage their own
create policy "Allow read active briefs" on public.briefs
  for select using (status = 'active' or exists (
    select 1 from public.brand_profiles bp where bp.id = brand_id and bp.user_id = auth.uid()
  ));
create policy "Allow brands manage own briefs" on public.briefs
  for all using (exists (
    select 1 from public.brand_profiles bp where bp.id = brand_id and bp.user_id = auth.uid()
  ));

-- Applications: Creators can see and create their own applications; Brands can view applications to their briefs
create policy "Allow creator manage applications" on public.brief_applications
  for all using (exists (
    select 1 from public.creator_profiles cp where cp.id = creator_id and cp.user_id = auth.uid()
  ));
create policy "Allow brand read and review applications" on public.brief_applications
  for select using (exists (
    select 1 from public.briefs b
    join public.brand_profiles bp on bp.id = b.brand_id
    where b.id = brief_id and bp.user_id = auth.uid()
  ));
create policy "Allow brand update application status" on public.brief_applications
  for update using (exists (
    select 1 from public.briefs b
    join public.brand_profiles bp on bp.id = b.brand_id
    where b.id = brief_id and bp.user_id = auth.uid()
  ));

-- Saved Creators: Brands can manage their own bookmarks
create policy "Allow brand manage saved creators" on public.saved_creators
  for all using (exists (
    select 1 from public.brand_profiles bp where bp.id = brand_id and bp.user_id = auth.uid()
  ));

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
insert into storage.buckets (id, name, public)
values 
  ('avatars', 'avatars', true),
  ('portfolios', 'portfolios', true),
  ('brief-assets', 'brief-assets', true)
on conflict (id) do nothing;

create policy "Public Access to Avatars" on storage.objects
  for select using (bucket_id = 'avatars');
create policy "Authenticated upload to Avatars" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

create policy "Public Access to Portfolios" on storage.objects
  for select using (bucket_id = 'portfolios');
create policy "Authenticated upload to Portfolios" on storage.objects
  for insert with check (bucket_id = 'portfolios' and auth.role() = 'authenticated');

create policy "Public Access to Brief Assets" on storage.objects
  for select using (bucket_id = 'brief-assets');
create policy "Authenticated upload to Brief Assets" on storage.objects
  for insert with check (bucket_id = 'brief-assets' and auth.role() = 'authenticated');
