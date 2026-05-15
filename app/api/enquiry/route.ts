import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client
// Ensure these environment variables are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: Request) {
  try {
    const { name, phone, email, city, typeOfSpace, source, details } = await request.json();

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json({ error: 'Full Name and Phone are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('enquiries')
      .insert({
        full_name: name,
        phone,
        email: email || null,
        city: city || 'Bhopal', // Default to Bhopal if not provided
        space_type: typeOfSpace,
        source: source || 'website',
        status: 'new',
        notes: typeof details === 'object' ? JSON.stringify(details) : details // Ensure details is stringified if it's an object
      })
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Enquiry submitted successfully!', data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
