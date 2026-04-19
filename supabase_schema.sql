-- Jalankan query ini di Supabase SQL Editor
-- https://app.supabase.com → project kamu → SQL Editor

create table achievements (
  id bigint generated always as identity primary key,
  year text not null,
  title text not null,
  description text,
  link text,
  created_at timestamp with time zone default now()
);

create table projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  tags text,
  link text,
  created_at timestamp with time zone default now()
);

create table skills (
  id bigint generated always as identity primary key,
  name text not null,
  category text default 'General',
  created_at timestamp with time zone default now()
);

create table experiences (
  id bigint generated always as identity primary key,
  period text,
  role text not null,
  company text,
  location text,
  description text,
  created_at timestamp with time zone default now()
);

create table site_info (
  id bigint generated always as identity primary key,
  site_name text default 'DEV.PORTO',
  role text default 'Software Developer — Indonesia',
  bio text default 'Saya seorang developer yang fokus pada pengembangan aplikasi yang bersih dan efisien.',
  email text default 'hello@namamu.dev',
  github text default 'github.com/namamu',
  linkedin text default 'linkedin.com/in/namamu'
);

-- Insert data awal untuk site_info
insert into site_info (site_name, role, bio, email, github, linkedin)
values (
  'DEV.PORTO',
  'Software Developer — Indonesia',
  'Saya seorang developer yang fokus pada pengembangan aplikasi yang bersih, efisien, dan berpusat pada pengguna.',
  'hello@namamu.dev',
  'github.com/namamu',
  'linkedin.com/in/namamu'
);

-- Insert contoh data pencapaian
insert into achievements (year, title, description, link) values
  ('2024', 'Lulus S1 Teknik Informatika', 'Lulus dengan predikat cumlaude dari universitas negeri.', 'https://example.com/ijazah'),
  ('2023', 'Menyelesaikan 10 proyek freelance', 'Berbagai proyek web & mobile untuk klien lokal dan internasional.', 'https://example.com/portofolio-freelance');

-- Insert contoh proyek
insert into projects (title, description, tags, link) values
  ('Expense Tracker App', 'Aplikasi manajemen keuangan pribadi dengan visualisasi data real-time.', 'React, Node.js, MongoDB', 'https://github.com/namamu/expense-tracker'),
  ('REST API Service', 'Layanan backend scalable untuk platform e-commerce dengan 10k+ pengguna.', 'Express, PostgreSQL, Docker', 'https://rest-api-service-demo.vercel.app');

-- Insert contoh skills
insert into skills (name, category) values
  ('JavaScript', 'Frontend'),
  ('React / Next.js', 'Frontend'),
  ('Node.js', 'Backend'),
  ('Python', 'Backend'),
  ('PostgreSQL', 'Database'),
  ('Docker / DevOps', 'DevOps');

-- Insert contoh experience
insert into experiences (period, role, company, location, description) values
  ('2024 - Sekarang', 'Frontend Developer', 'Freelance', 'Remote', 'Membangun website bisnis dan dashboard internal dengan fokus pada performa, aksesibilitas, dan maintainability.'),
  ('2022 - 2024', 'Web Developer', 'Digital Studio', 'Bandung', 'Mengembangkan aplikasi web end-to-end bersama tim lintas fungsi dari tahap discovery sampai deployment.'),
  ('2021 - 2022', 'Junior Developer', 'Startup Product Team', 'Jakarta', 'Menangani implementasi UI, integrasi API, dan perbaikan bug pada produk yang digunakan harian oleh pengguna aktif.');

-- Aktifkan Row Level Security (RLS)
alter table achievements enable row level security;
alter table projects enable row level security;
alter table skills enable row level security;
alter table experiences enable row level security;
alter table site_info enable row level security;

-- Policy: semua orang bisa baca (public)
create policy "Public read achievements" on achievements for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read experiences" on experiences for select using (true);
create policy "Public read site_info" on site_info for select using (true);

-- Policy: hanya service_role (admin) yang bisa insert/update/delete
-- Ini dihandle lewat SUPABASE_SERVICE_KEY di env, bukan anon key
create policy "Admin insert achievements" on achievements for insert with check (true);
create policy "Admin update achievements" on achievements for update using (true);
create policy "Admin delete achievements" on achievements for delete using (true);

create policy "Admin insert projects" on projects for insert with check (true);
create policy "Admin update projects" on projects for update using (true);
create policy "Admin delete projects" on projects for delete using (true);

create policy "Admin insert skills" on skills for insert with check (true);
create policy "Admin update skills" on skills for update using (true);
create policy "Admin delete skills" on skills for delete using (true);

create policy "Admin insert experiences" on experiences for insert with check (true);
create policy "Admin update experiences" on experiences for update using (true);
create policy "Admin delete experiences" on experiences for delete using (true);

create policy "Admin update site_info" on site_info for update using (true);
