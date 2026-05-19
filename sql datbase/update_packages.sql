-- CLEAR EXISTING PACKAGES
TRUNCATE TABLE packages;

-- INSERT NEW 3-TIER PACKAGES
INSERT INTO packages (name, description, price, image_url, features)
VALUES 
(
    'Essential Package', 
    'Perfect for compact homes and first-time interior setups.', 
    250000, 
    'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800',
    '{"items": ["Modular Kitchen", "1 Wardrobe", "Basic Storage Solutions", "Functional Design Layout"]}'
),
(
    'Smart Package', 
    'Balanced interiors with better finishes and optimized space planning.', 
    350000, 
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
    '{"items": ["Modular Kitchen", "2 Wardrobes", "TV Unit", "Space Optimization"]}'
),
(
    'Signature Package', 
    'Complete interior solution for modern 2BHK & 3BHK homes.', 
    500000, 
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    '{"items": ["Full Home Interiors", "Kitchen + Wardrobes + TV Unit", "Premium Finishes", "False Ceiling (Optional)"]}'
);
