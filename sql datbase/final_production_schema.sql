-- ==========================================
-- GROSPACE INTERIORS - FINAL PRODUCTION SCHEMA
-- ==========================================

-- ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENQUIRIES (Lead Management / CRM Ready)
-- This table captures leads from the Contact Form, Price Calculator, and Modals.
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    city TEXT DEFAULT 'Bhopal',
    source TEXT NOT NULL,           -- 'contact_form', 'calculator', 'engagement_popup'
    space_type TEXT,                -- '3BHK', 'Kitchen', etc.
    budget_range TEXT,              -- '3L-5L', '5L-10L', etc.
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
    whatsapp_opt_in BOOLEAN DEFAULT true,
    assigned_to TEXT,               -- Designer/Salesperson name
    details JSONB DEFAULT '{}',     -- Stores full calculator selections (BHK, dimensions, materials)
    admin_notes TEXT,               -- Internal follow-ups
    status TEXT DEFAULT 'new',      -- 'new', 'contacted', 'qualified', 'converted', 'lost'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PROJECTS (Enhanced Portfolio)
-- For displaying completed works in the gallery.
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    client_name TEXT,
    location TEXT DEFAULT 'Bhopal',
    description TEXT,
    image TEXT NOT NULL,            -- Cover Image URL
    images TEXT[] DEFAULT '{}',     -- Gallery Image URLs
    category TEXT DEFAULT 'Full Home',
    style_type TEXT DEFAULT 'Modern Luxury',
    bhk_type TEXT DEFAULT '3BHK',
    area_size TEXT,
    budget_range TEXT,
    timeline TEXT,
    completion_date DATE,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TESTIMONIALS (Dynamic Reviews)
-- For the review section.
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    image TEXT,                     -- Client photo URL
    project_type TEXT,              -- e.g., '3BHK Interior'
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PACKAGES (Shop Bundles)
-- For the curated interior packages/bundles.
CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12,2) NOT NULL,
    image_url TEXT,
    features JSONB DEFAULT '{}',    -- Dynamic list of features/icons
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. CALCULATOR CONFIGS (Future Scaling)
-- Keep this for when you want to enable automatic pricing later.
CREATE TABLE IF NOT EXISTS calculator_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT,                  -- 'Kitchen', 'Home', 'Wardrobe'
    package_name TEXT,              -- 'Essential', 'Premium', 'Luxury'
    base_price NUMERIC NOT NULL,
    material_multiplier NUMERIC DEFAULT 1,
    delivery_days INT DEFAULT 45,
    config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);


-- ==========================================
-- SECURITY: Row Level Security (RLS)
-- ==========================================

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Allow Public Leads (Anonymous users can submit forms)
DO $$ BEGIN
    CREATE POLICY "Allow Public Inserts" ON enquiries FOR INSERT WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Allow Public Read (Anonymous users can see your content)
DO $$ BEGIN
    CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Public Read Configs" ON calculator_configs FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Public Read Packages" ON packages FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


-- ==========================================
-- PERFORMANCE: Indexes
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
