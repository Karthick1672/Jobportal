import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export const Home = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { name: "IT & Software", icon: "bi-code-slash" },
    { name: "Engineering", icon: "bi-gear-wide-connected" },
    { name: "Finance", icon: "bi-cash-stack" },
    { name: "Marketing", icon: "bi-megaphone" },
    { name: "Healthcare", icon: "bi-hospital" },
    { name: "Design", icon: "bi-palette" },
    { name: "Education", icon: "bi-mortarboard" },
    { name: "Sales", icon: "bi-graph-up-arrow" },
  ];

  useEffect(() => {
    fetchHomeJobs();
  }, []);

  const fetchHomeJobs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error.message);
      setJobs([]);
      setAllJobs([]);
    } else {
      const jobData = data || [];

      setAllJobs(jobData);
      setJobs(jobData.slice(0, 6));
    }

    setLoading(false);
  };

  const locationOptions = useMemo(() => {
    return [
      ...new Set(
        allJobs
          .map((job) => job.location)
          .filter(Boolean)
          .map((location) => location.trim())
      ),
    ].sort();
  }, [allJobs]);

  const categoryOptions = useMemo(() => {
    return [
      ...new Set(
        allJobs
          .map((job) => job.category)
          .filter(Boolean)
          .map((category) => category.trim())
      ),
    ].sort();
  }, [allJobs]);

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    const combinedSearch = [
      searchTerm.trim(),
      selectedLocation.trim(),
    ]
      .filter(Boolean)
      .join(" ");

    if (combinedSearch) {
      params.set("search", combinedSearch);
    }

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    const queryString = params.toString();

    navigate(
      queryString
        ? `/jobs?${queryString}`
        : "/jobs"
    );
  };

  return (
    <>
      <Helmet>
        <title>
          Find Jobs & Career Guidance | JobNest
        </title>

        <meta
          name="description"
          content="Discover current job opportunities and practical career resources on JobNest. Search jobs by company, location and category, and prepare with resume and interview guides."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://jobnest.work/"
        />

        <meta
          property="og:title"
          content="Find Jobs & Career Guidance | JobNest"
        />

        <meta
          property="og:description"
          content="Discover job opportunities and prepare for your career with practical resume, interview and job-search resources from JobNest."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://jobnest.work/"
        />

        <meta
          property="og:site_name"
          content="JobNest"
        />
      </Helmet>

      <main>
        {/* HERO */}
        <section className="bg-dark text-white py-5 position-relative overflow-hidden">
          <div className="container py-lg-5">

            <div className="row justify-content-center text-center">

              <div className="col-lg-9">

                <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-3">
                  Find Opportunities. Prepare Better.
                </span>

                <h1 className="display-4 fw-bold mb-3">
                  Find Jobs and Prepare for Your Next Career Move
                </h1>

                <p
                  className="lead text-light mx-auto mb-4"
                  style={{
                    maxWidth: "760px",
                    lineHeight: "1.8",
                  }}
                >
                  Discover job opportunities from companies
                  across different industries and use
                  practical JobNest resources to improve your
                  resume, interview preparation, and job
                  search.
                </p>

                {/* SEARCH */}
                <div className="card border-0 p-3 shadow-lg rounded-4 text-dark text-start">

                  <form
                    className="row g-2 align-items-center"
                    onSubmit={handleSearch}
                  >

                    {/* KEYWORD */}
                    <div className="col-lg-4 col-md-12">

                      <label
                        htmlFor="homeJobSearch"
                        className="visually-hidden"
                      >
                        Job title, company or keyword
                      </label>

                      <div className="input-group">

                        <span className="input-group-text bg-transparent border-0">
                          <i className="bi bi-search text-muted"></i>
                        </span>

                        <input
                          id="homeJobSearch"
                          type="search"
                          className="form-control border-0 shadow-none"
                          placeholder="Job title, company or keyword"
                          value={searchTerm}
                          onChange={(e) =>
                            setSearchTerm(e.target.value)
                          }
                        />

                      </div>

                    </div>

                    {/* LOCATION */}
                    <div className="col-lg-3 col-md-6">

                      <label
                        htmlFor="homeLocation"
                        className="visually-hidden"
                      >
                        Location
                      </label>

                      <select
                        id="homeLocation"
                        className="form-select border-0 shadow-none"
                        value={selectedLocation}
                        onChange={(e) =>
                          setSelectedLocation(e.target.value)
                        }
                      >
                        <option value="">
                          All Locations
                        </option>

                        {locationOptions.map((location) => (
                          <option
                            value={location}
                            key={location}
                          >
                            {location}
                          </option>
                        ))}

                      </select>

                    </div>

                    {/* CATEGORY */}
                    <div className="col-lg-3 col-md-6">

                      <label
                        htmlFor="homeCategory"
                        className="visually-hidden"
                      >
                        Category
                      </label>

                      <select
                        id="homeCategory"
                        className="form-select border-0 shadow-none"
                        value={selectedCategory}
                        onChange={(e) =>
                          setSelectedCategory(e.target.value)
                        }
                      >
                        <option value="">
                          All Categories
                        </option>

                        {categoryOptions.map((category) => (
                          <option
                            value={category}
                            key={category}
                          >
                            {category}
                          </option>
                        ))}

                      </select>

                    </div>

                    {/* SEARCH BUTTON */}
                    <div className="col-lg-2 col-md-12">

                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-2"
                      >
                        Search Jobs
                      </button>

                    </div>

                  </form>

                </div>

                <div className="mt-4 d-flex justify-content-center flex-wrap gap-3">

                  <Link
                    to="/jobs"
                    className="text-white text-decoration-none small"
                  >
                    Browse all jobs →
                  </Link>

                  <Link
                    to="/guides"
                    className="text-white text-decoration-none small"
                  >
                    Career guides →
                  </Link>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* POPULAR CATEGORIES */}
        <section className="py-5 bg-light">

          <div className="container">

            <div className="text-center mb-5">

              <span className="text-primary fw-semibold">
                Explore Opportunities
              </span>

              <h2 className="fw-bold mb-2 mt-2">
                Browse Job Categories
              </h2>

              <p
                className="text-muted mx-auto"
                style={{ maxWidth: "650px" }}
              >
                Explore different career fields and quickly
                narrow your search to opportunities that
                match your skills and interests.
              </p>

            </div>

            <div className="row g-3">

              {categories.map((cat) => (

                <div
                  key={cat.name}
                  className="col-xl-3 col-lg-4 col-md-6"
                >

                  <Link
                    to={`/jobs?category=${encodeURIComponent(
                      cat.name
                    )}`}
                    className="text-decoration-none text-dark"
                  >

                    <div className="jn-card p-4 text-center h-100">

                      <div
                        className="bg-primary-subtle text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: "60px",
                          height: "60px",
                        }}
                      >
                        <i
                          className={`bi ${cat.icon} fs-3`}
                        ></i>
                      </div>

                      <h3 className="h6 fw-bold mb-2">
                        {cat.name}
                      </h3>

                      <span className="text-muted small">
                        Explore {cat.name} opportunities
                      </span>

                    </div>

                  </Link>

                </div>

              ))}

            </div>

            <div className="text-center mt-4">

              <Link
                to="/categories"
                className="btn btn-outline-primary"
              >
                View All Categories
              </Link>

            </div>

          </div>

        </section>

        {/* LATEST JOBS */}
        <section className="py-5 bg-white">

          <div className="container">

            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">

              <div>

                <span className="text-primary fw-semibold">
                  Latest Opportunities
                </span>

                <h2 className="fw-bold mb-1 mt-2">
                  Recently Added Jobs
                </h2>

                <p className="text-muted mb-0">
                  Explore some of the latest opportunities
                  published on JobNest.
                </p>

              </div>

              <Link
                to="/jobs"
                className="btn btn-outline-primary"
              >
                View All Jobs
              </Link>

            </div>

            {loading ? (

              <div
                className="text-center py-5"
                aria-live="polite"
              >

                <div
                  className="spinner-border text-primary"
                  role="status"
                >
                  <span className="visually-hidden">
                    Loading...
                  </span>
                </div>

                <p className="mt-3 text-muted">
                  Loading latest jobs...
                </p>

              </div>

            ) : jobs.length === 0 ? (

              <div className="text-center py-5">

                <h3 className="h5 fw-bold">
                  No Current Job Listings
                </h3>

                <p className="text-muted">
                  New opportunities will appear here when
                  they are available.
                </p>

                <Link
                  to="/guides"
                  className="btn btn-outline-primary mt-2"
                >
                  Explore Career Guides
                </Link>

              </div>

            ) : (

              <div className="row g-4">

                {jobs.map((job) => {

                  const passoutYear =
                    job.passout_year ??
                    job.passoutYear;

                  return (

                    <div
                      key={job.id}
                      className="col-lg-4 col-md-6"
                    >

                      <article className="jn-card p-4 h-100 d-flex flex-column">

                        <div>

                          <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">

                            {job.company && (
                              <span className="badge bg-primary-subtle text-primary fw-semibold">
                                {job.company}
                              </span>
                            )}

                            <div className="d-flex gap-1 align-items-center flex-wrap">

                              {passoutYear && (
                                <span className="badge bg-info-subtle text-info border border-info-subtle">
                                  🎓 {passoutYear} Batch
                                </span>
                              )}

                              {job.type && (
                                <span className="badge bg-light text-dark border">
                                  {job.type}
                                </span>
                              )}

                            </div>

                          </div>

                          <h3 className="h5 fw-bold mb-3">

                            <Link
                              to={`/jobs/${job.id}`}
                              className="text-dark text-decoration-none"
                            >
                              {job.title || "Job Opportunity"}
                            </Link>

                          </h3>

                          <div className="d-flex flex-column gap-2 text-secondary small mb-4">

                            {job.location && (
                              <span>
                                <i className="bi bi-geo-alt me-2 text-primary"></i>
                                {job.location}
                              </span>
                            )}

                            {job.salary && (
                              <span>
                                <i className="bi bi-cash-stack me-2"></i>
                                {job.salary}
                              </span>
                            )}

                            {job.experience && (
                              <span>
                                <i className="bi bi-briefcase me-2"></i>
                                {job.experience}
                              </span>
                            )}

                          </div>

                        </div>

                        <div className="mt-auto pt-3 border-top">

                          <Link
                            to={`/jobs/${job.id}`}
                            className="btn btn-outline-primary btn-sm w-100 fw-semibold"
                          >
                            View Job Details
                          </Link>

                        </div>

                      </article>

                    </div>

                  );
                })}

              </div>

            )}

          </div>

        </section>

        {/* WHY JOBNEST */}
        <section className="py-5 bg-light">

          <div className="container">

            <div className="text-center mb-5">

              <span className="text-primary fw-semibold">
                Why JobNest
              </span>

              <h2 className="fw-bold mt-2">
                More Than a List of Job Openings
              </h2>

              <p
                className="text-muted mx-auto"
                style={{ maxWidth: "720px" }}
              >
                JobNest combines job discovery with
                practical career resources designed to help
                job seekers understand opportunities,
                prepare better, and make informed
                application decisions.
              </p>

            </div>

            <div className="row g-4">

              <div className="col-md-4">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body p-4">

                    <div className="fs-2 mb-3">
                      🔎
                    </div>

                    <h3 className="h5 fw-bold">
                      Discover Opportunities
                    </h3>

                    <p className="text-muted mb-0">
                      Browse openings across different
                      roles, companies, locations,
                      experience levels, and career
                      categories.
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body p-4">

                    <div className="fs-2 mb-3">
                      📘
                    </div>

                    <h3 className="h5 fw-bold">
                      Prepare Before Applying
                    </h3>

                    <p className="text-muted mb-0">
                      Use JobNest career guides to improve
                      resumes, prepare for interviews,
                      strengthen professional profiles, and
                      build better job-search habits.
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body p-4">

                    <div className="fs-2 mb-3">
                      ✅
                    </div>

                    <h3 className="h5 fw-bold">
                      Check Before You Apply
                    </h3>

                    <p className="text-muted mb-0">
                      Review each role carefully and confirm
                      important details through the
                      employer's official careers page
                      before applying.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CAREER GUIDES */}
        <section className="py-5 bg-white">

          <div className="container">

            <div className="row align-items-center g-5">

              <div className="col-lg-7">

                <span className="text-primary fw-semibold">
                  Career Resources
                </span>

                <h2 className="fw-bold display-6 mt-2 mb-3">
                  Improve Your Job Search, Not Just Your
                  Application Count
                </h2>

                <p
                  className="text-secondary"
                  style={{ lineHeight: "1.9" }}
                >
                  Finding a job requires more than sending
                  resumes. JobNest publishes practical
                  guides covering interview preparation,
                  ATS-friendly resumes, off-campus job
                  searching, professional profiles, and
                  other common challenges faced by job
                  seekers.
                </p>

                <p
                  className="text-secondary"
                  style={{ lineHeight: "1.9" }}
                >
                  These resources are designed to help
                  users understand common hiring practices,
                  prepare stronger applications, and make
                  better decisions throughout their job
                  search.
                </p>

                <Link
                  to="/guides"
                  className="btn btn-primary px-4 mt-2"
                >
                  Explore Career Guides
                </Link>

              </div>

              <div className="col-lg-5">

                <div className="bg-light rounded-4 p-4 p-md-5">

                  <h3 className="h5 fw-bold mb-4">
                    Career topics on JobNest
                  </h3>

                  <ul className="text-secondary mb-0">

                    <li className="mb-3">
                      Resume writing and ATS preparation
                    </li>

                    <li className="mb-3">
                      Technical and HR interview preparation
                    </li>

                    <li className="mb-3">
                      Off-campus job-search strategies
                    </li>

                    <li className="mb-3">
                      LinkedIn and professional profile
                      improvement
                    </li>

                    <li>
                      Job-search planning for fresh
                      graduates
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* JOB SEARCH SAFETY */}
        <section className="py-5 bg-light">

          <div className="container">

            <div className="row justify-content-center">

              <div className="col-lg-10">

                <div className="text-center mb-5">

                  <span className="text-primary fw-semibold">
                    Job Search Safety
                  </span>

                  <h2 className="fw-bold mt-2">
                    Apply Safely and Protect Your
                    Information
                  </h2>

                  <p
                    className="text-muted mx-auto"
                    style={{ maxWidth: "700px" }}
                  >
                    Online job searches can sometimes
                    include misleading or fraudulent
                    offers. Verify important details before
                    sharing personal information.
                  </p>

                </div>

                <div className="card border-0 shadow-sm rounded-4">

                  <div className="card-body p-4 p-md-5">

                    <div className="row g-4">

                      <div className="col-md-4">

                        <div className="fs-3 mb-3">
                          🏢
                        </div>

                        <h3 className="h6 fw-bold">
                          Verify the Employer
                        </h3>

                        <p className="text-muted small mb-0">
                          Confirm the role through the
                          company's official website or
                          careers portal whenever possible.
                        </p>

                      </div>

                      <div className="col-md-4">

                        <div className="fs-3 mb-3">
                          💳
                        </div>

                        <h3 className="h6 fw-bold">
                          Be Careful With Payment Requests
                        </h3>

                        <p className="text-muted small mb-0">
                          Treat requests for payment in
                          exchange for interviews, offer
                          letters, or guaranteed employment
                          with caution.
                        </p>

                      </div>

                      <div className="col-md-4">

                        <div className="fs-3 mb-3">
                          🔐
                        </div>

                        <h3 className="h6 fw-bold">
                          Protect Personal Information
                        </h3>

                        <p className="text-muted small mb-0">
                          Avoid sharing unnecessary
                          financial, identity, or account
                          information before verifying the
                          recruiter and employer.
                        </p>

                      </div>

                    </div>

                    <div className="text-center mt-4">

                      <Link
                        to="/guides"
                        className="text-decoration-none fw-semibold"
                      >
                        Learn more from our career guides →
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* WHO JOBNEST HELPS */}
        <section className="py-5 bg-white">

          <div className="container">

            <div className="text-center mb-5">

              <span className="text-primary fw-semibold">
                Built for Job Seekers
              </span>

              <h2 className="fw-bold mt-2">
                Support for Different Stages of Your Career
              </h2>

            </div>

            <div className="row g-4">

              <div className="col-md-4">

                <div className="border rounded-4 p-4 h-100">

                  <h3 className="h5 fw-bold">
                    Fresh Graduates
                  </h3>

                  <p className="text-muted mb-0">
                    Discover entry-level opportunities and
                    learn how to prepare resumes, projects,
                    interviews, and off-campus
                    applications.
                  </p>

                </div>

              </div>

              <div className="col-md-4">

                <div className="border rounded-4 p-4 h-100">

                  <h3 className="h5 fw-bold">
                    Experienced Professionals
                  </h3>

                  <p className="text-muted mb-0">
                    Explore new opportunities and improve
                    your interview, application, and
                    career-growth strategies.
                  </p>

                </div>

              </div>

              <div className="col-md-4">

                <div className="border rounded-4 p-4 h-100">

                  <h3 className="h5 fw-bold">
                    Career Switchers
                  </h3>

                  <p className="text-muted mb-0">
                    Learn how to reposition existing
                    experience, develop relevant skills,
                    and prepare for opportunities in a new
                    field.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* FINAL CTA */}
        <section className="py-5 bg-dark text-white">

          <div className="container text-center py-3">

            <h2 className="fw-bold display-6 mb-3">
              Take the Next Step in Your Career
            </h2>

            <p
              className="text-light mx-auto mb-4"
              style={{ maxWidth: "700px" }}
            >
              Explore current opportunities, prepare with
              practical career guides, and use JobNest
              resources throughout your job search.
            </p>

            <div className="d-flex justify-content-center flex-wrap gap-3">

              <Link
                to="/jobs"
                className="btn btn-primary px-4 py-2"
              >
                Browse Jobs
              </Link>

              <Link
                to="/guides"
                className="btn btn-outline-light px-4 py-2"
              >
                Career Guides
              </Link>

              <Link
                to="/about"
                className="btn btn-outline-light px-4 py-2"
              >
                About JobNest
              </Link>

            </div>

          </div>

        </section>

      </main>
    </>
  );
};