-- Drop existing policies and create a proper one for waitlist submissions

-- First, drop any existing policies
DROP POLICY IF EXISTS "Allow anonymous waitlist submissions" ON waitlist;
DROP POLICY IF EXISTS "Users can insert their own waitlist entries" ON waitlist;

-- Create a simple policy that allows all inserts for anonymous users
CREATE POLICY "Enable insert for anon users" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users" ON waitlist
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Grant necessary permissions
GRANT INSERT ON waitlist TO anon;
GRANT INSERT ON waitlist TO authenticated;

-- Check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'waitlist';