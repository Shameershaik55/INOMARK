import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_CREATORS, MOCK_BRIEFS } from '../../lib/mockData';

export default function SavedCreatorsPage() {
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Bookmarked IDs - initial mock set
  const [savedIds, setSavedIds] = useState<string[]>([
    'c-elena-vance',
    'c-kaelen-mori',
    'c-maya-lin',
    'c-mateo-vance',
    'c-anya-petrova',
    'c-devon-chen',
  ]);

  // Invite Modal
  const [invitingCreator, setInvitingCreator] = useState<any | null>(null);
  const [selectedBriefId, setSelectedBriefId] = useState<string>(MOCK_BRIEFS[0]?.id || '');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Remove bookmark
  const removeBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSavedIds(prev => prev.filter(item => item !== id));
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setInvitingCreator(null);
    }, 1500);
  };

  // Filtered Creators
  const savedCreators = useMemo(() => {
    return MOCK_CREATORS.filter(c => savedIds.includes(c.id)).filter(creator => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = creator.display_name.toLowerCase().includes(q);
        const matchesHeadline = creator.headline.toLowerCase().includes(q);
        const matchesTools = creator.ai_tools?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesHeadline && !matchesTools) return false;
      }

      if (activeFolder === 'directors') {
        return creator.specializations?.some(s => s.toLowerCase().includes('video') || s.toLowerCase().includes('director'));
      }
      if (activeFolder === 'product') {
        return creator.specializations?.some(s => s.toLowerCase().includes('packshot') || s.toLowerCase().includes('product') || s.toLowerCase().includes('botanical'));
      }
      if (activeFolder === 'spatial') {
        return creator.specializations?.some(s => s.toLowerCase().includes('3d') || s.toLowerCase().includes('spatial'));
      }

      return true;
    });
  }, [savedIds, searchQuery, activeFolder]);

  return (
    <div className="relative w-full px-6 lg:px-12 py-8 flex flex-col gap-8">
      {/* Ambient Mesh Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-[600px] h-[340px] bg-gradient-to-tr from-secondary/10 via-primary/10 to-transparent rounded-full blur-3xl -z-10" />

      {/* Breadcrumb & Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
          <Link to="/brand/dashboard" className="hover:text-primary transition-colors">
            Brand Workspace
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-on-surface font-semibold">Saved Creators</span>
        </nav>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 shadow-xs backdrop-blur-md">
          <span className="material-symbols-outlined text-[16px]">bookmark_added</span>
          <span className="font-label text-xs tracking-wider uppercase font-semibold">
            {savedIds.length} Bookmarked Creators
          </span>
        </div>
      </div>

      {/* Main Title Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-headline font-semibold text-on-surface tracking-tight leading-none mb-2">
            Saved Creators <span className="italic font-normal text-secondary font-serif">Curated Roster</span>
          </h1>
          <p className="text-on-surface-variant font-body text-base max-w-2xl">
            Compare portfolios, track availability, and directly dispatch enterprise brief invitations to your preferred creators.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/brand/creators"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface font-label text-sm border border-outline-variant/30 hover:border-secondary/50 shadow-xs hover:shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">explore</span>
            <span>Discover More</span>
          </Link>
          <Link
            to="/brand/briefs/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-sm font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Create Campaign Brief</span>
          </Link>
        </div>
      </div>

      {/* Collection Folders Tabs */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3 overflow-x-auto gap-2">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => setActiveFolder('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-label text-xs transition-all ${
              activeFolder === 'all'
                ? 'bg-secondary text-white shadow-xs font-semibold'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>All Saved</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">
              {savedIds.length}
            </span>
          </button>
          <button
            onClick={() => setActiveFolder('directors')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-label text-xs transition-all ${
              activeFolder === 'directors'
                ? 'bg-secondary text-white shadow-xs font-semibold'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>Commercial Directors</span>
          </button>
          <button
            onClick={() => setActiveFolder('product')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-label text-xs transition-all ${
              activeFolder === 'product'
                ? 'bg-secondary text-white shadow-xs font-semibold'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>Macro Product & CPG</span>
          </button>
          <button
            onClick={() => setActiveFolder('spatial')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-label text-xs transition-all ${
              activeFolder === 'spatial'
                ? 'bg-secondary text-white shadow-xs font-semibold'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>3D Motion & Spatial</span>
          </button>
        </div>
      </div>

      {/* Search & Dynamic Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-3 rounded-2xl border border-outline-variant/20 shadow-xs">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low text-on-surface placeholder:text-outline text-xs rounded-full focus:outline-none focus:ring-1 focus:ring-secondary"
            placeholder="Filter saved by name or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-outline font-label">
            Showing {savedCreators.length} of {savedIds.length}
          </span>
          <div className="flex items-center bg-surface-container-low rounded-full p-1 border border-outline-variant/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-surface-container-lowest text-secondary shadow-xs' : 'text-outline hover:text-on-surface'
              }`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'table' ? 'bg-surface-container-lowest text-secondary shadow-xs' : 'text-outline hover:text-on-surface'
              }`}
              title="Table View"
            >
              <span className="material-symbols-outlined text-[16px]">view_agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Table */}
      {savedCreators.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/20 shadow-xs flex flex-col items-center justify-center my-6">
          <div className="w-16 h-16 rounded-full bg-surface-container-high text-secondary flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px]">bookmark_border</span>
          </div>
          <h3 className="font-headline text-lg font-semibold text-on-surface">No saved creators found</h3>
          <p className="text-on-surface-variant font-body text-xs mt-1 max-w-md">
            Explore our vetted creator roster to bookmark directors and neural artists for your upcoming campaigns.
          </p>
          <Link
            to="/brand/creators"
            className="mt-6 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label text-xs shadow-xs hover:bg-primary/90 transition-all"
          >
            Discover Creators
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCreators.map((creator) => (
            <article
              key={creator.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 p-5 border border-outline-variant/20"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-label text-[10px] tracking-wider uppercase font-semibold">
                    <span className="material-symbols-outlined text-[12px]">stars</span>
                    Curated Pick
                  </span>
                  <button
                    onClick={(e) => removeBookmark(creator.id, e)}
                    className="p-1.5 rounded-full text-secondary hover:bg-error-container hover:text-on-error-container transition-colors"
                    title="Remove from saved"
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-1 ring-outline-variant/30">
                    <img
                      src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                      alt={creator.display_name}
                      className="w-full h-full object-cover"
                    />
                    {creator.verified && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary ring-1 ring-white" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/creators/${creator.id}`}
                        className="font-headline text-base font-semibold text-on-surface hover:text-secondary truncate"
                      >
                        {creator.display_name}
                      </Link>
                      {creator.verified && (
                        <span
                          className="material-symbols-outlined text-secondary text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant truncate font-body">
                      {creator.location}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-secondary font-semibold font-label">
                      <span className="text-amber-400">★</span>
                      <span>{creator.rating?.toFixed(1) || '4.9'}</span>
                      <span className="text-outline font-normal">
                        ({creator.reviews_count || 32} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-semibold text-on-surface mb-2 font-headline line-clamp-1">
                  {creator.headline}
                </p>

                {/* Media Preview */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-surface-container-high">
                  <img
                    src={creator.avatar_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'}
                    alt={creator.display_name}
                    className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white flex items-center justify-between text-xs">
                    <span className="font-label truncate">
                      {creator.specializations?.[0] || 'AI Visual Reel'}
                    </span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-label">
                      4K
                    </span>
                  </div>
                </div>

                {/* Neural Stack Chips */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {creator.ai_tools?.slice(0, 3).map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-label"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-outline uppercase block font-label">Floor</span>
                  <span className="text-sm font-bold text-on-surface font-label">$2,500</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/creators/${creator.id}`}
                    className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                    title="View Profile"
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </Link>
                  <button
                    onClick={() => setInvitingCreator(creator)}
                    className="px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label text-xs font-medium shadow-xs transition-all flex items-center gap-1"
                  >
                    <span>Invite</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-surface-container-low text-on-surface-variant font-label border-b border-outline-variant/20">
                <tr>
                  <th className="py-3 px-4 font-semibold">Creator</th>
                  <th className="py-3 px-4 font-semibold">Specialization</th>
                  <th className="py-3 px-4 font-semibold">AI Tools</th>
                  <th className="py-3 px-4 font-semibold">Rating</th>
                  <th className="py-3 px-4 font-semibold">Budget Floor</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                {savedCreators.map((creator) => (
                  <tr key={creator.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                          alt={creator.display_name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-outline-variant/20"
                        />
                        <div>
                          <Link
                            to={`/creators/${creator.id}`}
                            className="font-semibold text-on-surface hover:text-secondary block font-headline"
                          >
                            {creator.display_name}
                          </Link>
                          <span className="text-[11px] text-outline">{creator.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {creator.headline}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {creator.ai_tools?.slice(0, 2).map((tool, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full bg-surface-container text-[10px] font-label"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      <span className="text-amber-400">★</span> {creator.rating?.toFixed(1) || '5.0'}
                    </td>
                    <td className="py-3 px-4 font-semibold">From $2,500</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setInvitingCreator(creator)}
                          className="px-3 py-1 rounded-full bg-primary text-on-primary font-label text-[11px] shadow-xs hover:bg-primary/90"
                        >
                          Invite
                        </button>
                        <Link
                          to={`/creators/${creator.id}`}
                          className="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high font-label text-[11px]"
                        >
                          View
                        </Link>
                        <button
                          onClick={(e) => removeBookmark(creator.id, e)}
                          className="p-1 rounded-full text-outline hover:text-error"
                          title="Remove bookmark"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {invitingCreator && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/30 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={invitingCreator.avatar_url}
                  alt={invitingCreator.display_name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant/30"
                />
                <div>
                  <h3 className="font-headline font-semibold text-on-surface text-base">
                    Invite {invitingCreator.display_name}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Send a direct campaign brief invitation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInvitingCreator(null)}
                className="p-1 rounded-full hover:bg-surface-container text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {inviteSuccess ? (
              <div className="py-8 text-center space-y-2">
                <span className="material-symbols-outlined text-[48px] text-emerald-500">check_circle</span>
                <h4 className="font-headline text-lg font-semibold text-on-surface">Invitation Dispatched!</h4>
                <p className="text-xs text-on-surface-variant">
                  {invitingCreator.display_name} has received your brief notification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-label font-medium text-on-surface mb-1">
                    Select Campaign Brief
                  </label>
                  <select
                    value={selectedBriefId}
                    onChange={(e) => setSelectedBriefId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                  >
                    {MOCK_BRIEFS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title} (${b.budget_min?.toLocaleString()} – ${b.budget_max?.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label font-medium text-on-surface mb-1">
                    Personalized Message
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={`Hello ${invitingCreator.display_name}, we've saved your profile and would love to collaborate on our upcoming campaign.`}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setInvitingCreator(null)}
                    className="px-4 py-2 rounded-full text-xs font-label text-outline hover:text-on-surface"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-medium shadow-sm transition-all"
                  >
                    Dispatch Invitation
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
