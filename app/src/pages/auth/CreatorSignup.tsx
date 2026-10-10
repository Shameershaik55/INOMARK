import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function CreatorSignup() {
  const navigate = useNavigate();
  const { loginAsDemo, signUp } = useAuth();

  const [fullName, setFullName] = useState('Elena Vance');
  const [email, setEmail] = useState('elena.vance@studio.ai');
  const [password, setPassword] = useState('CreatorSecure2025!');
  const [confirmPassword, setConfirmPassword] = useState('CreatorSecure2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeState, setActiveState] = useState<'default' | 'errors' | 'loading' | 'verify' | 'welcome'>('default');

  const handleStateToggle = (state: 'default' | 'errors' | 'loading' | 'verify' | 'welcome') => {
    setActiveState(state);
    if (state === 'default') {
      setErrorMsg(null);
      setLoading(false);
    } else if (state === 'errors') {
      setErrorMsg('Please correct highlighted fields: enter a valid email and matching passwords.');
      setLoading(false);
    } else if (state === 'loading') {
      setErrorMsg(null);
      setLoading(true);
    } else if (state === 'verify' || state === 'welcome') {
      setErrorMsg(null);
      setLoading(false);
      loginAsDemo('creator');
      navigate('/creator/dashboard');
    }
  };

  const calculateStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9!@#$%^&*]/.test(password)) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    return score;
  };

  const strength = calculateStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name or creator alias.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (!acceptTerms) {
      setErrorMsg('You must agree to the Terms of Service and Privacy Policy to create an account.');
      return;
    }

    setLoading(true);
    try {
      if (email.toLowerCase().includes('elena') || email.toLowerCase().includes('demo')) {
        setTimeout(() => {
          loginAsDemo('creator');
          navigate('/creator/dashboard');
        }, 500);
      } else {
        const { error } = await signUp(email, password, 'creator', { full_name: fullName });
        if (error) {
          if (error.message.toLowerCase().includes('rate limit')) {
            setErrorMsg('Supabase email rate limit reached (free project tier default is 3-4 confirmation emails/hr). You can proceed directly into your workspace below.');
          } else {
            setErrorMsg(error.message);
          }
          setLoading(false);
        } else {
          loginAsDemo('creator');
          navigate('/creator/dashboard');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during registration.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased relative selection:bg-secondary-fixed selection:text-on-secondary-fixed flex flex-col justify-between">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-primary-fixed-dim/20 blur-[130px]"></div>
        <div className="absolute top-[15%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-secondary-fixed/25 blur-[140px]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-tertiary-fixed/20 blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-gutter-mobile md:px-margin flex items-center justify-between">
          <Link className="group flex items-center gap-space-sm" to="/">
            <span className="font-headline-md text-headline-md font-semibold tracking-tight text-on-surface group-hover:text-primary transition-colors">
              Inomark
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed-variant font-label-badge text-label-badge tracking-wider uppercase font-semibold">
              <span className="material-symbols-outlined text-[13px] leading-none text-primary">auto_awesome</span>
              Creator Hub
            </span>
          </Link>
          <div className="flex items-center gap-space-md md:gap-space-lg">
            <nav className="hidden sm:flex items-center">
              <Link
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors py-2 px-3 rounded-full flex items-center gap-1.5"
                to="/creator/login"
              >
                <span>Already have an account?</span>
                <span className="font-semibold text-primary underline underline-offset-4 hover:text-on-primary-fixed-variant">Sign In</span>
              </Link>
            </nav>
            <Link
              className="inline-flex items-center justify-center font-label-button text-label-button px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface shadow-[0_4px_20px_-2px_rgba(99,102,241,0.06)] hover:bg-surface-container-high hover:text-on-surface transition-all"
              to="/brand/signup"
            >
              Joining as a brand? Create a Brand Account
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full flex-1 pt-20 flex flex-col justify-center">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-7xl mx-auto px-gutter-mobile md:px-margin py-space-xl flex flex-col gap-space-xl">
            {/* Interactive Simulation Controller */}
            <section className="w-full">
              <div className="bg-surface-container-low/90 backdrop-blur-md rounded-2xl p-space-sm md:p-space-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-sm md:gap-space-md">
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-badge text-label-badge uppercase tracking-wider">
                  <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
                  <span>Simulation Mode:</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2" id="state-toggles">
                  <button
                    className={`state-btn px-3.5 py-1.5 rounded-full font-label-badge text-label-badge tracking-wider uppercase transition-all flex items-center gap-1.5 ${activeState === 'default' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container hover:bg-surface-container-highest text-on-surface-variant'}`}
                    onClick={() => handleStateToggle('default')}
                    type="button"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    Default Form
                  </button>
                  <button
                    className={`state-btn px-3.5 py-1.5 rounded-full font-label-badge text-label-badge tracking-wider uppercase transition-all flex items-center gap-1.5 ${activeState === 'errors' ? 'bg-error text-on-error shadow-sm' : 'bg-surface-container hover:bg-surface-container-highest text-on-surface-variant'}`}
                    onClick={() => handleStateToggle('errors')}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    Validation Errors
                  </button>
                  <button
                    className={`state-btn px-3.5 py-1.5 rounded-full font-label-badge text-label-badge tracking-wider uppercase transition-all flex items-center gap-1.5 ${activeState === 'loading' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container hover:bg-surface-container-highest text-on-surface-variant'}`}
                    onClick={() => handleStateToggle('loading')}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">sync</span>
                    Loading State
                  </button>
                  <button
                    className="state-btn px-3.5 py-1.5 rounded-full font-label-badge text-label-badge tracking-wider uppercase transition-all bg-surface-container hover:bg-surface-container-highest text-on-surface-variant flex items-center gap-1.5"
                    onClick={() => handleStateToggle('welcome')}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                    Instant Access
                  </button>
                </div>
              </div>
            </section>

            {/* Main 2-Column Responsive Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-start relative">
              {/* Left Column: Registration Form Container */}
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="relative bg-surface-container-lowest/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none"></div>

                  {/* Eyebrow Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-space-sm mb-space-sm">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-badge text-label-badge tracking-wider uppercase">
                      <span className="material-symbols-outlined text-[14px] text-secondary">brush</span>
                      Creator Registration
                    </span>
                    <span className="font-label-caption text-label-caption text-on-surface-variant hidden sm:inline-block">
                      Tier 1 • AI Artists & Directors
                    </span>
                  </div>

                  {/* Heading Block */}
                  <div className="relative z-10 mb-space-lg">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface">
                      Join Inomark as a <span className="italic text-secondary font-display-hero">Creator</span>
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
                      Showcase your neural artistry, get matched with tier-one global brands, and monetize deterministic generative workflows under protected milestone escrows.
                    </p>
                  </div>

                  {/* Global Alert Container */}
                  {errorMsg && (
                    <div className="relative z-10 mb-6 p-4 rounded-2xl bg-error-container text-on-error-container flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[20px] text-error shrink-0 mt-0.5">error</span>
                        <p className="font-body-sm text-body-sm text-on-error-container/90">{errorMsg}</p>
                      </div>
                      {errorMsg.toLowerCase().includes('rate limit') && (
                        <button
                          type="button"
                          onClick={() => {
                            loginAsDemo('creator');
                            navigate('/creator/dashboard');
                          }}
                          className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-white text-xs font-semibold hover:bg-secondary/90 transition-all shadow-xs cursor-pointer"
                        >
                          <span>Proceed to Creator Workspace Directly</span>
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Registration Form */}
                  <form className="relative z-10 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                    {/* Field 1: Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5" htmlFor="full-name">
                          <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                          Full Name
                        </label>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          className="w-full h-12 px-4 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
                          id="full-name"
                          name="fullName"
                          placeholder="Elena Vance"
                          required
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Field 2: Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5" htmlFor="email-address">
                          <span className="material-symbols-outlined text-[16px] text-primary">alternate_email</span>
                          Email Address
                        </label>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          className="w-full h-12 px-4 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
                          id="email-address"
                          name="email"
                          placeholder="elena.vance@studio.ai"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <p className="font-label-caption text-label-caption text-on-surface-variant/80 pl-2">
                        We'll deliver milestone contracts & portfolio invitations here.
                      </p>
                    </div>

                    {/* Field 3: Create Password */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5" htmlFor="password">
                          <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                          Create Password
                        </label>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          className="w-full h-12 pl-4 pr-12 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
                          id="password"
                          name="password"
                          placeholder="••••••••••••"
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          aria-label="Toggle password visibility"
                          className="absolute right-3.5 p-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
                          id="toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px] align-middle">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>

                      {/* Real-time Password Strength Meter */}
                      <div className="mt-2 p-3 bg-surface-container-low/70 rounded-2xl flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-caption text-label-caption text-on-surface-variant">Complexity Level:</span>
                          <span className={`font-label-badge text-label-badge tracking-wider uppercase ${strength >= 3 ? 'text-emerald-600 font-bold' : strength >= 2 ? 'text-amber-600 font-bold' : 'text-on-surface-variant'}`}>
                            {strength >= 3 ? 'Strong' : strength >= 2 ? 'Moderate' : 'Basic'}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 h-1.5 w-full">
                          <div className={`rounded-full transition-colors duration-300 ${strength >= 1 ? 'bg-secondary' : 'bg-outline-variant/40'}`}></div>
                          <div className={`rounded-full transition-colors duration-300 ${strength >= 2 ? 'bg-secondary' : 'bg-outline-variant/40'}`}></div>
                          <div className={`rounded-full transition-colors duration-300 ${strength >= 3 ? 'bg-secondary' : 'bg-outline-variant/40'}`}></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
                          <div className="flex items-center gap-1 font-label-caption text-label-caption text-on-surface-variant">
                            <span className={`material-symbols-outlined text-[15px] ${password.length >= 8 ? 'text-secondary font-bold' : 'text-outline'}`}>
                              {password.length >= 8 ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            <span>8+ characters</span>
                          </div>
                          <div className="flex items-center gap-1 font-label-caption text-label-caption text-on-surface-variant">
                            <span className={`material-symbols-outlined text-[15px] ${/[0-9!@#$%^&*]/.test(password) ? 'text-secondary font-bold' : 'text-outline'}`}>
                              {/[0-9!@#$%^&*]/.test(password) ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            <span>Number & symbol</span>
                          </div>
                          <div className="flex items-center gap-1 font-label-caption text-label-caption text-on-surface-variant">
                            <span className={`material-symbols-outlined text-[15px] ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-secondary font-bold' : 'text-outline'}`}>
                              {/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            <span>Upper & lower case</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Field 4: Confirm Password */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-label-badge text-label-badge uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5" htmlFor="confirm-password">
                          <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                          Confirm Password
                        </label>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          className="w-full h-12 pl-4 pr-12 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
                          id="confirm-password"
                          name="confirmPassword"
                          placeholder="••••••••••••"
                          required
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          aria-label="Toggle password confirmation visibility"
                          className="absolute right-3.5 p-1 rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
                          id="toggle-confirm"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px] align-middle">
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Terms & Privacy Agreement Checkbox */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="mt-1 h-5 w-5 rounded-lg text-primary focus:ring-primary/30 accent-primary cursor-pointer"
                          id="terms-checkbox"
                          name="acceptTerms"
                          required
                          type="checkbox"
                        />
                        <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          I agree to Inomark's{' '}
                          <Link className="text-primary hover:text-on-primary-fixed-variant underline underline-offset-4 font-semibold" to="/terms">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link className="text-primary hover:text-on-primary-fixed-variant underline underline-offset-4 font-semibold" to="/privacy">
                            Privacy Policy
                          </Link>.
                        </span>
                      </label>
                      <div className="pl-8 flex items-center gap-1.5 text-on-surface-variant/70 font-label-caption text-label-caption">
                        <span className="material-symbols-outlined text-[14px] text-secondary">info</span>
                        <span>Creator accounts strictly route to Creator Hub. No corporate talent buying permissions.</span>
                      </div>
                    </div>

                    {/* Primary Action Button */}
                    <div className="pt-2">
                      <button
                        className="group w-full h-14 rounded-full bg-primary text-on-primary font-label-button text-label-button shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                        id="submit-btn"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                            </svg>
                            <span>Creating creator account...</span>
                          </span>
                        ) : (
                          <>
                            <span id="btn-text">Create Creator Account</span>
                            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform" id="btn-arrow">
                              arrow_forward
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Split Switcher Box */}
                  <div className="relative z-10 mt-8 pt-6 bg-surface-container-low/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 lg:-mx-10 lg:-mb-10 px-6 sm:px-8 lg:px-10 py-5 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Already have a creator profile?</p>
                      <Link
                        className="font-label-button text-label-button text-primary hover:text-on-primary-fixed-variant flex items-center justify-center sm:justify-start gap-1 font-semibold"
                        to="/creator/login"
                      >
                        Sign in to Creator Hub →
                      </Link>
                    </div>
                    <Link
                      className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-label-caption text-label-caption transition-colors"
                      to="/brand/signup"
                    >
                      Brand / Agency Sign Up
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Value Proposition */}
              <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-28">
                <div className="bg-surface-container-lowest/80 backdrop-blur-xl p-space-lg md:p-space-xl rounded-3xl shadow-sm flex flex-col gap-space-md border border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
                    <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">Curated Creator Benefits</span>
                  </div>
                  <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant">
                    <li className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                      <span>Showcase high-res diffusion portfolios with deterministic node graphs.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                      <span>Direct commissioning briefs from verified global luxury, fashion, and tech brands.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                      <span>100% escrow funded milestones — zero unpaid spec work or delayed invoices.</span>
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
          <span className="text-secondary font-medium">Curated AI Commercial Talent</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 font-medium">
          <Link className="hover:text-primary transition" to="/creator/login">Creator Portal</Link>
          <Link className="hover:text-primary transition" to="/brand/login">Brand Portal</Link>
          <Link className="hover:text-primary transition" to="/terms">Terms</Link>
          <Link className="hover:text-primary transition" to="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
