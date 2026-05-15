-- Migration to add email field and update sources
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS email text;

-- Add comment to source column for clarity on expected values
COMMENT ON COLUMN enquiries.source IS 'popup | calculator | contact_form | landing_page | get_quote | whatsapp';
