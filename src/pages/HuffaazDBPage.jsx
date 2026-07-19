import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/background-image.jpeg';
import {
  Search,
  Filter,
  MapPin,
  Award,
  Users,
  Globe,
  GraduationCap,
  Building2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Star,
  BadgeCheck,
  X,
  UserPlus,
} from 'lucide-react';

/* ─── dummy data ─────────────────────────────────────────── */
const HUFFAAZ_DATA = [
  {
    id: 1, name: 'Abdullahi Bello', gender: 'Male', state: 'Kano', lga: 'Kano Municipal',
    certification: "Ijazah in Hafs 'an 'Asim", years_experience: 8,
    specialization: 'Tajweed Instruction', availability: 'Available',
  },
  {
    id: 2, name: 'Fatimah Aliyu', gender: 'Female', state: 'Lagos', lga: 'Lagos Island',
    certification: "Ijazah in Hafs 'an 'Asim", years_experience: 5,
    specialization: "Children's Hifz", availability: 'Available',
  },
  {
    id: 3, name: 'Musa Ibrahim', gender: 'Male', state: 'Kaduna', lga: 'Kaduna North',
    certification: "Ijazah + Qira'at Sab'ah", years_experience: 12,
    specialization: "Qira'at", availability: 'Currently Teaching',
  },
  {
    id: 4, name: 'Aisha Suleiman', gender: 'Female', state: 'Abuja (FCT)', lga: 'Municipal Area Council',
    certification: "Ijazah in Hafs 'an 'Asim", years_experience: 6,
    specialization: 'Tajweed Instruction', availability: 'Available',
  },
  {
    id: 5, name: 'Yusuf Garba', gender: 'Male', state: 'Sokoto', lga: 'Sokoto North',
    certification: "Ijazah in Hafs 'an 'Asim", years_experience: 10,
    specialization: 'Adult Hifz Coaching', availability: 'Not Available',
  },
  {
    id: 6, name: 'Hauwa Usman', gender: 'Female', state: 'Kano', lga: 'Nassarawa',
    certification: "Ijazah in Hafs 'an 'Asim", years_experience: 4,
    specialization: "Children's Hifz", availability: 'Available',
  },
  {
    id: 7, name: 'Ibrahim Lawal', gender: 'Male', state: 'Katsina', lga: 'Katsina Metropolitan',
    certification: "Ijazah + Qira'at", years_experience: 15,
    specialization: "Qira'at", availability: 'Currently Teaching',
  },
  {
    id: 8, name: 'Zainab Muhammad', gender: 'Female', state: 'Lagos', lga: 'Ikeja',
    certification: "Ijazah in Hafs 'an 'Asim", years_experience: 7,
    specialization: 'Tajweed Instruction', availability: 'Available',
  },
  {
    id: 9, name: 'Umar Sani', gender: 'Male', state: 'Borno', lga: 'Maiduguri',
    certification: "Ijazah in Hafs 'an 'Asim", years_experience: 9,
    specialization: 'Adult Hifz Coaching', availability: 'Not Available',
  },
];

const STATES = [...new Set(HUFFAAZ_DATA.map((h) => h.state))].sort();
const GENDERS = ['Male', 'Female'];
const AVAILABILITY_OPTIONS = ['Available', 'Currently Teaching', 'Not Available'];

const STATS = [
  { icon: Users, value: '850+', label: 'Total Huffaaz', accent: 'emerald' },
  { icon: Globe, value: '24', label: 'States Covered', accent: 'amber' },
  { icon: GraduationCap, value: '120+', label: 'Certified Teachers', accent: 'emerald' },
  { icon: Building2, value: '45', label: 'Active Centres', accent: 'amber' },
];

const WHY_USE = [
  {
    icon: ShieldCheck,
    title: 'Verified Huffaaz',
    desc: 'Every listed Hafiz has been reviewed and verified through our ITQA accreditation process before appearing in the directory.',
  },
  {
    icon: Globe,
    title: 'Nationwide Coverage',
    desc: 'Search across all 36 states and the FCT to find qualified Huffaaz near you, wherever you are in Nigeria.',
  },
  {
    icon: Search,
    title: 'Easy Search',
    desc: 'Filter by location, gender, and availability to quickly find the right match for your learning needs.',
  },
  {
    icon: BadgeCheck,
    title: 'Trusted Information',
    desc: 'Profile details are kept current and reviewed periodically, so you can rely on what you see.',
  },
];

