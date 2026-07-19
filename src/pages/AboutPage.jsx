import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Eye,
  Target,
  ListChecks,
  BookOpenText,
  HandHeart,
  BookOpen,
  GraduationCap,
  Building2,
  Library,
  Layers,
  Users,
  Globe,
  ShieldCheck,
  Award,
  Heart,
} from 'lucide-react';

/* ─── data ───────────────────────────────────────────────── */
const PRINCIPLES = [
  {
    icon: Eye,
    title: 'Vision',
    desc: "A generation, worldwide, connected directly and meaningfully to the Holy Qur'an — supported by qualified teachers, welcoming learning centres, and a community united in service.",
  },
  {
    icon: Target,
    title: 'Mission',
    desc: "To bridge the gap between learners and Qur'anic education by connecting them with qualified teachers and trusted centres, while coordinating temporary service that sustains and grows our educational reach.",
  },
  {
    icon: ListChecks,
    title: 'Objectives',
    desc: "To expand access to structured Qur'anic learning, strengthen our network of teachers and centres, encourage voluntary service, and maintain trust and quality across every connection made.",
  },
];

const DEPARTMENTS = [
  {
    icon: BookOpenText,
    title: "Talimul Qur'an",
    desc: "Connecting learners with teachers, centres and Qur'anic education — from first steps in recitation to advanced study of Tafsir and Tajweed. We do not operate as a single school; we are the structure that links learners to the right guidance, wherever they are.",
  },
  {
    icon: HandHeart,
    title: 'Waqfe Ardhi',
    desc: "Managing the temporary dedication of members' time, skills and services for Jama'at work — matching willing volunteers with the needs of the community, for a season rather than a lifetime.",
  },
];

const WHAT_WE_DO = [
  { icon: BookOpen, title: "Qur'an Learning", desc: 'Structured pathways for learners at every level, from foundational recitation to deep Qur\'anic study.' },
  { icon: GraduationCap, title: 'Teacher Development', desc: 'Supporting and developing qualified Qur\'an teachers equipped to guide learners with confidence and care.' },
  { icon: Building2, title: 'Learning Centres', desc: 'Connecting learners with trusted centres offering in-person and online Qur\'anic instruction.' },
  { icon: HandHeart, title: 'Community Service', desc: "Coordinating temporary Waqfe Ardhi service, matching members' time and skills to Jama'at needs." },
  { icon: Library, title: 'Digital Resources', desc: 'Providing free access to study materials, recordings, and curriculum resources for learners and teachers alike.' },
  { icon: Layers, title: 'Department Coordination', desc: 'Ensuring smooth coordination between learners, teachers, centres, and volunteers across our platform.' },
];

const TIMELINE_STEPS = [
  { icon: Users, label: 'People', desc: 'Individuals seeking to learn, understand, and connect with the Holy Qur\'an.' },
  { icon: GraduationCap, label: 'Teachers', desc: 'Qualified instructors ready to guide learners at every stage.' },
  { icon: Building2, label: 'Centres', desc: 'Trusted learning spaces, in-person and online, where instruction takes place.' },
  { icon: Layers, label: 'Department', desc: 'Our platform coordinating, verifying, and connecting every part of the journey.' },
  { icon: HandHeart, label: 'Community', desc: 'A stronger, more connected Jama\'at, united by knowledge and service.' },
];

const IMPACT_STATS = [
  { icon: Globe, value: '25+', label: 'Countries Served' },
  { icon: Building2, value: '80+', label: 'Learning Centres' },
  { icon: GraduationCap, value: '300+', label: 'Teachers' },
  { icon: Users, value: '5,000+', label: 'Learners' },
];

const CORE_VALUES = [
  { icon: ShieldCheck, title: 'Integrity', desc: 'Acting honestly and transparently in every connection we facilitate.' },
  { icon: BookOpen, title: 'Knowledge', desc: 'Upholding the highest standard of authentic Qur\'anic education.' },
  { icon: HandHeart, title: 'Service', desc: 'Embracing service to others as a foundation of our work.' },
  { icon: Award, title: 'Excellence', desc: 'Striving for quality in every teacher, centre, and interaction.' },
  { icon: Heart, title: 'Compassion', desc: 'Approaching every learner and volunteer with patience and care.' },
  { icon: Users, title: 'Unity', desc: 'Bringing together a global community around a shared purpose.' },
];

