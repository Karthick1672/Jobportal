import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../services/supabase';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('contacts')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      ]);

    if (error) {
      console.error('Error submitting contact message:', error.message);
      alert('Failed to send your message. Please try again.');
    } else {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | JobNest</title>
        <meta name="description" content="Get in touch with the JobNest team for inquiries, support, or job postings." />
      </Helmet>

      <div className="container py-5" style={{ maxWidth: '750px' }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold mb-2">Get in Touch</h1>
          <p className="text-muted">
            Have questions, feedback, or a partnership inquiry? Fill out the form below or email us directly at{' '}
            <span className="text-primary fw-semibold">support@jobnest.work</span>.
          </p>
        </div>

        {submitted ? (
          <div className="alert alert-success p-4 rounded-4 text-center shadow-sm">
            <h5 className="fw-bold mb-2">Thank you for reaching out!</h5>
            <p className="mb-3 text-secondary">Your message has been sent successfully. We will get back to you shortly.</p>
            <button 
              className="btn btn-outline-success btn-sm"
              onClick={() => setSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    className="form-control"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-12 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};