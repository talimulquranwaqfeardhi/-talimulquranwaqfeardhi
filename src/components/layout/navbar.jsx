import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const TALIM_ITEMS = [
  { label: "Tafsir al-Qur'an",   to: '/talim/tafsir'   },
  { label: "Tajweed & Qira'ah",  to: '/talim/tajweed'  },
  { label: "Tarjumat al-Qur'an", to: '/talim/tarjumat' },
];

const SIMPLE_LINKS = [
  { label: 'Hufaaz DB',        to: '/huffaaz-db'        },
  { label: 'Madrasatu Tahfiz', to: '/madrasatu-tahfiz' },
  { label: 'Waqf-e-Ardhi',    to: '/waqf'             },
  { label: 'Resources',        to: '/resources'         },
];

function DropdownMenu({ label, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
      >
        {label}
        <ChevronDown
          strokeWidth={2.5}
          className={`ml-1 h-4 w-4 text-slate-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute left-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-panel transition-all duration-250 ease-out ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100 scale-100'
            : 'pointer-events-none -translate-y-1 opacity-0 scale-[0.98]'
        }`}
      >
        <div className="py-1.5">
          {items.map(({ label: l, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2 text-sm text-gray-600 transition duration-200 ease-out hover:bg-emerald-50 hover:text-emerald-800"
            >
              {l}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [talimOpen,   setTalimOpen]   = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 4);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handle = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const desktopLink = ({ isActive }) =>
    isActive
      ? `relative inline-flex items-center rounded-full bg-emerald-950/95 px-4 py-2 text-sm font-semibold text-white shadow-button transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:rounded-full after:bg-emerald-400 after:transition-all after:duration-200 after:w-7 after:opacity-100`
      : `relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:rounded-full after:bg-emerald-400 after:transition-all after:duration-200 after:w-0 after:opacity-0 hover:after:w-6 hover:after:opacity-100`;

  const mobileLink = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
      isActive
        ? 'bg-emerald-50 text-emerald-900 shadow-soft ring-1 ring-emerald-100'
        : 'text-slate-700 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-emerald-900'
    }`;


  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-transparent bg-white/70 backdrop-blur-xl backdrop-saturate-150 transition duration-300 ease-out ${
        scrolled ? 'bg-white/95 border-slate-200/60 shadow-panel' : 'shadow-none'
      }`}
    >
      {/* ── desktop bar ── */}
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* logo */}
        <Link to="/" className="flex shrink-0 items-center gap-3 rounded-full px-2 transition duration-200 ease-out hover:-translate-y-0.5">
          <img
            src={logo}
            alt="Ta'limul Qur'an & Waqfe Ardhi Nigeria logo"
            className="h-[36px] w-[36px] rounded-full object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="text-[14px] font-semibold tracking-tight text-gray-900">
              Ta'lim-ul-Qur'an
            </span>
            <span className="mt-0.5 text-[11px] font-medium text-emerald-700">
              &amp; Waqf-e-Ardhi Dept.
            </span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1.5 lg:flex">
          <NavLink to="/" end className={desktopLink}>
            Home
          </NavLink>

          <NavLink to="/about" className={desktopLink}>
            About
          </NavLink>

          <DropdownMenu label="Ta'lim Classes" items={TALIM_ITEMS} />

          {SIMPLE_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} className={desktopLink}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* mobile menu toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-soft transition duration-200 ease-out hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-card lg:hidden"
        >
          {mobileOpen
            ? <X      className="h-5 w-5" strokeWidth={2} />
            : <Menu   className="h-5 w-5" strokeWidth={2} />}
        </button>
      </div>

      {/* ── mobile drawer ── */}
      <div
        className={`overflow-hidden border-t border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-panel transition-[max-height,opacity,transform] duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'max-h-[calc(100vh-80px)] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1'
        }`}
      >
        <div className="space-y-1.5 px-5 pb-4 pt-3 overflow-y-auto max-h-[calc(100vh-80px)]">

          {/* home */}
          <NavLink to="/" end onClick={() => setMobileOpen(false)} className={mobileLink}>
            Home
          </NavLink>

          {/* about */}
          <NavLink to="/about" onClick={() => setMobileOpen(false)} className={mobileLink}>
            About
          </NavLink>

          {/* ta'lim group */}
          <div className="pt-2">
            <button
              onClick={() => setTalimOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-gray-100"
            >
              Ta'lim Classes
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${talimOpen ? 'rotate-180' : ''}`}
                strokeWidth={2.5}
              />
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${
                talimOpen ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="ml-3 mt-0.5 space-y-0.5 border-l-2 border-emerald-100 pl-3">
                {TALIM_ITEMS.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-2 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* simple links */}
          <div className="border-t border-gray-100 pt-2">
            {SIMPLE_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={mobileLink}
              >
                {label}
              </NavLink>
            ))}
          </div>

        </div>
      </div>
    </header>
  );
}