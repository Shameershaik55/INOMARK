import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BRANDS } from '../../lib/mockData';

export default function ExploreBrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [briefsOnly, setBriefsOnly] = useState(false);
  const [sortBy, setSortBy] = useState('briefs');
  const [pitchBrandId, setPitchBrandId] = useState<string | null>(null);
  const [pitchMessage, setPitchMessage] = useState('');
  const [pitchSent, setPitchSent] = useState(false);

  const industries = useMemo(() => {
    const list = Array.from(new Set(MOCK_BRANDS.map(b => b.industry)));
    return ['all', ...list];
  }, []);

  const filteredBrands = useMemo(() => {
    return MOCK_BRANDS.filter((brand) => {
      if (briefsOnly && brand.active_briefs_count === 0) return false;
      if (selectedIndustry !== 'all' && brand.industry !== selectedIndustry) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = brand.company_name.toLowerCase().includes(q);
        const matchInd = brand.industry.toLowerCase().includes(q);
        const matchLoc = brand.location ? brand.location.toLowerCase().includes(q) : false;
        const matchAbout = brand.about ? brand.about.toLowerCase().includes(q) : false;
        if (!matchName && !matchInd && !matchLoc && !matchAbout) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'briefs') return b.active_briefs_count - a.active_briefs_count;
      if (sortBy === 'name') return a.company_name.localeCompare(b.company_name);
      return 0;
    });
  }, [searchQuery, selectedIndustry, briefsOnly, sortBy]);

  const handleSendPitch = (e: React.FormEvent) => {
    e.preventDefault();
    setPitchSent(true);
    setTimeout(() => {
      setPitchBrandId(null);
      setPitchSent(false);
      setPitchMessage('');
    }, 1200);
  };

  return (
    <div className="relative w-full overflow-hidden px-6 lg:px-12 py-8 flex flex-col gap-10">
      {/* Ambient Radiant Mesh Aura Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-secondary-fixed/40 via-primary-fixed-dim/20 to-tertiary-fixed/20 blur-3xl opacity-70" />
        <div className="absolute top-[35%] -left-36 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-surface-variant/50 via-secondary-fixed-dim/30 to-transparent blur-3xl opacity-60" />
      </div>

      {/* Hero Header & Quantitative Status Chips */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-xs tracking-wider uppercase font-semibold">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              Creator Network
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-caption text-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {MOCK_BRANDS.length} Active Verified Brand Studios
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Discover <span className="font-headline-lg italic font-normal text-secondary">Brands</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Connect directly with forward-thinking enterprises that match your aesthetic craft and unlock high-budget generative commercial briefs.
          </p>
        </div>

        {/* Quick Metrics Counters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-xs border border-surface-container/60">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface leading-none font-bold">
                {MOCK_BRANDS.length}
              </span>
              <span className="font-label-caption text-xs text-on-surface-variant font-medium">Verified Brands</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-xs border border-surface-container/60">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/60 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface leading-none font-bold">18</span>
              <span className="font-label-caption text-xs text-on-surface-variant font-medium">Live Briefs</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-xs border border-surface-container/60">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/60 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface leading-none font-bold">$175k+</span>
              <span className="font-label-caption text-xs text-on-surface-variant font-medium">Disbursed Escrow</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Multi-Criteria Filtering Controls */}
      <section className="flex flex-col gap-4 p-5 rounded-3xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-xs border border-surface-container/60">
        {/* Search Field Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[22px]">
              search
            </span>
            <input
              className="w-full pl-12 pr-10 py-3 rounded-full bg-surface-container-low text-on-surface font-body-md text-sm placeholder:text-on-surface-variant/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 transition-all outline-none border border-surface-container"
              placeholder="Search brands by company name, location, or industry..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            )}
          </div>

          {/* Filter Selects */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-3 rounded-full bg-surface-container-low text-on-surface font-body-sm text-xs font-medium border border-surface-container focus:outline-none cursor-pointer"
            >
              <option value="all">Industry: All</option>
              {industries.filter(i => i !== 'all').map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-full bg-surface-container-low text-on-surface font-body-sm text-xs font-medium border border-surface-container focus:outline-none cursor-pointer"
            >
              <option value="briefs">Most Active Briefs</option>
              <option value="name">Company Name (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Controls & Active Tags Sub-bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-surface-container/40">
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={briefsOnly}
                onChange={(e) => setBriefsOnly(e.target.checked)}
                className="w-4 h-4 rounded accent-primary cursor-pointer"
              />
              <span className="font-label-caption text-xs text-on-surface font-semibold">
                Only show brands with active open briefs
              </span>
            </label>

            {(searchQuery || selectedIndustry !== 'all' || briefsOnly) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIndustry('all');
                  setBriefsOnly(false);
                }}
                className="font-label-badge text-xs text-primary hover:underline ml-2 cursor-pointer font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>

          <span className="font-label-caption text-xs text-on-surface-variant font-medium">
            Showing {filteredBrands.length} of {MOCK_BRANDS.length} brands
          </span>
        </div>
      </section>

      {/* Brand Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-surface-container-lowest rounded-3xl border border-surface-container flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">search_off</span>
            <h3 className="font-headline-sm text-on-surface font-semibold">No brands match your criteria</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedIndustry('all');
                setBriefsOnly(false);
              }}
              className="px-5 py-2 rounded-full bg-primary text-white font-label-button text-xs font-semibold mt-2"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredBrands.map((brand) => (
            <article
              key={brand.id}
              className="flex flex-col justify-between p-6 rounded-3xl bg-surface-container-lowest shadow-xs hover:shadow-xl transition-all duration-300 relative group overflow-hidden border border-surface-container/60"
            >
              <div className="flex flex-col gap-4 relative">
                {/* Brand Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center overflow-hidden border border-surface-container shadow-xs">
                      {brand.logo_url ? (
                        <img src={brand.logo_url} alt={brand.company_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-headline-md font-bold text-primary">{brand.company_name[0]}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/brands/${brand.id}`}
                          className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-semibold"
                        >
                          {brand.company_name}
                        </Link>
                        <span className="material-symbols-outlined text-[16px] text-primary" title="Verified Partner">
                          verified
                        </span>
                      </div>
                      <span className="font-label-caption text-xs text-on-surface-variant">
                        {brand.industry} • {brand.location}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-secondary font-label-badge text-xs uppercase tracking-wider font-semibold">
                    {brand.business_type || 'Enterprise'}
                  </span>
                </div>

                {/* Tagline / About */}
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                  {brand.about}
                </p>

                {/* Creative Preference Tags */}
                {brand.creative_preferences && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {brand.creative_preferences.slice(0, 3).map((pref) => (
                      <span
                        key={pref}
                        className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface font-label-caption text-xs border border-surface-container"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer & Actions */}
              <div className="flex flex-col gap-3 pt-5 mt-4 -mx-6 -mb-6 p-6 rounded-b-3xl bg-surface-container-low/40 border-t border-surface-container/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <span className="material-symbols-outlined text-[18px]">assignment</span>
                    <span className="font-label-button text-xs font-semibold">
                      {brand.active_briefs_count} Active Briefs
                    </span>
                  </div>
                  <span className="font-label-caption text-xs text-on-surface font-semibold">
                    {brand.total_paid} Escrow Disbursed
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/brands/${brand.id}`}
                    className="flex-1 py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-button text-xs font-semibold text-center shadow-xs transition-all border border-surface-container"
                  >
                    View Profile
                  </Link>
                  {brand.active_briefs_count > 0 ? (
                    <Link
                      to={`/creator/briefs?brand=${brand.id}`}
                      className="flex-1 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-button text-xs font-semibold text-center shadow-xs hover:shadow transition-all flex items-center justify-center gap-1"
                    >
                      <span>Briefs ({brand.active_briefs_count})</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setPitchBrandId(brand.id)}
                      className="flex-1 py-2.5 rounded-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-label-button text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Direct Pitch</span>
                      <span className="material-symbols-outlined text-[16px]">send</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </main>

      {/* Direct Brand Spec Pitch Modal */}
      {pitchBrandId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-surface-container flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">forward_to_inbox</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Send Direct Spec Inquiry</h3>
              </div>
              <button
                onClick={() => setPitchBrandId(null)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {pitchSent ? (
              <div className="py-8 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-headline-sm text-on-surface font-bold">Message Dispatched!</h4>
                <p className="font-body-sm text-on-surface-variant">
                  Your inquiry and verified creator profile have been transmitted to the brand studio creative director.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendPitch} className="flex flex-col gap-4">
                <div>
                  <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                    Introduction & Creative Vision
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={pitchMessage}
                    onChange={(e) => setPitchMessage(e.target.value)}
                    placeholder="Introduce yourself, your generative film pipeline, and how you can elevate this brand's visual identity..."
                    className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setPitchBrandId(null)}
                    className="px-4 py-2 rounded-full font-label-button text-xs text-on-surface-variant hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full font-label-button text-xs bg-secondary text-white font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
                  >
                    Transmit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
