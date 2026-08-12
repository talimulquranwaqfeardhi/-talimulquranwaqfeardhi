import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import heroImage from '@/assets/background-image.jpeg';
import {
  Search,
  Filter,
  MapPin,
  Building2,
  Users,
  BookOpen,
  Loader2,
  AlertCircle,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  X,
} from 'lucide-react';

const SEARCH_CATEGORIES = [
  {
    id: 'centres',
    label: "Qur'an Centres",
    icon: Building2,
    tableEnv: 'VITE_SUPABASE_MADRASAS_TABLE',
    defaultTable: 'madrasas',
    typeKey: 'type',
    locationKeys: ['state', 'lga', 'location', 'address'],
    titleKey: 'name',
    subtitleKey: 'status',
    detailKeys: ['type', 'state', 'lga', 'programmes'],
    placeholder: 'Search by centre name, location, or programme…',
  },
  {
    id: 'teachers',
    label: 'Teachers',
    icon: Users,
    tableEnv: 'VITE_SUPABASE_TEACHERS_TABLE',
    defaultTable: 'teachers',
    typeKey: 'specialization',
    locationKeys: ['state', 'location', 'city', 'lga'],
    titleKey: 'name',
    subtitleKey: 'title',
    detailKeys: ['specialization', 'availability', 'experience'],
    placeholder: 'Search by teacher name, specialization, or state…',
  },
  {
    id: 'opportunities',
    label: 'Learning Opportunities',
    icon: BookOpen,
    tableEnv: 'VITE_SUPABASE_LEARNING_OPPORTUNITIES_TABLE',
    defaultTable: 'learning_opportunities',
    typeKey: 'type',
    locationKeys: ['location', 'state', 'venue', 'city'],
    titleKey: 'title',
    subtitleKey: 'status',
    detailKeys: ['type', 'location', 'category', 'summary'],
    placeholder: 'Search by opportunity title, location, or category…',
  },
];

const inputClass =
  'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100';

const hasBackend = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

