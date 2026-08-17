import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Jobs } from './pages/Jobs';
import { JobDetails } from './pages/JobDetails';
import { Categories } from './pages/Categories';
import { Companies } from './pages/Companies';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PostJob } from './pages/PostJob';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="companies" element={<Companies />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="post-job" element={<PostJob />} />
        
        {/* ADMIN ROUTE FOR QUICK JOB POSTING */}
        <Route path="admin" element={<PostJob />} />

        {/* LEGAL & COMPANY ROUTES FOR ADSENSE */}
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="about" element={<About />} />

        {/* CATCH-ALL 404 ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}