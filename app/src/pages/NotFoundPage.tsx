import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-full bg-primary-fixed text-primary flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[32px]">explore_off</span>
      </div>
      <h1 className="font-display font-bold text-4xl text-slate-900 mb-3">404 — Page Not Found</h1>
      <p className="text-body-sm text-slate-600 max-w-md mb-8">
        The creative coordinate or showcase you requested does not exist or may have moved.
      </p>
      <div className="flex items-center gap-4">
        <Link to="/" className="btn btn-primary btn-sm">
          Return to Marketplace
        </Link>
        <Link to="/creator/login" className="btn btn-outline btn-sm">
          Creator Portal
        </Link>
      </div>
    </div>
  );
}
