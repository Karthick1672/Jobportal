import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

export const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'IT & Software', icon: 'bi-code-slash', count: '2,540 Jobs' },
    { name: 'Engineering', icon: 'bi-gear-wide-connected', count: '1,210 Jobs' },
    { name: 'Finance', icon: 'bi-cash-stack', count: '890 Jobs' },
    { name: 'Marketing', icon: 'bi-megaphone', count: '750 Jobs' },
    { name: 'Healthcare', icon: 'bi-hospital', count: '620 Jobs' },
    { name: 'Design', icon: 'bi-palette', count: '480 Jobs' },
    { name: 'Education', icon: 'bi-mortarboard', count: '390 Jobs' },
    { name: 'Sales', icon: 'bi-graph-up-arrow', count: '1,150 Jobs' },
  ];

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('id', { ascending: false })
      .limit(6); // Show top 6 latest jobs on homepage

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
        <title>Find Your Dream Job Today | JobNest</title>
        <meta name="description" content="Find your dream job with JobNest, the modern React portal." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="bg-dark text-white py-5 position-relative overflow-hidden">
        <div className="container py-lg-4">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9" data-aos="zoom-in">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-3 fs-6">
                🚀 Find Your Dream Job. Build Your Future
              </span>
              <h1 className="display-4 fw-bold mb-3">Find Your Dream Job Today</h1>
              <p className="lead text-secondary mb-4">
                Discover thousands of opportunities from trusted companies and take the next step in your career.
              </p>

              {/* SEARCH BAR */}
              <div className="card border-0 p-3 shadow-lg rounded-4 text-dark text-start" data-aos="fade-up" data-aos-delay="200">
                <form className="row g-2 align-items-center">
                  <div className="col-lg-4 col-md-12">
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-0"><i className="bi bi-search text-muted"></i></span>
                      <input type="text" className="form-control border-0 shadow-none" placeholder="Job title, skills or keyword" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <select className="form-select border-0 shadow-none">
                      <option value="">Location</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <select className="form-select border-0 shadow-none">
                      <option value="">Category</option>
                      <option value="IT">IT & Software</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-12">
                    <button type="button" className="btn jn-btn-primary w-100 py-2">
                      Search Jobs
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h3 className="fw-bold mb-2">Popular Categories</h3>
            <p className="text-muted">Explore jobs tailored to your specialty</p>
          </div>

          <div className="row g-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(idx % 4) * 100}>
                <div className="jn-card p-4 text-center h-100 cursor-pointer">
                  <div className="bg-primary-subtle text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className={`bi ${cat.icon} fs-3`}></i>
                  </div>
                  <h6 className="fw-bold mb-1">{cat.name}</h6>
                  <span className="text-muted small">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4" data-aos="fade-right">
            <div>
              <h3 className="fw-bold mb-1">Featured Job Openings</h3>
              <p className="text-muted mb-0">Hand-picked roles from top employers</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Loading featured jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No featured jobs available.</p>
            </div>
          ) : (
            <div className="row g-4">
              {jobs.map((job) => {
                const passoutYear = job.passout_year ?? job.passoutYear;

                return (
                  <div key={job.id} className="col-lg-4 col-md-6" data-aos="fade-up">
                    <div className="jn-card p-4 h-100 d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex align-items-center justify-content-between mb-3 gap-2">
                          <span className="badge bg-primary-subtle text-primary fw-semibold">{job.company}</span>
                          
                          <div className="d-flex gap-1 align-items-center">
                            {/* Passed Out Year Badge */}
                            {passoutYear && (
                              <span className="badge bg-info-subtle text-info border border-info-subtle">
                                🎓 {passoutYear} Batch
                              </span>
                            )}
                            <span className="badge bg-light text-dark">{job.type}</span>
                          </div>
                        </div>
                        
                        <h5 className="fw-bold text-dark fs-6 mb-2">{job.title}</h5>
                        
                        <div className="d-flex flex-wrap gap-2 text-secondary small mb-3">
                          <span><i className="bi bi-geo-alt me-1 text-primary"></i>{job.location}</span>
                          {job.salary && <span><i className="bi bi-cash me-1 text-success"></i>{job.salary}</span>}
                        </div>
                      </div>

                      <div className="pt-3 border-top d-flex align-items-center justify-content-between">
                        <span className="text-muted small">{job.experience || 'Freshers'}</span>
                        <Link to={`/jobs/${job.id}`} className="btn jn-btn-outline btn-sm text-decoration-none">
                          View Job
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};