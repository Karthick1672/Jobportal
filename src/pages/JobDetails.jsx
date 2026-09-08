import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../services/supabase";

export const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching job details:", error.message);

      setJob(null);
    } else {
      setJob(data);
    }

    setLoading(false);
  };

  const handleShare = async () => {
    const jobUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: job?.title || "Job Opportunity",
          text:
            job?.title && job?.company
              ? `Check out this ${job.title} opportunity at ${job.company}.`
              : "Check out this job opportunity on JobNest.",
          url: jobUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(jobUrl);

        setShareMessage("Job link copied!");

        setTimeout(() => {
          setShareMessage("");
        }, 2500);
      }
    } catch (error) {
      // Ignore cancellation from native share dialog
      if (error?.name !== "AbortError") {
        console.error("Error sharing job:", error);
      }
    }
  };

  const renderFormattedDescription = (descriptionText) => {
    if (!descriptionText) {
      return (
        <p className="text-secondary">
          A detailed job description was not provided for this listing. Review
          the employer's application page for the latest information.
        </p>
      );
    }

    const points = descriptionText
      .split(/(?:•|\n)+/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (points.length <= 1) {
      return (
        <p
          className="text-secondary"
          style={{
            lineHeight: "1.9",
            whiteSpace: "pre-line",
          }}
        >
          {descriptionText}
        </p>
      );
    }

    return (
      <ul className="text-secondary ps-4 mb-0" style={{ lineHeight: "1.9" }}>
        {points.map((point, index) => (
          <li key={index} className="mb-2">
            {point}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Job | JobNest</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        <main className="container py-5">
          <div className="text-center py-5" aria-live="polite">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="mt-3 text-muted">Loading job details...</p>
          </div>
        </main>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Helmet>
          <title>Job Not Found | JobNest</title>

          <meta name="robots" content="noindex, follow" />
        </Helmet>

        <main className="container py-5">
          <div
            className="text-center mx-auto py-5"
            style={{ maxWidth: "550px" }}
          >
            <i className="bi bi-briefcase fs-1 text-muted"></i>

            <h1 className="h3 fw-bold mt-3">Job Listing Not Found</h1>

            <p className="text-secondary">
              This job may have been removed, expired, or the link may be
              incorrect.
            </p>

            <Link to="/jobs" className="btn btn-primary mt-2">
              Browse Current Jobs
            </Link>
          </div>
        </main>
      </>
    );
  }

  const passoutYear = job.passout_year ?? job.passoutYear;

  const applyUrl = job.applyLink ?? job.apply_link;

  const articleUrl = `https://www.jobnest.work/jobs/${job.id}`;

  const metaDescription = [
    job.title,
    job.company ? `at ${job.company}` : "",
    job.location ? `in ${job.location}` : "",
    job.type ? `(${job.type})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const skills =
    typeof job.skills === "string"
      ? job.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : [];

  return (
    <>
      <Helmet>
        <title>
          {job.title}
          {job.company ? ` at ${job.company}` : ""} | JobNest
        </title>

        <meta
          name="description"
          content={`View details for ${metaDescription}. Check eligibility, skills, experience, location and application information on JobNest.`}
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={articleUrl} />

        <meta
          property="og:title"
          content={`${job.title}${job.company ? ` at ${job.company}` : ""}`}
        />

        <meta
          property="og:description"
          content={`View job details, requirements and application information for ${job.title}.`}
        />

        <meta property="og:type" content="website" />

        <meta property="og:url" content={articleUrl} />

        <meta property="og:site_name" content="JobNest" />
      </Helmet>

      <main className="bg-light">
        <div className="container py-5">
          {/* BREADCRUMB */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb small mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>
              </li>

              <li className="breadcrumb-item">
                <Link to="/jobs" className="text-decoration-none">
                  Jobs
                </Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                {job.title}
              </li>
            </ol>
          </nav>

          <div className="row g-4">
            {/* MAIN CONTENT */}
            <div className="col-lg-8">
              <article className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4 p-md-5">
                  {/* BADGES */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {job.category && (
                      <span className="badge bg-primary-subtle text-primary">
                        {job.category}
                      </span>
                    )}

                    {job.type && (
                      <span className="badge bg-light text-dark border">
                        {job.type}
                      </span>
                    )}

                    {passoutYear && (
                      <span className="badge bg-info-subtle text-info border border-info-subtle">
                        <i className="bi bi-mortarboard me-1"></i>
                        {passoutYear} Batch
                      </span>
                    )}
                  </div>

                  {/* JOB TITLE */}
                  <header className="mb-4">
                    <h1 className="display-6 fw-bold mb-2">{job.title}</h1>

                    {job.company && (
                      <p className="h5 text-secondary mb-0">
                        <i className="bi bi-building me-2"></i>
                        {job.company}
                      </p>
                    )}
                  </header>

                  {/* SUMMARY INFORMATION */}
                  <section className="border-top border-bottom py-4 mb-5">
                    <div className="row g-3">
                      {job.location && (
                        <div className="col-md-6">
                          <div className="d-flex gap-3">
                            <i className="bi bi-geo-alt text-primary"></i>

                            <div>
                              <div className="small text-muted">Location</div>

                              <div className="fw-semibold">{job.location}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {job.experience && (
                        <div className="col-md-6">
                          <div className="d-flex gap-3">
                            <i className="bi bi-briefcase text-primary"></i>

                            <div>
                              <div className="small text-muted">Experience</div>

                              <div className="fw-semibold">
                                {job.experience}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {job.salary && (
                        <div className="col-md-6">
                          <div className="d-flex gap-3">
                            <i className="bi bi-cash-stack text-primary"></i>

                            <div>
                              <div className="small text-muted">Salary</div>

                              <div className="fw-semibold">{job.salary}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {passoutYear && (
                        <div className="col-md-6">
                          <div className="d-flex gap-3">
                            <i className="bi bi-mortarboard text-primary"></i>

                            <div>
                              <div className="small text-muted">
                                Graduation / Batch
                              </div>

                              <div className="fw-semibold">{passoutYear}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* DESCRIPTION */}
                  <section className="mb-5">
                    <h2 className="h4 fw-bold mb-3">Job Description</h2>

                    {renderFormattedDescription(job.description)}
                  </section>

                  {/* SKILLS */}
                  {skills.length > 0 && (
                    <section className="mb-5">
                      <h2 className="h4 fw-bold mb-3">Skills Mentioned</h2>

                      <p className="text-secondary small mb-3">
                        Skills listed for this opportunity:
                      </p>

                      <div className="d-flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="badge bg-light text-dark border px-3 py-2"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* BEFORE APPLYING */}
                  <section className="bg-light rounded-4 p-4">
                    <h2 className="h5 fw-bold mb-3">Before You Apply</h2>

                    <p
                      className="text-secondary mb-3"
                      style={{
                        lineHeight: "1.8",
                      }}
                    >
                      Review the employer's application page carefully before
                      applying. Requirements, deadlines, salary, location,
                      eligibility, and other details can change after a listing
                      appears on JobNest.
                    </p>

                    <p
                      className="text-secondary small mb-0"
                      style={{
                        lineHeight: "1.8",
                      }}
                    >
                      JobNest is a job discovery and career information platform
                      and does not guarantee interviews, job offers, or
                      employment.
                    </p>
                  </section>

                  {/* MORE JOBS */}
                  <div className="pt-4 mt-4 border-top">
                    <Link
                      to="/jobs"
                      className="btn btn-outline-primary px-4 fw-semibold"
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Explore More Jobs
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            {/* SIDEBAR */}
            <aside className="col-lg-4">
              <div
                className="card border-0 shadow-sm rounded-4 mb-4"
                style={{
                  position: "sticky",
                  top: "100px",
                }}
              >
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-2">
                    Interested in this position?
                  </h2>

                  <p
                    className="text-secondary small"
                    style={{
                      lineHeight: "1.7",
                    }}
                  >
                    Review the complete requirements and continue to the
                    external application page when you're ready.
                  </p>

                  {applyUrl ? (
                    <a
                      href={applyUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="btn btn-primary w-100 py-2 fw-semibold mb-2"
                    >
                      Apply on External Site
                      <i className="bi bi-box-arrow-up-right ms-2"></i>
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 py-2 mb-2"
                      disabled
                    >
                      Application Link Unavailable
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleShare}
                    className="btn btn-outline-secondary w-100 py-2"
                  >
                    <i className="bi bi-share me-2"></i>
                    Share Job
                  </button>

                  {shareMessage && (
                    <div
                      className="text-success text-center small mt-2"
                      role="status"
                    >
                      {shareMessage}
                    </div>
                  )}

                  <hr className="my-4" />

                  <div className="small text-secondary">
                    <div className="d-flex gap-2 mb-3">
                      <i className="bi bi-shield-check text-primary"></i>

                      <span>
                        Verify important information on the employer's
                        application page.
                      </span>
                    </div>

                    <div className="d-flex gap-2">
                      <i className="bi bi-exclamation-triangle text-warning"></i>

                      <span>
                        Be cautious of anyone requesting payment in exchange for
                        a job offer.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CAREER HELP */}
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h2 className="h5 fw-bold mb-3">Prepare Before Applying</h2>

                  <div className="d-grid gap-2">
                    <Link
                      to="/resume-checker"
                      className="btn btn-outline-primary"
                    >
                      Resume Checker
                    </Link>

                    <Link to="/guides" className="btn btn-outline-primary">
                      Career Guides
                    </Link>

                    <Link to="/contact" className="btn btn-outline-secondary">
                      Report This Listing
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};
