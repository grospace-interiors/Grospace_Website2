-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    items TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
ON packages FOR SELECT
TO anon, authenticated
USING (true);

-- Insert mock data for Bundles
INSERT INTO packages (name, description, price, items, image_url)
VALUES 
(
    'Essential Bundle of 4', 
    'Perfect for a 1BHK or specific room renovation. Includes core modular elements.', 
    149000, 
    ARRAY['Modular Kitchen (L-Shape)', 'Master Bedroom Wardrobe', 'TV Unit', 'Basic False Ceiling'],
    'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800'
),
(
    'Premium Bundle of 6', 
    'Our most popular choice for 2BHK homes. Comprehensive design and execution.', 
    289000, 
    ARRAY['Modular Kitchen (U-Shape)', 'Master Bedroom Wardrobe', 'Kids Room Wardrobe', 'Living Room TV Unit', 'Premium False Ceiling', 'Shoe Rack & Foyer Unit'],
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800'
);
