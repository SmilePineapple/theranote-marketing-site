-- Final attempt to fix RLS policies

-- First, let's see what policies currently exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'waitlist';

-- Drop ALL existing policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'waitlist') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON waitlist';
    END LOOP;
END $$;

-- Create the simplest possible policy
CREATE POLICY "waitlist_insert_policy" ON waitlist
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Grant permissions to public (which includes anon and authenticated)
GRANT INSERT ON waitlist TO public;
GRANT SELECT ON waitlist TO public;

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'waitlist';