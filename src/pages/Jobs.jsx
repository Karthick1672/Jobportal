import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../services/supabase';

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Pagination Configuration
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    fetchJobs();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedType, selectedYear]);

  const fetchJobs = async () => {
    setLoading(true);
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

  // Safe Filtering Logic (Handles null/undefined fields & both camelCase/snake_case)
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || job.category === selectedCategory;

    const matchesType =
      selectedType === 'All' || job.type === selectedType;

    const jobYear = job.passout_year ?? job.passoutYear;
    const matchesYear =
      selectedYear === 'All' ||
      (jobYear != null && String(jobYear) === selectedYear);

    return matchesSearch && matchesCategory && matchesType && matchesYear;
  });

  // Calculate Pagination Slices
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Find Jobs | JobNest</title>
      </Helmet>

      <div className="container py-5">
        {/* Search & Filter Header */}
        <div className="mb-5 text-center">
          <h2 className="fw-bold mb-3">Explore All Job Openings</h2>
          <p className="text-muted">Discover your next career move from top employers.</p>

          <div className="row g-2 justify-content-center mt-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                placeholder="Search title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-select-lg shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="IT & Software">IT & Software</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-lg shadow-sm"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select form-select-lg shadow-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="All">Passed Out Year</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Loading job openings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <h5>No jobs match your search criteria.</h5>
          </div>
        ) : (
          <>
            <div className="row g-4 mb-4">
              {currentJobs.map((job) => {
                const passoutYear = job.passout_year ?? job.passoutYear;

                return (
                  <div key={job.id} className="col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm rounded-4 p-3 d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                          <span className="badge bg-primary-subtle text-primary">{job.category}</span>
                          
                          <div className="d-flex gap-1 align-items-center">
                            {passoutYear && (
                              <span className="badge bg-info-subtle text-info border border-info-subtle">
                                🎓 {passoutYear} Batch
                              </span>
                            )}
                            <span className="badge bg-light text-dark border">{job.type}</span>
                          </div>
                        </div>

                        <h5 className="fw-bold mb-1">{job.title}</h5>
                        <p className="text-muted small mb-3">{job.company}</p>

                        <div className="d-flex flex-column gap-1 text-secondary small mb-3">
                          <span>📍 {job.location}</span>
                          {job.salary && <span>💰 {job.salary}</span>}
                        </div>
                      </div>

                      <div className="pt-3 border-top d-flex align-items-center justify-content-between">
                        <span className="text-muted small">💼 {job.experience || '0-2 Years'}</span>
                        <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm px-3">
                          View Job
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav aria-label="Job page navigation" className="mt-5">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &laquo; Previous
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <li
                      key={page}
                      className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
};