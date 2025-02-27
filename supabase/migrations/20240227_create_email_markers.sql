-- Create the email_markers table
create table if not exists email_markers (
    email_id text primary key references form_submissions(id),
    is_marked boolean not null default false,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable realtime for this table
alter publication supabase_realtime add table email_markers;

-- Add RLS policies
alter table email_markers enable row level security;

-- Allow anyone to read the markers
create policy "Allow anyone to read markers"
on email_markers for select
to anon
using (true);

-- Allow anyone to insert/update markers
create policy "Allow anyone to insert/update markers"
on email_markers for insert
to anon
with check (true);

create policy "Allow anyone to update markers"
on email_markers for update
to anon
using (true);
