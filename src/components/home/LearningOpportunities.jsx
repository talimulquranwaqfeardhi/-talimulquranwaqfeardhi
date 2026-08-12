import { ArrowRight, BookOpenText, MapPin, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const OPPORTUNITIES = [
  {
    category: 'Tajweed Support',
    centre: 'Al-Furqan Learning Centre',
    teacher: 'Mu\'allim Hassan',
    location: 'Kano',
  },
  {
    category: 'Memorization (Hifz)',
    centre: 'Madrasah Al-Quran',
    teacher: 'Ustadh Umar',
    location: 'Lagos',
  },
  {
    category: 'Tafsir Study',
    centre: 'Nurul Ilm Centre',
    teacher: 'Ustadhah Zainab',
    location: 'Abuja',
  },
  {
    category: 'Translation & Meaning',
    centre: 'Darul Hikmah',
    teacher: 'Mu\'allim Musa',
    location: 'Kaduna',
  },
];

export default function LearningOpportunities() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Discover Opportunities</p>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Find Qur'anic learning opportunities by category, centre, teacher and location
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Browse preview opportunities and prepare to connect with the right programme for your Qur'an learning journey.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {OPPORTUNITIES.map((item) => (
            <article key={item.category} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <BookOpenText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{item.category}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.centre} · {item.teacher}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <MapPin className="h-4 w-4" />
                {item.location}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center sm:mt-12">
          <Link
            to="/talim/tafsir"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-800"
          >
            Explore Available Programmes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
