import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { guidesData } from "../data/guidesData";

export const GuideDetail = () => {
  const { slug } = useParams();

  const guide = guidesData.find((item) => item.slug === slug);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  // Show other available guides
  const relatedGuides = guidesData
    .filter((item) => item.id !== guide.id)
    .slice(0, 3);

  // Create IDs for table-of-contents links
  const createSectionId = (heading, index) => {
    const cleanHeading = heading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    return `section-${index + 1}-${cleanHeading}`;
  };

  const articleUrl = `https://www.jobnest.work/guides/${guide.slug}`;

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    author: {
      "@type": "Organization",
      name: "JobNest Career Team",
    },
    publisher: {
      "@type": "Organization",
      name: "JobNest",
      url: "https://www.jobnest.work",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <>
      <Helmet>
        <title>{guide.title} | JobNest Career Guides</title>

        <meta name="description" content={guide.summary} />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={articleUrl} />

        {/* OPEN GRAPH */}
        <meta property="og:title" content={guide.title} />
        <meta property="og:description" content={guide.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:site_name" content="JobNest" />

        {/* STRUCTURED DATA */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <main className="bg-light">
        <div className="container py-5" style={{ maxWidth: "1000px" }}>
          {/* BREADCRUMB */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb small mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>
              </li>

              <li className="breadcrumb-item">
                <Link to="/guides" className="text-decoration-none">
                  Career Guides
                </Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                {guide.category}
              </li>
            </ol>
          </nav>

          <article>
            {/* ARTICLE HEADER */}
            <header className="mb-5">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill">
                {guide.category}
              </span>

              <h1
                className="fw-bold display-5 mb-3"
                style={{ lineHeight: "1.2" }}
              >
                {guide.title}
              </h1>

              <p
                className="lead text-secondary mb-4"
                style={{ lineHeight: "1.7" }}
              >
                {guide.summary}
              </p>

              <div className="d-flex flex-wrap gap-4 text-muted small border-top border-bottom py-3">
                <span>
                  <i className="bi bi-calendar3 me-2"></i>
                  Updated {guide.date}
                </span>

                <span>
                  <i className="bi bi-clock me-2"></i>
                  {guide.readTime}
                </span>

                <span>
                  <i className="bi bi-person me-2"></i>
                  JobNest Career Team
                </span>
              </div>
            </header>

            {/* TABLE OF CONTENTS */}
            <section className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <i className="bi bi-list-ul text-primary fs-4"></i>

                  <h2 className="h5 fw-bold mb-0">In This Guide</h2>
                </div>

                <div className="row g-2">
                  {guide.content.map((section, index) => (
                    <div className="col-md-6" key={index}>
                      <a
                        href={`#${createSectionId(section.heading, index)}`}
                        className="text-decoration-none d-flex align-items-start gap-2 py-1"
                      >
                        <span className="text-primary fw-bold">
                          {index + 1}.
                        </span>

                        <span className="text-secondary">
                          {section.heading.replace(/^\d+\.\s*/, "")}
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* JOBNEST TIP */}
            {guide.tip && (
              <aside className="alert alert-primary border-0 rounded-4 p-4 mb-4">
                <div className="d-flex gap-3">
                  <div>
                    <i className="bi bi-lightbulb-fill fs-4"></i>
                  </div>

                  <div>
                    <h2 className="h5 fw-bold mb-2">JobNest Tip</h2>

                    <p className="mb-0" style={{ lineHeight: "1.8" }}>
                      {guide.tip}
                    </p>
                  </div>
                </div>
              </aside>
            )}

            {/* ARTICLE CONTENT */}
            <div className="card border-0 shadow-sm rounded-4 bg-white">
              <div className="card-body p-4 p-md-5">
                {guide.content.map((section, index) => (
                  <section
                    key={index}
                    id={createSectionId(section.heading, index)}
                    className={
                      index === guide.content.length - 1
                        ? ""
                        : "mb-5 pb-5 border-bottom"
                    }
                    style={{
                      scrollMarginTop: "100px",
                    }}
                  >
                    {/* SECTION HEADING */}
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <span
                        className="badge bg-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "36px",
                          height: "36px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {index + 1}
                      </span>

                      <h2
                        className="fw-bold h4 text-dark mb-0"
                        style={{
                          lineHeight: "1.4",
                        }}
                      >
                        {section.heading.replace(/^\d+\.\s*/, "")}
                      </h2>
                    </div>

                    {/* MAIN EXPLANATION */}
                    <p
                      className="text-secondary"
                      style={{
                        lineHeight: "1.9",
                        fontSize: "1.05rem",
                      }}
                    >
                      {section.body}
                    </p>

                    {/* KEY POINTS */}
                    {section.points && section.points.length > 0 && (
                      <div className="mt-4">
                        <h3 className="h6 fw-bold mb-3">Key Points</h3>

                        <ul
                          className="text-secondary ps-4 mb-0"
                          style={{
                            lineHeight: "1.8",
                          }}
                        >
                          {section.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="mb-2">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* SAMPLE ANSWER / EXAMPLE */}
                    {section.example && (
                      <div
                        className="mt-4 p-4 rounded-4 border"
                        style={{
                          backgroundColor: "#f0f7ff",
                          borderColor: "#cfe2ff",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <i className="bi bi-lightbulb-fill text-primary"></i>

                          <h3 className="h6 fw-bold mb-0">
                            {section.exampleTitle || "Example"}
                          </h3>
                        </div>

                        <div
                          className="text-secondary mb-0"
                          style={{
                            lineHeight: "1.8",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {section.example}
                        </div>
                      </div>
                    )}

                    {/* COMMON MISTAKE */}
                    {section.mistake && (
                      <div
                        className="mt-3 p-4 rounded-4 border"
                        style={{
                          backgroundColor: "#fff8e6",
                          borderColor: "#ffe69c",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <i className="bi bi-exclamation-triangle-fill text-warning"></i>

                          <h3 className="h6 fw-bold mb-0">Common Mistake</h3>
                        </div>

                        <p
                          className="text-secondary mb-0"
                          style={{
                            lineHeight: "1.8",
                          }}
                        >
                          {section.mistake}
                        </p>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>

            {/* END CTA */}
            <section className="card border-0 shadow-sm rounded-4 mt-4">
              <div className="card-body text-center p-4 p-md-5">
                <span className="badge bg-success-subtle text-success mb-3">
                  Next Step
                </span>

                <h2 className="h3 fw-bold mb-3">
                  Put what you've learned into practice
                </h2>

                <p
                  className="text-secondary mx-auto mb-4"
                  style={{
                    maxWidth: "650px",
                    lineHeight: "1.8",
                  }}
                >
                  Explore current opportunities on JobNest and compare the
                  skills, experience, and qualifications employers are looking
                  for.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link
                    to="/jobs"
                    className="btn btn-primary px-4 py-2 fw-semibold"
                  >
                    <i className="bi bi-briefcase me-2"></i>
                    Explore Jobs
                  </Link>

                  <Link
                    to="/guides"
                    className="btn btn-outline-primary px-4 py-2 fw-semibold"
                  >
                    More Career Guides
                  </Link>
                </div>
              </div>
            </section>
          </article>

          {/* RELATED GUIDES */}
          {relatedGuides.length > 0 && (
            <section className="mt-5">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <h2 className="fw-bold h3 mb-0">Continue Learning</h2>

                <Link to="/guides" className="text-decoration-none fw-semibold">
                  View all guides →
                </Link>
              </div>

              <div className="row g-4">
                {relatedGuides.map((related) => (
                  <div key={related.id} className="col-lg-4 col-md-6">
                    <div className="card border-0 shadow-sm h-100 rounded-4">
                      <div className="card-body p-4 d-flex flex-column">
                        <div className="mb-3">
                          <span className="badge bg-primary-subtle text-primary">
                            {related.category}
                          </span>
                        </div>

                        <h3 className="h5 fw-bold mb-3">{related.title}</h3>

                        <p
                          className="text-secondary small flex-grow-1"
                          style={{
                            lineHeight: "1.7",
                          }}
                        >
                          {related.summary}
                        </p>

                        <div className="d-flex justify-content-between align-items-center mt-3 gap-3">
                          <span className="text-muted small">
                            {related.readTime}
                          </span>

                          <Link
                            to={`/guides/${related.slug}`}
                            className="text-decoration-none fw-semibold small"
                          >
                            Read Guide →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};
