import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import heroImage from '@/assets/background-image.jpeg';
import {
  Search,
  Filter,
  MapPin,
  CalendarDays,
  User,
  CheckCircle,
  Globe,
  ShieldCheck,
  BadgeCheck,
  ChevronDown,
  ArrowRight,
  Shield,
  Phone,
  Mail,
  X,
} from 'lucide-react';

const TEACHERS_DATA = [
  {
    id: 1,
    name: 'Mu\'allim Idris Suleiman',
    title: 'Senior Tajweed Instructor',
    specialization: 'Tajweed & Recitation',
    location: 'Kano State',
    state: 'Kano',
    availability: 'Available',
    experience: '12 years',
    phone: '+234 800 100 0010',
    email: 'idrissuleiman@talimquran.org',
    bio: 'Experienced in classical Qur’an recitation, tajweed correction and learner-centered instruction for children and adults.',
    certifications: ['Ijazah in Hafs', 'Tajweed Trainer'],
  },
  {
    id: 2,
    name: 'Ustadhah Amina Yusuf',
    title: 'Tafsir & Qur’anic Studies Teacher',
    specialization: 'Tafsir & Qur’anic Studies',
    location: 'Lagos State',
    state: 'Lagos',
    availability: 'Currently Teaching',
    experience: '9 years',
    phone: '+234 800 100 0011',
    email: 'aminayusuf@talimquran.org',
    bio: 'Guides learners through Qur’an understanding, meaning, and context using supportive group and one-on-one sessions.',
    certifications: ['Ijazah in Tafsir', 'Qur’anic Pedagogy'],
  },
  {
    id: 3,
    name: 'Mu\'allim Musa Ahmed',
    title: 'Tarjamatul Qur’an Specialist',
    specialization: 'Tarjamatul Qur’an',
    location: 'Abuja (FCT)',
    state: 'Abuja (FCT)',
    availability: 'Available',
    experience: '11 years',
    phone: '+234 800 100 0012',
    email: 'musaahmed@talimquran.org',
    bio: 'Focuses on Qur’an translation, fluency and memorisation through structured lessons and revision support.',
    certifications: ['Ijazah in Translation', 'Qira’at Sab’ah'],
  },
  {
    id: 4,
    name: 'Sheikh Zubair Ali',
    title: 'Adult Qur’an Instructor',
    specialization: 'Adult Hifz & Tajweed',
    location: 'Kaduna State',
    state: 'Kaduna',
    availability: 'Not Available',
    experience: '15 years',
    phone: '+234 800 100 0013',
    email: 'zubairali@talimquran.org',
    bio: 'Teaches adult learners through tailored hifz pathways and tajweed mastery, with support for evening classes.',
    certifications: ['Ijazah', 'Adult Education'],
  },
  {
    id: 5,
    name: 'Ustadhah Hafsah Abdullahi',
    title: 'Children’s Qur’an Educator',
    specialization: 'Children’s Hifz & Recitation',
    location: 'Sokoto State',
    state: 'Sokoto',
    availability: 'Available',
    experience: '7 years',
    phone: '+234 800 100 0014',
    email: 'hafsahabdullahi@talimquran.org',
    bio: 'Delivers structured Qur’an lessons for young learners with a calm, encouraging approach and regular progress checks.',
    certifications: ['Ijazah in Hafs', 'Child Learning'],
  },
];

const AVAILABILITY_OPTIONS = ['Available', 'Currently Teaching', 'Not Available'];

const STATS = [
  { icon: User, value: '320+', label: 'Registered Teachers', accent: 'emerald' },
  { icon: Globe, value: '26', label: 'States Covered', accent: 'amber' },
  { icon: BadgeCheck, value: '210+', label: 'Verified Profiles', accent: 'emerald' },
  { icon: ShieldCheck, value: '100%', label: 'Quality Reviewed', accent: 'amber' },
];

