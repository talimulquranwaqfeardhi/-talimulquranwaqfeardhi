import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Search,
  Phone,
  Mail,
  Users,
  Building2,
  ArrowRight,
  Filter,
  ChevronDown,
//   Loader2,
  AlertCircle,
  X,
} from 'lucide-react';
import { getCentres } from '../../services/itqaService';

/* ─── static data ─────────────────────────────────────────── */
const NIGERIAN_STATES = [
  'Abuja (FCT)', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

const CENTRE_TYPES = ['All Types', 'Tahfiz School', 'Madrasa', 'Community Centre', 'Online'];

/* ─── fallback sample data (shown while Supabase table is empty) ── */
const SAMPLE_CENTRES = [
  {
    id: '1', name: 'National Secretariat Centre', state: 'Abuja (FCT)', lga: 'Municipal Area Council',
    address: 'National Mosque Complex, Central Area, Abuja', phone: '+234 800 000 0001',
    email: 'abuja@talimquran.org', capacity: 120, type: 'Madrasa', is_active: true,
  },
  {
    id: '2', name: 'Kano North Teaching Centre', state: 'Kano', lga: 'Kano Municipal',
    address: '14 Emir Road, Kano City, Kano State', phone: '+234 800 000 0002',
    email: 'kano@talimquran.org', capacity: 80, type: 'Tahfiz School', is_active: true,
  },
  {
    id: '3', name: 'Lagos Island Learning Hub', state: 'Lagos', lga: 'Lagos Island',
    address: '7 Broad Street, Lagos Island, Lagos State', phone: '+234 800 000 0003',
    email: 'lagos@talimquran.org', capacity: 60, type: 'Community Centre', is_active: true,
  },
  {
    id: '4', name: 'Kaduna Central Tahfiz', state: 'Kaduna', lga: 'Kaduna North',
    address: '22 Independence Way, Kaduna', phone: '+234 800 000 0004',
    email: 'kaduna@talimquran.org', capacity: 100, type: 'Tahfiz School', is_active: true,
  },
  {
    id: '5', name: 'Sokoto Quranic Institute', state: 'Sokoto', lga: 'Sokoto North',
    address: 'Sultan Abubakar Road, Sokoto', phone: '+234 800 000 0005',
    email: 'sokoto@talimquran.org', capacity: 90, type: 'Madrasa', is_active: true,
  },
  {
    id: '6', name: 'Online Learning Centre', state: 'Abuja (FCT)', lga: 'Nationwide',
    address: 'Virtual — Zoom-based classes', phone: '+234 800 000 0006',
    email: 'online@talimquran.org', capacity: 500, type: 'Online', is_active: true,
  },
];

/* ─── sub-components ─────────────────────────────────────────── */
const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100';

const typeColors = {
  'Tahfiz School':    { bg: 'bg-emerald-50',  text: 'text-emerald-700',  border: 'border-emerald-200'  },
  'Madrasa':          { bg: 'bg-amber-50',    text: 'text-amber-700',    border: 'border-amber-200'    },
  'Community Centre': { bg: 'bg-blue-50',     text: 'text-blue-700',     border: 'border-blue-200'     },
  'Online':           { bg: 'bg-purple-50',   text: 'text-purple-700',   border: 'border-purple-200'   },
};

function TypeBadge({ type }) {
  const c = typeColors[type] ?? { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${c.bg} ${c.text} ${c.border}`}>
      {type}
    </span>
  );
}

function CentreCard({ centre }) {
  const isOnline = centre.type === 'Online';
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      {/* top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />

      <div className="flex flex-1 flex-col p-6">
        {/* header row */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
            <Building2 className="h-5 w-5 text-emerald-700" strokeWidth={2} />
          </div>
          <TypeBadge type={centre.type} />
        </div>

        {/* name */}
        <h3 className="mb-1 text-base font-extrabold leading-snug text-gray-900">
          {centre.name}
        </h3>

        {/* location */}
        <div className="mb-4 flex items-start gap-1.5 text-xs text-gray-500">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
          <span>
            {centre.lga}, {centre.state}
          </span>
        </div>

        {/* address */}
        {!isOnline && (
          <p className="mb-4 text-xs leading-relaxed text-gray-500">{centre.address}</p>
        )}
        {isOnline && (
          <p className="mb-4 text-xs leading-relaxed text-emerald-700 font-medium">
            Virtual classes — accessible from anywhere in Nigeria
          </p>
        )}

        {/* capacity */}
        {centre.capacity && (
          <div className="mb-4 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">
              Capacity: <span className="font-semibold text-gray-700">{centre.capacity}</span> students
            </span>
          </div>
        )}

        {/* divider */}
        <div className="mb-4 h-px w-full bg-gray-100" />

        {/* contact */}
        <div className="space-y-2">
          {centre.phone && (
  <a
    href={`tel:${centre.phone}`}
    className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-emerald-700"
  >
    <Phone className="h-3.5 w-3.5 shrink-0" />
    {centre.phone}
  </a>
)}
          {centre.email && (
  <a
    href={`mailto:${centre.email}`}
    className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-emerald-700"
  >
    <Mail className="h-3.5 w-3.5 shrink-0" />
    {centre.email}
  </a>
)}
        </div>

        {/* cta */}
        <Link
          to="/ITQARegistration/student"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition-colors duration-200 hover:text-emerald-900"
        >
          Register at this centre
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-100" />
            <div className="h-5 w-24 animate-pulse rounded-full bg-gray-100" />
          </div>
          <div className="mb-2 h-4 w-3/4 animate-pulse rounded-lg bg-gray-100" />
          <div className="mb-4 h-3 w-1/2 animate-pulse rounded-lg bg-gray-100" />
          <div className="mb-1 h-3 w-full animate-pulse rounded-lg bg-gray-100" />
          <div className="h-3 w-2/3 animate-pulse rounded-lg bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 px-8 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
        <MapPin className="h-7 w-7 text-gray-400" />
      </div>
      <h3 className="text-lg font-extrabold text-gray-900">No centres found</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        No ITQA centres match your current filters. Try adjusting your search or clearing the
        filters to see all centres.
      </p>
      <button
        onClick={onClear}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-emerald-700 px-5 py-2.5 text-sm font-bold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white"
      >
        Clear All Filters
      </button>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-red-100 bg-red-50 px-8 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
        <AlertCircle className="h-7 w-7 text-red-500" />
      </div>
      <h3 className="text-lg font-extrabold text-gray-900">Could not load centres</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        There was a problem fetching centre data. Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-emerald-800"
      >
        Try Again
      </button>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function CentreLocatorPage() {
  const [centres, setCentres]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [search, setSearch]         = useState('');
  const [stateFilter, setStateFilter]   = useState('');
  const [lgaFilter, setLgaFilter]       = useState('');
  const [typeFilter, setTypeFilter]     = useState('All Types');
  const [filtersOpen, setFiltersOpen]   = useState(false);

  async function fetchCentres() {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await getCentres();
      // Fall back to sample data if table is empty (development / fresh project)
      setCentres(data.length > 0 ? data : SAMPLE_CENTRES);
    } catch {
      // Show sample data so the page isn't blank during development
      setCentres(SAMPLE_CENTRES);
      setFetchError('Could not reach the database. Showing sample data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchCentres(); }, []);

  const filtered = useMemo(() => {
    return centres.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.lga?.toLowerCase().includes(q) ||
        c.address?.toLowerCase().includes(q);
      const matchState = !stateFilter || c.state === stateFilter;
      const matchLga   = !lgaFilter   || c.lga?.toLowerCase().includes(lgaFilter.toLowerCase());
      const matchType  = typeFilter === 'All Types' || c.type === typeFilter;
      return matchSearch && matchState && matchLga && matchType;
    });
  }, [centres, search, stateFilter, lgaFilter, typeFilter]);

  const hasFilters = search || stateFilter || lgaFilter || typeFilter !== 'All Types';

  function clearFilters() {
    setSearch('');
    setStateFilter('');
    setLgaFilter('');
    setTypeFilter('All Types');
  }

  return (
    <div className="bg-white">

      {/* ══════════════════ HERO BANNER ══════════════════ */}
      <section className="relative overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />

        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 -translate-y-1/3 rounded-full bg-amber-500/10 blur-3xl" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 text-[18rem] font-black leading-none text-white/[0.025] select-none">
          م
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          {/* breadcrumb */}
          {/* <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300">Home</Link>
            <span className="text-emerald-600">/</span>
            <span className="text-emerald-300">ITQA Registration</span>
            <span className="text-emerald-600">/</span>
            <span className="text-white">Centre Locator</span>
          </div> */}

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Find a Centre Near You
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              ITQA Centre Locator
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              Find a registered ITQA teaching centre in your state. Search by name, location,
              or centre type — then register directly from this page.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/ITQARegistration/student"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              >
                Register as Student
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/ITQARegistration/teacher"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Register as Teacher
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SEARCH + FILTERS ══════════════════ */}
      <section className="sticky top-[60px] z-30 border-b border-gray-100 bg-white py-4 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

            {/* search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, state, or address…"
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* filter toggle (mobile) */}
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-emerald-200 hover:text-emerald-700 sm:hidden"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasFilters && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-700 text-[9px] font-bold text-white">
                  !
                </span>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* desktop filters */}
            <div className="hidden items-center gap-3 sm:flex">
              <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className={`${inputClass} w-44`}>
                <option value="">All States</option>
                {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>

              <input
                type="text"
                value={lgaFilter}
                onChange={(e) => setLgaFilter(e.target.value)}
                placeholder="Filter by LGA…"
                className={`${inputClass} w-40`}
              />

              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={`${inputClass} w-44`}>
                {CENTRE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>

              {hasFilters && (
                <button onClick={clearFilters} className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-red-500">
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* mobile filters dropdown */}
          <div className={`grid transition-all duration-300 ease-in-out sm:hidden ${filtersOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="mt-3 grid gap-3">
                <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className={inputClass}>
                  <option value="">All States</option>
                  {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input type="text" value={lgaFilter} onChange={(e) => setLgaFilter(e.target.value)} placeholder="Filter by LGA…" className={inputClass} />
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={inputClass}>
                  {CENTRE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {hasFilters && (
                  <button onClick={clearFilters} className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600">
                    <X className="h-4 w-4" />
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ RESULTS ══════════════════ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* results header */}
          {!loading && !fetchError && (
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {filtered.length === 0
                  ? 'No centres match your search.'
                  : <>Showing <span className="font-bold text-gray-900">{filtered.length}</span> {filtered.length === 1 ? 'centre' : 'centres'}{stateFilter ? ` in ${stateFilter}` : ''}</>}
              </p>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs font-semibold text-emerald-700 hover:underline">
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* soft error notice (sample data fallback) */}
          {fetchError && (
            <div className="mb-8 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
              <p className="text-xs font-medium text-amber-700">{fetchError}</p>
            </div>
          )}

          {/* content states */}
          {loading ? (
            <LoadingGrid />
          ) : filtered.length === 0 ? (
            <EmptyState onClear={clearFilters} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((centre) => (
                <CentreCard key={centre.id} centre={centre} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ CONTACT / ADD CENTRE ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">

            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
                <Phone className="h-5 w-5 text-emerald-700" strokeWidth={2} />
              </div>
              <h3 className="mb-1 text-sm font-extrabold text-gray-900">Call Us</h3>
              <p className="mb-3 text-xs leading-relaxed text-gray-500">Speak directly with our registration office, Monday – Friday, 9am – 5pm WAT.</p>
              <a href="tel:+2348000000000" className="text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900">
                +234 800 000 0000
              </a>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
                <Mail className="h-5 w-5 text-emerald-700" strokeWidth={2} />
              </div>
              <h3 className="mb-1 text-sm font-extrabold text-gray-900">Email Us</h3>
              <p className="mb-3 text-xs leading-relaxed text-gray-500">Send your query or document to our registration team and receive a response within 2 working days.</p>
              <a href="mailto:itqa@talimquran.org" className="text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900">
                itqa@talimquran.org
              </a>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 transition-transform duration-300 group-hover:scale-105">
                <Building2 className="h-5 w-5 text-amber-600" strokeWidth={2} />
              </div>
              <h3 className="mb-1 text-sm font-extrabold text-gray-900">List Your Centre</h3>
              <p className="mb-3 text-xs leading-relaxed text-gray-500">Run a Tahfiz school or Madrasa? Apply to become a registered ITQA centre and appear in this directory.</p>
              <Link to="/ITQARegistration/teacher" className="text-sm font-bold text-amber-600 transition-colors hover:text-amber-800">
                Apply to register →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 px-8 py-16 text-center shadow-xl shadow-emerald-900/20 sm:px-16">
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-400/10 blur-2xl" />

            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Found Your Centre?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-200/90 sm:text-base">
              Register as a student or teacher today — free, fast, and open to everyone across
              Nigeria.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/ITQARegistration/student"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              >
                Register as Student
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/ITQARegistration/teacher"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Register as Teacher
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}