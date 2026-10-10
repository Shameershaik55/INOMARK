import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MOCK_BRIEFS, MOCK_BRANDS, MOCK_PROJECTS } from '../../lib/mockData';

export default function BriefDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Load matching brief or default to first
  const brief = MOCK_BRIEFS.find((b) => b.id === id) || MOCK_BRIEFS[0];
  const brand = MOCK_BRANDS.find((b) => b.id === brief.brand_id) || MOCK_BRANDS[0];

  // Interactive States
  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(42);
  const [pipelineText, setPipelineText] = useState(
    'I plan to use a custom ComfyUI workflow leveraging SDXL + ControlNet Depth conditioned on the CAD geometry. For fluid dynamics, I will pass macro water droplet runs into Runway Gen-3 with custom optical flow interpolation in DaVinci Resolve Studio.'
  );
  const [bidAmount, setBidAmount] = useState(brief.budget_max?.toString() || '4500');
  const [selectedProjects, setSelectedProjects] = useState<string[]>(['p1', 'p2']);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleSave = () => {
    setIsSaved(!isSaved);
    setSaveCount(prev => isSaved ? prev - 1 : prev + 1);
  };

  const toggleProject = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId) ? prev.filter(p => p !== projectId) : [...prev, projectId]
    );
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/creator/applications');
      }, 1500);
    }, 800);
  };

  return (
    <div className="relative w-full overflow-hidden px-6 lg:px-12 py-8 flex flex-col gap-10">
      {/* Top Ambient Halo Background Layer */}
      <div className="absolute -top-12 left-1/4 w-[520px] h-[360px] bg-gradient-to-tr from-secondary-fixed/30 via-primary-fixed/20 to-tertiary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-8 w-[400px] h-[280px] bg-gradient-to-bl from-primary-container/10 via-secondary/10 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Brief Context Bar / Sticky Action Bar */}
      <div className="w-full bg-surface-container-lowest/90 backdrop-blur-xl rounded-2xl p-4 shadow-xs border border-surface-container/60 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-on-surface-variant font-label-caption text-xs">
          <Link
            to="/creator/briefs"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-button text-xs font-semibold mr-2"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>All Briefs</span>
          </Link>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-badge text-xs font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Accepting Pitches
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-tertiary font-label-badge text-xs font-semibold">
            <span className="material-symbols-outlined text-[14px]">verified_user</span>
            Escrow: 100% Funded (${brief.budget_max?.toLocaleString()} USD)
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-caption text-xs font-medium">
            <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
            Deadline: {brief.deadline ? new Date(brief.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible'}
          </span>
        </div>

        <div className="flex items-center gap-2 w-full xl:w-auto justify-end">
          <button
            onClick={toggleSave}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 font-label-button text-xs shadow-xs border cursor-pointer ${
              isSaved
                ? 'bg-secondary-fixed text-on-secondary-fixed font-bold border-secondary'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSaved ? 'bookmark' : 'bookmark_border'}
            </span>
            <span>{isSaved ? 'Saved' : 'Save Brief'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-[11px] text-on-surface-variant font-mono">
              {saveCount}
            </span>
          </button>
          <a
            href="#application-studio"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-label-button text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200"
          >
            <span>Apply Now</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Hero Brief Editorial Title & Patron Badge */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Headline Panel */}
        <div className="lg:col-span-8 bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-8 shadow-xs border border-surface-container/60 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-label-badge text-xs uppercase tracking-widest font-semibold">
              <span>✦ Commissioned Studio Project</span>
              <span className="text-outline-variant">•</span>
              <span>{brief.industry}</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
              {brief.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {brief.objective}
            </p>
          </div>

          {/* Quick Specs Metrics Pill Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-6 border-t border-surface-container/60">
            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between border border-surface-container">
              <span className="font-label-caption text-xs text-on-surface-variant uppercase font-medium">Budget Range</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline-sm text-sm text-on-surface font-bold text-secondary">
                  ${brief.budget_min?.toLocaleString()} – ${brief.budget_max?.toLocaleString()}
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 flex items-center gap-0.5 mt-1 font-semibold">
                <span className="material-symbols-outlined text-[13px]">lock</span> 100% Escrow
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between border border-surface-container">
              <span className="font-label-caption text-xs text-on-surface-variant uppercase font-medium">Deliverables</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline-sm text-sm text-on-surface font-bold">
                  {brief.deliverables?.length || 3} Formats
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">{brief.aspect_ratio || '16:9 4K + 9:16'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between border border-surface-container">
              <span className="font-label-caption text-xs text-on-surface-variant uppercase font-medium">Target Pipeline</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline-sm text-sm text-on-surface font-bold">
                  {brief.preferred_tools?.[0] || 'ComfyUI'}
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">Runway / FLUX / Kling</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col justify-between border border-surface-container">
              <span className="font-label-caption text-xs text-on-surface-variant uppercase font-medium">Turnaround</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline-sm text-sm text-on-surface font-bold">21 Days</span>
              </div>
              <span className="text-[11px] text-on-surface-variant mt-1">From Kickoff Call</span>
            </div>
          </div>
        </div>

        {/* Patron Brand Identity Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-surface-container-lowest via-surface-container-low/60 to-surface-container-high/40 rounded-2xl p-6 shadow-xs border border-surface-container/60 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-badge text-xs tracking-wider uppercase text-on-surface-variant font-bold">
                Patron Brand
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-xs font-semibold">
                <span className="material-symbols-outlined text-[13px]">diamond</span> Verified Enterprise
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center overflow-hidden border border-surface-container shadow-xs">
                {brand.logo_url ? (
                  <img src={brand.logo_url} alt={brand.company_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-headline-md font-bold text-primary">{brand.company_name[0]}</span>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  <Link to={`/brands/${brand.id}`} className="hover:text-primary transition-colors">
                    {brand.company_name}
                  </Link>
                </h3>
                <span className="font-label-caption text-xs text-on-surface-variant">{brand.industry}</span>
                <span className="font-label-caption text-xs text-outline">{brand.location}</span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
              {brand.about}
            </p>

            {/* Brand Trust Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="bg-surface-container-lowest/80 p-2.5 rounded-xl border border-surface-container">
                <div className="text-[11px] text-on-surface-variant uppercase font-medium">Creator Rating</div>
                <div className="flex items-center gap-1 font-headline-sm text-sm text-on-surface font-bold">
                  4.98 <span className="material-symbols-outlined text-secondary text-[16px]">star</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest/80 p-2.5 rounded-xl border border-surface-container">
                <div className="text-[11px] text-on-surface-variant uppercase font-medium">Payment Speed</div>
                <div className="font-headline-sm text-sm text-on-surface font-bold text-emerald-600">&lt; 24 hrs</div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-surface-container">
            <Link
              to={`/brands/${brand.id}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-button text-xs font-semibold shadow-xs"
            >
              <span>View Brand Showcase Profile</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Scope, Creative Direction & Visual Universe */}
      <section className="w-full bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-8 shadow-xs border border-surface-container/60 flex flex-col gap-6">
        <div>
          <span className="font-label-badge text-xs text-primary uppercase tracking-widest font-semibold">
            Scope & Aesthetics
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Creative Direction Details</h2>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {brief.description}
        </p>

        {brief.creative_direction && (
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
            <span className="font-label-caption text-xs uppercase text-on-surface font-bold block mb-1">
              Stylistic Tone & Atmosphere:
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {brief.creative_direction}
            </p>
          </div>
        )}

        {/* Deliverables Matrix */}
        <div className="flex flex-col gap-3 pt-4 border-t border-surface-container">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Required Milestone Deliverables ({brief.deliverables?.length || 0})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brief.deliverables?.map((del, i) => (
              <div key={del.id || i} className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-label-badge text-xs text-primary font-bold">Item 0{i + 1}</span>
                  <h4 className="font-headline-sm text-sm text-on-surface font-semibold">{del.title}</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant">{del.description}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-semibold w-fit">
                  Verified Format
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Escrow Milestone Roadmap */}
      {brief.milestones && brief.milestones.length > 0 && (
        <section className="w-full bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-8 shadow-xs border border-surface-container/60 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-label-badge text-xs text-tertiary uppercase tracking-widest font-semibold">
                Guaranteed Compensation
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Milestone Escrow Schedule</h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <span className="material-symbols-outlined text-[15px]">lock</span>
              <span>100% Funds Held in Inomark Vault</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brief.milestones.map((m, idx) => (
              <div key={m.id || idx} className="p-5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-badge text-xs font-semibold">
                      Stage 0{idx + 1} • {m.payout_percentage}%
                    </span>
                    <span className="font-headline-sm text-sm text-on-surface font-bold">
                      ${Math.round(((brief.budget_max || 4500) * (m.payout_percentage || 25)) / 100).toLocaleString()} USD
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-sm text-on-surface font-semibold">{m.title}</h4>
                </div>
                <div className="font-label-caption text-xs text-outline flex items-center gap-1.5 pt-2 border-t border-surface-container/60">
                  <span className="material-symbols-outlined text-[15px]">event</span>
                  <span>Target Due: {m.due_date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Application Studio Drawer / Form Section */}
      <section
        id="application-studio"
        className="w-full bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-surface-container space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-tertiary" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2 text-primary font-label-badge text-xs uppercase tracking-widest font-semibold">
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              <span>Creator Proposal Studio</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Submit Your Application</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Your treatment will be reviewed directly by {brand.company_name}'s executive creative director within 48 hours.
            </p>
          </div>

          {/* Applicant Identity Pill */}
          <div className="flex items-center gap-3 p-2 rounded-full bg-surface-container-low px-4 shadow-xs border border-surface-container">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-semibold">
              EV
            </div>
            <div className="flex flex-col pr-2">
              <div className="flex items-center gap-1">
                <span className="font-label-button text-xs text-on-surface font-semibold">Elena Vance</span>
                <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
              </div>
              <span className="font-label-caption text-xs text-on-surface-variant">Top 1% Generative Cinematographer</span>
            </div>
          </div>
        </div>

        {submitSuccess ? (
          <div className="py-12 flex flex-col items-center text-center gap-3 bg-emerald-50 rounded-2xl border border-emerald-200 p-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-bold">
              ✓
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Proposal Dispatched Successfully!</h3>
            <p className="font-body-md text-on-surface-variant max-w-md">
              Your treatment and verified portfolio samples have been submitted to {brand.company_name}. Redirecting to your applications tracking view...
            </p>
          </div>
        ) : (
          <form onSubmit={handleProposalSubmit} className="space-y-6">
            {/* Question 1: Visual Pipeline & Camera Technique */}
            <div className="space-y-2">
              <label className="block font-label-button text-xs text-on-surface font-semibold" htmlFor="pipeline-input">
                1. Proposed Visual Pipeline & Macro Camera Technique <span className="text-primary">*</span>
              </label>
              <p className="font-label-caption text-xs text-on-surface-variant">
                Describe how you will generate photorealistic fluid caustics, integrate the product silhouette, and achieve filmic cadence.
              </p>
              <textarea
                required
                id="pipeline-input"
                rows={4}
                value={pipelineText}
                onChange={(e) => setPipelineText(e.target.value)}
                className="w-full rounded-xl bg-surface-container-low text-on-surface font-body-sm text-xs p-4 border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-y leading-relaxed"
              />
            </div>

            {/* Question 2: Portfolio Work Attachment */}
            <div className="space-y-3">
              <label className="block font-label-button text-xs text-on-surface font-semibold">
                2. Select Relevant Portfolio Reels from your Inomark Showcase <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_PROJECTS.slice(0, 2).map((project) => {
                  const isChecked = selectedProjects.includes(project.id);
                  return (
                    <div
                      key={project.id}
                      onClick={() => toggleProject(project.id)}
                      className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                        isChecked
                          ? 'bg-secondary-fixed/20 border-secondary ring-1 ring-secondary'
                          : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-5 h-5 accent-secondary rounded cursor-pointer"
                      />
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                        <img src={project.media_url} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-button text-xs text-on-surface font-semibold truncate">
                          {project.title}
                        </span>
                        <span className="font-label-caption text-xs text-on-surface-variant">
                          {project.aspect_ratio || '16:9'} • {project.tools_used?.join(', ')}
                        </span>
                        <span className="text-[11px] text-secondary font-semibold mt-0.5">
                          {isChecked ? '✓ Attached to Pitch' : 'Click to attach'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Proposed Fee & Turnaround Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                  Proposed Production Fee (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-on-surface-variant font-semibold">$</span>
                  <input
                    type="number"
                    required
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-body-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-caption text-xs uppercase text-on-surface-variant font-semibold mb-1">
                  Target Handover Turnaround
                </label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-body-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <option>14 Calendar Days (Expedited)</option>
                  <option>21 Calendar Days (Standard Scope)</option>
                  <option>30 Calendar Days (Full Suite)</option>
                </select>
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="terms-pitch-agree"
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary rounded cursor-pointer"
              />
              <label htmlFor="terms-pitch-agree" className="font-label-caption text-xs text-on-surface-variant cursor-pointer leading-relaxed">
                I commit to the specified turnaround schedule, deterministic delivery formats, milestone escrow framework, and acknowledge that milestone release unlocks IP rights for {brand.company_name}.
              </label>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container">
              <Link
                to="/creator/briefs"
                className="px-6 py-2.5 rounded-full font-label-button text-xs text-on-surface-variant hover:bg-surface-container font-semibold"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !agreedTerms}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-label-button text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Transmitting Proposal...' : `Submit Application ($${Number(bidAmount).toLocaleString()} USD)`}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
