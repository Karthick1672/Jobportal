import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { jobsData } from '../data/Jobs';

export const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: 'Bangalore',
    type: 'Full Time',
    category: 'IT & Software',
    salary: '',
    experience: '1-3 Years',
    description: '',
    skills: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: `job-${jobsData.length + 1}`,
      title: formData.title,
      company: formData.company,
      location: formData.location,
      type: formData.type,
      category: formData.category,
      salary: formData.salary,
      experience: formData.experience,
      postedDate: new Date().toISOString().split('T')[0],
      description: formData.description,
      skills: formData.skills.split(',').map((skill) => skill.trim()),
      responsibilities: ['Collaborate with cross-functional teams.'],
      requirements: ['Relevant industry experience required.'],
      benefits: ['Competitive compensation', 'Health insurance']
    };

    // Append new job to list
    jobsData.unshift(newJob);

    alert('Job posted successfully!');
    navigate('/jobs');
  };

  return (
    <>
      <Helmet>
        <title>Post a Job | JobNest</title>
      </Helmet>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4 rounded-4">
                <h3 className="fw-bold mb-1">Post a New Job Opening</h3>
                <p className="text-muted small mb-4">Fill out the details below to publish your opening to top candidates.</p>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Frontend Developer"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. TechCorp Solutions"
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
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-semibold">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Remote / Chennai"
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
                        placeholder="e.g. ₹8–12 LPA"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Experience Level</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 2-4 Years"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        required
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
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Job Description</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Describe the responsibilities and requirements..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <div className="col-12 mt-4">
                      <button type="submit" className="btn jn-btn-primary w-100 py-2">
                        Publish Job
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