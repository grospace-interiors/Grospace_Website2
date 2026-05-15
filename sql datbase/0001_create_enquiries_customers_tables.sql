-- Create the 'enquiries' table
CREATE TABLE enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    source TEXT NOT NULL, -- e.g., 'website', 'whatsapp', 'call', 'instagram'
    status TEXT DEFAULT 'new' NOT NULL, -- e.g., 'new', 'contacted', 'qualified', 'converted', 'dropped'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Add RLS for 'enquiries' table (to be fully configured based on application needs)
-- ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow authenticated insert" ON enquiries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "Allow internal app access" ON enquiries FOR ALL USING (auth.jwt() ->> 'app_access' = 'true');


-- Create the 'customers' table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id UUID REFERENCES enquiries(id) ON DELETE SET NULL, -- Link to enquiry, but allow to be null if enquiry is deleted
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    project_value NUMERIC,
    project_status TEXT DEFAULT 'design' NOT NULL, -- e.g., 'design', 'execution', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Add RLS for 'customers' table (to be fully configured based on application needs)
-- ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow internal app access" ON customers FOR ALL USING (auth.jwt() ->> 'app_access' = 'true');
