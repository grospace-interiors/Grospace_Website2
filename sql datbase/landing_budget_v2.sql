-- ========================================================
-- LANDING BUDGET COLLECTIONS (V2)
-- ========================================================

-- Drop existing table if you want to fresh start, 
-- or use the ALTER statements below to upgrade.
-- DROP TABLE IF EXISTS landing_budget_collections;

CREATE TABLE IF NOT EXISTS landing_budget_collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,                -- e.g., '1BHK Interiors'
    subtitle TEXT,                      -- e.g., 'Compact Smart Living'
    price_text TEXT NOT NULL,           -- e.g., '₹2.15L'
    description TEXT,                   -- Detailed intro text
    features JSONB DEFAULT '[]'::jsonb, -- List of features/bullet points
    footer_text TEXT,                   -- Bottom highlight text
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE landing_budget_collections ENABLE ROW LEVEL SECURITY;

-- Public Read Access
DO $$ BEGIN
    CREATE POLICY "Public Read Collections" ON landing_budget_collections FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ========================================================
-- DATA MIGRATION: NEW CURATED COLLECTIONS
-- ========================================================

TRUNCATE TABLE landing_budget_collections;

INSERT INTO landing_budget_collections 
(title, subtitle, price_text, description, features, footer_text, image_url, display_order)
VALUES 
(
    '1BHK Interiors',
    'Compact Smart Living',
    '₹2.15L',
    'Designed for compact homes with practical and space-efficient interiors.',
    '["Modular Kitchen", "Smart Wardrobe Solutions", "Functional Storage", "Minimal Modern Design"]'::jsonb,
    'Ideal for first-time homeowners and compact apartments.',
    'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800',
    1
),
(
    '2BHK Interiors',
    'Complete 2BHK Interiors',
    '₹3.10L',
    'Balanced interiors designed for comfort, functionality, and modern living.',
    '["Modular Kitchen", "2 Wardrobes", "TV Unit & Storage", "False Ceiling Options"]'::jsonb,
    'Perfect for modern families and growing homes.',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
    2
),
(
    '3BHK Interiors',
    'Premium Family Interiors',
    '₹4.23L',
    'Spacious and premium interior solutions with enhanced functionality and aesthetics.',
    '["Complete Modular Solutions", "Multiple Wardrobes", "Living Room Enhancements", "Smart Space Planning"]'::jsonb,
    'Designed for elegant and spacious family living.',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
    3
),
(
    '4BHK & Luxury',
    'Signature Luxury Interiors',
    '₹6.5L',
    'Customized interior experiences crafted for large homes and luxury spaces.',
    '["Bespoke Interior Concepts", "Premium Material Finishes", "Designer Ceiling Concepts", "Personalized Space Planning"]'::jsonb,
    'Tailored for villas, luxury apartments, and premium residences.',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    4
),
(
    'Modular Kitchens',
    'Smart Modular Kitchens',
    '₹1.25L',
    'Modern kitchens designed for functionality, storage, and seamless daily use.',
    '["Space-Efficient Layouts", "Premium Finishes", "Smart Storage Systems", "Easy Maintenance Solutions"]'::jsonb,
    'Modern kitchens designed for functionality and storage.',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800',
    5
),
(
    'Wardrobe Designs',
    'Modern Wardrobe Solutions',
    '₹65,000',
    'Elegant wardrobe designs focused on organization and modern aesthetics.',
    '["Sliding & Hinged Options", "Smart Internal Storage", "Space-Saving Concepts", "Contemporary Finishes"]'::jsonb,
    'Elegant wardrobe designs focused on organization.',
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800',
    6
),
(
    'False Ceiling Designs',
    'Modern Ceiling Concepts',
    '₹85/sq.ft',
    'Enhance ambiance and lighting with elegant ceiling solutions.',
    '["Ambient Lighting Integration", "Clean Modern Patterns", "Custom Ceiling Layouts", "Premium Finishing Touches"]'::jsonb,
    'Enhance ambiance and lighting with elegant solutions.',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
    7
);
