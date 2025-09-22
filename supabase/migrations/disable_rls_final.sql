-- Disable RLS completely for the waitlist table
-- This is acceptable for a marketing site waitlist as it doesn't contain sensitive data

ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT INSERT ON waitlist TO anon;
GRANT INSERT ON waitlist TO authenticated;
GRANT SELECT ON waitlist TO anon;
GRANT SELECT ON waitlist TO authenticated;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity, forcerowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist';