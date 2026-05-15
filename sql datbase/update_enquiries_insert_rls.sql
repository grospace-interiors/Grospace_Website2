-- Drop the existing policy
DROP POLICY IF EXISTS website_insert_enquiry ON public.enquiries;

-- Create a new policy that explicitly allows anonymous users to insert enquiries
CREATE POLICY website_insert_enquiry
ON public.enquiries
FOR INSERT
TO anon
WITH CHECK (true);
