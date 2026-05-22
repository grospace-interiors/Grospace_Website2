-- ==========================================
-- FIX MALFORMED PROJECT IMAGE URLs
-- ==========================================

-- Fix main image URLs
UPDATE projects 
SET image = REPLACE(image, '/api/proxy-imagepath=', '/api/proxy-image?path=')
WHERE image LIKE '%/api/proxy-imagepath=%';

-- Fix gallery image arrays
-- This is a bit more complex for arrays, but we can do a simple string replace on the whole array string representation if needed, 
-- or use a more precise array function.
UPDATE projects
SET images = ARRAY(
    SELECT REPLACE(img, '/api/proxy-imagepath=', '/api/proxy-image?path=')
    FROM unnest(images) AS img
)
WHERE array_to_string(images, ',') LIKE '%/api/proxy-imagepath=%';
