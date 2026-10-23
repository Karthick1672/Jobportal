import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "../services/supabase";

const createEmptyForm = () => ({
  title: "",
  company: "",
  location: "",
  type: "",
  category: "",
  salary: "",
  experience: "",
  passout_year: "",
  skills: "",
  applyLink: "",
  description: "",
});

const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Internship"];

const JOB_CATEGORIES = ["IT & Software", "Engineering", "Finance", "Marketing"];

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState("post");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingJobs, setFetchingJobs] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [extractUrl, setExtractUrl] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [formData, setFormData] = useState(createEmptyForm);
  const [needsReview, setNeedsReview] = useState(false);

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem("isAdminAuth") === "true");
  }, []);

  const fetchJobs = useCallback(async () => {
    setFetchingJobs(true);

    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
    } catch (error) {
      console.error("Error loading jobs:", error.message);

      setMessage({
        type: "danger",
        text: "Could not load jobs. Please try again.",
      });
    } finally {
      setFetchingJobs(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && activeTab === "manage") {
      fetchJobs();
    }
  }, [activeTab, isAuthenticated, fetchJobs]);

  const handleLogin = (e) => {
    e.preventDefault();

    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!correctPassword) {
      setAuthError(
        "Admin password is not configured. Please check your environment settings.",
      );
      return;
    }

    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAdminAuth", "true");
      setPasswordInput("");
      setAuthError("");
    } else {
      setAuthError("Incorrect admin password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAdminAuth");
    setPasswordInput("");
    setAuthError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (needsReview) {
      setMessage({
        type: "warning",
        text: "Review all extracted fields against the official job listing before publishing.",
      });
    }
  };

  const handleAutoFill = async () => {
    const trimmedUrl = extractUrl.trim();

    if (!trimmedUrl) {
      setMessage({
        type: "warning",
        text: "Please enter the official job listing URL.",
      });
      return;
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(trimmedUrl);

      if (
        !["https:", "http:"].includes(parsedUrl.protocol) ||
        parsedUrl.username ||
        parsedUrl.password
      ) {
        throw new Error("Invalid URL");
      }
    } catch {
      setMessage({
        type: "danger",
        text: "Enter a valid HTTP or HTTPS job URL.",
      });
      return;
    }

    setExtracting(true);
    setMessage({ type: "", text: "" });

    try {
      const { data, error } = await supabase.functions.invoke("parse-job", {
        body: { url: parsedUrl.toString() },
      });

      if (error) {
        let details = error.message || "Could not extract job details.";

        try {
          if (error.context?.json) {
            const responseBody = await error.context.json();
            details = responseBody.error || details;
          }
        } catch {
          // Keep the original error message.
        }

        throw new Error(details);
      }

      if (!data || typeof data !== "object" || data.error) {
        throw new Error(
          data?.error || "The job page returned no usable details.",
        );
      }

      const extractedFields = [
        "title",
        "company",
        "location",
        "type",
        "category",
        "experience",
        "salary",
        "passout_year",
        "skills",
        "description",
      ];

      const hasExtractedData = extractedFields.some((field) => {
        return typeof data[field] === "string" && data[field].trim().length > 0;
      });

      if (!hasExtractedData || !data.title || !data.company) {
        throw new Error(
          "A job title and company could not be verified. Check the official page or enter the details manually.",
        );
      }

      setFormData((previous) => {
        const next = { ...previous };

        for (const field of extractedFields) {
          const value = data[field];

          // Only replace a field when the extractor returns a
          // non-empty string. Missing details stay unchanged.
          if (typeof value === "string" && value.trim()) {
            next[field] = value.trim();
          }
        }

        // Keep the official listing URL in the existing applyLink
        // field; no database schema change is needed.
        next.applyLink = parsedUrl.toString();

        // Only keep a batch year if the extraction returned a
        // valid year. The admin must verify it before publishing.
        if (
          data.passout_year !== undefined &&
          data.passout_year !== null &&
          String(data.passout_year).trim() !== ""
        ) {
          next.passout_year = String(data.passout_year).trim();
        }

        return next;
      });

      setNeedsReview(true);

      setMessage({
        type: "warning",
        text: "Details extracted. Verify every field against the official listing before publishing. Missing details should remain blank.",
      });
    } catch (error) {
      console.error("Job extraction error:", error);

      setMessage({
        type: "danger",
        text: `Extraction failed: ${error.message || "Please check the URL and try again."}`,
      });
    } finally {
      setExtracting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const title = formData.title.trim();
    const company = formData.company.trim();
    const location = formData.location.trim();
    const applyLink = formData.applyLink.trim();
    const description = formData.description.trim();

    if (!title || !company || !location || !applyLink || !description) {
      setMessage({
        type: "warning",
        text: "Please complete the required fields: title, company, location, application URL, and description.",
      });
      return;
    }

    let validatedApplyUrl;

    try {
      validatedApplyUrl = new URL(applyLink);

      if (
        !["https:", "http:"].includes(validatedApplyUrl.protocol) ||
        validatedApplyUrl.username ||
        validatedApplyUrl.password
      ) {
        throw new Error("Invalid URL");
      }
    } catch {
      setMessage({
        type: "danger",
        text: "Enter a valid HTTP or HTTPS application URL.",
      });
      return;
    }

    if (needsReview) {
      const confirmed = window.confirm(
        "Have you checked the title, company, location, skills, eligibility, salary, and description against the official job listing? Publish only verified details.",
      );

      if (!confirmed) return;
    }

    const rawYear = formData.passout_year.trim();

    if (rawYear && !/^\d{4}$/.test(rawYear)) {
      setMessage({
        type: "warning",
        text: "Enter a valid four-digit graduation year or leave it blank.",
      });
      return;
    }

    const payload = {
      title,
      company,
      location,
      type: formData.type.trim(),
      category: formData.category.trim(),
      salary: formData.salary.trim(),
      experience: formData.experience.trim(),
      passout_year: rawYear ? Number(rawYear) : null,
      skills: formData.skills.trim(),
      applyLink: validatedApplyUrl.toString(),
      description,
    };

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { data: insertedJobs, error } = await supabase
        .from("jobs")
        .insert([payload])
        .select("id");

      if (error) throw error;

      // The job is already published at this point. Email failure must not
      // make the admin think the job failed or encourage duplicate posting.
      let emailNotice = "";
      const { error: emailError } = await supabase.functions.invoke(
        "send-job-email",
        {
          body: {
            ...payload,
            jobId: insertedJobs?.[0]?.id ?? null,
            postedAt: new Date().toISOString(),
          },
        },
      );

      if (emailError) {
        console.error(
          "Job was published, but email notification failed:",
          emailError,
        );
        emailNotice =
          " However, the email notification could not be sent. Check the send-job-email function and email provider settings.";
      }

      setMessage({
        type: emailError ? "warning" : "success",
        text: emailError
          ? `Job published successfully.${emailNotice}`
          : "Job published successfully. Job details were emailed to karthicknaren167@gmail.com.",
      });

      setFormData(createEmptyForm());
      setExtractUrl("");
      setNeedsReview(false);
    } catch (error) {
      console.error("Error publishing job:", error);

      setMessage({
        type: "danger",
        text: `Could not publish job: ${error.message || "Please try again."}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (deletingId !== null) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this job listing?",
    );

    if (!confirmed) return;

    setDeletingId(id);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await supabase.from("jobs").delete().eq("id", id);

      if (error) throw error;

      setJobs((previous) => previous.filter((job) => job.id !== id));

      setMessage({
        type: "success",
        text: "Job listing deleted.",
      });
    } catch (error) {
      console.error("Error deleting job:", error);

      setMessage({
        type: "danger",
        text: "Could not delete this job. Please try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleShare = async (job) => {
    const jobUrl = `${window.location.origin}/jobs/${job.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: job.title,
          text: `Check out ${job.title} at ${job.company} on JobNest.`,
          url: jobUrl,
        });
      } else {
        await navigator.clipboard.writeText(jobUrl);

        setMessage({
          type: "success",
          text: "Job link copied to clipboard.",
        });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share error:", error);
        setMessage({
          type: "danger",
          text: "Unable to share or copy this job link.",
        });
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        className="container py-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="card border-0 shadow-lg p-4 rounded-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h4 className="fw-bold mb-3 text-center">Admin Access</h4>

          <p className="text-muted small text-center mb-4">
            Enter your admin password to continue.
          </p>

          {authError && (
            <div className="alert alert-danger py-2 small">{authError}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | JobNest</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <h2 className="fw-bold m-0">Admin Dashboard</h2>

          <div className="d-flex flex-wrap gap-2">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${activeTab === "post" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => {
                  setActiveTab("post");
                  setMessage({ type: "", text: "" });
                }}
              >
                ➕ Post Job
              </button>

              <button
                type="button"
                className={`btn ${activeTab === "manage" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => {
                  setActiveTab("manage");
                  setMessage({ type: "", text: "" });
                }}
              >
                📋 Manage Jobs ({jobs.length})
              </button>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-outline-danger"
            >
              Logout
            </button>
          </div>
        </div>

        {message.text && (
          <div
            className={`alert alert-${message.type} alert-dismissible`}
            role="status"
          >
            {message.text}

            <button
              type="button"
              className="btn-close"
              aria-label="Dismiss message"
              onClick={() => setMessage({ type: "", text: "" })}
            />
          </div>
        )}

        {activeTab === "post" && (
          <section className="card border-0 shadow-sm p-4 rounded-4">
            <h4 className="fw-bold mb-3">Create Job Listing</h4>

            <div className="card bg-light border-0 p-3 mb-4 rounded-3">
              <label className="form-label fw-bold small text-secondary">
                ⚡ Auto-Fill from Official Job URL
              </label>

              <p className="small text-secondary mb-3">
                Extract details from the employer's job listing. Verify all
                information before publishing.
              </p>

              <div className="input-group">
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://company.com/careers/job/123"
                  value={extractUrl}
                  onChange={(e) => setExtractUrl(e.target.value)}
                  disabled={extracting}
                />

                <button
                  type="button"
                  className="btn btn-primary fw-semibold"
                  onClick={handleAutoFill}
                  disabled={extracting || loading}
                >
                  {extracting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      />
                      Extracting...
                    </>
                  ) : (
                    "Auto-Fill Details"
                  )}
                </button>
              </div>
            </div>

            {needsReview && (
              <div className="alert alert-warning">
                <strong>Review required:</strong> Compare the extracted
                information with the original company listing. Correct
                inaccuracies and clear fields that are not verified.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Location *</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter verified location"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Job Type</label>
                  <select
                    name="type"
                    className="form-select"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="">Not specified</option>
                    {JOB_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Category</label>
                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Not specified</option>
                    {JOB_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Salary Range</label>
                  <input
                    type="text"
                    name="salary"
                    className="form-control"
                    placeholder="Leave blank if not stated"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Experience Level
                  </label>
                  <input
                    type="text"
                    name="experience"
                    className="form-control"
                    placeholder="Leave blank if not stated"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Passed Out Year
                  </label>
                  <input
                    type="text"
                    name="passout_year"
                    className="form-control"
                    placeholder="e.g. 2027"
                    min="1900"
                    max="2100"
                    step="1"
                    value={formData.passout_year}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    className="form-control"
                    placeholder="Verified skills only"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Official Job / Apply URL *
                  </label>
                  <input
                    type="url"
                    name="applyLink"
                    className="form-control"
                    placeholder="https://company.com/careers/job/123"
                    value={formData.applyLink}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    rows={8}
                    className="form-control"
                    placeholder="Write an accurate description based on the official listing."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">
                    Check that the summary preserves the employer's actual
                    responsibilities, qualifications, and eligibility.
                  </small>
                </div>

                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 fw-semibold"
                    disabled={loading || extracting}
                  >
                    {loading ? "Publishing..." : "Publish Job Listing"}
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}

        {activeTab === "manage" && (
          <section className="card border-0 shadow-sm p-4 rounded-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <h4 className="fw-bold mb-0">Posted Job Openings</h4>

              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={fetchJobs}
                disabled={fetchingJobs}
              >
                {fetchingJobs ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {fetchingJobs ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading jobs...</span>
                </div>
                <p className="mt-2 text-muted">Loading posted jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-5 text-muted">
                No jobs posted yet.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Company</th>
                      <th>Batch Year</th>
                      <th>Type</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="fw-bold">{job.title}</td>
                        <td>{job.company}</td>
                        <td>
                          {job.passout_year ? (
                            <span className="badge bg-info-subtle text-info border">
                              {job.passout_year}
                            </span>
                          ) : (
                            <span className="badge bg-light text-secondary border">
                              Not specified
                            </span>
                          )}
                        </td>
                        <td>{job.type || "Not specified"}</td>
                        <td className="text-end text-nowrap">
                          <button
                            type="button"
                            onClick={() => handleShare(job)}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            🔗 Share
                          </button>

                          {job.applyLink && (
                            <a
                              href={job.applyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-secondary me-2"
                            >
                              Official Link ↗
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(job.id)}
                            className="btn btn-sm btn-danger"
                            disabled={deletingId !== null}
                          >
                            {deletingId === job.id ? "Deleting..." : "Remove"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
};
