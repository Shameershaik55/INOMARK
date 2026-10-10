import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_BRIEFS, MOCK_APPLICATIONS } from '../../lib/mockData';

export default function BrandBriefsPage() {
  const navigate = useNavigate();

  // Filters
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'budget' | 'deadline'>('updated');

  // Preview brief drawer/modal
  const [previewBrief, setPreviewBrief] = useState<any | null>(null);

  // Status counts
  const publishedCount = MOCK_BRIEFS.filter(b => b.status === 'open' || b.status === 'review').length;
  const draftCount = MOCK_BRIEFS.filter(b => b.status === 'draft').length;
  const closedCount = MOCK_BRIEFS.filter(b => b.status === 'closed' || b.status === 'completed').length;

  const filteredBriefs = useMemo(() => {
    return MOCK_BRIEFS.filter(b => {
      // Status filter
      if (activeStatus === 'published' && b.status !== 'open' && b.status !== 'review') return false;
      if (activeStatus === 'draft' && b.status !== 'draft') return false;
      if (activeStatus === 'closed' && b.status !== 'closed' && b.status !== 'completed') return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = b.title.toLowerCase().includes(q);
        const matchesDesc = b.description.toLowerCase().includes(q);
        const matchesDeliv = b.deliverables?.some(d => {
          const text = typeof d === 'string' ? d : `${d.title || ''} ${d.description || ''}`;
          return text.toLowerCase().includes(q);
        });
        if (!matchesTitle && !matchesDesc && !matchesDeliv) return false;
      }

      // Discipline
      if (selectedDiscipline !== 'all') {
        const matches = b.deliverables?.some(d => {
          const text = typeof d === 'string' ? d : `${d.title || ''} ${d.description || ''}`;
          return text.toLowerCase().includes(selectedDiscipline.toLowerCase());
        }) || b.title.toLowerCase().includes(selectedDiscipline.toLowerCase());
        if (!matches) return false;
      }

      // Industry
      if (selectedIndustry !== 'all') {
        const ind = (b.industry || b.category || '').toLowerCase();
        if (!ind.includes(selectedIndustry.toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'budget') return (b.budget_max || 0) - (a.budget_max || 0);
      return 0;
    });
  }, [activeStatus, searchQuery, selectedDiscipline, selectedIndustry, sortBy]);

  return (
    <div className="relative w-full px-6 lg:px-12 py-8 flex flex-col gap-8">
      {/* Ambient Aura Background Glow */}
      <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-label uppercase tracking-widest font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Campaigns & Briefs • Brand Studio
          </span>
          <h1 className="text-3xl lg:text-4xl font-headline font-semibold text-on-surface tracking-tight mt-1">
            My Briefs <span className="italic font-normal text-secondary font-serif">&</span> Campaigns
          </h1>
          <p className="text-on-surface-variant font-body text-base max-w-2xl mt-1">
            Commission world-class AI creators, manage generative production milestones, and review applicant treatments in real time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/brand/briefs/create"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label text-sm font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>+ Create New Brief</span>
          </Link>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label text-xs uppercase tracking-wider text-outline">All Briefs</span>
            <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">layers</span>
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline text-3xl font-semibold text-on-surface">{MOCK_BRIEFS.length}</span>
            <span className="text-xs text-on-surface-variant font-body">Total created</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label text-xs uppercase tracking-wider text-secondary">Published</span>
            <span className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">campaign</span>
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline text-3xl font-semibold text-secondary">{publishedCount}</span>
            <span className="text-xs text-secondary font-body">Active & receiving pitches</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label text-xs uppercase tracking-wider text-outline">Drafts</span>
            <span className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline">
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline text-3xl font-semibold text-on-surface">{draftCount}</span>
            <span className="text-xs text-on-surface-variant font-body">Pending publication</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label text-xs uppercase tracking-wider text-outline">Total Applicants</span>
            <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-headline text-3xl font-semibold text-on-surface">{MOCK_APPLICATIONS.length}</span>
            <span className="text-xs text-on-surface-variant font-body">Vetted creator treatments</span>
          </div>
        </div>
      </section>

      {/* Toolbar & Filters */}
      <section className="flex flex-col gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center p-1 bg-surface-container-low rounded-full gap-1">
            <button
              onClick={() => setActiveStatus('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-label transition-all ${
                activeStatus === 'all'
                  ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All ({MOCK_BRIEFS.length})
            </button>
            <button
              onClick={() => setActiveStatus('published')}
              className={`px-4 py-1.5 rounded-full text-xs font-label transition-all ${
                activeStatus === 'published'
                  ? 'bg-surface-container-lowest text-secondary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setActiveStatus('draft')}
              className={`px-4 py-1.5 rounded-full text-xs font-label transition-all ${
                activeStatus === 'draft'
                  ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Drafts ({draftCount})
            </button>
            <button
              onClick={() => setActiveStatus('closed')}
              className={`px-4 py-1.5 rounded-full text-xs font-label transition-all ${
                activeStatus === 'closed'
                  ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Closed ({closedCount})
            </button>
          </div>

          <span className="text-xs text-outline font-label">
            Showing {filteredBriefs.length} briefs
          </span>
        </div>

        {/* Filter & Search controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 items-center">
          <div className="relative md:col-span-5">
            <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-container-low text-on-surface text-xs placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary"
              placeholder="Search briefs by title or deliverables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer"
            >
              <option value="all">All Disciplines</option>
              <option value="video">AI Video</option>
              <option value="3d">3D & Packshots</option>
              <option value="fashion">Fashion & Couture</option>
              <option value="stills">Commercial Stills</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer"
            >
              <option value="all">All Industries</option>
              <option value="Beauty">Beauty & Skincare</option>
              <option value="Luxury">Luxury Fashion</option>
              <option value="Cosmetics">Cosmetics</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 rounded-full bg-surface-container-low text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer"
            >
              <option value="updated">Recent</option>
              <option value="budget">Highest Budget</option>
            </select>
          </div>
        </div>
      </section>

      {/* Brief Cards List */}
      <section className="flex flex-col gap-6">
        {filteredBriefs.map((brief) => {
          const appCount = MOCK_APPLICATIONS.filter(a => a.brief_id === brief.id).length || 5;

          return (
            <article
              key={brief.id}
              className="group relative p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
                {/* Left Info */}
                <div className="flex flex-col gap-3 max-w-3xl flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-label font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      {brief.status === 'open' ? 'Active • Accepting Applications' : brief.status}
                    </span>
                    <span className="text-outline text-xs">•</span>
                    <span className="text-xs font-label text-on-surface-variant">
                      {brief.industry || brief.category || 'Campaign'}
                    </span>
                    <span className="text-outline text-xs">•</span>
                    <span className="text-xs font-label text-outline">
                      Deadline: {brief.timeline || 'Rolling submission'}
                    </span>
                  </div>

                  <div>
                    <h2
                      onClick={() => setPreviewBrief(brief)}
                      className="font-headline text-xl font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                    >
                      {brief.title}
                    </h2>
                    <p className="font-body text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                      {brief.description}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {brief.deliverables?.slice(0, 3).map((d, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface text-[11px] font-label"
                      >
                        {typeof d === 'string' ? d : d.title || d.description || 'Deliverable'}
                      </span>
                    ))}
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[11px] font-label font-semibold">
                      Budget: ${brief.budget_min?.toLocaleString()} – ${brief.budget_max?.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                {/* Right Applications & Preview */}
                <div className="flex flex-col lg:items-end justify-between self-stretch gap-4 shrink-0">
                  <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full">
                    <span className="material-symbols-outlined text-[18px] text-secondary">group</span>
                    <span className="text-xs font-label text-secondary font-semibold">
                      {appCount} Creator Applications
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Deck */}
              <div className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-outline-variant/10">
                <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                  <span>Inomark Milestone Escrow Guarantee Protected</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewBrief(brief)}
                    className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-label font-medium transition-colors border border-outline-variant/30"
                  >
                    Inspect Brief Details
                  </button>
                  <Link
                    to={`/brand/briefs/${brief.id}/applications`}
                    className="px-5 py-2 rounded-full bg-secondary hover:bg-secondary/90 text-white text-xs font-label font-semibold shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                    <span>Review Applications ({appCount})</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Brief Details Inspection Modal */}
      {previewBrief && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/30 space-y-6 max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-label font-semibold uppercase">
                  {previewBrief.category}
                </span>
                <h2 className="font-headline text-2xl font-semibold text-on-surface mt-2">
                  {previewBrief.title}
                </h2>
              </div>
              <button
                onClick={() => setPreviewBrief(null)}
                className="p-1.5 rounded-full hover:bg-surface-container text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div>
              <h3 className="text-xs font-label uppercase tracking-wider text-outline mb-1">Creative Synopsis</h3>
              <p className="text-sm font-body text-on-surface-variant leading-relaxed">
                {previewBrief.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-surface-container-low">
              <div>
                <span className="text-xs text-outline block font-label">Allocated Budget</span>
                <span className="text-sm font-bold text-on-surface font-label">
                  ${previewBrief.budget_min?.toLocaleString()} – ${previewBrief.budget_max?.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-outline block font-label">Delivery Timeline</span>
                <span className="text-sm font-semibold text-on-surface font-label">
                  {previewBrief.timeline || 'Q4 Campaign'}
                </span>
              </div>
              <div>
                <span className="text-xs text-outline block font-label">Escrow Status</span>
                <span className="text-sm font-semibold text-emerald-600 font-label flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> Verified
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-label uppercase tracking-wider text-outline mb-2">Required Deliverables</h3>
              <div className="flex flex-wrap gap-2">
                {previewBrief.deliverables?.map((deliv: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-surface-container text-xs font-label text-on-surface"
                  >
                    ✓ {deliv}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
              <Link
                to={`/brand/briefs/${previewBrief.id}/applications`}
                className="text-xs font-label text-secondary hover:underline flex items-center gap-1"
              >
                <span>View Received Applications</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPreviewBrief(null)}
                  className="px-4 py-2 rounded-full text-xs font-label text-outline hover:text-on-surface"
                >
                  Close
                </button>
                <Link
                  to={`/brand/briefs/${previewBrief.id}/applications`}
                  className="px-6 py-2.5 rounded-full bg-secondary hover:bg-secondary/90 text-white text-xs font-label font-semibold shadow-xs"
                >
                  Review Candidate Proposals
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
