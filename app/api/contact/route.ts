import {
  validateContactForm,
  type ContactFormData,
} from "@/lib/validation";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Contact form endpoint.
 *
 * Behavior:
 *  - validates input server-side (in addition to client validation)
 *  - silently accepts honeypot submissions (bot trap)
 *  - forwards to Web3Forms when WEB3FORMS_ACCESS_KEY is configured
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

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return Response.json({ ok: false, configured: false });
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New project inquiry — ${data.projectType} — ${data.name}`,
        from_name: "Portfolio website",
        name: data.name,
        email: data.email,
        company: data.company,
        project_type: data.projectType,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        reference: data.reference,
        page: "/contact",
      }),
    });

    if (!response.ok) {
      return Response.json({ ok: false }, { status: 502 });
    }

    const result = (await response.json()) as { success?: boolean };
    if (!result.success) {
      return Response.json({ ok: false }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
