/**
 * HTML email templates for the contact form.
 *
 * Two emails go out on every submission:
 *  1. Owner notification — full inquiry details, reply-to the client
 *  2. Client auto-reply — thank-you + summary of their inquiry
 *
 * All user input is HTML-escaped. The JAV logo is embedded inline
 * (cid attachment) so it renders even without an external fetch.
 */

import path from "node:path";
import { siteConfig } from "@/lib/site-config";

export type InquiryData = {
  name: string;
  email: string;
  company: string;
  country: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

/** Escape user-supplied text before it enters HTML. */
function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function provided(value: string): string {
  const trimmed = value.trim();
  return trimmed ? esc(trimmed) : "Not provided";
}

const BRAND = "#102a43";
const ACCENT = "#0069de";
const TEXT = "#334155";
const MUTED = "#64748b";
const LINE = "#e2e4e7";

/** Shared shell — navy header with the JAV logo, then body, then footer. */
function layout(bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f4f2ec;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f2ec;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${LINE};">
            <!-- Header with logo — full-bleed banner, edge to edge -->
            <tr>
              <td style="background-color:#000000;padding:0;text-align:center;">
                <img src="cid:jav-logo@jav.digital" alt="JAV Digital Engineering Studio" width="600" height="301" style="display:block;margin:0 auto;width:100%;max-width:600px;height:auto;border:0;" />
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:36px 36px 8px 36px;font-size:15px;line-height:1.65;color:${TEXT};">
${bodyHtml}
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:24px 36px 34px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-top:1px solid ${LINE};padding-top:18px;font-size:12.5px;color:${MUTED};line-height:1.7;">
                      <strong style="color:${BRAND};">JAV Digital Engineering Studio</strong> · Independent Software Developer<br />
                      <a href="mailto:${siteConfig.email}" style="color:${ACCENT};text-decoration:none;">${siteConfig.email}</a><br />
                      This email was sent by the JAV website contact form.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function heading(text: string): string {
  return `<h2 style="margin:0 0 18px 0;font-size:20px;color:${BRAND};letter-spacing:-0.01em;">${text}</h2>`;
}

function sectionLabel(text: string): string {
  return `<p style="margin:26px 0 10px 0;font-size:12px;font-weight:bold;letter-spacing:0.14em;text-transform:uppercase;color:${ACCENT};">${text}</p>`;
}

function row(label: string, valueHtml: string): string {
  return `<tr>
                <td style="padding:7px 0;font-size:14px;color:${MUTED};width:170px;vertical-align:top;">${label}</td>
                <td style="padding:7px 0;font-size:14px;color:${TEXT};vertical-align:top;">${valueHtml}</td>
              </tr>`;
}

/** Email 1 — notification to the studio inbox. */
export function ownerNotificationEmail(data: InquiryData) {
  const subject = `New project inquiry — ${data.projectType} — ${data.name}`;

  const html = layout(`
${heading("Hi JAV,")}
                <p style="margin:0;">You have received a new project inquiry through your website.</p>
${sectionLabel("Client Details")}
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                  ${row("Name", esc(data.name))}
                  ${row("Email", `<a href="mailto:${esc(data.email)}" style="color:${ACCENT};text-decoration:none;">${esc(data.email)}</a>`)}
                  ${row("Company", provided(data.company))}
                  ${row("Country", provided(data.country))}
                  ${row("Project Type", esc(data.projectType))}
                  ${row("Budget", esc(data.budget))}
                  ${row("Expected Timeline", esc(data.timeline))}
                </table>
${sectionLabel("Project Description")}
                <p style="margin:0;white-space:pre-wrap;border-left:3px solid ${ACCENT};padding:4px 0 4px 16px;">${esc(data.message)}</p>
${sectionLabel("Next Steps")}
                <p style="margin:0;">Review the inquiry and contact the client at <a href="mailto:${esc(data.email)}" style="color:${ACCENT};text-decoration:none;">${esc(data.email)}</a> to discuss their requirements.</p>
                <p style="margin:22px 0 0 0;font-size:13px;color:${MUTED};">This notification was automatically generated by your JAV website contact form.</p>
                <p style="margin:18px 0 0 0;">Best regards,<br /><strong>JAV Website Notification System</strong><br />Independent Software Developer</p>
  `);

  const text = [
    "Hi JAV,",
    "",
    "You have received a new project inquiry through your website.",
    "",
    "CLIENT DETAILS",
    `- Name: ${data.name}`,
    `- Email: ${data.email}`,
    `- Company: ${data.company || "Not provided"}`,
    `- Country: ${data.country || "Not provided"}`,
    `- Project Type: ${data.projectType}`,
    `- Budget: ${data.budget}`,
    `- Expected Timeline: ${data.timeline}`,
    "",
    "PROJECT DESCRIPTION",
    data.message,
    "",
    "NEXT STEPS",
    `Review the inquiry and contact the client at ${data.email} to discuss their requirements.`,
    "",
    "This notification was automatically generated by your JAV website contact form.",
    "",
    "Best regards,",
    "JAV Website Notification System",
    "Independent Software Developer",
  ].join("\n");

  return { subject, html, text };
}

/** Email 2 — automatic reply to the client. */
export function clientReplyEmail(data: InquiryData) {
  const subject = "Thanks — JAV received your project inquiry";

  const html = layout(`
${heading(`Hi ${esc(data.name)},`)}
                <p style="margin:0 0 16px 0;">Thank you for reaching out to JAV!</p>
                <p style="margin:0 0 16px 0;">I've successfully received your project inquiry and appreciate your interest in working with me.</p>
                <p style="margin:0 0 16px 0;">I work with businesses and entrepreneurs worldwide to build professional websites, full-stack applications, AI-powered solutions, and custom software.</p>
                <p style="margin:0;">I'll review your requirements and get back to you to discuss your project, goals, and next steps.</p>
${sectionLabel("Here's a quick summary of your inquiry")}
                <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
                  ${row("Project Type", esc(data.projectType))}
                  ${row("Budget", esc(data.budget))}
                  ${row("Expected Timeline", esc(data.timeline))}
                </table>
                <p style="margin:26px 0 0 0;">If there's anything else you'd like to share about your project, feel free to reply directly to this email.</p>
                <p style="margin:18px 0 0 0;">I'm looking forward to learning more about your idea and exploring how I can help bring it to life.</p>
                <p style="margin:18px 0 0 0;">Best regards,<br /><strong>JAV</strong><br />Independent Software Developer<br />
                  <a href="mailto:${siteConfig.email}" style="color:${ACCENT};text-decoration:none;">${siteConfig.email}</a>
                </p>
  `);

  const text = [
    `Hi ${data.name},`,
    "",
    "Thank you for reaching out to JAV!",
    "",
    "I've successfully received your project inquiry and appreciate your interest in working with me.",
    "",
    "I work with businesses and entrepreneurs worldwide to build professional websites, full-stack applications, AI-powered solutions, and custom software.",
    "",
    "I'll review your requirements and get back to you to discuss your project, goals, and next steps.",
    "",
    "HERE'S A QUICK SUMMARY OF YOUR INQUIRY",
    `- Project Type: ${data.projectType}`,
    `- Budget: ${data.budget}`,
    `- Expected Timeline: ${data.timeline}`,
    "",
    "If there's anything else you'd like to share about your project, feel free to reply directly to this email.",
    "",
    "I'm looking forward to learning more about your idea and exploring how I can help bring it to life.",
    "",
    "Best regards,",
    "JAV",
    "Independent Software Developer",
    siteConfig.email,
  ].join("\n");

  return { subject, html, text };
}

/** Inline logo attachment shared by both emails (cropped to content, black bg matching the header). */
export const logoAttachment = {
  filename: "jav-logo.png",
  path: path.join(process.cwd(), "public", "images", "logo-email.png"),
  cid: "jav-logo@jav.digital",
  contentDisposition: "inline",
} as const;
