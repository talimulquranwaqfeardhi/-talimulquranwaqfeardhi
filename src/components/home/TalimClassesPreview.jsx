import { Link } from 'react-router-dom';
import {
  BookOpenText,
  Calendar,
  Clock,
  Video,
  ArrowRight,
  Radio,
} from 'lucide-react';

const CLASSES = [
  {
    tag: 'Tafsir',
    title: 'Tafsir al-Qur\'an',
    description:
      'In-depth explanation and commentary of the Qur\'an by our resident scholar, covering meaning, context, and contemporary lessons.',
    schedule: [
      { day: 'Every Monday', time: '8:00 PM – 9:30 PM' },
      { day: 'Every Thursday', time: '8:00 PM – 9:30 PM' },
    ],
    platform: 'Zoom (Live + Recorded)',
    status: 'live',
    accent: 'emerald',
  },
  {
    tag: 'Tajweed',
    title: 'Tajweed & Qira\'an',
    description:
      'Structured lessons on the rules of Tajweed — proper pronunciation, articulation points, and melodic recitation of the Quran.',
    schedule: [
      { day: 'Every Tuesday', time: '7:30 PM – 9:00 PM' },
      { day: 'Every Saturday', time: '10:00 AM – 11:30 AM' },
    ],
    platform: 'Zoom (Live + Recorded)',
    status: 'live',
    accent: 'amber',
  },
  {
    tag: 'Tarjumat',
    title: 'Tarjumat al-Qur\'an',
    description:
      'Word-by-word translation of the Qur\'anin Hausa and English, helping students understand the direct meaning of divine speech.',
    schedule: [
      { day: 'Every Wednesday', time: '8:00 PM – 9:00 PM' },
      { day: 'Every Sunday', time: '9:00 AM – 10:30 AM' },
    ],
    platform: 'Zoom (Live + Recorded)',
    status: 'live',
    accent: 'emerald',
  },
];

const accentMap = {
  emerald: {
    tag: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-700',
    bar: 'bg-emerald-700',
    dot: 'bg-emerald-500',
    hover: 'hover:border-emerald-200 hover:shadow-emerald-100/60',
  },
  amber: {
    tag: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-400',
    bar: 'bg-amber-400',
    dot: 'bg-amber-500',
    hover: 'hover:border-amber-200 hover:shadow-amber-100/60',
  },
};

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600 border border-red-100">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      LIVE
    </span>
  );
}

export default function TalimClassesPreview() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
            <Radio className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Weekly Online Sessions
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ta'lim Classes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
            Attend live or catch up on recordings. All classes are conducted by qualified scholars
            and are free for registered participants.
          </p>
        </div>

        {/* Class cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSES.map(({ tag, title, description, schedule, platform, status, accent }) => {
            const a = accentMap[accent];
            return (
              <div
                key={title}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${a.hover}`}
              >
                {/* Top bar */}
                <div className={`h-1 w-full ${a.bar}`} />

                <div className="flex flex-1 flex-col p-6">
                  {/* Tag + live badge */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${a.tag}`}>
                      {tag}
                    </span>
                    {status === 'live' && <LiveBadge />}
                  </div>

                  {/* Icon + title */}
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${a.iconBg} shadow-sm transition-transform duration-300 group-hover:scale-105`}
                    >
                      <BookOpenText className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">{title}</h3>
                  </div>

                  <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">{description}</p>

                  {/* Schedule rows */}
                  <div className="mb-4 space-y-2 rounded-xl bg-gray-50 p-4">
                    {schedule.map(({ day, time }) => (
                      <div key={day} className="flex items-start gap-2">
                        <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                        <div>
                          <span className="text-xs font-semibold text-gray-700">{day}</span>
                          <span className="mx-1.5 text-gray-300">·</span>
                          <span className="text-xs text-gray-500">{time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Platform */}
                  <div className="mb-5 flex items-center gap-2">
                    <Video className="h-4 w-4 shrink-0 text-gray-400" />
                    <span className="text-xs text-gray-500">{platform}</span>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/talim"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors duration-200 hover:text-emerald-900"
                  >
                    Join this class
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/talim"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-700 px-7 py-3 text-sm font-bold text-emerald-700 transition-all duration-300 hover:bg-emerald-700 hover:text-white"
          >
            View Full Schedule
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}