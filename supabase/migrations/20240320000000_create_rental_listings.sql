-- Drop existing tables if they exist
drop table if exists user_favorites;
drop table if exists rental_listings;

-- Create rental_listings table
create table rental_listings (
  id uuid primary key default gen_random_uuid(),
  property_type text not null,
  street_address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  neighborhood text,
  monthly_rent numeric not null,
  security_deposit numeric not null,
  utilities varchar[],
  utilities_cost numeric default 0,
  bedrooms numeric not null,
  bathrooms numeric not null,
  square_feet numeric not null,
  parking boolean default false,
  parking_fee numeric default 0,
  pet_friendly boolean default false,
  pet_deposit numeric default 0,
  amenities varchar[],
  minimum_lease integer default 12,
  available_date date not null,
  application_fee numeric default 0,
  property_management text,
  contact_phone text,
  contact_email text,
  latitude numeric,
  longitude numeric,
  nearby_transportation varchar[],
  created_at timestamp with time zone default now() not null,
  user_id uuid references auth.users(id) on delete set null
);
comment on table rental_listings is 'Property rental listings for the Trulia clone application';

-- Create indexes for common rental listing queries
create index rental_listings_city_idx on rental_listings (city);
create index rental_listings_state_idx on rental_listings (state);
create index rental_listings_zip_code_idx on rental_listings (zip_code);
create index rental_listings_bedrooms_idx on rental_listings (bedrooms);
create index rental_listings_monthly_rent_idx on rental_listings (monthly_rent);
create index rental_listings_available_date_idx on rental_listings (available_date);
create index rental_listings_user_id_idx on rental_listings (user_id);

-- Create user_favorites table for saved listings
create table user_favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  listing_id uuid not null references rental_listings(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  unique (user_id, listing_id)
);
comment on table user_favorites is 'User saved/favorite rental listings';

-- Create index for user_favorites
create index user_favorites_user_id_idx on user_favorites (user_id);
create index user_favorites_listing_id_idx on user_favorites (listing_id);

-- Enable Row Level Security (RLS)
alter table rental_listings enable row level security;
alter table user_favorites enable row level security;

-- Rental listings policies
-- Public can view all rental listings
create policy "Rental listings are viewable by everyone"
on rental_listings
for select
to anon, authenticated
using (true);

-- Only authenticated users can insert rental listings
create policy "Authenticated users can create rental listings"
on rental_listings
for insert
to authenticated
with check (true);

-- Users can only update their own rental listings
create policy "Users can update their own rental listings"
on rental_listings
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Users can only delete their own rental listings
create policy "Users can delete their own rental listings"
on rental_listings
for delete
to authenticated
using (auth.uid() = user_id);

-- User favorites policies
-- Users can view only their own favorites
create policy "Users can view their own favorites"
on user_favorites
for select
to authenticated
using (auth.uid() = user_id);

-- Users can add their own favorites
create policy "Users can add their own favorites"
on user_favorites
for insert
to authenticated
with check (auth.uid() = user_id);

-- Users can delete their own favorites
create policy "Users can delete their own favorites"
on user_favorites
for delete
to authenticated
using (auth.uid() = user_id);
