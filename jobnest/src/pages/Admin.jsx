import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../services/supabase';

export const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: 'IT & Software',
    type: 'Full Time',
    location: '',
    salary: '',
    experience: '',
    skills: '',
    applyLink: '', // Matches 'applyLink' column in Supabase
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('jobs')
      .insert([formData]);

    setLoading(false);

    if (error) {
      alert('Error posting job: ' + error.message);
      console.error(error);
    } else {
      alert('Job posted successfully to Supabase!');
      setFormData({
        title: '',
        company: '',
        category: 'IT & Software',
        type: 'Full Time',
        location: '',
        salary: '',
        experience: '',
        skills: '',
        applyLink: '',
        description: ''
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | JobNest</title>
      </Helmet>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4 rounded-4">
                <h3 className="fw-bold mb-1">Admin - Quick Job Publisher</h3>
                <p className="text-muted small mb-4">Post a new job opening directly to the database.</p>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Job Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Software Engineer"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Company Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Sasken Technologies"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Category</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="IT & Software">IT & Software</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Job Type</label>
                      <select
                        className="form-select"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Location *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Bangalore / Remote"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Salary Range</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 4 to 7 LPA"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Experience Level</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 1-3 Years"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Required Skills (Comma separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="React.js, JavaScript, Node.js, CSS"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold text-primary">Apply Link URL *</label>
                      <input
                        type="url"
                        className="form-control border-primary"
                        placeholder="https://company.com/careers/apply-job-id"
                        value={formData.applyLink}
                        onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Job Description *</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Describe the responsibilities and requirements..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <div className="col-12 mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary w-100 py-2 fw-semibold" 
                        disabled={loading}
                      >
                        {loading ? 'Publishing...' : 'Publish Job'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};