/* ─── style helpers ──────────────────────────────────────── */
const cardAccent = {
  emerald: { iconBg: 'bg-emerald-50', iconText: 'text-emerald-700', hoverBorder: 'hover:border-emerald-200' },
  amber:   { iconBg: 'bg-amber-50',   iconText: 'text-amber-600',   hoverBorder: 'hover:border-amber-200'   },
};

/* ─── small components ───────────────────────────────────── */
function Eyebrow({ icon: Icon, children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
      <Icon className="h-3.5 w-3.5 text-emerald-600" />
      <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
        {children}
      </span>
    </div>
  );
}

function IconCard({ icon: Icon, title, desc, accent, large }) {
  const a = cardAccent[accent];
  return (
    <div
      className={`group rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${a.hoverBorder} ${
        large ? 'p-8' : 'p-6'
      }`}
    >
      <div
        className={`mb-4 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${a.iconBg} ${
          large ? 'h-14 w-14' : 'h-11 w-11'
        }`}
      >
        <Icon className={`${a.iconText} ${large ? 'h-7 w-7' : 'h-5 w-5'}`} strokeWidth={2} />
      </div>
      <h3 className={`font-extrabold text-gray-900 ${large ? 'mb-2 text-lg' : 'mb-1.5 text-sm'}`}>
        {title}
      </h3>
      <p className={`leading-relaxed text-gray-500 ${large ? 'text-sm' : 'text-xs'}`}>{desc}</p>
    </div>
  );
}

