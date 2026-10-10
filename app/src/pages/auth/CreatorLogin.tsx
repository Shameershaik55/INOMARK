import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function CreatorLogin() {
  const navigate = useNavigate();
  const { loginAsDemo, signIn } = useAuth();
  
  const [email, setEmail] = useState('elena.vance@studio.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeDemoState, setActiveDemoState] = useState<'default' | 'invalid' | 'loading' | 'success'>('default');

  const handleDemoState = (state: 'default' | 'invalid' | 'loading' | 'success') => {
    setActiveDemoState(state);
    if (state === 'default') {
      setEmail('elena.vance@studio.ai');
      setPassword('••••••••••••');
      setErrorMsg(null);
      setLoading(false);
    } else if (state === 'invalid') {
      setErrorMsg('Invalid creator credentials. Please check your email or password.');
      setLoading(false);
    } else if (state === 'loading') {
      setErrorMsg(null);
      setLoading(true);
    } else if (state === 'success') {
      setErrorMsg(null);
      setLoading(false);
      loginAsDemo('creator');
      navigate('/creator/dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid creator email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Password is required to authenticate.');
      return;
    }

    setLoading(true);
    try {
      // If it's the demo account or password is placeholder, sign in with demo creator
      if (email.toLowerCase().includes('elena') || password.includes('••') || password === 'demo1234') {
        setTimeout(() => {
          loginAsDemo('creator');
          navigate('/creator/dashboard');
        }, 400);
      } else {
        // Try real Supabase auth
        const { error } = await signIn(email, password);
        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
        } else {
          navigate('/creator/dashboard');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased relative selection:bg-secondary-fixed selection:text-on-secondary-fixed flex flex-col justify-between">
      {/* Top Simple Navigation Bar */}
      <header className="w-full px-6 lg:px-12 py-5 flex items-center justify-between z-20">
        <Link className="flex items-center gap-2.5 group" to="/">
          {/* Inomark Sparkle Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">inomark</span>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-600 -mt-1">Creator Hub</span>
          </div>
        </Link>
        {/* Top Secondary Role Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 hidden sm:inline">Hiring AI talent for brand campaigns?</span>
          <Link
            className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-brand-300 bg-white/70 hover:bg-white text-slate-700 hover:text-brand-600 transition shadow-sm flex items-center gap-1.5"
            to="/brand/login"
          >
            <span>Go to Brand Login</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Split Layout Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Creator Login Authentication Form */}
          <div className="lg:col-span-6 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Subtle Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 via-brand-600 to-indigo-500"></div>
              {/* Header Titles */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/60 text-brand-700 text-xs font-semibold mb-3">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                  Creator Portal Access
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                  Welcome back, <span className="italic text-brand-600 font-normal">Creator</span>
                </h1>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  Sign in to showcase your work, discover verified enterprise brands, and apply for high-budget commercial opportunities.
                </p>
              </div>

              {/* Interactive Authentication States Preview Bar */}
              <div className="mb-6 p-2 rounded-xl bg-slate-100/80 border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
                <span className="font-medium text-slate-500 px-1">Demo State:</span>
                <div className="flex gap-1" id="stateSwitcher">
                  <button
                    type="button"
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${activeDemoState === 'default' ? 'bg-white font-semibold text-brand-700 shadow-xs' : 'hover:bg-white text-slate-600'}`}
                    onClick={() => handleDemoState('default')}
                  >
                    Default
                  </button>
                  <button
                    type="button"
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${activeDemoState === 'invalid' ? 'bg-white font-semibold text-rose-600 shadow-xs' : 'hover:bg-white text-slate-600'}`}
                    onClick={() => handleDemoState('invalid')}
                  >
                    Invalid
                  </button>
                  <button
                    type="button"
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${activeDemoState === 'loading' ? 'bg-white font-semibold text-brand-700 shadow-xs' : 'hover:bg-white text-slate-600'}`}
                    onClick={() => handleDemoState('loading')}
                  >
                    Loading
                  </button>
                  <button
                    type="button"
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${activeDemoState === 'success' ? 'bg-white font-semibold text-emerald-600 shadow-xs' : 'hover:bg-white text-slate-600'}`}
                    onClick={() => handleDemoState('success')}
                  >
                    Success
                  </button>
                </div>
              </div>

              {/* Global Form Alert Message Container */}
              {errorMsg && (
                <div className="mb-6 p-3.5 rounded-xl text-xs font-medium border bg-rose-50 border-rose-200 text-rose-700 flex items-start gap-2.5 transition-all">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">{errorMsg}</div>
                </div>
              )}

              {/* Main Creator Login Form */}
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase" htmlFor="creatorEmail">
                      Email Address
                    </label>
                    <span className="text-[11px] text-slate-400">Required</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                      </svg>
                    </div>
                    <input
                      autoComplete="email"
                      className="custom-input w-full pl-10 pr-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 transition shadow-inner font-sans"
                      id="creatorEmail"
                      name="email"
                      placeholder="you@example.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase" htmlFor="creatorPassword">
                      Password
                    </label>
                    <Link className="text-xs font-medium text-brand-600 hover:text-brand-800 transition hover:underline" to="/forgot-password">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      autoComplete="current-password"
                      className="custom-input w-full pl-10 pr-12 py-3 bg-white/80 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 transition shadow-inner font-sans"
                      id="creatorPassword"
                      name="password"
                      placeholder="Enter your password"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Show / Hide Password Toggle Control */}
                    <button
                      aria-label="Show password"
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                      id="togglePasswordBtn"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" id="eyeIcon" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Remember Me & Security Context */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500 accent-brand-600 cursor-pointer"
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                    />
                    <span className="text-xs text-slate-600 font-medium">Remember my session for 30 days</span>
                  </label>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                    </svg>
                    <span>SSL 256-bit Encrypted</span>
                  </div>
                </div>

                {/* Primary Submit Button */}
                <div className="pt-2">
                  <button
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
                    id="submitBtn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                        </svg>
                        <span>Authenticating...</span>
                      </span>
                    ) : (
                      <>
                        <span id="btnText">Sign In to Creator Dashboard</span>
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" id="btnArrow" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="relative my-7">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                  <span className="bg-white/90 px-3 text-slate-400 font-medium rounded-full">New to Inomark?</span>
                </div>
              </div>

              {/* Creator Registration CTA Card */}
              <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-600 shadow-sm border border-brand-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Apply as an AI Creator</p>
                    <p className="text-[11px] text-slate-500">Free membership · Showcase portfolio · Get commissioned</p>
                  </div>
                </div>
                <Link
                  className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs hover:shadow transition flex items-center gap-1"
                  to="/creator/signup"
                >
                  <span>Sign Up</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </Link>
              </div>

              {/* Separation of Roles: Clear Brand Login Routing */}
              <div className="mt-6 pt-5 border-t border-slate-200/70 text-center">
                <p className="text-xs text-slate-500">
                  Looking to hire AI creators?
                  <Link className="font-semibold text-slate-800 hover:text-brand-600 underline transition ml-1" to="/brand/login">
                    Go to Brand Login →
                  </Link>
                </p>
              </div>
            </div>

            {/* Security & Legal Notice below form */}
            <p className="text-center text-[11px] text-slate-400 mt-4 px-4 leading-normal">
              By signing in, you agree to Inomark’s <Link className="underline hover:text-slate-600" to="/terms">Terms of Service</Link> and <Link className="underline hover:text-slate-600" to="/privacy">Privacy Policy</Link>. Creator accounts strictly route to the verified Creator Hub.
            </p>
          </div>

          {/* Right Column: Tasteful Creative Visual Showcase & Social Proof */}
          <div className="lg:col-span-6 hidden lg:flex flex-col justify-center">
            <div className="glass-panel rounded-3xl p-8 relative overflow-hidden hero-glow border-white/90">
              {/* Decorative Top Right Glass Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Live Creator Commissions</span>
                </div>
                <span className="text-xs font-medium text-brand-700 px-3 py-1 rounded-full bg-brand-100/70 border border-brand-200/50">
                  $46,800 Active Brief Pool
                </span>
              </div>

              {/* Featured AI Creator Artwork Montage */}
              <div className="space-y-4">
                {/* Hero Creative Showcase Card 1 */}
                <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                  <img
                    alt="Aura Botanical Dew - Generative Fluid Commercial"
                    className="w-full h-52 object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-500"
                    src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>
                  {/* Floating Overlay Tags */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="glass-chip px-2.5 py-1 rounded-md text-[10px] font-semibold text-white tracking-wide">
                      4K CINEMA · 60FPS
                    </span>
                    <span className="bg-brand-600/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      $4,200 Commission Won
                    </span>
                  </div>
                  {/* Artwork Caption & Creator Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2.5">
                      <img
                        alt="Elena Vance"
                        className="w-8 h-8 rounded-full border-2 border-white/80 object-cover"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                      />
                      <div>
                        <p className="text-xs font-bold leading-tight flex items-center gap-1">
                          Elena Vance
                          <svg className="w-3.5 h-3.5 text-brand-400 fill-current" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                          </svg>
                        </p>
                        <p className="text-[10px] text-slate-300">Aura Botanical Dew · Runway Gen-3 + FLUX.1</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-300 block">Commissioned by</span>
                      <span className="text-xs font-semibold text-brand-200">Aura Botanica</span>
                    </div>
                  </div>
                </div>

                {/* Two Mini Showcase Columns */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Mini Card 1 */}
                  <div className="p-3.5 rounded-2xl bg-white/70 border border-white/90 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        ✦
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Available Now</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800">Deterministic Pipelines</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Hand over ComfyUI node graphs, custom LoRA weights, and 8K master sequences.
                    </p>
                  </div>
                  {/* Mini Card 2 */}
                  <div className="p-3.5 rounded-2xl bg-white/70 border border-white/90 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                        🛡️
                      </div>
                      <span className="text-[10px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">Escrow Backed</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800">Protected Contracts</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Funds held in milestone escrow prior to project kickoff. 100% payout security.
                    </p>
                  </div>
                </div>

                {/* Active Brands Commissioning Right Now */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <span className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center text-[10px] font-bold border border-slate-900">AB</span>
                      <span className="w-7 h-7 rounded-full bg-violet-700 flex items-center justify-center text-[10px] font-bold border border-slate-900">LK</span>
                      <span className="w-7 h-7 rounded-full bg-amber-700 flex items-center justify-center text-[10px] font-bold border border-slate-900">VA</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold">18 Global Enterprise Brands</p>
                      <p className="text-[10px] text-slate-400">Currently reviewing pitches from verified AI directors</p>
                    </div>
                  </div>
                  <Link className="text-[11px] font-semibold text-brand-300 hover:text-white transition flex items-center gap-1" to="/creator/briefs">
                    Explore Briefs →
                  </Link>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
                </svg>
                <p className="text-xs text-slate-600 italic">
                  "Inomark connects our generative studio with brands who actually value deterministic node workflows and high-fidelity output."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="w-full px-6 lg:px-12 py-5 text-center text-xs text-slate-400 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} Inomark Global Technologies Inc. All rights reserved.</span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="text-brand-600 font-medium">Crafted for Human Imagination & Neural Fidelity</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 font-medium">
          <Link className="hover:text-brand-600 transition" to="/creator/briefs">Creator Guidelines</Link>
          <Link className="hover:text-brand-600 transition" to="/brand/creators">Brand Licensing</Link>
          <Link className="hover:text-brand-600 transition" to="/privacy">Privacy</Link>
          <Link className="hover:text-brand-600 transition" to="/terms">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
