import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_CREATORS, MOCK_PORTFOLIO_PROJECTS, MOCK_BRIEFS } from '../../lib/mockData';

export default function CreatorPublicProfile() {
  const { id } = useParams<{ id: string }>();
  const { userRole, profileId } = useAuth();

  // Dynamically find creator
  const creator = useMemo(() => {
    return MOCK_CREATORS.find(c => c.id === id) || MOCK_CREATORS[0];
  }, [id]);

  // Determine viewing context:
  // Brand user is NEVER creator viewing, even if viewing Elena Vance
  const isCreatorViewing = userRole === 'creator' || (!userRole && creator.id === 'c-elena-vance');
  const isOwnProfile = userRole === 'creator' && (profileId === creator.id || (!profileId && creator.id === 'c-elena-vance'));

  // Creator's portfolio works
  const projects = useMemo(() => {
    const list = MOCK_PORTFOLIO_PROJECTS.filter(p => p.creator_id === creator.id);
    if (list.length > 0) return list;
    return MOCK_PORTFOLIO_PROJECTS; // Fallback so all creators show curated works
  }, [creator.id]);

  // Filter tabs
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSaved, setIsSaved] = useState(false);
  const [inspectProject, setInspectProject] = useState<any | null>(null);

  // Invite Modal
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedBriefId, setSelectedBriefId] = useState(MOCK_BRIEFS[0]?.id || '');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter(p => 
      p.content_type?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      p.format?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [projects, selectedCategory]);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setShowInviteModal(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-body text-on-surface antialiased relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl border-b border-outline-variant/20 shadow-xs">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </div>
              <span className="font-headline text-xl font-bold tracking-tight text-on-surface">INOMARK</span>
            </Link>

            {isCreatorViewing ? (
              <Link
                to="/creator/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-label text-on-surface-variant hover:text-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Back to Creator Hub</span>
              </Link>
            ) : (
              <Link
                to="/brand/creators"
                className="inline-flex items-center gap-1.5 text-xs font-label text-on-surface-variant hover:text-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Back to Discover Creators</span>
              </Link>
            )}
          </div>

          <nav className="flex items-center gap-4">
            {isCreatorViewing ? (
              <>
                <Link
                  to="/creator/portfolio"
                  className="hidden sm:inline text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  My Portfolio
                </Link>
                <Link
                  to="/creator/briefs"
                  className="hidden sm:inline text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Brand Briefs
                </Link>
                <div className="h-4 w-px bg-outline-variant/30 hidden sm:block" />
                <Link
                  to="/creator/profile"
                  className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/90 text-on-secondary text-xs font-label font-medium shadow-xs transition-colors"
                >
                  Edit Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/brand/creators"
                  className="hidden sm:inline text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Discover Talent
                </Link>
                <Link
                  to="/brand/briefs"
                  className="hidden sm:inline text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Campaign Briefs
                </Link>
                <div className="h-4 w-px bg-outline-variant/30 hidden sm:block" />
                <Link
                  to="/brand/dashboard"
                  className="px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-medium shadow-xs transition-colors"
                >
                  Brand Workspace
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Creator Preview Notice Banner */}
          {isOwnProfile && (
            <div className="mb-6 p-4 rounded-2xl bg-secondary-fixed/50 border border-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs text-on-secondary-fixed font-semibold">
                <span className="material-symbols-outlined text-[20px] text-secondary">visibility</span>
                <span>You are previewing your Public Creator Showcase — this is how brand directors see your profile.</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/creator/profile"
                  className="px-3.5 py-1.5 rounded-full bg-secondary text-white text-xs font-semibold hover:bg-secondary/90 transition-all shadow-xs"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/creator/dashboard"
                  className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-all"
                >
                  Creator Hub
                </Link>
              </div>
            </div>
          )}

          {/* Breadcrumb Context Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-outline-variant/15">
            <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
              {isCreatorViewing ? (
                <>
                  <Link to="/creator/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span>Creator Hub</span>
                  </Link>
                  <span className="text-outline">/</span>
                  <Link to="/creator/profile" className="hover:text-primary transition-colors">
                    My Profile
                  </Link>
                  <span className="text-outline">/</span>
                  <span className="text-on-surface font-semibold">{creator.display_name} (Showcase)</span>
                </>
              ) : (
                <>
                  <Link to="/brand/creators" className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Discover Creators</span>
                  </Link>
                  <span className="text-outline">/</span>
                  <span className="text-on-surface font-semibold">{creator.display_name}</span>
                </>
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low text-xs font-label text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Viewing Public Showcase · Verified Pro</span>
            </div>
          </div>

          {/* Creator Hero Section (2-Column) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8 pb-16">
            {/* Left Column: Creator Identity */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Avatar + Location */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg ring-2 ring-outline-variant/30 bg-surface-container">
                      <img
                        src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                        alt={creator.display_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {creator.verified && (
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-label text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                      <span>{creator.location}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-secondary text-xs font-label font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{creator.availability || 'Available for Q4 Commercial Briefs'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-label text-outline mt-0.5">
                      <span className="text-amber-400">★</span>
                      <strong className="text-on-surface">{creator.rating?.toFixed(1) || '4.9'}</strong>
                      <span>({creator.reviews_count || 38} reviews · {creator.completed_briefs || 24} briefs)</span>
                    </div>
                  </div>
                </div>

                {/* Name & Headline */}
                <h1 className="text-4xl lg:text-5xl font-headline font-bold text-on-surface tracking-tight mb-2">
                  {creator.display_name}
                </h1>
                <p className="font-headline text-lg text-secondary font-medium tracking-normal mb-5">
                  {creator.headline}
                </p>

                {/* Bio */}
                <p className="font-body text-base text-on-surface-variant leading-relaxed mb-8 max-w-xl">
                  {creator.bio}
                </p>

                {/* Specializations & Tools Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {creator.ai_tools?.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-surface-container text-xs font-label text-on-surface"
                    >
                      {tool}
                    </span>
                  ))}
                  {creator.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-label text-secondary font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              {isOwnProfile ? (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/creator/profile"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-secondary hover:bg-secondary/90 text-white font-label text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span>Edit My Profile</span>
                  </Link>
                  <Link
                    to="/creator/portfolio"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label text-sm font-semibold transition-colors border border-outline-variant/30"
                  >
                    <span className="material-symbols-outlined text-[18px]">collections</span>
                    <span>Manage Projects</span>
                  </Link>
                  <a
                    href="#selected-work"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant font-label text-sm font-medium transition-colors border border-outline-variant/30"
                  >
                    <span>View Projects</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                  </a>
                </div>
              ) : isCreatorViewing ? (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#selected-work"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-secondary hover:bg-secondary/90 text-white font-label text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Explore Creative Work</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                  </a>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Invite to Brief</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>

                  <a
                    href="#selected-work"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label text-sm font-medium transition-colors border border-outline-variant/30"
                  >
                    <span>View Portfolio</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                  </a>

                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-label text-sm transition-all border ${
                      isSaved
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border-outline-variant/30 shadow-xs'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      bookmark
                    </span>
                    <span>{isSaved ? 'Saved Creator' : 'Save Creator'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Featured Hero Work */}
            <div className="lg:col-span-6 w-full">
              <div className="relative bg-surface-container-lowest rounded-2xl p-4 sm:p-6 shadow-sm border border-outline-variant/20 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-surface-container cursor-pointer" onClick={() => setInspectProject(projects[0])}>
                  <img
                    src={projects[0]?.cover_url || creator.avatar_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'}
                    alt="Featured showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label text-xs font-semibold shadow-xs">
                      ✦ FEATURED PROJECT
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-label text-xs">
                      4K PRORES
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label text-xs font-semibold shadow-md group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span>Inspect Case Study</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label text-xs text-secondary font-semibold uppercase tracking-wider">
                      {projects[0]?.content_type || 'AI Commercial Showcase'}
                    </span>
                    <span className="font-label text-xs text-on-surface-variant">
                      Verified Case Study
                    </span>
                  </div>
                  <h2 className="font-headline text-xl font-semibold text-on-surface mb-1">
                    {projects[0]?.title || 'Cinematic Macro Reel'}
                  </h2>
                  <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    {projects[0]?.description || 'High-fidelity generative visual narratives and procedural fluid dynamics developed for premium campaign broadcast.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Capabilities Grid */}
          <section className="py-12 border-t border-outline-variant/15">
            <div className="max-w-2xl mb-8">
              <span className="font-label text-xs text-secondary font-semibold uppercase tracking-widest block mb-1">
                Core Capabilities
              </span>
              <h2 className="font-headline text-3xl font-semibold text-on-surface">
                What I Create
              </h2>
              <p className="font-body text-sm text-on-surface-variant mt-1">
                Production-proven neural pipelines calibrated for luxury campaigns, high-fashion runway, and 3D packshots.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {creator.specializations?.map((spec, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                      <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                    </div>
                    <h3 className="font-headline text-lg font-semibold text-on-surface mb-2">
                      {spec}
                    </h3>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      Custom generative workflows using {creator.ai_tools?.[idx % (creator.ai_tools?.length || 1)] || 'Runway Gen-3'} with calibrated prompt matrices.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-outline-variant/10 flex items-center justify-between text-xs font-label text-secondary font-medium">
                    <span>Commercial Cleared</span>
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Work Portfolio Section */}
          <section id="selected-work" className="pt-12 pb-16 border-t border-outline-variant/15 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="font-label text-xs text-secondary font-semibold uppercase tracking-widest block mb-1">
                  Portfolio Gallery
                </span>
                <h2 className="font-headline text-3xl font-semibold text-on-surface">
                  Selected Work
                </h2>
                <p className="font-body text-sm text-on-surface-variant mt-1 max-w-xl">
                  Inspect high-resolution stills, commercial video loops, and generative campaign artifacts.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1 rounded-full">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-1.5 rounded-full font-label text-xs transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  All Work ({projects.length})
                </button>
                <button
                  onClick={() => setSelectedCategory('video')}
                  className={`px-4 py-1.5 rounded-full font-label text-xs transition-all ${
                    selectedCategory === 'video'
                      ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  AI Video
                </button>
                <button
                  onClick={() => setSelectedCategory('macro')}
                  className={`px-4 py-1.5 rounded-full font-label text-xs transition-all ${
                    selectedCategory === 'macro'
                      ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Macro & Stills
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setInspectProject(project)}
                  className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
                    <img
                      src={project.cover_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="px-4 py-2 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label text-xs font-semibold">
                        Inspect Case Study →
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-label text-xs">
                        {project.content_type}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-label text-[10px] text-secondary font-semibold uppercase tracking-wider">
                        {project.industry}
                      </span>
                      <h3 className="font-headline text-base font-semibold text-on-surface mt-1 mb-2 group-hover:text-secondary transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-3 mt-3 border-t border-outline-variant/15">
                      {project.ai_tools?.map((tool, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-label"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Case Study Inspection Modal */}
      {inspectProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/30 space-y-5 max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-label font-semibold uppercase">
                  {inspectProject.content_type}
                </span>
                <h2 className="font-headline text-2xl font-semibold text-on-surface mt-2">
                  {inspectProject.title}
                </h2>
              </div>
              <button
                onClick={() => setInspectProject(null)}
                className="p-1 rounded-full text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="rounded-xl overflow-hidden aspect-video bg-black">
              <img
                src={inspectProject.cover_url}
                alt={inspectProject.title}
                className="w-full h-full object-contain"
              />
            </div>

            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {inspectProject.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-surface-container-low text-xs font-label">
              <div>
                <span className="text-outline block">Industry</span>
                <span className="font-semibold text-on-surface">{inspectProject.industry}</span>
              </div>
              <div>
                <span className="text-outline block">Format Master</span>
                <span className="font-semibold text-on-surface">{inspectProject.format || '4K Master'}</span>
              </div>
              <div>
                <span className="text-outline block">License Status</span>
                <span className="font-semibold text-emerald-600">Commercial Cleared</span>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
              <button
                onClick={() => setInspectProject(null)}
                className="px-5 py-2 rounded-full text-xs font-label text-outline hover:text-on-surface"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setInspectProject(null);
                  setShowInviteModal(true);
                }}
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label text-xs font-semibold shadow-sm"
              >
                Invite {creator.display_name} to Brief
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/30 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={creator.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                  alt={creator.display_name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant/30"
                />
                <div>
                  <h3 className="font-headline font-semibold text-on-surface text-base">
                    Invite {creator.display_name}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-body">
                    Dispatch campaign brief treatment invitation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-full text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {inviteSuccess ? (
              <div className="py-8 text-center space-y-2">
                <span className="material-symbols-outlined text-[48px] text-emerald-500">check_circle</span>
                <h4 className="font-headline text-lg font-semibold text-on-surface">Brief Invitation Dispatched!</h4>
                <p className="text-xs text-on-surface-variant font-body">
                  {creator.display_name} has received the brief notification and will respond with a proposal.
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
                    Note to Creator
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={`Hi ${creator.display_name}, we are looking for a visionary AI artist to direct our upcoming campaign brief. We think your aesthetic is the perfect match.`}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 rounded-full text-xs font-label text-outline hover:text-on-surface"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary text-xs font-label font-semibold shadow-sm transition-all"
                  >
                    Send Invitation
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
