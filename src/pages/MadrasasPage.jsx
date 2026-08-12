import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import {
  School,
  Search,
  Filter,
  MapPin,
  Users,
  Globe,
  BadgeCheck,
  Building2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Layers,
  Phone,
  Mail,
  X,
  BookOpen,
  Star,
  Award,
  Home,
  Calendar,
} from 'lucide-react';

/* ─── dummy data ─────────────────────────────────────────── */
const MADRASAS_DATA = [
  {
    id: 1,
    name: 'Markaz Tahfizul Qur\'an',
    state: 'Kano',
    lga: 'Kano Municipal',
    address: '4 Zaria Road, Kano City',
    type: 'Boarding',
    status: 'Accredited',
    capacity: 200,
    phone: '+234 800 100 0001',
    email: 'markaz.kano@talimquran.org',
    contact_name: 'Ustadh Aminu',
    programmes: ['Full Hifz', 'Tajweed', 'Qira’at'],
  },
  {
    id: 2,
    name: 'Madrasatu Nurul Huda',
    state: 'Lagos',
    lga: 'Ikeja',
    address: '18 Awolowo Way, Ikeja',
    type: 'Day School',
    status: 'Accredited',
    capacity: 90,
    phone: '+234 800 100 0002',
    email: 'nurulhuda.lagos@talimquran.org',
    contact_name: 'Sheikh Musa',
    programmes: ['Children’s Hifz', 'Adult Tajweed'],
  },
  {
    id: 3,
    name: 'Jami\'atu Falah Tahfiz Centre',
    state: 'Kaduna',
    lga: 'Kaduna North',
    address: '22 Independence Way, Kaduna',
    type: 'Mixed',
    status: 'Pending',
    capacity: 150,
    phone: '+234 800 100 0003',
    email: 'falah.kaduna@talimquran.org',
    contact_name: 'Ustadh Hassan',
    programmes: ['Qira’at Sab’ah', 'Tajweed'],
  },
  {
    id: 4,
    name: 'Darul Uloom Tahfiz Academy',
    state: 'Abuja (FCT)',
    lga: 'Municipal Area Council',
    address: 'National Mosque Complex, Central Area',
    type: 'Boarding',
    status: 'Accredited',
    capacity: 180,
    phone: '+234 800 100 0004',
    email: 'darululoom.abuja@talimquran.org',
    contact_name: 'Ustadh Abdullahi',
    programmes: ['Full Hifz', 'Tajweed', 'Adult Memorisation'],
  },
  {
    id: 5,
    name: 'Madrasatu Ta\'alimul Qur\'an',
    state: 'Sokoto',
    lga: 'Sokoto North',
    address: 'Sultan Abubakar Road, Sokoto',
    type: 'Day School',
    status: 'Accredited',
    capacity: 75,
    phone: '+234 800 100 0005',
    email: 'talimulquran.sokoto@talimquran.org',
    contact_name: 'Malam Usman',
    programmes: ['Children’s Hifz', 'Quranic Fundamentals'],
  },
  {
    id: 6,
    name: 'Al-Furqan Tahfiz Institute',
    state: 'Katsina',
    lga: 'Katsina Metropolitan',
    address: '9 Kofar Kaura, Katsina',
    type: 'Boarding',
    status: 'Pending',
    capacity: 120,
    phone: '+234 800 100 0006',
    email: 'furqan.katsina@talimquran.org',
    contact_name: 'Sheikh Suleiman',
    programmes: ['Tajweed', 'Arabic Literacy'],
  },
  {
    id: 7,
    name: 'Nurul Islam Qur\'anic School',
    state: 'Borno',
    lga: 'Maiduguri',
    address: '11 Baga Road, Maiduguri',
    type: 'Mixed',
    status: 'Accredited',
    capacity: 100,
    phone: '+234 800 100 0007',
    email: 'nurulislam.borno@talimquran.org',
    contact_name: 'Malam Yusuf',
    programmes: ['Evening Hifz', 'Tajweed'],
  },
  {
    id: 8,
    name: 'Ma\'ahad Tahfizil Qur\'an',
    state: 'Kano',
    lga: 'Nassarawa',
    address: '6 Airport Road, Kano',
    type: 'Day School',
    status: 'Accredited',
    capacity: 60,
    phone: '+234 800 100 0008',
    email: 'maahad.kano@talimquran.org',
    contact_name: 'Ustadh Abdullahi',
    programmes: ['Children’s Hifz', 'Basic Tajweed'],
  },
  {
    id: 9,
    name: 'Zumratul Hidaya Tahfiz Centre',
    state: 'Lagos',
    lga: 'Lagos Island',
    address: '3 Broad Street, Lagos Island',
    type: 'Boarding',
    status: 'Pending',
    capacity: 140,
    phone: '+234 800 100 0009',
    email: 'hidaya.lagos@talimquran.org',
    contact_name: 'Sheikh Idris',
    programmes: ['Full Hifz', 'Qira’at', 'Female Classes'],
  },
];

