import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_BRANDS, MOCK_BRIEFS } from '../../lib/mockData';

export default function BrandPublicProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userRole, profileId } = useAuth();

  // Find brand dynamically
  const brand = useMemo(() => {
    return MOCK_BRANDS.find(b => b.id === id) || MOCK_BRANDS[0];
  }, [id]);

  // Determine viewing context:
  // Creator user is NEVER brand viewing, even if viewing Aura Botanica
  const isBrandViewing = userRole === 'brand' || (!userRole && brand.id === 'b-aura-botanica');
  const isOwnBrand = userRole === 'brand' && (profileId === brand.id || (!profileId && brand.id === 'b-aura-botanica'));

  // Brand open briefs
  const briefs = useMemo(() => {
    return MOCK_BRIEFS.filter(b => b.brand_id === brand.id || b.brand_id === 'b-aura-botanica');
  }, [brand.id]);

  // Pitch modal
  const [pitchBrief, setPitchBrief] = useState<any | null>(null);
  const [pitchSuccess, setPitchSuccess] = useState(false);

  const handlePitchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPitchSuccess(true);
    setTimeout(() => {
      setPitchSuccess(false);
      setPitchBrief(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-body text-on-surface antialiased relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl border-b border-outline-variant/20 shadow-xs">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </div>
              <span className="font-headline text-xl font-bold tracking-tight text-on-surface">INOMARK</span>
            </Link>

            {isBrandViewing ? (
              <Link
                to="/brand/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-label text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Back to Brand Atelier</span>
              </Link>
            ) : (
              <Link
                to="/creator/brands"
                className="inline-flex items-center gap-1.5 text-xs font-label text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Back to Explore Brands</span>
              </Link>
            )}
          </div>

          <nav className="flex items-center gap-4">
            {isBrandViewing ? (
              <>
                <Link
                  to="/brand/creators"
                  className="hidden sm:inline text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Discover Creators
                </Link>
                <Link
                  to="/brand/briefs"
                  className="hidden sm:inline text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  My Briefs
                </Link>
                <div className="h-4 w-px bg-outline-variant/30 hidden sm:block" />
                <Link
                  to="/brand/profile"
                  className="px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-medium shadow-xs transition-colors"
                >
                  Edit Brand Settings
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/creator/brands"
                  className="hidden sm:inline text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Explore Brands
                </Link>
                <Link
                  to="/creator/briefs"
                  className="hidden sm:inline text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Brand Briefs
                </Link>
                <div className="h-4 w-px bg-outline-variant/30 hidden sm:block" />
                <Link
                  to="/creator/dashboard"
                  className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/90 text-on-secondary text-xs font-label font-medium shadow-xs transition-colors"
                >
                  Creator Workspace
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Brand Preview Notice Banner */}
          {isOwnBrand && (
            <div className="mb-6 p-4 rounded-2xl bg-primary-fixed/40 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs text-on-surface font-semibold">
                <span className="material-symbols-outlined text-[20px] text-primary">visibility</span>
                <span>You are previewing your Public Brand Showcase — this is how creators and directors see your profile.</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/brand/profile"
                  className="px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs"
                >
                  Edit Brand Settings
                </Link>
                <Link
                  to="/brand/briefs/create"
                  className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-all"
                >
                  Post Campaign Brief
                </Link>
              </div>
            </div>
          )}

          {/* Breadcrumb Context Bar */}
          <div className="flex items-center justify-between py-3 border-b border-outline-variant/15 mb-6">
            <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
              {isBrandViewing ? (
                <>
                  <Link to="/brand/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span>Brand Atelier</span>
                  </Link>
                  <span className="text-outline">/</span>
                  <Link to="/brand/profile" className="hover:text-primary transition-colors">
                    Company Profile
                  </Link>
                  <span className="text-outline">/</span>
                  <span className="text-on-surface font-semibold">{brand.company_name} (Showcase)</span>
                </>
              ) : (
                <>
                  <Link to="/creator/brands" className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Explore Brands</span>
                  </Link>
                  <span className="text-outline">/</span>
                  <span className="text-on-surface font-semibold">{brand.company_name}</span>
                </>
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low text-xs font-label text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Viewing Enterprise Brand Showcase</span>
            </div>
          </div>

          {/* Hero Banner */}
          <section className="relative w-full pb-16">
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl bg-surface-container-high">
              <img
                src={brand.cover_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                alt={brand.company_name}
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-label">
                <span className="material-symbols-outlined text-[16px] text-amber-400">verified</span>
                <span>Inomark Enterprise Patron</span>
              </div>
            </div>

            {/* Overlapping Identity Card */}
            <div className="-mt-16 sm:-mt-20 relative z-20 bg-surface-container-lowest rounded-3xl p-6 sm:p-10 shadow-xl border border-outline-variant/20">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-outline-variant/15">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Crest */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white shadow-lg shrink-0">
                    <span className="font-headline text-3xl font-bold">
                      {brand.company_name?.slice(0, 2).toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                        {brand.company_name}
                      </h1>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-label font-semibold">
                        <span className="material-symbols-outlined text-[15px]">verified</span>
                        Verified Partner
                      </span>
                    </div>

                    <p className="font-headline text-base text-secondary font-medium italic">
                      "{brand.tagline}"
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-label text-on-surface-variant">
                      <span className="px-3 py-1 rounded-full bg-surface-container">
                        {brand.industry}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-surface-container">
                        HQ: {brand.location}
                      </span>
                      {brand.website && (
                        <a
                          href={brand.website}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {brand.website.replace('https://', '')}
                          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {isOwnBrand ? (
                  <div className="flex sm:flex-row items-center gap-3 w-full lg:w-auto">
                    <Link
                      to="/brand/briefs/create"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label text-xs font-semibold transition-all shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_circle</span>
                      <span>Post Campaign Brief</span>
                    </Link>
                    <Link
                      to="/brand/profile"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label text-xs font-semibold transition-all border border-outline-variant/30"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                      <span>Edit Profile</span>
                    </Link>
                    <a
                      href="#open-briefs"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label text-xs font-medium transition-all border border-outline-variant/30"
                    >
                      <span>Briefs ({briefs.length})</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                    </a>
                  </div>
                ) : (
                  <div className="flex sm:flex-row items-center gap-3 w-full lg:w-auto">
                    <a
                      href="#open-briefs"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label text-xs font-semibold transition-all shadow-md"
                    >
                      <span>Explore Open Briefs ({briefs.length})</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-6">
                <p className="font-body text-sm text-on-surface-variant max-w-4xl leading-relaxed">
                  {brand.about}
                </p>
              </div>
            </div>
          </section>

          {/* Open Briefs Section */}
          <section id="open-briefs" className="py-12 border-t border-outline-variant/15 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-label text-xs text-secondary font-semibold uppercase tracking-widest block mb-1">
                  Commission Opportunities
                </span>
                <h2 className="font-headline text-3xl font-semibold text-on-surface">
                  Active Brand Briefs
                </h2>
                <p className="font-body text-sm text-on-surface-variant mt-1">
                  Open production campaigns currently commissioning AI directors, procedural packshot designers, and VFX artists.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {briefs.map((brief) => (
                <div
                  key={brief.id}
                  className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-label font-semibold">
                        Accepting Applications
                      </span>
                      <span className="text-xs text-outline font-label">
                        {brief.timeline || 'Q4 Delivery'}
                      </span>
                    </div>

                    <h3 className="font-headline text-xl font-semibold text-on-surface hover:text-secondary transition-colors">
                      <Link to={isBrandViewing ? `/brand/briefs/${brief.id}/applications` : `/creator/briefs/${brief.id}`}>
                        {brief.title}
                      </Link>
                    </h3>

                    <p className="font-body text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                      {brief.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {brief.deliverables?.slice(0, 3).map((d, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-label"
                        >
                          {typeof d === 'string' ? d : d.title || d.description || 'Deliverable'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-outline-variant/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-outline uppercase font-label block">Allocated Escrow</span>
                      <span className="font-headline text-base font-bold text-on-surface">
                        ${brief.budget_min?.toLocaleString()} – ${brief.budget_max?.toLocaleString()} USD
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isBrandViewing ? (
                        <Link
                          to={`/brand/briefs/${brief.id}/applications`}
                          className="px-5 py-2 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-semibold shadow-xs transition-all"
                        >
                          View Applications
                        </Link>
                      ) : (
                        <Link
                          to={`/creator/briefs/${brief.id}`}
                          className="px-5 py-2 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-semibold shadow-xs transition-all"
                        >
                          Inspect & Apply
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Brand Aesthetic Preferences */}
          <section className="py-12 border-t border-outline-variant/15">
            <div className="max-w-2xl mb-8">
              <span className="font-label text-xs text-secondary font-semibold uppercase tracking-widest block mb-1">
                Visual Standards
              </span>
              <h2 className="font-headline text-3xl font-semibold text-on-surface">
                Creative Preferences & Mediums
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {brand.creative_preferences?.map((pref, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">palette</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-semibold text-sm text-on-surface">
                      {pref}
                    </h4>
                    <span className="text-[11px] text-outline font-label">
                      Mandatory Brand Aesthetic
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
