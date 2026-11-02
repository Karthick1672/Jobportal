import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";

import { MainLayout } from "./layouts/MainLayout";

import { Home } from "./pages/Home";
import { Jobs } from "./pages/Jobs";
import { JobDetails } from "./pages/JobDetails";
import { Categories } from "./pages/Categories";
import { Companies } from "./pages/Companies";
import { CareerGuides } from "./pages/CareerGuides";
import { GuideDetail } from "./pages/GuideDetail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Admin } from "./pages/Admin";
import { PrivacyPolicy } from "./pages/privacy";
import { Terms } from "./pages/Terms";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { ResumeChecker } from "./pages/ResumeChecker";

import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      {/* Scroll to top whenever the route changes */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Home */}
          <Route index element={<Home />} />

          {/* Jobs */}
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetails />} />

          {/* Browse */}
          <Route path="categories" element={<Categories />} />
          <Route path="companies" element={<Companies />} />

          {/* Career Guides (handles both /career-guides and /guides without 404s) */}
          <Route path="career-guides" element={<CareerGuides />} />
          <Route path="career-guides/:slug" element={<GuideDetail />} />
          <Route
            path="guides"
            element={<Navigate to="/career-guides" replace />}
          />
          <Route path="guides/:slug" element={<GuideDetail />} />

          {/* Resume Checker */}
          <Route path="resume-checker" element={<ResumeChecker />} />

          {/* Account */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Admin */}
          <Route path="admin" element={<Admin />} />

          {/* Information */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          {/* Legal (handles /privacy and /privacy-policy) */}
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route
            path="privacy-policy"
            element={<Navigate to="/privacy" replace />}
          />
          <Route path="terms" element={<Terms />} />
          <Route
            path="terms-and-conditions"
            element={<Navigate to="/terms" replace />}
          />

          {/* 404 - keep this last */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
