import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import CreatorLayout from './components/layout/CreatorLayout';
import BrandLayout from './components/layout/BrandLayout';

// Public & Marketing Pages
import LandingPage from './pages/LandingPage';
import CreatorPublicProfile from './pages/public/CreatorPublicProfile';
import BrandPublicProfile from './pages/public/BrandPublicProfile';
import TermsPage from './pages/legal/TermsPage';
import PrivacyPage from './pages/legal/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

// Authentication Pages
import CreatorLogin from './pages/auth/CreatorLogin';
import CreatorSignup from './pages/auth/CreatorSignup';
import BrandLogin from './pages/auth/BrandLogin';
import BrandSignup from './pages/auth/BrandSignup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Creator Workspace Pages
import CreatorDashboard from './pages/creator/CreatorDashboard';
import CreatorProfilePage from './pages/creator/CreatorProfilePage';
import CreatorPortfolioPage from './pages/creator/CreatorPortfolioPage';
import ExploreBrandsPage from './pages/creator/ExploreBrandsPage';
import CreatorBriefsPage from './pages/creator/CreatorBriefsPage';
import BriefDetailPage from './pages/creator/BriefDetailPage';
import CreatorApplicationsPage from './pages/creator/CreatorApplicationsPage';

// Brand Studio Pages
import BrandDashboard from './pages/brand/BrandDashboard';
import BrandProfilePage from './pages/brand/BrandProfilePage';
import DiscoverCreatorsPage from './pages/brand/DiscoverCreatorsPage';
import SavedCreatorsPage from './pages/brand/SavedCreatorsPage';
import BrandBriefsPage from './pages/brand/BrandBriefsPage';
import CreateBriefPage from './pages/brand/CreateBriefPage';
import BrandBriefApplicationsPage from './pages/brand/BrandBriefApplicationsPage';
import ApplicationDetailPage from './pages/brand/ApplicationDetailPage';

// Social & Community Feed
import SocialFeedPage from './pages/social/SocialFeedPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone Showcase Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/creators/:id" element={<CreatorPublicProfile />} />
          <Route path="/brands/:id" element={<BrandPublicProfile />} />

          {/* Public Website with Header & Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Standalone Authentication Flows */}
          <Route path="/creator/login" element={<CreatorLogin />} />
          <Route path="/creator/signup" element={<CreatorSignup />} />
          <Route path="/brand/login" element={<BrandLogin />} />
          <Route path="/brand/signup" element={<BrandSignup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Creator Hub Portal */}
          <Route path="/creator" element={<CreatorLayout />}>
            <Route index element={<Navigate to="/creator/dashboard" replace />} />
            <Route path="dashboard" element={<CreatorDashboard />} />
            <Route path="feed" element={<SocialFeedPage />} />
            <Route path="profile" element={<CreatorProfilePage />} />
            <Route path="portfolio" element={<CreatorPortfolioPage />} />
            <Route path="brands" element={<ExploreBrandsPage />} />
            <Route path="briefs" element={<CreatorBriefsPage />} />
            <Route path="briefs/:id" element={<BriefDetailPage />} />
            <Route path="applications" element={<CreatorApplicationsPage />} />
          </Route>

          {/* Brand Studio Portal */}
          <Route path="/brand" element={<BrandLayout />}>
            <Route index element={<Navigate to="/brand/dashboard" replace />} />
            <Route path="dashboard" element={<BrandDashboard />} />
            <Route path="feed" element={<SocialFeedPage />} />
            <Route path="profile" element={<BrandProfilePage />} />
            <Route path="creators" element={<DiscoverCreatorsPage />} />
            <Route path="saved" element={<SavedCreatorsPage />} />
            <Route path="briefs" element={<BrandBriefsPage />} />
            <Route path="briefs/create" element={<CreateBriefPage />} />
            <Route path="briefs/:id/applications" element={<BrandBriefApplicationsPage />} />
            <Route path="applications" element={<BrandBriefApplicationsPage />} />
            <Route path="applications/:id" element={<ApplicationDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
