import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function BrandSignup() {
  const navigate = useNavigate();
  const { loginAsDemo, signUp } = useAuth();

  const [contactName, setContactName] = useState('Sophia Sterling');
  const [businessEmail, setBusinessEmail] = useState('sophia@aurabotanica.com');
  const [password, setPassword] = useState('AuraBotanica#2025!');
  const [confirmPassword, setConfirmPassword] = useState('AuraBotanica#2025!');
  const [companyName, setCompanyName] = useState('Aura Botanica Nordic Laboratories');
  const [businessType, setBusinessType] = useState('Consumer Brand');
  const [industry, setIndustry] = useState('Beauty and Skincare');
  const [companyUrl, setCompanyUrl] = useState('https://aurabotanica.com');
  const [region, setRegion] = useState('Global');
  const [synopsis, setSynopsis] = useState('Clean Nordic bio-skincare crafting cold-pressed restorative botanical elixirs for conscious dermatological wellness.');
  const [termsAgree, setTermsAgree] = useState(true);

  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([
    'AI-Generated Video Ads',
    'Product Visuals',
    'Cinematic Campaigns',
  ]);
  const [selectedVelocity, setSelectedVelocity] = useState('Launch Campaigns');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeState, setActiveState] = useState<'default' | 'errors' | 'submitting' | 'verify' | 'success'>('default');

  const handleStateToggle = (state: 'default' | 'errors' | 'submitting' | 'verify' | 'success') => {
    setActiveState(state);
    if (state === 'default') {
      setErrorMsg(null);
      setLoading(false);
    } else if (state === 'errors') {
      setErrorMsg('Please review highlighted fields: verify company email and password security.');
      setLoading(false);
    } else if (state === 'submitting') {
      setErrorMsg(null);
      setLoading(true);
    } else if (state === 'verify' || state === 'success') {
      setErrorMsg(null);
      setLoading(false);
      loginAsDemo('brand');
      navigate('/brand/dashboard');
    }
  };

  const toggleDiscipline = (item: string) => {
    setSelectedDisciplines((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!contactName.trim()) {
      setErrorMsg('Contact person name is required.');
      return;
    }
    if (!businessEmail || !businessEmail.includes('@')) {
      setErrorMsg('Please provide a valid company domain email.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!companyName.trim()) {
      setErrorMsg('Brand or company name is required.');
      return;
    }
    if (!termsAgree) {
      setErrorMsg('You must accept the Enterprise Terms of Service and Escrow Rules.');
      return;
    }

    setLoading(true);
    try {
      if (businessEmail.toLowerCase().includes('aura') || businessEmail.toLowerCase().includes('demo')) {
        setTimeout(() => {
          loginAsDemo('brand');
          navigate('/brand/dashboard');
        }, 500);
      } else {
        const { error } = await signUp(businessEmail, password, 'brand', { company_name: companyName });
        if (error) {
          if (error.message.toLowerCase().includes('rate limit')) {
            setErrorMsg('Supabase email rate limit reached (free project tier default is 3-4 confirmation emails/hr). You can proceed directly into your Brand Atelier below.');
          } else {
            setErrorMsg(error.message);
          }
          setLoading(false);
        } else {
          loginAsDemo('brand');
          navigate('/brand/dashboard');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during account creation.');
      setLoading(false);
    }
  };

  const disciplines = [
    'AI-Generated Video Ads',
    'Product Visuals',
    'Social Media Creatives',
    'Cinematic Campaigns',
    'Character Consistency LoRAs',
    'Animation & Motion',
    '3D Key Visuals',
  ];

  const velocities = [
    'Launch Campaigns',
    'Seasonal Rebrands',
    'Always-On Social',
    'E-Commerce Packshots',
  ];

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased relative selection:bg-secondary-fixed selection:text-on-secondary-fixed flex flex-col justify-between">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-surface-container-highest/60 blur-[130px]"></div>
        <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-secondary-fixed/40 blur-[140px]"></div>
        <div className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] rounded-full bg-tertiary-fixed/30 blur-[150px]"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <Link className="flex items-center gap-space-xs" to="/">
              <span className="font-headline-md text-headline-md tracking-tight text-on-surface font-semibold">Inomark</span>
              <span className="w-2 h-2 rounded-full bg-primary mb-2"></span>
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed-variant border border-primary-fixed">
              <span className="font-label-badge text-label-badge uppercase tracking-wider">Enterprise Brand Portal</span>
            </div>
          </div>
          <nav className="flex items-center gap-space-lg">
            <Link className="font-label-button text-label-button text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 group" to="/creator/signup">
              <span>Are you an AI Creator? Join as a Creator</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="w-full pt-20 flex-1 relative flex flex-col justify-center">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-xl">
            {/* Simulation Controller */}
            <div className="w-full mb-space-xl p-space-md bg-surface-container-low/90 backdrop-blur-xl rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-badge text-label-badge text-on-surface uppercase tracking-wider">Simulation Mode:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5" id="state-selector-container">
                <button
                  className={`state-btn px-3 py-1.5 rounded-full font-label-caption text-label-caption shadow-sm transition-all ${activeState === 'default' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-on-surface'}`}
                  onClick={() => handleStateToggle('default')}
                  type="button"
                >
                  Default Form
                </button>
                <button
                  className={`state-btn px-3 py-1.5 rounded-full font-label-caption text-label-caption transition-all ${activeState === 'errors' ? 'bg-error text-on-error' : 'bg-surface-container text-on-surface-variant hover:text-on-surface'}`}
                  onClick={() => handleStateToggle('errors')}
                  type="button"
                >
                  Validation Errors
                </button>
                <button
                  className={`state-btn px-3 py-1.5 rounded-full font-label-caption text-label-caption transition-all ${activeState === 'submitting' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-on-surface'}`}
                  onClick={() => handleStateToggle('submitting')}
                  type="button"
                >
                  Submitting State
                </button>
                <button
                  className="state-btn px-3 py-1.5 rounded-full font-label-caption text-label-caption bg-surface-container text-on-surface-variant hover:text-on-surface transition-all"
                  onClick={() => handleStateToggle('success')}
                  type="button"
                >
                  Instant Dashboard Access
                </button>
              </div>
            </div>

            {/* Main 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-2xl items-start">
              {/* LEFT COLUMN: Brand Registration Engine */}
              <div className="lg:col-span-7 flex flex-col gap-space-xl">
                {/* Header & Editorial Lead */}
                <div className="flex flex-col gap-space-xs">
                  <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                    <span className="font-label-badge text-label-badge tracking-widest uppercase">BRAND REGISTRATION</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-space-xs">
                    Create Your <span className="italic font-display-hero text-headline-lg bg-gradient-to-r from-primary via-secondary to-tertiary-container bg-clip-text text-transparent">Brand Account</span>
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                    Connect with vetted AI directors, publish verified milestone briefs, and elevate your campaign velocity with studio-grade generative assets.
                  </p>
                </div>

                {/* Global Error Banner */}
                {errorMsg && (
                  <div className="p-space-md rounded-2xl bg-error-container text-on-error-container flex flex-col gap-2 shadow-sm transition-all duration-300">
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-[20px] text-error">error</span>
                      <div className="flex-1">
                        <h4 className="font-headline-sm text-sm font-semibold text-error">Account Registration Notice</h4>
                        <p className="font-body-sm text-xs text-on-error-container mt-0.5">{errorMsg}</p>
                      </div>
                    </div>
                    {errorMsg.toLowerCase().includes('rate limit') && (
                      <button
                        type="button"
                        onClick={() => {
                          loginAsDemo('brand');
                          navigate('/brand/dashboard');
                        }}
                        className="self-start mt-2 px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>Proceed into Brand Workspace Directly</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Form Shell */}
                <form className="flex flex-col gap-space-xl" onSubmit={handleSubmit} noValidate>
                  {/* SECTION A: Account Information */}
                  <div className="p-space-lg md:p-space-xl bg-surface-container-lowest/80 backdrop-blur-xl rounded-3xl shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center justify-between pb-space-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center font-label-badge text-label-badge text-on-primary-fixed">1</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Account Information</h3>
                      </div>
                      <span className="font-label-caption text-label-caption text-primary">Required Step</span>
                    </div>

                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-button text-label-button text-on-surface flex items-center justify-between" htmlFor="contact-name">
                        <span>Contact Person's Full Name <span className="text-error">*</span></span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-outline-variant text-[20px] pointer-events-none">person</span>
                        <input
                          className="w-full pl-12 pr-4 py-3 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-all placeholder:text-outline-variant"
                          id="contact-name"
                          placeholder="e.g. Sophia Sterling"
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Business Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-button text-label-button text-on-surface flex items-center justify-between" htmlFor="business-email">
                        <span>Business Email Address <span className="text-error">*</span></span>
                        <span className="font-label-caption text-label-caption text-on-surface-variant font-normal">Domain Verification Required</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-outline-variant text-[20px] pointer-events-none">mail</span>
                        <input
                          className="w-full pl-12 pr-4 py-3 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-all placeholder:text-outline-variant"
                          id="business-email"
                          placeholder="sophia@aurabotanica.com"
                          type="email"
                          value={businessEmail}
                          onChange={(e) => setBusinessEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Passwords Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-button text-label-button text-on-surface" htmlFor="password-input">
                          Create Password <span className="text-error">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-4 text-outline-variant text-[20px] pointer-events-none">lock</span>
                          <input
                            className="w-full pl-12 pr-12 py-3 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-all"
                            id="password-input"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            className="absolute right-4 text-outline-variant hover:text-on-surface transition-colors flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-button text-label-button text-on-surface" htmlFor="confirm-password-input">
                          Confirm Password <span className="text-error">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-4 text-outline-variant text-[20px] pointer-events-none">verified_user</span>
                          <input
                            className="w-full pl-12 pr-12 py-3 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-all"
                            id="confirm-password-input"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button
                            className="absolute right-4 text-outline-variant hover:text-on-surface transition-colors flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showConfirmPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION B: Company Identity */}
                  <div className="p-space-lg md:p-space-xl bg-surface-container-lowest/80 backdrop-blur-xl rounded-3xl shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center justify-between pb-space-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center font-label-badge text-label-badge text-on-primary-fixed">2</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Company & Brand Identity</h3>
                      </div>
                      <span className="font-label-caption text-label-caption text-primary">Required Step</span>
                    </div>

                    {/* Brand Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-button text-label-button text-on-surface" htmlFor="company-name">
                        Brand or Company Name <span className="text-error">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-outline-variant text-[20px] pointer-events-none">domain</span>
                        <input
                          className="w-full pl-12 pr-4 py-3 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-all"
                          id="company-name"
                          placeholder="e.g. Aura Botanica"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Business Type & Industry Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-button text-label-button text-on-surface" htmlFor="business-type">
                          Business Type <span className="text-error">*</span>
                        </label>
                        <select
                          className="w-full pl-4 pr-10 py-3 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-inner appearance-none cursor-pointer"
                          id="business-type"
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                        >
                          <option value="Consumer Brand">Consumer Brand (D2C / Retail)</option>
                          <option value="Startup">Early-Stage High Growth Startup</option>
                          <option value="Small or Medium Business">Small or Medium Business</option>
                          <option value="Marketing Agency">Marketing Agency</option>
                          <option value="Creative Agency">Creative Agency / Production House</option>
                          <option value="Enterprise Company">Global Enterprise</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-button text-label-button text-on-surface" htmlFor="industry-select">
                          Primary Industry <span className="text-error">*</span>
                        </label>
                        <select
                          className="w-full pl-4 pr-10 py-3 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-inner appearance-none cursor-pointer"
                          id="industry-select"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                        >
                          <option value="Beauty and Skincare">Beauty and Skincare</option>
                          <option value="Fashion and Apparel">Fashion and Luxury Apparel</option>
                          <option value="Consumer Electronics">Consumer Electronics & Hardware</option>
                          <option value="Food and Beverage">Food, Beverage & Culinary</option>
                          <option value="Gaming and Entertainment">Gaming, Cinema & Entertainment</option>
                          <option value="Automotive">Automotive & Mobility</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SECTION C: Initial Creative Requirements */}
                  <div className="p-space-lg md:p-space-xl bg-surface-container-lowest/80 backdrop-blur-xl rounded-3xl shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center justify-between pb-space-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-badge text-label-badge text-on-surface">3</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Creative Requirements & Focus</h3>
                      </div>
                      <span className="font-label-caption text-label-caption text-on-surface-variant">Matchmaking Preferences</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="font-label-button text-label-button text-on-surface">What kind of content are you looking for?</span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {disciplines.map((d) => {
                          const isSel = selectedDisciplines.includes(d);
                          return (
                            <button
                              key={d}
                              type="button"
                              onClick={() => toggleDiscipline(d)}
                              className={`px-3.5 py-2 rounded-full font-label-caption text-label-caption flex items-center gap-1.5 transition-all ${
                                isSel
                                  ? 'bg-primary-fixed text-on-primary-fixed-variant shadow-sm'
                                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[16px]">{isSel ? 'check' : 'add'}</span>
                              <span>{d}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <span className="font-label-button text-label-button text-on-surface">Preferred Campaign Velocity</span>
                      <div className="flex flex-wrap gap-2">
                        {velocities.map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setSelectedVelocity(v)}
                            className={`px-3.5 py-1.5 rounded-full font-label-caption text-label-caption transition-all ${
                              selectedVelocity === v
                                ? 'bg-secondary-fixed text-on-secondary-fixed-variant shadow-sm'
                                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION D: Agreement & Submission */}
                  <div className="p-space-lg md:p-space-xl bg-surface-container-lowest/80 backdrop-blur-xl rounded-3xl shadow-sm flex flex-col gap-space-lg">
                    <div className="flex items-start gap-3">
                      <input
                        checked={termsAgree}
                        onChange={(e) => setTermsAgree(e.target.checked)}
                        className="mt-1 h-5 w-5 rounded-lg text-primary focus:ring-primary cursor-pointer border-0 bg-surface-container-high"
                        id="terms-agree"
                        type="checkbox"
                      />
                      <label className="font-body-sm text-body-sm text-on-surface cursor-pointer select-none" htmlFor="terms-agree">
                        I agree to Inomark's{' '}
                        <Link className="text-primary underline hover:text-primary-container font-semibold transition-colors" to="/terms">
                          Enterprise Terms of Service
                        </Link>
                        ,{' '}
                        <Link className="text-primary underline hover:text-primary-container font-semibold transition-colors" to="/terms">
                          Milestone Escrow Rules
                        </Link>
                        , and{' '}
                        <Link className="text-primary underline hover:text-primary-container font-semibold transition-colors" to="/privacy">
                          Brand Privacy Policy
                        </Link>.
                      </label>
                    </div>

                    <button
                      className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-label-button text-label-button tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.008] active:scale-[0.99] transition-all duration-200 group disabled:opacity-75"
                      id="submit-account-btn"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin h-5 w-5 border-2 border-on-primary border-t-transparent rounded-full"></span>
                          <span>Creating enterprise account...</span>
                        </span>
                      ) : (
                        <>
                          <span id="btn-text">Create Brand Account</span>
                          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1" id="btn-arrow">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </button>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-xs border-t-0">
                      <Link className="font-label-button text-label-button text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1" to="/brand/login">
                        <span>Already have an account? Sign In to Brand Portal</span>
                        <span>→</span>
                      </Link>
                      <Link className="font-label-button text-label-button text-primary hover:text-primary-container transition-colors flex items-center gap-1 font-semibold" to="/creator/signup">
                        <span>Are you an AI Creator? Apply on Creator Portal</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>

              {/* RIGHT COLUMN: Value Proposition */}
              <div className="lg:col-span-5 flex flex-col gap-space-xl lg:sticky lg:top-28">
                <div className="bg-surface-container-lowest/80 backdrop-blur-xl p-space-lg md:p-space-xl rounded-3xl shadow-sm flex flex-col gap-space-md border border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
                    <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">Enterprise Guarantees</span>
                  </div>
                  <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant">
                    <li className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                      <span>100% Commercial IP transfer & NDA enforcement.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                      <span>Handover of raw ComfyUI node graphs and custom trained LoRA weights.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                      <span>Milestone funds held in protected escrow until final sign-off.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 lg:px-12 py-5 text-center text-xs text-slate-400 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} Inomark Inc.</span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="text-primary font-medium">Enterprise Generative Creative Exchange</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 font-medium">
          <Link className="hover:text-primary transition" to="/brand/login">Brand Portal</Link>
          <Link className="hover:text-primary transition" to="/creator/login">Creator Portal</Link>
          <Link className="hover:text-primary transition" to="/terms">Terms</Link>
          <Link className="hover:text-primary transition" to="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
