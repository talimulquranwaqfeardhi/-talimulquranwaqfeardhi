import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenText, GraduationCap, Landmark, MapPin } from 'lucide-react';
import heroImage from '@/assets/background-image.jpeg';

const ITQA_URL = 'https://www.itqa.org.uk/';

const STATS = [
  { value: '500+', label: 'Certified Teachers' },
  { value: '120+', label: 'Learning Centres' },
  { value: '10K+', label: 'Learners Supported' },
];

const CARDS = [
  {
    icon: GraduationCap,
    title: 'Teacher Accreditation',
    desc: 'Connect with certified Qur&#39;an instructors and teachers across the country.',
    cta: 'Register Now',
    to: ITQA_URL,
  },
  {
    icon: BookOpenText,
    title: "Ta'lim Classes",
    desc: 'Find live and recorded Qur&#39;an classes in Tafsir, Tajweed and Tarjamat.',
    cta: 'Find Classes',
    to: '/talim/tafsir',
  },
  {
    icon: MapPin,
    title: 'Learning Centres',
    desc: 'Browse Qur&#39;an centres and student support hubs across our network.',
    cta: 'View Centres',
    to: '/madrasatu-tahfiz',
  },
  {
    icon: Landmark,
    title: 'Waqfe Ardhi',
    desc: 'Discover how members can dedicate their time and skills in Jama&#39;at service.',
    cta: 'Learn More',
    to: '/waqf',
  },
];

function LinkWrapper({ to, children, className }) {
  const isExternal = typeof to === 'string' && to.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-emerald-950 hero-backdrop text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />

        <div className="absolute inset-0 bg-emerald-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/70 to-emerald-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-20 hidden sm:block h-72 w-72 sm:h-96 sm:w-96 rounded-full hero-spotlight opacity-75" />

        <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-36 hidden md:block h-[320px] w-[320px] lg:h-[560px] lg:w-[560px] rounded-full border border-white/5" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 hidden md:block h-[220px] w-[220px] lg:h-[380px] lg:w-[380px] rounded-full border border-white/5" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 hidden md:block h-[160px] w-[160px] lg:h-[240px] lg:w-[240px] rounded-full border border-white/5" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/12 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-40" data-reveal>
          <div className="max-w-2xl">
            <div className="mb-8 flex items-center gap-3 fade-item" style={{ animationDelay: '100ms' }}>
              <span className="h-px w-10 bg-amber-300/80" />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
                National Department
              </span>
            </div>

            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4rem] fade-item" style={{ animationDelay: '180ms' }}>
              Learn the Qur'an.
              <br className="hidden sm:block" />
              Serve the Jama'at.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg fade-item" style={{ animationDelay: '260ms' }}>
              Connecting learners with Qur'anic learning opportunities, centres and teachers while enabling members to dedicate their time, skills and service for Jama'at work.
            </p>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center fade-item" style={{ animationDelay: '340ms' }}>
              <Link
                to="/talim/tafsir"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-button shadow-amber-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                Explore Qur'anic Learning
              </Link>
              <Link
                to="/waqf"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/12 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm shadow-button transition duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.18] hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              >
                Explore Waqfe Ardhi
              </Link>
            </div>

            <div className="mt-10 text-sm text-slate-300 fade-item" style={{ animationDelay: '360ms' }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-emerald-100">
                <GraduationCap className="h-4 w-4" />
                Verified Qur'anic instructors and learning centres
              </span>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:mt-12 sm:grid-cols-3 sm:pt-10 fade-item" style={{ animationDelay: '420ms' }}>
              {STATS.map(({ value, label }) => (
                <div key={label} className="group relative overflow-hidden rounded-3xl bg-white/8 p-5 text-white/95 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated hover:shadow-emerald-500/20">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/20 to-transparent opacity-70" />
                  <div className="relative">
                    <p className="text-4xl font-semibold leading-none">{value}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white" data-reveal>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="-mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map(({ icon: Icon, title, desc, cta, to }) => (
              <LinkWrapper
                key={title}
                to={to}
                className="group relative flex flex-col rounded-3xl border border-gray-200/80 bg-white p-6 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 transition duration-300 ease-out group-hover:scale-105 group-hover:shadow-lg">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-950">{title}</h3>
                <p className="flex-1 text-sm leading-6 text-slate-500">{desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors duration-200 group-hover:text-emerald-900">
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                </div>
              </LinkWrapper>
            ))}
          </div>
        </div>
        <div className="h-8 sm:h-12 lg:h-20" />
      </section>
    </>
  );
}
