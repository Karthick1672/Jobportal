import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">

        <div className="row g-4">

          {/* BRAND */}
          <div
            className="col-lg-4 col-md-6"
            data-aos="fade-up"
          >
            <Link
              to="/"
              className="d-flex align-items-center mb-3 text-decoration-none text-white"
              aria-label="JobNest Home"
            >
              <img
                src="/Jobnext.png"
                alt="JobNest Logo"
                height="42"
                width="42"
                className="rounded me-2"
              />

              <span className="fs-4 fw-bold">
                JOB<span className="text-primary">NEST</span>
              </span>
            </Link>

            <p
              className="text-secondary small pe-lg-4"
              style={{ lineHeight: "1.8" }}
            >
              JobNest helps job seekers discover opportunities, explore
              companies, prepare for interviews, improve their resumes,
              and make more informed career decisions.
            </p>

            <p className="small mb-0">
              <i className="bi bi-envelope me-2 text-primary"></i>

              <a
                href="mailto:jobnest100@gmail.com"
                className="text-secondary text-decoration-none"
              >
                jobnest100@gmail.com
              </a>
            </p>
          </div>

          {/* JOB SEEKERS */}
          <div
            className="col-lg-2 col-md-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h6 className="fw-bold mb-3">
              Job Seekers
            </h6>

            <ul className="list-unstyled small d-flex flex-column gap-2">

              <li>
                <Link
                  to="/jobs"
                  className="text-secondary text-decoration-none"
                >
                  Find Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="text-secondary text-decoration-none"
                >
                  Job Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/companies"
                  className="text-secondary text-decoration-none"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  to="/guides"
                  className="text-secondary text-decoration-none"
                >
                  Career Guides
                </Link>
              </li>

              <li>
                <Link
                  to="/resume-checker"
                  className="text-secondary text-decoration-none"
                >
                  Resume Checker
                </Link>
              </li>

            </ul>
          </div>

          {/* COMPANY */}
          <div
            className="col-lg-2 col-md-6"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <h6 className="fw-bold mb-3">
              Company
            </h6>

            <ul className="list-unstyled small d-flex flex-column gap-2">

              <li>
                <Link
                  to="/about"
                  className="text-secondary text-decoration-none"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-secondary text-decoration-none"
                >
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>

          {/* LEGAL */}
          <div
            className="col-lg-2 col-md-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h6 className="fw-bold mb-3">
              Legal
            </h6>

            <ul className="list-unstyled small d-flex flex-column gap-2">

              <li>
                <Link
                  to="/privacy-policy"
                  className="text-secondary text-decoration-none"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-secondary text-decoration-none"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>

          {/* SUPPORT */}
          <div
            className="col-lg-2 col-md-6"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <h6 className="fw-bold mb-3">
              Support
            </h6>

            <ul className="list-unstyled small d-flex flex-column gap-2">

              <li>
                <Link
                  to="/contact"
                  className="text-secondary text-decoration-none"
                >
                  Report a Job
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-secondary text-decoration-none"
                >
                  Send Feedback
                </Link>
              </li>

            </ul>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        {/* DISCLAIMER */}
        <div className="row align-items-center g-3">

          <div className="col-lg-8">
            <p
              className="text-secondary small mb-0"
              style={{ lineHeight: "1.7" }}
            >
              JobNest is a job discovery and career information platform.
              Job listings may link to external employer websites.
              JobNest does not guarantee employment or represent employers
              unless explicitly stated.
            </p>
          </div>

          <div className="col-lg-4 text-lg-end">
            <p className="text-secondary small mb-0">
              © {new Date().getFullYear()} JobNest. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};