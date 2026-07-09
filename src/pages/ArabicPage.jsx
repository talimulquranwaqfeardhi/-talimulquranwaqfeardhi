import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Languages,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  BookOpen,
  PenLine,
  MessageCircle,
  BookMarked,
  GraduationCap,
  Award,
  Users,
  Sparkles,
  Clock,
  Calendar,
  Video,
  Target,
  Star,
  Layers,
} from 'lucide-react';

/* ─── data ───────────────────────────────────────────────── */
const LEVELS = [
  {
    tier: '01',
    level: 'Beginner',
    title: 'Arabic Foundations',
    duration: '3 months',
    desc: 'Master the Arabic alphabet, short and long vowels, and simple sentence construction. No prior knowledge required.',
    topics: [
      'Arabic alphabet & pronunciation',
      'Short vowels (Fatha, Kasra, Dhamma)',
      'Long vowels and Sukun',
      'Basic nouns and pronouns',
      'Simple sentence structure',
    ],
    accent: 'emerald',
  },
  {
    tier: '02',
    level: 'Intermediate',
    title: 'Grammar & Vocabulary',
    duration: '4 months',
    desc: 'Build a functional working vocabulary and gain a solid understanding of Arabic grammar rules for reading and comprehension.',
    topics: [
      'Introduction to Nahw (syntax)',
      'Introduction to Sarf (morphology)',
      'Root-word system and verb conjugation',
      'Quranic vocabulary (500+ words)',
      'Reading short Islamic texts',
    ],
    accent: 'amber',
  },
  {
    tier: '03',
    level: 'Advanced',
    title: 'Classical Arabic Texts',
    duration: '6 months',
    desc: 'Engage directly with classical Islamic literature, Tafsir, and Hadith texts using advanced grammar, rhetoric, and analysis.',
    topics: [
      'Advanced Nahw and Sarf',
      'Balagha (rhetoric and eloquence)',
      'Independent Quranic translation',
      'Reading classical Tafsir texts',
      'Arabic composition and expression',
    ],
    accent: 'emerald',
  },
];

const CURRICULUM = [
  {
    icon: BookOpen,
    title: 'Reading (Qiraah)',
    desc: 'Develop fluent reading of Arabic script from simple words to complete passages, with correct pronunciation and flow.',
    color: 'emerald',
  },
  {
    icon: PenLine,
    title: 'Writing (Kitabah)',
    desc: 'Learn proper Arabic script formation, letter joining rules, and progress to writing full sentences and passages.',
    color: 'amber',
  },
  {
    icon: Layers,
    title: 'Grammar (Nahw)',
    desc: 'Understand Arabic sentence structure, word roles, and grammatical cases essential for reading classical texts.',
    color: 'emerald',
  },
  {
    icon: BookMarked,
    title: 'Morphology (Sarf)',
    desc: 'Master the root-word system that unlocks the meaning of thousands of Arabic words from a handful of roots.',
    color: 'amber',
  },
  {
    icon: MessageCircle,
    title: 'Conversation (Muhadathah)',
    desc: 'Practice spoken Arabic in structured sessions, building the confidence to communicate naturally in the language.',
    color: 'emerald',
  },
  {
    icon: Star,
    title: 'Quranic Arabic',
    desc: 'Focus on the specific vocabulary, grammar patterns, and stylistic features unique to the language of the Quran.',
    color: 'amber',
  },
];

const OUTCOMES = [
  {
    icon: BookOpen,
    title: 'Read Arabic independently',
    desc: 'Read and understand Arabic texts, from everyday material to classical Islamic works.',
  },
  {
    icon: MessageCircle,
    title: 'Communicate in Arabic',
    desc: 'Hold basic to intermediate conversations in Modern Standard Arabic.',
  },
  {
    icon: BookMarked,
    title: 'Understand the Quran',
    desc: 'Read Quranic verses with direct comprehension, without relying on a translation.',
  },
  {
    icon: Layers,
    title: 'Apply grammar rules',
    desc: 'Analyse Arabic sentences using Nahw and Sarf to identify meaning and structure.',
  },
  {
    icon: GraduationCap,
    title: 'Receive certification',
    desc: 'Earn a certificate of completion for each programme level upon assessment.',
  },
  {
    icon: Target,
    title: 'Progress to Tafsir study',
    desc: 'Build the linguistic foundation required to study Tafsir and Islamic texts independently.',
  },
];

