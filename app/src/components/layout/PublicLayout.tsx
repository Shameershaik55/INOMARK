import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PublicLayout() {
  const { user, userRole, loginAsDemo, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight leading-none text-on-surface">INOMARK</span>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-0.5">AI Creator Marketplace</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#curated-directors" className="text-body-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Curated Directors
            </Link>
            <Link to="/#active-briefs" className="text-body-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Active Briefs
            </Link>
            <Link to="/#studios" className="text-body-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Brand Studios
            </Link>
            <Link to="/#how-it-works" className="text-body-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              How It Works
            </Link>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {user || userRole ? (
              <div className="flex items-center gap-3">
                <Link
                  to={userRole === 'brand' ? '/brand/dashboard' : '/creator/dashboard'}
                  className="btn btn-primary btn-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn btn-outline btn-sm text-on-surface-variant hover:text-error"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex items-center gap-1.5 mr-2">
                  <button
                    onClick={() => loginAsDemo('creator')}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface-container-high text-primary hover:bg-primary-fixed transition-colors font-medium"
                    title="Quick preview as Elena Vance (AI Director)"
                  >
                    Demo: Creator
                  </button>
                  <button
                    onClick={() => loginAsDemo('brand')}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container hover:text-white transition-colors font-medium"
                    title="Quick preview as Aura Botanica (Brand)"
                  >
                    Demo: Brand
                  </button>
                </div>
                <Link
                  to="/creator/login"
                  className="px-4 py-2 text-body-sm font-semibold text-on-surface hover:text-primary transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/creator/signup"
                  className="btn btn-primary btn-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-surface-container py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              </div>
              <span className="font-display font-bold text-lg text-on-surface">INOMARK</span>
            </div>
            <p className="text-body-sm text-on-surface-variant max-w-sm">
              The premier curated marketplace matching world-class AI commercial directors, synthetic photographers, and 3D visualists with progressive luxury brands.
            </p>
            <div className="text-xs text-outline pt-2">
              © {new Date().getFullYear()} Inomark Inc. All rights reserved.
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-4">For Creators</h4>
            <ul className="flex flex-col gap-2.5 text-body-sm text-on-surface-variant">
              <li><Link to="/creator/login" className="hover:text-primary transition-colors">Creator Portal</Link></li>
              <li><Link to="/creator/signup" className="hover:text-primary transition-colors">Apply as AI Director</Link></li>
              <li><Link to="/creator/briefs" className="hover:text-primary transition-colors">Browse Live Briefs</Link></li>
              <li><Link to="/creator/portfolio" className="hover:text-primary transition-colors">Portfolio Showcase</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-4">For Brands</h4>
            <ul className="flex flex-col gap-2.5 text-body-sm text-on-surface-variant">
              <li><Link to="/brand/login" className="hover:text-primary transition-colors">Brand Dashboard</Link></li>
              <li><Link to="/brand/signup" className="hover:text-primary transition-colors">Post a Campaign Brief</Link></li>
              <li><Link to="/brand/creators" className="hover:text-primary transition-colors">Discover Directors</Link></li>
              <li><Link to="/brand/saved" className="hover:text-primary transition-colors">Saved Talent Roster</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-4">Platform</h4>
            <ul className="flex flex-col gap-2.5 text-body-sm text-on-surface-variant">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/forgot-password" className="hover:text-primary transition-colors">Password Recovery</Link></li>
              <li><span className="text-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary font-semibold">Luminous v2.4</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
