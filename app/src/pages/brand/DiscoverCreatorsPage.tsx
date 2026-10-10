import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_CREATORS, MOCK_BRIEFS } from '../../lib/mockData';

export default function DiscoverCreatorsPage() {
  const navigate = useNavigate();

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'briefs' | 'name'>('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Interactive Bookmarks
  const [savedCreatorIds, setSavedCreatorIds] = useState<Set<string>>(
    new Set(['c-elena-vance', 'c-kaelen-mori', 'c-maya-lin'])
  );

  // Invite Modal
  const [invitingCreator, setInvitingCreator] = useState<any | null>(null);
  const [selectedBriefId, setSelectedBriefId] = useState<string>(MOCK_BRIEFS[0]?.id || '');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Advanced Filters Drawer
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [commercialOnly, setCommercialOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSavedCreatorIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setInvitingCreator(null);
    }, 1500);
  };

  // Filter logic
  const filteredCreators = useMemo(() => {
    return MOCK_CREATORS.filter(creator => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = creator.display_name.toLowerCase().includes(q);
        const matchesHeadline = creator.headline.toLowerCase().includes(q);
        const matchesBio = creator.bio.toLowerCase().includes(q);
        const matchesTools = creator.ai_tools?.some(t => t.toLowerCase().includes(q));
        const matchesSpec = creator.specializations?.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesHeadline && !matchesBio && !matchesTools && !matchesSpec) {
          return false;
        }
      }

      if (selectedSpecialization !== 'all') {
        const matches = creator.specializations?.some(s => 
          s.toLowerCase().includes(selectedSpecialization.toLowerCase())
        );
        if (!matches) return false;
      }

      if (selectedTool !== 'all') {
        const matches = creator.ai_tools?.some(t => 
          t.toLowerCase().includes(selectedTool.toLowerCase())
        );
        if (!matches) return false;
      }

      if (selectedIndustry !== 'all') {
        const matches = creator.industries?.some(ind => 
          ind.toLowerCase().includes(selectedIndustry.toLowerCase())
        );
        if (!matches) return false;
      }

      if (verifiedOnly && !creator.verified) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'briefs') return (b.completed_briefs || 0) - (a.completed_briefs || 0);
      if (sortBy === 'name') return a.display_name.localeCompare(b.display_name);
      return 0; // Default match
    });
  }, [searchQuery, selectedSpecialization, selectedTool, selectedIndustry, verifiedOnly, sortBy]);

  const activeChipsCount = 
    (selectedSpecialization !== 'all' ? 1 : 0) + 
    (selectedTool !== 'all' ? 1 : 0) + 
    (selectedIndustry !== 'all' ? 1 : 0) +
    (verifiedOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedSpecialization('all');
    setSelectedTool('all');
    setSelectedIndustry('all');
    setVerifiedOnly(false);
    setCommercialOnly(false);
  };

  return (
    <div className="relative w-full px-6 lg:px-12 py-8 flex flex-col gap-8">
      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-72 right-10 w-[420px] h-[420px] bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-headline font-semibold text-on-surface tracking-tight">
            Discover <span className="italic font-normal text-secondary">Creators</span>
          </h1>
          <p className="text-on-surface-variant font-body text-base mt-1">
            Curated neural visual directors, procedural 3D packshot artists, and generative filmmakers.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/brand/saved"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface font-label text-sm border border-outline-variant/30 hover:border-secondary/50 shadow-xs hover:shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">bookmark</span>
            <span>Saved Creators ({savedCreatorIds.size})</span>
          </Link>
          <Link
            to="/brand/briefs/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-sm font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Post a Brief</span>
          </Link>
        </div>
      </div>

      {/* Wide Search Bar */}
      <div className="relative w-full">
        <div className="w-full bg-surface-container-lowest rounded-full p-2.5 shadow-sm border border-outline-variant/30 flex items-center gap-3 px-5 focus-within:ring-2 focus-within:ring-secondary/30 transition-all">
          <span className="material-symbols-outlined text-secondary text-[22px]">search</span>
          <input
            type="text"
            className="w-full bg-transparent text-on-surface placeholder:text-outline text-base focus:outline-none"
            placeholder="Search by creator name, visual style, AI tools (Runway, FLUX, ComfyUI), or niche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors"
              title="Clear Search"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {/* Specialization Filter */}
          <div className="relative shrink-0">
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="appearance-none inline-flex items-center gap-1.5 pl-4 pr-8 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-label text-xs hover:bg-surface-container-low transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary"
            >
              <option value="all">Specialization: All</option>
              <option value="Beauty">Beauty & Botanical</option>
              <option value="Fashion">Fashion & Couture</option>
              <option value="Packshot">Product Packshots</option>
              <option value="Spatial">Spatial & 3D</option>
              <option value="Commercial">Commercial Video</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-[16px] pointer-events-none">expand_more</span>
          </div>

          {/* AI Tools Filter */}
          <div className="relative shrink-0">
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="appearance-none inline-flex items-center gap-1.5 pl-4 pr-8 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-label text-xs hover:bg-surface-container-low transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary"
            >
              <option value="all">AI Tool: All</option>
              <option value="Runway">Runway Gen-3</option>
              <option value="FLUX">FLUX.1 Dev/Pro</option>
              <option value="Kling">Kling 1.5</option>
              <option value="ComfyUI">ComfyUI</option>
              <option value="Midjourney">Midjourney v6.1</option>
              <option value="Unreal">Unreal Engine 5</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-[16px] pointer-events-none">expand_more</span>
          </div>

          {/* Industry Filter */}
          <div className="relative shrink-0">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="appearance-none inline-flex items-center gap-1.5 pl-4 pr-8 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-label text-xs hover:bg-surface-container-low transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary"
            >
              <option value="all">Industry: All</option>
              <option value="Clean Beauty">Clean Beauty</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Luxury">Sustainable Luxury</option>
              <option value="Automotive">Automotive</option>
              <option value="Architectural">Architectural Design</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-[16px] pointer-events-none">expand_more</span>
          </div>

          <button
            onClick={() => setShowAdvancedFilters(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-label text-xs hover:bg-secondary/20 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>More Filters</span>
          </button>
        </div>

        {/* Sort and View Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-outline font-label">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-surface-container-lowest pl-3 pr-8 py-1.5 rounded-full text-xs font-label text-on-surface border border-outline-variant/30 focus:outline-none cursor-pointer"
              >
                <option value="match">Highest Match</option>
                <option value="rating">Top Rated (★)</option>
                <option value="briefs">Most Briefs Completed</option>
                <option value="name">Name A–Z</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2 text-outline text-[14px] pointer-events-none">expand_more</span>
            </div>
          </div>

          <div className="flex items-center bg-surface-container-low rounded-full p-1 border border-outline-variant/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-surface-container-lowest text-secondary shadow-xs' : 'text-outline hover:text-on-surface'}`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full transition-colors ${viewMode === 'list' ? 'bg-surface-container-lowest text-secondary shadow-xs' : 'text-outline hover:text-on-surface'}`}
              title="List View"
            >
              <span className="material-symbols-outlined text-[18px]">view_agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-2 px-4 rounded-xl bg-surface-container-lowest/70 border border-outline-variant/20 text-xs text-on-surface-variant">
        <div className="flex items-center flex-wrap gap-2">
          <span className="font-medium text-on-surface">
            {filteredCreators.length} verified creators available
          </span>
          {activeChipsCount > 0 && (
            <>
              <span className="text-outline">·</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-label">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-primary">✕</button>
                </span>
              )}
              {selectedSpecialization !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-label">
                  Spec: {selectedSpecialization}
                  <button onClick={() => setSelectedSpecialization('all')} className="hover:text-primary">✕</button>
                </span>
              )}
              {selectedTool !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-label">
                  Tool: {selectedTool}
                  <button onClick={() => setSelectedTool('all')} className="hover:text-primary">✕</button>
                </span>
              )}
              {selectedIndustry !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-label">
                  Industry: {selectedIndustry}
                  <button onClick={() => setSelectedIndustry('all')} className="hover:text-primary">✕</button>
                </span>
              )}
              {verifiedOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-secondary font-label">
                  Verified Only
                  <button onClick={() => setVerifiedOnly(false)} className="hover:text-primary">✕</button>
                </span>
              )}
              <button
                onClick={resetAllFilters}
                className="text-secondary hover:underline font-label font-medium ml-1"
              >
                Clear all filters
              </button>
            </>
          )}
        </div>
      </div>

      {/* Creators Gallery */}
      {filteredCreators.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30 shadow-sm flex flex-col items-center justify-center my-6">
          <div className="w-16 h-16 rounded-full bg-surface-container-high text-secondary flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px]">person_search</span>
          </div>
          <h3 className="font-headline text-xl font-semibold text-on-surface">No creators match your filters</h3>
          <p className="text-on-surface-variant font-body text-sm mt-1 max-w-md">
            Try adjusting your search query, or clear some filters to discover more talent across our AI creator roster.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-6 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label text-sm shadow-sm hover:bg-primary/90 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => {
            const isSaved = savedCreatorIds.has(creator.id);
            return (
              <article
                key={creator.id}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between"
              >
                {/* Media banner / preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-high">
                  <img
                    src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                    alt={creator.display_name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                  {/* Top tags and Bookmark */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {creator.ai_tools?.[0] && (
                      <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label text-xs text-on-surface shadow-xs">
                        {creator.ai_tools[0]}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => toggleSave(creator.id, e)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
                      isSaved
                        ? 'bg-secondary text-white'
                        : 'bg-surface-container-lowest/80 text-outline hover:text-secondary hover:bg-white'
                    }`}
                    title={isSaved ? 'Remove Bookmark' : 'Save Creator'}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      bookmark
                    </span>
                  </button>

                  {/* Bottom banner badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md font-label">
                      {creator.specializations?.[0] || 'AI Visualist'}
                    </span>
                    <span className="font-label font-semibold flex items-center gap-1 drop-shadow">
                      <span className="text-amber-400">★</span> {creator.rating?.toFixed(1) || '5.0'} ({creator.reviews_count || 12})
                    </span>
                  </div>
                </div>

                {/* Creator Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-outline-variant/30">
                        <img
                          src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                          alt={creator.display_name}
                          className="w-full h-full object-cover"
                        />
                        {creator.verified && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary ring-2 ring-white" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Link
                            to={`/creators/${creator.id}`}
                            className="font-headline text-base font-semibold text-on-surface hover:text-secondary transition-colors truncate"
                          >
                            {creator.display_name}
                          </Link>
                          {creator.verified && (
                            <span
                              className="material-symbols-outlined text-secondary text-[16px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                              title="Verified Partner"
                            >
                              verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-secondary font-medium font-body truncate">
                          {creator.headline}
                        </p>
                        <p className="text-xs text-outline font-body">
                          {creator.location} · {creator.completed_briefs || 18} briefs completed
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-on-surface-variant font-body line-clamp-2 mb-4 leading-relaxed">
                      {creator.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {creator.ai_tools?.slice(0, 3).map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-label"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer CTAs */}
                  <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-outline block uppercase tracking-wider font-label">Commission Floor</span>
                      <span className="text-sm font-semibold text-on-surface font-label">
                        From $2,800
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInvitingCreator(creator)}
                        className="px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-label font-medium transition-colors border border-outline-variant/30"
                      >
                        Invite
                      </button>
                      <Link
                        to={`/creators/${creator.id}`}
                        className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-medium shadow-xs transition-all"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="flex flex-col gap-4">
          {filteredCreators.map((creator) => {
            const isSaved = savedCreatorIds.has(creator.id);
            return (
              <article
                key={creator.id}
                className="group bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6 justify-between"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 ring-2 ring-outline-variant/30">
                    <img
                      src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                      alt={creator.display_name}
                      className="w-full h-full object-cover"
                    />
                    {creator.verified && (
                      <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-white" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/creators/${creator.id}`}
                        className="font-headline text-lg font-semibold text-on-surface hover:text-secondary transition-colors"
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
                      <span className="text-xs text-outline font-body">· {creator.location}</span>
                    </div>
                    <p className="text-xs text-secondary font-medium font-body mb-1">
                      {creator.headline}
                    </p>
                    <p className="text-xs text-on-surface-variant line-clamp-1 max-w-2xl font-body">
                      {creator.bio}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {creator.ai_tools?.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-label"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-outline-variant/20">
                  <div className="text-right">
                    <span className="text-xs text-outline block font-label">Rating</span>
                    <span className="text-sm font-semibold text-on-surface font-label flex items-center gap-1 justify-end">
                      <span className="text-amber-400">★</span> {creator.rating?.toFixed(1) || '5.0'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => toggleSave(creator.id, e)}
                    className={`p-2.5 rounded-full border transition-all ${
                      isSaved
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-surface-container-low text-outline hover:text-secondary border-outline-variant/30'
                    }`}
                    title={isSaved ? 'Remove Bookmark' : 'Save Creator'}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      bookmark
                    </span>
                  </button>
                  <button
                    onClick={() => setInvitingCreator(creator)}
                    className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-label font-medium transition-colors border border-outline-variant/30"
                  >
                    Invite
                  </button>
                  <Link
                    to={`/creators/${creator.id}`}
                    className="px-5 py-2 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-medium shadow-xs transition-all"
                  >
                    View Profile
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Advanced Filters Drawer Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[22px]">tune</span>
                  <h3 className="font-headline text-lg font-semibold text-on-surface">Advanced Talent Filters</h3>
                </div>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="p-1.5 rounded-full hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Commercial Rights */}
              <div className="space-y-3">
                <span className="font-label text-sm font-semibold text-on-surface block">Commercial Cleared & IP</span>
                <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={commercialOnly}
                    onChange={(e) => setCommercialOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary accent-secondary"
                  />
                  Commercial Broadcast License Included
                </label>
                <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary accent-secondary"
                  />
                  Inomark Verified Creator Badge
                </label>
              </div>

              {/* Specialized Hardware */}
              <div className="space-y-3">
                <span className="font-label text-sm font-semibold text-on-surface block">Pipeline Ready</span>
                <div className="flex flex-wrap gap-2">
                  {['DaVinci ACES Grading', 'LoRA Weights Handover', '4K Master ProRes', 'NDA Signed'].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-surface-container text-xs font-label text-on-surface-variant cursor-pointer hover:bg-secondary/10 hover:text-secondary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-between gap-4">
              <button
                onClick={resetAllFilters}
                className="text-outline hover:text-secondary font-label text-sm underline"
              >
                Reset all
              </button>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="px-6 py-2.5 rounded-full bg-secondary text-on-secondary font-label text-sm font-medium shadow-sm hover:bg-secondary/90 transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite to Brief Modal */}
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
                  {invitingCreator.display_name} has been invited to review your campaign brief.
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
                    Personalized Note to Creator
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={`Hi ${invitingCreator.display_name}, we love your recent work and believe your aesthetic would be an exceptional fit for our upcoming flagship campaign.`}
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
                    Send Brief Invitation
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