const SCHEDULE = [
  {
    group: 'Weekday Classes',
    icon: Calendar,
    sessions: [
      { day: 'Monday & Wednesday', time: '7:00 PM – 8:30 PM (WAT)', level: 'Beginner' },
      { day: 'Tuesday & Thursday', time: '7:00 PM – 8:30 PM (WAT)', level: 'Intermediate' },
    ],
  },
  {
    group: 'Weekend Classes',
    icon: Star,
    sessions: [
      { day: 'Saturday', time: '10:00 AM – 12:00 PM (WAT)', level: 'All Levels' },
      { day: 'Sunday', time: '9:00 AM – 11:00 AM (WAT)', level: 'Advanced' },
    ],
  },
  {
    group: 'Online-Only Classes',
    icon: Video,
    sessions: [
      { day: 'Friday', time: '8:00 PM – 9:30 PM (WAT)', level: 'Beginner & Intermediate' },
      { day: 'Saturday', time: '3:00 PM – 4:30 PM (WAT)', level: 'Advanced' },
    ],
  },
];

const WHY_US = [
  {
    icon: GraduationCap,
    title: 'Experienced Instructors',
    desc: 'All Arabic teachers hold formal qualifications in Arabic language studies from recognised Islamic institutions.',
  },
  {
    icon: Layers,
    title: 'Structured Curriculum',
    desc: 'A clear three-level progression with defined outcomes, assessments, and study materials at every stage.',
  },
  {
    icon: Award,
    title: 'Formal Certification',
    desc: 'Receive an official certificate of completion recognised by the department at each level.',
  },
  {
    icon: Users,
    title: 'Supportive Environment',
    desc: 'Small class sizes, peer learning groups, and weekly revision sessions keep every student on track.',
  },
];

const FAQS = [
  {
    q: 'Do I need any prior knowledge of Arabic to join?',
    a: 'No. The Beginner level starts from the very first Arabic letter. Anyone who can read in any language can start immediately.',
  },
  {
    q: 'How long does it take to complete the full programme?',
    a: 'The three levels together span approximately 13 months at the standard pace. Students who join intensive tracks may complete it faster.',
  },
  {
    q: 'Are classes available online or only in person?',
    a: 'All classes are available online via Zoom. Some centres also offer in-person sessions — check the ITQA Centre Locator for your nearest location.',
  },
  {
    q: 'Will I be able to understand the Quran after completing this programme?',
    a: 'Yes. By the end of the Advanced level, you will be able to read and understand a significant portion of Quranic vocabulary and grammar independently.',
  },
  {
    q: 'Is there a fee to join the Arabic Programme?',
    a: 'The programme is free of charge for all registered students. Optional Waqf-e-Ardhi contributions help sustain and expand access to these classes.',
  },
  {
    q: 'Can I join the Intermediate level if I already have some Arabic knowledge?',
    a: 'Yes. New students with prior knowledge take a short placement assessment to determine the right starting level rather than always beginning at Beginner.',
  },
];

const accentMap = {
  emerald: {
    tier:   'bg-emerald-700 text-white',
    badge:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot:    'text-emerald-500',
    bar:    'bg-gradient-to-b from-emerald-500 to-emerald-700',
    ring:   'hover:ring-emerald-200',
    shadow: 'group-hover:shadow-emerald-100/60',
  },
  amber: {
    tier:   'bg-amber-400 text-emerald-950',
    badge:  'bg-amber-50 text-amber-700 border-amber-200',
    dot:    'text-amber-500',
    bar:    'bg-gradient-to-b from-amber-300 to-amber-500',
    ring:   'hover:ring-amber-200',
    shadow: 'group-hover:shadow-amber-100/60',
  },
};

const curriculumColor = {
  emerald: { icon: 'text-emerald-700', bg: 'bg-emerald-50', border: 'hover:border-emerald-200' },
  amber:   { icon: 'text-amber-600',   bg: 'bg-amber-50',   border: 'hover:border-amber-200'   },
};

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

