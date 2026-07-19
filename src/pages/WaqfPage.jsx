import { useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/background-image.jpeg';
import {
  Landmark,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Coins,
  MapPin,
  Building2,
  FileCheck,
  BarChart3,
  Users,
  Clock,
  Loader2,
  HeartHandshake,
} from 'lucide-react';

/* ─── data ───────────────────────────────────────────────── */
const STATS = [
  { icon: Landmark, value: '45', label: 'Hectares Endowed', accent: 'emerald' },
  { icon: Building2, value: '12', label: 'Schools Established', accent: 'amber' },
  { icon: MapPin, value: '18', label: 'States Covered', accent: 'emerald' },
  { icon: Sparkles, value: '7', label: 'Active Projects', accent: 'amber' },
];

const HOW_IT_WORKS = [
  {
    title: 'Register Your Interest',
    desc: 'Submit the form below indicating how you would like to contribute — cash, land, or sponsorship.',
  },
  {
    title: 'Consultation',
    desc: 'Our Waqf committee reaches out within a few days to discuss details, documentation, and options.',
  },
  {
    title: 'Legal Transfer & Documentation',
    desc: "Land is formally dedicated as Waqf through proper Islamic and statutory legal channels.",
  },
  {
    title: 'Development & Dedication',
    desc: 'The endowed land is developed into a Qur\'anic learning centre, serving generations to come.',
  },
];

const WAYS_TO_CONTRIBUTE = [
  {
    icon: Coins,
    title: 'Cash Contribution',
    desc: 'Contribute toward our land acquisition fund. Every amount, large or small, brings a new centre closer to reality.',
  },
  {
    icon: MapPin,
    title: 'Land Donation',
    desc: 'Own land you would like to dedicate as Waqf? Donate it directly and we handle the legal transfer and development.',
  },
  {
    icon: Building2,
    title: 'Corporate & Group Sponsorship',
    desc: 'Organisations, mosques, and community groups can sponsor a full project, from land purchase to school completion.',
  },
];

const PROJECTS = [
  {
    id: 1, name: 'Nasarawa Community Tahfiz Land', state: 'Nasarawa',
    size: '2 plots', purpose: 'Madrasatu Tahfiz campus', status: 'School Established',
  },
  {
    id: 2, name: 'Kebbi Waqf Learning Complex', state: 'Kebbi',
    size: '5 hectares', purpose: 'ITQA training centre & Tahfiz school', status: 'Under Construction',
  },
  {
    id: 3, name: 'Ogun Qur\'anic Institute Land', state: 'Ogun',
    size: '1.5 hectares', purpose: 'Regional Tahfiz school', status: 'Planning Phase',
  },
  {
    id: 4, name: 'Plateau Waqf Endowment', state: 'Plateau',
    size: '3 plots', purpose: 'Community learning centre', status: 'School Established',
  },
];

const TRANSPARENCY = [
  { icon: FileCheck, title: 'Legal Documentation', desc: 'Every endowment is formally registered with proper title transfer and Waqf deed documentation.' },
  { icon: BarChart3, title: 'Annual Reports', desc: 'Fund utilisation and project progress are published annually for public review.' },
  { icon: Users, title: 'Community Oversight', desc: 'A dedicated Waqf committee, independent of day-to-day department operations, oversees every project.' },
];

const FAQS = [
  {
    q: 'What does "Waqf-e-Ardhi" mean?',
    a: 'Waqf-e-Ardhi means "land endowment." In Islamic tradition, a Waqf is an asset dedicated permanently to a charitable purpose — once given, it can never be sold, inherited, or reclaimed. Ours is dedicated specifically to establishing and sustaining Qur\'anic educational institutions.',
  },
  {
    q: 'How is this different from a regular charitable donation?',
    a: 'A regular donation is typically spent once. A Waqf is sadaqah jariyah — ongoing charity — because the land itself remains in perpetuity, continuing to generate benefit (a school, a learning centre) for as long as it stands, long after the original contribution is made.',
  },
  {
    q: 'Can I specify what my contribution should be used for?',
    a: 'Yes. When you register your interest, you can indicate a preferred state, project type, or purpose, and our committee will work with you to align your contribution with an active or upcoming project where possible.',
  },
  {
    q: 'What happens to the land forever — can it ever be sold?',
    a: 'No. Once land is formally dedicated as Waqf, Islamic law prohibits its sale, transfer, or inheritance. It remains in service of its charitable purpose permanently, which is the defining feature of a Waqf.',
  },
  {
    q: 'Is there a minimum amount to contribute?',
    a: 'No. Cash contributions of any size are welcome and pooled toward active land acquisition funds. If you are considering a land donation or corporate sponsorship, our committee will discuss specifics with you directly.',
  },
  {
    q: 'How do I know my contribution is used properly?',
    a: 'Every project is documented and reviewed by an independent Waqf committee, with fund utilisation and project progress published in our annual transparency reports.',
  },
];

/* ─── style maps ─────────────────────────────────────────── */
const statAccent = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
};

