
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  const footerGroups = [
    {
      title: "Job Seekers",
      links: [
        { label: "Find Jobs", to: "/jobs" },
        { label: "Job Categories", to: "/categories" },
        { label: "Companies", to: "/companies" },
        { label: "Career Guides", to: "/guides" },
        { label: "Resume Checker", to: "/resume-checker" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms & Conditions", to: "/terms" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Report a Job", to: "/contact" },
        { label: "Send Feedback", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="jn-footer mt-auto">
      <div className="container">
        <div className="jn-footer-main">
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
            >
              <Link
                to="/"
                className="jn-footer-brand"
                aria-label="JobNest home"
              >
                <img
                  src="/Jobnext.png"
                  alt=""
                  width="44"
                  height="44"
                  className="jn-footer-logo"
                />

                <span>
                  JOB<span className="jn-footer-brand-accent">NEST</span>
                </span>
              </Link>

              <p className="jn-footer-description">
                Discover opportunities, explore companies, prepare for
                interviews, and take your next career step with JobNest.
              </p>

              <a
                href="mailto:jobnest100@gmail.com"
                className="jn-footer-email"
              >
                <span className="jn-footer-email-icon">
                  <i className="bi bi-envelope" aria-hidden="true" />
                </span>
                jobnest100@gmail.com
              </a>
            </div>

            {footerGroups.map((group, index) => (
              <div
                className="col-6 col-lg-2 col-md-6"
                key={group.title}
                data-aos="fade-up"
                data-aos-delay={index * 75}
              >
                <h2 className="jn-footer-heading">{group.title}</h2>

                <ul className="jn-footer-links">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="jn-footer-bottom">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <p className="jn-footer-disclaimer">
                JobNest is a job discovery and career information platform.
                Listings may link to external employer websites. JobNest does
                not guarantee employment or represent employers unless
                explicitly stated.
              </p>
            </div>

            <div className="col-lg-4">
              <p className="jn-footer-copyright">
                © {year} JobNest. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
