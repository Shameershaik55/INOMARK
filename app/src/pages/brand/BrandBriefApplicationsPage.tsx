import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MOCK_BRIEFS, MOCK_APPLICATIONS, MOCK_CREATORS } from '../../lib/mockData';

export default function BrandBriefApplicationsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find brief
  const currentBrief = useMemo(() => {
    return MOCK_BRIEFS.find(b => b.id === id) || MOCK_BRIEFS[0];
  }, [id]);

  // Applications for this brief or default pool
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeApp, setActiveApp] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateStatus = (appId: string, newStatus: 'accepted' | 'rejected' | 'under_review') => {
    setApplications(prev =>
      prev.map(a => (a.id === appId ? { ...a, status: newStatus } : a))
    );
    if (activeApp && activeApp.id === appId) {
      setActiveApp((prev: any) => ({ ...prev, status: newStatus }));
    }
    showToast(
      newStatus === 'accepted'
        ? 'Application Accepted! Escrow Milestone Activated.'
        : newStatus === 'rejected'
        ? 'Application marked as Declined.'
        : 'Application moved to Under Review.'
    );
  };

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      if (selectedStatus === 'submitted' && app.status !== 'submitted') return false;
      if (selectedStatus === 'under_review' && app.status !== 'under_review') return false;
      if (selectedStatus === 'accepted' && app.status !== 'accepted') return false;
      if (selectedStatus === 'rejected' && app.status !== 'rejected') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const creator = MOCK_CREATORS.find(c => c.id === app.creator_id);
        const nameMatch = creator?.display_name.toLowerCase().includes(q);
        const pitchText = app.pitch || app.pitch_text || app.proposal || '';
        const pitchMatch = pitchText.toLowerCase().includes(q);
        if (!nameMatch && !pitchMatch) return false;
      }
      return true;
    });
  }, [applications, selectedStatus, searchQuery]);

  return (
    <div className="relative w-full px-6 lg:px-12 py-8 flex flex-col gap-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-surface-container-lowest border border-secondary text-on-surface px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-slide-in">
          <span className="material-symbols-outlined text-secondary text-[22px]">check_circle</span>
          <span className="text-xs font-label font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Hierarchy */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
          <Link to="/brand/briefs" className="hover:text-primary transition-colors flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[16px]">assignment</span>
            <span>My Briefs</span>
          </Link>
          <span className="text-outline">/</span>
          <span className="text-on-surface font-semibold max-w-md truncate">
            {currentBrief.title}
          </span>
          <span className="text-outline">/</span>
          <span className="text-secondary font-semibold">Creator Proposals</span>
        </div>

        <Link
          to="/brand/briefs"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-low text-on-surface text-xs font-label hover:bg-surface-container transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to My Briefs</span>
        </Link>
      </div>

      {/* Header */}
      <div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-label font-semibold uppercase tracking-wider mb-2">
          Direct Submissions Pipeline
        </span>
        <h1 className="text-3xl lg:text-4xl font-headline font-semibold text-on-surface tracking-tight">
          Applicant Proposals
        </h1>
        <p className="text-on-surface-variant font-body text-base mt-1 max-w-2xl">
          Review candidate treatments, inspect video showreels, and select creators for your production escrow contract.
        </p>
      </div>

      {/* Brief Summary Banner */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-secondary/10 text-secondary font-label text-xs font-semibold px-2.5 py-1 rounded-full">
              Published Brief
            </span>
            <span className="bg-surface-container text-on-surface-variant font-label text-xs px-2.5 py-1 rounded-full">
              {currentBrief.category}
            </span>
          </div>
          <h2 className="font-headline text-xl font-semibold text-on-surface">
            {currentBrief.title}
          </h2>
          <div className="flex flex-wrap items-center gap-6 text-xs text-on-surface-variant font-body">
            <div>
              Allocated Budget: <strong className="text-on-surface font-semibold">${currentBrief.budget_min?.toLocaleString()} – ${currentBrief.budget_max?.toLocaleString()} USD</strong>
            </div>
            <div>
              Target Timeline: <strong className="text-on-surface font-semibold">{currentBrief.timeline || 'Q4 Campaign'}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-surface-container-low px-5 py-3 rounded-2xl shrink-0">
          <div>
            <span className="text-[10px] text-outline uppercase font-label block">Pool Size</span>
            <span className="font-headline text-2xl font-bold text-on-surface">{applications.length}</span>
          </div>
          <div className="w-px h-8 bg-outline-variant/30" />
          <div className="flex items-center gap-3 text-xs text-on-surface-variant font-label">
            <span className="text-secondary font-semibold">
              {applications.filter(a => a.status === 'accepted').length} Accepted
            </span>
            <span>
              {applications.filter(a => a.status === 'under_review').length} In Review
            </span>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20 shadow-xs">
        <div className="flex items-center p-1 bg-surface-container-low rounded-full gap-1">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-label transition-all ${
              selectedStatus === 'all'
                ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All ({applications.length})
          </button>
          <button
            onClick={() => setSelectedStatus('submitted')}
            className={`px-4 py-1.5 rounded-full text-xs font-label transition-all ${
              selectedStatus === 'submitted'
                ? 'bg-surface-container-lowest text-secondary font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setSelectedStatus('under_review')}
            className={`px-4 py-1.5 rounded-full text-xs font-label transition-all ${
              selectedStatus === 'under_review'
                ? 'bg-surface-container-lowest text-secondary font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            In Review
          </button>
          <button
            onClick={() => setSelectedStatus('accepted')}
            className={`px-4 py-1.5 rounded-full text-xs font-label transition-all ${
              selectedStatus === 'accepted'
                ? 'bg-surface-container-lowest text-emerald-600 font-semibold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Accepted
          </button>
        </div>

        <div className="relative min-w-[260px]">
          <span className="material-symbols-outlined absolute left-3 top-2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            className="w-full pl-9 pr-4 py-1.5 rounded-full bg-surface-container-low text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary"
            placeholder="Search by creator or pitch keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Applications List */}
      <div className="flex flex-col gap-6">
        {filteredApps.map((app) => {
          const creator = MOCK_CREATORS.find(c => c.id === app.creator_id) || MOCK_CREATORS[0];

          return (
            <article
              key={app.id}
              className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-xs hover:shadow-md transition-all flex flex-col gap-5"
            >
              {/* Creator Info & Fee */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <Link to={`/creators/${creator.id}`} className="relative shrink-0">
                    <img
                      src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                      alt={creator.display_name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-outline-variant/30 hover:scale-105 transition-transform"
                    />
                    {creator.verified && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-secondary ring-2 ring-white flex items-center justify-center text-white text-[10px]">
                        ✓
                      </span>
                    )}
                  </Link>

                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/creators/${creator.id}`}
                        className="font-headline text-lg font-semibold text-on-surface hover:text-secondary transition-colors"
                      >
                        {creator.display_name}
                      </Link>
                      <span
                        className={`text-[10px] font-label font-semibold px-2.5 py-0.5 rounded-full uppercase ${
                          app.status === 'accepted'
                            ? 'bg-emerald-500/15 text-emerald-600'
                            : app.status === 'rejected'
                            ? 'bg-error/10 text-error'
                            : 'bg-secondary/10 text-secondary'
                        }`}
                      >
                        {app.status === 'under_review' ? 'In Review' : app.status}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-body">
                      {creator.headline} · {creator.location}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {creator.ai_tools?.slice(0, 3).map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-surface-container text-[10px] font-label text-on-surface-variant">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 lg:self-center">
                  <div className="text-right">
                    <span className="text-[10px] text-outline uppercase font-label block">Proposed Escrow Fee</span>
                    <span className="font-headline text-2xl font-bold text-on-surface">
                      ${(app.proposed_fee || app.proposed_rate || app.bid_amount || 4500).toLocaleString()} USD
                    </span>
                    <span className="text-[11px] text-secondary font-label block">
                      Turnaround: {app.estimated_timeline || (app.estimated_delivery_days ? `${app.estimated_delivery_days} Days` : '2 Weeks')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pitch Statement */}
              <div className="p-4 rounded-xl bg-surface-container-low text-xs text-on-surface leading-relaxed font-body">
                <span className="font-label font-semibold text-[10px] uppercase text-outline block mb-1">
                  Creator Treatment & Proposal
                </span>
                "{app.pitch || app.pitch_text || app.proposal}"
              </div>

              {/* Action Deck */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/creators/${creator.id}`}
                    className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-label font-medium transition-colors"
                  >
                    View Creator Portfolio
                  </Link>
                  <button
                    onClick={() => setActiveApp(app)}
                    className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-label font-medium transition-colors"
                  >
                    Inspect Full Treatment
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {app.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(app.id, 'rejected')}
                      className="px-4 py-2 rounded-full text-outline hover:text-error hover:bg-error-container text-xs font-label transition-colors"
                    >
                      Decline
                    </button>
                  )}
                  {app.status !== 'under_review' && app.status !== 'accepted' && (
                    <button
                      onClick={() => handleUpdateStatus(app.id, 'under_review')}
                      className="px-4 py-2 rounded-full bg-surface-container text-on-surface text-xs font-label hover:bg-surface-container-high transition-colors"
                    >
                      Mark In Review
                    </button>
                  )}
                  {app.status !== 'accepted' ? (
                    <button
                      onClick={() => handleUpdateStatus(app.id, 'accepted')}
                      className="px-5 py-2 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-semibold shadow-sm transition-all"
                    >
                      Accept & Deposit Escrow
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-600 text-xs font-label font-semibold">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Commissioned & Contracted
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Inspect Treatment Modal */}
      {activeApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/30 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="font-headline text-xl font-semibold text-on-surface">
                Application Detail Review
              </h3>
              <button
                onClick={() => setActiveApp(null)}
                className="p-1 rounded-full text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-outline font-label block uppercase">Creator Statement</span>
                <p className="text-sm font-body text-on-surface mt-1 leading-relaxed bg-surface-container-low p-4 rounded-xl">
                  {activeApp.pitch}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-xs text-outline block font-label">Milestone Fee</span>
                  <span className="text-base font-bold text-on-surface font-label">
                    ${activeApp.proposed_fee?.toLocaleString()} USD
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-xs text-outline block font-label">Timeline</span>
                  <span className="text-base font-semibold text-on-surface font-label">
                    {activeApp.estimated_timeline || '2 Weeks'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
              <button
                onClick={() => setActiveApp(null)}
                className="px-4 py-2 rounded-full text-xs font-label text-outline hover:text-on-surface"
              >
                Close
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleUpdateStatus(activeApp.id, 'accepted');
                    setActiveApp(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-semibold shadow-sm transition-all"
                >
                  Accept Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
