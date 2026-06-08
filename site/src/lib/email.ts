import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const NOTIFY_TO = import.meta.env.NOTIFY_EMAIL || 'deals@fairmontcp.net';

export async function notifyInquiry(fields: {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  message?: string | null;
}) {
  await resend.emails.send({
    from: 'Elya Partners <onboarding@resend.dev>',
    to: NOTIFY_TO,
    subject: `New Inquiry — ${fields.name}`,
    text: [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      fields.company ? `Company: ${fields.company}` : null,
      fields.phone ? `Phone: ${fields.phone}` : null,
      fields.message ? `\nMessage:\n${fields.message}` : null,
    ].filter(Boolean).join('\n'),
  });
}

export async function notifyApplication(fields: {
  ref_id: string;
  legal_name: string;
  owner_name: string;
  email?: string | null;
  capital_amount: string;
  nature_of_business: string;
}) {
  await resend.emails.send({
    from: 'Elya Partners <onboarding@resend.dev>',
    to: NOTIFY_TO,
    subject: `New Application ${fields.ref_id} — ${fields.legal_name}`,
    text: [
      `Reference: ${fields.ref_id}`,
      `Business: ${fields.legal_name}`,
      `Owner: ${fields.owner_name}`,
      fields.email ? `Email: ${fields.email}` : null,
      `Capital Requested: ${fields.capital_amount}`,
      `Nature: ${fields.nature_of_business}`,
    ].filter(Boolean).join('\n'),
  });
}