const availabilityStyles = {
  Available: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Currently Teaching': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  'Not Available': { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' },
};

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100';

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
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${s.bg} ${s.text} ${s.border}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-gray-100 bg-gray-50 px-8 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-gray-100">
        <Search className="h-7 w-7 text-gray-400" />
      </div>
      <h3 className="text-lg font-extrabold text-gray-900">No Teachers Found</h3>
      <p className="mt-3 max-w-md text-sm text-gray-500">
        No teacher profiles match the current search or filters. Adjust your criteria or reset to browse all available teachers.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-700 px-5 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-700 hover:text-white"
      >
        Reset Filters
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-3xl border border-gray-100 bg-white p-6">
          <div className="mb-4 h-4 w-36 rounded-full bg-gray-200" />
          <div className="mb-4 h-3 w-24 rounded-full bg-gray-200" />
          <div className="mb-6 h-3 w-full rounded-full bg-gray-200" />
          <div className="grid gap-3">
            <div className="h-3 w-full rounded-full bg-gray-200" />
            <div className="h-3 w-4/5 rounded-full bg-gray-200" />
            <div className="h-3 w-3/4 rounded-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>Unable to load the live teacher directory. Showing preview data instead.{message ? ` (${message})` : ''}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

function normalizeSpecializations(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value)
    .split(new RegExp('[,&/]'))
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function TeacherDirectoryPage() {
  const [draftName, setDraftName] = useState('');
  const [draftSpecialization, setDraftSpecialization] = useState('');
  const [draftState, setDraftState] = useState('');
  const [draftAvailability, setDraftAvailability] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({
    name: '', specialization: '', state: '', availability: '',
  });
  const [expandedIds, setExpandedIds] = useState(new Set());

  const BACKEND_TABLE = import.meta.env.VITE_SUPABASE_TEACHERS_TABLE || 'teachers';
  const hasBackend = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  const {
    data: backendData,
    error,
    isLoading,
    refetch,
  } = useQuery(
    ['teacher-directory'],
    async () => {
      const { data, error: queryError } = await supabase.from(BACKEND_TABLE).select('*');
      if (queryError) throw queryError;
      return data;
    },
    {
      enabled: hasBackend,
      retry: false,
    }
  );

  const teacherDirectory = useMemo(() => {
    if (!hasBackend || isLoading || error) {
      return TEACHERS_DATA;
    }
    return backendData ?? [];
  }, [backendData, error, hasBackend, isLoading]);

  const stateOptions = useMemo(() => {
    return [...new Set(teacherDirectory.map((teacher) => teacher.state || teacher.location || ''))]
      .filter(Boolean)
      .sort();
  }, [teacherDirectory]);

  const specializationOptions = useMemo(() => {
    return [...new Set(teacherDirectory.flatMap((teacher) => normalizeSpecializations(teacher.specialization)))]
      .filter(Boolean)
      .sort();
  }, [teacherDirectory]);

  const filteredTeachers = useMemo(() => {
    return teacherDirectory.filter((teacher) => {
      const matchName = !appliedFilters.name || teacher.name.toLowerCase().includes(appliedFilters.name.toLowerCase());
      const matchSpecialization = !appliedFilters.specialization || normalizeSpecializations(teacher.specialization).includes(appliedFilters.specialization);
      const matchState = !appliedFilters.state || teacher.state === appliedFilters.state || teacher.location === appliedFilters.state;
      const matchAvailability = !appliedFilters.availability || teacher.availability === appliedFilters.availability;
      return matchName && matchSpecialization && matchState && matchAvailability;
    });
  }, [appliedFilters, teacherDirectory]);

  const hasAppliedFilters = Object.values(appliedFilters).some(Boolean);
  const showFallbackNote = hasBackend && (isLoading || error);

  function handleSearch(event) {
    event.preventDefault();
    setAppliedFilters({
      name: draftName,
      specialization: draftSpecialization,
      state: draftState,
      availability: draftAvailability,
    });
  }

  function handleReset() {
    setDraftName('');
    setDraftSpecialization('');
    setDraftState('');
    setDraftAvailability('');
    setAppliedFilters({ name: '', specialization: '', state: '', availability: '' });
  }

  function handleStateChange(event) {
    setDraftState(event.target.value);
  }

  function toggleExpanded(id) {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/85 via-emerald-900/60 to-emerald-800/30" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-white/[0.04]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <Shield className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Teacher Directory
              </span>
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              Find a Qualified Mu'allim
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              Browse verified teacher profiles, standardised specializations, and live availability so you can connect with the right Qur’an instructor fast.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#search"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              >
                Search Teachers
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Browse Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {STATS.map(({ icon: Icon, value, label, accent }) => {
              const badge = accent === 'emerald'
                ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                : 'border-amber-100 bg-amber-50 text-amber-700';
              return (
                <div
                  key={label}
                  className={`group flex flex-col items-center rounded-2xl border ${badge} px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="text-2xl font-extrabold lg:text-3xl">{value}</span>
                  <span className="mt-1 text-xs font-medium text-gray-500">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="search" className="bg-gray-50/80 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Filter className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Search & Filter
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Search Mu'allim Profiles
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Filter by name, specialization, location, or current availability.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
          >
            <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
            <div className="p-6 sm:p-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  placeholder="Search by teacher name…"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <FilterField label="Specialization">
                  <select
                    value={draftSpecialization}
                    onChange={(event) => setDraftSpecialization(event.target.value)}
                    className={inputClass}
                  >
                    <option value="">Any Specialization</option>
                    {specializationOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </FilterField>

                <FilterField label="Location">
                  <select value={draftState} onChange={handleStateChange} className={inputClass}>
                    <option value="">All States</option>
                    {stateOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </FilterField>

                <FilterField label="Availability">
                  <select
                    value={draftAvailability}
                    onChange={(event) => setDraftAvailability(event.target.value)}
                    className={inputClass}
                  >
                    <option value="">Any Status</option>
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
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
                  Search Teachers
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-gray-500">
                {filteredTeachers.length === 0 ? 'No teachers match your search.' : (
                  <>Showing <span className="font-semibold text-gray-900">{filteredTeachers.length}</span> {filteredTeachers.length === 1 ? 'teacher' : 'teachers'}</>
                )}
              </p>
              {hasAppliedFilters && (
                <p className="mt-1 text-xs text-gray-500">Filtered results are shown below.</p>
              )}
            </div>
            {hasAppliedFilters && (
              <button onClick={handleReset} className="text-xs font-semibold text-emerald-700 hover:underline">
                Clear filters
              </button>
            )}
          </div>

          {showFallbackNote && error && (
            <div className="mb-8">
              <ErrorState message={error.message} onRetry={() => refetch()} />
            </div>
          )}

          {isLoading ? (
            <LoadingState />
          ) : filteredTeachers.length === 0 ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTeachers.map((teacher, index) => {
                const isExpanded = expandedIds.has(teacher.id);
                const specializations = normalizeSpecializations(teacher.specialization);
                const stat = availabilityStyles[teacher.availability] ?? availabilityStyles['Not Available'];

                return (
                  <article key={teacher.id} className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                    <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-3xl ${index % 2 === 0 ? 'bg-emerald-700 text-white' : 'bg-amber-400 text-emerald-950'}`}>
                          <User className="h-6 w-6" />
                        </div>
                        <AvailabilityBadge status={teacher.availability} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{teacher.name}</h3>
                      <p className="mt-2 text-sm font-medium text-emerald-700">{teacher.title}</p>
                      <p className="mt-3 text-sm text-gray-500">{teacher.location}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {specializations.map((item) => (
                          <span key={item} className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-col gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-emerald-600" />
                          <span>{teacher.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-emerald-600" />
                          <span>{teacher.email}</span>
                        </div>
                      </div>

                      <div className="mt-5 overflow-hidden rounded-3xl border border-gray-100 bg-emerald-50 p-4 text-sm text-gray-700">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold">Experience</p>
                            <p className="text-xs text-gray-500">{teacher.experience}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleExpanded(teacher.id)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
                          >
                            {isExpanded ? 'Hide Profile' : 'View Profile'}
                            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        <div className={`mt-4 grid gap-3 transition-all duration-300 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          {isExpanded && (
                            <div className="space-y-3">
                              <p className="text-sm leading-relaxed text-gray-600">{teacher.bio}</p>
                              <div className="space-y-2">
                                <p className="font-semibold">Certifications</p>
                                <div className="flex flex-wrap gap-2">
                                  {teacher.certifications?.map((cert) => (
                                    <span key={cert} className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
                                      {cert}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50/80 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Teacher Network
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Connect with Qualified Qur’an Instructors
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-500">
              Our directory helps learners, parents and centres find the right teacher based on specialization, location and availability.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/huffaaz-db"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-800"
              >
                Explore Huffaaz Profiles
              </Link>
              <Link
                to="/madrasatu-tahfiz"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Browse Tahfiz Centres
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
