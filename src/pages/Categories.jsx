import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { categoriesData } from '../data/categories';

export const Categories = () => {
  return (
    <>
      <Helmet>
        <title>Browse Categories | JobNest</title>
      </Helmet>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold mb-2">Explore by Category</h2>
            <p className="text-muted">Find opportunities tailored to your core specialization</p>
          </div>

          <div className="row g-4">
            {categoriesData.map((cat, idx) => (
              <div key={cat.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
                <div className="jn-card p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                        <i className={`bi ${cat.icon} fs-4`}></i>
                      </div>
                      <div>
                        <h5 className="fw-bold text-dark mb-0 fs-6">{cat.name}</h5>
                        <span className="text-primary small fw-semibold">{cat.jobCount} Active Jobs</span>
                      </div>
                    </div>
                    <p className="text-muted small mb-0">{cat.description}</p>
                  </div>

                  <div className="pt-3 mt-4 border-top">
                    <Link to={`/jobs?category=${encodeURIComponent(cat.name)}`} className="btn jn-btn-outline btn-sm w-100">
                      Explore Jobs <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};