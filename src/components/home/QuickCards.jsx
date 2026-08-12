import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenText,
  Languages,
  Users,
  Library,
} from 'lucide-react';

const CARDS = [
  {
    icon: BookOpenText,
    badge: 'Reading',
    title: "Qur'an Reading",
    description: 'Begin or improve your Qur&#39;anic reading with guided sessions and supportive teachers.',
    cta: 'Start Reading',
    to: '/talim/tafsir',
    accent: 'emerald',
  },
  {
    icon: Languages,
    badge: 'Recitation',
    title: 'Tajweed',
    description: 'Learn the rules of Tajweed to improve your Qur&#39;an recitation quality and precision.',
    cta: 'Learn Tajweed',
    to: '/talim/tajweed',
    accent: 'amber',
  },
  {
    icon: BookOpenText,
    badge: 'Meaning',
    title: 'Tarjamatul Qur’an',
    description: 'Study translation and meaning to connect the Qur&#39;an to your daily life.',
    cta: 'Explore Tarjamat',
    to: '/talim/tarjumat',
    accent: 'emerald',
  },
  {
    icon: BookOpenText,
    badge: 'Knowledge',
    title: 'Tafsir',
    description: 'Understand Qur&#39;anic commentary through expert explanation and structured study.',
    cta: 'Study Tafsir',
    to: '/talim/tafsir',
    accent: 'amber',
  },
  {
    icon: Users,
    badge: 'Hifz Support',
    title: 'Memorization',
    description: 'Find centres and teachers supporting structured Quran memorization pathways.',
    cta: 'View Centres',
    to: '/madrasatu-tahfiz',
    accent: 'emerald',
  },
  {
    icon: Library,
    badge: 'Study',
    title: 'Qur&#39;anic Resources',
    description: 'Browse curated resources for Qur&#39;an study, recitation and teacher development.',
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
    <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/70 py-16 sm:py-20 lg:py-24" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Talimul Qur'an Learning Paths
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Explore Qur'anic learning categories
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
            Discover the main Qur'an learning paths and access the right programme, centre, or teacher for your journey.
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