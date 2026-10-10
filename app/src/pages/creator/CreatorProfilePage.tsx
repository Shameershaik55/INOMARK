import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreatorProfilePage() {
  const [headline, setHeadline] = useState('Cinematic AI Director & Commercial Worldbuilder');
  const [bio, setBio] = useState(
    'Directing cinematic AI commercials and luxury brand narratives with high-fidelity motion workflows. Specializing in photorealistic fluid physics, macro specular lighting, and consistent commercial character direction using custom ComfyUI and FLUX pipelines.'
  );
  const [tools, setTools] = useState([
    'Runway Gen-3 Alpha',
    'FLUX.1 Dev',
    'ComfyUI (Custom Nodes)',
    'Midjourney v6.1',
    'Kling 1.5 Pro',
    'Luma Dream Machine'
  ]);
  const [newTool, setNewTool] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const addTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTool.trim() && !tools.includes(newTool.trim())) {
      setTools([...tools, newTool.trim()]);
      setNewTool('');
    }
  };

  const removeTool = (toolToRemove: string) => {
    setTools(tools.filter(t => t !== toolToRemove));
  };

  const handleSave = () => {
    setSaveStatus('Profile updated & published to marketplace!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="relative w-full overflow-hidden px-6 lg:px-12 py-8 flex flex-col gap-10 pb-28">
      {/* Toast Alert */}
      {saveStatus && (
        <div className="fixed top-20 right-8 z-50 px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="font-label-button text-xs font-semibold">{saveStatus}</span>
        </div>
      )}

      {/* Page Title & Top Utility Bar */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2 pb-4">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-surface-container-high/70 backdrop-blur-md shadow-xs border border-surface-container">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-label-badge text-xs text-primary uppercase tracking-widest font-bold">
              Marketplace Discoverable • Active
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            My <span className="italic font-normal text-secondary">Profile</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Curate how premier luxury brands, agencies, and studios discover your generative craft.
          </p>
        </div>

        {/* Quick Action Controls */}
        <div className="flex items-center gap-3 self-start lg:self-end">
          <Link
            to="/creators/c-elena-vance"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-xs hover:shadow-md text-on-surface font-label-button text-xs font-semibold transition-all border border-surface-container"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">visibility</span>
            <span>Preview Public Profile</span>
          </Link>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-button text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Save Changes</span>
          </button>
        </div>
      </section>

      {/* Master Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left/Center Column: Editor Form Sections (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-8 min-w-0">
          {/* Top Profile Header Card */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-8 shadow-xs border border-surface-container/60">
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-md ring-2 ring-secondary/30">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Elena Vance"
                  />
                </div>
              </div>

              {/* Profile Overview Inputs */}
              <div className="flex flex-col flex-1 gap-2 min-w-0 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Elena Vance</h2>
                    <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-surface-container">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-label-badge text-xs text-on-surface font-semibold">Accepting Commissions</span>
                  </div>
                </div>

                {/* Professional Headline Input */}
                <div className="relative mt-1">
                  <input
                    className="w-full px-4 py-2 rounded-full bg-surface-container-low font-body-md text-sm text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-surface-container"
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-body-sm text-xs mt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-outline">location_on</span>
                    <span>Munich / Stockholm (Global Remote)</span>
                  </div>
                  <span className="text-outline-variant">•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-secondary">star</span>
                    <span className="font-semibold text-on-surface">4.98 / 5.0</span>
                    <span>(42 Brand Deliveries)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: About Me */}
          <div className="rounded-2xl bg-surface-container-lowest/85 backdrop-blur-xl p-8 shadow-xs border border-surface-container/60 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-label-badge text-xs px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed uppercase font-semibold">
                  01 • Core Identity
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">About Elena & Vision</h3>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-button text-xs font-semibold text-on-surface">
                Commercial Director Statement
              </label>
              <textarea
                className="w-full p-4 rounded-2xl bg-surface-container-low font-body-md text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed border border-surface-container"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          {/* Section 2: AI Tools, Models & Production Skills */}
          <div className="rounded-2xl bg-surface-container-lowest/85 backdrop-blur-xl p-8 shadow-xs border border-surface-container/60 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-label-badge text-xs px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase font-semibold">
                  02 • Pipeline
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">AI Tools & Neural Workflow</h3>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="font-label-button text-xs font-semibold text-on-surface">
                Neural Models & Generative Video Engines
              </label>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-body-sm text-xs font-semibold"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => removeTool(t)}
                      className="material-symbols-outlined text-[15px] hover:text-error cursor-pointer"
                    >
                      close
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={addTool} className="relative mt-2">
                <input
                  className="w-full pl-4 pr-24 py-2.5 rounded-full bg-surface-container-low font-body-sm text-xs text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container"
                  placeholder="Type new tool (e.g. ElevenLabs, DaVinci Resolve) and press enter..."
                  type="text"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 px-4 py-1.5 rounded-full bg-primary text-white font-label-button text-xs font-semibold cursor-pointer"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live Marketplace Preview Card */}
        <div className="xl:col-span-4 sticky top-24 flex flex-col gap-6">
          <div className="rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-6 shadow-xs border border-surface-container flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">smart_display</span>
                <span className="font-label-button text-xs text-on-surface font-semibold">Live Marketplace Card</span>
              </div>
              <span className="font-label-badge text-xs text-secondary bg-secondary-fixed/50 px-2.5 py-0.5 rounded-full uppercase font-bold">
                Real-time
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-surface-bright shadow-sm flex flex-col border border-surface-container">
              <div className="relative w-full h-48 overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                  alt="Showreel Preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="font-label-caption text-xs text-white/80 uppercase tracking-wider block font-semibold">
                    Featured Showreel
                  </span>
                  <h4 className="font-headline-sm text-sm text-white font-medium truncate">
                    Aura Botanical Dew — Micro Specular
                  </h4>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-secondary">
                    <img
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                      alt="Elena Vance"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-sm text-on-surface font-semibold truncate">Elena Vance</span>
                      <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                    </div>
                    <span className="font-label-caption text-xs text-on-surface-variant truncate">{headline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-surface-container">
                  <Link
                    to="/creators/c-elena-vance"
                    className="flex-1 py-2 rounded-full bg-primary text-on-primary font-label-button text-xs font-semibold text-center hover:bg-primary-container transition-colors"
                  >
                    View Public Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Docked Floating Glass Bottom Action Bar */}
      <aside className="fixed bottom-6 left-4 lg:left-80 right-4 lg:right-12 flex items-center justify-between px-6 py-3 rounded-full bg-surface-container-lowest/90 backdrop-blur-xl shadow-xl border border-surface-container z-30">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-body-sm text-xs text-on-surface-variant font-medium">
            All modifications staged in browser memory
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-on-primary font-label-button text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">cloud_done</span>
            <span>Publish Updates to Marketplace</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
