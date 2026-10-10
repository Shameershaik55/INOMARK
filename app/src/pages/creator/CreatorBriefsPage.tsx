import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MOCK_BRIEFS, MOCK_BRANDS } from '../../lib/mockData';

export default function CreatorBriefsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialBrand = searchParams.get('brand') || '';

  // Filter States
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'applications'>('all');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [savedBriefIds, setSavedBriefIds] = useState<string[]>(['b-nordic-botanical-serum']);
  const [selectedBriefId, setSelectedBriefId] = useState<string>('b-nordic-botanical-serum');

  // Application Drawer Form State
  const [drawerTab, setDrawerTab] = useState<'overview' | 'specs' | 'deliverables'>('overview');
  const [pitchText, setPitchText] = useState('I will utilize a custom FLUX.1 + ComfyUI LoRA pipeline calibrated for high-refraction glass specular caustics, paired with Runway Gen-3 Alpha camera dolly paths.');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Toggle Save Brief
  const toggleSaveBrief = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedBriefIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter and Sort Briefs
  const filteredBriefs = useMemo(() => {
    return MOCK_BRIEFS.filter((brief) => {
      // Tab filter
      if (activeTab === 'saved' && !savedBriefIds.includes(brief.id)) return false;
      if (activeTab === 'applications' && brief.id !== 'b-nordic-botanical-serum') return false;

      // Brand param filter
      if (initialBrand && brief.brand_id !== initialBrand) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const brand = MOCK_BRANDS.find(b => b.id === brief.brand_id);
        const matchTitle = brief.title.toLowerCase().includes(q);
        const matchObj = brief.objective ? brief.objective.toLowerCase().includes(q) : false;
        const matchDesc = brief.description.toLowerCase().includes(q);
        const matchBrand = brand?.company_name.toLowerCase().includes(q);
        const matchTool = brief.preferred_tools?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchObj && !matchDesc && !matchBrand && !matchTool) return false;
      }

      // Industry filter
      if (selectedIndustry !== 'all' && brief.industry !== selectedIndustry) {
        return false;
      }

      // Budget Tier filter
      if (selectedBudgetTier === 'high' && (brief.budget_max || 0) < 5000) return false;
      if (selectedBudgetTier === 'mid' && ((brief.budget_max || 0) < 3000 || (brief.budget_min || 0) >= 5000)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'budget_high') return (b.budget_max || 0) - (a.budget_max || 0);
      if (sortBy === 'budget_low') return (a.budget_min || 0) - (b.budget_min || 0);
      if (sortBy === 'deadline') return new Date(a.deadline || 0).getTime() - new Date(b.deadline || 0).getTime();
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [activeTab, savedBriefIds, initialBrand, searchQuery, selectedIndustry, selectedBudgetTier, sortBy]);

  // Selected Brief for Drawer
  const activeBrief = useMemo(() => {
    return MOCK_BRIEFS.find(b => b.id === selectedBriefId) || filteredBriefs[0] || MOCK_BRIEFS[0];
  }, [selectedBriefId, filteredBriefs]);

  const activeBrand = useMemo(() => {
    return MOCK_BRANDS.find(b => b.id === activeBrief.brand_id) || MOCK_BRANDS[0];
  }, [activeBrief]);

  const handleSubmitPitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        navigate('/creator/applications');
      }, 1200);
    }, 800);
  };

  const industries = useMemo(() => {
    const list = Array.from(new Set(MOCK_BRIEFS.map(b => b.industry)));
    return ['all', ...list];
  }, []);

  return (
    <div className="relative w-full overflow-hidden px-6 lg:px-12 py-8 flex flex-col gap-10">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-[30rem] h-[30rem] bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header & Live Pool Counter */}
      <div className="flex flex-col gap-6">
        {/* Breadcrumb & Live Opportunities Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-label-caption text-label-caption text-on-surface-variant font-medium">Creator Workspace</span>
            <span className="material-symbols-outlined text-outline-variant text-[14px]">chevron_right</span>
            <span className="font-label-caption text-label-caption text-primary font-semibold">Brand Briefs</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-xs border border-surface-container/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-label-badge text-label-badge text-on-surface uppercase tracking-wider font-semibold">
              {MOCK_BRIEFS.length} Verified Briefs Live
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider font-bold">
              $46.8k Active Escrow Pool
            </span>
          </div>
        </div>

        {/* Editorial Headline & Copy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 max-w-7xl">
          <div className="flex flex-col gap-3 max-w-3xl">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Find Your Next{' '}
              <span className="italic font-display-hero text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-secondary-container">
                Creative Commission
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Explore commissions from global luxury brands seeking state-of-the-art generative direction. Filter verified enterprise scopes, review deterministic technical parameters, and pitch your certified pipeline.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed/40 text-on-primary-fixed w-fit self-start lg:self-auto shadow-xs border border-primary/20">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="font-label-badge text-label-badge font-semibold">100% Milestone Escrow Protected</span>
          </div>
        </div>

        {/* Summary Metric Cards in Frosted Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
          <div className="p-5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-xs border border-surface-container/60 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-caption text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Open Briefs</span>
              <span className="font-headline-md text-headline-md text-on-surface font-semibold mt-1">{MOCK_BRIEFS.length} Opportunities</span>
              <span className="font-label-caption text-xs text-emerald-600 flex items-center gap-1 mt-0.5 font-medium">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +3 published this week
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-xs border border-surface-container/60 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-caption text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Average Budget</span>
              <span className="font-headline-md text-headline-md text-on-surface font-semibold mt-1">$4,850 USD</span>
              <span className="font-label-caption text-xs text-on-surface-variant mt-0.5">Escrow on milestone acceptance</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('applications')}
            className={`p-5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-xs border flex items-center justify-between text-left transition-all ${
              activeTab === 'applications' ? 'border-primary ring-2 ring-primary/20' : 'border-surface-container/60 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-label-caption text-xs text-on-surface-variant uppercase tracking-wider font-semibold">My Submissions</span>
              <span className="font-headline-md text-headline-md text-on-surface font-semibold mt-1">1 In Review</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-label-caption text-xs text-on-surface-variant font-medium">Click to filter applications</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-[24px]">outgoing_mail</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`p-5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-xs border flex items-center justify-between text-left transition-all ${
              activeTab === 'saved' ? 'border-secondary ring-2 ring-secondary/20' : 'border-surface-container/60 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-label-caption text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Saved Briefs</span>
              <span className="font-headline-md text-headline-md text-secondary font-semibold mt-1">{savedBriefIds.length} Saved</span>
              <span className="font-label-caption text-xs text-on-surface-variant mt-0.5">Click to view bookmarked</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-secondary-container/50 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">bookmark</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout: List (Left) + Detailed Deep-Dive Drawer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tabs, Filters & Briefs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-surface-container-high/60 pb-3 gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full font-label-button text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>All Open Briefs</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === 'all' ? 'bg-white/20 text-on-primary' : 'bg-surface-container-highest text-primary'}`}>
                  {MOCK_BRIEFS.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 rounded-full font-label-button text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'applications'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>My Applications</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary text-[10px] font-bold">1</span>
              </button>

              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 py-2 rounded-full font-label-button text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'saved'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>Saved Briefs</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold">
                  {savedBriefIds.length}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-label-caption text-xs text-on-surface-variant font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container-lowest text-on-surface font-body-sm text-xs px-3 py-1.5 rounded-full shadow-xs border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="budget_high">Highest Budget</option>
                <option value="budget_low">Lowest Budget</option>
                <option value="deadline">Closing Soonest</option>
              </select>
            </div>
          </div>

          {/* Search Bar with Frosted Glass */}
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px]">search</span>
            <input
              className="w-full h-12 pl-12 pr-12 rounded-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm shadow-xs border border-surface-container/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Search briefs by title, brand, preferred tool (FLUX, Runway, Kling)..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Filter Dropdown Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Industry Filter */}
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-body-sm text-xs shadow-xs border border-surface-container focus:outline-none cursor-pointer"
            >
              <option value="all">Industry: All</option>
              {industries.filter(i => i !== 'all').map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>

            {/* Budget Tier */}
            <select
              value={selectedBudgetTier}
              onChange={(e) => setSelectedBudgetTier(e.target.value)}
              className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-body-sm text-xs shadow-xs border border-surface-container focus:outline-none cursor-pointer"
            >
              <option value="all">Budget: All Tiers</option>
              <option value="high">High Budget ($5,000+)</option>
              <option value="mid">Mid Tier ($3,000 - $5,000)</option>
            </select>

            {(selectedIndustry !== 'all' || selectedBudgetTier !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedIndustry('all');
                  setSelectedBudgetTier('all');
                  setSearchQuery('');
                }}
                className="font-label-badge text-xs text-primary hover:underline ml-1 cursor-pointer font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Brief Cards Listing Container */}
          <div className="flex flex-col gap-4">
            {filteredBriefs.length === 0 ? (
              <div className="p-12 rounded-2xl bg-surface-container-lowest text-center flex flex-col items-center gap-3 border border-surface-container">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant">search_off</span>
                <h3 className="font-headline-sm text-on-surface font-semibold">No briefs found</h3>
                <p className="font-body-sm text-on-surface-variant">Try broadening your search term or filter parameters.</p>
                <button
                  onClick={() => {
                    setSelectedIndustry('all');
                    setSelectedBudgetTier('all');
                    setSearchQuery('');
                    setActiveTab('all');
                  }}
                  className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-button text-xs font-semibold mt-2"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredBriefs.map((brief) => {
                const brand = MOCK_BRANDS.find(b => b.id === brief.brand_id) || MOCK_BRANDS[0];
                const isSelected = brief.id === selectedBriefId;
                const isSaved = savedBriefIds.includes(brief.id);

                return (
                  <div
                    key={brief.id}
                    onClick={() => setSelectedBriefId(brief.id)}
                    className={`p-6 rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-lg transition-all relative flex flex-col gap-4 cursor-pointer border ${
                      isSelected
                        ? 'ring-2 ring-primary border-primary shadow-md'
                        : 'border-surface-container/60 hover:border-surface-container'
                    }`}
                  >
                    {/* Header: Brand & Budget */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold overflow-hidden shadow-xs border border-surface-container">
                          {brand.logo_url ? (
                            <img src={brand.logo_url} alt={brand.company_name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-[24px]">business</span>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/brands/${brand.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="font-headline-sm text-headline-sm text-on-surface font-semibold hover:text-primary transition-colors"
                            >
                              {brand.company_name}
                            </Link>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-semibold">
                              <span className="material-symbols-outlined text-[12px]">verified</span> Enterprise
                            </span>
                          </div>
                          <span className="font-label-caption text-xs text-on-surface-variant">
                            {brief.industry} • {brand.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end">
                          <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
                            ${brief.budget_min?.toLocaleString()} – ${brief.budget_max?.toLocaleString()} USD
                          </span>
                          <span className="font-label-caption text-xs text-on-surface-variant font-medium">Milestone Escrow</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => toggleSaveBrief(e, brief.id)}
                          className={`p-2 rounded-full hover:bg-surface-container transition-colors ${
                            isSaved ? 'text-secondary' : 'text-on-surface-variant'
                          }`}
                          title={isSaved ? 'Remove from Saved' : 'Save Brief'}
                        >
                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>
                            bookmark
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Title & Status Badges */}
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-badge text-[11px] font-semibold">
                          Accepting Pitches ({brief.applications_count || 3} submitted)
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-badge text-[11px]">
                          Format: {brief.aspect_ratio || '16:9 + 9:16'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-[11px] font-semibold">
                          Deadline: {brief.deadline ? new Date(brief.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Flexible'}
                        </span>
                      </div>

                      <h3 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight hover:text-primary transition-colors">
                        <Link to={`/creator/briefs/${brief.id}`} onClick={(e) => e.stopPropagation()}>
                          {brief.title}
                        </Link>
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                        {brief.objective}
                      </p>
                    </div>

                    {/* Preferred Tool Tags */}
                    {brief.preferred_tools && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {brief.preferred_tools.map(tool => (
                          <span key={tool} className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface font-label-caption text-xs font-medium border border-surface-container">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Footer: Deliverables & Action */}
                    <div className="pt-3 border-t border-surface-container flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-on-surface-variant">
                        <span className="font-body-sm text-xs flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">folder</span>
                          {brief.deliverables?.length || 2} Deliverables
                        </span>
                        <span className="font-body-sm text-xs flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">event</span>
                          Due {brief.deadline ? new Date(brief.deadline).toLocaleDateString() : 'Flexible'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/creator/briefs/${brief.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-button text-xs font-semibold transition-colors"
                        >
                          View Full Brief
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSelectedBriefId(brief.id)}
                          className={`px-5 py-2 rounded-full font-label-button text-xs font-semibold shadow-xs hover:shadow transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-secondary text-on-secondary'
                              : 'bg-primary text-on-primary hover:bg-primary-container'
                          }`}
                        >
                          <span>{isSelected ? 'Inspecting' : 'Inspect & Pitch'}</span>
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Interactive Brief Deep-Dive & Quick Apply Drawer (5 cols on 12-col grid) */}
        <div className="lg:col-span-5 sticky top-20 flex flex-col gap-5">
          <div className="rounded-3xl bg-surface-container-lowest/95 backdrop-blur-2xl shadow-xl overflow-hidden flex flex-col border border-surface-container/60">
            {/* Drawer Header Banner */}
            <div className="p-6 bg-gradient-to-br from-surface-container-high/60 via-primary-fixed/20 to-secondary-fixed/20 flex flex-col gap-4 border-b border-surface-container">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-primary overflow-hidden border border-surface-container">
                    {activeBrand.logo_url ? (
                      <img src={activeBrand.logo_url} alt={activeBrand.company_name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-[28px]">eco</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <Link to={`/brands/${activeBrand.id}`} className="font-headline-sm text-headline-sm text-on-surface font-semibold hover:text-primary transition-colors">
                        {activeBrand.company_name}
                      </Link>
                      <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                    </div>
                    <span className="font-label-caption text-xs text-on-surface-variant">
                      {activeBrand.location} • Commercial Commission
                    </span>
                  </div>
                </div>

                <Link
                  to={`/creator/briefs/${activeBrief.id}`}
                  className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs font-label-badge text-xs text-primary font-bold flex items-center gap-1 hover:bg-primary hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  <span>Full Screen</span>
                </Link>
              </div>

              <div>
                <span className="font-label-badge text-xs uppercase tracking-wider text-primary font-bold">
                  Brief Inspection & Direct Pitch
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold mt-0.5 leading-snug">
                  {activeBrief.title}
                </h2>
              </div>

              {/* Header Quick Stats Pill Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm flex flex-col border border-surface-container/40">
                  <span className="font-label-caption text-xs text-on-surface-variant font-medium">Contract Budget</span>
                  <span className="font-label-button text-sm text-primary font-bold">
                    ${activeBrief.budget_min?.toLocaleString()} – ${activeBrief.budget_max?.toLocaleString()} USD
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm flex flex-col border border-surface-container/40">
                  <span className="font-label-caption text-xs text-on-surface-variant font-medium">Milestone Deadline</span>
                  <span className="font-label-button text-sm text-on-surface font-bold">
                    {activeBrief.deadline ? new Date(activeBrief.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
                  </span>
                </div>
              </div>
            </div>

            {/* Drawer Navigation Tabs */}
            <div className="flex items-center border-b border-surface-container px-6 gap-6 overflow-x-auto">
              <button
                onClick={() => setDrawerTab('overview')}
                className={`py-3 font-label-button text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  drawerTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Project Overview
              </button>
              <button
                onClick={() => setDrawerTab('specs')}
                className={`py-3 font-label-button text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  drawerTab === 'specs' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Tech Specs & Tools
              </button>
              <button
                onClick={() => setDrawerTab('deliverables')}
                className={`py-3 font-label-button text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  drawerTab === 'deliverables' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Deliverables ({activeBrief.deliverables?.length || 0})
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-6 flex flex-col gap-6 max-h-[calc(100vh-22rem)] overflow-y-auto">
              {drawerTab === 'overview' && (
                <>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-headline-sm text-sm text-on-surface font-semibold uppercase tracking-wider text-secondary">
                      Scope & Artistic Direction
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {activeBrief.description}
                    </p>
                  </div>

                  {activeBrief.creative_direction && (
                    <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-1">
                      <span className="font-label-caption text-xs font-bold text-on-surface">Creative Direction Notes</span>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        {activeBrief.creative_direction}
                      </p>
                    </div>
                  )}
                </>
              )}

              {drawerTab === 'specs' && (
                <div className="flex flex-col gap-3">
                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                    <span className="font-label-caption text-xs text-on-surface-variant uppercase font-semibold">Aspect Ratio & Resolution</span>
                    <span className="font-body-sm text-on-surface font-semibold">{activeBrief.aspect_ratio || '16:9 4K Cinema & 9:16 Vertical'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                    <span className="font-label-caption text-xs text-on-surface-variant uppercase font-semibold">Preferred Generative Pipeline</span>
                    <span className="font-body-sm text-on-surface font-semibold">{activeBrief.preferred_tools?.join(', ') || 'FLUX.1 Dev, Runway Gen-3, Kling 1.5'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
                    <span className="font-label-caption text-xs text-on-surface-variant uppercase font-semibold">Deliverable Formats</span>
                    <span className="font-body-sm text-on-surface font-semibold">Apple ProRes 422HQ + 8K Master TIFFs</span>
                  </div>
                </div>
              )}

              {drawerTab === 'deliverables' && (
                <div className="flex flex-col gap-2.5">
                  <span className="font-label-caption text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                    Required Milestone Deliverables
                  </span>
                  <div className="rounded-xl bg-surface-container-low overflow-hidden border border-surface-container">
                    {activeBrief.deliverables?.map((del, i) => (
                      <div
                        key={del.id || i}
                        className={`flex flex-col p-3 ${i !== (activeBrief.deliverables?.length || 1) - 1 ? 'border-b border-surface-container-high/60' : ''}`}
                      >
                        <span className="font-body-sm text-sm text-on-surface font-semibold">{del.title}</span>
                        <span className="font-label-caption text-xs text-on-surface-variant pt-0.5">{del.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* IP Terms Disclaimer */}
              <div className="p-3.5 rounded-xl bg-surface-container-high/40 flex items-start gap-3 border border-surface-container">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">policy</span>
                <div className="flex flex-col">
                  <span className="font-label-button text-xs text-on-surface font-semibold">IP & Milestone Escrow</span>
                  <span className="font-label-caption text-xs text-on-surface-variant mt-0.5 leading-normal">
                    Client funds deposited in escrow. Rights transfer upon final signoff. You retain non-commercial portfolio rights.
                  </span>
                </div>
              </div>

              {/* Application Pitch Section (Interactive Form) */}
              <form onSubmit={handleSubmitPitch} className="pt-4 border-t border-surface-container flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-headline-sm text-sm text-on-surface font-semibold">Submit Your Pitch Treatment</h4>
                  <span className="font-label-caption text-xs text-primary font-semibold">Applying as Elena Vance</span>
                </div>

                {submitSuccess ? (
                  <div className="py-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-emerald-600">check_circle</span>
                    <span className="font-headline-sm text-sm font-bold">Proposal Dispatched to Brand!</span>
                    <span className="font-body-sm text-xs">Redirecting to applications portal...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-caption text-xs text-on-surface-variant font-semibold">
                        Technical Treatment & LoRA / Node Approach
                      </label>
                      <textarea
                        required
                        value={pitchText}
                        onChange={(e) => setPitchText(e.target.value)}
                        className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none leading-relaxed"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        id="terms-agree"
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        className="mt-1 rounded text-primary focus:ring-primary cursor-pointer"
                      />
                      <label htmlFor="terms-agree" className="font-label-caption text-xs text-on-surface-variant cursor-pointer leading-normal">
                        I agree to the specified turnaround schedule, deterministic delivery formats, and milestone escrow terms.
                      </label>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !agreedTerms}
                        className="flex-1 py-3 px-6 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-button text-xs font-semibold shadow-xs hover:shadow transition-all text-center disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? 'Submitting...' : `Submit Application ($${activeBrief.budget_min?.toLocaleString()} – $${activeBrief.budget_max?.toLocaleString()})`}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Application Tracker Status Bar / Summary */}
      <div className="mt-8 p-6 rounded-3xl bg-surface-container-lowest/80 backdrop-blur-xl shadow-xs border border-surface-container/60 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">timeline</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-headline-sm text-sm text-on-surface font-semibold">Active Submissions Pipeline</h4>
              <span className="font-label-caption text-xs text-on-surface-variant">
                Real-time tracking for Elena Vance • 1 open pitch submitted
              </span>
            </div>
          </div>
          <span className="font-label-badge text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-100">
            ● Average Brand Response Time: 34 Hours
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-caption text-xs uppercase tracking-wider text-on-surface-variant font-semibold">1. Pitch Submitted</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <span className="font-label-button text-xs text-on-surface font-bold">1 Brief</span>
            <span className="font-label-caption text-xs text-on-surface-variant">Nordic Dew Botanical Serum</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-high/60 flex flex-col gap-1 border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-caption text-xs uppercase tracking-wider text-primary font-semibold">2. Under Review</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            </div>
            <span className="font-label-button text-xs text-primary font-bold">1 Brief</span>
            <span className="font-label-caption text-xs text-on-surface-variant">Brand review in progress</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-caption text-xs uppercase tracking-wider text-on-surface-variant font-semibold">3. Shortlist / Chat</span>
              <span className="w-2 h-2 rounded-full bg-secondary" />
            </div>
            <span className="font-label-button text-xs text-on-surface font-bold">Pending</span>
            <span className="font-label-caption text-xs text-on-surface-variant">Direct messaging unlocked</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-caption text-xs uppercase tracking-wider text-on-surface-variant font-semibold">4. Contract & Escrow</span>
              <span className="w-2 h-2 rounded-full bg-outline-variant" />
            </div>
            <span className="font-label-button text-xs text-on-surface font-bold">Ready</span>
            <span className="font-label-caption text-xs text-on-surface-variant">Milestone payment security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
