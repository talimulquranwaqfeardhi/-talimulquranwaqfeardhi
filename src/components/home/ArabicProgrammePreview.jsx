import { Link } from 'react-router-dom';
import {
  Languages,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  BookMarked,
  Mic2,
  PenLine,
  GraduationCap,
} from 'lucide-react';

const LEVELS = [
  {
    tier: '01',
    level: 'Beginner',
    title: 'Arabic Foundations',
    description:
      'Master the Arabic alphabet, short vowels, and basic sentence construction. Perfect for complete beginners with no prior knowledge.',
    topics: ['Alphabet & pronunciation', 'Short & long vowels', 'Simple nouns & verbs'],
    accent: 'emerald',
  },
  {
    tier: '02',
    level: 'Intermediate',
    title: 'Grammar & Vocabulary',
    description:
      'Build a working vocabulary and understand Arabic sentence patterns — essential for reading Quranic text with comprehension.',
    topics: ['Nahw & Sarf basics', 'Root-word system', 'Quranic vocabulary'],
    accent: 'amber',
  },
  {
    tier: '03',
    level: 'Advanced',
    title: 'Classical Arabic Texts',
    description:
      'Engage directly with classical Islamic texts and tafsir literature using refined grammar, rhetoric, and morphology skills.',
    topics: ['Balagha & rhetoric', 'Tafsir reading', 'Independent translation'],
    accent: 'emerald',
  },
];

const FEATURES = [
  { icon: BookMarked, title: 'Structured Curriculum', desc: 'Three progressive levels with clear learning outcomes at each stage.' },
  { icon: Mic2,       title: 'Live Online Sessions',  desc: 'Weekly Zoom classes with experienced Arabic teachers.' },
  { icon: PenLine,    title: 'Practice Materials',    desc: 'Worksheets, audio drills, and vocabulary builders included.' },
  { icon: GraduationCap, title: 'Certification',      desc: 'Receive a certificate of completion at each programme level.' },
];

const accentMap = {
  emerald: {
    tier:   'bg-emerald-700 text-white',
    badge:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot:    'text-emerald-600',
    bar:    'bg-emerald-700',
    hover:  'hover:border-emerald-200 hover:shadow-emerald-100/50',
  },
  amber: {
    tier:   'bg-amber-400 text-emerald-950',
    badge:  'bg-amber-50 text-amber-700 border-amber-200',
    dot:    'text-amber-500',
    bar:    'bg-amber-400',
    hover:  'hover:border-amber-200 hover:shadow-amber-100/50',
  },
};

export default function ArabicProgrammePreview() {
  return (
    <section className="bg-gray-50/70 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
            <Languages className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Structured Curriculum
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Arabic Language Programme
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
            A progressive, three-level Arabic programme designed to take you from the alphabet all
            the way to reading classical Qur'anic and Islamic texts with confidence.
          </p>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">

          {/* LEFT — level cards */}
          <div className="space-y-5">
            {LEVELS.map(({ tier, level, title, description, topics, accent }) => {
              const a = accentMap[accent];
              return (
                <div
                  key={tier}
                  className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${a.hover}`}
                >
                  {/* left colour bar */}
                  <div className={`absolute inset-y-0 left-0 w-1 ${a.bar}`} />

                  <div className="flex gap-5 px-6 py-5 pl-8">
                    {/* tier number */}
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black ${a.tier}`}>
                      {tier}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* level badge + title */}
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${a.badge}`}>
                          {level}
                        </span>
                        <h3 className="text-base font-bold text-gray-900">{title}</h3>
                      </div>

                      <p className="mb-3 text-sm leading-relaxed text-gray-500">{description}</p>

                      {/* topics */}
                      <ul className="space-y-1">
                        {topics.map((t) => (
                          <li key={t} className="flex items-center gap-2">
                            <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${a.dot}`} />
                            <span className="text-xs text-gray-600">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA under levels */}
            <Link
              to="/arabic"
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-emerald-700 px-6 py-3 text-sm font-bold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white"
            >
              View Full Arabic Programme
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* RIGHT — feature highlights + enrolment card */}
          <div className="flex flex-col gap-6">
            {/* feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                  </div>
                  <span className="mb-1 text-sm font-bold text-gray-900">{title}</span>
                  <span className="text-xs leading-relaxed text-gray-500">{desc}</span>
                </div>
              ))}
            </div>

            {/* enrolment highlight card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-7 text-white shadow-lg">
              {/* ring decoration */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -top-4  -right-4  h-24 w-24 rounded-full border border-white/10" />

              <span className="mb-1 inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-300">
                Now Enrolling
              </span>
              <h3 className="mt-3 text-xl font-bold">Start Your Arabic Journey Today</h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-200">
                Classes are open to all ages and backgrounds. Join hundreds of students who have
                unlocked direct access to the Qur'an through structured Arabic learning.
              </p>

              <Link
                to="/arabic"
                className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-emerald-950 transition-all duration-300 hover:bg-amber-300"
              >
                Enrol Now
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}