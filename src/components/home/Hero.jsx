import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenText, GraduationCap, Landmark, MapPin } from 'lucide-react';

const STATS = [
  { value: '500+', label: 'Certified Teachers' },
  { value: '120+', label: 'Tahfiz Schools'     },
  { value: '10K+', label: 'Students Enrolled'  },
];

const CARDS = [
  {
    icon: GraduationCap,
    title: 'ITQA Accreditation',
    desc:  'Register as a certified teacher or student through our streamlined accreditation process.',
    cta:   'Register Now',
    to:    '/ITQARegistration/student',
  },
  {
    icon: BookOpenText,
    title: "Ta'lim Classes",
    desc:  'Join Tafsir, Tajweed, and Tarjumat classes with experienced instructors across Nigeria.',
    cta:   'Find Classes',
    to:    '/talim/tafsir',
  },
  {
    icon: MapPin,
    title: 'Tahfiz Schools',
    desc:  'Explore our directory of Tahfiz schools with interactive maps and detailed profiles.',
    cta:   'View Schools',
    to:    '/madrasatu-tahfiz',
  },
  {
    icon: Landmark,
    title: 'Waqf-e-Ardhi',
    desc:  'Contribute to land endowment for the establishment of Islamic educational institutions.',
    cta:   'Learn More',
    to:    '/waqf',
  },
];

export default function Hero() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-emerald-950">

        {/* background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1800&q=80')",
          }}
        />

        {/* layered overlays */}
        <div className="absolute inset-0 bg-emerald-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-emerald-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />

        {/* decorative rings */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full border border-white/[0.035] " />
        <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border border-white/[0.035]" />
        <div className="pointer-events-none absolute -right-8  -top-8  h-[260px] w-[260px] rounded-full border border-white/[0.035]" />
        {/* amber glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

        {/* content */}
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-40">
          <div className="max-w-2xl">

            {/* eyebrow */}
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-400" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
                National Department
              </span>
            </div>

            {/* headline */}
            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[3.75rem]">
              Advancing Qur'anic
              <br className="hidden sm:block" />
              {' '}Education in Nigeria
            </h1>

            {/* body */}
            <p className="mt-7 max-w-[500px] text-lg leading-relaxed text-gray-300">
              Empowering communities through Qur'anic literacy, teacher
              accreditation, and sustainable land endowment programmes.
            </p>

            {/* buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/ITQARegistration/centres"
                className="inline-flex items-center rounded-lg bg-amber-400 px-7 py-3.5 text-sm font-bold text-gray-900 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30 active:translate-y-0"
              >
                Join ITQA
              </Link>
              <Link
                to="/talim/tafsir"
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18] active:translate-y-0"
              >
                Find a Ta'lim Class
              </Link>
              <Link
                to="/waqf"
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.18] active:translate-y-0"
              >
                Waqf-e-Ardhi Info
              </Link>
            </div>

            {/* stats */}
            <div className="mt-16 flex items-stretch gap-0 divide-x divide-white/10 border-t border-white/10 pt-10">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col px-8 first:pl-0 last:pr-0">
                  <span className="text-4xl font-extrabold leading-none text-white">
                    {value}
                  </span>
                  <span className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          QUICK-ACCESS CARDS  (directly below hero,
          visually "floating" over the hero's bottom edge)
      ═══════════════════════════════════════════════ */}
      <section className="relative z-10 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="-mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map(({ icon: Icon, title, desc, cta, to }) => (
              <Link
                key={title}
                to={to}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/50"
              >
                {/* icon */}
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5 text-emerald-700" strokeWidth={1.75} />
                </div>

                {/* text */}
                <h3 className="mb-2 text-[15px] font-bold text-gray-900">{title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-500">{desc}</p>

                {/* cta */}
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors duration-200 group-hover:text-emerald-900">
                  {cta}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* breathing room below cards */}
        <div className="h-20" />
      </section>
    </>
  );
}