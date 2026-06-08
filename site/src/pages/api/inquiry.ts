import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { notifyInquiry } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, company, email, phone, message } = body;

    if (!name?.trim()) {
      return json({ error: 'Name is required.' }, 400);
    }
    if (!email?.trim() || !isEmail(email)) {
      return json({ error: 'A valid email is required.' }, 400);
    }

    const { error } = await supabase.from('inquiries').insert({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || null,
      phone: phone?.trim() || null,
      message: message?.trim() || null,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return json({ error: 'Something went wrong. Please try again.' }, 500);
    }

    try {
      await notifyInquiry({
        name: name.trim(),
        email: email.trim(),
        company: company?.trim(),
        phone: phone?.trim(),
        message: message?.trim(),
      });
    } catch (e) {
      console.error('Email notification failed (data saved):', e);
    }

    return json({ success: true });
  } catch (err) {
    console.error('Inquiry endpoint error:', err);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
