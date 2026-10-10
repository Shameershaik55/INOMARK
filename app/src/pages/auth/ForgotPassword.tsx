import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes('rate limit')) {
        setErrorMsg('Supabase email rate limit exceeded (free-tier default allows 3-4 emails/hr). Please wait a bit or test with the demo login.');
      } else {
        setErrorMsg(error.message);
      }
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800 antialiased flex flex-col justify-between">
      <header className="w-full px-6 lg:px-12 py-5 flex items-center justify-between z-20">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-slate-900">INOMARK</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto">
          <div className="glass-frosted rounded-3xl p-8 shadow-2xl bg-white/85 border border-white">
            <h1 className="text-2xl font-display font-bold text-slate-900 mb-2">Reset Password</h1>
            <p className="text-xs text-slate-500 mb-6">
              Enter your registered email address and we'll send a secure password reset link.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl text-xs bg-red-50 text-red-700 border border-red-200">
                {errorMsg}
              </div>
            )}

            {success ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs">
                <p className="font-bold mb-1">Recovery Email Dispatched</p>
                <p>If an account exists for {email}, a password reset link has been dispatched to your inbox.</p>
                <div className="mt-4">
                  <Link to="/creator/login" className="font-semibold text-primary underline">
                    Return to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-container transition"
                >
                  {loading ? 'Sending link...' : 'Send Recovery Link'}
                </button>

                <div className="text-center pt-2">
                  <Link to="/creator/login" className="text-xs text-slate-500 hover:text-slate-800">
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Inomark Inc.
      </footer>
    </div>
  );
}
