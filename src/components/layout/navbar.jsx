import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BookOpenText, ChevronDown, Menu, X } from 'lucide-react';

const TALIM_ITEMS = [
  { label: "Tafsir al-Qur'an",   to: '/talim/tafsir'   },
  { label: "Tajweed & Qira'ah",  to: '/talim/tajweed'  },
  { label: "Tarjumat al-Qur'an", to: '/talim/tarjumat' },
];

const ITQA_ITEMS = [
  { label: 'Teacher Registration', to: '/ITQARegistration/teacher' },
  { label: 'Student Registration', to: '/ITQARegistration/student' },
  { label: 'Centre Locator',       to: '/ITQARegistration/centres' },
];

const SIMPLE_LINKS = [
  { label: 'Arabic',            to: '/arabic'           },
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
        className="flex items-center gap-0.5 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        {label}
        <ChevronDown
          strokeWidth={2.5}
          className={`ml-0.5 h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute left-0 top-[calc(100%+6px)] z-50 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-black/10 transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <div className="py-1.5">
          {items.map(({ label: l, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
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
  const [itqaOpen,    setItqaOpen]    = useState(false);

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
      ? 'rounded-md bg-emerald-900 px-3 py-1.5 text-sm font-semibold text-white'
      : 'rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900';

  const mobileLink = ({ isActive }) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-emerald-900 text-white'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-sm shadow-black/[0.06]' : ''
      }`}
    >
      {/* ── desktop bar ── */}
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-emerald-800">
            <BookOpenText className="h-[17px] w-[17px] text-white" strokeWidth={2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[13px] font-bold tracking-tight text-gray-900">
              Ta'lim-ul-Qur'an
            </span>
            <span className="mt-[2px] text-[10px] font-medium text-emerald-700">
              &amp; Waqf-e-Ardhi Dept.
            </span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          <NavLink to="/" end className={desktopLink}>
            Home
          </NavLink>

          <DropdownMenu label="Ta'lim Classes"    items={TALIM_ITEMS} />
          <DropdownMenu label="ITQA Registration" items={ITQA_ITEMS}  />

          {SIMPLE_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} className={desktopLink}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
        >
          {mobileOpen
            ? <X      className="h-5 w-5" strokeWidth={2} />
            : <Menu   className="h-5 w-5" strokeWidth={2} />}
        </button>
      </div>

      {/* ── mobile drawer ── */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-0.5 px-4 pb-4 pt-2">

          {/* home */}
          <NavLink to="/" end onClick={() => setMobileOpen(false)} className={mobileLink}>
            Home
          </NavLink>

          {/* ta'lim group */}
          <div className="pt-2">
            <button
              onClick={() => setTalimOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
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

          {/* itqa group */}
          <div>
            <button
              onClick={() => setItqaOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              ITQA Registration
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${itqaOpen ? 'rotate-180' : ''}`}
                strokeWidth={2.5}
              />
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${
                itqaOpen ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="ml-3 mt-0.5 space-y-0.5 border-l-2 border-emerald-100 pl-3">
                {ITQA_ITEMS.map(({ label, to }) => (
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