import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Initialize Resend (Email Service)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, phone, email, city, typeOfSpace, source, details, budget, status, whatsapp_opt_in } = body;

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json({ error: 'Full Name and Phone are required' }, { status: 400 });
    }

    const payload: any = {
      full_name: name,
      phone,
      email: email || null,
      city: city || 'Bhopal', 
      space_type: typeOfSpace || body.space_type,
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

    // 1. Save to Supabase
    const { data, error } = await supabase
      .from('enquiries')
      .upsert(payload, { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Send Email Notification to Admin
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Grospace Leads <onboarding@resend.dev>', // Update this with your verified domain later
          to: ['grospaceinteriors@gmail.com'],
          subject: `New Lead: ${name} (${source || 'Website'})`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #222; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #ee6669;">New Interior Enquiry</h2>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email || 'Not provided'}</p>
                <p><strong>Source:</strong> ${source || 'Website'}</p>
                <p><strong>Space Type:</strong> ${typeOfSpace || payload.space_type || 'Not Specified'}</p>
                <p><strong>Budget:</strong> ${budget || 'Not Specified'}</p>
                <p><strong>City:</strong> ${city || 'Bhopal'}</p>
                ${details?.message ? `<p><strong>Message:</strong> ${details.message}</p>` : ''}
              </div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><small style="color: #888;">Lead generated from Grospace Interiors Website. View more details in your Supabase dashboard.</small></p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }

    return NextResponse.json({ message: 'Enquiry submitted successfully!', data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
