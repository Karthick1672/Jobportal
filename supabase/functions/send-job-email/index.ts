import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RECIPIENT = "karthicknaren167@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: corsHeaders },
    );
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("JOB_NOTIFICATION_FROM");

  if (!apiKey || !from) {
    return Response.json(
      {
        error:
          "Email is not configured. Set RESEND_API_KEY and JOB_NOTIFICATION_FROM in Supabase secrets.",
      },
      { status: 500, headers: corsHeaders },
    );
  }

  let job: Record<string, unknown>;

  try {
    job = await req.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: corsHeaders },
    );
  }

  const title = String(job.title ?? "").trim();
  const company = String(job.company ?? "").trim();
  const description = String(job.description ?? "").trim();
  const applyLink = String(job.applyLink ?? "").trim();

  if (!title || !company || !description || !applyLink) {
    return Response.json(
      { error: "Required job details are missing." },
      { status: 400, headers: corsHeaders },
    );
  }

  let validApplyLink: string;

  try {
    const url = new URL(applyLink);

    if (!["https:", "http:"].includes(url.protocol)) {
      throw new Error("Invalid protocol");
    }

    validApplyLink = url.toString();
  } catch {
    return Response.json(
      { error: "Invalid application URL." },
      { status: 400, headers: corsHeaders },
    );
  }

  const fields = [
    ["Job ID", job.jobId],
    ["Company", company],
    ["Location", job.location],
    ["Job Type", job.type],
    ["Category", job.category],
    ["Salary", job.salary],
    ["Experience", job.experience],
    ["Passed Out Year", job.passout_year],
    ["Skills", job.skills],
    ["Posted At", job.postedAt],
  ];

  const detailsText = fields
    .map(([label, value]) => `${label}: ${String(value || "Not specified")}`)
    .join("\n");

  const detailsHtml = fields
    .map(
      ([label, value]) =>
        `<tr>
          <th align="left" style="padding:8px;border:1px solid #ddd">
            ${escapeHtml(label)}
          </th>
          <td style="padding:8px;border:1px solid #ddd">
            ${escapeHtml(value || "Not specified")}
          </td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222">
      <h2>JobNest — New Job Published</h2>
      <h3>${escapeHtml(title)}</h3>
      <table style="border-collapse:collapse;width:100%">
        ${detailsHtml}
      </table>
      <h3>Job Description</h3>
      <div style="white-space:pre-wrap">${escapeHtml(description)}</div>
      <h3>Official Application Link</h3>
      <p>
        <a href="${escapeHtml(validApplyLink)}">
          ${escapeHtml(validApplyLink)}
        </a>
      </p>
    </div>
  `;

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [RECIPIENT],
      subject: `JobNest: ${title} — ${company}`,
      text:
        `${title}\n${detailsText}\n\n` +
        `Job Description:\n${description}\n\n` +
        `Apply Link: ${validApplyLink}`,
      html,
    }),
  });

  if (!emailResponse.ok) {
    const errorDetails = await emailResponse.text();
    console.error("Resend error:", errorDetails);

    return Response.json(
      { error: "Email provider could not send the notification." },
      { status: 502, headers: corsHeaders },
    );
  }

  return Response.json(
    { success: true },
    { status: 200, headers: corsHeaders },
  );
});