const TYPE_OPTIONS = ['Boarding', 'Day School', 'Mixed'];
const STATUS_OPTIONS = ['Accredited', 'Pending'];

const STATS = [
  { icon: School, value: '180+', label: 'Registered Centres', accent: 'emerald' },
  { icon: Globe, value: '28', label: 'States Covered', accent: 'amber' },
  { icon: Users, value: '12,000+', label: 'Students Enrolled', accent: 'emerald' },
  { icon: BadgeCheck, value: '140+', label: 'Accredited Schools', accent: 'amber' },
];

const WHY_USE = [
  {
    icon: ShieldCheck,
    title: 'Verified Accreditation',
    desc: 'Every school\'s status is clearly marked, so you know whether it has completed ITQA accreditation.',
  },
  {
    icon: Globe,
    title: 'Nationwide Coverage',
    desc: 'Search across all 36 states and the FCT to find a registered Tahfiz school near you.',
  },
  {
    icon: Search,
    title: 'Easy Search',
    desc: 'Filter by location, school type, and accreditation status to narrow down your options quickly.',
  },
  {
    icon: BadgeCheck,
    title: 'Trusted Information',
    desc: 'Listings are reviewed and updated regularly, so contact details and capacity stay current.',
  },
];

const FAQS = [
  {
    q: 'What does "Accredited" mean for a listed school?',
    a: 'An accredited school has completed the department\'s ITQA verification process, confirming its teaching standards and facilities meet the required baseline. "Pending" schools have applied but are still under review.',
  },
  {
    q: 'Is every Tahfiz school in Nigeria listed here?',
    a: 'The directory includes schools that have registered with the department, whether accredited or pending. If a school near you isn\'t listed, encourage them to apply through the registration process below.',
  },
  {
    q: 'How can I register my school in the directory?',
    a: 'Use the "List Your School" option below, which starts the same accreditation process used for individual teachers — a school\'s lead instructor registers on its behalf.',
  },
  {
    q: 'Is there a fee to search the directory or list a school?',
    a: 'No. Both searching the directory and submitting your school for listing are completely free.',
  },
  {
    q: 'How do I contact a school directly?',
    a: 'Each listing includes a phone number and email address. Tap or click either to contact the school directly — the department does not manage individual enrolment on their behalf.',
  },
];

// Programme cards (derived from actual programmes in dummy data)
const PROGRAMMES = [
  {
    icon: BookOpen,
    title: 'Full Hifz',
    desc: 'Complete memorisation of the Qur’an with structured revision and teacher support.',
  },
  {
    icon: Star,
    title: 'Tajweed & Qira’at',
    desc: 'Mastery of pronunciation, recitation rules, and the ten authentic Qira’at.',
  },
  {
    icon: Award,
    title: 'Children’s Hifz',
    desc: 'Specialised programmes for young memorisers with age‑appropriate methods.',
  },
  {
    icon: Calendar,
    title: 'Evening & Adult Classes',
    desc: 'Flexible schedules for working adults and part‑time students.',
  },
];

