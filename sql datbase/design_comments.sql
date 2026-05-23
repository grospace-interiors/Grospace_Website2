-- ==========================================
-- DESIGN COMMENTS (Moderated Section)
-- ==========================================

CREATE TABLE IF NOT EXISTS design_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    comment_text TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false, -- Default to false for moderation
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE design_comments ENABLE ROW LEVEL SECURITY;

-- Allow Public Inserts (Anyone can comment)
DO $$ BEGIN
    CREATE POLICY "Allow Public Inserts" ON design_comments FOR INSERT WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Allow Public Read (Only approved comments are visible)
DO $$ BEGIN
    CREATE POLICY "Public Read Approved Comments" ON design_comments FOR SELECT USING (is_approved = true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- PERFORMANCE: Index for approved comments
CREATE INDEX IF NOT EXISTS idx_comments_approved ON design_comments(is_approved) WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON design_comments(created_at DESC);
