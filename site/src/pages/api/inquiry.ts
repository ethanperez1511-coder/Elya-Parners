import type { APIRoute } from 'astro';
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

    await notifyInquiry({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim(),
      phone: phone?.trim(),
      message: message?.trim(),
    });

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
