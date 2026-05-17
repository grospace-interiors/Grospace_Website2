-- Insert Mock Data for Projects
INSERT INTO projects (title, client_name, location, description, image, images, category, style_type, bhk_type, area_size, timeline, is_featured)
VALUES 
(
    'The Arera Luxury Villa', 
    'Mr. Sharma', 
    'Arera Colony, Bhopal', 
    'A high-end 4BHK renovation featuring premium Italian marble, custom veneer wardrobes, and a state-of-the-art modular kitchen.', 
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200', 
    ARRAY['https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=1200', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200'],
    'Full Home', 
    'Modern Luxury', 
    '4BHK', 
    '3200 SQFT', 
    '75 Days', 
    true
),
(
    'Modern Scandi Kitchen', 
    'Mrs. Kapoor', 
    'Gulmohar, Bhopal', 
    'A minimalist parallel kitchen with anti-fingerprint acrylic finish and smart corner solutions.', 
    'https://images.unsplash.com/photo-1556911220-e15595b69581?q=80&w=1200', 
    ARRAY['https://images.unsplash.com/photo-1556912028-976e1919672d?q=80&w=1200'],
    'Kitchen', 
    'Minimalist', 
    'Kitchen Only', 
    '180 SQFT', 
    '25 Days', 
    true
);

-- Insert Mock Data for Packages (Shop Section)
INSERT INTO packages (name, description, price, image_url, features)
VALUES 
(
    'Essential Bundle of 4', 
    'Perfect for a 1BHK or specific room renovation. Includes core modular elements.', 
    149000, 
    'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800',
    '{"items": ["Modular Kitchen (L-Shape)", "Master Bedroom Wardrobe", "TV Unit", "Basic False Ceiling"]}'
),
(
    'Premium Bundle of 6', 
    'Our most popular choice for 2BHK homes. Comprehensive design and execution.', 
    289000, 
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
    '{"items": ["Modular Kitchen (U-Shape)", "Master Bedroom Wardrobe", "Kids Room Wardrobe", "Living Room TV Unit", "Premium False Ceiling", "Shoe Rack & Foyer Unit"]}'
);

-- Insert Mock Data for Testimonials
INSERT INTO testimonials (client_name, rating, review, project_type, is_featured)
VALUES 
(
    'Anjali Verma', 
    5, 
    'Grospace transformed our house into a home. Their attention to detail and personal touch is what sets them apart in Bhopal.', 
    '3BHK Full Home', 
    true
),
(
    'Rohan Mehra', 
    5, 
    'The modular kitchen delivery was seamless. Transparent pricing and high-quality finish. Highly recommended!', 
    'Modular Kitchen', 
    true
);
