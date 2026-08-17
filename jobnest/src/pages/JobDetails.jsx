import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../services/supabase';

export const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching job:', error.message);
    } else {
      setJob(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-5">
        <h4>Job not found</h4>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{job.title} | JobNest</title>
      </Helmet>

      <div className="container py-5">
        <div className="row g-4">
          {/* Main Description */}
          <div className="col-lg-8">
            <div className="d-flex gap-2 mb-2">
              <span className="badge bg-primary-subtle text-primary">{job.category}</span>
              <span className="badge bg-light text-dark border">{job.type}</span>
            </div>
            <h2 className="fw-bold mb-1">{job.title}</h2>
            <p className="text-muted fs-5 mb-4">{job.company}</p>

            <div className="d-flex flex-wrap gap-3 mb-4 text-muted small">
              <span>📍 {job.location}</span>
              {job.salary && <span>💰 {job.salary}</span>}
              {job.experience && <span>💼 {job.experience}</span>}
            </div>

            <hr />

            <h5 className="fw-bold mt-4">Job Description</h5>
            <p className="text-secondary style-whitespace">{job.description}</p>
          </div>

          {/* Right Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 sticky-top" style={{ top: '20px' }}>
              <h5 className="fw-bold mb-2">Apply for this position</h5>
              <p className="text-muted small mb-4">
                Submit your application directly to the recruiting team at {job.company}.
              </p>

              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-100 py-2 fw-semibold"
              >
                Apply Now
              </a>

              {job.skills && (
                <div className="mt-4">
                  <h6 className="fw-bold mb-2">Required Skills</h6>
                  <div className="d-flex flex-wrap gap-1">
                    {job.skills.split(',').map((skill, index) => (
                      <span key={index} className="badge bg-light text-dark border me-1 mb-1">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};