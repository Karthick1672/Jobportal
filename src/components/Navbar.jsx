import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const navItems = [
    { label: "Home", to: "/", end: true },
    { label: "Find Jobs", to: "/jobs" },
    { label: "Companies", to: "/companies" },
    { label: "Categories", to: "/categories" },
    { label: "Career Guides", to: "/guides" },
    { label: "Resume Checker", to: "/resume-checker" },
  ];

  return (
    <nav className="navbar navbar-expand-lg jn-navbar sticky-top">
      <div className="container">
        <Link
          className="navbar-brand jn-brand d-flex align-items-center"
          to="/"
          aria-label="JobNest home"
        >
          <img
            src="/Jobnext.png"
            alt=""
            width="44"
            height="44"
            className="jn-brand-logo"
          />

          <span className="jn-brand-name">
            JOB<span>NEST</span>
          </span>
        </Link>

        <button
          className="navbar-toggler jn-navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarJobNest"
          aria-controls="navbarJobNest"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarJobNest">
          <ul className="navbar-nav mx-auto jn-nav-links">
            {navItems.map(({ label, to, end }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `nav-link jn-nav-link${isActive ? " active" : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="jn-navbar-actions">
            <Link to="/login" className="jn-login-link">
              Log in
            </Link>

            <Link to="/register" className="jn-navbar-cta">
              Get started
              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