const FAQS = [
  {
    q: 'Who can register in the Huffaaz Database?',
    a: "Any Hafiz or Hafizah who has completed memorisation of the Qur'an and can provide verification of their Ijazah or equivalent certification is eligible to register.",
  },
  {
    q: 'How is verification done?',
    a: 'Applicants submit their certification details through the ITQA accreditation process, where our review team verifies credentials before a profile is published.',
  },
  {
    q: 'Is registration free?',
    a: "Yes. Listing in the National Huffaaz Database is completely free as part of the department's commitment to connecting the community with qualified Qur'an memorisers.",
  },
  {
    q: 'Can I update my profile after registration?',
    a: 'Yes. Listed Huffaaz can request updates to their availability, contact details, or specialization at any time by contacting the department directly.',
  },
  {
    q: 'What does the availability status mean?',
    a: '"Available" means the Hafiz is open to new teaching or recitation engagements. "Currently Teaching" means they are active but at capacity. "Not Available" means they are not accepting new engagements at this time.',
  },
];

/* ─── style maps ─────────────────────────────────────────── */
const availabilityStyles = {
  Available: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Currently Teaching': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  'Not Available': { bg: 'bg-gray-100', text: 'text-gray-500', border: 'border-gray-200', dot: 'bg-gray-400' },
};

const statAccent = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
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

