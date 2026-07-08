import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Library,
  Search,
  Filter,
  Download,
  FileText,
  Headphones,
  Video,
  PlayCircle,
  BookOpen,
  Mic2,
  Languages,
  BookMarked,
  GraduationCap,
  Landmark,
  Layers,
  Globe,
  ChevronDown,
  ArrowRight,
  Mail,
  X,
} from 'lucide-react';

/* ─── data ───────────────────────────────────────────────── */
const RESOURCES_DATA = [
  {
    id: 1, title: "Tajweed Rules Handbook", category: 'Tajweed', type: 'PDF',
    description: "A complete reference covering articulation points, Idgham, Ikhfa, Iqlab, and Qalqalah with worked examples.",
    meta: '3.2 MB', downloads: 2450, language: 'English',
  },
  {
    id: 2, title: "Tafsir Ibn Kathir — Juz Amma (Hausa Translation)", category: 'Tafsir', type: 'PDF',
    description: "Verse-by-verse commentary on the 30th Juz, translated into Hausa for accessible study.",
    meta: '8.1 MB', downloads: 1830, language: 'Hausa',
  },
  {
    id: 3, title: "Qur'an Recitation — Surah Al-Baqarah", category: 'Tajweed', type: 'Audio',
    description: "Full recitation by a certified Qari, recorded for memorisation and Tajweed practice.",
    meta: '2h 15min', downloads: 3920, language: 'Arabic',
  },
  {
    id: 4, title: "Arabic Alphabet Workbook (Beginner Level)", category: 'Arabic Language', type: 'PDF',
    description: "Tracing exercises and pronunciation guides for all 28 Arabic letters, designed for new learners.",
    meta: '1.8 MB', downloads: 4105, language: 'English',
  },
  {
    id: 5, title: "ITQA Teacher Training Curriculum", category: 'ITQA Curriculum', type: 'PDF',
    description: "The official syllabus and lesson framework used to train and accredit ITQA teachers nationwide.",
    meta: '5.4 MB', downloads: 980, language: 'English',
  },
  {
    id: 6, title: "Introduction to Tajweed — Video Lesson Series", category: 'Tajweed', type: 'Video',
    description: "A five-part video series introducing Tajweed fundamentals for absolute beginners.",
    meta: '45 min', downloads: 2210, language: 'Hausa',
  },
  {
    id: 7, title: "Hifz Memorisation Tracker Template", category: 'Hifz & Memorization', type: 'PDF',
    description: "A printable weekly tracker to log memorised verses, revision cycles, and teacher sign-off.",
    meta: '0.6 MB', downloads: 3340, language: 'English',
  },
  {
    id: 8, title: "Waqf-e-Ardhi Annual Transparency Report 2025", category: 'Waqf Reports', type: 'PDF',
    description: "A full account of land endowment activity, contributions received, and project progress for the year.",
    meta: '4.2 MB', downloads: 610, language: 'English',
  },
  {
    id: 9, title: "Arabic Grammar Basics — Nahw & Sarf Notes", category: 'Arabic Language', type: 'PDF',
    description: "Condensed study notes covering foundational syntax and morphology rules for early learners.",
    meta: '2.9 MB', downloads: 1560, language: 'English',
  },
];

const CATEGORIES = [
  { name: 'Tafsir', icon: BookOpen },
  { name: 'Tajweed', icon: Mic2 },
  { name: 'Arabic Language', icon: Languages },
  { name: 'Hifz & Memorization', icon: BookMarked },
  { name: 'ITQA Curriculum', icon: GraduationCap },
  { name: 'Waqf Reports', icon: Landmark },
];

const CATEGORY_COUNTS = RESOURCES_DATA.reduce((acc, r) => {
  acc[r.category] = (acc[r.category] || 0) + 1;
  return acc;
}, {});

const TYPE_OPTIONS = ['PDF', 'Audio', 'Video'];
const LANGUAGE_OPTIONS = ['English', 'Hausa', 'Arabic'];

const STATS = [
  { icon: Library, value: '150+', label: 'Total Resources', accent: 'emerald' },
  { icon: Layers, value: '6', label: 'Categories', accent: 'amber' },
  { icon: Download, value: '25K+', label: 'Total Downloads', accent: 'emerald' },
  { icon: Globe, value: '3', label: 'Languages', accent: 'amber' },
];

