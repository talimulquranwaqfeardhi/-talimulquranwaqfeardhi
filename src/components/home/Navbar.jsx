import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

console.log(logo);

const links = [
  { to: '/', label: 'Home' },
  { to: '/talim/tafsir', label: "Ta'lim Classes" },
  { to: '/ITQARegistration/student', label: 'ITQA Registration' },
  { to: '/huffaaz-db', label: 'Huffaaz DB' },
  { to: '/madrasatu-tahfiz', label: 'Madrasatu Tahfiz' },
  { to: '/waqf', label: 'Waqf-e-Ardhi' },
  { to: '/resources', label: 'Resources' },
];

const NavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`text-sm font-medium transition ${
      active ? 'text-emerald-900' : 'text-gray-700 hover:text-emerald-700'
    }`}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[#071312]/95 border-b border-slate-800 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.7)]' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Ta'limul Qur'an & Waqfe Ardhi Nigeria logo"
              className="h-10 w-10 rounded-full object-contain"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-emerald-900">Talim ul Quran</span>
              <span className="text-xs text-gray-500">Waqf Centre</span>
            </div>
            
          </Link>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                active={location.pathname === link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-md bg-amber-400 text-slate-950 text-sm font-semibold shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
            >
              Login
            </Link>

            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-md p-2 text-emerald-900 hover:bg-emerald-100 transition lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              {open ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 18L18 6M6 6l12 12" stroke="#065f46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="#065f46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`lg:hidden fixed inset-x-4 top-20 z-40 transform origin-top transition-all duration-300 ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="rounded-xl bg-[#071312]/95 backdrop-blur-lg shadow-2xl ring-1 ring-black/10 overflow-hidden">
          <div className="px-5 pt-6 pb-5">
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Ta'limul Qur'an & Waqfe Ardhi Nigeria logo"
                  className="h-9 w-9 rounded-full object-contain"
                />
                <span className="text-sm font-semibold text-emerald-900">Talim ul Quran</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-emerald-900 hover:bg-emerald-100 transition"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 18L18 6M6 6l12 12" stroke="#065f46" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <nav className="mt-6 grid gap-3">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition ${
                    location.pathname === link.to ? 'bg-emerald-50 text-emerald-900' : 'text-gray-700 hover:bg-emerald-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5 pt-5 border-t border-gray-100">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block w-full text-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-800 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;