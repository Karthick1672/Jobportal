import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../services/supabase';

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('post');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingJobs, setFetchingJobs] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full Time',
    category: 'IT & Software',
    salary: '',
    experience: '0-2 Years',
    passout_year: '',
    skills: '',
    applyLink: '',
    description: ''
  });

  // Check login session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('isAdminAuth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'manage') {
      fetchJobs();
    }
  }, [activeTab, isAuthenticated]);

  // Handle Login Submit
  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect admin password!');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuth');
  };

  // Fetch Jobs from Supabase
  const fetchJobs = async () => {
    setFetchingJobs(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error loading jobs:', error.message);
    } else {
      setJobs(data || []);
    }
    setFetchingJobs(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Format passout_year to integer or null for Supabase
    const payload = {
      ...formData,
      passout_year: formData.passout_year ? parseInt(formData.passout_year, 10) : null
    };

    const { error } = await supabase.from('jobs').insert([payload]);

    setLoading(false);
    if (error) {
      setMessage({ type: 'danger', text: `Error posting job: ${error.message}` });
    } else {
      setMessage({ type: 'success', text: 'Job posted successfully!' });
      setFormData({
        title: '',
        company: '',
        location: '',
        type: 'Full Time',
        category: 'IT & Software',
        salary: '',
        experience: '0-2 Years',
        passout_year: '',
        skills: '',
        applyLink: '',
        description: ''
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job listing?')) return;

    const { error } = await supabase.from('jobs').delete().eq('id', id);

    if (error) {
      alert(`Error deleting job: ${error.message}`);
    } else {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  // Handle Share Functionality
  const handleShare = (job) => {
    const jobUrl = `${window.location.origin}/jobs/${job.id}`;

    if (navigator.share) {
      navigator
        .share({
          title: job.title,
          text: `Check out this opening for ${job.title} at ${job.company}!`,
          url: jobUrl,
        })
        .catch((err) => console.error('Error sharing job:', err));
    } else {
      navigator.clipboard.writeText(jobUrl);
      alert('Job link copied to clipboard!');
    }
  };

  // 🔒 PASSWORD LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="card border-0 shadow-lg p-4 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h4 className="fw-bold mb-3 text-center">Admin Access</h4>
          <p className="text-muted small text-center mb-4">Please enter your master password to access the portal dashboard.</p>

          {authError && <div className="alert alert-danger py-2 small">{authError}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 🔓 AUTHENTICATED DASHBOARD SCREEN
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | JobNest</title>
      </Helmet>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">Admin Dashboard</h2>

          <div className="d-flex gap-2">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${activeTab === 'post' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('post')}
              >
                ➕ Post Job
              </button>
              <button
                type="button"
                className={`btn ${activeTab === 'manage' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('manage')}
              >
                📋 Manage Jobs ({jobs.length})
              </button>
            </div>

            <button onClick={handleLogout} className="btn btn-outline-danger">
              Logout
            </button>
          </div>
        </div>

        {/* TAB 1: POST A JOB FORM */}
        {activeTab === 'post' && (
          <div className="card border-0 shadow-sm p-4 rounded-4">
            <h4 className="fw-bold mb-3">Create Job Listing</h4>

            {message.text && (
              <div className={`alert alert-${message.type} alert-dismissible fade show`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Location *</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Job Type</label>
                  <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Category</label>
                  <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Salary Range</label>
                  <input
                    type="text"
                    name="salary"
                    className="form-control"
                    placeholder="e.g. 4 to 7 LPA"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Experience Level</label>
                  <input
                    type="text"
                    name="experience"
                    className="form-control"
                    placeholder="e.g. 0-2 Years"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Passed Out Year <span className="text-muted fw-normal">(Optional)</span>
                  </label>
                  <select
                    name="passout_year"
                    className="form-select"
                    value={formData.passout_year}
                    onChange={handleChange}
                  >
                    <option value="">Any Batch / Not Specified</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Skills (Comma separated)</label>
                  <input
                    type="text"
                    name="skills"
                    className="form-control"
                    placeholder="coding, testing, support"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Apply Link URL *</label>
                  <input
                    type="url"
                    name="applyLink"
                    className="form-control"
                    placeholder="https://company.com/careers/apply"
                    value={formData.applyLink}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Job Description *</label>
                  <textarea
                    name="description"
                    rows="4"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary px-4 py-2" disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Job Listing'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: MANAGE & DELETE JOBS */}
        {activeTab === 'manage' && (
          <div className="card border-0 shadow-sm p-4 rounded-4">
            <h4 className="fw-bold mb-3">Posted Job Openings</h4>

            {fetchingJobs ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Loading posted jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-5 text-muted">
                No jobs posted yet.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Title</th>
                      <th>Company</th>
                      <th>Batch Year</th>
                      <th>Type</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="fw-bold">{job.title}</td>
                        <td>{job.company}</td>
                        <td>
                          {job.passout_year ? (
                            <span className="badge bg-info-subtle text-info border">
                              {job.passout_year}
                            </span>
                          ) : (
                            <span className="text-muted small">Any</span>
                          )}
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">{job.type}</span>
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => handleShare(job)}
                            className="btn btn-sm btn-outline-primary me-2"
                            title="Share Job Link"
                          >
                            🔗 Share
                          </button>
                          <a
                            href={job.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-secondary me-2"
                          >
                            Link ↗
                          </a>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};