/* ─── style maps ─────────────────────────────────────────── */
const statusStyles = {
  Accredited: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  Pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
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

function StatusBadge({ status }) {
  const s = statusStyles[status] ?? statusStyles.Pending;
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
      <h3 className="text-lg font-extrabold text-gray-900">No Centres Found</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        No centres match your current search and filters. Try adjusting your criteria or reset to browse the full directory.
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

function LoadingState() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 h-4 w-32 rounded-full bg-gray-200" />
          <div className="mb-4 h-3 w-20 rounded-full bg-gray-200" />
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
    <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-5 text-sm text-red-700">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Unable to load the live directory. Showing sample listings instead.
          {message ? ` (${message})` : ''}
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition-colors duration-200 hover:bg-red-100"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

function normalizeProgrammes(programmes) {
  if (!programmes) return [];
  if (Array.isArray(programmes)) return programmes;
  return String(programmes)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

/* ─── page ───────────────────────────────────────────────── */
export default function MadrasasPage() {
  const [draftName, setDraftName] = useState('');
  const [draftState, setDraftState] = useState('');
  const [draftLga, setDraftLga] = useState('');
  const [draftType, setDraftType] = useState('');
  const [draftStatus, setDraftStatus] = useState('');

  const [appliedFilters, setAppliedFilters] = useState({
    name: '', state: '', lga: '', type: '', status: '',
  });

  // Scroll reveal animation
  const sectionRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const currentRefs = sectionRefs.current;
    currentRefs.forEach((el) => el && observer.observe(el));
    return () => {
      currentRefs.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  const BACKEND_TABLE = import.meta.env.VITE_SUPABASE_MADRASAS_TABLE || 'madrasas';
  const hasBackend = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  const {
  data: backendData,
  error,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ['madrasas-directory'],

  queryFn: async () => {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    const { data, error: queryError } = await supabase
      .from(BACKEND_TABLE)
      .select('*');

    if (queryError) {
      throw queryError;
    }

    return data;
  },

  enabled: hasBackend && !!supabase,
  retry: false,
});

  const directoryData = useMemo(() => {
    if (!hasBackend || isLoading || error) {
      return MADRASAS_DATA;
    }
    return backendData ?? [];
  }, [backendData, error, hasBackend, isLoading]);

  const availableLgas = useMemo(() => {
    const source = draftState ? directoryData.filter((m) => m.state === draftState) : directoryData;
    return [...new Set(source.map((m) => m.lga))].sort();
  }, [draftState, directoryData]);

  const stateOptions = useMemo(() => {
    return [...new Set(directoryData.map((m) => m.state || ''))].filter(Boolean).sort();
  }, [directoryData]);

  const typeOptions = useMemo(() => {
    return [...new Set([...TYPE_OPTIONS, ...directoryData.map((m) => m.type || '')])].filter(Boolean).sort();
  }, [directoryData]);

  const statusOptions = useMemo(() => {
    return [...new Set([...STATUS_OPTIONS, ...directoryData.map((m) => m.status || '')])].filter(Boolean).sort();
  }, [directoryData]);

  const filteredSchools = useMemo(() => {
    return directoryData.filter((m) => {
      const matchName = !appliedFilters.name || m.name.toLowerCase().includes(appliedFilters.name.toLowerCase());
      const matchState = !appliedFilters.state || m.state === appliedFilters.state;
      const matchLga = !appliedFilters.lga || m.lga === appliedFilters.lga;
      const matchType = !appliedFilters.type || m.type === appliedFilters.type;
      const matchStatus = !appliedFilters.status || m.status === appliedFilters.status;
      return matchName && matchState && matchLga && matchType && matchStatus;
    });
  }, [appliedFilters, directoryData]);

  const hasAppliedFilters = Object.values(appliedFilters).some(Boolean);
  const showFallbackNote = hasBackend && (isLoading || error);

  function handleSearch(e) {
    e.preventDefault();
    setAppliedFilters({
      name: draftName, state: draftState, lga: draftLga,
      type: draftType, status: draftStatus,
    });
  }

  function handleReset() {
    setDraftName(''); setDraftState(''); setDraftLga('');
    setDraftType(''); setDraftStatus('');
    setAppliedFilters({ name: '', state: '', lga: '', type: '', status: '' });
  }

  function handleStateChange(e) {
    setDraftState(e.target.value);
    setDraftLga('');
  }

  return (
    <div className="bg-white">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative overflow-hidden bg-emerald-900">
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-emerald-900/70 to-emerald-800/60" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                  National Madrasatu Tahfiz Directory
                </span>
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.5rem]">
                Qur’an Centre <br className="hidden sm:block" />
                <span className="text-amber-300">Directory</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-100/90 sm:text-lg">
                A searchable directory of registered Qur’an centres across Nigeria — complete
                with location, programmes, and accreditation status, so families and educators
                can connect with confidence.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#search"
                  className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
                >
                  Search Centres
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#list"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
                >
                  <School className="h-4 w-4" />
                  List Your Centre
                </a>
              </div>
            </div>

            {/* Decorative motif */}
            <div className="hidden lg:block relative w-72 h-72">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-4 border-amber-400/20 animate-pulse" />
                <div className="absolute w-48 h-48 rounded-full border-4 border-emerald-400/20 animate-pulse delay-75" />
                <div className="absolute w-32 h-32 rounded-full border-4 border-amber-300/30 animate-pulse delay-150" />
                <span className="absolute text-8xl font-arabic text-white/10 select-none">م</span>
              </div>
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

      {/* ══════════════════ INTRODUCTION ══════════════════ */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="bg-gray-50/50 py-24"
        data-reveal
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                  About Madrasatu Tahfiz
                </span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Preserving the Qur’an <br className="hidden sm:block" />
                <span className="text-emerald-700">Through Education</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                The <span className="font-semibold text-gray-900">Madrasatu Tahfiz</span> initiative
                is a national effort to organise, support, and promote Qur’an memorisation centres
                across Nigeria. By connecting families with accredited institutions, we ensure
                that every student receives authentic, structured, and high‑quality Tahfiz education.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Our directory lists both accredited and pending schools, giving you full visibility
                into each centre’s status, programmes, and contact details.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-emerald-700" />
                  <span className="text-sm font-medium text-gray-700">Verified listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-700" />
                  <span className="text-sm font-medium text-gray-700">Thousands of students</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 p-1 shadow-xl">
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-8 text-center">
                  <div>
                    <Building2 className="h-20 w-20 text-emerald-700/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-emerald-800">Growing Together</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Over 180 centres and counting – join the movement to preserve the Qur’an.
                    </p>
                  </div>
                </div>
              </div>
              {/* decorative dots */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full border-2 border-emerald-200/50" />
              <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full border-2 border-amber-200/50" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ PROGRAMMES ══════════════════ */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-24"
        data-reveal
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Learning Programmes
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What We Offer
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Our registered centres provide a range of programmes tailored to different age groups and goals.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMMES.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                style={{ transitionDelay: `${i * 0.05}s` }}
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
              Find a Centre
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Search the directory by centre name, location, or accreditation details.
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
                  placeholder="Search by centre name…"
                  className={`${inputClass} pl-11`}
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <FilterField label="State">
                  <select value={draftState} onChange={handleStateChange} className={inputClass}>
                    <option value="">All States</option>
                    {stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FilterField>

                <FilterField label="LGA">
                  <select value={draftLga} onChange={(e) => setDraftLga(e.target.value)} className={inputClass}>
                    <option value="">All LGAs</option>
                    {availableLgas.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </FilterField>

                <FilterField label="Centre Type">
                  <select value={draftType} onChange={(e) => setDraftType(e.target.value)} className={inputClass}>
                    <option value="">All Types</option>
                    {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FilterField>

                <FilterField label="Accreditation">
                  <select value={draftStatus} onChange={(e) => setDraftStatus(e.target.value)} className={inputClass}>
                    <option value="">Any Status</option>
                    {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
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
                  Search Centres
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ══════════════════ DIRECTORY ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Building2 className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Directory
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Registered Schools
            </h2>
          </div>

          <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-gray-500">
              {filteredSchools.length === 0 ? (
                'No centres match your search.'
              ) : (
                <>
                  Showing <span className="font-bold text-gray-900">{filteredSchools.length}</span>{' '}
                  {filteredSchools.length === 1 ? 'centre' : 'centres'}
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

          {showFallbackNote && error && (
            <div className="mb-8">
              <ErrorState message={error.message} onRetry={() => refetch()} />
            </div>
          )}

          {isLoading ? (
            <LoadingState />
          ) : filteredSchools.length === 0 ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSchools.map((m, i) => {
                const avatarClass = i % 2 === 0 ? 'bg-emerald-700 text-white' : 'bg-amber-400 text-emerald-950';
                const programmes = normalizeProgrammes(m.programmes);

                return (
                  <div
                    key={m.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                  >
                    <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-105 ${avatarClass}`}>
                          <Building2 className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <StatusBadge status={m.status} />
                      </div>

                      <h3 className="text-base font-extrabold leading-snug text-gray-900">{m.name}</h3>
                      <div className="mt-1 flex items-start gap-1.5 text-xs text-gray-500">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        {m.lga}, {m.state}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-gray-500">{m.address}</p>

                      <div className="my-4 h-px w-full bg-gray-100" />

                      <div className="space-y-2.5 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <Layers className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          {m.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          Capacity: <span className="font-semibold text-gray-700">{m.capacity}</span> students
                        </div>
                        {m.contact_name && (
                          <div className="flex items-center gap-2">
                            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            Contact: <span className="font-semibold text-gray-700">{m.contact_name}</span>
                          </div>
                        )}
                      </div>

                      {programmes.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {programmes.map((programme) => (
                            <span
                              key={programme}
                              className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"
                            >
                              {programme}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                        <a
                          href={`tel:${m.phone}`}
                          className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-emerald-700"
                        >
                          <Phone className="h-3.5 w-3.5 shrink-0" />
                          {m.phone}
                        </a>
                        <a
                          href={`mailto:${m.email}`}
                          className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-emerald-700"
                        >
                          <Mail className="h-3.5 w-3.5 shrink-0" />
                          {m.email}
                        </a>
                      </div>

                      <button
                        type="button"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition-colors duration-200 hover:text-emerald-900"
                      >
                        View Details
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
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="bg-gray-50/70 py-24"
        data-reveal
      >
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
      <section id="list" className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pb-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 px-8 py-16 text-center shadow-xl shadow-emerald-900/20 sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-400/10 blur-2xl" />

            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/15 ring-1 ring-amber-400/30">
              <School className="h-7 w-7 text-amber-300" strokeWidth={2} />
            </div>

            <h2 className="relative mt-6 text-2xl font-extrabold text-white sm:text-3xl">
              Run a Tahfiz School?
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-200/90 sm:text-base">
              List your institution in the National Madrasatu Tahfiz Directory and connect with
              families searching for a trusted school near them.
            </p>
            <Link
              to="/ITQARegistration/teacher"
              className="group relative mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
            >
              List Your School
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