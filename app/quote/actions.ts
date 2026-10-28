"use server";

import { Resend } from "resend";
import {
  initialQuoteState,
  loadSizeLabel,
  quoteSchema,
  type LoadSize,
  type QuoteActionState,
  type QuoteFieldErrors,
} from "@/lib/quote-schema";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #E5E5E5;color:#525252;font-size:13px;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #E5E5E5;color:#0A0A0A;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
    </tr>
  `;
}

export async function submitQuote(
  _prevState: QuoteActionState,
  formData: FormData,
): Promise<QuoteActionState> {
  const raw = {
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    company: String(formData.get("company") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    address: String(formData.get("address") ?? ""),
    loadSize: String(formData.get("loadSize") ?? ""),
    description: String(formData.get("description") ?? ""),
    preferredDate: String(formData.get("preferredDate") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  // Honeypot — silently succeed so bots think it worked
  if (raw.website.trim().length > 0) {
    return {
      ok: true,
      message: "Thanks — we’ll be in touch shortly.",
    };
  }

  const parsed = quoteSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: QuoteFieldErrors = {};
    const flat = parsed.error.flatten().fieldErrors;
    for (const [key, messages] of Object.entries(flat)) {
      if (messages?.[0]) {
        fieldErrors[key as keyof QuoteFieldErrors] = messages[0];
      }
    }
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const toEmail = process.env.LEAD_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    console.error(
      "Missing RESEND_API_KEY or LEAD_TO_EMAIL environment variables.",
    );
    return {
      ok: false,
      message:
        "We couldn’t send your request right now. Please call us or try again shortly.",
      fieldErrors: { form: "Email service is not configured." },
    };
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const loadLabel = loadSizeLabel(data.loadSize as LoadSize);
  const subject = `New quote request — ${data.firstName} ${data.lastName} (${loadLabel})`;

  const html = `
    <div style="font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;background:#FAFAFA;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #E5E5E5;border-radius:12px;overflow:hidden;">
        <div style="background:#0A0A0A;padding:20px 24px;">
          <p style="margin:0;color:#FFFFFF;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;">ITZA Solutions LLC</p>
          <h1 style="margin:8px 0 0;color:#FFFFFF;font-size:22px;letter-spacing:-0.02em;">New quote request</h1>
        </div>
        <div style="padding:8px 12px 20px;">
          <table style="width:100%;border-collapse:collapse;">
            ${row("Submitted", `${submittedAt} CT`)}
            ${row("Name", `${data.firstName} ${data.lastName}`)}
            ${row("Company", data.company || "—")}
            ${row("Phone", data.phone)}
            ${row("Email", data.email)}
            ${row("Address / City", data.address)}
            ${row("Load size", loadLabel)}
            ${row("Preferred date", data.preferredDate || "Flexible / not specified")}
            ${row("Description", data.description)}
          </table>
        </div>
      </div>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    const leadResult = await resend.emails.send({
      from: `ITZA Solutions <${fromEmail}>`,
      to: [toEmail],
      replyTo: data.email,
      subject,
      html,
    });

    if (leadResult.error) {
      console.error("Resend lead email error:", leadResult.error);
      return {
        ok: false,
        message:
          "We couldn’t send your request right now. Please call us or try again shortly.",
        fieldErrors: { form: leadResult.error.message },
      };
    }

    // Best-effort confirmation to the customer — don't fail the lead if this errors
    try {
      await resend.emails.send({
        from: `ITZA Solutions <${fromEmail}>`,
        to: [data.email],
        subject: "We received your quote request — ITZA Solutions",
        html: `
          <div style="font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;color:#0A0A0A;line-height:1.6;">
            <p>Hi ${escapeHtml(data.firstName)},</p>
            <p>Thanks for reaching out to <strong>ITZA Solutions LLC</strong>. We received your request and will be in touch shortly.</p>
            <p style="color:#525252;">Load size noted: <strong>${escapeHtml(loadLabel)}</strong></p>
            <p>— ITZA Solutions<br/>Driveway-safe junk removal across DFW</p>
          </div>
        `,
      });
    } catch (confirmationError) {
      console.error("Customer confirmation email failed:", confirmationError);
    }

    return {
      ok: true,
      message: "Thanks — we’ll be in touch shortly.",
    };
  } catch (error) {
    console.error("Quote submission failed:", error);
    return {
      ...initialQuoteState,
      ok: false,
      message:
        "We couldn’t send your request right now. Please call us or try again shortly.",
    };
  }
}
