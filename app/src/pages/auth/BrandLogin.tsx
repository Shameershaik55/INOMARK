import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function BrandLogin() {
  const navigate = useNavigate();
  const { loginAsDemo, signIn } = useAuth();

  const [email, setEmail] = useState('marketing@aurabotanica.com');
  const [password, setPassword] = useState('AuraBotanica#2025');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeDemoState, setActiveDemoState] = useState<'default' | 'invalid' | 'loading' | 'success'>('default');

  const handleDemoState = (state: 'default' | 'invalid' | 'loading' | 'success') => {
    setActiveDemoState(state);
    if (state === 'default') {
      setEmail('marketing@aurabotanica.com');
      setPassword('AuraBotanica#2025');
      setErrorMsg(null);
      setLoading(false);
    } else if (state === 'invalid') {
      setErrorMsg('Invalid enterprise domain credentials. Please check your corporate SSO or email and retry.');
      setLoading(false);
    } else if (state === 'loading') {
      setErrorMsg(null);
      setLoading(true);
    } else if (state === 'success') {
      setErrorMsg(null);
      setLoading(false);
      loginAsDemo('brand');
      navigate('/brand/dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !email.includes('@')) {
      setErrorMsg('Please provide a valid company email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Password is required.');
      return;
    }

    setLoading(true);
    try {
      if (email.toLowerCase().includes('aura') || email.toLowerCase().includes('brand') || password.includes('Aura') || password === 'demo1234') {
        setTimeout(() => {
          loginAsDemo('brand');
          navigate('/brand/dashboard');
        }, 400);
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
        } else {
          navigate('/brand/dashboard');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased relative selection:bg-secondary-fixed selection:text-on-secondary-fixed flex flex-col justify-between">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-secondary-fixed-dim/30 via-primary-fixed/20 to-transparent blur-[120px] rounded-full"></div>
        <div className="absolute top-1/3 -left-[10%] w-[600px] h-[600px] bg-tertiary-fixed/25 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-[10%] right-[-5%] w-[700px] h-[500px] bg-secondary-fixed/30 blur-[130px] rounded-full"></div>
      </div>

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/70 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between">
          <Link className="flex items-center gap-space-sm group" to="/">
            <span className="font-headline-md text-headline-md tracking-tight text-on-surface group-hover:text-primary transition-colors">
              Inomark
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-badge text-label-badge uppercase tracking-wider">
              ✦ Brand Portal
            </span>
          </Link>
          <div className="flex items-center gap-space-lg">
            <nav className="hidden sm:flex items-center">
              <Link className="font-label-button text-label-button text-on-surface-variant hover:text-primary transition-colors" to="/creator/login">
                Looking to showcase AI work? Go to Creator Login →
              </Link>
            </nav>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-20 flex-1 flex flex-col justify-center relative z-10">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-xl md:py-space-2xl">
            {/* Main Grid: 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-start">
              {/* LEFT COLUMN: Brand Authentication Card */}
              <div className="lg:col-span-6 flex flex-col gap-space-lg">
                <div className="bg-surface-container-lowest/90 backdrop-blur-2xl p-space-lg md:p-space-xl rounded-lg shadow-xl relative overflow-hidden">
                  {/* Subtle Card Ambient Aura */}
                  <div className="absolute -top-24 -right-24 w-60 h-60 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>

                  {/* Top Row: Enterprise Pill & Interactive Demo Switcher */}
                  <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-label-badge text-label-badge uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      Enterprise Brand Portal
                    </div>

                    {/* Demo State Switcher */}
                    <div className="inline-flex items-center bg-surface-container p-1 rounded-full gap-0.5 shadow-sm">
                      <span className="font-label-caption text-label-caption text-on-surface-variant px-2 hidden sm:inline">State:</span>
                      <button
                        type="button"
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${activeDemoState === 'default' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
                        onClick={() => handleDemoState('default')}
                      >
                        Default
                      </button>
                      <button
                        type="button"
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${activeDemoState === 'invalid' ? 'bg-surface-container-lowest text-error shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
                        onClick={() => handleDemoState('invalid')}
                      >
                        Invalid
                      </button>
                      <button
                        type="button"
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${activeDemoState === 'loading' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
                        onClick={() => handleDemoState('loading')}
                      >
                        Loading
                      </button>
                      <button
                        type="button"
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${activeDemoState === 'success' ? 'bg-surface-container-lowest text-emerald-600 shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
                        onClick={() => handleDemoState('success')}
                      >
                        Success
                      </button>
                    </div>
                  </div>

                  {/* Title & Editorial Subheading */}
                  <div className="mb-space-lg">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-xs">
                      Welcome back to <span className="font-headline-lg italic text-primary">Inomark</span>
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Discover verified AI talent, commission deterministic commercial pipelines, and bring high-fidelity brand campaigns to life.
                    </p>
                  </div>

                  {/* Alert Container for Errors */}
                  {errorMsg && (
                    <div className="mb-space-md p-space-md rounded-DEFAULT bg-error-container text-on-error-container flex items-start gap-3">
                      <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">error</span>
                      <div className="flex-1">
                        <p className="font-label-button text-label-button text-error">Authentication Failed</p>
                        <p className="font-body-sm text-body-sm text-on-error-container/90">{errorMsg}</p>
                      </div>
                    </div>
                  )}

                  {/* Authentication Form */}
                  <form className="space-y-space-md" onSubmit={handleSubmit} noValidate>
                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label className="block font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant" htmlFor="businessEmail">
                        Business Email <span className="text-primary font-bold">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">mail</span>
                        <input
                          className="w-full bg-surface-container-low pl-12 pr-4 py-3.5 rounded-full font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_3px_rgba(70,72,212,0.25)] transition-all"
                          id="businessEmail"
                          name="email"
                          placeholder="name@company.com"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant" htmlFor="brandPassword">
                          Password <span className="text-primary font-bold">*</span>
                        </label>
                        <Link className="font-label-caption text-label-caption text-primary hover:text-primary-container transition-colors" to="/forgot-password">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">lock</span>
                        <input
                          className="w-full bg-surface-container-low pl-12 pr-12 py-3.5 rounded-full font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_3px_rgba(70,72,212,0.25)] transition-all"
                          id="brandPassword"
                          name="password"
                          placeholder="Enter enterprise password"
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          aria-label="Toggle password view"
                          className="absolute right-4 text-on-surface-variant hover:text-on-surface transition-colors p-1"
                          id="passwordToggleBtn"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Escrow Security Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-1">
                      <label className="inline-flex items-center gap-2.5 cursor-pointer">
                        <input
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-primary accent-primary bg-surface-container-low cursor-pointer"
                          type="checkbox"
                        />
                        <span className="font-body-sm text-body-sm text-on-surface">Remember company session for 30 days</span>
                      </label>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-caption text-label-caption self-start sm:self-auto">
                        <span className="material-symbols-outlined text-[15px] text-tertiary">verified_user</span>
                        <span>Enterprise Escrow Protected</span>
                      </div>
                    </div>

                    {/* Primary Action Button */}
                    <div className="pt-2">
                      <button
                        className="w-full group py-4 px-6 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-label-button text-label-button tracking-wide shadow-md hover:shadow-xl hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-75"
                        id="submitButton"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="inline-flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-on-primary" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                            </svg>
                            <span>Signing in...</span>
                          </span>
                        ) : (
                          <>
                            <span id="buttonLabel">Sign In to Brand Dashboard</span>
                            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform" id="buttonArrow">
                              arrow_forward
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Alternative Enterprise SSO Entry */}
                  <div className="mt-space-lg pt-space-md bg-surface-container-low/50 rounded-DEFAULT p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">corporate_fare</span>
                      <span className="font-body-sm text-body-sm text-on-surface">SAML 2.0 / Okta Single Sign-On</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDemoState('success')}
                      className="font-label-button text-label-button text-primary hover:text-primary-container transition-colors inline-flex items-center gap-1"
                    >
                      Log in with SSO <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>
                </div>

                {/* New to Inomark? Callout Card */}
                <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 font-label-badge text-label-badge text-secondary uppercase tracking-wider">
                      <span>✦</span> New to Inomark?
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Create an Enterprise Account</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                      Commission top 1% vetted AI directors, locked milestones in escrow, custom LoRAs, and 8K master EXR delivery.
                    </p>
                  </div>
                  <Link
                    className="shrink-0 px-6 py-3 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary font-label-button text-label-button transition-colors"
                    to="/brand/signup"
                  >
                    Register Brand
                  </Link>
                </div>

                {/* Role Separation / Creator Link */}
                <div className="p-space-md rounded-full bg-surface-container-high/40 flex items-center justify-between px-space-lg">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">palette</span>
                    <span className="font-body-sm text-body-sm text-on-surface">Are you an AI Creator or Model Trainer?</span>
                  </div>
                  <Link
                    className="font-label-button text-label-button text-primary font-semibold hover:text-primary-container transition-colors inline-flex items-center gap-1"
                    to="/creator/login"
                  >
                    Creator Portal →
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: Curated Commercial Showcase & Capabilities */}
              <div className="lg:col-span-6 flex flex-col gap-space-lg">
                {/* Live Commission Metrics Bar */}
                <div className="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest/80 backdrop-blur-md p-space-md rounded-full shadow-sm">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-badge text-label-badge uppercase">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                    Enterprise Commission Hub
                  </div>
                  <div className="inline-flex items-center gap-2 font-label-button text-label-button text-on-surface px-3">
                    <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                    <span className="font-bold">$180,000+</span>
                    <span className="text-on-surface-variant font-normal">in Completed Campaigns</span>
                  </div>
                </div>

                {/* Featured Commercial Campaign Card */}
                <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-lg group transition-all duration-300">
                  <div className="relative w-full h-80 sm:h-96 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      data-alt="Cinematic luxury cosmetic advertisement visual featuring Nordic botanical serum bottles on raw minimalist granite rocks with crystalline water droplets, soft morning sunbeams breaking through foggy studio atmosphere."
                      src="https://images.unsplash.com/photo-1608248597359-0f6a27e02517?auto=format&fit=crop&w=1200&q=80"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-badge text-label-badge text-on-surface uppercase tracking-wider shadow-sm">
                        4K Cinema Commercial
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-badge text-label-badge uppercase tracking-wider shadow-sm">
                        $12,000 Milestone Locked
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-2 shadow-md">
                        <span className="material-symbols-outlined text-secondary text-[16px]">auto_awesome</span>
                        <span className="font-label-caption text-label-caption text-on-surface font-semibold">ComfyUI + FLUX.1 Commercial Seed</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">Nordic Botanical Serum — Specular Launch</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
                        <span className="font-medium text-on-surface">Commissioned by Aura Botanica</span>
                        <span>•</span>
                        <span>Director: Elena Vance (Top 1% AI Director)</span>
                      </p>
                    </div>
                    <Link
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high font-label-button text-label-button text-primary transition-colors shrink-0"
                      to="/creator/briefs/b-nordic-botanical-serum"
                    >
                      View Brief
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                    </Link>
                  </div>
                </div>

                {/* Two Column Value Capabilities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="bg-surface-container-lowest/70 backdrop-blur-md p-space-lg rounded-DEFAULT shadow-sm flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                      <span className="material-symbols-outlined text-[22px]">account_tree</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Deterministic Workflows</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Direct handover of vetted ComfyUI node graphs, custom trained brand LoRAs, and 8K master multi-layer EXR sequences.
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest/70 backdrop-blur-md p-space-lg rounded-DEFAULT shadow-sm flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-1">
                      <span className="material-symbols-outlined text-[22px]">shield_with_heart</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Escrow-Backed Safety</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Commercial deposits locked safely in third-party escrow accounts prior to kick-off. 100% intellectual property transfer on sign-off.
                    </p>
                  </div>
                </div>

                {/* Active Talent Availability Banner */}
                <div className="bg-inverse-surface text-inverse-on-surface p-space-md md:p-space-lg rounded-DEFAULT shadow-md flex items-center justify-between gap-space-md">
                  <div>
                    <p className="font-label-button text-label-button text-inverse-on-surface">420+ Certified AI Directors</p>
                    <p className="font-body-sm text-body-sm text-inverse-on-surface/70">Currently accepting enterprise briefs & commercial retainers</p>
                  </div>
                  <Link
                    className="inline-flex items-center gap-1 font-label-button text-label-button text-inverse-primary hover:underline shrink-0"
                    to="/brand/creators"
                  >
                    Browse Directory
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 lg:px-12 py-5 text-center text-xs text-slate-400 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface/50">
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} Inomark Global Technologies Inc. All rights reserved.</span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="text-primary font-medium">Enterprise Generative Creative Exchange</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 font-medium">
          <Link className="hover:text-primary transition" to="/brand/creators">Discover Creators</Link>
          <Link className="hover:text-primary transition" to="/terms">Terms of Service</Link>
          <Link className="hover:text-primary transition" to="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
