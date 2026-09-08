import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { categoriesData } from "../data/categories";
import { supabase } from "../services/supabase";

export const Categories = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      const { data, error } = await supabase.from("jobs").select("category");

      if (error) {
        console.error("Error loading category job counts:", error.message);
        setJobs([]);
      } else {
        setJobs(data || []);
      }

      setLoading(false);
    };

    fetchJobs();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};

    jobs.forEach((job) => {
      if (!job.category) return;

      const category = job.category.trim();

      counts[category] = (counts[category] || 0) + 1;
    });

    return counts;
  }, [jobs]);

  const totalJobs = jobs.length;

  return (
    <>
      <Helmet>
        <title>Browse Job Categories | JobNest</title>

        <meta
          name="description"
          content="Browse jobs by category on JobNest. Explore opportunities across technology, engineering, finance, marketing, and other career fields."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://jobnest.work/categories" />

        <meta property="og:title" content="Browse Job Categories | JobNest" />

        <meta
          property="og:description"
          content="Explore current job opportunities by career category and find roles that match your skills and interests."
        />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://jobnest.work/categories" />

        <meta property="og:site_name" content="JobNest" />
      </Helmet>

      <main>
        {/* HERO */}
        <section className="bg-light border-bottom">
          <div className="container py-5">
            <div className="text-center mx-auto" style={{ maxWidth: "850px" }}>
              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">
                Job Categories
              </span>

              <h1 className="display-5 fw-bold mb-3">
                Explore Jobs by Career Category
              </h1>

              <p
                className="lead text-secondary mb-0"
                style={{ lineHeight: "1.8" }}
              >
                Browse opportunities by field and specialization to quickly find
                jobs that match your skills, interests, and career direction.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORY SUMMARY */}
        {!loading && (
          <section className="container pt-5">
            <div className="row justify-content-center g-4">
              <div className="col-md-5">
                <div className="border rounded-4 p-4 text-center h-100">
                  <div className="h2 fw-bold text-primary mb-1">
                    {categoriesData.length}
                  </div>

                  <p className="text-secondary mb-0">Career Categories</p>
                </div>
              </div>

              <div className="col-md-5">
                <div className="border rounded-4 p-4 text-center h-100">
                  <div className="h2 fw-bold text-primary mb-1">
                    {totalJobs}
                  </div>

                  <p className="text-secondary mb-0">Current Job Listings</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CATEGORIES */}
        <section className="container py-5">
          <div className="mb-5 text-center">
            <h2 className="h3 fw-bold mb-2">Browse Career Fields</h2>

            <p
              className="text-secondary mx-auto mb-0"
              style={{ maxWidth: "700px" }}
            >
              Choose a category to view current opportunities available on
              JobNest.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5" aria-live="polite">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>

              <p className="text-muted mt-3">Loading job categories...</p>
            </div>
          ) : (
            <div className="row g-4">
              {categoriesData.map((cat) => {
                const jobCount = categoryCounts[cat.name] || 0;

                return (
                  <div key={cat.id} className="col-lg-4 col-md-6">
                    <article className="card border-0 shadow-sm rounded-4 h-100">
                      <div className="card-body p-4 d-flex flex-column">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div
                            className="bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                              width: "52px",
                              height: "52px",
                              flexShrink: 0,
                            }}
                            aria-hidden="true"
                          >
                            <i className={`bi ${cat.icon} fs-4`}></i>
                          </div>

                          <div>
                            <h3 className="h5 fw-bold text-dark mb-1">
                              {cat.name}
                            </h3>

                            <span className="text-primary small fw-semibold">
                              {jobCount === 1
                                ? "1 Current Job"
                                : `${jobCount} Current Jobs`}
                            </span>
                          </div>
                        </div>

                        <p
                          className="text-secondary small mb-4"
                          style={{ lineHeight: "1.7" }}
                        >
                          {cat.description}
                        </p>

                        <div className="mt-auto pt-3 border-top">
                          {jobCount > 0 ? (
                            <Link
                              to={`/jobs?category=${encodeURIComponent(
                                cat.name,
                              )}`}
                              className="btn btn-outline-primary w-100 fw-semibold"
                            >
                              Explore Jobs
                              <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                          ) : (
                            <Link
                              to="/jobs"
                              className="btn btn-outline-secondary w-100"
                            >
                              Browse All Jobs
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* HOW TO USE CATEGORIES */}
        <section className="bg-light py-5">
          <div className="container">
            <div className="mx-auto" style={{ maxWidth: "850px" }}>
              <h2 className="h3 fw-bold mb-4">
                Finding the Right Job Category
              </h2>

              <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                A job category groups together roles that share similar skills,
                responsibilities, or career paths. Browsing by category can make
                it easier to focus your search instead of reviewing unrelated
                opportunities.
              </p>

              <p className="text-secondary mb-0" style={{ lineHeight: "1.9" }}>
                Before applying, read the complete job description and check the
                required skills, experience, location, eligibility, and other
                conditions. Job titles can vary between companies even when the
                responsibilities are similar.
              </p>
            </div>
          </div>
        </section>

        {/* JOB SEARCH HELP */}
        <section className="container py-5">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="border rounded-4 p-4 h-100">
                <i className="bi bi-search fs-3 text-primary"></i>

                <h2 className="h5 fw-bold mt-3">Search Beyond Categories</h2>

                <p className="text-secondary small mb-3">
                  Search JobNest by job title, company, location, or keyword
                  when you already know the type of opportunity you want.
                </p>

                <Link to="/jobs" className="text-decoration-none fw-semibold">
                  Search Jobs
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="border rounded-4 p-4 h-100">
                <i className="bi bi-file-earmark-text fs-3 text-primary"></i>

                <h2 className="h5 fw-bold mt-3">Improve Your Resume</h2>

                <p className="text-secondary small mb-3">
                  Review your resume before applying and make sure your relevant
                  skills and experience are easy to understand.
                </p>

                <Link
                  to="/resume-checker"
                  className="text-decoration-none fw-semibold"
                >
                  Resume Checker
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="border rounded-4 p-4 h-100">
                <i className="bi bi-book fs-3 text-primary"></i>

                <h2 className="h5 fw-bold mt-3">Prepare Before Applying</h2>

                <p className="text-secondary small mb-3">
                  Explore practical resources covering resumes, interviews, job
                  searching, and career preparation.
                </p>

                <Link to="/guides" className="text-decoration-none fw-semibold">
                  Career Guides
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="container pb-5">
          <div className="alert alert-light border rounded-4 p-4">
            <div className="d-flex gap-3">
              <i className="bi bi-info-circle text-primary fs-4"></i>

              <div>
                <h2 className="h5 fw-bold">About Job Categories</h2>

                <p
                  className="text-secondary small mb-0"
                  style={{ lineHeight: "1.8" }}
                >
                  Categories are provided to make job discovery easier.
                  Individual employers may classify similar roles differently.
                  Always review the complete job listing and verify important
                  application information through the employer's official
                  recruitment or careers page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
