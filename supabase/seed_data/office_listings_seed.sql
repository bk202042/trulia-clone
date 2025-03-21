-- 5 dummy office property listings for testing
INSERT INTO rental_listings (
  property_type, property_category, street_address, city, state, zip_code, neighborhood,
  monthly_rent, security_deposit, utilities, utilities_cost,
  square_feet, parking, parking_fee,
  amenities, minimum_lease, available_date,
  application_fee, property_management, contact_phone, contact_email,
  latitude, longitude, nearby_transportation,
  office_type, desk_capacity, meeting_rooms, has_reception,
  internet_speed, office_amenities, available_hours
) VALUES
-- Listing 1: Premium Downtown Private Office
(
  'Office', 'office', '100 Market Street', 'San Francisco', 'CA', '94105', 'Financial District',
  5000, 10000, '{Internet,Utilities}', 0,
  1500, true, 300,
  '{Security,Elevator,AC}', 12, '2025-04-01',
  100, 'WeSpace Properties', '415-555-9000', 'office@wespace.com',
  37.7937, -122.3965, '{BART,Muni,Ferry}',
  'Private Office', 8, 2, true,
  '1 Gbps fiber', '{Conference Room,Kitchen,Reception Area,Mail Service}', '24/7'
),

-- Listing 2: Co-working Space in SOMA
(
  'Office', 'office', '350 Brannan St', 'San Francisco', 'CA', '94107', 'SOMA',
  3000, 6000, '{Internet,Utilities,Cleaning}', 0,
  800, true, 200,
  '{Security,Elevator}', 6, '2025-03-25',
  75, 'Startup Hub', '415-555-8888', 'info@startuphub.com',
  37.7790, -122.3942, '{BART,Muni}',
  'Co-working', 20, 3, true,
  '1 Gbps fiber', '{Hot Desks,Phone Booths,Coffee Bar,Printing}', '7am-11pm daily'
),

-- Listing 3: Entire Floor Office in Oakland
(
  'Office', 'office', '1721 Broadway', 'Oakland', 'CA', '94612', 'Downtown Oakland',
  12000, 24000, '{Internet}', 500,
  4500, true, 0,
  '{Security,Elevator,AC}', 36, '2025-05-15',
  200, 'Metro Commercial', '510-555-7777', 'leasing@metrocommercial.com',
  37.8080, -122.2702, '{BART,AC Transit}',
  'Entire Floor', 50, 5, false,
  '2 Gbps fiber', '{Conference Rooms,Kitchen,Break Room,Server Room,Storage}', '24/7'
),

-- Listing 4: Modern Executive Suite
(
  'Office', 'office', '555 California St', 'San Francisco', 'CA', '94104', 'Financial District',
  7500, 15000, '{Internet,Utilities,Janitorial}', 0,
  2000, true, 350,
  '{Security,Elevator,AC}', 24, '2025-04-10',
  150, 'Executive Office Solutions', '415-555-6666', 'exec@officesolutions.com',
  37.7927, -122.4036, '{BART,Muni}',
  'Executive Suite', 12, 3, true,
  '10 Gbps dedicated', '{Executive Reception,Conference Center,Catering,IT Support,Valet Parking}', '24/7 with security'
),

-- Listing 5: Creative Office Loft
(
  'Office', 'office', '2325 3rd Street', 'San Francisco', 'CA', '94107', 'Dogpatch',
  4500, 9000, '{Internet,Utilities}', 300,
  1800, true, 150,
  '{Bike Storage,Elevator}', 12, '2025-04-05',
  80, 'Creative Spaces', '415-555-4444', 'hello@creativespaces.com',
  37.7587, -122.3880, '{Muni,Caltrain}',
  'Creative Loft', 15, 1, false,
  '500 Mbps', '{Open Plan,Kitchenette,Lounge Area,Exposed Brick,High Ceilings}', '8am-8pm weekdays'
);
