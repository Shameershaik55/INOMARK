import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Legal Documentation</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2">
          Terms of Service & Commissioning Standards
        </h1>
        <p className="text-xs text-slate-500 mt-2">Last updated: October 2026 · Inomark Commercial Governance</p>
      </div>

      <div className="space-y-8 text-body-sm text-slate-700 leading-relaxed bg-white/70 p-8 rounded-3xl border border-slate-200">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. The Inomark Marketplace Service</h2>
          <p>
            Inomark operates a curated double-sided creative marketplace connecting verified generative AI directors ("Creators") with enterprise corporate entities and consumer brands ("Brands"). Inomark facilitates escrow deposits, milestone verification, commercial rights licensing, and dispute mediation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Intellectual Property & Commercial AI Rights</h2>
          <p>
            All deliverables produced under an active Inomark Brief transfer full commercial buyout rights to the Commissioning Brand upon release of final milestone escrow payment. Creators warrant that their generative workflow pipelines (including model checkpoints, ControlNet passes, and prompt matrices) comply with commercial safety guidelines and do not intentionally infringe registered third-party trademarks or proprietary likenesses without explicit written consent.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Milestone Escrow & Payment Guarantees</h2>
          <p>
            Brands agree that upon brief acceptance, 100% of the agreed project fee is held in Inomark's secure escrow custody. Funds are released progressively according to the stated milestone schedule (e.g. Concept Boards 25%, Motion First Cut 35%, Final 4K Master Delivery 40%). Inomark guarantees compensation for approved stages.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Quality & Resolution Specifications</h2>
          <p>
            Deliverables submitted by Creators must conform to the agreed technical specifications (e.g., Apple ProRes 422HQ, 3840x2160 UHD minimum, standard Rec.709 color space, uncompressed audio). Low-resolution, temporal-flickering, or corrupted exports are subject to standard 7-day revision cycles.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
          <Link to="/" className="text-primary font-semibold text-xs hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home
          </Link>
          <Link to="/privacy" className="text-slate-500 font-semibold text-xs hover:underline">
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
