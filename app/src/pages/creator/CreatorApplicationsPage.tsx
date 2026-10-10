import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_APPLICATIONS, MOCK_BRIEFS, MOCK_BRANDS } from '../../lib/mockData';

export default function CreatorApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'review' | 'accepted' | 'declined'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [withdrawingAppId, setWithdrawingAppId] = useState<string | null>(null);
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      if (statusFilter !== 'all' && app.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const brief = MOCK_BRIEFS.find(b => b.id === app.brief_id);
        const matchTitle = brief?.title.toLowerCase().includes(q);
        const pitchText = app.pitch_text || app.proposal || app.pitch || '';
        const matchPitch = pitchText.toLowerCase().includes(q);
        if (!matchTitle && !matchPitch) return false;
      }
      return true;
    });
  }, [applications, statusFilter, searchQuery]);

  const confirmWithdraw = (appId: string) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
    setWithdrawingAppId(null);
    if (selectedApplication?.id === appId) {
      setSelectedApplication(null);
    }
  };

  return (
    <div className="relative w-full overflow-hidden px-6 lg:px-12 py-8 flex flex-col gap-8">
      {/* Editorial Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-caption text-xs text-on-surface-variant uppercase tracking-widest">
            <Link to="/creator/dashboard" className="hover:text-primary transition-colors">Creator Portal</Link>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-secondary font-semibold">My Applications</span>
          </nav>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            My <span className="italic font-normal text-secondary">Applications</span>
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
            Track your submitted brief proposals, inspect brand review feedback, and manage active milestone contracts in real time.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto">
          <Link
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-white shadow-xs hover:shadow-md font-label-button text-xs font-semibold transition-all group"
            to="/creator/briefs"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Browse Brand Briefs</span>
          </Link>
        </div>
      </header>

      {/* Application Summary Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-primary-fixed/30 border-primary ring-2 ring-primary/20 shadow-xs'
              : 'bg-surface-container-lowest border-surface-container/60 hover:bg-surface-container-low'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-label-badge text-xs uppercase tracking-wider text-on-surface-variant font-semibold">All Applications</span>
            <span className="material-symbols-outlined text-outline text-[18px]">layers</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-md text-headline-md font-bold text-on-surface">{applications.length}</span>
            <span className="font-label-caption text-xs text-on-surface-variant">total</span>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('submitted')}
          className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
            statusFilter === 'submitted'
              ? 'bg-secondary-fixed/30 border-secondary ring-2 ring-secondary/20 shadow-xs'
              : 'bg-surface-container-lowest border-surface-container/60 hover:bg-surface-container-low'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-label-badge text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Submitted</span>
            <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-md text-headline-md font-bold text-on-surface">
              {applications.filter(a => a.status === 'submitted' || a.status === 'new').length}
            </span>
            <span className="font-label-caption text-xs text-on-surface-variant">queued</span>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('accepted')}
          className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
            statusFilter === 'accepted'
              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
              : 'bg-surface-container-lowest border-surface-container/60 hover:bg-surface-container-low'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-label-badge text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Accepted / Escrow</span>
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-md text-headline-md font-bold text-emerald-700">
              {applications.filter(a => a.status === 'accepted').length}
            </span>
            <span className="font-label-caption text-xs text-emerald-600 font-semibold">$4.5k Funded</span>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter('review')}
          className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
            statusFilter === 'review'
              ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
              : 'bg-surface-container-lowest border-surface-container/60 hover:bg-surface-container-low'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-label-badge text-xs uppercase tracking-wider text-on-surface-variant font-semibold">Under Review</span>
            <span className="material-symbols-outlined text-amber-600 text-[18px]">visibility</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-md text-headline-md font-bold text-amber-700">
              {applications.filter(a => a.status === 'review' || a.status === 'in_review' || a.status === 'under_review').length}
            </span>
            <span className="font-label-caption text-xs text-amber-600">active</span>
          </div>
        </button>
      </section>

      {/* Search Input Bar */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container/60 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            className="w-full pl-12 pr-4 py-2 rounded-full bg-surface-container-low text-on-surface font-body-sm text-xs placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all border border-surface-container"
            placeholder="Search submitted proposals by brief name or keywords..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-primary font-semibold hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Applications Feed */}
      <div className="flex flex-col gap-6">
        {filteredApps.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-surface-container flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">inbox</span>
            <h3 className="font-headline-sm text-on-surface font-semibold">No applications found</h3>
            <p className="font-body-sm text-on-surface-variant">
              You haven't submitted any proposals matching this view.
            </p>
            <Link
              to="/creator/briefs"
              className="px-6 py-2 rounded-full bg-primary text-white font-label-button text-xs font-semibold mt-2"
            >
              Explore Brand Briefs
            </Link>
          </div>
        ) : (
          filteredApps.map((app) => {
            const brief = MOCK_BRIEFS.find(b => b.id === app.brief_id) || MOCK_BRIEFS[0];
            const brand = MOCK_BRANDS.find(b => b.id === brief.brand_id) || MOCK_BRANDS[0];

            return (
              <article
                key={app.id}
                className="p-6 lg:p-8 rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col gap-6 border border-surface-container/60"
              >
                {/* Status Banner */}
                {app.status === 'accepted' ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-emerald-600 text-[24px]">verified</span>
                      <div className="flex flex-col">
                        <span className="font-label-badge text-xs text-emerald-900 font-bold uppercase tracking-wider">
                          Milestone Funded & Escrow Activated
                        </span>
                        <p className="font-body-sm text-xs text-emerald-900/90">
                          Your proposal was selected. The client funded the <strong className="font-semibold text-emerald-950">${(app.bid_amount || app.proposed_rate || 4500).toLocaleString()} USD</strong> escrow milestone.
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/creator/briefs/${brief.id}`}
                      className="whitespace-nowrap px-4 py-1.5 rounded-full bg-emerald-600 text-white font-label-caption text-xs font-semibold shadow-xs hover:bg-emerald-700 transition-colors"
                    >
                      View Milestone Agreement →
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-[24px] animate-pulse">visibility</span>
                      <div className="flex flex-col">
                        <span className="font-label-badge text-xs text-secondary font-bold uppercase tracking-wider">
                          Active Inbound Creative Review
                        </span>
                        <p className="font-body-sm text-xs text-on-surface">
                          Brand creative director viewed your proposal. Awaiting final shortlist decision.
                        </p>
                      </div>
                    </div>
                    <span className="font-label-caption text-xs font-semibold text-secondary px-3 py-1 rounded-full bg-secondary-fixed/50">
                      Awaiting Final Decision
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Media Preview Thumbnail */}
                  <div className="lg:col-span-4 relative rounded-xl overflow-hidden aspect-[16/10] bg-surface-container-high border border-surface-container">
                    <img
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                      alt={brief.title}
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-caption text-xs font-semibold text-on-surface shadow-xs">
                        {brief.aspect_ratio || '16:9 4K'}
                      </span>
                    </div>
                  </div>

                  {/* Main Application Content & Metadata */}
                  <div className="lg:col-span-8 flex flex-col justify-between h-full gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/brands/${brand.id}`}
                            className="font-label-badge text-xs uppercase tracking-wider text-secondary font-semibold hover:underline"
                          >
                            {brand.company_name}
                          </Link>
                          <span className="text-outline text-xs">•</span>
                          <span className="font-label-caption text-xs text-on-surface-variant">{brief.industry}</span>
                        </div>

                        <span className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full font-label-badge text-xs font-bold uppercase tracking-wider ${
                          app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-secondary-fixed text-on-secondary-fixed'
                        }`}>
                          {app.status === 'accepted' ? 'Accepted' : 'Under Review'}
                        </span>
                      </div>

                      <h2 className="font-headline-md text-headline-sm font-bold text-on-surface tracking-tight">
                        <Link to={`/creator/briefs/${brief.id}`} className="hover:text-primary transition-colors">
                          {brief.title}
                        </Link>
                      </h2>
                    </div>

                    {/* Proposal Snippet */}
                    <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-1.5">
                      <span className="font-label-caption text-xs text-secondary font-semibold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">draw</span>
                        Your Submitted Proposal
                      </span>
                      <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                        "{app.pitch_text || app.proposal || app.pitch}"
                      </p>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-surface-container/60">
                      <div className="grid grid-cols-3 gap-4 text-left">
                        <div>
                          <span className="block font-label-caption text-xs text-outline">Submitted</span>
                          <span className="font-body-sm text-xs font-semibold text-on-surface">
                            {new Date(app.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="block font-label-caption text-xs text-outline">Proposed Fee</span>
                          <span className="font-body-sm text-xs font-bold text-secondary">
                            ${(app.bid_amount || app.proposed_rate || 4500).toLocaleString()} USD
                          </span>
                        </div>
                        <div>
                          <span className="block font-label-caption text-xs text-outline">Deadline</span>
                          <span className="font-body-sm text-xs font-semibold text-on-surface">
                            {brief.deadline ? new Date(brief.deadline).toLocaleDateString() : 'Flexible'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-button text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => setWithdrawingAppId(app.id)}
                          className="px-3 py-2 rounded-full bg-surface-container-low hover:bg-error-container hover:text-on-error-container text-on-surface-variant font-label-button text-xs transition-colors cursor-pointer"
                          title="Withdraw proposal"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-surface-container flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Proposal Inspection</h3>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <span className="font-label-caption text-xs uppercase text-on-surface-variant font-semibold">Campaign Brief</span>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface mt-0.5">
                  {MOCK_BRIEFS.find(b => b.id === selectedApplication.brief_id)?.title}
                </h4>
              </div>

              <div>
                <span className="font-label-caption text-xs uppercase text-on-surface-variant font-semibold">Your Full Treatment</span>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mt-1 p-3 rounded-xl bg-surface-container-low border border-surface-container">
                  {selectedApplication.pitch_text || selectedApplication.proposal || selectedApplication.pitch}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                  <span className="font-label-caption text-xs text-on-surface-variant font-semibold">Proposed Bid</span>
                  <div className="font-headline-sm text-sm font-bold text-secondary mt-0.5">
                    ${(selectedApplication.bid_amount || selectedApplication.proposed_rate || 4500).toLocaleString()} USD
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                  <span className="font-label-caption text-xs text-on-surface-variant font-semibold">Current Status</span>
                  <div className="font-headline-sm text-sm font-bold capitalize mt-0.5 text-primary">
                    {selectedApplication.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-5 py-2 rounded-full font-label-button text-xs bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Confirmation Modal */}
      {withdrawingAppId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-surface-container flex flex-col gap-4">
            <div className="flex items-center gap-3 text-error">
              <span className="material-symbols-outlined text-3xl">warning</span>
              <h3 className="font-headline-sm text-on-surface font-bold">Withdraw Application?</h3>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Are you sure you want to withdraw this application? The commissioning brand will be notified and your proposed treatment will be retracted.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
              <button
                onClick={() => setWithdrawingAppId(null)}
                className="px-4 py-2 rounded-full font-label-button text-xs text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmWithdraw(withdrawingAppId)}
                className="px-5 py-2 rounded-full font-label-button text-xs bg-error text-white font-semibold shadow-xs hover:shadow"
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
