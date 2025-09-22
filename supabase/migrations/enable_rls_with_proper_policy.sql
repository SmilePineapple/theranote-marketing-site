-- Re-enable RLS and create a working policy
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies first
DROP POLICY IF EXISTS "Enable insert for anon users" ON waitlist;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous waitlist submissions" ON waitlist;
DROP POLICY IF EXISTS "Users can insert their own waitlist entries" ON waitlist;

-- Create a simple policy that allows all inserts (no conditions)
CREATE POLICY "Allow all inserts" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Grant necessary permissions to both roles
GRANT INSERT ON waitlist TO anon;
GRANT INSERT ON waitlist TO authenticated;

-- Also grant SELECT permissions for reading (if needed)
GRANT SELECT ON waitlist TO anon;
GRANT SELECT ON waitlist TO authenticated;