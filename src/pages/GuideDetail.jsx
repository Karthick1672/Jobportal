import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { guidesData } from '../data/guidesData';

export const GuideDetail = () => {
  const { slug } = useParams();
  const guide = guidesData.find((item) => item.slug === slug);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{guide.title} | JobNest</title>
        <meta name="description" content={guide.summary} />
      </Helmet>

      <div className="container py-5" style={{ maxWidth: '850px' }}>
        <Link to="/guides" className="text-decoration-none text-muted small fw-semibold mb-3 d-inline-block">
          ← Back to All Guides
        </Link>

        <div className="mb-4">
          <span className="badge bg-primary-subtle text-primary mb-2 px-3 py-2 rounded-pill">
            {guide.category}
          </span>
          <h1 className="fw-bold display-6 mb-3">{guide.title}</h1>
          <div className="d-flex gap-3 text-muted small">
            <span>📅 {guide.date}</span>
            <span>⏱️ {guide.readTime}</span>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <p className="lead text-secondary border-bottom pb-3 mb-4">
            {guide.summary}
          </p>

          <div className="article-body">
            {guide.content.map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="fw-bold h5 text-dark mb-2">{section.heading}</h3>
                <p className="text-secondary" style={{ lineHeight: '1.8' }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 bg-light rounded-3 text-center">
            <h5 className="fw-bold mb-2">Ready to apply these strategies?</h5>
            <p className="text-muted small mb-3">Browse our latest verified job openings today.</p>
            <Link to="/" className="btn btn-primary px-4 py-2 fw-semibold">
              Explore Job Openings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};