import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CREATORS, MOCK_BRIEFS } from '../../lib/mockData';

export default function BrandDashboard() {
  const [savedCreatorIds, setSavedCreatorIds] = useState<string[]>(['c-elena-vance', 'c-kaelen-mori']);

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedCreatorIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative w-full overflow-hidden px-6 lg:px-12 py-8 flex flex-col gap-12">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-secondary-fixed/20 blur-[130px]" />
        <div className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-primary-fixed/20 blur-[140px]" />
      </div>

      {/* Hero Welcome Banner */}
      <section className="relative w-full rounded-2xl bg-surface-container-lowest/90 backdrop-blur-2xl shadow-xs border border-surface-container/60 p-8 md:p-12 overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 w-fit">
              <span className="material-symbols-outlined text-primary text-[14px]">auto_awesome</span>
              <span className="font-label-badge text-xs text-primary uppercase tracking-widest font-bold">
                Brand Atelier Studio
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
              Welcome back, <span className="font-normal italic text-secondary">Aura Botanica</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Commission vanguard AI creators, inspect incoming treatments, and manage your photorealistic campaign pipelines in escrow.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary text-on-primary font-label-button text-xs font-semibold shadow-xs hover:shadow-md transition-all group"
                to="/brand/creators"
              >
                <span className="material-symbols-outlined text-[18px]">explore</span>
                <span>Discover Creators</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
              <Link
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-secondary text-white font-label-button text-xs font-semibold hover:opacity-95 transition-all shadow-xs"
                to="/brand/briefs/create"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Create a Campaign Brief</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <Link
              to="/brand/briefs"
              className="flex items-center gap-4 px-5 py-4 rounded-xl bg-surface-container-low/70 backdrop-blur-md shadow-xs border border-surface-container min-w-[220px] hover:bg-surface-container transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">mark_email_unread</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-sm text-on-surface font-bold">5 New Pitches</span>
                <span className="font-label-caption text-xs text-on-surface-variant uppercase tracking-wider">Awaiting Review</span>
              </div>
            </Link>
            <Link
              to="/brand/saved"
              className="flex items-center gap-4 px-5 py-4 rounded-xl bg-surface-container-low/70 backdrop-blur-md shadow-xs border border-surface-container min-w-[220px] hover:bg-surface-container transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">bookmarks</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-sm text-on-surface font-bold">{savedCreatorIds.length} Saved</span>
                <span className="font-label-caption text-xs text-on-surface-variant uppercase tracking-wider">Talent Roster</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Get Started</h2>
          </div>
          <span className="font-label-caption text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
            3 Instant Workflows
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all border border-surface-container/60">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined text-[24px]">travel_explore</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Discover Creators</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Explore certified creator profiles, review diffusion portfolios, and filter by LoRA weights and generative video tools.
                </p>
              </div>
            </div>
            <div className="pt-6">
              <Link
                to="/brand/creators"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-full bg-surface-container-low text-on-surface group-hover:bg-primary group-hover:text-on-primary font-label-button text-xs font-semibold transition-colors"
              >
                <span>Browse All Creators</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="group rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all border border-surface-container/60">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[24px]">post_add</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Create Campaign Brief</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Post requirements for AI video commercials, 4K stills, or 3D packshots and receive structured director treatments.
                </p>
              </div>
            </div>
            <div className="pt-6">
              <Link
                to="/brand/briefs/create"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-full bg-surface-container-low text-on-surface group-hover:bg-secondary group-hover:text-white font-label-button text-xs font-semibold transition-colors"
              >
                <span>Post New Brief</span>
                <span className="material-symbols-outlined text-[16px]">add</span>
              </Link>
            </div>
          </div>

          <div className="group rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all border border-surface-container/60">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[24px]">bookmarks</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">View Saved Roster</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Access your bookmarked AI directors and prompt artists to send direct commissions or invite them to private RFPs.
                </p>
              </div>
            </div>
            <div className="pt-6">
              <Link
                to="/brand/saved"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-full bg-surface-container-low text-on-surface group-hover:bg-inverse-surface group-hover:text-inverse-on-surface font-label-button text-xs font-semibold transition-colors"
              >
                <span>View Saved ({savedCreatorIds.length})</span>
                <span className="material-symbols-outlined text-[16px]">visibility</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 font-label-badge text-xs text-primary uppercase tracking-widest font-semibold mb-1">
              <span className="material-symbols-outlined text-[14px]">stars</span> Verified AI Directors
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Featured Creators</h2>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
              Top-rated generative artists specialized in photoreal commercial execution.
            </p>
          </div>
          <Link
            to="/brand/creators"
            className="inline-flex items-center gap-1.5 text-primary hover:text-secondary font-label-button text-xs font-semibold transition-colors group"
          >
            <span>View All Creators ({MOCK_CREATORS.length})</span>
            <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CREATORS.slice(0, 4).map((creator) => {
            const isSaved = savedCreatorIds.includes(creator.id);
            return (
              <div
                key={creator.id}
                className="flex flex-col rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl overflow-hidden shadow-xs hover:shadow-xl transition-all group border border-surface-container/60"
              >
                <div className="relative w-full h-48 overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'}
                    alt={creator.display_name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-caption text-xs text-on-surface font-semibold shadow-xs">
                    {creator.specializations?.[0] || 'AI Video'}
                  </span>
                  <button
                    onClick={(e) => toggleSave(e, creator.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                      isSaved ? 'text-secondary' : 'text-on-surface hover:text-secondary'
                    }`}
                    title={isSaved ? 'Remove Bookmark' : 'Bookmark Creator'}
                  >
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>
                      bookmark
                    </span>
                  </button>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-caption text-[11px] text-on-surface font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{creator.availability}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/creators/${creator.id}`}
                        className="font-headline-sm text-sm font-bold text-on-surface hover:text-primary transition-colors truncate"
                      >
                        {creator.display_name}
                      </Link>
                      <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                    </div>
                    <span className="font-label-caption text-xs text-secondary font-medium truncate">
                      {creator.headline}
                    </span>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {creator.bio}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {creator.ai_tools?.slice(0, 2).map((tool) => (
                        <span key={tool} className="px-2 py-0.5 rounded-full bg-surface-container-low text-[10px] text-on-surface-variant font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/creators/${creator.id}`}
                    className="w-full py-2.5 rounded-full bg-surface-container-low hover:bg-primary hover:text-white text-on-surface text-center font-label-button text-xs font-semibold transition-colors"
                  >
                    View Creator Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Your Campaign Briefs Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Your Campaign Briefs</h2>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">Track deliverables, proposals, and pipeline milestones.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/brand/briefs" className="text-primary hover:text-secondary font-label-button text-xs font-semibold transition-colors">
              View All Briefs →
            </Link>
            <Link
              to="/brand/briefs/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-white font-label-button text-xs font-semibold shadow-xs hover:opacity-95 transition-opacity"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>New Brief</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MOCK_BRIEFS.slice(0, 2).map((brief) => (
            <div
              key={brief.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-xs hover:shadow-lg transition-all border border-surface-container/60"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-label-badge text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Published · Accepting Pitches
                  </span>
                  <span className="font-label-caption text-xs text-on-surface-variant">
                    Due {brief.deadline ? new Date(brief.deadline).toLocaleDateString() : 'Flexible'}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface">{brief.title}</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                    {brief.objective}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="flex flex-col p-2.5 rounded-xl bg-surface-container-low border border-surface-container">
                    <span className="font-label-caption text-xs text-on-surface-variant uppercase font-medium">Format</span>
                    <span className="font-label-button text-xs text-on-surface font-semibold mt-0.5">{brief.aspect_ratio || '16:9 4K'}</span>
                  </div>
                  <div className="flex flex-col p-2.5 rounded-xl bg-surface-container-low border border-surface-container">
                    <span className="font-label-caption text-xs text-on-surface-variant uppercase font-medium">Budget</span>
                    <span className="font-label-button text-xs text-on-surface font-semibold mt-0.5 text-secondary">
                      ${brief.budget_min?.toLocaleString()} – ${brief.budget_max?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between border-t border-surface-container/40 mt-4">
                <span className="font-label-caption text-xs text-primary font-bold">
                  {brief.applications_count || 5} Pitches Received
                </span>
                <Link
                  to={`/brand/briefs/${brief.id}/applications`}
                  className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary hover:text-white text-primary font-label-button text-xs font-semibold transition-colors"
                >
                  Review Pitches
                </Link>
              </div>
            </div>
          ))}

          {/* Create New Inline Tile */}
          <Link
            to="/brand/briefs/create"
            className="group flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-low backdrop-blur-xl transition-all shadow-xs border border-dashed border-surface-container-high min-h-[260px]"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300 mb-4 shadow-xs">
              <span className="material-symbols-outlined text-[28px]">add_circle</span>
            </div>
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">Post a Custom Campaign Brief</h3>
            <p className="font-body-sm text-xs text-on-surface-variant max-w-xs mt-2 leading-relaxed">
              Set deliverables, attach moodboards, and receive curated spec treatments from top AI creators.
            </p>
            <span className="mt-4 px-4 py-2 rounded-full bg-surface-container-lowest text-primary font-label-button text-xs font-semibold group-hover:shadow-xs transition-shadow border border-surface-container">
              Start New Brief +
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
