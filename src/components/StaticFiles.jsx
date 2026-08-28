import { useEffect } from "react";

export function RobotsTxt() {
  useEffect(() => {
    document.title = "robots.txt";
  }, []);

  return (
    <pre style={{ margin: 0, padding: 20, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
{`User-agent: *
Allow: /

Sitemap: https://jobnest.work/sitemap.xml`}
    </pre>
  );
}

export function SitemapXml() {
  useEffect(() => {
    document.title = "sitemap.xml";
  }, []);

  return (
    <pre style={{ margin: 0, padding: 20, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jobnest.work/</loc>
    <lastmod>2026-08-27</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://jobnest.work/jobs</loc>
    <lastmod>2026-08-27</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`}
    </pre>
  );
}

export function AdsTxt() {
  return (
    <pre style={{ margin: 0, padding: 20, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
{`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`}
    </pre>
  );
}