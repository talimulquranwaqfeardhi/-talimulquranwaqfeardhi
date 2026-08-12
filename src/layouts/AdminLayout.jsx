import { Outlet, Link, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { LayoutList, ShieldCheck, Menu, X, Home } from 'lucide-react';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';

const SIDEBAR_LINKS = [
  { label: 'Dashboard', to: '/admin/talim', icon: LayoutList },
  { label: 'Waqfe Ardhi', to: '/admin/waqfe-ardhi', icon: ShieldCheck },
];

export default function AdminLayout() {
  const location = useLocation();
  useRevealOnScroll(location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-3 text-lg font-semibold text-slate-900">
            <Home className="h-5 w-5 text-emerald-700" />
            Admin Portal
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Menu
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 lg:block ${mobileOpen ? 'block' : 'hidden'}`}>
          <div className="mb-8 flex items-center gap-3 rounded-3xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
            <ShieldCheck className="h-5 w-5" />
            Waqf + Talim Admin
          </div>
          <nav className="space-y-2">
            {SIDEBAR_LINKS.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${activePath === to ? 'bg-emerald-100 text-emerald-900' : 'text-slate-700 hover:bg-slate-100'}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Role-based access</p>
            <p className="mt-2">This portal is only available to authenticated department coordinators and Jama’at administration users.</p>
          </div>
        </aside>

        <main className="space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
