-- ============================================
-- PROJECT PROFILE CARD
-- ============================================

CREATE TABLE IF NOT EXISTS project_profile_cards (
    project_id uuid PRIMARY KEY
        REFERENCES projects(id)
        ON DELETE CASCADE,

    cover_image text NOT NULL,
    title text NOT NULL,
    description text,

    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Disable RLS completely
ALTER TABLE project_profile_cards DISABLE ROW LEVEL SECURITY;



-- ============================================
-- PROJECT GALLERY IMAGES
-- ============================================

CREATE TABLE IF NOT EXISTS project_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id uuid NOT NULL
        REFERENCES projects(id)
        ON DELETE CASCADE,

    image_path text NOT NULL,
    alt_text text,
    sort_order integer DEFAULT 0,

    created_at timestamptz DEFAULT now()
);

-- Disable RLS completely
ALTER TABLE project_images DISABLE ROW LEVEL SECURITY;
