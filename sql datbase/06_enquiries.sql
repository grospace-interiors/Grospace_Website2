CREATE TYPE enquiry_status AS ENUM (
  'new',
  'contacted',
  'qualified',
  'converted',
  'dropped'
);

CREATE TABLE enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
a
  full_name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,

  space_type text,              -- flat | villa | kitchen | renovation etc.
  source text NOT NULL,         -- website | whatsapp | instagram | call

  status enquiry_status NOT NULL DEFAULT 'new',

  notes text,                   -- internal notes only
  converted_customer_id uuid REFERENCES customers(id),

  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at);
CREATE INDEX idx_enquiries_phone ON enquiries(phone);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY website_insert_enquiry
ON enquiries
FOR INSERT
WITH CHECK (true);

CREATE POLICY internal_full_access_enquiry
ON enquiries
FOR ALL
USING (auth.uid() IS NOT NULL);