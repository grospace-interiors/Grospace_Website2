-- ========================================================
-- MODULAR CALCULATOR CONFIGURATION TABLES
-- Run this script in your Supabase SQL Editor
-- ========================================================

-- 1. CREATE KITCHEN CALCULATOR TABLE
CREATE TABLE IF NOT EXISTS kitchen_calculator_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_type TEXT NOT NULL, -- e.g., 'finish', 'hardware'
    package_name TEXT NOT NULL,
    base_price NUMERIC NOT NULL,
    unit TEXT DEFAULT 'SQFT',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for Kitchen
ALTER TABLE kitchen_calculator_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Kitchen Configs" ON kitchen_calculator_config FOR SELECT USING (true);

-- 2. CREATE WARDROBE CALCULATOR TABLE
CREATE TABLE IF NOT EXISTS wardrobe_calculator_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_type TEXT NOT NULL, -- e.g., 'finish'
    package_name TEXT NOT NULL,
    base_price NUMERIC NOT NULL,
    unit TEXT DEFAULT 'SQFT',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for Wardrobe
ALTER TABLE wardrobe_calculator_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Wardrobe Configs" ON wardrobe_calculator_config FOR SELECT USING (true);

-- ========================================================
-- INSERT LIVE DATA
-- ========================================================

-- Insert Kitchen Data
INSERT INTO kitchen_calculator_config (item_type, package_name, base_price, unit) VALUES 
('finish', 'Normal Mica', 850, 'SQFT'),
('finish', 'Acrylic', 1250, 'SQFT'),
('finish', 'Premium Laminate', 950, 'SQFT'),
('finish', 'Glossy Acrylic', 1350, 'SQFT'),
('finish', 'Matte PU', 1800, 'SQFT'),
('hardware', 'Tandem Drawers', 300, 'SQFT'),
('hardware', 'Jali / Normal', 150, 'SQFT'),
('hardware', 'Perforated', 200, 'SQFT');

-- Insert Wardrobe Data
INSERT INTO wardrobe_calculator_config (item_type, package_name, base_price, unit) VALUES 
('finish', 'Premium Laminate', 1500, 'SQFT'),
('finish', 'High Gloss', 1800, 'SQFT'),
('finish', 'Wood Texture', 1600, 'SQFT'),
('finish', 'Glass Finish', 2200, 'SQFT'),
('finish', 'Matte', 1400, 'SQFT');
