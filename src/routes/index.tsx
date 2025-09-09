import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '@/components/common/PrivateRoute';
import SuperuserRoute from '@/components/auth/SuperuserRoute';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Correctly lazy-load components that use `export default`
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const SignUpPage = lazy(() => import('@/pages/auth/SignUpPage'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const CreateProjectPage = lazy(() => import('@/pages/CreateProjectPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const BlogDashboard = lazy(() => import('@/pages/admin/BlogDashboard'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ApiPage = lazy(() => import('@/pages/ApiPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const DataPrivacyPage = lazy(() => import('@/pages/DataPrivacyPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const PreviewPage = lazy(() => import('@/pages/PreviewPage'));
const ProjectAnalyticsPage = lazy(() => import('@/pages/ProjectAnalyticsPage'));
const SupportPage = lazy(() => import('@/pages/SupportPage'));
const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));
const SubmitTestimonialPage = lazy(() => import('@/components/core/SubmitTestimonialPage'));
const UpgradeSubscriptionPage = lazy(() => import('@/pages/UpgradeSubscriptionPage'));
const DemoPage = lazy(() => import('@/pages/DemoPage'))
const TeamsPage = lazy(() => import('@/pages/TeamPage'));

// Fallback component for Suspense
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader2 className="h-16 w-16 animate-spin text-ion-blue" />
  </div>
);

export const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/api" element={<ApiPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/privacy" element={<DataPrivacyPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/upgrade" element={<UpgradeSubscriptionPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/team" element={<TeamsPage />} />
              {/* Protected Routes */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/project/:id" element={<PrivateRoute><ProjectDetailPage /></PrivateRoute>} />
              <Route path="/project/:id/preview" element={<PrivateRoute><PreviewPage /></PrivateRoute>} />
              <Route path="/project/:id/analytics" element={<PrivateRoute><ProjectAnalyticsPage /></PrivateRoute>} />
              <Route path="/create-project" element={<PrivateRoute><CreateProjectPage firstName={user?.username || "Guest"}/></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/submit-testimonial/:projectId" element={<PrivateRoute><SubmitTestimonialPage /></PrivateRoute>} />

              {/* Admin Routes */}
              <Route path="/admin/blog" element={<SuperuserRoute><BlogDashboard /></SuperuserRoute>} />

              {/* 404 Not Found Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
