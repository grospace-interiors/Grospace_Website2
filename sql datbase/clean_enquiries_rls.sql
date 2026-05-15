-- Drop all existing policies on enquiries table to start fresh for INSERT
DROP POLICY IF EXISTS "Allow public enquiry inserts" ON public.enquiries;
DROP POLICY IF EXISTS website_insert_enquiry ON public.enquiries;
DROP POLICY IF EXISTS internal_full_access_enquiry ON public.enquiries; -- Drop and re-add if necessary, to ensure order/correctness

-- Enable RLS (idempotent, but good to include for completeness if starting fresh)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Policy for anonymous users to insert enquiries from the website
CREATE POLICY website_insert_enquiry
ON public.enquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy for authenticated users (admin/employee) to have full access
CREATE POLICY internal_full_access_enquiry
ON public.enquiries
FOR ALL
USING (auth.uid() IS NOT NULL);
