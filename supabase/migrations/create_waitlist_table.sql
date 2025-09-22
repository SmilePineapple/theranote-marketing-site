-- Create waitlist table for marketing site signups
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    practice TEXT,
    role TEXT,
    interests TEXT[] DEFAULT '{}',
    source TEXT DEFAULT 'marketing_site',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for waitlist signup)
CREATE POLICY "Allow public waitlist signup" ON public.waitlist
    FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to read all waitlist entries
CREATE POLICY "Allow authenticated read" ON public.waitlist
    FOR SELECT USING (auth.role() = 'authenticated');

-- Grant permissions to anon role for inserts
GRANT INSERT ON public.waitlist TO anon;

-- Grant all permissions to authenticated role
GRANT ALL ON public.waitlist TO authenticated;

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_updated_at BEFORE UPDATE ON public.waitlist
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();