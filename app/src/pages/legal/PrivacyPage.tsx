import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">Privacy & Security</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2">
          Inomark Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 mt-2">Compliant with GDPR & California Consumer Privacy Act</p>
      </div>

      <div className="space-y-8 text-body-sm text-slate-700 leading-relaxed bg-white/70 p-8 rounded-3xl border border-slate-200">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Data Collection & Usage</h2>
          <p>
            Inomark collects account identification details (name, email, organization, contact info), creative portfolio assets, commission records, and encrypted billing information necessary to operate the marketplace. We do not sell your personal data or portfolio assets to third-party model training consortia without explicit opt-in licensing agreements.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Model Checkpoints & LoRA Confidentiality</h2>
          <p>
            Any private weights, LoRA files, or prompt text deposited into Inomark's secure brief storage remain strictly confidential between the Creator and the commissioning Brand. Inomark employs end-to-end access control policies to safeguard proprietary creative assets.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Storage & Infrastructure</h2>
          <p>
            All application data and authentication credentials are encrypted using industry-standard AES-256 protocols hosted on Supabase and PostgreSQL enterprise infrastructure.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
          <Link to="/" className="text-primary font-semibold text-xs hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home
          </Link>
          <Link to="/terms" className="text-slate-500 font-semibold text-xs hover:underline">
            View Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
