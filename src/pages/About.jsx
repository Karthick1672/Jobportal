import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | JobNest</title>
        <meta name="description" content="Learn more about JobNest and our mission to connect talent with top employers." />
      </Helmet>

      <div className="container py-5" style={{ maxWidth: '900px' }}>
        <h1 className="fw-bold mb-4">About JobNest</h1>

        <p className="lead text-secondary mb-4">
          JobNest is a dedicated career portal designed to bridge the gap between ambitious job seekers and forward-thinking companies.
        </p>

        <h4 className="fw-bold mt-5 mb-3">Our Mission</h4>
        <p className="text-secondary" style={{ lineHeight: '1.8' }}>
          Our mission is to simplify job discovery for early-career professionals, fresh graduates, and experienced specialists. We curate authentic job openings across IT, Engineering, Finance, and Marketing to provide direct, hassle-free application routes without paywalls or unnecessary application friction.
        </p>

        <h4 className="fw-bold mt-4 mb-3">What We Offer</h4>
        <div className="row g-3 my-2">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-3 h-100 rounded-3">
              <h6 className="fw-bold text-primary">Verified Job Listings</h6>
              <p className="small text-muted mb-0">Direct job openings sourced and verified directly from verified company portals and recruiters.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-3 h-100 rounded-3">
              <h6 className="fw-bold text-primary">Batch & Experience Filtering</h6>
              <p className="small text-muted mb-0">Search tailored to specific graduation batch years, skill sets, and work experience tiers.</p>
            </div>
          </div>
        </div>

        <h4 className="fw-bold mt-4 mb-3">Commitment to Integrity</h4>
        <p className="text-secondary" style={{ lineHeight: '1.8' }}>
          JobNest never charges job seekers for finding or applying to jobs. We promote genuine career opportunities and encourage users to report any suspicious listings immediately via our contact channels.
        </p>

        <div className="mt-5 pt-3 border-top d-flex gap-3">
          <Link to="/jobs" className="btn btn-primary px-4">Browse Openings</Link>
          <Link to="/contact" className="btn btn-outline-secondary px-4">Contact Us</Link>
        </div>
      </div>
    </>
  );
};