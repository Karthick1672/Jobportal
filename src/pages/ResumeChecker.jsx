import React, { useState } from "react";
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

  const extractDocxText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const docxResult = await mammoth.extractRawText({
      arrayBuffer,
    });

    return docxResult.value;
  };

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

  const cleanText = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s+#.-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const detectSkills = (text) => {
    const cleaned = cleanText(text);

    return skillList.filter((skill) => cleaned.includes(skill.toLowerCase()));
  };

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
      "an",
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
      if (word.length >= 3 && !stopWords.has(word) && !/^\d+$/.test(word)) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word]) => word);
  };

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
        ? Math.round((matchedKeywords.length / jdKeywords.length) * 100)
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
        ? Math.round((matchedSkills.length / jobSkills.length) * 100)
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
        cleanedResume.includes("project") || cleanedResume.includes("projects"),

      contact:
        resumeText.includes("@") &&
        /\d{10}/.test(resumeText.replace(/\D/g, "")),
    };

    const sectionValues = Object.values(sections);

    const sectionScore = Math.round(
      (sectionValues.filter(Boolean).length / sectionValues.length) * 100,
    );

    const overallScore = Math.round(
      keywordScore * 0.4 + skillScore * 0.4 + sectionScore * 0.2,
    );

    let atsStatus = "Needs Improvement";

    if (overallScore >= 80) {
      atsStatus = "Excellent";
    } else if (overallScore >= 65) {
      atsStatus = "Good";
    } else if (overallScore >= 50) {
      atsStatus = "Average";
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
      suggestions.push("Add a clearly labelled Education section.");
    }

    if (!sections.skills) {
      suggestions.push("Add a dedicated Skills or Technical Skills section.");
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
      atsStatus,
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

      const resumeText = await extractResumeText(resumeFile);

      if (!resumeText.trim()) {
        throw new Error("No readable text was found in the resume.");
      }

      const analysis = calculateResult(resumeText, jobDescription);

      setResult(analysis);
    } catch (err) {
      console.error(err);

      setError(
        err?.message || "Something went wrong while checking your resume.",
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
    <main className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
          Free Resume Analysis
        </span>

        <h1 className="fw-bold mb-3">ATS Resume Checker</h1>

        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Upload your resume and paste the job description to check ATS
          compatibility, keyword matching, skill matching, and important resume
          sections.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-11">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4">
            <div className="row g-4">
              <div className="col-lg-5">
                <label className="form-label fw-bold">Upload Resume</label>

                <div className="border rounded-4 p-4 text-center bg-light">
                  <i
                    className="bi bi-file-earmark-person text-primary"
                    style={{ fontSize: "3rem" }}
                  ></i>

                  <h5 className="mt-3">Select your resume</h5>

                  <p className="text-muted small">
                    PDF and DOCX files are supported.
                  </p>

                  <input
                    type="file"
                    className="form-control mt-3"
                    accept=".pdf,.docx"
                    onChange={(e) => {
                      setResumeFile(e.target.files?.[0] || null);

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

              <div className="col-lg-7">
                <label className="form-label fw-bold">Job Description</label>

                <textarea
                  className="form-control rounded-3"
                  rows="12"
                  placeholder="Paste the complete job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
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
              Your resume is processed directly in your browser.
            </p>
          </div>

          {result && (
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
              <div className="text-center mb-5">
                <h3 className="fw-bold mb-4">Resume Analysis</h3>

                <div
                  className="mx-auto d-flex align-items-center justify-content-center rounded-circle border border-5 border-primary"
                  style={{
                    width: "165px",
                    height: "165px",
                  }}
                >
                  <div>
                    <h1
                      className={`fw-bold mb-0 ${getScoreClass(
                        result.overallScore,
                      )}`}
                    >
                      {result.overallScore}
                    </h1>

                    <span className="text-muted">out of 100</span>
                  </div>
                </div>

                <h4 className="mt-4 fw-bold">ATS Compatibility</h4>

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
                  {result.atsStatus}
                </span>
              </div>

              <div className="row g-4 mb-5">
                <ScoreCard
                  title="Keyword Match"
                  score={result.keywordScore}
                  description="Measures how many important keywords from the job description appear in your resume."
                  getProgressClass={getProgressClass}
                />

                <ScoreCard
                  title="Skills Match"
                  score={result.skillScore}
                  description="Checks whether the skills requested by the employer appear in your resume."
                  getProgressClass={getProgressClass}
                />

                <ScoreCard
                  title="Resume Structure"
                  score={result.sectionScore}
                  description="Checks whether important resume sections can be detected."
                  getProgressClass={getProgressClass}
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
                emptyText="No major skills are missing."
              />

              <ResultBadges
                title="Matched Keywords"
                icon="bi-check-circle-fill text-success"
                items={result.matchedKeywords}
                badgeClass="text-bg-success"
                emptyText="No major job description keywords were matched."
              />

              <ResultBadges
                title="Missing Keywords"
                icon="bi-exclamation-triangle-fill text-warning"
                items={result.missingKeywords}
                badgeClass="text-bg-warning"
                emptyText="No major keywords are missing."
              />

              <div className="mb-5">
                <h5 className="fw-bold mb-3">Resume Sections</h5>

                <div className="row g-3">
                  {Object.entries(result.sections).map(([section, found]) => (
                    <div className="col-sm-6 col-lg-4" key={section}>
                      <div
                        className={`border rounded-4 p-3 h-100 ${
                          found ? "bg-success-subtle" : "bg-danger-subtle"
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

              <div>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-lightbulb-fill text-warning fs-5 me-2"></i>

                  <h5 className="fw-bold mb-0">Improvement Suggestions</h5>
                </div>

                {result.suggestions.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {result.suggestions.map((suggestion, index) => (
                      <div key={index} className="border rounded-4 p-3">
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

                          <span>{suggestion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-success mb-0">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Your resume already covers the main checks.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const ScoreCard = ({ title, score, description, getProgressClass }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="border rounded-4 p-4 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">{title}</h5>

          <strong>{score}%</strong>
        </div>

        <div className="progress mt-3" style={{ height: "12px" }}>
          <div
            className={`progress-bar ${getProgressClass(score)}`}
            role="progressbar"
            style={{
              width: `${score}%`,
            }}
            aria-valuenow={score}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <p className="text-muted small mt-3 mb-0">{description}</p>
      </div>
    </div>
  );
};

const ResultBadges = ({ title, icon, items, badgeClass, emptyText }) => {
  return (
    <div className="mb-5">
      <div className="d-flex align-items-center mb-3">
        <i className={`bi ${icon} fs-5 me-2`}></i>

        <h5 className="fw-bold mb-0">{title}</h5>
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
        <div className="alert alert-light border mb-0">{emptyText}</div>
      )}
    </div>
  );
};
