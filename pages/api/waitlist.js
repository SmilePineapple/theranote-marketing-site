import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  console.log('🚀 Waitlist API endpoint called:', req.method);
  
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, practice, role, interests } = req.body;
    
    console.log('📝 Received waitlist data:', { name, email, practice, role, interests });

    // Validate required fields
    if (!name || !email) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Insert into Supabase (let database handle created_at with default value)
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          name,
          email,
          practice,
          role,
          interests: interests || []
          // source and created_at will use default values
        }
      ])
      .select();

    if (error) {
      console.error('❌ Supabase error:', error);
      
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email already registered for waitlist' });
      }
      
      return res.status(500).json({ error: 'Failed to join waitlist' });
    }

    console.log('✅ Waitlist entry created:', data);
    
    res.status(201).json({ 
      success: true, 
      message: 'Successfully joined waitlist',
      id: data[0]?.id
    });
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}