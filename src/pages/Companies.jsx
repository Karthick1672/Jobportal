import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../services/supabase";

export const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompaniesFromSupabase = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("jobs").select("*");

      if (error) {
        console.error("Error loading jobs for companies page:", error.message);
      } else if (data) {
        // Aggregate company stats from Supabase data rows
        const uniqueCompanies = Array.from(
          new Set(data.map((job) => job.company)),
        ).map((companyName) => {
          const companyJobs = data.filter((job) => job.company === companyName);
          return {
            name: companyName,
            openings: companyJobs.length,
            locations: Array.from(
              new Set(companyJobs.map((j) => j.location)),
            ).join(", "),
            categories: Array.from(
              new Set(companyJobs.map((j) => j.category)),
            ).join(", "),
          };
        });
        setCompanies(uniqueCompanies);
      }
      setLoading(false);
    };

    fetchCompaniesFromSupabase();
  }, []);

  return (
    <>
      <Helmet>
        <title>Top Hiring Companies | JobNest</title>
      </Helmet>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Top Hiring Companies</h2>
            <p className="text-muted">
              Discover leading organizations looking for talent like you
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Loading companies...</p>
            </div>
          ) : companies.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No companies found from active listings.
            </div>
          ) : (
            <div className="row g-4">
              {companies.map((company, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="jn-card p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div
                          className="rounded-circle bg-light border text-dark d-flex align-items-center justify-content-center fw-bold fs-5 shadow-sm"
                          style={{
                            width: "50px",
                            height: "50px",
                            flexShrink: 0,
                          }}
                        >
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="fw-bold text-dark mb-0 fs-6">
                            {company.name}
                          </h5>
                          <span className="badge bg-primary-subtle text-primary mt-1">
                            {company.openings} Open Position
                            {company.openings > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted small mb-2">
                        <i className="bi bi-geo-alt me-1 text-primary"></i>
                        <strong>Locations:</strong> {company.locations}
                      </p>
                      <p className="text-muted small mb-0">
                        <i className="bi bi-tag me-1 text-info"></i>
                        <strong>Domains:</strong> {company.categories}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-top">
                      <Link
                        to={`/jobs?search=${encodeURIComponent(company.name)}`}
                        className="btn jn-btn-outline btn-sm w-100"
                      >
                        View Openings <i className="bi bi-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
