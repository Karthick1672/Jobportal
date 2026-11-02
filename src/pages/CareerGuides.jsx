import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { guidesData } from "../data/guidesData";

export const CareerGuides = () => {
  const pageUrl = "https://jobnest.work/career-guides";

  // Schema.org structured data for AdSense & Search crawlers
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JobNest Career Guides & Preparation Resources",
    description:
      "Comprehensive, practical guides for resume building, technical interviews, off-campus drives, and hiring processes.",
    itemListElement: guidesData.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://jobnest.work/career-guides/${guide.slug}`,
      name: guide.title,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Career Guides & Interview Roadmaps | JobNest</title>

        <meta
          name="description"
          content="Explore practical JobNest career guides covering ATS resumes, technical interviews, off-campus job hunting, and professional career preparation."
        />

        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <link rel="canonical" href={pageUrl} />

        <meta
          property="og:title"
          content="Career Guides & Interview Roadmaps | JobNest"
        />
        <meta
          property="og:description"
          content="Practical, in-depth career advice for resumes, interviews, off-campus drives, and professional development."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="JobNest" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main>
        {/* HERO */}
        <section className="bg-light border-bottom">
          <div className="container py-5">
            <div className="text-center mx-auto" style={{ maxWidth: "850px" }}>
              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">
                Career Resources & Roadmaps
              </span>

              <h1 className="display-5 fw-bold mb-3">
                Career Guides for Smarter Job Searching
              </h1>

              <p
                className="lead text-secondary mb-0"
                style={{ lineHeight: "1.8" }}
              >
                Learn how to build a stronger resume, prepare for technical & HR
                interviews, navigate off-campus drives, and make informed career
                decisions with actionable JobNest blueprints.
              </p>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="container py-5">
          <div className="mx-auto text-center" style={{ maxWidth: "850px" }}>
            <h2 className="fw-bold h2 mb-3">
              Practical Advice for Every Stage of Your Career
            </h2>

            <p
              className="text-secondary mb-0"
              style={{
                lineHeight: "1.9",
                fontSize: "1.05rem",
              }}
            >
              Securing the right role requires more than mass-applying. Job
              seekers need clear resume architectures, role-tailored technical
              preparation, behavioral interview strategies, and an accurate
              understanding of modern hiring patterns.
            </p>

            <p
              className="text-secondary mt-3 mb-0"
              style={{
                lineHeight: "1.9",
                fontSize: "1.05rem",
              }}
            >
              JobNest Career Guides provide fresh graduates and working
              professionals with structured walkthroughs, checklists, ATS-safe
              formatting tips, and interview questions sourced from actual tech
              recruitment drives.
            </p>
          </div>
        </section>

        {/* LATEST GUIDES */}
        <section className="container pb-5">
          <div className="mb-4">
            <h2 className="fw-bold h2 mb-2">Latest Career Guides</h2>

            <p className="text-secondary mb-0">
              Browse our latest job-search, resume, and interview preparation
              resources.
            </p>
          </div>

          <div className="row g-4">
            {guidesData.map((guide) => (
              <div className="col-lg-4 col-md-6" key={guide.id}>
                <article className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
                      <span className="badge bg-primary-subtle text-primary">
                        {guide.category}
                      </span>

                      <span className="small text-muted">{guide.readTime}</span>
                    </div>

                    <h3 className="h5 fw-bold mb-3">
                      <Link
                        to={`/career-guides/${guide.slug}`}
                        className="text-dark text-decoration-none"
                      >
                        {guide.title}
                      </Link>
                    </h3>

                    <p
                      className="text-secondary small flex-grow-1"
                      style={{ lineHeight: "1.7" }}
                    >
                      {guide.summary}
                    </p>

                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex justify-content-between align-items-center gap-3">
                        <span className="text-muted small">
                          <i className="bi bi-calendar3 me-1"></i>
                          Updated {guide.date}
                        </span>

                        <Link
                          to={`/career-guides/${guide.slug}`}
                          className="text-decoration-none fw-semibold small"
                        >
                          Read Guide →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        {/* RESOURCE CATEGORIES */}
        <section className="bg-light py-5">
          <div className="container">
            <div
              className="text-center mx-auto mb-5"
              style={{ maxWidth: "700px" }}
            >
              <h2 className="fw-bold h2 mb-3">Explore Career Resources</h2>

              <p className="text-secondary mb-0">
                Focus on the specific area of your job search that needs
                attention.
              </p>
            </div>

            <div className="row g-4">
              {/* RESUME */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body p-4">
                    <div
                      className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: "55px",
                        height: "55px",
                      }}
                    >
                      <i className="bi bi-file-earmark-person fs-4"></i>
                    </div>

                    <h3 className="h4 fw-bold">Resume Guidance</h3>

                    <p className="text-secondary" style={{ lineHeight: "1.8" }}>
                      Learn how to structure ATS-friendly resumes, describe
                      actionable outcomes, highlight key technical projects, and
                      tailor applications effectively.
                    </p>

                    <Link
                      to="/career-guides/ats-friendly-resume-guide"
                      className="text-decoration-none fw-semibold"
                    >
                      Explore Resume Guide →
                    </Link>
                  </div>
                </div>
              </div>

              {/* INTERVIEW */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body p-4">
                    <div
                      className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: "55px",
                        height: "55px",
                      }}
                    >
                      <i className="bi bi-chat-dots fs-4"></i>
                    </div>

                    <h3 className="h4 fw-bold">Interview Preparation</h3>

                    <p className="text-secondary" style={{ lineHeight: "1.8" }}>
                      Prepare for common HR, behavioral, technical rounds, and
                      company-specific interview patterns with structured,
                      practical responses.
                    </p>

                    <Link
                      to="/career-guides/top-interview-questions-freshers-2026"
                      className="text-decoration-none fw-semibold"
                    >
                      Explore Interview Guide →
                    </Link>
                  </div>
                </div>
              </div>

              {/* JOB SEARCH */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body p-4">
                    <div
                      className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: "55px",
                        height: "55px",
                      }}
                    >
                      <i className="bi bi-search fs-4"></i>
                    </div>

                    <h3 className="h4 fw-bold">Job Search Strategies</h3>

                    <p className="text-secondary" style={{ lineHeight: "1.8" }}>
                      Discover effective strategies for identifying off-campus
                      drives, vetting genuine recruiter outreach, avoiding
                      scams, and managing job submissions.
                    </p>

                    <Link
                      to="/career-guides/off-campus-job-hunting-strategy"
                      className="text-decoration-none fw-semibold"
                    >
                      Explore Job Search Guide →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-5">
          <div className="card border-0 shadow-sm rounded-4 text-center">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold h2 mb-3">
                Ready to Apply What You've Learned?
              </h2>

              <p
                className="text-secondary mx-auto mb-4"
                style={{
                  maxWidth: "650px",
                  lineHeight: "1.8",
                }}
              >
                Browse current job opportunities and use JobNest's career
                resources to prepare before submitting your next application.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link
                  to="/jobs"
                  className="btn btn-primary px-4 py-2 fw-semibold"
                >
                  <i className="bi bi-briefcase me-2"></i>
                  Find Jobs
                </Link>

                <Link
                  to="/resume-checker"
                  className="btn btn-outline-primary px-4 py-2 fw-semibold"
                >
                  Check Your Resume
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
