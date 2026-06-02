-- ==========================================
-- DESIGN LIBRARY (Design Concepts & Inspiration)
-- ==========================================

CREATE TABLE IF NOT EXISTS design_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    tag TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE design_library ENABLE ROW LEVEL SECURITY;

-- Allow Public Read
DO $$ BEGIN
    CREATE POLICY "Public Read Designs" ON design_library FOR SELECT USING (is_active = true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Insert Mock Data
INSERT INTO design_library (title, description, category, image, tag)
VALUES 
('Modern Minimalist Living', 'Clean lines and warm oak textures for a spacious 2BHK living area.', 'Living Room', '/images/living room.webp', '2BHK'),
('Chef''s Paradise Kitchen', 'High-gloss acrylic finish with smart pull-out storage solutions.', 'Kitchen', '/images/modular kitchen.webp', 'Luxury'),
('Serene Master Suite', 'Ambient lighting and upholstered headboard for ultimate relaxation.', 'Bedroom', '/images/bedroom.webp', 'Luxury'),
('Floating Gypsum Ceiling', 'Layered false ceiling with hidden COB strips for a dramatic effect.', 'False Ceiling', '/images/false ceiling.webp', 'Modern'),
('Smart Space 1BHK', 'Multipurpose furniture designed for compact smart living.', '1BHK', 'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800', 'Compact'),
('Seamless Wardrobe', 'Floor-to-ceiling sliding wardrobe with tinted glass inserts.', 'Wardrobe', '/images/wardrobe.webp', 'Smart Storage'),
('Bespoke TV Console', 'Fluted paneling background with integrated wire management.', 'TV Unit', 'https://images.unsplash.com/photo-1593604340846-4fbe9763a8f3?q=80&w=800', '2BHK'),
('Kids Creative Zone', 'Vibrant colors meet functional study spaces for the little ones.', 'Bedroom', '/images/kids room.webp', 'Kids Room'),
('Luxury Penthouse Lounge', 'Double-height ceiling with premium marble wall cladding.', 'Luxury', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800', 'Signature'),
('Divine Mandir Corner', 'Traditional aesthetics blended with modern CNC cut patterns.', 'Living Room', '/images/mandir.webp', 'Traditional');
