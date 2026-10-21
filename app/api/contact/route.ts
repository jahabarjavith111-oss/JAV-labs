import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";
import {
  clientReplyEmail,
  logoAttachment,
  ownerNotificationEmail,
} from "@/lib/email-templates";
import {
  validateContactForm,
  type ContactFormData,
} from "@/lib/validation";

/**
 * Contact form endpoint — sends mail over Gmail SMTP (Google App Password).
 *
 * Behavior:
 *  - validates input server-side (in addition to client validation)
 *  - silently accepts honeypot submissions (bot trap)
 *  - emails the studio a full notification AND auto-replies to the client
 *    when SMTP_PASS is configured
 *  - returns `configured: false` when it is not, so the client can show
 *    an honest fallback instead of pretending the message was sent
 */
export async function POST(request: Request) {
  let data: ContactFormData;

  try {
    const body = (await request.json()) as Partial<ContactFormData>;
    data = {
      name: String(body.name ?? ""),
      email: String(body.email ?? ""),
      company: String(body.company ?? ""),
      country: String(body.country ?? ""),
      projectType: String(body.projectType ?? ""),
      budget: String(body.budget ?? ""),
      timeline: String(body.timeline ?? ""),
      message: String(body.message ?? ""),
      reference: String(body.reference ?? ""),
      website: String(body.website ?? ""),
    };
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (data.website.trim().length > 0) {
    return Response.json({ ok: true });
  }

  const errors = validateContactForm(data);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER ?? siteConfig.email;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);

  if (!smtpPass) {
    return Response.json({ ok: false, configured: false });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const from = `"JAV Digital Engineering Studio" <${smtpUser}>`;

  try {
    const inquiry = {
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company.trim(),
      country: data.country.trim(),
      projectType: data.projectType,
      budget: data.budget,
      timeline: data.timeline,
      message: data.message.trim(),
    };

    // 1. Notification to the studio — reply-to goes straight to the client.
    const notification = ownerNotificationEmail(inquiry);
    await transporter.sendMail({
      from,
      to: process.env.CONTACT_NOTIFY_EMAIL ?? siteConfig.email,
      replyTo: { name: inquiry.name, address: inquiry.email },
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      attachments: [logoAttachment],
    });

    // 2. Auto-reply to the client — best effort; the inquiry is already saved.
    try {
      const reply = clientReplyEmail(inquiry);
      await transporter.sendMail({
        from,
        to: inquiry.email,
        subject: reply.subject,
        html: reply.html,
        text: reply.text,
        attachments: [logoAttachment],
      });
    } catch {
      // Notification delivered; client reply can fail without failing the form.
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
