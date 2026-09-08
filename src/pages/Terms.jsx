import React from "react";
import { Helmet } from "react-helmet-async";

export const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | JobNest</title>

        <meta
          name="description"
          content="Read the JobNest Terms and Conditions covering job listings, external employer links, user responsibilities, career information, intellectual property, and platform use."
        />

        <meta name="robots" content="index, follow" />
      </Helmet>

      <main className="bg-light">
        <div className="container py-5" style={{ maxWidth: "950px" }}>
          {/* HEADER */}
          <section className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-3">
              JobNest Policies
            </span>

            <h1 className="fw-bold display-5 mb-3">Terms & Conditions</h1>

            <p className="text-muted mb-0">Last Updated: September 8, 2026</p>
          </section>

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              {/* 1 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">1. Agreement to These Terms</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  These Terms and Conditions govern your use of JobNest,
                  available at jobnest.work.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  By accessing or using JobNest, you agree to these Terms. If
                  you do not agree with them, you should discontinue use of the
                  website.
                </p>
              </section>

              {/* 2 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">2. About JobNest</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  JobNest is a job-discovery and career-information platform
                  designed to help users discover employment opportunities and
                  access career-related resources.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  Unless explicitly stated otherwise, JobNest is not the
                  employer, recruiter, staffing agency, or hiring organization
                  responsible for jobs displayed on the platform.
                </p>
              </section>

              {/* 3 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">3. Job Listings</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  Job listings displayed on JobNest are provided for
                  informational and job-discovery purposes.
                </p>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  We aim to provide useful and accurate information, but job
                  details can change after publication. Employers may modify or
                  close positions without notifying JobNest.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  Users should verify important information such as eligibility,
                  experience requirements, location, salary, application
                  deadlines, and other employment conditions on the employer's
                  official application page before applying.
                </p>
              </section>

              {/* 4 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">
                  4. External Application Links
                </h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  JobNest may provide links to employer websites, company career
                  pages, application systems, recruiting platforms, and other
                  third-party websites.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  These external websites are operated independently from
                  JobNest. We do not control their content, availability,
                  privacy practices, application procedures, or security.
                  Visiting an external website is subject to that website's own
                  policies and terms.
                </p>
              </section>

              {/* 5 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">
                  5. Job Applications and Hiring Decisions
                </h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  JobNest does not guarantee that using the platform, viewing a
                  job listing, or submitting an application will result in an
                  interview, offer, or employment.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  Hiring decisions, interviews, assessments, background checks,
                  compensation discussions, employment offers, and other
                  recruitment activities are controlled by the applicable
                  employer or recruiter.
                </p>
              </section>

              {/* 6 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">6. Job Seeker Safety</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  Users should independently verify employers and job
                  opportunities before providing personal information or
                  proceeding with an application.
                </p>

                <div className="alert alert-warning border-0 rounded-4">
                  <strong>Important:</strong> Be cautious of anyone asking you
                  to pay money in exchange for guaranteed employment,
                  interviews, offer letters, training, equipment, or recruitment
                  processing.
                </div>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  If you believe a listing displayed on JobNest is misleading,
                  fraudulent, expired, or incorrect, please contact us so it can
                  be reviewed.
                </p>
              </section>

              {/* 7 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">
                  7. Career Guides and Educational Content
                </h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  Resume tips, interview preparation materials, career guides,
                  and other educational resources published by JobNest are
                  provided for general informational purposes. They do not
                  guarantee employment, interview performance, career
                  advancement, salary outcomes, or any particular result.
                </p>
              </section>

              {/* 8 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">8. User Responsibilities</h2>

                <p className="text-secondary">
                  When using JobNest, you agree not to:
                </p>

                <ul className="text-secondary" style={{ lineHeight: "1.9" }}>
                  <li>Use the website for unlawful or fraudulent purposes.</li>

                  <li>
                    Attempt to interfere with the operation or security of the
                    website.
                  </li>

                  <li>
                    Attempt to gain unauthorized access to JobNest systems,
                    databases, accounts, or infrastructure.
                  </li>

                  <li>
                    Submit malicious code, spam, abusive messages, or
                    intentionally misleading information.
                  </li>

                  <li>
                    Use automated systems to excessively scrape, copy, or
                    overload the website without authorization.
                  </li>

                  <li>
                    Impersonate an employer, recruiter, organization, or another
                    individual.
                  </li>
                </ul>
              </section>

              {/* 9 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">9. Intellectual Property</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  Original JobNest website design, branding, written career
                  content, graphics, and other original materials may be
                  protected by applicable intellectual property laws.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  Company names, trademarks, logos, and other third-party
                  materials belong to their respective owners. Their appearance
                  on JobNest does not imply ownership, sponsorship, partnership,
                  or endorsement unless explicitly stated.
                </p>
              </section>

              {/* 10 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">
                  10. Availability of the Website
                </h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  We may update, modify, suspend, remove, or discontinue parts
                  of JobNest when necessary. We do not guarantee that every
                  feature, page, job listing, or external link will always
                  remain available.
                </p>
              </section>

              {/* 11 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">11. Disclaimer</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest is provided on an "as available" basis. While we aim
                  to provide useful and reliable information, we cannot
                  guarantee that every listing, external link, description,
                  salary figure, eligibility requirement, deadline, or other
                  piece of information will always be complete, current, or
                  error-free.
                </p>
              </section>

              {/* 12 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">12. Limitation of Liability</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  To the extent permitted by applicable law, JobNest and its
                  operators will not be responsible for indirect, incidental,
                  special, or consequential losses arising from use of the
                  platform, reliance on job information, dealings with third
                  parties, external websites, or the inability to access the
                  service.
                </p>
              </section>

              {/* 13 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">13. Privacy</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  Information relating to privacy, cookies, contact form
                  submissions, advertising services, and third-party service
                  providers is described in the JobNest Privacy Policy.
                </p>
              </section>

              {/* 14 */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">14. Changes to These Terms</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest may update these Terms and Conditions when the
                  platform, services, or applicable requirements change. Updated
                  Terms will be published on this page with a revised "Last
                  Updated" date.
                </p>
              </section>

              {/* 15 */}
              <section>
                <h2 className="h4 fw-bold mb-3">15. Contact Us</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  If you have questions about these Terms, want to report an
                  incorrect job listing, or need to contact JobNest, email:
                </p>

                <a
                  href="mailto:jobnest100@gmail.com"
                  className="fw-semibold text-decoration-none"
                >
                  jobnest100@gmail.com
                </a>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
