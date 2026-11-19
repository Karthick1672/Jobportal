import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../services/supabase";

export const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadJob() {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (!isMounted) return;

      if (error) {
        console.error("Error fetching job details:", error.message);
        setJob(null);
      } else {
        setJob(data);
      }

      setLoading(false);
    }

    loadJob();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = async () => {
    const jobUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: job?.title || "Job Opportunity",
          text:
            job?.title && job?.company
              ? `Check out this ${job.title} opportunity at ${job.company} on JobNest.`
              : "Check out this job opportunity on JobNest.",
          url: jobUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(jobUrl);
        setShareMessage("Link copied!");

        setTimeout(() => {
          setShareMessage("");
        }, 2500);
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Error sharing job:", error);
      }
    }
  };

  const renderFormattedDescription = (descriptionText) => {
    if (!descriptionText) {
      return (
        <p className="text-secondary mb-0">
          A detailed job description was not provided for this listing. Please review
          the employer's application page for complete requirements and updates.
        </p>
      );
    }

    // Split text by lines and bullets
    const rawLines = descriptionText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (rawLines.length === 0) {
      return null;
    }

    const elements = [];
    let currentBulletGroup = [];

    const flushBullets = () => {
      if (currentBulletGroup.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-unstyled mb-4 ps-1">
            {currentBulletGroup.map((item, idx) => (
              <li
                key={idx}
                className="d-flex align-items-start gap-2 mb-2 text-secondary"
                style={{ lineHeight: "1.8" }}
              >
                <i className="bi bi-check2-circle text-primary mt-1 flex-shrink-0"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
        currentBulletGroup = [];
      }
    };

    rawLines.forEach((line, index) => {
      // Check if this line is a bullet item (starts with -, *, •, or number like 1. or 1))
      const bulletRegex = /^[•\-*]\s*|^[0-9]+[.)]\s*/;
      const isBullet = bulletRegex.test(line);
      const cleanLine = line.replace(bulletRegex, "").trim();

      // Check if this line looks like a sub-heading (e.g., ends in ":" or short uppercase)
      const isHeader =
        !isBullet &&
        (cleanLine.endsWith(":") ||
          /^(responsibilities|requirements|qualifications|eligibility|about the role|role overview|key duties|what you'll do|skills required|benefits)/i.test(
            cleanLine
          ));

      if (isHeader) {
        flushBullets();
        elements.push(
          <h3
            key={`h-${index}`}
            className="h6 fw-bold text-dark mt-4 mb-2 d-flex align-items-center gap-2"
          >
            <span
              className="d-inline-block rounded-pill bg-primary"
              style={{ width: "4px", height: "16px" }}
            ></span>
            {cleanLine}
          </h3>
        );
      } else if (isBullet) {
        currentBulletGroup.push(cleanLine);
      } else {
        flushBullets();
        elements.push(
          <p
            key={`p-${index}`}
            className="text-secondary mb-3"
            style={{ lineHeight: "1.85" }}
          >
            {cleanLine}
          </p>
        );
      }
    });

    flushBullets();

    return elements;
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Job | JobNest</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <main className="jn-job-details py-5 min-vh-100">
          <div className="container py-5">
            <div className="text-center py-5" aria-live="polite">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted fw-semibold">
                Fetching latest job details...
              </p>
            </div>
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

        <main className="jn-job-details py-5 min-vh-100">
          <div className="container py-5">
            <div
              className="card border-0 shadow-sm rounded-4 text-center mx-auto p-4 p-md-5"
              style={{ maxWidth: "560px" }}
            >
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3 text-secondary"
                style={{ width: "72px", height: "72px" }}
              >
                <i className="bi bi-briefcase fs-1"></i>
              </div>
              <h1 className="h3 fw-bold text-dark mb-2">Job Listing Not Found</h1>
              <p className="text-secondary mb-4" style={{ lineHeight: "1.7" }}>
                This job position may have expired, been filled by the employer,
                or the URL might be invalid.
              </p>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                <Link to="/jobs" className="btn btn-primary px-4 py-2 fw-semibold">
                  Browse Active Jobs
                </Link>
                <Link to="/" className="btn btn-outline-secondary px-4 py-2">
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  const passoutYear = job.passout_year ?? job.passoutYear;
  const applyUrl = job.applyLink ?? job.apply_link;
  const articleUrl = `https://jobnest.work/jobs/${job.id}`;

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

  const companyInitial = job.company ? job.company.charAt(0).toUpperCase() : "J";

  return (
    <>
      <Helmet>
        <title>
          {job.title}
          {job.company ? ` at ${job.company}` : ""} | JobNest
        </title>

        <meta
          name="description"
          content={`Apply for ${metaDescription}. View eligibility, required skills, package, and application procedure on JobNest.`}
        />

        <meta name="robots" content="noindex, follow" />
        <meta name="googlebot" content="noindex, follow" />

        <link rel="canonical" href={articleUrl} />

        <meta
          property="og:title"
          content={`${job.title}${job.company ? ` at ${job.company}` : ""}`}
        />
        <meta
          property="og:description"
          content={`View job requirements, salary details, batch eligibility, and application link for ${job.title}.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:site_name" content="JobNest" />
      </Helmet>

      <main className="jn-job-details py-4 py-md-5">
        <div className="container">
          {/* TOP NAVIGATION BREADCRUMB */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb small mb-0">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none text-muted">
                    <i className="bi bi-house me-1"></i>Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/jobs" className="text-decoration-none text-muted">
                    Jobs
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active text-dark fw-semibold text-truncate"
                  style={{ maxWidth: "260px" }}
                  aria-current="page"
                >
                  {job.title}
                </li>
              </ol>
            </nav>

            <Link
              to="/jobs"
              className="text-decoration-none small text-muted d-inline-flex align-items-center gap-1 hover-primary"
            >
              <i className="bi bi-arrow-left"></i>
              <span>Back to all listings</span>
            </Link>
          </div>

          <div className="row g-4 align-items-start">
            {/* MAIN CONTENT COLUMN */}
            <div className="col-lg-8">
              <article className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
                <div className="card-body p-3 p-sm-4 p-md-5">
                  {/* TOP HEADER: COMPANY AVATAR, TITLE, BADGES */}
                  <div className="d-flex flex-column flex-sm-row align-items-start gap-3 mb-4">
                    <div className="jn-company-avatar">
                      {companyInitial}
                    </div>

                    <div className="flex-grow-1 min-w-0">
                      <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                        <span className="h6 fw-bold text-secondary mb-0">
                          {job.company || "Hiring Company"}
                        </span>
                        <span
                          className="badge bg-success-subtle text-success border border-success-subtle jn-badge-pulse"
                          title="Verified Job Listing"
                        >
                          <span className="jn-pulse-dot"></span>
                          Actively Hiring
                        </span>
                      </div>

                      <h1 className="h3 fw-bold text-dark mb-2" style={{ letterSpacing: "-0.02em" }}>
                        {job.title}
                      </h1>

                      <div className="d-flex flex-wrap align-items-center gap-2 text-muted small">
                        {job.location && (
                          <span className="d-inline-flex align-items-center gap-1">
                            <i className="bi bi-geo-alt text-primary"></i>
                            {job.location}
                          </span>
                        )}
                        {job.location && job.type && <span>•</span>}
                        {job.type && (
                          <span className="d-inline-flex align-items-center gap-1">
                            <i className="bi bi-briefcase text-primary"></i>
                            {job.type}
                          </span>
                        )}
                        {passoutYear && <span>•</span>}
                        {passoutYear && (
                          <span className="d-inline-flex align-items-center gap-1">
                            <i className="bi bi-mortarboard text-primary"></i>
                            {passoutYear} Batch
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BADGES ROW */}
                  <div className="d-flex flex-wrap gap-2 mb-4 pb-2">
                    {job.category && (
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-medium">
                        <i className="bi bi-folder2 me-1"></i>
                        {job.category}
                      </span>
                    )}

                    {job.type && (
                      <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                        {job.type}
                      </span>
                    )}

                    {passoutYear && (
                      <span className="badge bg-info-subtle text-info border border-info-subtle px-3 py-2 rounded-pill fw-medium">
                        <i className="bi bi-mortarboard-fill me-1"></i>
                        {passoutYear} Batch Eligible
                      </span>
                    )}

                    <span className="badge bg-light text-muted border px-3 py-2 rounded-pill fw-normal ms-auto d-none d-sm-inline-block">
                      Job ID: #{job.id}
                    </span>
                  </div>

                  {/* MOBILE QUICK ACTION (Only on small screens, seamless inside page) */}
                  <div className="d-md-none mb-4 p-3 rounded-3 bg-light border border-light-subtle">
                    {applyUrl ? (
                      <a
                        href={applyUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 jn-apply-btn text-white text-decoration-none mb-2"
                      >
                        <span>Apply on Official Site</span>
                        <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-secondary w-100 py-2 mb-2 fw-semibold rounded-3"
                        disabled
                      >
                        Application Link Unavailable
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleShare}
                      className="btn btn-outline-secondary w-100 py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-share"></i>
                      <span>{shareMessage || "Share Job"}</span>
                    </button>
                  </div>

                  {/* KEY STATS MATRIX */}
                  <div className="row g-3 mb-5">
                    <div className="col-sm-6">
                      <div className="jn-stat-tile">
                        <div className="jn-stat-icon">
                          <i className="bi bi-geo-alt-fill"></i>
                        </div>
                        <div className="min-w-0">
                          <div className="small text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>
                            Location
                          </div>
                          <div className="fw-bold text-dark text-truncate">
                            {job.location || "Not Specified"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="jn-stat-tile">
                        <div className="jn-stat-icon">
                          <i className="bi bi-cash-stack"></i>
                        </div>
                        <div className="min-w-0">
                          <div className="small text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>
                            Salary Package
                          </div>
                          <div className="fw-bold text-dark text-truncate">
                            {job.salary || "As per company standards"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="jn-stat-tile">
                        <div className="jn-stat-icon">
                          <i className="bi bi-award-fill"></i>
                        </div>
                        <div className="min-w-0">
                          <div className="small text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>
                            Experience Level
                          </div>
                          <div className="fw-bold text-dark text-truncate">
                            {job.experience || "Freshers / Any"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="jn-stat-tile">
                        <div className="jn-stat-icon">
                          <i className="bi bi-mortarboard-fill"></i>
                        </div>
                        <div className="min-w-0">
                          <div className="small text-muted text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>
                            Target Batch
                          </div>
                          <div className="fw-bold text-dark text-truncate">
                            {passoutYear ? `${passoutYear} Batch Graduates` : "All Batches Eligible"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* JOB OVERVIEW & DESCRIPTION */}
                  <section className="mb-5">
                    <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                      <i className="bi bi-file-text-fill text-primary fs-5"></i>
                      <h2 className="h4 fw-bold text-dark mb-0">Role Overview & Details</h2>
                    </div>

                    <div className="job-description-body">
                      {renderFormattedDescription(job.description)}
                    </div>
                  </section>

                  {/* REQUIRED SKILLS */}
                  {skills.length > 0 && (
                    <section className="mb-5">
                      <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-tools text-primary fs-5"></i>
                          <h2 className="h4 fw-bold text-dark mb-0">Key Skills & Competencies</h2>
                        </div>
                        <span className="badge bg-light text-secondary border rounded-pill">
                          {skills.length} listed
                        </span>
                      </div>

                      <div className="d-flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <div key={`${skill}-${index}`} className="jn-skill-pill">
                            <span
                              className="rounded-circle bg-primary"
                              style={{ width: "6px", height: "6px" }}
                            ></span>
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* FOOTER ACTIONS */}
                  <div className="pt-3 mt-4 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <Link
                      to="/jobs"
                      className="btn btn-outline-secondary px-4 py-2 fw-semibold rounded-3 d-inline-flex align-items-center gap-2"
                    >
                      <i className="bi bi-arrow-left"></i>
                      <span>Browse More Jobs</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="btn btn-light border px-4 py-2 rounded-3 text-secondary d-inline-flex align-items-center gap-2"
                    >
                      <i className="bi bi-share"></i>
                      <span>{shareMessage || "Share This Role"}</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>

            {/* SIDEBAR COLUMN */}
            <aside className="col-lg-4">
              <div className="sticky-lg-top" style={{ top: "96px", zIndex: 10 }}>
                {/* APPLICATION CARD */}
                <div className="card border-0 shadow-sm rounded-4 bg-white mb-4 overflow-hidden">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h2 className="h5 fw-bold text-dark mb-0">
                        Interested in this role?
                      </h2>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill small">
                        Official Link
                      </span>
                    </div>

                    <p className="text-secondary small mb-4" style={{ lineHeight: "1.7" }}>
                      Review complete criteria on the employer's career portal and submit your application directly.
                    </p>

                    {applyUrl ? (
                      <a
                        href={applyUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 jn-apply-btn text-white text-decoration-none mb-3"
                      >
                        <span>Apply on Official Site</span>
                        <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-secondary w-100 py-3 mb-3 fw-semibold rounded-3"
                        disabled
                      >
                        Application Link Unavailable
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleShare}
                      className="btn btn-outline-secondary w-100 py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2 mb-3"
                    >
                      <i className="bi bi-share"></i>
                      <span>{shareMessage || "Share With Colleagues"}</span>
                    </button>

                    <hr className="my-3 text-muted opacity-25" />

                    {/* TRUST CHECKLIST */}
                    <div className="small text-secondary">
                      <div className="d-flex align-items-start gap-2 mb-2">
                        <i className="bi bi-check-circle-fill text-success mt-1 flex-shrink-0"></i>
                        <span>100% Free - Direct application to employer.</span>
                      </div>
                      <div className="d-flex align-items-start gap-2 mb-2">
                        <i className="bi bi-shield-check text-primary mt-1 flex-shrink-0"></i>
                        <span>No sign-up or fee requested by JobNest.</span>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <i className="bi bi-exclamation-triangle text-warning mt-1 flex-shrink-0"></i>
                        <span>Verify deadlines & eligibility on destination site.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PREPARATION & TOOLS CARD */}
                <div className="card border-0 shadow-sm rounded-4 bg-white">
                  <div className="card-body p-4">
                    <h2 className="h6 fw-bold text-dark text-uppercase tracking-wider mb-3" style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}>
                      Prepare Before Applying
                    </h2>

                    <div className="d-flex flex-column gap-2">
                      <Link
                        to="/resume-checker"
                        className="jn-sidebar-resource-item"
                      >
                        <div
                          className="rounded-3 bg-primary-subtle text-primary p-2 d-flex align-items-center justify-content-center"
                          style={{ width: "36px", height: "36px" }}
                        >
                          <i className="bi bi-file-earmark-check-fill"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold">Resume Checker</div>
                          <div className="text-muted small" style={{ fontSize: "0.75rem" }}>
                            Check ATS score & keyword match
                          </div>
                        </div>
                        <i className="bi bi-chevron-right text-muted small"></i>
                      </Link>

                      <Link
                        to="/career-guides"
                        className="jn-sidebar-resource-item"
                      >
                        <div
                          className="rounded-3 bg-info-subtle text-info p-2 d-flex align-items-center justify-content-center"
                          style={{ width: "36px", height: "36px" }}
                        >
                          <i className="bi bi-journal-bookmark-fill"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold">Career Guides</div>
                          <div className="text-muted small" style={{ fontSize: "0.75rem" }}>
                            Interview questions & fresher tips
                          </div>
                        </div>
                        <i className="bi bi-chevron-right text-muted small"></i>
                      </Link>

                      <Link
                        to="/contact"
                        className="jn-sidebar-resource-item text-secondary"
                      >
                        <div
                          className="rounded-3 bg-light text-secondary p-2 d-flex align-items-center justify-content-center"
                          style={{ width: "36px", height: "36px" }}
                        >
                          <i className="bi bi-flag-fill"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold">Report Listing</div>
                          <div className="text-muted small" style={{ fontSize: "0.75rem" }}>
                            Expired or misleading link?
                          </div>
                        </div>
                        <i className="bi bi-chevron-right text-muted small"></i>
                      </Link>
                    </div>
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
