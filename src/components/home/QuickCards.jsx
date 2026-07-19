import { Link } from 'react-router-dom';
import {
  BookOpenText,
  Languages,
  Users,
  School,
  Landmark,
  Library,
  ArrowRight,
} from 'lucide-react';

const CARDS = [
  {
    icon: BookOpenText,
    badge: 'Live & Recorded',
    title: "Ta'lim Classes",
    description:
      'Join weekly online Tafsir, Tajweed, and Tarjumat al-Quran sessions taught by qualified scholars — live via Zoom or on-demand via recordings.',
    cta: 'View Classes',
    to: '/talim',
    accent: 'emerald',
  },
  {
    icon: Languages,
    badge: 'Structured Curriculum',
    title: 'Arabic Programme',
    description:
"Progressive Arabic language learning from beginner to advanced, designed to equip students with direct access to the Qur'an and classical texts.",
    cta: 'Explore Arabic',
    to: '/arabic',
    accent: 'amber',
  },
  {
    icon: Users,
    badge: 'Verified Records',
    title: 'Hufaaz Directory',
    description:
      'A searchable, verified database of Quran memorisers across Nigeria — browse by state, gender, and level of memorisation.',
    cta: 'Search Hufaaz',
    to: '/huffaaz-db',
    accent: 'emerald',
  },
  {
    icon: School,
    badge: 'Across Nigeria',
    title: 'Madrasatu Tahfiz',
    description:
      'Discover registered Tahfiz schools near you — complete with contact details, capacity, and accreditation status.',
    cta: 'Find Schools',
    to: '/madrasatu-tahfiz',
    accent: 'amber',
  },
  {
    icon: Landmark,
    badge: 'Community Endowment',
    title: 'Waqf-e-Ardhi',
    description:
      'Contribute to sustainable community land endowment projects that provide lasting benefit — sadaqah jariyah for generations to come.',
    cta: 'Support Waqf',
    to: '/waqf',
    accent: 'emerald',
  },
  {
    icon: Library,
    badge: 'Free Resources',
    title: 'Resources Hub',
    description:
      'Access a curated library of Islamic study materials, Quranic audio, reading guides, and curriculum documents — free for all.',
    cta: 'Browse Resources',
    to: '/resources',
    accent: 'amber',
  },
];

const accentMap = {
  emerald: {
    iconBg: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
    iconText: 'text-white',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    cta: 'text-emerald-700 hover:text-emerald-900',
    bar: 'bg-emerald-700',
    hover: 'hover:border-emerald-200 hover:shadow-emerald-100/60',
  },
  amber: {
    iconBg: 'bg-gradient-to-br from-amber-400 to-amber-500',
    iconText: 'text-emerald-950',
    badge: 'bg-amber-50 text-amber-700 border-amber-100',
    cta: 'text-amber-600 hover:text-amber-800',
    bar: 'bg-amber-400',
    hover: 'hover:border-amber-200 hover:shadow-amber-100/60',
  },
};

export default function QuickCards() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/70 py-24" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Everything in one place
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Explore the Platform
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
            From Qur'anic education and teacher certification to community endowment — every
            programme offered by Nurul-Ardhi Hub is accessible from right here.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ icon: Icon, badge, title, description, cta, to, accent }) => {
            const a = accentMap[accent];
            return (
              <Link
                key={title}
                to={to}
                className={`group relative flex flex-col overflow-hidden rounded-2xl glass-panel border-gray-200/70 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-elevated ${a.hover}`}
              >
                {/* Top colour bar */}
                <div className={`h-1 w-full ${a.bar}`} />

                <div className="flex flex-1 flex-col p-6">
                  {/* Icon + badge row */}
                  <div className="mb-5 flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${a.iconBg} shadow-soft transition duration-300 ease-out group-hover:scale-105 group-hover:shadow-card animate-float-slow`}
                    >
                      <Icon className={`h-6 w-6 ${a.iconText}`} strokeWidth={2} />
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${a.badge}`}
                    >
                      {badge}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-gray-500">{description}</p>

                  {/* CTA */}
                  <div
                    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${a.cta} transition-colors duration-200`}
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}