import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function CreatorLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const handleLogout = async () => {
    await signOut();
    navigate('/creator/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate(`/creator/briefs?q=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/creator/dashboard', icon: 'grid_view' },
    { name: 'Social & Reels', path: '/creator/feed', icon: 'smart_display' },
    { name: 'My Profile', path: '/creator/profile', icon: 'person' },
    { name: 'My Portfolio', path: '/creator/portfolio', icon: 'collections' },
    { name: 'Explore Brands', path: '/creator/brands', icon: 'travel_explore' },
    { name: 'Brand Briefs', path: '/creator/briefs', icon: 'assignment' },
    { name: 'My Applications', path: '/creator/applications', icon: 'task_alt' },
  ];

  const currentNav = navLinks.find(l => location.pathname.startsWith(l.path)) || { name: 'Workspace' };

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Unified Creator Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between p-space-lg transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-space-xl">
          {/* Logo & Header */}
          <div className="flex items-center justify-between px-space-xs">
            <Link to="/" className="flex items-center gap-space-sm group">
              <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-[0_4px_12px_rgba(138,76,252,0.25)] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-sm font-semibold tracking-wider text-on-surface uppercase leading-tight">
                  Inomark
                </span>
                <span className="font-label-badge text-[10px] uppercase text-secondary tracking-widest font-bold">
                  Creator Hub
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 rounded-full hover:bg-surface-container-low text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Nav List */}
          <nav className="flex flex-col gap-space-xs">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/creator/dashboard' && location.pathname.startsWith(item.path));
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-space-md px-space-md py-space-sm rounded-full transition-all ${
                    isActive
                      ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-secondary' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="font-label-button text-label-button">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Badge & Bottom Links */}
        <div className="flex flex-col gap-space-sm pt-space-md bg-surface-container-low rounded-lg p-space-md">
          <Link
            to="/creator/profile"
            className="flex items-center gap-space-sm group hover:opacity-95 transition-opacity"
            title="Edit My Creator Profile"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white overflow-hidden shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Elena Vance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-label-button text-label-button text-on-surface truncate group-hover:text-secondary transition-colors font-bold">
                Elena Vance
              </span>
              <span className="font-label-caption text-label-caption text-secondary truncate font-semibold">
                Pro AI Director ✦
              </span>
            </div>
          </Link>
          <div className="flex items-center justify-between pt-space-xs mt-space-xs border-t border-surface-container/60">
            <Link
              to="/creator/profile"
              className="flex items-center gap-space-xs font-label-caption text-label-caption text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">settings</span>
              <span>Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-space-xs font-label-caption text-label-caption text-on-surface-variant hover:text-error transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Top Header & Main Content Offset */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 md:px-8 border-b border-surface-container/60">
          <div className="flex items-center gap-space-md flex-1 max-w-md">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant mr-1"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-caption text-label-caption">
              <span className="hover:text-on-surface transition-colors font-semibold text-secondary">Creator Hub</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface font-semibold">{currentNav.name}</span>
            </div>
            {/* Global Quick Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 hidden md:flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                className="w-full pl-9 pr-4 py-1.5 bg-surface-container-low rounded-full font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Search creative briefs, brands, models..."
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center gap-3 md:gap-space-lg">
            {/* Browse Briefs Action Button */}
            <Link
              to="/creator/briefs"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-secondary hover:bg-secondary/90 text-white text-xs font-semibold transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">assignment</span>
              <span>Brand Briefs</span>
            </Link>

            {/* Notifications Indicator */}
            <Link
              to="/creator/applications"
              className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all"
              title="My Proposals & Contracts"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            </Link>

            {/* Profile Avatar Badge */}
            <Link
              to="/creator/profile"
              className="flex items-center gap-space-sm pl-space-sm hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden border border-secondary">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Elena Vance"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider font-bold">
                  Elena Vance
                </span>
              </div>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="w-full pt-16 flex-1 bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
