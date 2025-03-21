-- Create a dedicated office_listings table

-- Drop table if it exists
drop table if exists office_listings;

-- Create office_listings table
create table office_listings (
  id uuid primary key default gen_random_uuid(),
  property_type text not null,
  office_type text not null,
  street_address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  neighborhood text,
  monthly_rent numeric not null,
  security_deposit numeric not null,
  utilities text default '{}',
  utilities_cost numeric default 0,
  square_feet numeric not null,
  desk_capacity integer not null,
  meeting_rooms integer default 0,
  has_reception boolean default false,
  internet_speed text,
  parking boolean default false,
  parking_fee numeric default 0,
  amenities text default '{}',
  office_amenities text default '{}',
  minimum_lease integer default 12,
  available_date date not null,
  available_hours text,
  application_fee numeric default 0,
  property_management text,
  contact_phone text,
  contact_email text,
  latitude numeric,
  longitude numeric,
  nearby_transportation text default '{}',
  created_at timestamp with time zone default now() not null,
  user_id uuid references auth.users(id) on delete set null
);
comment on table office_listings is 'Office property listings for the Trulia clone application';

-- Create indexes for common office listing queries
create index office_listings_city_idx on office_listings (city);
create index office_listings_state_idx on office_listings (state);
create index office_listings_zip_code_idx on office_listings (zip_code);
create index office_listings_desk_capacity_idx on office_listings (desk_capacity);
create index office_listings_monthly_rent_idx on office_listings (monthly_rent);
create index office_listings_available_date_idx on office_listings (available_date);
create index office_listings_office_type_idx on office_listings (office_type);
create index office_listings_user_id_idx on office_listings (user_id);

-- Enable Row Level Security (RLS)
alter table office_listings enable row level security;

-- Office listings policies
-- Public can view all office listings
create policy "Office listings are viewable by everyone"
on office_listings
for select
to anon, authenticated
using (true);

-- Only authenticated users can insert office listings
create policy "Authenticated users can create office listings"
on office_listings
for insert
to authenticated
with check (true);

-- Users can only update their own office listings
create policy "Users can update their own office listings"
on office_listings
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Users can only delete their own office listings
create policy "Users can delete their own office listings"
on office_listings
for delete
to authenticated
using (auth.uid() = user_id);
