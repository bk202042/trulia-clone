-- Add office property support to rental listings

-- Add office-specific columns
alter table rental_listings add column property_category text default 'residential';
alter table rental_listings add column office_type text;
alter table rental_listings add column desk_capacity integer;
alter table rental_listings add column meeting_rooms integer;
alter table rental_listings add column has_reception boolean default false;
alter table rental_listings add column internet_speed text;
alter table rental_listings add column office_amenities varchar[];
alter table rental_listings add column available_hours text;

-- Add constraint for property categories
alter table rental_listings add constraint property_category_check
  check (property_category in ('residential', 'office'));

-- Create indexes for performance
create index rental_listings_property_category_idx on rental_listings (property_category);
create index rental_listings_office_type_idx on rental_listings (office_type);
create index rental_listings_desk_capacity_idx on rental_listings (desk_capacity);

-- Add RLS policies for office properties
create policy "Office listings are viewable by everyone"
on rental_listings
for select
to anon, authenticated
using (property_category = 'office');

create policy "Authenticated users can create office listings"
on rental_listings
for insert
to authenticated
with check (property_category = 'office');

create policy "Users can update their own office listings"
on rental_listings
for update
to authenticated
using (auth.uid() = user_id and property_category = 'office')
with check (property_category = 'office');

create policy "Users can delete their own office listings"
on rental_listings
for delete
to authenticated
using (auth.uid() = user_id and property_category = 'office');
