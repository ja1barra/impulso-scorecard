// Vercel Function: recibe el lead del Scorecard y envía el reporte por correo con Resend.
// Variables de entorno (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY     (requerida)  API key de Resend
//   LEAD_NOTIFY_EMAIL  (requerida)  correo(s) que reciben el reporte, separados por coma
//   LEAD_FROM_EMAIL    (opcional)   remitente; por defecto el de pruebas de Resend

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { RESEND_API_KEY, LEAD_NOTIFY_EMAIL, LEAD_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LEAD_NOTIFY_EMAIL) {
    return res.status(500).json({ error: 'Email not configured' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const subject = String(body.report_subject || 'Nuevo Scorecard completado').slice(0, 200);
  const text = String(body.report_text || '').slice(0, 20000);
  if (!text) return res.status(400).json({ error: 'Missing report_text' });

  const replyTo = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(body.contact_email || '') ? body.contact_email : undefined;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: LEAD_FROM_EMAIL || 'Scorecard Impulso <onboarding@resend.dev>',
      to: LEAD_NOTIFY_EMAIL.split(',').map(s => s.trim()).filter(Boolean),
      reply_to: replyTo,
      subject,
      text,
      html: `<pre style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(text)}</pre>`
    })
  });

  if (!r.ok) {
    console.error('Resend error', r.status, await r.text());
    return res.status(502).json({ error: 'Email provider error' });
  }
  return res.status(200).json({ ok: true });
};
