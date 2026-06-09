-- Run this entire file in Supabase SQL Editor

create table if not exists operators (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text unique not null,
  created_at timestamptz default now()
);

create table if not exists sessions (
  id           uuid primary key default gen_random_uuid(),
  operator_id  uuid references operators(id) on delete cascade,
  label        text not null,
  activity_key text,
  scheduled_at timestamptz,
  created_at   timestamptz default now()
);

create table if not exists participants (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  full_name  text not null,
  dob        date,
  created_at timestamptz default now()
);

create table if not exists waivers (
  id             uuid primary key default gen_random_uuid(),
  session_id     uuid references sessions(id) on delete cascade,
  participant_id uuid references participants(id) on delete cascade,
  operator_id    uuid,
  activity_key   text not null,
  answers        jsonb not null default '{}',
  clauses        jsonb not null default '[]',
  signed_at      timestamptz,
  signature_data text,
  ip_address     text,
  is_minor       boolean default false,
  guardian_name  text,
  created_at     timestamptz default now()
);

-- Row Level Security
alter table operators    enable row level security;
alter table sessions     enable row level security;
alter table participants enable row level security;
alter table waivers      enable row level security;

create policy "public read operators"    on operators    for select using (true);
create policy "public read sessions"     on sessions     for select using (true);
create policy "public read participants" on participants for select using (true);
create policy "public read waivers"      on waivers      for select using (true);
create policy "public insert participants" on participants for insert with check (true);
create policy "public insert waivers"      on waivers      for insert with check (true);

-- Seed demo operator and session
insert into operators (name, slug) values ('Desert Ridge Adventures', 'desert-ridge')
on conflict (slug) do nothing;

insert into sessions (operator_id, label, activity_key, scheduled_at)
select id, 'AM-04 · Morning Group', 'kayak', now() + interval '1 hour'
from operators where slug = 'desert-ridge'
on conflict do nothing;
