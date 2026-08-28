import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | JobNest</title>
      </Helmet>

      <section className="py-5 bg-light min-vh-100 d-flex align-items-center text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h1 className="display-1 fw-bold text-primary mb-0">404</h1>
              <h3 className="fw-bold text-dark mt-2 mb-3">Page Not Found</h3>
              <p className="text-muted mb-4">
                Oops! The page you are looking for doesn't exist or has been moved.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/" className="btn jn-btn-primary px-4">
                  Back to Home
                </Link>
                <Link to="/jobs" className="btn jn-btn-outline px-4">
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};