const FAQS = [
  {
    q: 'Are these resources free to download?',
    a: "Yes. Every resource in this library is completely free to download and use for personal or teaching purposes.",
  },
  {
    q: 'Can I contribute a resource to the library?',
    a: "Yes. Use the \"Suggest a Resource\" option below to send us your material. Our team reviews each submission before it's published.",
  },
  {
    q: 'What languages are the resources available in?',
    a: "Materials are published in English, Hausa, and Arabic, depending on the resource. Use the Language filter to narrow results to what you're comfortable reading.",
  },
  {
    q: 'Can I use these materials to teach at my own school?',
    a: "Yes. Resources are freely available for educational use within the community. They should not be resold or repackaged commercially.",
  },
  {
    q: 'How often is the library updated?',
    a: "New materials are added on a rolling basis as they're reviewed and approved, so it's worth checking back periodically.",
  },
];

/* ─── style maps ─────────────────────────────────────────── */
const statAccent = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
};

const TYPE_ICON = { PDF: FileText, Audio: Headphones, Video: Video };
const TYPE_ACTION = {
  PDF: { label: 'Download', icon: Download },
  Audio: { label: 'Listen', icon: Headphones },
  Video: { label: 'Watch', icon: PlayCircle },
};

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100';

/* ─── small components ───────────────────────────────────── */
function FilterField({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 transition-all duration-300 hover:border-emerald-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15px] font-bold text-gray-900">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-emerald-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 px-8 py-20 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
        <Search className="h-7 w-7 text-gray-400" />
      </div>
      <h3 className="text-lg font-extrabold text-gray-900">No Resources Found</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        No resources match your current search and filters. Try adjusting your criteria or reset to browse the full library.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-emerald-700 px-5 py-2.5 text-sm font-bold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white"
      >
        Reset Filters
      </button>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function ResourcesPage() {
  const [draftQuery, setDraftQuery] = useState('');
  const [draftCategory, setDraftCategory] = useState('');
  const [draftType, setDraftType] = useState('');
  const [draftLanguage, setDraftLanguage] = useState('');

  const [appliedFilters, setAppliedFilters] = useState({
    query: '', category: '', type: '', language: '',
  });

  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((r) => {
      const matchQuery = !appliedFilters.query || r.title.toLowerCase().includes(appliedFilters.query.toLowerCase());
      const matchCategory = !appliedFilters.category || r.category === appliedFilters.category;
      const matchType = !appliedFilters.type || r.type === appliedFilters.type;
      const matchLanguage = !appliedFilters.language || r.language === appliedFilters.language;
      return matchQuery && matchCategory && matchType && matchLanguage;
    });
  }, [appliedFilters]);

  const hasAppliedFilters = Object.values(appliedFilters).some(Boolean);

  function handleSearch(e) {
    e.preventDefault();
    setAppliedFilters({
      query: draftQuery, category: draftCategory,
      type: draftType, language: draftLanguage,
    });
  }

  function handleReset() {
    setDraftQuery(''); setDraftCategory(''); setDraftType(''); setDraftLanguage('');
    setAppliedFilters({ query: '', category: '', type: '', language: '' });
  }

  function handleCategoryCardClick(categoryName) {
    setDraftCategory(categoryName);
    setAppliedFilters((f) => ({ ...f, category: categoryName }));
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          ك
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300">Home</Link>
            <span className="text-emerald-600">/</span>
            <span className="text-white">Resources</span>
          </div>

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <Library className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Free Study Library
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              Resources Hub
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              A curated library of Qur'anic audio, Tajweed guides, Arabic study materials, and
              curriculum documents — free to browse and download for every student and teacher.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#search"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              >
                Browse Resources
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contribute"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Suggest a Resource
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ STATISTICS ══════════════════ */}
      <section className="relative z-10 bg-white">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {STATS.map(({ icon: Icon, value, label, accent }) => {
              const a = statAccent[accent];
              return (
                <div
                  key={label}
                  className={`group flex flex-col items-center rounded-2xl border ${a.border} ${a.bg} px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className={`h-5 w-5 ${a.text}`} strokeWidth={2} />
                  </div>
                  <span className={`text-2xl font-extrabold ${a.text} lg:text-3xl`}>{value}</span>
                  <span className="mt-1 text-xs font-medium text-gray-500">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ BROWSE BY CATEGORY ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Browse by Topic
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Browse by Category
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              Jump straight to the topic you need, or search the full library below.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ name, icon: Icon }, i) => {
              const isEmerald = i % 2 === 0;
              const count = CATEGORY_COUNTS[name] || 0;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleCategoryCardClick(name)}
                  className={`group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isEmerald ? 'hover:border-emerald-200' : 'hover:border-amber-200'
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                      isEmerald ? 'bg-emerald-50' : 'bg-amber-50'
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${isEmerald ? 'text-emerald-700' : 'text-amber-600'}`} strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-extrabold text-gray-900">{name}</h3>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {count} resource{count === 1 ? '' : 's'}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-700" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ SEARCH & FILTERS ══════════════════ */}
      <section id="search" className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Filter className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Search &amp; Filter
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Find a Resource
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Search by title, or narrow results using the filters below.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />

            <div className="p-6 sm:p-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={draftQuery}
                  onChange={(e) => setDraftQuery(e.target.value)}
                  placeholder="Search by title…"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <FilterField label="Category">
                  <select value={draftCategory} onChange={(e) => setDraftCategory(e.target.value)} className={inputClass}>
                    <option value="">All Categories</option>
                    {CATEGORIES.map(({ name }) => <option key={name} value={name}>{name}</option>)}
                  </select>
                </FilterField>

                <FilterField label="Type">
                  <select value={draftType} onChange={(e) => setDraftType(e.target.value)} className={inputClass}>
                    <option value="">All Types</option>
                    {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FilterField>

                <FilterField label="Language">
                  <select value={draftLanguage} onChange={(e) => setDraftLanguage(e.target.value)} className={inputClass}>
                    <option value="">Any Language</option>
                    {LANGUAGE_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </FilterField>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                  Reset
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md"
                >
                  <Search className="h-4 w-4" />
                  Search Resources
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ══════════════════ RESOURCE GRID ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Library className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Library
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              All Resources
            </h2>
          </div>

          <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-gray-500">
              {filteredResources.length === 0 ? (
                'No resources match your search.'
              ) : (
                <>
                  Showing <span className="font-bold text-gray-900">{filteredResources.length}</span>{' '}
                  {filteredResources.length === 1 ? 'resource' : 'resources'}
                  {appliedFilters.category ? ` in ${appliedFilters.category}` : ''}
                </>
              )}
            </p>
            {hasAppliedFilters && (
              <button onClick={handleReset} className="text-xs font-semibold text-emerald-700 hover:underline">
                Clear filters
              </button>
            )}
          </div>

          {filteredResources.length === 0 ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((r, i) => {
                const isEmerald = i % 2 === 0;
                const TypeIcon = TYPE_ICON[r.type];
                const action = TYPE_ACTION[r.type];
                const ActionIcon = action.icon;
                return (
                  <div
                    key={r.id}
                    className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      isEmerald ? 'hover:border-emerald-200' : 'hover:border-amber-200'
                    }`}
                  >
                    <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                            isEmerald ? 'bg-emerald-700' : 'bg-amber-400'
                          }`}
                        >
                          <TypeIcon className={`h-5 w-5 ${isEmerald ? 'text-white' : 'text-emerald-950'}`} strokeWidth={2} />
                        </div>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                            isEmerald
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {r.category}
                        </span>
                      </div>

                      <h3 className="text-sm font-extrabold leading-snug text-gray-900">{r.title}</h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500">{r.description}</p>

                      <div className="my-4 h-px w-full bg-gray-100" />

                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                          {r.type} &middot; {r.meta}
                        </div>
                        <div className="flex items-center gap-2">
                          <Download className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                          {r.downloads.toLocaleString()} downloads
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                          {r.language}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md"
                      >
                        <ActionIcon className="h-4 w-4" />
                        {action.label}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ CONTRIBUTE CTA ══════════════════ */}
      <section id="contribute" className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pb-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 px-8 py-16 text-center shadow-xl shadow-emerald-900/20 sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-400/10 blur-2xl" />

            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/15 ring-1 ring-amber-400/30">
              <Mail className="h-7 w-7 text-amber-300" strokeWidth={2} />
            </div>

            <h2 className="relative mt-6 text-2xl font-extrabold text-white sm:text-3xl">
              Have a Resource to Share?
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-200/90 sm:text-base">
              If you have study materials, recordings, or curriculum documents that would
              benefit the community, we'd love to include them in this library.
            </p>
            <a
              href="mailto:resources@talimquran.org"
              className="group relative mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
            >
              Suggest a Resource
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════ FAQ ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <FaqItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}