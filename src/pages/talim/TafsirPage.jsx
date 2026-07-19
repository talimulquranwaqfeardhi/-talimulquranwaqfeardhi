import { useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/background-image.jpeg';
import {
  BookOpenText,
  ArrowRight,
  Calendar,
  Clock,
  Video,
  Target,
  CheckCircle2,
  GraduationCap,
  ClipboardList,
  ChevronDown,
  Radio,
  Sparkles,
} from 'lucide-react';

/* ─── data ───────────────────────────────────────────────── */
const OBJECTIVES = [
  "Understand the meaning and context behind Qur'anic verses (Asbab al-Nuzul).",
  "Develop the ability to extract practical lessons (Fawa'id) from each Surah.",
  'Build familiarity with classical Tafsir works such as Ibn Kathir and al-Tabari.',
  "Connect Qur'anic guidance to everyday life and contemporary issues.",
];

const SCHEDULE = [
  { day: 'Every Monday', time: '8:00 PM – 9:30 PM (WAT)', topic: 'Surah-by-Surah commentary' },
  { day: 'Every Thursday', time: '8:00 PM – 9:30 PM (WAT)', topic: 'Q&A and thematic review' },
];

const INSTRUCTORS = [
  {
    name: 'Ustadh Abdullahi Sani',
    role: 'Lead Tafsir Instructor',
    bio: "Graduate of Islamic University of Madinah, Faculty of Qur'an and Islamic Studies. 12+ years teaching experience.",
  },
  {
    name: 'Ustadh Musa Ibrahim',
    role: 'Assistant Instructor',
    bio: "Specialist in classical Tafsir literature with a focus on contemporary application of Qur'anic guidance.",
  },
];

const REQUIREMENTS = [
  "Basic ability to read the Qur'an (Tajweed not required to enrol).",
  'Stable internet connection for live Zoom sessions.',
  "A copy of the Qur'an with translation (Hausa or English).",
  'Commitment to attend at least one session per week.',
];

const OUTCOMES = [
  'Confidently explain the meaning of commonly recited Surahs.',
  "Identify key lessons and rulings derived from Qur'anic verses.",
  "Apply Qur'anic guidance to personal and community life.",
  'Navigate classical Tafsir texts independently.',
];

const FAQS = [
  {
    q: 'Do I need any prior Islamic knowledge to join?',
    a: "No prior specialised knowledge is required. The class is designed to be accessible to anyone who can read the Qur'an, with explanations given in both Hausa and English.",
  },
  {
    q: 'Are sessions recorded if I miss a class?',
    a: 'Yes. Every live session is recorded and made available in the Resources section within 24 hours, so you never lose continuity.',
  },
  {
    q: 'Is there a fee to join the Tafsir class?',
    a: "The class is completely free as part of the department's commitment to accessible Qur'anic education. Optional Waqf-e-Ardhi contributions support the programme.",
  },
  {
    q: 'How do I receive the Zoom link?',
    a: 'Once you register through the ITQA Registration page, the Zoom link and weekly reminders are sent directly to your registered email address.',
  },
];

/* ─── FAQ accordion item ─────────────────────────────────── */
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
          className={`h-5 w-5 shrink-0 text-emerald-700 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={2.5}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────── */
export default function TafsirPage() {
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
          ت
        </span>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          {/* breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-300">
            <Link to="/" className="transition-colors hover:text-amber-300"></Link>
            <span className="text-emerald-600"></span>
            <Link to="/talim" className="transition-colors hover:text-amber-300"></Link>
            <span className="text-emerald-600"></span>
            <span className="text-white"></span>
          </div>

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5">
              <Radio className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                Live &amp; Recorded Sessions
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              Tafsir al-Qur'an
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-200/90 sm:text-lg">
              In-depth explanation and commentary of the Qur'an by our resident scholars,
              covering meaning, context, and lessons for everyday life.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://www.itqa.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
              >
                Register for This Class
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                to="/talim"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18]"
              >
                Back to All Classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ INTRO + ABOUT ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

            {/* about */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
                <BookOpenText className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                  About the Course
                </span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Understanding the Qur'an, Verse by Verse
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-gray-500">
                The Tafsir al-Qur'an class takes students on a structured journey through the
                Qur'an, exploring the historical context, linguistic nuances, and practical
                wisdom behind each Surah. Drawing from classical and contemporary scholarship,
                this course bridges the gap between recitation and genuine comprehension.
              </p>
              <p className="mt-4 text-base leading-[1.8] text-gray-500">
                Sessions are conducted in a discussion-friendly format, encouraging students to
                ask questions and relate Qur'anic teachings to real, modern-day situations —
                making the class suitable for both newcomers and those deepening existing
                knowledge.
              </p>

              {/* objectives */}
              <div className="mt-10">
                <div className="mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                  <h3 className="text-lg font-extrabold text-gray-900">Course Objectives</h3>
                </div>
                <ul className="space-y-3">
                  {OBJECTIVES.map((o) => (
                    <li key={o} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                      <span className="text-sm leading-relaxed text-gray-600">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* schedule card */}
            <div>
              <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
                <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />
                <div className="p-7">
                  <div className="mb-5 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                    <h3 className="text-lg font-extrabold text-gray-900">Weekly Schedule</h3>
                  </div>

                  <div className="space-y-3">
                    {SCHEDULE.map(({ day, time, topic }) => (
                      <div
                        key={day}
                        className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-sm font-bold text-gray-900">{day}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{time}</p>
                        <p className="mt-1.5 text-xs font-medium text-emerald-700">{topic}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3">
                    <Video className="h-4 w-4 shrink-0 text-emerald-700" />
                    <span className="text-xs font-medium text-emerald-800">
                      Hosted live on Zoom · Recordings available within 24 hours
                    </span>
                  </div>

                  <a
                    href="https://www.itqa.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md"
                  >
                    Register Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ INSTRUCTORS ══════════════════ */}
      <section className="bg-gray-50/70 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Meet the Scholars
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Instructors
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {INSTRUCTORS.map(({ name, role, bio }) => (
              <div
                key={name}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-lg font-extrabold text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                  {name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <h3 className="text-base font-extrabold text-gray-900">{name}</h3>
                <span className="mt-0.5 inline-block text-xs font-semibold text-emerald-700">
                  {role}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ REQUIREMENTS + OUTCOMES ══════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">

            {/* requirements */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-amber-600" strokeWidth={2} />
                <h3 className="text-lg font-extrabold text-gray-900">Requirements</h3>
              </div>
              <ul className="space-y-3">
                {REQUIREMENTS.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span className="text-sm leading-relaxed text-gray-600">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* outcomes */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                <h3 className="text-lg font-extrabold text-gray-900">Learning Outcomes</h3>
              </div>
              <ul className="space-y-3">
                {OUTCOMES.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    <span className="text-sm leading-relaxed text-gray-600">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ REGISTRATION CTA ══════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pb-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 px-8 py-16 text-center shadow-xl shadow-emerald-900/20 sm:px-16">
            <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-400/10 blur-2xl" />

            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to Deepen Your Understanding?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-200/90 sm:text-base">
              Register today and join hundreds of students attending Tafsir al-Qur'an every
              week — free of charge.
            </p>
            <a
              href="https://www.itqa.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
            >
              Register for This Class
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