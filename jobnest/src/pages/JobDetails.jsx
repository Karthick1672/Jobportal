import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
      console.error('Error fetching job details:', error.message);
    } else {
      setJob(data);
    }
    setLoading(false);
  };

  const handleShare = () => {
    const jobUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: job.title,
          text: `Check out this opening for ${job.title} at ${job.company}!`,
          url: jobUrl,
        })
        .catch((err) => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(jobUrl);
      alert('Job link copied to clipboard!');
    }
  };

  const renderFormattedDescription = (descriptionText) => {
    if (!descriptionText) return null;

    const points = descriptionText
      .split(/(?:•|\n)+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return (
      <ul className="ps-3 text-secondary" style={{ lineHeight: '1.8' }}>
        {points.map((point, index) => (
          <li key={index} className="mb-2">
            {point}
          </li>
        ))}
      </ul>
    );
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
      <div className="container py-5 text-center">
        <h4>Job listing not found.</h4>
        <Link to="/jobs" className="btn btn-primary mt-3">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${job.title} | ${job.company}`}</title>
      </Helmet>

      <div className="container py-5">
        <div className="row g-4">
          {/* Main Details */}
          <div className="col-lg-8">
            <div className="d-flex gap-2 mb-3">
              <span className="badge bg-primary-subtle text-primary">{job.category}</span>
              <span className="badge bg-light text-dark border">{job.type}</span>
            </div>

            <h2 className="fw-bold mb-2">{job.title}</h2>
            <h5 className="text-muted mb-4">{job.company}</h5>

            <div className="d-flex flex-wrap gap-4 text-secondary mb-4 pb-3 border-bottom">
              <span>📍 {job.location}</span>
              {job.salary && <span>💰 {job.salary}</span>}
              <span>💼 {job.experience || '0-2 Years'}</span>
            </div>

            <div className="mb-4">
              <h4 className="fw-bold mb-3">Job Description</h4>
              {renderFormattedDescription(job.description)}
            </div>

            {/* Centered Button After Job Details */}
            <div className="pt-4 border-top mt-4 text-center">
              <Link to="/jobs" className="btn btn-outline-primary px-4 py-2 fw-semibold">
                🔍 Explore More Jobs
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 rounded-4">
              <h5 className="fw-bold mb-2">Apply for this position</h5>
              <p className="text-muted small">
                Submit your application directly to the recruiting team at {job.company}.
              </p>

              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-100 py-2 mb-2 fw-semibold"
              >
                Apply Now ↗
              </a>

              <button onClick={handleShare} className="btn btn-outline-secondary w-100 py-2">
                🔗 Share Job
              </button>

              {job.skills && (
                <div className="mt-4 pt-3 border-top">
                  <h6 className="fw-bold mb-3">Required Skills</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {job.skills.split(',').map((skill, index) => (
                      <span key={index} className="badge bg-light text-dark border px-2 py-2">
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