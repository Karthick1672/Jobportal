import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { guidesData } from '../data/guidesData';

export const CareerGuides = () => {
  return (
    <>
      <Helmet>
        <title>Career Guides & Interview Tips | JobNest</title>

        <meta
          name="description"
          content="Explore expert career advice, interview preparation resources, and resume formatting tips for freshers and experienced professionals."
        />
      </Helmet>

      <main className="container py-5">

        {/* PAGE HEADER */}
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
            Career Resources
          </span>

          <h1 className="fw-bold display-6">
            Guides & Job Hunting Insights
          </h1>

          <p
            className="text-muted mx-auto"
            style={{ maxWidth: '600px' }}
          >
            Actionable strategies, technical interview cheat sheets,
            and resume optimization guides curated for job seekers.
          </p>
        </div>

        {/* GUIDE CARDS */}
        <div className="row g-4">

          {guidesData.map((guide) => (
            <div
              key={guide.id}
              className="col-md-6 col-lg-4"
            >
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                {/* CARD CONTENT */}
                <div className="p-3 d-flex flex-column h-100">

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <span className="badge bg-light text-dark border small">
                      {guide.category}
                    </span>

                    <small className="text-muted">
                      {guide.readTime}
                    </small>

                  </div>

                  <h5 className="fw-bold mb-2">
                    <Link
                      to={`/guides/${guide.slug}`}
                      className="text-decoration-none text-dark"
                    >
                      {guide.title}
                    </Link>
                  </h5>

                  <p className="text-muted small mb-4">
                    {guide.summary}
                  </p>

                  <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">

                    <small className="text-muted">
                      {guide.date}
                    </small>

                    <Link
                      to={`/guides/${guide.slug}`}
                      className="btn btn-sm btn-outline-primary fw-semibold"
                    >
                      Read Guide →
                    </Link>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

      </main>
    </>
  );
};
