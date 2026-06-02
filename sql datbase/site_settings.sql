-- ==========================================
-- SITE SETTINGS / FEATURE FLAGS
-- ==========================================

CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert initial toggles
INSERT INTO site_settings (key, value, description)
VALUES 
('design_library_maintenance', '{"enabled": false}', 'Toggle for showing "curating new designs" message on the design library page'),
('projects_maintenance', '{"enabled": false}', 'Toggle for showing maintenance message on projects page')
ON CONFLICT (key) DO NOTHING;

-- Security: Allow public read
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
