-- ========================================================
-- CLEAN AND RESET CALCULATOR CONFIGURATION TABLES
-- Run this script in your Supabase SQL Editor to wipe existing entries and start fresh.
-- ========================================================

-- Enable UUID extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================================
-- 1. SETUP TABLES (CREATE IF NOT EXISTS)
-- ========================================================

-- Kitchen Config Table
CREATE TABLE IF NOT EXISTS kitchen_calculator_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_type TEXT NOT NULL,         -- 'finish', 'hardware', or 'addon'
    package_name TEXT NOT NULL,      -- must match frontend option labels
    base_price NUMERIC NOT NULL,
    unit TEXT DEFAULT 'SQFT',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Wardrobe Config Table
CREATE TABLE IF NOT EXISTS wardrobe_calculator_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_type TEXT NOT NULL,         -- 'finish' or 'addon'
    package_name TEXT NOT NULL,      -- must match frontend option labels
    base_price NUMERIC NOT NULL,
    unit TEXT DEFAULT 'SQFT',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Home Config Table
CREATE TABLE IF NOT EXISTS home_calculator_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_type TEXT NOT NULL,         -- 'bhk', 'space', 'style', or 'material'
    package_name TEXT NOT NULL,      -- must match frontend option labels
    base_price NUMERIC NOT NULL,     -- base amount or multiplier
    unit TEXT DEFAULT 'UNIT',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ========================================================
-- 2. ENABLE ROW LEVEL SECURITY & READ POLICIES
-- ========================================================

ALTER TABLE kitchen_calculator_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE wardrobe_calculator_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_calculator_config ENABLE ROW LEVEL SECURITY;

-- Re-create read policies if not existing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'kitchen_calculator_config' AND policyname = 'Public Read Kitchen Configs') THEN
        CREATE POLICY "Public Read Kitchen Configs" ON kitchen_calculator_config FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'wardrobe_calculator_config' AND policyname = 'Public Read Wardrobe Configs') THEN
        CREATE POLICY "Public Read Wardrobe Configs" ON wardrobe_calculator_config FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'home_calculator_config' AND policyname = 'Public Read Home Configs') THEN
        CREATE POLICY "Public Read Home Configs" ON home_calculator_config FOR SELECT USING (true);
    END IF;
END $$;

-- ========================================================
-- 3. ENSURE UNIQUE CONSTRAINTS FOR ON CONFLICT HANDLING
-- ========================================================
CREATE UNIQUE INDEX IF NOT EXISTS idx_kitchen_calculator_config_item_package ON kitchen_calculator_config (item_type, package_name);
CREATE UNIQUE INDEX IF NOT EXISTS idx_wardrobe_calculator_config_item_package ON wardrobe_calculator_config (item_type, package_name);
CREATE UNIQUE INDEX IF NOT EXISTS idx_home_calculator_config_item_package ON home_calculator_config (item_type, package_name);

-- ========================================================
-- 4. CLEAN OLD ENTRIES
-- ========================================================
TRUNCATE TABLE kitchen_calculator_config RESTART IDENTITY;
TRUNCATE TABLE wardrobe_calculator_config RESTART IDENTITY;
TRUNCATE TABLE home_calculator_config RESTART IDENTITY;

-- ========================================================
-- 5. INSERT FRESH CLEAN DATA
-- ========================================================

-- A. Modular Kitchen Calculator Configuration
INSERT INTO kitchen_calculator_config (item_type, package_name, base_price, unit)
VALUES
('finish', 'Normal Mica', 850, 'SQFT'),
('finish', 'Acrylic', 1250, 'SQFT'),
('finish', 'Premium Laminate', 950, 'SQFT'),
('finish', 'Glossy Acrylic', 1350, 'SQFT'),
('finish', 'Matte PU', 1800, 'SQFT'),
('hardware', 'Tandem Drawers', 300, 'SQFT'),
('hardware', 'Jali / Normal', 150, 'SQFT'),
('hardware', 'Perforated', 200, 'SQFT'),
('addon', 'Tall Unit', 15000, 'UNIT'),
('addon', 'Corner Unit', 8000, 'UNIT'),
('addon', 'Pantry', 20000, 'UNIT'),
('addon', 'Rolling Shutter', 12000, 'UNIT')
ON CONFLICT (item_type, package_name) DO UPDATE SET base_price = EXCLUDED.base_price;

-- B. Luxury Wardrobe Calculator Configuration
INSERT INTO wardrobe_calculator_config (item_type, package_name, base_price, unit)
VALUES
('finish', 'Laminates', 1500, 'SQFT'),
('finish', 'Mica', 1200, 'SQFT'),
('finish', 'Premium Matt Finish', 1800, 'SQFT'),
('finish', 'Acrylic High Gloss', 2200, 'SQFT'),
('finish', 'Acrylic', 2000, 'SQFT'),
('finish', 'Premium Laminate', 1500, 'SQFT'),
('finish', 'High Gloss', 1800, 'SQFT'),
('finish', 'Wood Texture', 1600, 'SQFT'),
('finish', 'Glass Finish', 2200, 'SQFT'),
('finish', 'Matte', 1400, 'SQFT'),
('addon', 'Drawers', 4000, 'UNIT'),
('addon', 'Shoe Rack', 3000, 'UNIT'),
('addon', 'Jewelry Unit', 5000, 'UNIT'),
('addon', 'Full Mirror', 3500, 'UNIT'),
('addon', 'Loft Unit', 8000, 'UNIT')
ON CONFLICT (item_type, package_name) DO UPDATE SET base_price = EXCLUDED.base_price;

-- C. Full Home Interior Calculator Configuration
INSERT INTO home_calculator_config (item_type, package_name, base_price, unit)
VALUES
('bhk', '1 BHK', 250000, 'UNIT'),
('bhk', '2 BHK', 450000, 'UNIT'),
('bhk', '3 BHK', 650000, 'UNIT'),
('bhk', '4 BHK', 850000, 'UNIT'),
('space', 'Kitchen', 120000, 'UNIT'),
('space', 'Living Room Display', 80000, 'UNIT'),
('space', 'TV Unit', 40000, 'UNIT'),
('space', 'False Ceiling', 50000, 'UNIT'),
('space', 'Mandir', 25000, 'UNIT'),
('space', 'Study Unit', 30000, 'UNIT'),
('space', 'Sofa', 50000, 'UNIT'),
('space', 'Partition (Living Room)', 35000, 'UNIT'),
('style', 'Modern', 1.10, 'MULTIPLIER'),
('style', 'Luxury', 1.40, 'MULTIPLIER'),
('style', 'Minimal', 1.00, 'MULTIPLIER'),
('style', 'Contemporary', 1.15, 'MULTIPLIER'),
('style', 'Wooden Elegant', 1.25, 'MULTIPLIER'),
('material', 'Laminate', 1.00, 'MULTIPLIER'),
('material', 'Acrylic', 1.25, 'MULTIPLIER'),
('material', 'PU Finish', 1.40, 'MULTIPLIER'),
('material', 'Veneer', 1.50, 'MULTIPLIER')
ON CONFLICT (item_type, package_name) DO UPDATE SET base_price = EXCLUDED.base_price;
