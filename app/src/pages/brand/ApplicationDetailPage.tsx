import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MOCK_APPLICATIONS, MOCK_BRIEFS, MOCK_CREATORS } from '../../lib/mockData';

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const application = MOCK_APPLICATIONS.find(a => a.id === id) || MOCK_APPLICATIONS[0];
  const brief = MOCK_BRIEFS.find(b => b.id === application.brief_id) || MOCK_BRIEFS[0];
  const creator = MOCK_CREATORS.find(c => c.id === application.creator_id) || MOCK_CREATORS[0];

  const [status, setStatus] = useState(application.status);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAction = (newStatus: 'accepted' | 'rejected' | 'under_review') => {
    setStatus(newStatus);
    setToastMessage(
      newStatus === 'accepted'
        ? 'Application Approved! Escrow Milestone Activated.'
        : newStatus === 'rejected'
        ? 'Application Declined.'
        : 'Status Updated.'
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="relative w-full px-6 lg:px-12 py-8 flex flex-col gap-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-surface-container-lowest border border-secondary text-on-surface px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-slide-in">
          <span className="material-symbols-outlined text-secondary text-[22px]">check_circle</span>
          <span className="text-xs font-label font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
        <Link to="/brand/briefs" className="hover:text-primary transition-colors">
          My Briefs
        </Link>
        <span className="text-outline">/</span>
        <Link to={`/brand/briefs/${brief.id}/applications`} className="hover:text-primary transition-colors">
          Applications
        </Link>
        <span className="text-outline">/</span>
        <span className="text-secondary font-semibold">{creator.display_name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-label font-semibold uppercase tracking-wider mb-2">
            Proposal Evaluation
          </span>
          <h1 className="text-3xl lg:text-4xl font-headline font-semibold text-on-surface tracking-tight">
            Application: {creator.display_name}
          </h1>
          <p className="text-on-surface-variant font-body text-sm mt-1">
            Submitted for campaign: <strong className="text-on-surface">{brief.title}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/creators/${creator.id}`}
            className="px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface text-xs font-label font-medium border border-outline-variant/30 hover:border-secondary transition-all"
          >
            Inspect Creator Profile
          </Link>
          {status !== 'accepted' ? (
            <button
              onClick={() => handleAction('accepted')}
              className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-semibold shadow-md transition-all"
            >
              Accept Proposal & Open Escrow
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 text-xs font-label font-semibold">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Accepted & Milestone Funded
            </span>
          )}
        </div>
      </div>

      {/* 2-Column Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Creator Pitch Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs space-y-4">
            <h2 className="font-headline text-lg font-semibold text-on-surface">
              Creator Treatment & Statement
            </h2>
            <div className="p-5 rounded-xl bg-surface-container-low text-sm font-body text-on-surface leading-relaxed whitespace-pre-line">
              {application.pitch}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-container-low">
                <span className="text-xs text-outline font-label block">Proposed Escrow Fee</span>
                <span className="text-xl font-bold text-on-surface font-label">
                  ${application.proposed_fee?.toLocaleString()} USD
                </span>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low">
                <span className="text-xs text-outline font-label block">Estimated Turnaround</span>
                <span className="text-xl font-semibold text-on-surface font-label">
                  {application.estimated_timeline || '2 Weeks'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low">
                <span className="text-xs text-outline font-label block">Application Status</span>
                <span className="text-xl font-semibold text-secondary font-label capitalize">
                  {status === 'under_review' ? 'In Review' : status}
                </span>
              </div>
            </div>
          </div>

          {/* Campaign Brief Reference */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs space-y-3">
            <h3 className="font-headline text-base font-semibold text-on-surface">
              Campaign Deliverables Required
            </h3>
            <div className="flex flex-wrap gap-2">
              {brief.deliverables?.map((d, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-surface-container text-xs font-label text-on-surface"
                >
                  ✓ {typeof d === 'string' ? d : d.title || d.description || 'Deliverable'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Creator Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                alt={creator.display_name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-outline-variant/30"
              />
              <div>
                <h3 className="font-headline text-lg font-semibold text-on-surface">
                  {creator.display_name}
                </h3>
                <p className="text-xs text-on-surface-variant font-body">
                  {creator.location}
                </p>
                <div className="flex items-center gap-1 text-xs text-secondary font-semibold font-label mt-1">
                  <span className="text-amber-400">★</span> {creator.rating?.toFixed(1) || '4.9'} ({creator.reviews_count || 24} briefs)
                </div>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant font-body leading-relaxed">
              {creator.bio}
            </p>

            <div className="pt-2">
              <span className="text-[10px] text-outline font-label uppercase tracking-wider block mb-2">
                Neural Toolchain
              </span>
              <div className="flex flex-wrap gap-1.5">
                {creator.ai_tools?.map((tool, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-surface-container text-xs font-label text-on-surface-variant"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20">
              <Link
                to={`/creators/${creator.id}`}
                className="w-full py-2.5 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary font-label text-xs font-semibold text-center block transition-all"
              >
                View Full Showcase & Reels
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
