-- ==========================================
-- PROJECT DATA MIGRATION FROM OLD WEBSITE
-- ==========================================

-- 1. Vibha Ji
INSERT INTO projects (title, description, category, image, images, location, style_type, bhk_type, is_featured)
VALUES (
    'Vibha Ji',
    'Real project designed for a family in Sonagiri, Bhopal.',
    'Residential Interior',
    'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2Fa5655b09-6add-4cd4-a8dc-d5faf771575c%2Fcover%2Fvibhaji.png',
    ARRAY[
        'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2Fa5655b09-6add-4cd4-a8dc-d5faf771575c%2Fgallery%2F1772353348641_Screenshot%25202026-02-16%2520193131.png',
        'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2Fa5655b09-6add-4cd4-a8dc-d5faf771575c%2Fgallery%2F1772353348643_Screenshot%25202026-02-16%2520193249.png',
        'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2Fa5655b09-6add-4cd4-a8dc-d5faf771575c%2Fgallery%2F1772353348643_Screenshot%25202026-03-01%2520134845.png'
    ],
    'Bhopal',
    'Modern Luxury',
    '3BHK',
    true
);

-- 2. Sumit Vyas Ji
INSERT INTO projects (title, description, category, image, images, location, style_type, bhk_type, is_featured)
VALUES (
    'Sumit Vyas Ji',
    'Real project designed for a family in Bhopal.',
    'Residential Interior',
    'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F450199b1-f2fa-4f22-8402-4c6a41d84aa8%2Fcover%2FChatGPT%20Image%20Feb%2012%2C%202026%2C%2012_09_30%20PM.png',
    ARRAY[
        'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F450199b1-f2fa-4f22-8402-4c6a41d84aa8%2Fgallery%2F1772352986301_Screenshot%25202026-03-01%2520132339.png',
        'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F450199b1-f2fa-4f22-8402-4c6a41d84aa8%2Fgallery%2F1772352986302_Screenshot%25202026-03-01%2520132508.png'
    ],
    'Bhopal',
    'Modern Luxury',
    '3BHK',
    true
);

-- 3. Solanki Mam
INSERT INTO projects (title, description, category, image, images, location, style_type, bhk_type, is_featured)
VALUES (
    'Solanki Mam',
    'Real project designed for a family in Bhopal.',
    'Residential Interior',
    'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F01e99792-a7a9-4bbf-ba45-19a8f8c5c91d%2Fcover%2Fsolanki%2520family.webp',
    ARRAY[
        'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F01e99792-a7a9-4bbf-ba45-19a8f8c5c91d%2Fgallery%2F1771252204104_1.webp',
        'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F01e99792-a7a9-4bbf-ba45-19a8f8c5c91d%2Fgallery%2F1771252204104_2.webp'
    ],
    'Bhopal',
    'Modern Luxury',
    '3BHK',
    true
);

-- 4. Khare Ji
INSERT INTO projects (title, description, category, image, images, location, style_type, bhk_type, is_featured)
VALUES (
    'Khare Ji',
    'Real project designed for a family in Bhopal.',
    'Residential Interior',
    'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F7d3f5fc6-561f-42d4-a549-e54497eb81a0%2Fcover%2Fkhare%2520family.webp',
    ARRAY[
        'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F7d3f5fc6-561f-42d4-a549-e54497eb81a0%2Fgallery%2F1771251758517_WhatsApp%2520Image%25202025-06-11%2520at%252008.53.41_5a5e3240.webp'
    ],
    'Bhopal',
    'Modern Luxury',
    '3BHK',
    true
);

-- 5. Iyer Ji
INSERT INTO projects (title, description, category, image, images, location, style_type, bhk_type, is_featured)
VALUES (
    'Iyer Ji',
    'Real project designed for a family in Bhopal.',
    'Residential Interior',
    'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F261a8ce7-cb71-408d-ae24-4959813b9f04%2Fcover%2Fiyer%2520family.webp',
    ARRAY[
        'https://www.grospaceinteriors.com/api/proxy-image?path=project-images%2F261a8ce7-cb71-408d-ae24-4959813b9f04%2Fgallery%2F1771251645576_1.webp'
    ],
    'Bhopal',
    'Modern Luxury',
    '3BHK',
    true
);

-- 6. Design Concept: Under Stairs
INSERT INTO projects (title, description, category, image, images, location, style_type, bhk_type, is_featured)
VALUES (
    'Under Stairs Solution',
    'Modern and space-efficient storage design for under-stair areas.',
    'Storage Solutions',
    'https://www.grospaceinteriors.com/api/proxy-image?path=3d-visualizations%2F1548e6c1-f9a4-4db2-91a7-cc357e7095f7%2F1771484397768_us.png',
    ARRAY[]::TEXT[],
    'Bhopal',
    'Modern',
    'N/A',
    false
);

-- 7. Design Concept: Living Room
INSERT INTO projects (title, description, category, image, images, location, style_type, bhk_type, is_featured)
VALUES (
    'Modern Living Room',
    '3D Visualization of a premium, contemporary living room layout.',
    'Living Room',
    'https://www.grospaceinteriors.com/api/proxy-image?path=3d-visualizations%2F6aa3e300-71d7-4547-926c-a3ef13fedf38%2F1771484336046_lr.png',
    ARRAY[]::TEXT[],
    'Bhopal',
    'Contemporary',
    'N/A',
    false
);

-- 8. Design Concept: Bedroom
INSERT INTO projects (title, description, category, image, images, location, style_type, bhk_type, is_featured)
VALUES (
    'Designer Bedroom',
    'Modern bedroom concept with premium finishes and lighting.',
    'Bedroom',
    'https://www.grospaceinteriors.com/api/proxy-image?path=3d-visualizations%2Fb140dcfb-4536-4a26-9321-fe3da95edfb4%2F1771484299875_B1.png',
    ARRAY[]::TEXT[],
    'Bhopal',
    'Modern Luxury',
    'N/A',
    false
);
