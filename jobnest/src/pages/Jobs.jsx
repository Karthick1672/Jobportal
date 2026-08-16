import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { jobsData } from '../data/Jobs';

export const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // Filter Logic
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
    const matchesType = selectedType ? job.type === selectedType : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesType;
  });

  // Sort Logic
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    }
    return 0;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSelectedType('');
    setSortBy('latest');
  };

  return (
    <>
      <Helmet>
        <title>Find Jobs | JobNest</title>
      </Helmet>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Explore Available Jobs</h2>
            <p className="text-muted">Discover roles matching your skills and experience</p>
          </div>

          {/* FILTER & SEARCH BAR */}
          <div className="card border-0 shadow-sm p-3 mb-4 rounded-4">
            <div className="row g-3">
              <div className="col-lg-4 col-md-12">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0"><i className="bi bi-search text-muted"></i></span>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search by role, company, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-2 col-md-4">
                <select className="form-select border-0 shadow-none" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  <option value="IT & Software">IT & Software</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div className="col-lg-2 col-md-4">
                <select className="form-select border-0 shadow-none" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                  <option value="">All Locations</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="col-lg-2 col-md-4">
                <select className="form-select border-0 shadow-none" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                  <option value="">Job Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="col-lg-2 col-md-12">
                <button className="btn jn-btn-outline w-100" onClick={clearFilters}>Reset Filters</button>
              </div>
            </div>
          </div>

          {/* RESULTS COUNTER & SORT */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="text-muted fw-medium">{sortedJobs.length} Jobs Found</span>
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small">Sort by:</span>
              <select className="form-select form-select-sm w-auto shadow-none" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="latest">Latest Posted</option>
              </select>
            </div>
          </div>

          {/* JOB LISTINGS */}
          <div className="row g-4">
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job) => (
                <div key={job.id} className="col-lg-4 col-md-6" data-aos="fade-up">
                  <div className="jn-card p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="badge bg-primary-subtle text-primary fw-semibold">{job.company}</span>
                        <span className="badge bg-light text-dark">{job.type}</span>
                      </div>
                      <h5 className="fw-bold text-dark fs-6 mb-2">{job.title}</h5>
                      <div className="d-flex flex-wrap gap-2 text-secondary small mb-3">
                        <span><i className="bi bi-geo-alt me-1 text-primary"></i>{job.location}</span>
                        <span><i className="bi bi-cash me-1 text-success"></i>{job.salary}</span>
                      </div>
                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {job.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="badge bg-secondary-subtle text-dark fw-normal small">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-top d-flex align-items-center justify-content-between">
                      <span className="text-muted small">{job.experience}</span>
                      <Link to={`/jobs/${job.id}`} className="btn jn-btn-outline btn-sm">View Job</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5 col-12">
                <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
                <h5 className="fw-bold text-dark">No jobs match your criteria</h5>
                <p className="text-muted">Try resetting your filters or adjusting your search term.</p>
                <button className="btn jn-btn-primary mt-2" onClick={clearFilters}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};