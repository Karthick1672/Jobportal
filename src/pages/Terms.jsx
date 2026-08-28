import React from 'react';
import { Helmet } from 'react-helmet-async';

export const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | JobNest</title>
      </Helmet>

      <div className="container py-5" style={{ maxWidth: '900px' }}>
        <h1 className="fw-bold mb-2">Terms & Conditions</h1>
        <p className="text-muted mb-4">Last Updated: August 2026</p>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">1. Agreement to Terms</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            By accessing or using JobNest (jobnest.work), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.
          </p>
        </section>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">2. Use of Job Information</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            Job listings posted on JobNest are for informational purposes only. While we endeavor to keep listings accurate and up to date, JobNest makes no representations or warranties of any kind regarding the completeness, accuracy, reliability, or availability of any job posting.
          </p>
        </section>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">3. User Conduct and Applications</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            Job candidates apply directly to third-party employers. JobNest is not involved in actual employment transactions, hiring decisions, or interviews. Job seekers are advised to exercise caution and never submit financial information or payments to potential employers.
          </p>
        </section>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">4. Disclaimer of Liability</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            In no event shall JobNest or its operators be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our platform or the external links provided.
          </p>
        </section>
      </div>
    </>
  );
};