/* Subtle Islamic 8-point star lattice, used at very low opacity as texture */
function GeometricPattern({ id, className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id={id} width="90" height="90" patternUnits="userSpaceOnUse">
          <rect x="22" y="22" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="22" y="22" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 45 45)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ══════════════════ HERO BANNER ══════════════════ */}
      <section className="relative overflow-hidden bg-emerald-950 hero-backdrop">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1758458045183-7e7c453a0580?w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-emerald-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/50 to-emerald-950/40" />
        <div className="pointer-events-none hidden md:block absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full hero-spotlight opacity-70" />

        <GeometricPattern
          id="aboutHeroPattern"
          className="pointer-events-none absolute inset-0 h-full w-full text-white opacity-[0.05]"
        />

        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <span className="pointer-events-none hidden lg:flex absolute inset-0 items-center justify-end pr-8 text-[18rem] font-black leading-none text-white/[0.03] select-none">
          ع
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300"></Link>
            <span className="text-emerald-600">/</span>
            <span className="text-white"></span>
          </div>

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Official Digital Platform
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl lg:text-[3.25rem]">
              About Talimul Qur'an &amp;
              <br className="hidden sm:block" />
              Waqfe Ardhi Department
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              A global platform dedicated to connecting learners with the Holy Qur'an — through
              qualified teachers, trusted learning centres, and a community united in service.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/talim/tafsir"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30 hero-cta-soft"
              >
                Explore Qur'an Learning
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/waqf"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Learn About Waqfe Ardhi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ WHO WE ARE ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow icon={Users}>Who We Are</Eyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A Department Built on Connection and Service
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-gray-500">
              The Talimul Qur'an and Waqfe Ardhi Department exists to make the direct study of
              the Holy Qur'an accessible to every learner, wherever they are. We do not operate
              as a single school or institution — instead, we serve as the connective structure
              between learners, qualified teachers, and established learning centres, ensuring
              that every person seeking to read, understand, or memorise the Qur'an can find the
              right guidance.
            </p>
            <p className="mt-4 text-base leading-[1.8] text-gray-500">
              Alongside this educational mission, the Department coordinates Waqfe Ardhi — the
              temporary dedication of members' time, skills, and services to support Jama'at
              work. Together, these two pillars form a single platform built on knowledge and
              service.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════ VISION / MISSION / OBJECTIVES ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <Eyebrow icon={Target}>Guiding Principles</Eyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Vision, Mission &amp; Objectives
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {PRINCIPLES.map(({ icon, title, desc }, i) => (
              <IconCard key={title} icon={icon} title={title} desc={desc} accent={i % 2 === 0 ? 'emerald' : 'amber'} large />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CORE DEPARTMENTS ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <Eyebrow icon={Layers}>Our Structure</Eyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Core Departments
            </h2>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {DEPARTMENTS.map(({ icon: Icon, title, desc }, i) => {
              const accent = i % 2 === 0 ? 'emerald' : 'amber';
              const a = cardAccent[accent];
              return (
                <div
                  key={title}
                  className={`group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${a.hoverBorder}`}
                >
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
                  <div className="p-8">
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${a.iconBg}`}>
                      <Icon className={`h-7 w-7 ${a.iconText}`} strokeWidth={2} />
                    </div>
                    <h3 className="mb-2 text-lg font-extrabold text-gray-900">{title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHAT WE DO ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <Eyebrow icon={BookOpen}>Our Work</Eyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What We Do
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_DO.map(({ icon, title, desc }, i) => (
              <IconCard key={title} icon={icon} title={title} desc={desc} accent={i % 2 === 0 ? 'emerald' : 'amber'} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY THIS PLATFORM EXISTS ══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <Eyebrow icon={ArrowRight}>Our Purpose</Eyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why This Platform Exists
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              Every connection made through this platform follows a simple, purposeful path.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-stretch lg:justify-between lg:gap-3">
            {TIMELINE_STEPS.map(({ icon: Icon, label, desc }, i) => (
              <Fragment key={label}>
                <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg lg:flex-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 shadow-sm">
                    <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-sm font-extrabold text-gray-900">{label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">{desc}</p>
                </div>
                {i < TIMELINE_STEPS.length - 1 && (
                  <ArrowRight
                    className="h-5 w-5 shrink-0 rotate-90 text-emerald-300 lg:rotate-0"
                    strokeWidth={2.5}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ GLOBAL IMPACT ══════════════════ */}
      <section className="relative z-10 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-col items-center text-center">
            <Eyebrow icon={Globe}>Global Reach</Eyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Global Impact
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Illustrative figures — to be updated with the Department's official statistics.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {IMPACT_STATS.map(({ icon: Icon, value, label }, i) => {
              const accent = i % 2 === 0 ? 'emerald' : 'amber';
              const a = cardAccent[accent];
              return (
                <div
                  key={label}
                  className={`group flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${a.hoverBorder}`}
                >
                  <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-5 w-5 ${a.iconText}`} strokeWidth={2} />
                  </div>
                  <span className={`text-2xl font-extrabold ${a.iconText} lg:text-3xl`}>{value}</span>
                  <span className="mt-1 text-xs font-medium text-gray-500">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ CORE VALUES ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <Eyebrow icon={ShieldCheck}>What We Stand For</Eyebrow>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Core Values
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map(({ icon, title, desc }, i) => (
              <IconCard key={title} icon={icon} title={title} desc={desc} accent={i % 2 === 0 ? 'emerald' : 'amber'} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CALL TO ACTION ══════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pb-24">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 px-8 py-16 text-center shadow-xl shadow-emerald-900/20 sm:px-16 sm:py-20">
            <GeometricPattern
              id="aboutCtaPattern"
              className="pointer-events-none absolute inset-0 h-full w-full text-white opacity-[0.04]"
            />
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-400/10 blur-2xl" />

            <h2 className="relative text-2xl font-extrabold text-white sm:text-3xl">
              Start Your Journey with the Qur'an
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-200/90 sm:text-base">
              Whether you are ready to begin learning, seeking a qualified teacher, or looking
              to serve — your journey starts here.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/talim/tafsir"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              >
                Explore Learning
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}