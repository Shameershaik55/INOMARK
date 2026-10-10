import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../../lib/mockData';

export default function CreatorPortfolioPage() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [filterCategory, setFilterCategory] = useState<'all' | 'video' | 'images' | 'spatial'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Commercial Video');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newTools, setNewTools] = useState('Runway Gen-3, FLUX.1');
  const [newAspect, setNewAspect] = useState('16:9 4K');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const cat = (p.category || p.content_type || '').toLowerCase();
      if (filterCategory === 'video' && !cat.includes('video') && !cat.includes('reel')) return false;
      if (filterCategory === 'images' && !cat.includes('packshot') && !cat.includes('still') && !cat.includes('macro')) return false;
      if (filterCategory === 'spatial' && !cat.includes('3d') && !cat.includes('spatial')) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCat = cat.includes(q);
        const toolsList = p.tools_used || p.ai_tools || [];
        const matchTools = toolsList.some((t: string) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchCat && !matchTools) return false;
      }
      return true;
    });
  }, [projects, filterCategory, searchQuery]);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj = {
      id: `p-${Date.now()}`,
      creator_id: 'c-elena-vance',
      title: newTitle.trim(),
      description: 'Brand commercial film generated using generative visual pipelines.',
      category: newCategory,
      media_url: newMediaUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      media_type: 'image' as const,
      aspect_ratio: newAspect,
      tools_used: newTools.split(',').map(s => s.trim()),
      is_featured: true,
      created_at: new Date().toISOString()
    };

    setProjects([newProj, ...projects]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewMediaUrl('');
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="relative w-full overflow-hidden px-6 lg:px-12 py-8 flex flex-col gap-10">
      {/* Editorial Header */}
      <header className="flex flex-col gap-6">
        <nav className="flex items-center gap-2 text-on-surface-variant font-label-caption text-xs">
          <Link to="/creator/dashboard" className="hover:text-on-surface transition-colors">Creator Workspace</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-secondary font-semibold">My Portfolio</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/60 text-secondary w-fit font-label-badge text-xs uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>Generative Portfolio Showcase</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              My <span className="font-headline-md italic font-semibold text-secondary">Portfolio</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Curated commercial productions, proprietary generative workflows, and tactile visual artifacts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/creators/c-elena-vance"
              className="px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-button text-xs font-semibold shadow-xs hover:bg-surface-container-low transition-all flex items-center gap-2 border border-surface-container"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Preview Public View</span>
            </Link>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-button text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {/* Creator Identity Bar & Status Strip */}
        <div className="bg-surface-container-lowest/80 backdrop-blur-xl p-5 rounded-2xl shadow-xs border border-surface-container/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden shadow-xs border border-secondary ring-1 ring-secondary">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Elena Vance"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Elena Vance</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-[11px] uppercase tracking-wider font-semibold">
                  Top 1% Director
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-label-caption text-xs mt-0.5">
                <span>Cinematic AI Director & Commercial Worldbuilder</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant" />
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  Stockholm / Berlin
                </span>
              </div>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-secondary-container/30 text-secondary font-label-badge text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Available for Q4 Briefs
          </span>
        </div>
      </header>

      {/* Gallery Toolbar: Filters & Search */}
      <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full font-label-button text-xs font-semibold shadow-xs transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-secondary text-white'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-surface-container'
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            onClick={() => setFilterCategory('video')}
            className={`px-4 py-2 rounded-full font-label-button text-xs font-semibold shadow-xs transition-all cursor-pointer ${
              filterCategory === 'video'
                ? 'bg-secondary text-white'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-surface-container'
            }`}
          >
            AI Videos
          </button>
          <button
            onClick={() => setFilterCategory('images')}
            className={`px-4 py-2 rounded-full font-label-button text-xs font-semibold shadow-xs transition-all cursor-pointer ${
              filterCategory === 'images'
                ? 'bg-secondary text-white'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-surface-container'
            }`}
          >
            Packshots & Stills
          </button>
          <button
            onClick={() => setFilterCategory('spatial')}
            className={`px-4 py-2 rounded-full font-label-button text-xs font-semibold shadow-xs transition-all cursor-pointer ${
              filterCategory === 'spatial'
                ? 'bg-secondary text-white'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-surface-container'
            }`}
          >
            3D & Spatial
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-on-surface-variant text-[18px]">search</span>
          <input
            className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-container-lowest text-on-surface font-body-sm text-xs placeholder:text-on-surface-variant/70 shadow-xs focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all border border-surface-container"
            placeholder="Search by title, tool..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Project Gallery Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-surface-container/60"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={project.media_url}
                alt={project.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface font-label-badge text-xs uppercase tracking-wider flex items-center gap-1 shadow-xs font-semibold">
                  {project.aspect_ratio || '16:9 4K Film'}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-primary text-white font-label-badge text-[11px] uppercase tracking-wider font-semibold shadow-xs">
                  Published
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="font-label-caption text-xs uppercase tracking-wider text-secondary font-semibold">
                      {project.category}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5 group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-low rounded-full p-1 shadow-xs border border-surface-container">
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1.5 rounded-full text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                      title="Delete Project"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 border-t border-surface-container/40">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.tools_used?.map((tool) => (
                    <span key={tool} className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface font-label-caption text-xs font-medium border border-surface-container">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-surface-container flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_photo_alternate</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Add Project to Showcase</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddProject} className="flex flex-col gap-4">
              <div>
                <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                  Project Title
                </label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Celestial Obsidian — Luxury Perfume Teaser"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-body-sm font-semibold text-on-surface focus:outline-none cursor-pointer"
                  >
                    <option>Commercial Video</option>
                    <option>Product Packshot</option>
                    <option>Haute Fashion Reel</option>
                    <option>3D Concept Motion</option>
                  </select>
                </div>

                <div>
                  <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={newAspect}
                    onChange={(e) => setNewAspect(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-body-sm font-semibold text-on-surface focus:outline-none cursor-pointer"
                  >
                    <option>16:9 4K Film</option>
                    <option>9:16 Vertical Reel</option>
                    <option>8K Stills (4:5)</option>
                    <option>1:1 Square Loop</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                  Image or Video Preview URL (Unsplash or direct media)
                </label>
                <input
                  type="url"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                  Tools Used (Comma separated)
                </label>
                <input
                  type="text"
                  value={newTools}
                  onChange={(e) => setNewTools(e.target.value)}
                  placeholder="Runway Gen-3, FLUX.1, ComfyUI"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full font-label-button text-xs text-on-surface-variant hover:bg-surface-container font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full font-label-button text-xs bg-primary text-white font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
