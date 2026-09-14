import { createClient } from "@supabase/supabase-js";

const staticPages = [
  "/",
  "/jobs",
  "/companies",
  "/categories",
  "/guides",
  "/guides/top-interview-questions-freshers-2026",
  "/guides/ats-friendly-resume-guide",
  "/guides/off-campus-job-hunting-strategy",
  "/resume-checker",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).send("Supabase environment variables are missing.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("id, created_at, updated_at")
    .order("id", { ascending: false });

  if (error) {
    console.error("Sitemap Supabase error:", error.message);
    return res.status(500).send("Unable to generate sitemap.");
  }

  const baseUrl = "https://jobnest.work";

  const staticUrls = staticPages
    .map(
      (path) => `
  <url>
    <loc>${escapeXml(`${baseUrl}${path}`)}</loc>
  </url>`
    )
    .join("");

  const jobUrls = (jobs || [])
    .map((job) => {
      const lastModified =
        job.updated_at ||
        job.created_at ||
        new Date().toISOString();

      return `
  <url>
    <loc>${escapeXml(`${baseUrl}/jobs/${job.id}`)}</loc>
    <lastmod>${new Date(lastModified).toISOString()}</lastmod>
  </url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${jobUrls}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "s-maxage=3600, stale-while-revalidate=86400"
  );

  return res.status(200).send(sitemap);
}