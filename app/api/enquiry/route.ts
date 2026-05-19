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
    const { id, name, phone, email, city, typeOfSpace, source, details, budget, status, whatsapp_opt_in } = await request.json();

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json({ error: 'Full Name and Phone are required' }, { status: 400 });
    }

    const payload: any = {
      full_name: name,
      phone,
      email: email || null,
      city: city || 'Bhopal', 
      space_type: typeOfSpace,
      source: source || 'website',
      budget_range: budget || null,
      status: status || 'new',
      details: details || {},
      whatsapp_opt_in: whatsapp_opt_in !== undefined ? whatsapp_opt_in : true,
      updated_at: new Date().toISOString()
    };

    // If ID is provided, include it for upsert
    if (id) {
      payload.id = id;
    }

    const { data, error } = await supabase
      .from('enquiries')
      .upsert(payload, { onConflict: 'id' })
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
