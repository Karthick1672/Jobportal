// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import App from './App';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'aos/dist/aos.css';
// import './styles/global.css';

// // Direct interceptor for static files to bypass React Router and prevent 404s
// const pathname = window.location.pathname.toLowerCase();

// if (pathname === '/robots.txt') {
//   document.body.innerHTML = `<pre style="margin: 0; padding: 20px; font-family: monospace; white-space: pre-wrap; background: #fff; min-height: 100vh;">User-agent: *
// Allow: /

// Sitemap: https://jobnest.work/sitemap.xml</pre>`;
// } else if (pathname === '/sitemap.xml') {
//   document.body.innerHTML = `<pre style="margin: 0; padding: 20px; font-family: monospace; white-space: pre-wrap; background: #fff; min-height: 100vh;">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
// &lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;
//   &lt;!-- Core Pages --&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;daily&lt;/changefreq&gt;
//     &lt;priority&gt;1.0&lt;/priority&gt;
//   &lt;/url&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/jobs&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;daily&lt;/changefreq&gt;
//     &lt;priority&gt;0.9&lt;/priority&gt;
//   &lt;/url&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/companies&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;weekly&lt;/changefreq&gt;
//     &lt;priority&gt;0.8&lt;/priority&gt;
//   &lt;/url&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/categories&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;weekly&lt;/changefreq&gt;
//     &lt;priority&gt;0.8&lt;/priority&gt;
//   &lt;/url&gt;

//   &lt;!-- Career Guides Hub &amp; Articles --&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/guides&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;weekly&lt;/changefreq&gt;
//     &lt;priority&gt;0.8&lt;/priority&gt;
//   &lt;/url&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/guides/top-interview-questions-freshers-2026&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;monthly&lt;/changefreq&gt;
//     &lt;priority&gt;0.7&lt;/priority&gt;
//   &lt;/url&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/guides/ats-friendly-resume-guide&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;monthly&lt;/changefreq&gt;
//     &lt;priority&gt;0.7&lt;/priority&gt;
//   &lt;/url&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/guides/off-campus-job-hunting-strategy&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;monthly&lt;/changefreq&gt;
//     &lt;priority&gt;0.7&lt;/priority&gt;
//   &lt;/url&gt;

//   &lt;!-- Legal &amp; Trust Pages --&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/about&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;monthly&lt;/changefreq&gt;
//     &lt;priority&gt;0.6&lt;/priority&gt;
//   &lt;/url&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/contact&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;monthly&lt;/changefreq&gt;
//     &lt;priority&gt;0.6&lt;/priority&gt;
//   &lt;/url&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/privacy-policy&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;monthly&lt;/changefreq&gt;
//     &lt;priority&gt;0.5&lt;/priority&gt;
//   &lt;/url&gt;
//   &lt;url&gt;
//     &lt;loc&gt;https://jobnest.work/terms&lt;/loc&gt;
//     &lt;lastmod&gt;2026-08-27&lt;/lastmod&gt;
//     &lt;changefreq&gt;monthly&lt;/changefreq&gt;
//     &lt;priority&gt;0.5&lt;/priority&gt;
//   &lt;/url&gt;
// &lt;/urlset&gt;</pre>`;
// } else {
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//       <HelmetProvider>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </HelmetProvider>
//     </React.StrictMode>
//   );
// }

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
