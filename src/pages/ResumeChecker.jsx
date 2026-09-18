import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const skillList = [
  "javascript",
  "typescript",
  "react",
  "react.js",
  "node.js",
  "node",
  "html",
  "css",
  "bootstrap",
  "python",
  "java",
  "c",
  "c++",
  "c#",
  "php",
  "sql",
  "mysql",
  "postgresql",
  "mongodb",
  "firebase",
  "supabase",
  "git",
  "github",
  "rest api",
  "api",
  "express",
  "django",
  "flask",
  "spring boot",
  "aws",
  "azure",
  "docker",
  "kubernetes",
  "linux",
  "redux",
  "next.js",
  "vite",
  "figma",
  "unity",
  "unreal engine",
  "machine learning",
  "data analysis",
  "power bi",
  "excel",
  "communication",
  "problem solving",
  "leadership",
  "agile",
  "scrum",
];

export const ResumeChecker = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // -------------------------------------------------------
  // EXTRACT PDF TEXT
  // -------------------------------------------------------

  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");

      text += `${pageText} `;
    }

    return text;
  };

  // -------------------------------------------------------
  // EXTRACT DOCX TEXT
  // -------------------------------------------------------

  const extractDocxText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const docxResult = await mammoth.extractRawText({
      arrayBuffer,
    });

    return docxResult.value;
  };

  // -------------------------------------------------------
  // EXTRACT RESUME
  // -------------------------------------------------------

  const extractResumeText = async (file) => {
    const extension = file.name.split(".").pop().toLowerCase();

    if (extension === "pdf") {
      return extractPdfText(file);
    }

    if (extension === "docx") {
      return extractDocxText(file);
    }

    throw new Error("Only PDF and DOCX files are supported.");
  };

  // -------------------------------------------------------
  // CLEAN TEXT
  // -------------------------------------------------------

  const cleanText = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s+#.-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // -------------------------------------------------------
  // SKILL DETECTION
  // -------------------------------------------------------

  const detectSkills = (text) => {
    const cleaned = cleanText(text);

    return skillList.filter((skill) =>
      cleaned.includes(skill.toLowerCase()),
    );
  };

  // -------------------------------------------------------
  // KEYWORD EXTRACTION
  // -------------------------------------------------------

  const getKeywords = (text) => {
    const stopWords = new Set([
      "the",
      "and",
      "for",
      "with",
      "this",
      "that",
      "from",
      "your",
      "you",
      "our",
      "are",
      "will",
      "have",
      "has",
      "job",
      "role",
      "work",
      "working",
      "candidate",
      "required",
      "requirements",
      "skills",
      "experience",
      "years",
      "good",
      "strong",
      "ability",
      "knowledge",
      "team",
      "using",
      "into",
      "who",
      "their",
      "they",
      "them",
      "about",
      "must",
      "should",
      "can",
      "be",
      "to",
      "of",
      "in",
      "on",
      "a",
      "an",
      "is",
      "as",
      "at",
      "or",
      "we",
      "it",
      "by",
      "any",
      "all",
      "more",
      "than",
      "also",
      "such",
      "other",
      "responsibilities",
      "responsibility",
      "preferred",
      "qualification",
      "qualifications",
      "position",
      "company",
    ]);

    const words = cleanText(text).split(" ");

    const frequency = {};

    words.forEach((word) => {
      if (
        word.length >= 3 &&
        !stopWords.has(word) &&
        !/^\d+$/.test(word)
      ) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word]) => word);
  };

  // -------------------------------------------------------
  // CALCULATE RESULT
  // -------------------------------------------------------

  const calculateResult = (resumeText, jdText) => {
    const cleanedResume = cleanText(resumeText);

    const jdKeywords = getKeywords(jdText);

    const matchedKeywords = jdKeywords.filter((keyword) =>
      cleanedResume.includes(keyword),
    );

    const missingKeywords = jdKeywords.filter(
      (keyword) => !cleanedResume.includes(keyword),
    );

    const keywordScore =
      jdKeywords.length > 0
        ? Math.round(
            (matchedKeywords.length / jdKeywords.length) * 100,
          )
        : 0;

    const resumeSkills = detectSkills(resumeText);
    const jobSkills = detectSkills(jdText);

    const matchedSkills = jobSkills.filter((skill) =>
      resumeSkills.includes(skill),
    );

    const missingSkills = jobSkills.filter(
      (skill) => !resumeSkills.includes(skill),
    );

    const skillScore =
      jobSkills.length > 0
        ? Math.round(
            (matchedSkills.length / jobSkills.length) * 100,
          )
        : 100;

    const sections = {
      summary:
        cleanedResume.includes("summary") ||
        cleanedResume.includes("profile") ||
        cleanedResume.includes("objective"),

      experience:
        cleanedResume.includes("experience") ||
        cleanedResume.includes("employment") ||
        cleanedResume.includes("work history"),

      education:
        cleanedResume.includes("education") ||
        cleanedResume.includes("academic"),

      skills:
        cleanedResume.includes("skills") ||
        cleanedResume.includes("technical skills"),

      projects:
        cleanedResume.includes("project") ||
        cleanedResume.includes("projects"),

      contact:
        resumeText.includes("@") &&
        /\d{10}/.test(resumeText.replace(/\D/g, "")),
    };

    const sectionValues = Object.values(sections);

    const sectionScore = Math.round(
      (sectionValues.filter(Boolean).length /
        sectionValues.length) *
        100,
    );

    const overallScore = Math.round(
      keywordScore * 0.4 +
        skillScore * 0.4 +
        sectionScore * 0.2,
    );

    let matchStatus = "Needs Improvement";

    if (overallScore >= 80) {
      matchStatus = "Strong Match";
    } else if (overallScore >= 65) {
      matchStatus = "Good Match";
    } else if (overallScore >= 50) {
      matchStatus = "Moderate Match";
    }

    const suggestions = [];

    if (!sections.summary) {
      suggestions.push(
        "Add a professional summary or career objective near the top of your resume.",
      );
    }

    if (!sections.experience) {
      suggestions.push(
        "Add a clearly labelled Experience or Work History section.",
      );
    }

    if (!sections.education) {
      suggestions.push(
        "Add a clearly labelled Education section.",
      );
    }

    if (!sections.skills) {
      suggestions.push(
        "Add a dedicated Skills or Technical Skills section.",
      );
    }

    if (!sections.projects) {
      suggestions.push(
        "Consider adding relevant projects that demonstrate your abilities.",
      );
    }

    if (!sections.contact) {
      suggestions.push(
        "Make sure your resume contains a valid email address and phone number.",
      );
    }

    if (keywordScore < 50) {
      suggestions.push(
        "Your keyword match is low. Review the job description and include relevant terms that genuinely match your experience.",
      );
    }

    if (skillScore < 60 && missingSkills.length > 0) {
      suggestions.push(
        "Your skills match is low. Review the missing skills and add only the ones you truly know.",
      );
    }

    if (missingKeywords.length > 0) {
      suggestions.push(
        "Review the missing keywords below and include relevant ones where appropriate.",
      );
    }

    return {
      overallScore,
      keywordScore,
      skillScore,
      sectionScore,
      matchStatus,
      matchedKeywords,
      missingKeywords,
      resumeSkills,
      jobSkills,
      matchedSkills,
      missingSkills,
      sections,
      suggestions,
    };
  };

  // -------------------------------------------------------
  // CHECK RESUME
  // -------------------------------------------------------

  const handleCheckResume = async () => {
    setError("");
    setResult(null);

    if (!resumeFile) {
      setError("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    try {
      setLoading(true);

      const resumeText =
        await extractResumeText(resumeFile);

      if (!resumeText.trim()) {
        throw new Error(
          "No readable text was found in the resume.",
        );
      }

      const analysis = calculateResult(
        resumeText,
        jobDescription,
      );

      setResult(analysis);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Something went wrong while checking your resume.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getScoreClass = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";

    return "text-danger";
  };

  const getProgressClass = (score) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-primary";
    if (score >= 40) return "bg-warning";

    return "bg-danger";
  };

  return (
    <>
      {/* SEO */}

      <Helmet>
        <title>
          Free ATS Resume Checker & Job Match Tool | JobNest
        </title>

        <meta
          name="description"
          content="Compare your resume with a job description and identify matching keywords, skills, important resume sections and possible improvements with JobNest's free resume checker."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://jobnest.work/resume-checker"
        />

        <meta
          property="og:title"
          content="Free Resume Checker & Job Match Tool | JobNest"
        />

        <meta
          property="og:description"
          content="Compare your resume with a job description and identify matching skills, missing keywords and important resume sections."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://jobnest.work/resume-checker"
        />

        <meta
          property="og:site_name"
          content="JobNest"
        />
      </Helmet>

      <main className="container py-5">

        {/* HERO */}

        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
            Free Resume Analysis
          </span>

          <h1 className="fw-bold mb-3">
            Resume & Job Match Checker
          </h1>

          <p
            className="text-muted mx-auto"
            style={{ maxWidth: "750px" }}
          >
            Upload your resume and paste a job description
            to compare important keywords, skills and common
            resume sections before you apply.
          </p>
        </div>

        {/* CHECKER */}

        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">

            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4">

              <div className="row g-4">

                {/* FILE */}

                <div className="col-lg-5">
                  <label className="form-label fw-bold">
                    Upload Resume
                  </label>

                  <div className="border rounded-4 p-4 text-center bg-light">

                    <i
                      className="bi bi-file-earmark-person text-primary"
                      style={{ fontSize: "3rem" }}
                    ></i>

                    <h2 className="h5 mt-3">
                      Select your resume
                    </h2>

                    <p className="text-muted small">
                      PDF and DOCX files are supported.
                    </p>

                    <input
                      type="file"
                      className="form-control mt-3"
                      accept=".pdf,.docx"
                      onChange={(e) => {
                        setResumeFile(
                          e.target.files?.[0] || null,
                        );

                        setResult(null);
                        setError("");
                      }}
                    />

                    {resumeFile && (
                      <div className="alert alert-success mt-3 mb-0 py-2">
                        <i className="bi bi-check-circle me-2"></i>
                        {resumeFile.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* JOB DESCRIPTION */}

                <div className="col-lg-7">
                  <label className="form-label fw-bold">
                    Job Description
                  </label>

                  <textarea
                    className="form-control rounded-3"
                    rows="12"
                    placeholder="Paste the complete job description here..."
                    value={jobDescription}
                    onChange={(e) =>
                      setJobDescription(e.target.value)
                    }
                  />
                </div>
              </div>

              {error && (
                <div className="alert alert-danger mt-4 mb-0">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}

              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-primary btn-lg w-100 rounded-3"
                  onClick={handleCheckResume}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>

                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search me-2"></i>
                      Check My Resume
                    </>
                  )}
                </button>
              </div>

              <p className="text-muted text-center small mt-3 mb-0">
                Your resume is processed directly in your
                browser.
              </p>
            </div>

            {/* RESULTS */}

            {result && (
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">

                <div className="text-center mb-5">
                  <h2 className="fw-bold mb-4">
                    Resume Analysis
                  </h2>

                  <div
                    className="mx-auto d-flex align-items-center justify-content-center rounded-circle border border-5 border-primary"
                    style={{
                      width: "165px",
                      height: "165px",
                    }}
                  >
                    <div>
                      <div
                        className={`display-5 fw-bold mb-0 ${getScoreClass(
                          result.overallScore,
                        )}`}
                      >
                        {result.overallScore}
                      </div>

                      <span className="text-muted">
                        out of 100
                      </span>
                    </div>
                  </div>

                  <h3 className="h4 mt-4 fw-bold">
                    Resume-to-Job Match
                  </h3>

                  <span
                    className={`badge px-3 py-2 ${
                      result.overallScore >= 80
                        ? "text-bg-success"
                        : result.overallScore >= 60
                          ? "text-bg-primary"
                          : result.overallScore >= 40
                            ? "text-bg-warning"
                            : "text-bg-danger"
                    }`}
                  >
                    {result.matchStatus}
                  </span>

                  <p
                    className="text-muted small mx-auto mt-3 mb-0"
                    style={{ maxWidth: "650px" }}
                  >
                    This is a JobNest estimate based on
                    keyword, skill and resume-section
                    matching. It is not a score from an
                    employer's applicant tracking system.
                  </p>
                </div>

                {/* SCORE CARDS */}

                <div className="row g-4 mb-5">
                  <ScoreCard
                    title="Keyword Match"
                    score={result.keywordScore}
                    description="Measures how many important keywords from the job description appear in your resume."
                    getProgressClass={
                      getProgressClass
                    }
                  />

                  <ScoreCard
                    title="Skills Match"
                    score={result.skillScore}
                    description="Checks whether recognized skills requested in the job description appear in your resume."
                    getProgressClass={
                      getProgressClass
                    }
                  />

                  <ScoreCard
                    title="Resume Structure"
                    score={result.sectionScore}
                    description="Checks whether common resume sections can be detected."
                    getProgressClass={
                      getProgressClass
                    }
                  />
                </div>

                <ResultBadges
                  title="Matched Skills"
                  icon="bi-check-circle-fill text-success"
                  items={result.matchedSkills}
                  badgeClass="text-bg-success"
                  emptyText="No specific job skills were matched."
                />

                <ResultBadges
                  title="Missing Skills"
                  icon="bi-exclamation-triangle-fill text-warning"
                  items={result.missingSkills}
                  badgeClass="text-bg-warning"
                  emptyText="No recognized skills from the job description are missing."
                />

                <ResultBadges
                  title="Matched Keywords"
                  icon="bi-check-circle-fill text-success"
                  items={result.matchedKeywords}
                  badgeClass="text-bg-success"
                  emptyText="No major job-description keywords were matched."
                />

                <ResultBadges
                  title="Missing Keywords"
                  icon="bi-exclamation-triangle-fill text-warning"
                  items={result.missingKeywords}
                  badgeClass="text-bg-warning"
                  emptyText="No major keywords are missing."
                />

                {/* SECTIONS */}

                <div className="mb-5">
                  <h3 className="h5 fw-bold mb-3">
                    Resume Sections
                  </h3>

                  <div className="row g-3">
                    {Object.entries(
                      result.sections,
                    ).map(([section, found]) => (
                      <div
                        className="col-sm-6 col-lg-4"
                        key={section}
                      >
                        <div
                          className={`border rounded-4 p-3 h-100 ${
                            found
                              ? "bg-success-subtle"
                              : "bg-danger-subtle"
                          }`}
                        >
                          <div className="d-flex justify-content-between align-items-center">

                            <span className="text-capitalize fw-semibold">
                              {section}
                            </span>

                            <i
                              className={`bi ${
                                found
                                  ? "bi-check-circle-fill text-success"
                                  : "bi-x-circle-fill text-danger"
                              }`}
                            ></i>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SUGGESTIONS */}

                <div>
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-lightbulb-fill text-warning fs-5 me-2"></i>

                    <h3 className="h5 fw-bold mb-0">
                      Improvement Suggestions
                    </h3>
                  </div>

                  {result.suggestions.length > 0 ? (
                    <div className="d-flex flex-column gap-3">

                      {result.suggestions.map(
                        (suggestion, index) => (
                          <div
                            key={index}
                            className="border rounded-4 p-3"
                          >
                            <div className="d-flex">

                              <span
                                className="badge bg-primary rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                style={{
                                  width: "28px",
                                  height: "28px",
                                }}
                              >
                                {index + 1}
                              </span>

                              <span>
                                {suggestion}
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="alert alert-success mb-0">
                      <i className="bi bi-check-circle-fill me-2"></i>

                      Your resume already covers the main
                      checks performed by this tool.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* HOW IT WORKS */}

            <section className="mt-5 pt-5 border-top">

              <div className="text-center mb-5">
                <h2 className="fw-bold mb-3">
                  How the JobNest Resume Checker Works
                </h2>

                <p
                  className="text-secondary mx-auto"
                  style={{
                    maxWidth: "800px",
                    lineHeight: "1.8",
                  }}
                >
                  JobNest compares the readable text in
                  your resume with the job description you
                  provide. The checker looks for relevant
                  keywords, recognized skills and common
                  resume sections to help you understand
                  how closely your resume matches that
                  particular opportunity.
                </p>
              </div>

              <div className="row g-4 mb-5">

                <div className="col-md-4">
                  <div className="border rounded-4 p-4 h-100">

                    <i className="bi bi-file-earmark-text fs-2 text-primary"></i>

                    <h3 className="h5 fw-bold mt-3">
                      1. Upload Your Resume
                    </h3>

                    <p className="text-secondary small mb-0">
                      Select a PDF or DOCX resume. JobNest
                      extracts readable text from the
                      document directly in your browser.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded-4 p-4 h-100">

                    <i className="bi bi-clipboard-check fs-2 text-primary"></i>

                    <h3 className="h5 fw-bold mt-3">
                      2. Add the Job Description
                    </h3>

                    <p className="text-secondary small mb-0">
                      Paste the complete description of
                      the position so the checker can
                      compare its terminology and
                      requested skills with your resume.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded-4 p-4 h-100">

                    <i className="bi bi-bar-chart fs-2 text-primary"></i>

                    <h3 className="h5 fw-bold mt-3">
                      3. Review the Comparison
                    </h3>

                    <p className="text-secondary small mb-0">
                      Review keyword matches, skill
                      matches, detected resume sections
                      and practical suggestions before
                      deciding what changes are
                      appropriate.
                    </p>
                  </div>
                </div>
              </div>

              {/* SCORE EXPLANATION */}

              <div className="row g-4 mb-5">

                <div className="col-lg-6">
                  <div className="bg-light rounded-4 p-4 p-md-5 h-100">

                    <h2 className="h4 fw-bold mb-3">
                      What Does the Match Score Mean?
                    </h2>

                    <p
                      className="text-secondary"
                      style={{ lineHeight: "1.8" }}
                    >
                      The score is a JobNest estimate
                      based on three checks: keyword
                      matching, recognized skill matching
                      and whether common resume sections
                      can be detected.
                    </p>

                    <p
                      className="text-secondary mb-0"
                      style={{ lineHeight: "1.8" }}
                    >
                      A higher score means the resume
                      contains more of the information
                      detected in the supplied job
                      description. It does not mean that
                      an employer will shortlist the
                      resume or that a particular
                      applicant tracking system will
                      assign the same score.
                    </p>
                  </div>
                </div>

                {/* TIPS */}

                <div className="col-lg-6">
                  <div className="bg-light rounded-4 p-4 p-md-5 h-100">

                    <h2 className="h4 fw-bold mb-3">
                      How to Improve Your Resume
                    </h2>

                    <ul
                      className="text-secondary ps-3 mb-0"
                      style={{ lineHeight: "1.9" }}
                    >
                      <li>
                        Use clear headings such as Skills,
                        Experience and Education.
                      </li>

                      <li>
                        Include relevant terminology from
                        the job description when it
                        genuinely describes your
                        experience.
                      </li>

                      <li>
                        Highlight projects and
                        accomplishments related to the
                        position.
                      </li>

                      <li>
                        Add measurable results where they
                        accurately represent your work.
                      </li>

                      <li>
                        Never add a skill or qualification
                        simply to increase a match score.
                      </li>

                      <li>
                        Proofread your resume before
                        submitting an application.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PRIVACY + LIMITATION */}

              <div className="border rounded-4 p-4 p-md-5 mb-5">
                <div className="row g-4">

                  <div className="col-lg-6">

                    <h2 className="h4 fw-bold mb-3">
                      <i className="bi bi-shield-check text-primary me-2"></i>
                      Resume Privacy
                    </h2>

                    <p
                      className="text-secondary mb-0"
                      style={{ lineHeight: "1.8" }}
                    >
                      Resume analysis on this page is
                      performed in your browser. The
                      resume checker does not
                      intentionally upload your resume to
                      JobNest's database for this
                      analysis. Avoid including
                      information you do not want to
                      process in your browser.
                    </p>
                  </div>

                  <div className="col-lg-6">

                    <h2 className="h4 fw-bold mb-3">
                      <i className="bi bi-info-circle text-primary me-2"></i>
                      Important Limitation
                    </h2>

                    <p
                      className="text-secondary mb-0"
                      style={{ lineHeight: "1.8" }}
                    >
                      This checker is an informational
                      comparison tool, not an employer
                      applicant tracking system.
                      Employers use different recruiting
                      systems, screening methods and
                      hiring criteria. JobNest cannot
                      guarantee interviews, shortlisting
                      or employment based on the result
                      shown here.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}

              <div className="text-center bg-light rounded-4 p-4 p-md-5">

                <h2 className="h4 fw-bold mb-3">
                  Continue Preparing for Your Application
                </h2>

                <p className="text-secondary mb-4">
                  Explore practical career guides or
                  browse current opportunities on
                  JobNest.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3">

                  <Link
                    to="/guides"
                    className="btn btn-primary px-4"
                  >
                    Read Career Guides
                  </Link>

                  <Link
                    to="/jobs"
                    className="btn btn-outline-primary px-4"
                  >
                    Browse Jobs
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

// -------------------------------------------------------
// SCORE CARD
// -------------------------------------------------------

const ScoreCard = ({
  title,
  score,
  description,
  getProgressClass,
}) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="border rounded-4 p-4 h-100">

        <div className="d-flex justify-content-between align-items-center">

          <h3 className="h5 fw-bold mb-0">
            {title}
          </h3>

          <strong>{score}%</strong>
        </div>

        <div
          className="progress mt-3"
          style={{ height: "12px" }}
        >
          <div
            className={`progress-bar ${getProgressClass(
              score,
            )}`}
            role="progressbar"
            style={{
              width: `${score}%`,
            }}
            aria-valuenow={score}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <p className="text-muted small mt-3 mb-0">
          {description}
        </p>
      </div>
    </div>
  );
};

// -------------------------------------------------------
// RESULT BADGES
// -------------------------------------------------------

const ResultBadges = ({
  title,
  icon,
  items,
  badgeClass,
  emptyText,
}) => {
  return (
    <div className="mb-5">

      <div className="d-flex align-items-center mb-3">

        <i className={`bi ${icon} fs-5 me-2`}></i>

        <h3 className="h5 fw-bold mb-0">
          {title}
        </h3>
      </div>

      {items.length > 0 ? (
        <div className="d-flex flex-wrap gap-2">

          {items.map((item) => (
            <span
              key={item}
              className={`badge rounded-pill ${badgeClass} px-3 py-2`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <div className="alert alert-light border mb-0">
          {emptyText}
        </div>
      )}
    </div>
  );
};