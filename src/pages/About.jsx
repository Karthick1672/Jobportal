import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <Helmet>
        <title>
          About JobNest | Jobs, Career Guides & Job Search Support
        </title>

        <meta
          name="description"
          content="Learn about JobNest, a career platform helping job seekers discover opportunities, prepare for interviews, improve resumes, and make better career decisions."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://jobnest.work/about"
        />

        <meta
          property="og:title"
          content="About JobNest | Jobs & Career Resources"
        />

        <meta
          property="og:description"
          content="Learn how JobNest helps job seekers discover opportunities, prepare for interviews, improve resumes, and make informed career decisions."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://jobnest.work/about"
        />

        <meta
          property="og:site_name"
          content="JobNest"
        />
      </Helmet>

      <main>

        {/* HERO */}
        <section className="bg-light border-bottom">
          <div className="container py-5">
            <div className="row align-items-center g-5">

              <div className="col-lg-7">

                <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
                  About JobNest
                </span>

                <h1 className="display-4 fw-bold mb-4">
                  Helping job seekers move from
                  <span className="text-primary">
                    {" "}searching{" "}
                  </span>
                  to succeeding.
                </h1>

                <p
                  className="lead text-muted mb-4"
                  style={{ lineHeight: "1.8" }}
                >
                  JobNest is built to make job searching
                  simpler, clearer, and more useful by
                  combining job opportunities with practical
                  career guidance for freshers and experienced
                  professionals.
                </p>

                <div className="d-flex flex-wrap gap-3">

                  <Link
                    to="/jobs"
                    className="btn btn-primary px-4 py-2"
                  >
                    Explore Jobs
                  </Link>

                  <Link
                    to="/guides"
                    className="btn btn-outline-primary px-4 py-2"
                  >
                    Read Career Guides
                  </Link>

                </div>

              </div>

              <div className="col-lg-5">

                <div className="bg-white shadow-sm rounded-4 p-4 p-md-5">

                  <h2 className="h4 fw-bold mb-4">
                    What JobNest focuses on
                  </h2>

                  <div className="mb-4">

                    <h3 className="h6 fw-bold">
                      Job Discovery
                    </h3>

                    <p className="text-muted small mb-0">
                      Helping users find relevant job
                      opportunities across different companies,
                      roles, and experience levels.
                    </p>

                  </div>

                  <div className="mb-4">

                    <h3 className="h6 fw-bold">
                      Career Preparation
                    </h3>

                    <p className="text-muted small mb-0">
                      Practical guides for resumes,
                      interviews, applications, professional
                      profiles, and career growth.
                    </p>

                  </div>

                  <div>

                    <h3 className="h6 fw-bold">
                      Better Decisions
                    </h3>

                    <p className="text-muted small mb-0">
                      Clear information to help job seekers
                      understand opportunities before they
                      apply.
                    </p>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* QUICK OVERVIEW */}
        <section className="container py-5">

          <div className="row g-4 text-center">

            <div className="col-6 col-lg-3">

              <div className="border rounded-4 p-4 h-100">

                <h2 className="fw-bold text-primary mb-1">
                  Jobs
                </h2>

                <p className="text-muted small mb-0">
                  Opportunities across multiple roles
                </p>

              </div>

            </div>

            <div className="col-6 col-lg-3">

              <div className="border rounded-4 p-4 h-100">

                <h2 className="fw-bold text-primary mb-1">
                  Guides
                </h2>

                <p className="text-muted small mb-0">
                  Practical career resources
                </p>

              </div>

            </div>

            <div className="col-6 col-lg-3">

              <div className="border rounded-4 p-4 h-100">

                <h2 className="fw-bold text-primary mb-1">
                  Freshers
                </h2>

                <p className="text-muted small mb-0">
                  Entry-level career support
                </p>

              </div>

            </div>

            <div className="col-6 col-lg-3">

              <div className="border rounded-4 p-4 h-100">

                <h2 className="fw-bold text-primary mb-1">
                  Professionals
                </h2>

                <p className="text-muted small mb-0">
                  Career growth resources
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* MISSION */}
        <section className="container pb-5">

          <div className="row g-5 align-items-center">

            <div className="col-lg-6">

              <span className="text-primary fw-semibold">
                Our Mission
              </span>

              <h2 className="fw-bold display-6 mt-2 mb-4">
                Make job searching more useful, not more
                confusing.
              </h2>

              <p
                className="text-secondary"
                style={{ lineHeight: "1.9" }}
              >
                Job seekers often move between job portals,
                company career pages, resume websites,
                interview videos, and social media just to
                prepare for a single application.
              </p>

              <p
                className="text-secondary"
                style={{ lineHeight: "1.9" }}
              >
                JobNest aims to reduce that confusion by
                bringing job discovery and practical career
                learning together in one platform.
              </p>

              <p
                className="text-secondary mb-0"
                style={{ lineHeight: "1.9" }}
              >
                Our goal is not only to show opportunities,
                but also to help users understand how to
                prepare for them.
              </p>

            </div>

            <div className="col-lg-6">

              <div className="row g-3">

                <div className="col-sm-6">

                  <div className="card border-0 shadow-sm rounded-4 h-100">

                    <div className="card-body p-4">

                      <div className="fs-3 mb-3">
                        🎯
                      </div>

                      <h3 className="h5 fw-bold">
                        Relevant Opportunities
                      </h3>

                      <p className="text-muted small mb-0">
                        Focus on roles and resources that can
                        actually help job seekers progress.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="col-sm-6">

                  <div className="card border-0 shadow-sm rounded-4 h-100">

                    <div className="card-body p-4">

                      <div className="fs-3 mb-3">
                        📘
                      </div>

                      <h3 className="h5 fw-bold">
                        Practical Guidance
                      </h3>

                      <p className="text-muted small mb-0">
                        Career content designed around real
                        job-search situations and common
                        questions.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="col-sm-6">

                  <div className="card border-0 shadow-sm rounded-4 h-100">

                    <div className="card-body p-4">

                      <div className="fs-3 mb-3">
                        🔍
                      </div>

                      <h3 className="h5 fw-bold">
                        Clear Information
                      </h3>

                      <p className="text-muted small mb-0">
                        Straightforward explanations without
                        unnecessary complexity.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="col-sm-6">

                  <div className="card border-0 shadow-sm rounded-4 h-100">

                    <div className="card-body p-4">

                      <div className="fs-3 mb-3">
                        🚀
                      </div>

                      <h3 className="h5 fw-bold">
                        Career Growth
                      </h3>

                      <p className="text-muted small mb-0">
                        Resources that help users improve
                        applications, interviews, and
                        professional skills.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* WHO WE HELP */}
        <section className="bg-light py-5">

          <div className="container">

            <div className="text-center mb-5">

              <span className="text-primary fw-semibold">
                Who We Help
              </span>

              <h2 className="fw-bold display-6 mt-2">
                Built for different stages of a career
              </h2>

            </div>

            <div className="row g-4">

              {/* FRESHERS */}
              <div className="col-md-4">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body p-4">

                    <h3 className="h4 fw-bold">
                      Fresh Graduates
                    </h3>

                    <p className="text-muted">
                      Resources for people entering the job
                      market for the first time.
                    </p>

                    <ul className="text-secondary small ps-3 mb-0">
                      <li className="mb-2">
                        Resume preparation
                      </li>

                      <li className="mb-2">
                        Interview questions
                      </li>

                      <li className="mb-2">
                        Entry-level job discovery
                      </li>

                      <li>
                        Off-campus job strategies
                      </li>
                    </ul>

                  </div>

                </div>

              </div>

              {/* PROFESSIONALS */}
              <div className="col-md-4">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body p-4">

                    <h3 className="h4 fw-bold">
                      Experienced Professionals
                    </h3>

                    <p className="text-muted">
                      Support for professionals looking for
                      better roles or career growth.
                    </p>

                    <ul className="text-secondary small ps-3 mb-0">

                      <li className="mb-2">
                        Job search strategies
                      </li>

                      <li className="mb-2">
                        Interview preparation
                      </li>

                      <li className="mb-2">
                        Career progression
                      </li>

                      <li>
                        Professional profile improvement
                      </li>

                    </ul>

                  </div>

                </div>

              </div>

              {/* CAREER SWITCHERS */}
              <div className="col-md-4">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body p-4">

                    <h3 className="h4 fw-bold">
                      Career Switchers
                    </h3>

                    <p className="text-muted">
                      Guidance for people transitioning into
                      new roles or industries.
                    </p>

                    <ul className="text-secondary small ps-3 mb-0">

                      <li className="mb-2">
                        Skill planning
                      </li>

                      <li className="mb-2">
                        Portfolio building
                      </li>

                      <li className="mb-2">
                        Resume repositioning
                      </li>

                      <li>
                        Target-role preparation
                      </li>

                    </ul>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CONTENT APPROACH */}
        <section className="container py-5">

          <div className="row justify-content-center">

            <div className="col-lg-9">

              <div className="text-center mb-5">

                <span className="text-primary fw-semibold">
                  Our Content Approach
                </span>

                <h2 className="fw-bold display-6 mt-2">
                  Useful information comes first
                </h2>

              </div>

              <div className="row g-4">

                <div className="col-md-6">

                  <div className="border rounded-4 p-4 h-100">

                    <h3 className="h5 fw-bold">
                      Practical
                    </h3>

                    <p className="text-muted mb-0">
                      Guides should give readers something
                      they can actually apply to their
                      resume, interview, or job search.
                    </p>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="border rounded-4 p-4 h-100">

                    <h3 className="h5 fw-bold">
                      Easy to Understand
                    </h3>

                    <p className="text-muted mb-0">
                      Career topics are explained clearly
                      without unnecessary jargon or
                      complicated language.
                    </p>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="border rounded-4 p-4 h-100">

                    <h3 className="h5 fw-bold">
                      Responsible
                    </h3>

                    <p className="text-muted mb-0">
                      Users are encouraged to verify
                      important information on official
                      employer websites before applying.
                    </p>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="border rounded-4 p-4 h-100">

                    <h3 className="h5 fw-bold">
                      Continuously Improved
                    </h3>

                    <p className="text-muted mb-0">
                      JobNest content can be updated as
                      hiring practices, technologies, and
                      job-search trends change.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* JOB LISTING DISCLAIMER */}
        <section className="container pb-5">

          <div className="alert alert-light border rounded-4 p-4">

            <div className="d-flex gap-3">

              <i className="bi bi-info-circle text-primary fs-4"></i>

              <div>

                <h2 className="h5 fw-bold">
                  Job Listing Information
                </h2>

                <p
                  className="text-muted small mb-0"
                  style={{ lineHeight: "1.8" }}
                >
                  JobNest provides job discovery information
                  to help users find opportunities. Job
                  availability, eligibility, salary,
                  deadlines, and hiring requirements may
                  change. Always confirm the latest
                  information through the employer's
                  official careers page before applying or
                  sharing personal information.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* CONTACT / TRANSPARENCY */}
        <section className="container pb-5">

          <div className="row justify-content-center">

            <div className="col-lg-9 text-center">

              <h2 className="fw-bold mb-3">
                Questions or Feedback?
              </h2>

              <p
                className="text-secondary mx-auto mb-4"
                style={{
                  maxWidth: "700px",
                  lineHeight: "1.8",
                }}
              >
                If you notice an incorrect or outdated job
                listing, have feedback about JobNest, or need
                to contact us about the platform, you can
                reach us through our contact page.
              </p>

              <Link
                to="/contact"
                className="btn btn-outline-primary px-4"
              >
                Contact JobNest
              </Link>

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="container pb-5">

          <div className="bg-primary text-white rounded-4 p-4 p-md-5 text-center">

            <h2 className="fw-bold display-6 mb-3">
              Build your next career move with JobNest
            </h2>

            <p
              className="mb-4 mx-auto"
              style={{ maxWidth: "650px" }}
            >
              Discover opportunities, improve your
              applications, and prepare with practical
              career resources.
            </p>

            <div className="d-flex justify-content-center flex-wrap gap-3">

              <Link
                to="/jobs"
                className="btn btn-light text-primary fw-semibold px-4"
              >
                Browse Jobs
              </Link>

              <Link
                to="/guides"
                className="btn btn-outline-light fw-semibold px-4"
              >
                Explore Career Guides
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline-light fw-semibold px-4"
              >
                Contact JobNest
              </Link>

            </div>

          </div>

        </section>

      </main>
    </>
  );
};