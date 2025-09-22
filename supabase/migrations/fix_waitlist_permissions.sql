-- Fix waitlist table permissions for anon role
-- This allows anonymous users to insert into the waitlist table

-- Grant INSERT permission to anon role
GRANT INSERT ON waitlist TO anon;

-- Create a policy that allows anyone to insert into waitlist
CREATE POLICY "Allow anonymous waitlist submissions" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Verify permissions
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
  AND table_name = 'waitlist' 
  AND grantee IN ('anon', 'authenticated') 
ORDER BY table_name, grantee;