import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/creator/login');
        }, 2000);
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Failed to update password');
    } finally {
      setLoading(false);
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
            <h1 className="text-2xl font-display font-bold text-slate-900 mb-2">Set New Password</h1>
            <p className="text-xs text-slate-500 mb-6">
              Please enter your new secure password below.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl text-xs bg-red-50 text-red-700 border border-red-200">
                {errorMsg}
              </div>
            )}

            {success ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs">
                <p className="font-bold mb-1">Password Updated Successfully</p>
                <p>Redirecting to login portal in a few seconds...</p>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    New Password (8+ characters)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-container transition"
                >
                  {loading ? 'Updating Password...' : 'Save New Password'}
                </button>
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
