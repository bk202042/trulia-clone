-- 10 dummy rental listings for testing
INSERT INTO rental_listings (
  property_type, street_address, city, state, zip_code, neighborhood,
  monthly_rent, security_deposit, utilities, utilities_cost,
  bedrooms, bathrooms, square_feet, parking, parking_fee,
  pet_friendly, pet_deposit, amenities, minimum_lease, available_date,
  application_fee, property_management, contact_phone, contact_email,
  latitude, longitude, nearby_transportation
) VALUES
-- Listing 1: Luxury Downtown Apartment
(
  'Apartment', '123 Main Street', 'San Francisco', 'CA', '94105', 'Financial District',
  3500, 5000, '{Water,Trash,Internet}', 200,
  2, 2, 1200, true, 250,
  true, 500, '{Pool,Gym,Doorman,Elevator,Rooftop Deck}', 12, '2025-04-01',
  75, 'Luxury Living Properties', '415-555-1234', 'info@luxuryliving.com',
  37.7897, -122.3972, '{BART,Muni,Ferry}'
),

-- Listing 2: Cozy Studio in Mission District
(
  'Studio', '456 Valencia St', 'San Francisco', 'CA', '94103', 'Mission District',
  2200, 2200, '{Water}', 50,
  0, 1, 500, false, 0,
  false, 0, '{Laundry,Hardwood Floors}', 6, '2025-03-30',
  50, 'Urban Spaces', '415-555-2345', 'leasing@urbanspaces.com',
  37.7648, -122.4217, '{BART,Bus}'
),

-- Listing 3: Family Home in Suburban Area
(
  'House', '789 Oak Drive', 'San Jose', 'CA', '95123', 'Cambrian',
  4200, 6000, '{Gardening}', 100,
  4, 3, 2500, true, 0,
  true, 300, '{Backyard,Garage,Fireplace,Washer/Dryer}', 12, '2025-05-15',
  100, 'Peninsula Homes', '408-555-3456', 'rentals@peninsulahomes.com',
  37.2958, -121.8791, '{VTA,Caltrain}'
),

-- Listing 4: Modern Loft Downtown
(
  'Loft', '101 Market St', 'San Francisco', 'CA', '94105', 'SoMa',
  3800, 4000, '{Water,Trash,Gas,Electric}', 300,
  1, 2, 1100, true, 300,
  false, 0, '{Concierge,Smart Home,Wine Cellar,Package Service}', 12, '2025-04-10',
  80, 'SF City Properties', '415-555-4567', 'sfcity@properties.com',
  37.7940, -122.3970, '{BART,Muni,Ferry}'
),

-- Listing 5: Budget-Friendly Apartment
(
  'Apartment', '222 Cedar Avenue', 'Oakland', 'CA', '94607', 'Jack London Square',
  1800, 1800, '{Water,Trash}', 100,
  1, 1, 750, false, 0,
  true, 250, '{Laundry,Security System}', 6, '2025-03-25',
  35, 'East Bay Rentals', '510-555-5678', 'eastbay@rentals.com',
  37.7957, -122.2789, '{BART,AC Transit}'
),

-- Listing 6: Luxury Townhouse
(
  'Townhouse', '333 Beachfront Way', 'Santa Cruz', 'CA', '95060', 'West Side',
  5500, 8000, '{Trash}', 50,
  3, 3.5, 2200, true, 0,
  false, 0, '{Beach Access,Private Patio,Fireplace,Granite Countertops}', 12, '2025-06-01',
  100, 'Coastal Living', '831-555-6789', 'info@coastalliving.com',
  36.9741, -122.0308, '{Bus,Bike Path}'
),

-- Listing 7: Mid-Century Home
(
  'House', '444 Redwood Road', 'Berkeley', 'CA', '94708', 'North Berkeley',
  4800, 7000, '{Gardening}', 150,
  3, 2, 1900, true, 0,
  true, 400, '{Garden,Deck,Hardwood Floors,Views}', 12, '2025-05-10',
  90, 'Berkeley Homes', '510-555-7890', 'rent@berkeleyhomes.com',
  37.8789, -122.2659, '{BART,AC Transit}'
),

-- Listing 8: Downtown Condo with Views
(
  'Condo', '555 City Center', 'San Jose', 'CA', '95113', 'Downtown',
  3200, 4000, '{Water,Trash,Internet}', 200,
  2, 2, 1300, true, 150,
  true, 300, '{Pool,Gym,Clubhouse,Balcony,Dog Park}', 12, '2025-04-15',
  75, 'Silicon Valley Properties', '408-555-8901', 'svp@rentals.com',
  37.3382, -121.8863, '{VTA,Caltrain}'
),

-- Listing 9: Rustic Cottage
(
  'Cottage', '666 Mountain View Road', 'Sausalito', 'CA', '94965', 'Marin Headlands',
  3900, 5000, '{}', 0,
  2, 1, 950, true, 0,
  false, 0, '{Water View,Private Garden,Fireplace}', 12, '2025-05-20',
  60, 'Marin Rentals', '415-555-9012', 'info@marinrentals.com',
  37.8553, -122.5789, '{Ferry,Bus}'
),

-- Listing 10: Modern Apartment Complex
(
  'Apartment', '777 Tech Avenue', 'Palo Alto', 'CA', '94301', 'University South',
  4100, 5000, '{Water,Trash,Cable}', 250,
  2, 2, 1100, true, 200,
  true, 600, '{Pool,Gym,EV Charging,Package Lockers,Co-working Space}', 12, '2025-04-05',
  85, 'Peninsula Properties', '650-555-0123', 'leasing@peninsulaprops.com',
  37.4419, -122.1430, '{Caltrain,Stanford Shuttle}'
);
