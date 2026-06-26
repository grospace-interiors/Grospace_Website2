-- ========================================================
-- RESET WARDROBE CALCULATOR CONFIGURATION ONLY
-- Run this in your Supabase SQL Editor to clean and repopulate wardrobe values.
-- ========================================================

-- 1. Empty the wardrobe table
TRUNCATE TABLE wardrobe_calculator_config RESTART IDENTITY;

-- 2. Insert clean wardrobe finish options (must match frontend exactly)
INSERT INTO wardrobe_calculator_config (item_type, package_name, base_price, unit)
VALUES
('finish', 'Mica', 1200, 'SQFT'),
('finish', 'Acrylic', 2000, 'SQFT'),
('finish', 'Premium Matt Finish', 1800, 'SQFT'),
('finish', 'Veneer', 2500, 'SQFT')
ON CONFLICT (item_type, package_name) DO UPDATE SET base_price = EXCLUDED.base_price;

-- 3. Insert clean wardrobe add-on / accessory options (must match frontend exactly)
INSERT INTO wardrobe_calculator_config (item_type, package_name, base_price, unit)
VALUES
('addon', 'Drawers', 4000, 'UNIT'),
('addon', 'Shoe Rack', 3000, 'UNIT'),
('addon', 'Jewelry Unit', 5000, 'UNIT'),
('addon', 'Full Mirror', 3500, 'UNIT'),
('addon', 'Pull Down Hanger', 6000, 'UNIT'),
('addon', 'Trouser Organiser', 4000, 'UNIT')
ON CONFLICT (item_type, package_name) DO UPDATE SET base_price = EXCLUDED.base_price;
