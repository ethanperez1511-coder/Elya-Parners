import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { notifyApplication } from '../../lib/email';

export const prerender = false;

function generateRefId(): string {
  return 'ELYA-' + Math.floor(100000 + Math.random() * 900000);
}

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

    // Upload signature
    let signatureUrl: string | null = null;
    const signatureData = get('signature');
    if (signatureData?.startsWith('data:image/png;base64,')) {
      const base64 = signatureData.replace('data:image/png;base64,', '');
      const buffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const path = `${refId}/signature.png`;
      const { error: sigErr } = await supabase.storage
        .from('uploads')
        .upload(path, buffer, { contentType: 'image/png' });
      if (!sigErr) {
        const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(path);
        signatureUrl = urlData.publicUrl;
      } else {
        console.error('Signature upload error:', sigErr);
      }
    }

    // Upload bank statements
    const bankStatementUrls: string[] = [];
    const bankFiles = formData.getAll('bank_statements') as File[];
    for (const file of bankFiles) {
      if (file.size === 0) continue;
      const path = `${refId}/bank-statements/${file.name}`;
      const buffer = new Uint8Array(await file.arrayBuffer());
      const { error: fileErr } = await supabase.storage
        .from('uploads')
        .upload(path, buffer, { contentType: file.type });
      if (!fileErr) {
        const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(path);
        bankStatementUrls.push(urlData.publicUrl);
      } else {
        console.error('File upload error:', fileErr);
      }
    }

    const { error } = await supabase.from('applications').insert({
      ref_id: refId,
      legal_name: get('legal_name'),
      dba: get('dba'),
      ein: get('ein'),
      entity: get('entity'),
      amount: get('amount'),
      nature: get('nature'),
      product: get('product'),
      ownership_length: get('ownership_length'),
      incorp_date: get('incorp_date'),
      biz_street: get('biz_street'),
      biz_city: get('biz_city'),
      biz_state: get('biz_state'),
      biz_zip: get('biz_zip'),
      use_of_funds: get('use_of_funds'),
      credit_cards: get('credit_cards'),
      mca: get('mca'),
      owner_name: get('owner_name'),
      ssn: get('ssn'),
      dob: get('dob'),
      credit_score: get('credit_score'),
      home_street: get('home_street'),
      home_city: get('home_city'),
      home_state: get('home_state'),
      home_zip: get('home_zip'),
      email: get('email'),
      sign_date: get('sign_date'),
      signature_url: signatureUrl,
      bank_statement_urls: bankStatementUrls,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return json({ error: 'Something went wrong. Please try again.' }, 500);
    }

    try {
      await notifyApplication({
        ref_id: refId,
        legal_name: get('legal_name')!,
        owner_name: get('owner_name')!,
        email: get('email'),
        capital_amount: get('amount')!,
        nature_of_business: get('nature')!,
        signature_url: signatureUrl,
        bank_statement_urls: bankStatementUrls,
      });
    } catch (e) {
      console.error('Email notification failed (data saved):', e);
    }

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