function AvailabilityBadge({ status }) {
  const s = availabilityStyles[status] ?? availabilityStyles['Not Available'];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${s.bg} ${s.text} ${s.border}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
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
      <h3 className="text-lg font-extrabold text-gray-900">No Huffaaz Found</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        No records match your current search and filters. Try adjusting your criteria or reset to browse all listed Huffaaz.
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
export default function HuffaazDBPage() {
  const [draftName, setDraftName] = useState('');
  const [draftState, setDraftState] = useState('');
  const [draftLga, setDraftLga] = useState('');
  const [draftGender, setDraftGender] = useState('');
  const [draftAvailability, setDraftAvailability] = useState('');

  const [appliedFilters, setAppliedFilters] = useState({
    name: '', state: '', lga: '', gender: '', availability: '',
  });

  const availableLgas = useMemo(() => {
    const source = draftState ? HUFFAAZ_DATA.filter((h) => h.state === draftState) : HUFFAAZ_DATA;
    return [...new Set(source.map((h) => h.lga))].sort();
  }, [draftState]);

  const filteredHuffaaz = useMemo(() => {
    return HUFFAAZ_DATA.filter((h) => {
      const matchName = !appliedFilters.name || h.name.toLowerCase().includes(appliedFilters.name.toLowerCase());
      const matchState = !appliedFilters.state || h.state === appliedFilters.state;
      const matchLga = !appliedFilters.lga || h.lga === appliedFilters.lga;
      const matchGender = !appliedFilters.gender || h.gender === appliedFilters.gender;
      const matchAvailability = !appliedFilters.availability || h.availability === appliedFilters.availability;
      return matchName && matchState && matchLga && matchGender && matchAvailability;
    });
  }, [appliedFilters]);

  const hasAppliedFilters = Object.values(appliedFilters).some(Boolean);

  function handleSearch(e) {
    e.preventDefault();
    setAppliedFilters({
      name: draftName, state: draftState, lga: draftLga,
      gender: draftGender, availability: draftAvailability,
    });
  }

  function handleReset() {
    setDraftName(''); setDraftState(''); setDraftLga('');
    setDraftGender(''); setDraftAvailability('');
    setAppliedFilters({ name: '', state: '', lga: '', gender: '', availability: '' });
  }

  function handleStateChange(e) {
    setDraftState(e.target.value);
    setDraftLga('');
  }

  return (
    <div className="bg-white">

      {/* ══════════════════ HERO BANNER ══════════════════ */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/85 via-emerald-900/60 to-emerald-800/35" />

        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 -translate-y-1/3 rounded-full bg-amber-500/10 blur-3xl" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 text-[18rem] font-black leading-none text-white/[0.025] select-none">
          ح
        </span>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          {/* breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300"></Link>
            <span className="text-emerald-600">/</span>
            <span className="text-white"></span>
          </div>

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Verified National Directory
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              National Huffaaz Database
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              A searchable, verified directory of qualified Huffaaz — memorisers of the
              Qur'an — across Nigeria. Search by location, gender, and availability to find
              the right Hafiz or Hafizah near you.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#search"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              >
                Search Huffaaz
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#join"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                <UserPlus className="h-4 w-4" />
                Become Listed
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
              Find a Hafiz or Hafizah
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Search the directory by name, or narrow results using the filters below.
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
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="Search by name…"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <FilterField label="State">
                  <select value={draftState} onChange={handleStateChange} className={inputClass}>
                    <option value="">All States</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FilterField>

                <FilterField label="LGA">
                  <select value={draftLga} onChange={(e) => setDraftLga(e.target.value)} className={inputClass}>
                    <option value="">All LGAs</option>
                    {availableLgas.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </FilterField>

                <FilterField label="Gender">
                  <select value={draftGender} onChange={(e) => setDraftGender(e.target.value)} className={inputClass}>
                    <option value="">Any Gender</option>
                    {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </FilterField>

                <FilterField label="Availability">
                  <select value={draftAvailability} onChange={(e) => setDraftAvailability(e.target.value)} className={inputClass}>
                    <option value="">Any Status</option>
                    {AVAILABILITY_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
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
                  Search Huffaaz
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ══════════════════ FEATURED HUFFAAZ ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Star className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Directory
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Featured Huffaaz
            </h2>
          </div>

          <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-gray-500">
              {filteredHuffaaz.length === 0 ? (
                'No Huffaaz match your search.'
              ) : (
                <>
                  Showing <span className="font-bold text-gray-900">{filteredHuffaaz.length}</span>{' '}
                  {filteredHuffaaz.length === 1 ? 'record' : 'records'}
                  {appliedFilters.state ? ` in ${appliedFilters.state}` : ''}
                </>
              )}
            </p>
            {hasAppliedFilters && (
              <button onClick={handleReset} className="text-xs font-semibold text-emerald-700 hover:underline">
                Clear filters
              </button>
            )}
          </div>

          {filteredHuffaaz.length === 0 ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredHuffaaz.map((h, i) => {
                const initials = h.name.split(' ').map((n) => n[0]).slice(0, 2).join('');
                const avatarClass = i % 2 === 0 ? 'bg-emerald-700 text-white' : 'bg-amber-400 text-emerald-950';
                return (
                  <div
                    key={h.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                  >
                    <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-base font-extrabold shadow-md transition-transform duration-300 group-hover:scale-105 ${avatarClass}`}>
                          {initials}
                        </div>
                        <AvailabilityBadge status={h.availability} />
                      </div>

                      <h3 className="text-base font-extrabold text-gray-900">{h.name}</h3>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        {h.lga}, {h.state}
                      </div>

                      <div className="my-4 h-px w-full bg-gray-100" />

                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Award className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          {h.certification}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          {h.years_experience} years of experience
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Star className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                          {h.specialization}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition-colors duration-200 hover:text-emerald-900"
                      >
                        View Profile
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ WHY USE THE DIRECTORY ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Why This Directory
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Use the Directory
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_USE.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-emerald-700" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-base font-extrabold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ REGISTRATION CTA ══════════════════ */}
      <section id="join" className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pb-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 px-8 py-16 text-center shadow-xl shadow-emerald-900/20 sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-400/10 blur-2xl" />

            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/15 ring-1 ring-amber-400/30">
              <UserPlus className="h-7 w-7 text-amber-300" strokeWidth={2} />
            </div>

            <h2 className="relative mt-6 text-2xl font-extrabold text-white sm:text-3xl">
              Are You a Qualified Hafiz or Hafizah?
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-200/90 sm:text-base">
              Join the National Huffaaz Database and connect with students, teaching centres,
              and communities looking for verified Qur'an memorisers.
            </p>
            <Link
              to="/ITQARegistration/teacher"
              className="group relative mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
            >
              Apply to Be Listed
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
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