import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function BrandProfilePage() {
  const navigate = useNavigate();

  // Profile states
  const [brandName, setBrandName] = useState('Aura Botanica');
  const [industry, setIndustry] = useState('Beauty & Luxury Skincare');
  const [tagline, setTagline] = useState('Formulating pure Nordic botanical care through ethereal cinematic storytelling.');
  const [description, setDescription] = useState(
    'Founded between Stockholm and New York, Aura Botanica formulates clean, wildcrafted botanical treatments driven by glacial spring waters and cold-pressed Arctic cloudberry extracts.\n\nWe partner exclusively with forward-thinking generative AI artists, cinematic visualizers, and prompt architects who elevate our campaign narratives into museum-grade digital artwork. Our creative mandates focus on fluid motion, photorealistic specular lighting, macro dew textures, and organic elegance.'
  );
  const [website, setWebsite] = useState('https://aurabotanica.com');
  const [city, setCity] = useState('Stockholm');
  const [country, setCountry] = useState('Sweden');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  return (
    <div className="relative w-full px-6 lg:px-12 py-8 flex flex-col gap-8">
      {/* Ambient mesh glow */}
      <div className="absolute -top-16 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-12 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Breadcrumb & status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant uppercase tracking-wider">
          <Link to="/brand/dashboard" className="hover:text-primary transition-colors">
            Brand Studio
          </Link>
          <span className="text-outline">/</span>
          <span className="text-secondary font-semibold">Brand Profile & Guidelines</span>
        </div>

        {savedSuccess ? (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 text-xs font-label font-semibold animate-scale-in">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Profile Saved & Publicly Updated!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-label">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Enterprise Partner Verified Status Active</span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-label uppercase tracking-widest font-semibold mb-2">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span>Enterprise Brand Profile</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-headline font-semibold text-on-surface tracking-tight">
            Brand <span className="text-secondary italic font-serif">Profile</span>
          </h1>
          <p className="text-on-surface-variant font-body text-base mt-1">
            Keep your aesthetic standards, official logos, color architecture, and creative brief requirements synchronized so creators pitch with precision.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/brands/b-aura-botanica"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface font-label text-xs font-medium border border-outline-variant/30 hover:border-secondary transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
            <span>Preview Public Profile</span>
          </Link>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label text-xs font-semibold shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Brand Card with Banner */}
          <div className="rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 shadow-xs">
            <div className="relative h-48 md:h-56 w-full bg-surface-container-high overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                alt="Banner cover"
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white text-xs font-label">
                {city}, {country} · Direct-to-Consumer Luxury
              </div>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-12 relative z-10">
              <div className="w-24 h-24 rounded-2xl bg-surface-container-lowest p-1 shadow-lg ring-2 ring-surface-container flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-headline text-2xl font-bold">
                  AB
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline text-2xl font-semibold text-on-surface truncate">
                    {brandName}
                  </h2>
                  <span
                    className="material-symbols-outlined text-secondary text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <p className="text-xs text-secondary font-medium font-body italic">
                  "{tagline}"
                </p>
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline font-label mt-1 inline-flex items-center gap-1"
                >
                  {website} <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>
          </div>

          {/* Core Form Section */}
          <form onSubmit={handleSave} className="p-6 md:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/10">
              <span className="w-8 h-8 rounded-full bg-secondary/15 text-secondary flex items-center justify-center font-semibold text-xs">
                01
              </span>
              <div>
                <h3 className="font-headline text-lg font-semibold text-on-surface">About Your Brand</h3>
                <p className="text-xs text-on-surface-variant">Public brand context presented to creators evaluating briefs.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label font-medium text-on-surface mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-xs font-label font-medium text-on-surface mb-1">
                  Industry Classification
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-label font-medium text-on-surface mb-1">
                Headline / Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="block text-xs font-label font-medium text-on-surface mb-1">
                Brand Story & Creative Philosophy
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-label font-medium text-on-surface mb-1">
                  Official Website
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-xs font-label font-medium text-on-surface mb-1">
                  HQ City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-xs font-label font-medium text-on-surface mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label text-xs font-semibold shadow-sm transition-all"
              >
                Save Profile Details
              </button>
            </div>
          </form>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs space-y-4">
            <h3 className="font-headline font-semibold text-base text-on-surface">
              Brand Color Tokens
            </h3>
            <p className="text-xs text-on-surface-variant font-body">
              Aesthetic palette referenced by creators in AI model prompting.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#2E3E34] shadow-xs shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-on-surface">Pine Depth</span>
                  <span className="text-[10px] text-outline font-mono">#2E3E34</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D49B53] shadow-xs shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-on-surface">Amber Serum</span>
                  <span className="text-[10px] text-outline font-mono">#D49B53</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E6ECE8] shadow-xs shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-on-surface">Nordic Mist</span>
                  <span className="text-[10px] text-outline font-mono">#E6ECE8</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#111315] shadow-xs shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-on-surface">Deep Obsidian</span>
                  <span className="text-[10px] text-outline font-mono">#111315</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-xs space-y-4">
            <h3 className="font-headline font-semibold text-base text-on-surface">
              Public Showcase
            </h3>
            <p className="text-xs text-on-surface-variant font-body leading-relaxed">
              Creators can view your brand heritage, open briefs, and visual guidelines through the public portal.
            </p>
            <Link
              to="/brands/b-aura-botanica"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary font-label text-xs font-semibold transition-all"
            >
              <span>View Live Brand Portal</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
