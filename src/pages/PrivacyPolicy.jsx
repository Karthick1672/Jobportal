import React from "react";
import { Helmet } from "react-helmet-async";

export const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | JobNest</title>

        <meta
          name="description"
          content="Read the JobNest Privacy Policy to understand what information we collect, how we use it, how third-party services such as Google AdSense and Supabase may process data, and how to contact us."
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

            <h1 className="fw-bold display-5 mb-3">Privacy Policy</h1>

            <p className="text-muted mb-0">Last Updated: September 8, 2026</p>
          </section>

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              {/* INTRO */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">1. Introduction</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  JobNest is a career and job-discovery platform available at
                  jobnest.work. This Privacy Policy explains what information
                  may be collected when you use JobNest, how that information
                  may be used, and the choices available to you.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  By using JobNest, you acknowledge the practices described in
                  this Privacy Policy.
                </p>
              </section>

              {/* INFORMATION COLLECTED */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">2. Information We Collect</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  JobNest may collect information that you choose to provide, as
                  well as certain technical information generated when you use
                  the website.
                </p>

                <h3 className="h6 fw-bold mt-4">Information you provide</h3>

                <ul className="text-secondary">
                  <li className="mb-2">
                    Your name when submitting the contact form.
                  </li>

                  <li className="mb-2">Your email address.</li>

                  <li className="mb-2">The subject of your inquiry.</li>

                  <li className="mb-2">The message or feedback you submit.</li>

                  <li>
                    Any other information you voluntarily include in your
                    communication with JobNest.
                  </li>
                </ul>

                <h3 className="h6 fw-bold mt-4">Technical information</h3>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  Our hosting, database, advertising, and other service
                  providers may automatically receive technical information such
                  as IP address, browser type, device information, referring
                  pages, requested pages, timestamps, and similar diagnostic or
                  usage information.
                </p>
              </section>

              {/* HOW USED */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">3. How We Use Information</h2>

                <p className="text-secondary">Information may be used to:</p>

                <ul className="text-secondary">
                  <li className="mb-2">
                    Respond to support requests and inquiries.
                  </li>

                  <li className="mb-2">
                    Review reports about incorrect or expired job listings.
                  </li>

                  <li className="mb-2">
                    Improve JobNest content, functionality, and user experience.
                  </li>

                  <li className="mb-2">
                    Maintain website security and investigate technical issues.
                  </li>

                  <li className="mb-2">
                    Operate and maintain the JobNest platform.
                  </li>

                  <li>
                    Comply with legal or regulatory obligations where
                    applicable.
                  </li>
                </ul>
              </section>

              {/* CONTACT DATA */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">4. Contact Form Data</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  When you submit the JobNest contact form, the information you
                  provide may be stored in our database and used to respond to
                  your message.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  Contact form submissions may also generate an email
                  notification so that the JobNest team can review and respond
                  to your inquiry.
                </p>
              </section>

              {/* SUPABASE */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">5. Supabase</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest uses Supabase for database and backend services.
                  Information submitted through certain features, including the
                  contact form, may be processed or stored using Supabase
                  infrastructure in accordance with its own privacy and security
                  practices.
                </p>
              </section>

              {/* EMAIL */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">6. Email Delivery Services</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest may use third-party email delivery services to send
                  notifications related to contact form submissions. These
                  services may process information such as the sender's name,
                  email address, subject, and message for the purpose of
                  delivering the communication.
                </p>
              </section>

              {/* COOKIES */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">
                  7. Cookies and Similar Technologies
                </h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  JobNest and third-party services used by JobNest may use
                  cookies, web beacons, IP addresses, and similar technologies
                  for functionality, security, measurement, advertising, and
                  analytics-related purposes.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  You can control or remove cookies through your browser
                  settings, although disabling some cookies may affect how
                  certain website features work.
                </p>
              </section>

              {/* ADSENSE */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">
                  8. Google AdSense and Advertising
                </h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  JobNest may use Google AdSense to display advertisements.
                  Google and its advertising partners may use cookies or similar
                  technologies to serve, measure, limit, or personalize
                  advertising based on visits to JobNest and other websites.
                </p>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  Third-party vendors, including Google, may use advertising
                  cookies to serve ads based on a user's previous visits to
                  JobNest or other websites.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  Users can learn more about Google's advertising practices and
                  manage personalized advertising through Google's advertising
                  settings and privacy resources.
                </p>
              </section>

              {/* THIRD PARTY SERVICES */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">9. Third-Party Services</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest may use third-party providers for hosting, databases,
                  email delivery, advertising, analytics, and other technical
                  services. These providers may process information according to
                  their own privacy policies and applicable agreements.
                </p>
              </section>

              {/* EXTERNAL LINKS */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">
                  10. External Job and Employer Links
                </h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  JobNest contains links to employer websites, career portals,
                  application pages, and other third-party websites.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest does not control those websites and is not responsible
                  for their privacy policies, security practices, data
                  collection, or content. Users should review the privacy policy
                  of the website they visit before submitting personal
                  information.
                </p>
              </section>

              {/* DATA RETENTION */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">11. Data Retention</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest may retain contact messages and related information
                  for as long as reasonably necessary to respond to inquiries,
                  maintain records, prevent abuse, resolve disputes, and meet
                  applicable legal obligations.
                </p>
              </section>

              {/* SECURITY */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">12. Data Security</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest takes reasonable steps to protect information used by
                  the platform. However, no online service, database, or method
                  of electronic transmission can be guaranteed to be completely
                  secure.
                </p>
              </section>

              {/* USERS RIGHTS */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">13. Your Privacy Choices</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  Depending on your location and applicable law, you may have
                  rights relating to personal information, such as requesting
                  access, correction, or deletion of information you have
                  provided.
                </p>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  You may contact JobNest using the email address below for
                  privacy-related questions or requests.
                </p>
              </section>

              {/* CHILDREN */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">14. Children's Privacy</h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest is intended as a job-search and career-information
                  platform and is not specifically directed to children under
                  the age required by applicable law to consent to online data
                  processing.
                </p>
              </section>

              {/* POLICY UPDATES */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">
                  15. Changes to This Privacy Policy
                </h2>

                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.9" }}
                >
                  JobNest may update this Privacy Policy when website features,
                  third-party services, legal requirements, or data practices
                  change. The latest version will be published on this page
                  together with an updated revision date.
                </p>
              </section>

              {/* CONTACT */}
              <section>
                <h2 className="h4 fw-bold mb-3">16. Contact Us</h2>

                <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                  If you have questions about this Privacy Policy or how JobNest
                  handles information, contact us at:
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
