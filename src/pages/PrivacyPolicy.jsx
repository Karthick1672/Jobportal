import React from 'react';
import { Helmet } from 'react-helmet-async';

export const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | JobNest</title>
      </Helmet>

      <div className="container py-5" style={{ maxWidth: '900px' }}>
        <h1 className="fw-bold mb-2">Privacy Policy</h1>
        <p className="text-muted mb-4">Last Updated: August 2026</p>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">1. Overview</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            At JobNest (accessible from jobnest.work), the privacy of our visitors is of paramount importance. This Privacy Policy outlines the types of personal information that is received and collected by JobNest and how it is used.
          </p>
        </section>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">2. Information We Collect</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            We collect minimal information necessary to deliver our services. When navigating our website, standard log files are maintained by our hosting providers. These files log visitors when they visit websites (including internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks).
          </p>
        </section>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">3. Cookies and Web Beacons</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            JobNest uses cookies to store information about visitors' preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors' browser type or other information.
          </p>
        </section>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">4. Google DoubleClick DART Cookie & Third-Party Advertising</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            Google is one of the third-party vendors on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to jobnest.work and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.
          </p>
        </section>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">5. Third-Party Links</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            JobNest contains links to external job application portals and employer websites. We are not responsible for the privacy practices or content of these third-party platforms.
          </p>
        </section>

        <section className="mb-4">
          <h4 className="fw-bold mb-2">6. Contact Information</h4>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>support@jobnest.work</strong>.
          </p>
        </section>
      </div>
    </>
  );
};