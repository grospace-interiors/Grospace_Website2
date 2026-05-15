-- Disable RLS temporarily to ensure all policies can be dropped without issues
ALTER TABLE public.enquiries DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on enquiries table
DROP POLICY IF EXISTS "Allow public enquiry inserts" ON public.enquiries;
DROP POLICY IF EXISTS website_insert_enquiry ON public.enquiries;
DROP POLICY IF EXISTS internal_full_access_enquiry ON public.enquiries;

-- Re-enable RLS
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Create ONLY the policy for anonymous users to insert enquiries from the website
CREATE POLICY website_insert_enquiry
ON public.enquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- At this point, only anonymous inserts will work. Authenticated users will NOT have access
-- until 'internal_full_access_enquiry' is re-added.
-- Please re-add the 'internal_full_access_enquiry' policy manually after confirming anonymous insert works,
-- or create a separate script for it. Its definition should be:
-- Name: internal_full_access_enquiry
-- For: ALL
-- Using: (auth.uid() IS NOT NULL)
-- With Check: (auth.uid() IS NOT NULL)
