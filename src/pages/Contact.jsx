import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "../services/supabase";

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save the contact message in Supabase
      const { error: insertError } = await supabase.from("contacts").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      // 2. Send email notification to jobnest100@gmail.com
      const { data, error: functionError } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        },
      );

      if (functionError) {
        console.error("Email notification error:", functionError);
      } else {
        console.log("Email notification sent:", data);
      }

      // 3. Show success message
      setSubmitted(true);

      // 4. Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      alert("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact JobNest | Support, Feedback & Job Inquiries</title>

        <meta
          name="description"
          content="Contact the JobNest team for support, feedback, job listing questions, corrections, partnerships, or general career platform inquiries."
        />

        <meta name="robots" content="index, follow" />
      </Helmet>

      <main>
        {/* HERO */}
        <section className="bg-light border-bottom py-5">
          <div className="container text-center">
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-3">
              Contact JobNest
            </span>

            <h1 className="fw-bold display-5 mb-3">How can we help?</h1>

            <p
              className="lead text-muted mx-auto mb-0"
              style={{
                maxWidth: "720px",
              }}
            >
              Reach out to JobNest for support, feedback, job listing
              corrections, partnerships, or general questions about the
              platform.
            </p>
          </div>
        </section>

        {/* CONTACT OPTIONS */}
        <section className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4 text-center">
                  <div className="fs-2 mb-3">💬</div>

                  <h2 className="h5 fw-bold">General Support</h2>

                  <p className="text-muted small mb-0">
                    Questions about JobNest, site features, career guides, or
                    using the platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4 text-center">
                  <div className="fs-2 mb-3">📝</div>

                  <h2 className="h5 fw-bold">Job Listing Corrections</h2>

                  <p className="text-muted small mb-0">
                    Report outdated, incorrect, duplicate, or unavailable job
                    information.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4 text-center">
                  <div className="fs-2 mb-3">🤝</div>

                  <h2 className="h5 fw-bold">Business Inquiries</h2>

                  <p className="text-muted small mb-0">
                    Contact us regarding partnerships, collaboration, or
                    employer-related questions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className="row g-5">
            {/* LEFT INFORMATION */}
            <div className="col-lg-5">
              <div className="pe-lg-4">
                <span className="text-primary fw-semibold">Get in Touch</span>

                <h2 className="fw-bold h3 mt-2 mb-3">Send us a message</h2>

                <p
                  className="text-secondary"
                  style={{
                    lineHeight: "1.8",
                  }}
                >
                  If you notice incorrect job information, experience a problem
                  using JobNest, or have a suggestion that could improve the
                  platform, use the contact form and provide as much detail as
                  possible.
                </p>

                {/* EMAIL */}
                <div className="mt-4">
                  <h3 className="h6 fw-bold">Email</h3>

                  <a
                    href="mailto:jobnest100@gmail.com"
                    className="text-decoration-none"
                  >
                    jobnest100@gmail.com
                  </a>
                </div>

                {/* RESPONSE TIME */}
                <div className="mt-4">
                  <h3 className="h6 fw-bold">Response time</h3>

                  <p className="text-muted small">
                    We aim to review messages as soon as reasonably possible.
                    Response times may vary depending on the type of inquiry.
                  </p>
                </div>

                {/* JOB APPLICATION NOTICE */}
                <div className="alert alert-light border rounded-4 mt-4">
                  <h3 className="h6 fw-bold">Job application support</h3>

                  <p className="text-muted small mb-0">
                    JobNest is not the employer for jobs listed on the platform.
                    Questions about an application, interview, hiring status,
                    salary, or offer should normally be directed to the employer
                    or recruiter handling that role.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="col-lg-7">
              {submitted ? (
                <div className="alert alert-success p-4 p-md-5 rounded-4 text-center shadow-sm">
                  <div className="fs-1 mb-3">✅</div>

                  <h2 className="h4 fw-bold mb-2">Message sent successfully</h2>

                  <p className="mb-4 text-secondary">
                    Thank you for contacting JobNest. Your message has been
                    received.
                  </p>

                  <button
                    className="btn btn-outline-success"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4">
                  <h2 className="h4 fw-bold mb-4">Contact Form</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      {/* NAME */}
                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="form-label fw-semibold"
                        >
                          Your Name *
                        </label>

                        <input
                          id="name"
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* EMAIL */}
                      <div className="col-md-6">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold"
                        >
                          Email Address *
                        </label>

                        <input
                          id="email"
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* SUBJECT */}
                      <div className="col-12">
                        <label
                          htmlFor="subject"
                          className="form-label fw-semibold"
                        >
                          Subject *
                        </label>

                        <input
                          id="subject"
                          type="text"
                          name="subject"
                          className="form-control"
                          placeholder="What is this regarding?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* MESSAGE */}
                      <div className="col-12">
                        <label
                          htmlFor="message"
                          className="form-label fw-semibold"
                        >
                          Message *
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          rows="6"
                          className="form-control"
                          placeholder="Write your message here..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      {/* PRIVACY NOTE */}
                      <div className="col-12">
                        <p className="text-muted small mb-0">
                          Please do not include passwords, banking information,
                          government identification numbers, or other highly
                          sensitive personal information in your message.
                        </p>
                      </div>

                      {/* BUTTON */}
                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary w-100 py-2 fw-semibold"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* COMMON QUESTIONS */}
        <section className="bg-light py-5">
          <div
            className="container"
            style={{
              maxWidth: "900px",
            }}
          >
            <div className="text-center mb-5">
              <span className="text-primary fw-semibold">
                Before Contacting Us
              </span>

              <h2 className="fw-bold mt-2">Common questions</h2>
            </div>

            <div className="accordion" id="contactFAQ">
              {/* FAQ 1 */}
              <div className="accordion-item border rounded-3 mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faqOne"
                  >
                    Does JobNest hire candidates directly?
                  </button>
                </h2>

                <div
                  id="faqOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#contactFAQ"
                >
                  <div className="accordion-body text-secondary">
                    No. JobNest helps users discover job opportunities and
                    career resources. Hiring decisions are made by the employer
                    or recruiting organization responsible for each role.
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="accordion-item border rounded-3 mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faqTwo"
                  >
                    Can I report an expired or incorrect job?
                  </button>
                </h2>

                <div
                  id="faqTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#contactFAQ"
                >
                  <div className="accordion-body text-secondary">
                    Yes. Use the contact form and include the company name, job
                    title, and a short description of the issue so the listing
                    can be reviewed.
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="accordion-item border rounded-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faqThree"
                  >
                    Does JobNest charge job seekers to apply?
                  </button>
                </h2>

                <div
                  id="faqThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#contactFAQ"
                >
                  <div className="accordion-body text-secondary">
                    JobNest does not charge job seekers simply for browsing job
                    opportunities on the platform. Always be cautious of anyone
                    requesting payment in exchange for guaranteed employment,
                    interviews, or offer letters.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
