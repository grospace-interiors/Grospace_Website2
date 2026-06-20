-- MOCK DATA FOR CALCULATOR CONFIGS
INSERT INTO calculator_configs (category, package_name, base_price, material_multiplier, delivery_days, config)
VALUES 
-- Kitchen Finishes
('Kitchen', 'Premium Laminate', 12500, 1.0, 35, '{"type": "finish", "unit": "RFT"}'),
('Kitchen', 'Glossy Acrylic', 12500, 1.3, 40, '{"type": "finish", "unit": "RFT"}'),
('Kitchen', 'Matte PU', 12500, 1.6, 45, '{"type": "finish", "unit": "RFT"}'),
('Kitchen', 'Glass Finish', 12500, 1.9, 50, '{"type": "finish", "unit": "RFT"}'),

-- Kitchen Countertops
('Kitchen', 'Granite', 800, 1.0, 5, '{"type": "countertop", "unit": "RFT"}'),
('Kitchen', 'Marble', 1200, 1.0, 7, '{"type": "countertop", "unit": "RFT"}'),
('Kitchen', 'Quartz', 2500, 1.0, 10, '{"type": "countertop", "unit": "RFT"}'),

-- Kitchen Finish Base Rates
('Kitchen', 'Normal Mica', 850, 1.0, 30, '{"type": "finish", "unit": "SQFT"}'),
('Kitchen', 'Acrylic', 1250, 1.0, 35, '{"type": "finish", "unit": "SQFT"}'),
('Kitchen', 'Premium Laminate', 950, 1.0, 30, '{"type": "finish", "unit": "SQFT"}'),
('Kitchen', 'Glossy Acrylic', 1350, 1.0, 40, '{"type": "finish", "unit": "SQFT"}'),

-- Kitchen Hardware System Extras
('Kitchen', 'Tandem Drawers', 300, 1.0, 5, '{"type": "hardware", "unit": "SQFT"}'),
('Kitchen', 'Jali / Normal', 150, 1.0, 2, '{"type": "hardware", "unit": "SQFT"}'),
('Kitchen', 'Perforated', 200, 1.0, 3, '{"type": "hardware", "unit": "SQFT"}'),



-- Wardrobe Finishes
('Wardrobe', 'Premium Laminate', 1500, 1.0, 30, '{"type": "finish", "unit": "SQFT"}'),
('Wardrobe', 'High Gloss', 1800, 1.0, 35, '{"type": "finish", "unit": "SQFT"}'),
('Wardrobe', 'Wood Texture', 1600, 1.0, 30, '{"type": "finish", "unit": "SQFT"}'),
('Wardrobe', 'Glass Finish', 2200, 1.0, 40, '{"type": "finish", "unit": "SQFT"}');

