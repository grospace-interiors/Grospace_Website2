-- ========================================================
-- INSERT KITCHEN ADD-ONS
-- Run this script in your Supabase SQL Editor
-- ========================================================

-- Insert Add-ons (Accessories)
INSERT INTO kitchen_calculator_config (item_type, package_name, base_price, unit) VALUES 
('addon', 'Tall Unit', 15000, 'UNIT'),
('addon', 'Corner Unit', 8000, 'UNIT'),
('addon', 'Pantry', 20000, 'UNIT'),
('addon', 'Rolling Shutter', 12000, 'UNIT');
