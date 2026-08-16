import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* BRAND COLUMN */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up">
            <Link to="/" className="d-flex align-items-center mb-3 text-decoration-none text-white">
              <img 
                src="/Jobnext.png" 
                alt="Jobnest Logo" 
                height="40" 
                className="rounded me-2"
              />
              <span className="fs-4 fw-bold">Job<span className="text-primary">nest</span></span>
            </Link>
            <p className="text-secondary small">
              Find Your Dream Job. Build Your Future. Connecting talented professionals with industry-leading companies worldwide.
            </p>
          </div>

          {/* JOB SEEKERS */}
          <div className="col-lg-2 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <h6 className="fw-bold mb-3">Job Seekers</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li>
                <Link to="/jobs" className="text-secondary text-decoration-none hover-primary">Find Jobs</Link>
              </li>
              <li>
                <Link to="/categories" className="text-secondary text-decoration-none hover-primary">Categories</Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-secondary text-decoration-none hover-primary">Saved Jobs</Link>
              </li>
            </ul>
          </div>

          {/* EMPLOYERS */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <h6 className="fw-bold mb-3">Employers</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li>
                <Link to="/post-job" className="text-secondary text-decoration-none hover-primary">Post a Job</Link>
              </li>
              <li>
                <Link to="/employer-dashboard" className="text-secondary text-decoration-none hover-primary">Employer Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* COMPANY & LEGAL */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li>
                <Link to="/about" className="text-secondary text-decoration-none hover-primary">About Us</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-secondary text-decoration-none hover-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-secondary text-decoration-none hover-primary">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />
        <div className="text-center text-secondary small">
          © {new Date().getFullYear()} Jobnest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};