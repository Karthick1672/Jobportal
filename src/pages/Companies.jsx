import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../services/supabase";

export const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompaniesFromSupabase = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select("company, location, category");

      if (error) {
        console.error(
          "Error loading jobs for companies page:",
          error.message
        );
        setCompanies([]);
        setLoading(false);
        return;
      }

      const validJobs = (data || []).filter(
        (job) => job.company && job.company.trim() !== ""
      );

      const companyMap = new Map();

      validJobs.forEach((job) => {
        const companyName = job.company.trim();

        if (!companyMap.has(companyName)) {
          companyMap.set(companyName, {
            name: companyName,
            openings: 0,
            locations: new Set(),
            categories: new Set(),
          });
        }

        const company = companyMap.get(companyName);

        company.openings += 1;

        if (job.location) {
          company.locations.add(job.location.trim());
        }

        if (job.category) {
          company.categories.add(job.category.trim());
        }
      });

      const uniqueCompanies = Array.from(
        companyMap.values()
      )
        .map((company) => ({
          name: company.name,
          openings: company.openings,
          locations: Array.from(company.locations),
          categories: Array.from(company.categories),
        }))
        .sort((a, b) => {
          if (b.openings !== a.openings) {
            return b.openings - a.openings;
          }

          return a.name.localeCompare(b.name);
        });

      setCompanies(uniqueCompanies);
      setLoading(false);
    };

    fetchCompaniesFromSupabase();
  }, []);

  const totalOpenings = useMemo(() => {
    return companies.reduce(
      (total, company) => total + company.openings,
      0
    );
  }, [companies]);

  return (
    <>
      <Helmet>
        <title>
          Companies Hiring Now | JobNest
        </title>

        <meta
          name="description"
          content="Explore companies with current job listings on JobNest. Browse employers, locations, job categories, and available opportunities."
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://jobnest.work/companies"
        />

        <meta
          property="og:title"
          content="Companies Hiring Now | JobNest"
        />

        <meta
          property="og:description"
          content="Browse companies with current job listings and explore available opportunities by employer, location, and job category."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://jobnest.work/companies"
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
            <div
              className="text-center mx-auto"
              style={{ maxWidth: "850px" }}
            >
              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">
                Employers
              </span>

              <h1 className="display-5 fw-bold mb-3">
                Explore Companies With Current Job Openings
              </h1>

              <p
                className="lead text-secondary mb-0"
                style={{ lineHeight: "1.8" }}
              >
                Browse companies represented in JobNest job
                listings and explore opportunities by employer,
                location, and career category.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-5">
          {!loading && companies.length > 0 && (
            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <div className="border rounded-4 p-4 text-center h-100">
                  <div className="h2 fw-bold text-primary mb-1">
                    {companies.length}
                  </div>

                  <p className="text-secondary mb-0">
                    Companies with listings
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded-4 p-4 text-center h-100">
                  <div className="h2 fw-bold text-primary mb-1">
                    {totalOpenings}
                  </div>

                  <p className="text-secondary mb-0">
                    Current listings represented
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4">
            <h2 className="h3 fw-bold mb-2">
              Companies on JobNest
            </h2>

            <p className="text-secondary mb-0">
              Company information below is generated from the
              job listings currently available on JobNest.
            </p>
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
                Loading companies...
              </p>
            </div>
          ) : companies.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-building fs-1 text-muted"></i>

              <h2 className="h4 fw-bold mt-3">
                No Companies Available
              </h2>

              <p className="text-secondary">
                There are currently no company listings
                available. Check the jobs page for the latest
                opportunities.
              </p>

              <Link
                to="/jobs"
                className="btn btn-primary"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {companies.map((company) => (
                <div
                  key={company.name}
                  className="col-lg-4 col-md-6"
                >
                  <article className="card border-0 shadow-sm rounded-4 h-100">
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div
                          className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold fs-5"
                          style={{
                            width: "52px",
                            height: "52px",
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        >
                          {company.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <h3 className="h5 fw-bold mb-1">
                            {company.name}
                          </h3>

                          <span className="badge bg-primary-subtle text-primary">
                            {company.openings}{" "}
                            {company.openings === 1
                              ? "Open Position"
                              : "Open Positions"}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        {company.locations.length > 0 && (
                          <div className="mb-3">
                            <div className="small fw-semibold mb-1">
                              <i className="bi bi-geo-alt me-2 text-primary"></i>
                              Locations
                            </div>

                            <p
                              className="text-secondary small mb-0"
                              style={{ lineHeight: "1.7" }}
                            >
                              {company.locations.join(", ")}
                            </p>
                          </div>
                        )}

                        {company.categories.length > 0 && (
                          <div>
                            <div className="small fw-semibold mb-2">
                              <i className="bi bi-tags me-2 text-primary"></i>
                              Job Categories
                            </div>

                            <div className="d-flex flex-wrap gap-2">
                              {company.categories.map(
                                (category) => (
                                  <span
                                    key={category}
                                    className="badge bg-light text-dark border"
                                  >
                                    {category}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto pt-3 border-top">
                        <Link
                          to={`/jobs?search=${encodeURIComponent(
                            company.name
                          )}`}
                          className="btn btn-outline-primary w-100 fw-semibold"
                        >
                          View {company.name} Jobs
                          <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* INFORMATION */}
        <section className="bg-light py-5">
          <div className="container">
            <div
              className="mx-auto"
              style={{ maxWidth: "850px" }}
            >
              <h2 className="h3 fw-bold mb-3">
                About Company Listings
              </h2>

              <p
                className="text-secondary"
                style={{ lineHeight: "1.9" }}
              >
                The companies displayed on this page are
                based on current job listings available on
                JobNest. A company appearing here does not
                necessarily mean that JobNest has a direct
                partnership with that employer.
              </p>

              <p
                className="text-secondary mb-0"
                style={{ lineHeight: "1.9" }}
              >
                Job availability and hiring information may
                change. Review each job listing carefully and
                confirm important details through the
                employer's official recruitment or careers
                page before applying.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container py-5">
          <div className="text-center">
            <h2 className="h3 fw-bold mb-3">
              Looking for Your Next Opportunity?
            </h2>

            <p className="text-secondary mb-4">
              Browse current openings from companies listed
              across JobNest.
            </p>

            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Link
                to="/jobs"
                className="btn btn-primary px-4"
              >
                Browse All Jobs
              </Link>

              <Link
                to="/guides"
                className="btn btn-outline-primary px-4"
              >
                Career Guides
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};