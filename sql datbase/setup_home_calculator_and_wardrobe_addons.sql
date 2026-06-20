-- ========================================================
-- HOME CALCULATOR + WARDROBE CALCULATOR CONFIGURATION
-- Run this script in Supabase SQL Editor.
--
-- This file matches the current React calculator in:
-- components/price-estimator.tsx
--
-- Tables used by the app:
-- 1. home_calculator_config
-- 2. wardrobe_calculator_config
--
-- Kitchen pricing is handled separately by:
-- setup_modular_calculators.sql
-- setup_kitchen_addons.sql
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================================
-- 1. WARDROBE CALCULATOR TABLE
-- ========================================================

CREATE TABLE IF NOT EXISTS wardrobe_calculator_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_type TEXT NOT NULL,         -- 'finish' or 'addon'
    package_name TEXT NOT NULL,      -- must match frontend option text
    base_price NUMERIC NOT NULL,
    unit TEXT DEFAULT 'SQFT',        -- 'SQFT' for finishes, 'UNIT' for add-ons
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

ALTER TABLE wardrobe_calculator_config ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'wardrobe_calculator_config'
          AND policyname = 'Public Read Wardrobe Configs'
    ) THEN
        CREATE POLICY "Public Read Wardrobe Configs"
        ON wardrobe_calculator_config
        FOR SELECT
        USING (true);
    END IF;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_wardrobe_calculator_config_item_package
ON wardrobe_calculator_config (item_type, package_name);

-- Wardrobe finish options must match current frontend labels exactly:
-- ['Laminates', 'Mica', 'Premium Matt Finish', 'Acrylic High Gloss', 'Acrylic']
INSERT INTO wardrobe_calculator_config (item_type, package_name, base_price, unit)
VALUES
('finish', 'Laminates', 1500, 'SQFT'),
('finish', 'Mica', 1200, 'SQFT'),
('finish', 'Premium Matt Finish', 1800, 'SQFT'),
('finish', 'Acrylic High Gloss', 2200, 'SQFT'),
('finish', 'Acrylic', 2000, 'SQFT')
ON CONFLICT (item_type, package_name)
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    unit = EXCLUDED.unit,
    is_active = true;

-- Wardrobe add-on options must match current frontend labels exactly:
-- ['Drawers', 'Shoe Rack', 'Jewelry Unit', 'Full Mirror', 'Loft Unit']
INSERT INTO wardrobe_calculator_config (item_type, package_name, base_price, unit)
VALUES
('addon', 'Drawers', 4000, 'UNIT'),
('addon', 'Shoe Rack', 3000, 'UNIT'),
('addon', 'Jewelry Unit', 5000, 'UNIT'),
('addon', 'Full Mirror', 3500, 'UNIT'),
('addon', 'Loft Unit', 8000, 'UNIT')
ON CONFLICT (item_type, package_name)
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    unit = EXCLUDED.unit,
    is_active = true;

-- ========================================================
-- 2. HOME CALCULATOR TABLE
-- ========================================================

CREATE TABLE IF NOT EXISTS home_calculator_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    item_type TEXT NOT NULL,         -- 'bhk', 'space', 'style', or 'material'
    package_name TEXT NOT NULL,      -- must match frontend option text
    base_price NUMERIC NOT NULL,     -- amount for UNIT rows, multiplier for MULTIPLIER rows
    unit TEXT DEFAULT 'UNIT',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

ALTER TABLE home_calculator_config ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'home_calculator_config'
          AND policyname = 'Public Read Home Configs'
    ) THEN
        CREATE POLICY "Public Read Home Configs"
        ON home_calculator_config
        FOR SELECT
        USING (true);
    END IF;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_home_calculator_config_item_package
ON home_calculator_config (item_type, package_name);

-- Home BHK options must match current frontend labels exactly:
-- ['1 BHK', '2 BHK', '3 BHK', '4 BHK']
INSERT INTO home_calculator_config (item_type, package_name, base_price, unit)
VALUES
('bhk', '1 BHK', 250000, 'UNIT'),
('bhk', '2 BHK', 450000, 'UNIT'),
('bhk', '3 BHK', 650000, 'UNIT'),
('bhk', '4 BHK', 850000, 'UNIT')
ON CONFLICT (item_type, package_name)
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    unit = EXCLUDED.unit,
    is_active = true;

-- Home space options must match current frontend labels exactly:
-- ['Kitchen', 'Wardrobe', 'TV Unit', 'False Ceiling', 'Mandir', 'Study Unit']
INSERT INTO home_calculator_config (item_type, package_name, base_price, unit)
VALUES
('space', 'Kitchen', 120000, 'UNIT'),
('space', 'Wardrobe', 80000, 'UNIT'),
('space', 'TV Unit', 40000, 'UNIT'),
('space', 'False Ceiling', 50000, 'UNIT'),
('space', 'Mandir', 25000, 'UNIT'),
('space', 'Study Unit', 30000, 'UNIT')
ON CONFLICT (item_type, package_name)
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    unit = EXCLUDED.unit,
    is_active = true;

-- Home style options must match current frontend labels exactly:
-- ['Modern', 'Luxury', 'Minimal', 'Contemporary', 'Wooden Elegant']
INSERT INTO home_calculator_config (item_type, package_name, base_price, unit)
VALUES
('style', 'Modern', 1.10, 'MULTIPLIER'),
('style', 'Luxury', 1.40, 'MULTIPLIER'),
('style', 'Minimal', 1.00, 'MULTIPLIER'),
('style', 'Contemporary', 1.15, 'MULTIPLIER'),
('style', 'Wooden Elegant', 1.25, 'MULTIPLIER')
ON CONFLICT (item_type, package_name)
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    unit = EXCLUDED.unit,
    is_active = true;

-- Home material options must match current frontend labels exactly:
-- ['Laminate', 'Acrylic', 'PU Finish', 'Veneer']
INSERT INTO home_calculator_config (item_type, package_name, base_price, unit)
VALUES
('material', 'Laminate', 1.00, 'MULTIPLIER'),
('material', 'Acrylic', 1.25, 'MULTIPLIER'),
('material', 'PU Finish', 1.40, 'MULTIPLIER'),
('material', 'Veneer', 1.50, 'MULTIPLIER')
ON CONFLICT (item_type, package_name)
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    unit = EXCLUDED.unit,
    is_active = true;
