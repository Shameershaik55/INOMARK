import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_BRIEFS, MOCK_BRANDS, MOCK_PROJECTS } from '../../lib/mockData';

export default function CreatorDashboard() {
  const navigate = useNavigate();
  const [pitchBrief, setPitchBrief] = useState<string | null>(null);
  const [pitchText, setPitchText] = useState('');
  const [bidAmount, setBidAmount] = useState('4500');
  const [pitchSubmitted, setPitchSubmitted] = useState(false);

  const handleApply = (briefId: string) => {
    setPitchBrief(briefId);
    setPitchSubmitted(false);
  };

  const submitPitch = (e: React.FormEvent) => {
    e.preventDefault();
    setPitchSubmitted(true);
    setTimeout(() => {
      setPitchBrief(null);
      setPitchSubmitted(false);
      navigate('/creator/applications');
    }, 1200);
  };

  return (
    <div className="relative w-full overflow-hidden px-6 lg:px-12 py-8 flex flex-col gap-12">
      {/* Subtle Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 right-10 w-[520px] h-[520px] bg-secondary-container/10 rounded-full blur-[120px] -z-10" />
      <div className="pointer-events-none absolute top-[35%] -left-32 w-[480px] h-[480px] bg-primary/10 rounded-full blur-[130px] -z-10" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-[420px] h-[420px] bg-tertiary-fixed-dim/20 rounded-full blur-[110px] -z-10" />

      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">✦</span>
          <span className="font-label-badge text-label-badge text-secondary tracking-widest uppercase">Creator Atelier</span>
          <span className="text-outline-variant font-label-caption text-label-caption">/</span>
          <span className="font-label-badge text-label-badge text-on-surface tracking-wider uppercase font-semibold">Home Dashboard</span>
        </div>

        {/* Verified Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-xs border border-surface-container/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          <span className="font-label-caption text-label-caption text-on-surface font-medium">
            Pro Verified Creator • Available for Q4 Commercial Commissions
          </span>
        </div>
      </div>

      {/* Section 1: Welcome Hero Section */}
      <section className="relative rounded-2xl bg-gradient-to-br from-surface-container-lowest/90 via-surface-container-low/70 to-surface-container/40 backdrop-blur-xl p-8 lg:p-12 shadow-sm border border-surface-container/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold self-start tracking-wider uppercase">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            <span>Director Suite</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Welcome back, <span className="font-headline-md italic font-semibold text-secondary">Elena Vance</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Direct high-value luxury campaigns, connect directly with global brand studios, and build your photorealistic AI portfolio.
          </p>
        </div>

        {/* Hero Call-to-Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-lowest/80 hover:bg-surface-container-lowest text-on-surface font-label-button text-label-button backdrop-blur-lg shadow-sm hover:shadow transition-all group border border-surface-container/80"
            to="/creator/brands"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary group-hover:scale-110 transition-transform">travel_explore</span>
            <span>Explore Brands</span>
          </Link>
          <Link
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-label-button text-label-button shadow-md hover:shadow-lg transition-all group"
            to="/creator/briefs"
          >
            <span>Browse Brand Briefs</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Section 2: Creator Profile Summary Card */}
      <section className="w-full">
        <div className="rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-6 lg:p-8 shadow-sm border border-surface-container/60 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8">
          {/* Profile Identity & Bio */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1 min-w-0">
            <Link to="/creators/c-elena-vance" className="relative flex-shrink-0 group">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-md bg-surface-container ring-2 ring-secondary/30 group-hover:ring-secondary transition-all">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Elena Vance"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow" title="Verified Creator">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </span>
            </Link>

            <div className="flex flex-col gap-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <Link to="/creators/c-elena-vance" className="font-headline-sm text-headline-sm text-on-surface font-bold hover:text-secondary transition-colors">
                  Elena Vance
                </Link>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caption text-label-caption font-semibold uppercase tracking-wider">
                  Top 1% AI Director
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary font-medium">
                Cinematic Commercials • Photorealistic Product Worlds
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 max-w-xl">
                Directing cinematic AI commercials and luxury brand narratives with high-fidelity motion and bespoke diffusion pipelines.
              </p>

              {/* Diffusion Pipelines Tool Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-caption text-xs">Runway Gen-3</span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-caption text-xs">Midjourney v6.1</span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-caption text-xs">ComfyUI Nodes</span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-caption text-xs">FLUX.1 Dev</span>
              </div>
            </div>
          </div>

          {/* Quick Stats & Edit Profile Affordance */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 flex-shrink-0 pt-4 lg:pt-0">
            <div className="flex items-center gap-4 bg-surface-container-low/70 px-4 py-2.5 rounded-xl border border-surface-container">
              <div className="flex items-center gap-1.5 text-on-surface font-label-caption text-label-caption">
                <span className="material-symbols-outlined text-[18px] text-primary">auto_stories</span>
                <span className="font-semibold">3</span> Published Projects
              </div>
              <span className="text-outline-variant font-label-caption text-label-caption">•</span>
              <div className="flex items-center gap-1.5 text-on-surface font-label-caption text-label-caption">
                <span className="material-symbols-outlined text-[18px] text-secondary">bookmark_heart</span>
                <span className="font-semibold">14</span> Brand Bookmarks
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-button text-label-button shadow-xs transition-all group"
                to="/creators/c-elena-vance"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
                <span>View Public Profile</span>
              </Link>
              <Link
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-label-button text-label-button transition-all group"
                to="/creator/profile"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: My Portfolio Showcase */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-secondary font-label-badge text-label-badge uppercase tracking-widest font-semibold">
              <span>Showcase & Work</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">My Portfolio</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Showcase your latest AI-generated work to commissioning brands.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/creator/portfolio"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-xs hover:shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Manage Portfolio</span>
            </Link>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PROJECTS.slice(0, 4).map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-surface-container-lowest overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col border border-surface-container/60"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={project.media_url}
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-caption text-xs text-on-surface font-semibold shadow-xs">
                  {project.aspect_ratio || '16:9 4K'}
                </span>
                <Link
                  to="/creator/portfolio"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-surface-container-lowest"
                  title="View full project"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </Link>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="font-label-caption text-xs tracking-wider uppercase bg-secondary-container/90 text-on-secondary-container px-2 py-0.5 rounded-full font-semibold">
                    {project.category}
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-white">play_circle</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1.5 flex-1 justify-between bg-surface-container-lowest">
                <div>
                  <h3 className="font-headline-sm text-body-md text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="font-label-caption text-xs text-on-surface-variant">{project.tools_used?.join(' • ') || 'Runway Gen-3'}</p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-surface-container/40">
                  <span className="font-label-caption text-xs text-secondary font-medium">Published</span>
                  <Link
                    to="/creator/portfolio"
                    className="font-label-caption text-xs text-on-surface-variant hover:text-primary flex items-center gap-0.5 font-semibold"
                  >
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                    <span>Edit</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Explore Brands Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-secondary font-label-badge text-label-badge uppercase tracking-widest font-semibold">
              <span>Commissioning Partners</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Explore Brands</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Connect with leading brands commissioning AI creators.</p>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-button text-label-button transition-colors font-semibold"
            to="/creator/brands"
          >
            <span>Explore All Brands</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* Brands Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_BRANDS.slice(0, 3).map((brand) => (
            <div
              key={brand.id}
              className="rounded-2xl bg-surface-container-lowest/80 backdrop-blur-xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-6 border border-surface-container/60"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-xs overflow-hidden border border-surface-container">
                    <img src={brand.logo_url || ''} alt={brand.company_name} className="w-full h-full object-cover" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caption text-xs font-semibold">
                    {brand.active_briefs_count} Active Briefs
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    <Link to={`/brands/${brand.id}`} className="hover:text-secondary transition-colors">
                      {brand.company_name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-2 pt-1 font-label-caption text-xs text-on-surface-variant">
                    <span>{brand.industry}</span>
                    <span>•</span>
                    <span>{brand.location}</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                  {brand.about}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  className="flex-1 py-2.5 rounded-full bg-surface-container-low hover:bg-secondary-fixed hover:text-on-secondary-fixed text-on-surface font-label-button text-label-button text-center transition-all font-semibold"
                  to={`/brands/${brand.id}`}
                >
                  View Brand Profile
                </Link>
                <Link
                  className="px-4 py-2.5 rounded-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-label-button text-label-button text-center transition-all font-semibold"
                  to={`/creator/briefs?brand=${brand.id}`}
                  title="View Open Briefs from this brand"
                >
                  Briefs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Brand Briefs Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-secondary font-label-badge text-label-badge uppercase tracking-widest font-semibold">
              <span>Open Creative Calls</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Brand Briefs</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Recently published opportunities seeking AI creators.</p>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-button text-label-button transition-colors font-semibold"
            to="/creator/briefs"
          >
            <span>Explore All Briefs</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* Briefs Listing Stack */}
        <div className="flex flex-col gap-4">
          {MOCK_BRIEFS.slice(0, 3).map((brief) => {
            const brand = MOCK_BRANDS.find((b) => b.id === brief.brand_id) || MOCK_BRANDS[0];
            return (
              <div
                key={brief.id}
                className="rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-surface-container/60"
              >
                <div className="flex flex-col gap-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caption text-xs font-semibold">
                      Accepting Pitches
                    </span>
                    <Link
                      to={`/brands/${brand.id}`}
                      className="font-label-badge text-xs uppercase tracking-wider text-secondary font-semibold hover:underline"
                    >
                      {brand.company_name}
                    </Link>
                    <span className="text-outline-variant font-label-caption text-xs">•</span>
                    <span className="font-label-caption text-xs text-on-surface-variant">
                      Deadline: {brief.deadline ? new Date(brief.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold hover:text-primary transition-colors">
                      <Link to={`/creator/briefs/${brief.id}`}>{brief.title}</Link>
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant pt-1 line-clamp-2">
                      {brief.objective}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:gap-6 self-stretch lg:self-auto justify-between lg:justify-end">
                  <div className="flex flex-col lg:items-end">
                    <span className="font-label-caption text-xs text-on-surface-variant uppercase tracking-wider">
                      Allocated Budget
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold text-secondary">
                      ${brief.budget_min?.toLocaleString()} – ${brief.budget_max?.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      className="px-4 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-button text-label-button transition-colors font-semibold"
                      to={`/creator/briefs/${brief.id}`}
                    >
                      View Brief
                    </Link>
                    <button
                      onClick={() => handleApply(brief.id)}
                      className="px-5 py-2.5 rounded-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-label-button text-label-button shadow-xs hover:shadow transition-all font-semibold cursor-pointer"
                      type="button"
                    >
                      Apply / Submit Pitch
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Pitch Submission Modal */}
      {pitchBrief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-surface-container flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">send</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Submit Pitch Proposal</h3>
              </div>
              <button
                onClick={() => setPitchBrief(null)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {pitchSubmitted ? (
              <div className="py-8 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-headline-sm text-on-surface font-bold">Proposal Submitted!</h4>
                <p className="font-body-sm text-on-surface-variant">
                  Your treatment has been sent directly to the brand team. Redirecting to applications...
                </p>
              </div>
            ) : (
              <form onSubmit={submitPitch} className="flex flex-col gap-4">
                <div>
                  <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                    Your Creative Treatment & Approach
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={pitchText}
                    onChange={(e) => setPitchText(e.target.value)}
                    placeholder="Describe how you plan to direct this commercial piece, which diffusion tools you'll use, and your visual style..."
                    className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                      Proposed Fee (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-on-surface-variant font-semibold">$</span>
                      <input
                        type="number"
                        required
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 rounded-xl bg-surface-container-low border border-surface-container text-body-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                      Turnaround Time
                    </label>
                    <select className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container text-body-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40">
                      <option>7 Calendar Days</option>
                      <option>14 Calendar Days</option>
                      <option>21 Calendar Days</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setPitchBrief(null)}
                    className="px-4 py-2 rounded-full font-label-button text-xs text-on-surface-variant hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full font-label-button text-xs bg-secondary text-white font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    Send Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bottom Spacing Cushion */}
      <div className="h-8" />
    </div>
  );
}
