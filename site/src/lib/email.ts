import nodemailer from 'nodemailer';

const SMTP_USER = import.meta.env.SMTP_USER;
const SMTP_PASS = import.meta.env.SMTP_PASS;
const NOTIFY_TO = import.meta.env.NOTIFY_EMAIL || SMTP_USER;

if (!SMTP_USER || !SMTP_PASS) {
  console.warn('SMTP credentials not set — email notifications disabled.');
}

const transporter = SMTP_USER && SMTP_PASS
  ? nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

/** Send inquiry notification */
export async function notifyInquiry(fields: {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  message?: string | null;
}) {
  if (!transporter) return;
  await transporter.sendMail({
    from: `"Elya Partners" <${SMTP_USER}>`,
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

/** Send application notification */
export async function notifyApplication(fields: {
  ref_id: string;
  legal_name: string;
  owner_name: string;
  email?: string | null;
  capital_amount: string;
  nature_of_business: string;
}) {
  if (!transporter) return;
  await transporter.sendMail({
    from: `"Elya Partners" <${SMTP_USER}>`,
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

/** Generate a reference ID like ELYA-839201 */
export function generateRefId(): string {
  return 'ELYA-' + Math.floor(100000 + Math.random() * 900000);
}
