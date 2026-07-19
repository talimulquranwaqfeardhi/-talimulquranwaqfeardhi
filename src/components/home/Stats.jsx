import { useEffect, useState } from 'react';
import { Users, GraduationCap, School, BookOpenCheck, MapPin, Landmark } from 'lucide-react';

const STATS = [
  {
    icon: Users,
    value: '500+',
    label: 'Registered Students',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: GraduationCap,
    value: '120+',
    label: 'Certified Teachers',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: BookOpenCheck,
    value: '80+',
    label: 'Hufaaz Listed',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: School,
    value: '40+',
    label: 'Madrasatu Tahfiz',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: MapPin,
    value: '15+',
    label: 'States Covered',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: Landmark,
    value: '₦2M+',
    label: 'Waqf Contributions',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
];

export default function Stats() {
  const [counts, setCounts] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return STATS.map(({ value }) => value);
    }
    return STATS.map(({ value }) => (/^\d+\+?$/.test(value) ? '0+' : value));
  });

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const cleanups = STATS.map(({ value }, index) => {
      const match = value.match(/^(\d+)\+?$/);
      if (!match) return null;

      const target = Number(match[1]);
      const duration = 700;
      let rafId;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(progress * target);

        setCounts((prev) => {
          const next = [...prev];
          next[index] = `${current}+`;
          return next;
        });

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        }
      };

      rafId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(rafId);
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup?.());
    };
  }, []);

  return (
    <section className="relative z-10 bg-white/95 glass-panel border border-slate-200/70 shadow-panel rounded-[2rem]" data-reveal>
      {/* Thin top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-emerald-200" />
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Platform at a glance
          </span>
          <div className="h-px w-12 bg-emerald-200" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {STATS.map(({ icon: Icon, label, color, bg, border }, index) => {
            const displayValue = counts[index];
            return (
              <div
                key={label}
                className={`group flex flex-col items-center rounded-2xl border ${border} ${bg} px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card`}
              >
                <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-soft transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-5 w-5 ${color}`} strokeWidth={2} />
                </div>
                <span className={`text-2xl font-bold ${color} lg:text-3xl`}>{displayValue}</span>
                <span className="mt-1 text-xs font-medium leading-snug text-gray-500">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}