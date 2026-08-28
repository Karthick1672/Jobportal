declare const Deno: any;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    if (!url) {
      return new Response(JSON.stringify({ error: "Job URL is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY secret is not set in Supabase." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Fetch text content via Jina Reader
    let pageText = "";
    try {
      const response = await fetch(`https://r.jina.ai/${encodeURI(url)}`, {
        headers: {
          "Accept": "text/plain",
          "X-Wait-For-Selector": "h1, h2, .job-description, main, body",
          "X-Timeout": "10",
        },
      });
      if (response.ok) {
        pageText = await response.text();
      }
    } catch (_) {}

    // Strategy 2: Direct fallback if empty
    if (!pageText || pageText.trim().length < 300) {
      try {
        const directRes = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          },
        });
        const html = await directRes.text();
        pageText = html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ");
      } catch (_) {}
    }

    const cleanContent = pageText.slice(0, 14000);

    // 2. Query Gemini 3.6 Flash
    const prompt = `
You are an intelligent recruitment parser. Analyze the given job listing webpage content and URL.
Extract the job information into a structured JSON object.

Source URL: ${url}

Web Content:
${cleanContent}

Rules:
1. "title": Job title (e.g., Young Graduate Trainee). If not explicit, derive from heading or URL.
2. "company": Company name (e.g., Infineon Technologies).
3. "location": City and Country (e.g., Bangalore, India or Remote).
4. "category": Choose from: ["IT & Software", "Engineering", "Finance", "Marketing"].
5. "type": Choose from: ["Full Time", "Part Time", "Contract", "Internship"].
6. "experience": Experience required (e.g., "0-1 Year", "Freshers", "0-2 Years").
7. "salary": Expected salary range or empty string if not found.
8. "passout_year": Relevant batch year (e.g., "2025", "2026") or empty string.
9. "skills": Comma-separated top 4-6 key skills.
10. "description": A comprehensive summary of the role, responsibilities, and requirements.

Return ONLY a valid JSON object matching this schema:
{
  "title": "",
  "company": "",
  "location": "",
  "category": "Engineering",
  "type": "Full Time",
  "experience": "0-1 Year",
  "salary": "",
  "passout_year": "",
  "skills": "",
  "description": ""
}
`;

    const aiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            response_mime_type: "application/json",
            temperature: 0.1,
          },
        }),
      }
    );

    const aiJson = await aiRes.json();

    if (aiJson.error) {
      return new Response(
        JSON.stringify({ error: `Gemini API: ${aiJson.error.message}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const rawOutput = aiJson.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const parsedData = JSON.parse(rawOutput);

    return new Response(JSON.stringify(parsedData), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});