const projectStatusStyles = {
  'School Established': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Under Construction': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  'Planning Phase': { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' },
};

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100';

/* ─── shared field ───────────────────────────────────────── */
function Field({ label, children, required }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="ml-0.5 text-amber-600">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── project status badge ───────────────────────────────── */
function ProjectStatusBadge({ status }) {
  const s = projectStatusStyles[status] ?? projectStatusStyles['Planning Phase'];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${s.bg} ${s.text} ${s.border}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

/* ─── FAQ accordion ──────────────────────────────────────── */
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

/* ─── success panel ──────────────────────────────────────── */
function SuccessPanel({ onReset }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-emerald-50 px-8 py-14 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 shadow-md">
        <CheckCircle2 className="h-8 w-8 text-white" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-extrabold text-gray-900">Thank You</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
        Your interest has been recorded. Our Waqf committee will reach out within a few working
        days via the email or phone you provided to discuss next steps.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-emerald-700 px-6 py-2.5 text-sm font-bold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white"
      >
        Submit Another Response
      </button>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function WaqfPage() {
  const [contributionType, setContributionType] = useState('cash'); // 'cash' | 'land' | 'corporate'
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', state: '',
    amount_range: '', land_location: '', land_size: '',
    organization_name: '', organization_type: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // Local-only for now — no payment processing wired up yet.
    // See note below on integrating Paystack/Flutterwave + Supabase later.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  }

  function handleReset() {
    setSubmitted(false);
    setContributionType('cash');
    setForm({
      full_name: '', email: '', phone: '', state: '',
      amount_range: '', land_location: '', land_size: '',
      organization_name: '', organization_type: '', message: '',
    });
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
          و
        </span>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300"></Link>
            <span className="text-emerald-600">/</span>
            <span className="text-white"></span>
          </div>

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <Landmark className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Sadaqah Jariyah &middot; Perpetual Endowment
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              Waqf-e-Ardhi
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              Contribute to sustainable community land endowment — establishing Qur'anic
              learning institutions that provide lasting benefit for generations to come.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contribute"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              >
                Contribute Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                See Our Impact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <HeartHandshake className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                About Waqf-e-Ardhi
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Charity That Outlives the Giver
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-gray-500">
              A Waqf is a uniquely Islamic form of endowment — once dedicated, an asset can
              never be sold, inherited, or reclaimed. It exists permanently in service of the
              purpose it was given for. Waqf-e-Ardhi channels this tradition specifically toward
              land: acquiring and dedicating property on which Qur'anic schools, Tahfiz centres,
              and community learning institutions are built and sustained.
            </p>
            <p className="mt-4 text-base leading-[1.8] text-gray-500">
              This is sadaqah jariyah — ongoing charity. Long after a contribution is made, the
              school that stands on that land continues educating students, generation after
              generation, with the reward continuing to reach the one who gave.
            </p>
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

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                The Process
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map(({ title, desc }, i) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-sm font-black text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {i + 1}
                </span>
                <h3 className="text-sm font-extrabold text-gray-900">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WAYS TO CONTRIBUTE ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Get Involved
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Ways to Contribute
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {WAYS_TO_CONTRIBUTE.map(({ icon: Icon, title, desc }) => (
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

      {/* ══════════════════ CURRENT PROJECTS ══════════════════ */}
      <section id="projects" className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Building2 className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Our Impact
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Current Projects
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.map(({ id, name, state, size, purpose, status }) => (
              <div
                key={id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
                      <Landmark className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                    </div>
                    <ProjectStatusBadge status={status} />
                  </div>

                  <h3 className="text-sm font-extrabold leading-snug text-gray-900">{name}</h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    {state} State
                  </div>

                  <div className="my-4 h-px w-full bg-gray-100" />

                  <div className="space-y-2 text-xs text-gray-600">
                    <p><span className="font-semibold text-gray-800">Size:</span> {size}</p>
                    <p><span className="font-semibold text-gray-800">Purpose:</span> {purpose}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TRANSPARENCY ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Accountability
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Transparency, By Design
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              Waqf carries a sacred trust. Here is how we protect it.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {TRANSPARENCY.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-sm font-extrabold text-gray-900">{title}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CONTRIBUTE FORM ══════════════════ */}
      <section id="contribute" className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <HeartHandshake className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Register Your Interest
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Begin Your Waqf
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Tell us how you would like to contribute, and our committee will reach out to
              guide you through the next steps.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
            <div className="p-7 sm:p-9">
              {submitted ? (
                <SuccessPanel onReset={handleReset} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* contribution type selector */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                      Contribution Type <span className="text-amber-600">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'cash', label: 'Cash' },
                        { value: 'land', label: 'Land' },
                        { value: 'corporate', label: 'Corporate' },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setContributionType(value)}
                          className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                            contributionType === value
                              ? 'border-emerald-700 bg-emerald-50 text-emerald-700'
                              : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" required>
                      <input required value={form.full_name} onChange={update('full_name')} className={inputClass} placeholder="Your full name" />
                    </Field>
                    <Field label="Email Address" required>
                      <input type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone Number" required>
                      <input type="tel" required value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+234 800 000 0000" />
                    </Field>
                    <Field label="State" required>
                      <input required value={form.state} onChange={update('state')} className={inputClass} placeholder="e.g. Kano" />
                    </Field>
                  </div>

                  {/* conditional fields */}
                  {contributionType === 'cash' && (
                    <Field label="Contribution Range" required>
                      <select required value={form.amount_range} onChange={update('amount_range')} className={inputClass}>
                        <option value="">Select a range</option>
                        <option value="under-50k">Under ₦50,000</option>
                        <option value="50k-200k">₦50,000 – ₦200,000</option>
                        <option value="200k-1m">₦200,000 – ₦1,000,000</option>
                        <option value="above-1m">Above ₦1,000,000</option>
                        <option value="discuss">Prefer to discuss directly</option>
                      </select>
                    </Field>
                  )}

                  {contributionType === 'land' && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Land Location" required>
                        <input required value={form.land_location} onChange={update('land_location')} className={inputClass} placeholder="e.g. Off Zaria Road, Kano" />
                      </Field>
                      <Field label="Approximate Size" required>
                        <input required value={form.land_size} onChange={update('land_size')} className={inputClass} placeholder="e.g. 2 plots / 1.5 hectares" />
                      </Field>
                    </div>
                  )}

                  {contributionType === 'corporate' && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Organisation Name" required>
                        <input required value={form.organization_name} onChange={update('organization_name')} className={inputClass} placeholder="e.g. Al-Furqan Foundation" />
                      </Field>
                      <Field label="Organisation Type" required>
                        <select required value={form.organization_type} onChange={update('organization_type')} className={inputClass}>
                          <option value="">Select type</option>
                          <option value="mosque">Mosque / Islamic Centre</option>
                          <option value="business">Corporate / Business</option>
                          <option value="ngo">NGO / Foundation</option>
                          <option value="other">Other</option>
                        </select>
                      </Field>
                    </div>
                  )}

                  <Field label="Message (optional)">
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={update('message')}
                      className={`${inputClass} resize-none`}
                      placeholder="Preferred state, project type, or anything else we should know..."
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md disabled:translate-y-0 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {!submitted && (
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              Our committee typically responds within 3–5 working days.
            </div>
          )}
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