import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    // Fetch all jobs sorted by newest first
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error.message);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Find Jobs | JobNest</title>
      </Helmet>

      <section className="py-5 bg-white">
        <div className="container">
          <div className="mb-4" data-aos="fade-right">
            <h3 className="fw-bold mb-1">Featured Job Openings</h3>
            <p className="text-muted mb-0">Hand-picked roles from top employers</p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Loading job listings...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No jobs found in database.</p>
            </div>
          ) : (
            <div className="row g-4">
              {jobs.map((job) => (
                <div key={job.id} className="col-lg-4 col-md-6" data-aos="fade-up">
                  <div className="jn-card p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                      {/* Top badges */}
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="badge bg-primary-subtle text-primary fw-semibold">
                          {job.company}
                        </span>
                        <span className="badge bg-light text-dark">{job.type}</span>
                      </div>

                      {/* Job Title */}
                      <h5 className="fw-bold text-dark fs-6 mb-2">{job.title}</h5>

                      {/* Location and Salary */}
                      <div className="d-flex flex-wrap gap-2 text-secondary small mb-3">
                        <span>
                          <i className="bi bi-geo-alt me-1 text-primary"></i>
                          {job.location}
                        </span>
                        {job.salary && (
                          <span>
                            <i className="bi bi-cash me-1 text-success"></i>
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom row: Experience and View Job button */}
                    <div className="pt-3 border-top d-flex align-items-center justify-content-between">
                      <span className="text-muted small">
                        {job.experience || '0-2 Years'}
                      </span>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="btn jn-btn-outline btn-sm text-decoration-none"
                      >
                        View Job
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