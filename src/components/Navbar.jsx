import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom py-2">
      <div className="container">

        {/* LOGO & BRAND TEXT */}
        <Link
          className="navbar-brand d-flex align-items-center fw-bold fs-4 text-dark"
          to="/"
        >
          <img
            src="/Jobnext.png"
            alt="JobNest Logo"
            height="45"
            className="rounded me-2"
          />

          <span className="text-dark">
            JOB<span className="text-primary">NEST</span>
          </span>
        </Link>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarJobNest"
          aria-controls="navbarJobNest"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVIGATION LINKS */}
        <div
          className="collapse navbar-collapse"
          id="navbarJobNest"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">

            {/* HOME */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-medium ${
                    isActive ? 'text-primary' : ''
                  }`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>

            {/* FIND JOBS */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-medium ${
                    isActive ? 'text-primary' : ''
                  }`
                }
                to="/jobs"
              >
                Find Jobs
              </NavLink>
            </li>

            {/* COMPANIES */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-medium ${
                    isActive ? 'text-primary' : ''
                  }`
                }
                to="/companies"
              >
                Companies
              </NavLink>
            </li>

            {/* CATEGORIES */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-medium ${
                    isActive ? 'text-primary' : ''
                  }`
                }
                to="/categories"
              >
                Categories
              </NavLink>
            </li>

            {/* CAREER GUIDES */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-medium ${
                    isActive ? 'text-primary' : ''
                  }`
                }
                to="/guides"
              >
                Career Guides
              </NavLink>
            </li>

            {/* RESUME CHECKER */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-medium ${
                    isActive ? 'text-primary' : ''
                  }`
                }
                to="/resume-checker"
              >
                Resume Checker
              </NavLink>
            </li>

          </ul>

          {/* ACTION BUTTONS */}
          {/*
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">

            <Link
              to="/post-job"
              className="btn jn-btn-primary px-3"
            >
              <i className="bi bi-plus-circle me-1"></i>
              Post a Job
            </Link>

            <Link
              to="/login"
              className="btn jn-btn-outline px-3"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="btn btn-dark px-3"
            >
              Register
            </Link>

          </div>
          */}

        </div>
      </div>
    </nav>
  );
};