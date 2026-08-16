import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { jobsData } from '../data/Jobs';

export const JobDetails = () => {
  const { id } = useParams();

  const job = jobsData.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold">Job Not Found</h3>
        <p className="text-muted">The listing you are looking for does not exist.</p>
        <Link to="/jobs" className="btn jn-btn-primary mt-2">Back to Jobs</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${job.title} at ${job.company} | JobNest`}</title>
      </Helmet>

      <section className="py-5 bg-light">
        <div className="container">
          <Link to="/jobs" className="text-decoration-none text-secondary small d-inline-flex align-items-center mb-4">
            <i className="bi bi-arrow-left me-1"></i> Back to Job Listings
          </Link>

          <div className="row g-4">
            {/* MAIN CONTENT */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                  <div>
                    <span className="badge bg-primary-subtle text-primary fw-semibold me-2">{job.category}</span>
                    <span className="badge bg-light text-dark">{job.type}</span>
                    <h2 className="fw-bold text-dark mt-2 mb-1">{job.title}</h2>
                    <p className="text-muted mb-0">{job.company}</p>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 text-secondary small py-3 border-top border-bottom my-3">
                  <span><i className="bi bi-geo-alt me-1 text-primary"></i>{job.location}</span>
                  <span><i className="bi bi-cash me-1 text-success"></i>{job.salary}</span>
                  <span><i className="bi bi-briefcase me-1 text-info"></i>{job.experience}</span>
                  <span><i className="bi bi-calendar3 me-1 text-warning"></i>Posted: {job.postedDate}</span>
                </div>

                <h5 className="fw-bold mb-3">Job Description</h5>
                <p className="text-secondary leading-relaxed mb-4">{job.description}</p>

                {job.responsibilities && (
                  <>
                    <h5 className="fw-bold mb-3">Key Responsibilities</h5>
                    <ul className="text-secondary mb-4">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="mb-2">{resp}</li>
                      ))}
                    </ul>
                  </>
                )}

                {job.requirements && (
                  <>
                    <h5 className="fw-bold mb-3">Requirements</h5>
                    <ul className="text-secondary mb-4">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="mb-2">{req}</li>
                      ))}
                    </ul>
                  </>
                )}

                {job.benefits && (
                  <>
                    <h5 className="fw-bold mb-3">Benefits & Perks</h5>
                    <ul className="text-secondary mb-0">
                      {job.benefits.map((ben, i) => (
                        <li key={i} className="mb-2">{ben}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* SIDEBAR ACTION CARD */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm p-4 rounded-4 sticky-top" style={{ top: '100px' }}>
                <h5 className="fw-bold mb-3">Apply for this position</h5>
                <p className="text-muted small mb-4">Submit your profile to notify the recruiting team at {job.company}.</p>

                <a
                  href={job.applyLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn jn-btn-primary w-100 py-2 text-center text-decoration-none fw-semibold"
                >
                  Apply Now
                </a>

                <hr className="my-4" />

                <h6 className="fw-bold mb-2">Required Skills</h6>
                <div className="d-flex flex-wrap gap-1">
                  {job.skills && job.skills.map((skill, i) => (
                    <span key={i} className="badge bg-secondary-subtle text-dark fw-normal">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};