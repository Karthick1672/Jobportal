import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../services/supabase";

export const Jobs = () => {
  const [searchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";

  const urlCategory = searchParams.get("category") || "All";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState(urlSearch);

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);

  const [selectedType, setSelectedType] = useState("All");

  const [selectedYear, setSelectedYear] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 10;

  // FETCH JOBS
  useEffect(() => {
    fetchJobs();
  }, []);

  // READ SEARCH + CATEGORY FROM URL
  useEffect(() => {
    setSearchTerm(urlSearch);
    setSelectedCategory(urlCategory);
    setCurrentPage(1);
  }, [urlSearch, urlCategory]);

  // RESET PAGINATION WHEN FILTERS CHANGE
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedType, selectedYear]);

  const fetchJobs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (error) {
      console.error("Error fetching jobs:", error.message);

      setJobs([]);
    } else {
      setJobs(data || []);
    }

    setLoading(false);
  };

  // CATEGORY OPTIONS
  const categoryOptions = useMemo(() => {
    return [...new Set(jobs.map((job) => job.category).filter(Boolean))].sort();
  }, [jobs]);

  // JOB TYPE OPTIONS
  const typeOptions = useMemo(() => {
    return [...new Set(jobs.map((job) => job.type).filter(Boolean))].sort();
  }, [jobs]);

  // GRADUATION YEAR OPTIONS
  const yearOptions = useMemo(() => {
    return [
      ...new Set(
        jobs
          .map((job) => job.passout_year ?? job.passoutYear)
          .filter(Boolean)
          .map(String),
      ),
    ].sort((a, b) => Number(b) - Number(a));
  }, [jobs]);

  // FILTER JOBS
  const filteredJobs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return jobs.filter((job) => {
      const jobYear = job.passout_year ?? job.passoutYear;

      const title = job.title?.toLowerCase() || "";

      const company = job.company?.toLowerCase() || "";

      const location = job.location?.toLowerCase() || "";

      const category = job.category?.toLowerCase() || "";

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        company.includes(normalizedSearch) ||
        location.includes(normalizedSearch) ||
        category.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "All" || job.category === selectedCategory;

      const matchesType = selectedType === "All" || job.type === selectedType;

      const matchesYear =
        selectedYear === "All" ||
        (jobYear != null && String(jobYear) === selectedYear);

      return matchesSearch && matchesCategory && matchesType && matchesYear;
    });
  }, [jobs, searchTerm, selectedCategory, selectedType, selectedYear]);

  // PAGINATION
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;

  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // CLEAR FILTERS
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedType("All");
    setSelectedYear("All");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedType !== "All" ||
    selectedYear !== "All";

  return (
    <>
      <Helmet>
        <title>Find Jobs, Internships & Fresher Openings | JobNest</title>

        <meta
          name="description"
          content="Explore job openings, internships, fresher opportunities, and entry-level roles on JobNest. Search by job title, company, location, category, job type, and graduation year."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://jobnest.work/jobs" />

        <meta
          property="og:title"
          content="Find Jobs & Career Opportunities | JobNest"
        />

        <meta
          property="og:description"
          content="Search current job openings by title, company, location, category, job type, and graduation year."
        />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://jobnest.work/jobs" />

        <meta property="og:site_name" content="JobNest" />
      </Helmet>

      <main>
        {/* HERO */}
        <section className="bg-light border-bottom">
          <div className="container py-5">
            <div
              className="text-center mx-auto"
              style={{
                maxWidth: "850px",
              }}
            >
              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">
                Job Opportunities
              </span>

              <h1 className="display-5 fw-bold mb-3">
                Find Jobs That Match Your Skills and Career Goals
              </h1>

              <p
                className="lead text-secondary mb-0"
                style={{
                  lineHeight: "1.8",
                }}
              >
                Browse job openings from different companies and industries. Use
                the filters below to narrow opportunities by title, employer,
                location, category, job type, and graduation year.
              </p>
            </div>
          </div>
        </section>

        <div className="container py-5">
          {/* SEARCH & FILTERS */}
          <section
            className="card border-0 shadow-sm rounded-4 mb-5"
            aria-labelledby="job-search-heading"
          >
            <div className="card-body p-4 p-md-5">
              <div className="mb-4">
                <h2 id="job-search-heading" className="h4 fw-bold mb-2">
                  Search Job Openings
                </h2>

                <p className="text-secondary mb-0">
                  Refine the listings to find opportunities that are more
                  relevant to you.
                </p>
              </div>

              <div className="row g-3">
                {/* SEARCH */}
                <div className="col-lg-4">
                  <label htmlFor="jobSearch" className="form-label fw-semibold">
                    Search
                  </label>

                  <input
                    id="jobSearch"
                    type="search"
                    className="form-control form-control-lg"
                    placeholder="Job title, company, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* CATEGORY */}
                <div className="col-lg-3 col-md-4">
                  <label
                    htmlFor="jobCategory"
                    className="form-label fw-semibold"
                  >
                    Category
                  </label>

                  <select
                    id="jobCategory"
                    className="form-select form-select-lg"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>

                    {categoryOptions.map((category) => (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TYPE */}
                <div className="col-lg-2 col-md-4">
                  <label htmlFor="jobType" className="form-label fw-semibold">
                    Job Type
                  </label>

                  <select
                    id="jobType"
                    className="form-select form-select-lg"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="All">All Types</option>

                    {typeOptions.map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* YEAR */}
                <div className="col-lg-3 col-md-4">
                  <label
                    htmlFor="passoutYear"
                    className="form-label fw-semibold"
                  >
                    Graduation Year
                  </label>

                  <select
                    id="passoutYear"
                    className="form-select form-select-lg"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="All">All Graduation Years</option>

                    {yearOptions.map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={resetFilters}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* RESULTS HEADER */}
          {!loading && jobs.length > 0 && (
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
              <div>
                <h2 className="h3 fw-bold mb-1">Current Job Openings</h2>

                <p className="text-secondary mb-0">
                  {filteredJobs.length === 1
                    ? "1 job matches your current search."
                    : `${filteredJobs.length} jobs match your current search.`}
                </p>
              </div>

              {hasActiveFilters && (
                <span className="badge bg-primary-subtle text-primary px-3 py-2">
                  Filters Active
                </span>
              )}
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="text-center py-5" aria-live="polite">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>

              <p className="mt-3 text-muted">Loading job openings...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            /* EMPTY STATE */
            <section className="text-center py-5">
              <div
                className="mx-auto"
                style={{
                  maxWidth: "550px",
                }}
              >
                <div className="mb-3">
                  <i className="bi bi-search fs-1 text-muted"></i>
                </div>

                <h2 className="h4 fw-bold">No Matching Jobs Found</h2>

                <p className="text-secondary">
                  We couldn't find a listing that matches your current search
                  and filters. Try a broader search or clear your filters.
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={resetFilters}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </section>
          ) : (
            <>
              {/* JOB CARDS */}
              <div className="row g-4 mb-4">
                {currentJobs.map((job) => {
                  const passoutYear = job.passout_year ?? job.passoutYear;

                  return (
                    <div key={job.id} className="col-md-6 col-lg-4">
                      <article className="card h-100 border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 d-flex flex-column">
                          {/* TAGS */}
                          <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                            {job.category ? (
                              <span className="badge bg-primary-subtle text-primary">
                                {job.category}
                              </span>
                            ) : (
                              <span />
                            )}

                            {job.type && (
                              <span className="badge bg-light text-dark border">
                                {job.type}
                              </span>
                            )}
                          </div>

                          {/* TITLE */}
                          <h3 className="h5 fw-bold mb-2">
                            <Link
                              to={`/jobs/${job.id}`}
                              className="text-dark text-decoration-none"
                            >
                              {job.title || "Job Opportunity"}
                            </Link>
                          </h3>

                          {/* COMPANY */}
                          {job.company && (
                            <p className="text-muted mb-3">
                              <i className="bi bi-building me-2"></i>
                              {job.company}
                            </p>
                          )}

                          {/* DETAILS */}
                          <div className="d-flex flex-column gap-2 text-secondary small mb-4">
                            {job.location && (
                              <span>
                                <i className="bi bi-geo-alt me-2"></i>
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

                            {passoutYear && (
                              <span>
                                <i className="bi bi-mortarboard me-2"></i>
                                {passoutYear} Batch
                              </span>
                            )}
                          </div>

                          {/* BUTTON */}
                          <div className="mt-auto pt-3 border-top">
                            <Link
                              to={`/jobs/${job.id}`}
                              className="btn btn-primary w-100 fw-semibold"
                            >
                              View Job Details
                            </Link>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <nav aria-label="Job listings pagination" className="mt-5">
                  <ul className="pagination justify-content-center flex-wrap">
                    {/* PREVIOUS */}
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {/* PAGE NUMBERS */}
                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => handlePageChange(page)}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                        >
                          {page}
                        </button>
                      </li>
                    ))}

                    {/* NEXT */}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}

          {/* TRUST / GUIDANCE */}
          <section className="bg-light rounded-4 p-4 p-md-5 mt-5">
            <div className="row g-4">
              <div className="col-lg-8">
                <h2 className="h4 fw-bold mb-3">
                  Review Each Opportunity Carefully
                </h2>

                <p
                  className="text-secondary mb-0"
                  style={{
                    lineHeight: "1.8",
                  }}
                >
                  JobNest helps users discover job opportunities and career
                  information. Before applying, review the full job description,
                  eligibility requirements, location, skills, salary
                  information, application deadline, and employer website where
                  available. Applicants should independently verify important
                  details before submitting personal information.
                </p>
              </div>

              <div className="col-lg-4">
                <div className="d-grid gap-2">
                  <Link to="/guides" className="btn btn-outline-primary">
                    Career Guides
                  </Link>

                  <Link
                    to="/resume-checker"
                    className="btn btn-outline-primary"
                  >
                    Resume Checker
                  </Link>

                  <Link to="/contact" className="btn btn-outline-secondary">
                    Report a Listing
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
