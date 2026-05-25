-- ==========================================
-- IMAGE OPTIMIZATION (Switch to WebP)
-- Run this in Supabase SQL Editor
-- ==========================================

-- 1. Update Projects Table
UPDATE projects 
SET image = REPLACE(image, '.jpg', '.webp'),
    images = ARRAY(SELECT REPLACE(img, '.jpg', '.webp') FROM unnest(images) AS img)
WHERE image LIKE '%.jpg%';

UPDATE projects 
SET image = REPLACE(image, '.png', '.webp'),
    images = ARRAY(SELECT REPLACE(img, '.png', '.webp') FROM unnest(images) AS img)
WHERE image LIKE '%.png%';

-- 2. Update Packages Table
UPDATE packages 
SET image_url = REPLACE(image_url, '.jpg', '.webp')
WHERE image_url LIKE '%.jpg%';

UPDATE packages 
SET image_url = REPLACE(image_url, '.png', '.webp')
WHERE image_url LIKE '%.png%';

-- 3. Update Landing Budget Collections
UPDATE landing_budget_collections 
SET image_url = REPLACE(image_url, '.jpg', '.webp')
WHERE image_url LIKE '%.jpg%';

UPDATE landing_budget_collections 
SET image_url = REPLACE(image_url, '.png', '.webp')
WHERE image_url LIKE '%.png%';
