import type { APIRoute } from 'astro';
import { notifyApplication, generateRefId } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const get = (k: string) => (formData.get(k) as string | null)?.trim() || null;

    const required: Record<string, string> = {
      legal_name: 'Business Legal Name',
      ein: 'Tax ID / EIN',
      entity: 'Entity Type',
      amount: 'Capital Amount',
      nature: 'Nature of Business',
      biz_street: 'Business Street Address',
      biz_city: 'Business City',
      biz_state: 'Business State',
      biz_zip: 'Business Zip Code',
      use_of_funds: 'Use of Funds',
      owner_name: 'Owner Full Name',
      ssn: 'Social Security Number',
      dob: 'Date of Birth',
      credit_score: 'Credit Score',
      home_street: 'Home Street Address',
      home_city: 'Home City',
      home_state: 'Home State',
      home_zip: 'Home Zip Code',
      sign_date: 'Date',
    };

    for (const [key, label] of Object.entries(required)) {
      if (!get(key)) {
        return json({ error: `${label} is required.` }, 400);
      }
    }

    const agree = formData.get('agree') as string | null;
    if (agree !== 'on' && agree !== 'true') {
      return json({ error: 'You must agree to the authorization and consent.' }, 400);
    }

    const refId = generateRefId();

    await notifyApplication({
      ref_id: refId,
      legal_name: get('legal_name')!,
      owner_name: get('owner_name')!,
      email: get('email'),
      capital_amount: get('amount')!,
      nature_of_business: get('nature')!,
    });

    return json({ success: true, ref_id: refId });
  } catch (err) {
    console.error('Application endpoint error:', err);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
};

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
