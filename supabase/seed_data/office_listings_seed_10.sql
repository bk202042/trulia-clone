-- 10 dummy office property listings for testing
insert into office_listings (
  property_type, street_address, city, state, zip_code, neighborhood,
  monthly_rent, security_deposit, utilities_cost, square_feet,
  desk_capacity, meeting_rooms, has_reception, internet_speed,
  parking, parking_fee, minimum_lease, available_date,
  application_fee, property_management, contact_phone, contact_email,
  latitude, longitude, office_type, available_hours
) values
-- Listing 1: Premium Downtown Private Office
(
  'Office', '100 Market Street', 'San Francisco', 'CA', '94105', 'Financial District',
  5000, 10000, 0, 1500,
  8, 2, true, '1 Gbps fiber',
  true, 300, 12, '2025-04-01',
  100, 'WeSpace Properties', '415-555-9000', 'office@wespace.com',
  37.7937, -122.3965, 'Private Office', '24/7'
),

-- Listing 2: Co-working Space in SOMA
(
  'Office', '350 Brannan St', 'San Francisco', 'CA', '94107', 'SOMA',
  3000, 6000, 0, 800,
  20, 3, true, '1 Gbps fiber',
  true, 200, 6, '2025-03-25',
  75, 'Startup Hub', '415-555-8888', 'info@startuphub.com',
  37.7790, -122.3942, 'Co-working', '7am-11pm daily'
),

-- Listing 3: Entire Floor Office in Oakland
(
  'Office', '1721 Broadway', 'Oakland', 'CA', '94612', 'Downtown Oakland',
  12000, 24000, 500, 4500,
  50, 5, false, '2 Gbps fiber',
  true, 0, 36, '2025-05-15',
  200, 'Metro Commercial', '510-555-7777', 'leasing@metrocommercial.com',
  37.8080, -122.2702, 'Entire Floor', '24/7'
),

-- Listing 4: Modern Executive Suite
(
  'Office', '555 California St', 'San Francisco', 'CA', '94104', 'Financial District',
  7500, 15000, 0, 2000,
  12, 3, true, '10 Gbps dedicated',
  true, 350, 24, '2025-04-10',
  150, 'Executive Office Solutions', '415-555-6666', 'exec@officesolutions.com',
  37.7927, -122.4036, 'Executive Suite', '24/7 with security'
),

-- Listing 5: Creative Office Loft
(
  'Office', '2325 3rd Street', 'San Francisco', 'CA', '94107', 'Dogpatch',
  4500, 9000, 300, 1800,
  15, 1, false, '500 Mbps',
  true, 150, 12, '2025-04-05',
  80, 'Creative Spaces', '415-555-4444', 'hello@creativespaces.com',
  37.7587, -122.3880, 'Creative Loft', '8am-8pm weekdays'
),

-- Listing 6: Tech Hub Office Space
(
  'Office', '888 Howard Street', 'San Francisco', 'CA', '94103', 'SOMA',
  8500, 17000, 0, 2500,
  30, 4, true, '2 Gbps fiber',
  true, 400, 12, '2025-05-01',
  120, 'TechSpace Solutions', '415-555-3333', 'lease@techspace.com',
  37.7838, -122.4033, 'Tech Office', '24/7 with keycard'
),

-- Listing 7: Waterfront Office Suite
(
  'Office', '1 Ferry Building', 'San Francisco', 'CA', '94111', 'Embarcadero',
  9500, 19000, 0, 1800,
  10, 2, true, '1 Gbps fiber',
  true, 450, 24, '2025-04-20',
  150, 'Bay View Properties', '415-555-2222', 'info@bayviewprops.com',
  37.7955, -122.3937, 'Premium Suite', '7am-10pm daily'
),

-- Listing 8: Startup-Friendly Space
(
  'Office', '2001 Mission Street', 'San Francisco', 'CA', '94110', 'Mission District',
  3800, 7600, 200, 1200,
  25, 2, false, '1 Gbps fiber',
  false, 0, 6, '2025-03-30',
  60, 'Mission Works', '415-555-1111', 'startups@missionworks.com',
  37.7647, -122.4198, 'Co-working', '24/7 for members'
),

-- Listing 9: Professional Office Complex
(
  'Office', '505 Montgomery Street', 'San Francisco', 'CA', '94111', 'Financial District',
  6500, 13000, 0, 1600,
  18, 3, true, '1 Gbps fiber',
  true, 300, 12, '2025-05-10',
  100, 'Professional Partners', '415-555-0000', 'office@profpartners.com',
  37.7946, -122.4030, 'Professional Suite', '6am-midnight'
),

-- Listing 10: Innovation Campus Office
(
  'Office', '600 Townsend Street', 'San Francisco', 'CA', '94103', 'SOMA',
  11000, 22000, 400, 3500,
  40, 6, true, '5 Gbps fiber',
  true, 250, 24, '2025-06-01',
  200, 'Innovation Properties', '415-555-9999', 'campus@innovationprops.com',
  37.7706, -122.4040, 'Campus Space', '24/7 secured'
);