/* ─── page ───────────────────────────────────────────────── */
export default function ArabicPage() {
  return (
    <div className="bg-white">

      {/* ══════════════════ HERO BANNER ══════════════════ */}
      <section className="relative overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />

        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 -translate-y-1/3 rounded-full bg-amber-500/10 blur-3xl" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-end pr-8 text-[18rem] font-black leading-none text-white/[0.025] select-none">
          ع
        </span>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          {/* breadcrumb */}
          {/* <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300">Home</Link>
            <span className="text-emerald-600">/</span>
            <span className="text-white">Arabic Programme</span>
          </div> */}
          
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <Languages className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Structured Arabic Curriculum
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              Arabic Language Programme
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              A progressive, three-level Arabic programme designed to take you from the
              very first letter all the way to reading classical Qur'anic and Islamic texts
              with full confidence.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/ITQARegistration/student"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              >
                Enrol Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/ITQARegistration/centres"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Find a Centre
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
                <Languages className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                  About the Programme
                </span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                The Language of the Qur'an, Made Accessible
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-gray-500">
                Arabic is not just a language — it is the key that unlocks direct access to
                the Qur'an, Hadith, and fourteen centuries of Islamic scholarship. Yet for most
                Nigerian Muslims, this key has remained out of reach due to a lack of structured,
                accessible instruction.
              </p>
              <p className="mt-4 text-base leading-[1.8] text-gray-500">
                The Ta'lim-ul-Qur'an Arabic Programme was designed specifically to close this
                gap — offering a rigorous, step-by-step curriculum that is taught online and at
                registered centres across Nigeria, free of charge.
              </p>
              <p className="mt-4 text-base leading-[1.8] text-gray-500">
                Whether you are a complete beginner, a student looking to improve your Qur'anic
                recitation, or a teacher seeking to deepen your classical knowledge — there is a
                level and a class for you.
              </p>
            </div>

            {/* who it is for */}
            <div className="space-y-4">
              {[
                { label: 'Complete beginners', desc: 'No prior knowledge of Arabic needed — start from the alphabet.' },
                { label: 'Students & young learners', desc: 'Structured learning paths suitable for school-age students.' },
                { label: 'Adult learners', desc: 'Evening and weekend classes designed for working adults.' },
                { label: 'Quran reciters', desc: 'Understand the meaning of what you already recite fluently.' },
                { label: 'Teachers & educators', desc: 'Deepen your classical Arabic for better teaching quality.' },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                  <div>
                    <p className="text-sm font-extrabold text-gray-900">{label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ PROGRAMME LEVELS ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Three-Level Curriculum
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Programme Levels
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              Each level builds on the last — clear outcomes, defined topics, and a certificate
              of completion at every stage.
            </p>
          </div>

          <div className="space-y-5">
            {LEVELS.map(({ tier, level, title, duration, desc, topics, accent }) => {
              const a = accentMap[accent];
              return (
                <div
                  key={tier}
                  className={`group relative flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:ring-2 ${a.ring} ${a.shadow}`}
                >
                  {/* left accent bar */}
                  <div className={`w-1.5 shrink-0 rounded-l-2xl ${a.bar}`} />

                  <div className="flex flex-1 flex-wrap items-start gap-6 px-6 py-6 lg:flex-nowrap">
                    {/* tier chip */}
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black shadow-md ${a.tier}`}>
                      {tier}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${a.badge}`}>
                          {level}
                        </span>
                        <h3 className="text-[15px] font-extrabold text-gray-900">{title}</h3>
                        <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock className="h-3.5 w-3.5" />
                          {duration}
                        </div>
                      </div>
                      <p className="mb-4 text-sm leading-[1.75] text-gray-500">{desc}</p>
                      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {topics.map((t) => (
                          <li key={t} className="flex items-center gap-2">
                            <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${a.dot}`} strokeWidth={2.5} />
                            <span className="text-xs font-medium text-gray-600">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ CURRICULUM ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                What You Will Study
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Curriculum Areas
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              The programme covers all dimensions of Arabic language mastery — from reading
              and writing through to grammar, morphology, conversation, and Qur'anic Arabic.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CURRICULUM.map(({ icon: Icon, title, desc, color }) => {
              const c = curriculumColor[color];
              return (
                <div
                  key={title}
                  className={`group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${c.border}`}
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${c.bg} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-5 w-5 ${c.icon}`} strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 text-[15px] font-extrabold text-gray-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ LEARNING OUTCOMES ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                What You Will Achieve
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Learning Outcomes
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-extrabold text-gray-900">{title}</h3>
                  <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SCHEDULE ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Calendar className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Class Timetable
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Class Schedule
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              Classes run across weekdays, weekends, and dedicated online-only slots — so
              there is always a time that fits your routine.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {SCHEDULE.map(({ group, icon: Icon, sessions }) => (
              <div
                key={group}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
                <div className="p-6">
                  <div className="mb-5 flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                    </div>
                    <h3 className="text-base font-extrabold text-gray-900">{group}</h3>
                  </div>

                  <div className="space-y-3">
                    {sessions.map(({ day, time, level }) => (
                      <div
                        key={day}
                        className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:border-emerald-100 hover:bg-emerald-50"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{day}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{time}</p>
                          </div>
                          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                            {level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Video className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-xs text-gray-500">Zoom · Recordings within 24 hrs</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY STUDY WITH US ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <Star className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Our Difference
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Study With Us
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
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

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pb-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 px-8 py-16 shadow-xl shadow-emerald-900/20 sm:px-16">
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-400/10 blur-2xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                  Join the Arabic Programme Today
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-emerald-200/90 sm:text-base">
                  Enrol now and start building the Arabic foundation that will transform how
                  you read, understand, and connect with the Qur'an — completely free of charge.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  to="/ITQARegistration/student"
                  className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
                >
                  Enrol as a Student
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/ITQARegistration/centres"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
                >
                  Find a Centre
                </Link>
              </div>
            </div>
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