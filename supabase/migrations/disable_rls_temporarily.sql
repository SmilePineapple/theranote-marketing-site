-- Temporarily disable RLS to test if the insert works
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

-- Check if there are any existing policies that might be conflicting
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'waitlist';