function FilterField({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function EmptyState({ onReset, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-8 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white shadow-sm">
        <Search className="h-6 w-6 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No {label} matched your search</h3>
      <p className="max-w-md text-sm leading-6 text-slate-600">
        Adjust your query or filters to broaden the results. If your category is not available yet, check back after the next data refresh.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-700 hover:text-white"
      >
        Reset filters
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6">
          <div className="mb-4 h-4 w-28 rounded-full bg-slate-200" />
          <div className="mb-6 h-3 w-20 rounded-full bg-slate-200" />
          <div className="grid gap-3">
            <div className="h-3 w-full rounded-full bg-slate-200" />
            <div className="h-3 w-4/5 rounded-full bg-slate-200" />
            <div className="h-3 w-3/4 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-3xl border border-rose-100 bg-rose-50 p-6 text-sm text-rose-700">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Unable to load search results{message ? `: ${message}` : '.'}
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

function SearchCard({ record, meta }) {
  const title = String(record[meta.titleKey] ?? 'Untitled');
  const subtitle = String(record[meta.subtitleKey] ?? '');
  const details = meta.detailKeys
    .map((key) => record[key])
    .filter(Boolean)
    .map((value) => (Array.isArray(value) ? value.join(', ') : String(value)));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">{meta.label}</p>
          <h3 className="mt-3 text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
          {subtitle || 'Details'}
        </span>
      </div>
      <div className="mb-5 space-y-2 text-sm text-slate-600">
        {details.map((detail, index) => (
          <p key={`${detail}-${index}`}>{detail}</p>
        ))}
      </div>
      {record.email && (
        <p className="text-sm text-slate-500">Email: <span className="font-semibold text-slate-700">{record.email}</span></p>
      )}
      {record.phone && (
        <p className="text-sm text-slate-500">Phone: <span className="font-semibold text-slate-700">{record.phone}</span></p>
      )}
    </div>
  );
}

function normalizeValue(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  return [String(value)];
}

function recordText(record) {
  return Object.values(record)
    .flatMap((value) => normalizeValue(value))
    .join(' ')
    .toLowerCase();
}

function getValues(record, keys) {
  return keys.flatMap((key) => normalizeValue(record[key]));
}

function matchesFilters(record, filters, meta) {
  const query = filters.query?.trim().toLowerCase();
  const type = filters.type?.trim().toLowerCase();
  const location = filters.location?.trim().toLowerCase();
  const text = recordText(record);

  const matchesQuery = !query || text.includes(query);
  const matchesType = !type || getValues(record, [meta.typeKey]).some((value) => value.toLowerCase() === type);
  const matchesLocation =
    !location ||
    getValues(record, meta.locationKeys).some((value) => value.toLowerCase().includes(location));

  return matchesQuery && matchesType && matchesLocation;
}

function getOptionList(records, meta, key) {
  const options = new Set();
  records.forEach((record) => {
    getValues(record, [key]).forEach((value) => {
      const normalized = value.trim();
      if (normalized) options.add(normalized);
    });
  });
  return [...options].sort((a, b) => a.localeCompare(b));
}

function useCategoryQuery(category) {
  const tableName = import.meta.env[category.tableEnv] || category.defaultTable;
  return useQuery({
  queryKey: ['platform-search', category.id],

  queryFn: async () => {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error) throw error;

    return data ?? [];
  },

  enabled: hasBackend,
  retry: false,
  staleTime: 1000 * 60 * 2,
});
}

export default function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState('centres');
  const [draftQuery, setDraftQuery] = useState('');
  const [draftType, setDraftType] = useState('');
  const [draftLocation, setDraftLocation] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ query: '', type: '', location: '' });

  const currentMeta = SEARCH_CATEGORIES.find((item) => item.id === selectedCategory) ?? SEARCH_CATEGORIES[0];

  const centreQuery = useCategoryQuery(SEARCH_CATEGORIES[0]);
  const teacherQuery = useCategoryQuery(SEARCH_CATEGORIES[1]);
  const opportunityQuery = useCategoryQuery(SEARCH_CATEGORIES[2]);

  const categoryResult = useMemo(() => {
    if (selectedCategory === 'teachers') return teacherQuery;
    if (selectedCategory === 'opportunities') return opportunityQuery;
    return centreQuery;
  }, [selectedCategory, centreQuery, teacherQuery, opportunityQuery]);

  const records = categoryResult.data ?? [];
  const filteredRecords = useMemo(() => {
    if (!hasBackend) return [];
    return records.filter((record) => matchesFilters(record, appliedFilters, currentMeta));
  }, [records, appliedFilters, currentMeta]);

  const typeOptions = useMemo(() => getOptionList(records, currentMeta, currentMeta.typeKey), [records, currentMeta]);
  const locationOptions = useMemo(
    () => getOptionList(records, currentMeta, currentMeta.locationKeys[0]),
    [records, currentMeta]
  );

  function handleCategoryChange(id) {
    setSelectedCategory(id);
    setDraftType('');
    setDraftLocation('');
    setAppliedFilters({ query: '', type: '', location: '' });
  }

  function handleSearch(event) {
    event.preventDefault();
    setAppliedFilters({ query: draftQuery, type: draftType, location: draftLocation });
  }

  function handleReset() {
    setDraftQuery('');
    setDraftType('');
    setDraftLocation('');
    setAppliedFilters({ query: '', type: '', location: '' });
  }

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/70 to-amber-700/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-3xl text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-200/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-100">
              Platform Search
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find Centres, Teachers and Learning Opportunities
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-100 sm:text-lg">
              Search the platform across multiple categories with live results, location filters and type selection. This page is built using real backend data so public search is fast and accurate.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => document.getElementById('search-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Search Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="search-panel" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.8fr] lg:items-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Search & Filter</p>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Search across the platform
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Choose the category that best matches what you are looking for, then narrow results with location and type filters.
                </p>
              </div>

              <div className="mb-6 flex flex-wrap gap-3">
                {SEARCH_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryChange(category.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedCategory === category.id ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50'}`}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSearch} className="space-y-5">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={draftQuery}
                    onChange={(event) => setDraftQuery(event.target.value)}
                    className={`${inputClass} pl-11 pr-4`}
                    placeholder={currentMeta.placeholder}
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <FilterField label="Location">
                    <select
                      value={draftLocation}
                      onChange={(event) => setDraftLocation(event.target.value)}
                      className={inputClass}
                    >
                      <option value="">All Locations</option>
                      {locationOptions.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </FilterField>
                  <FilterField label="Type / Category">
                    <select
                      value={draftType}
                      onChange={(event) => setDraftType(event.target.value)}
                      className={inputClass}
                    >
                      <option value="">All Types</option>
                      {typeOptions.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </FilterField>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-500">
                    Search category: <span className="font-semibold text-slate-900">{currentMeta.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                    >
                      Reset
                      <X className="ml-2 h-4 w-4" />
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10">
              <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Live data</p>
                <h3 className="mt-3 text-xl font-extrabold text-slate-900">Backend-backed search</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  This search uses live Supabase tables where available. If the backend is not configured, the search page will still load but results cannot be fetched.
                </p>
              </div>
              <div className="grid gap-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-900">Selected category</p>
                  <p className="mt-2 text-sm text-slate-600">{currentMeta.label}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-900">Location filter</p>
                  <p className="mt-2 text-sm text-slate-600">{draftLocation || 'All locations'}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-900">Type filter</p>
                  <p className="mt-2 text-sm text-slate-600">{draftType || 'All types'}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Results</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">{currentMeta.label} search results</h2>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              <span className="font-semibold text-slate-900">{hasBackend ? records.length : 0}</span> items available
            </div>
          </div>

          {!hasBackend ? (
            <div className="rounded-3xl border border-rose-100 bg-rose-50 p-6 text-sm text-rose-700">
              <div className="flex items-start gap-4">
                <AlertCircle className="mt-1 h-5 w-5" />
                <div>
                  <p className="font-semibold">Backend is not configured.</p>
                  <p className="mt-1 text-slate-600">
                    Enable <span className="font-semibold">VITE_SUPABASE_URL</span> and <span className="font-semibold">VITE_SUPABASE_ANON_KEY</span> in your environment to fetch live search results.
                  </p>
                </div>
              </div>
            </div>
          ) : categoryResult.isLoading ? (
            <LoadingState />
          ) : categoryResult.error ? (
            <ErrorState message={categoryResult.error.message} onRetry={categoryResult.refetch} />
          ) : filteredRecords.length === 0 ? (
            <EmptyState onReset={handleReset} label={currentMeta.label} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredRecords.map((record, index) => (
                <SearchCard key={record.id ?? `${currentMeta.id}-${index}`} record={record} meta={currentMeta} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Extensible search architecture</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This page is built with category metadata and a generic record filter so it can be extended easily for additional search domains or administrative search in the future.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
                Live Supabase-backed queries
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
