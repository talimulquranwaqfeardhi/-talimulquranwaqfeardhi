import { Building2, BookOpenText, Layers, Users, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    icon: Users,
    title: 'Learners',
    description: 'People seeking Qur\'anic knowledge, tajweed skills, memorization support, and community service opportunities.',
  },
  {
    icon: Building2,
    title: 'Qur\'an Centres',
    description: 'Trusted learning centres and study hubs that offer classes, mentorship, and safe learning environments.',
  },
  {
    icon: BookOpenText,
    title: 'Teachers',
    description: 'Qualified mu\'allims and instructors connected with learners through the Department’s matching support.',
  },
  {
    icon: Layers,
    title: 'Department',
    description: 'The coordination layer that ensures every connection is verified, supported, and aligned with Jama\'at service needs.',
  },
];

export default function ConnectionFlow() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">How it works</p>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Connecting learners, centres, teachers and administration
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            A professional, responsive flow that shows how Talimul Qur'an and Waqfe Ardhi work together to serve community learning and Jama'at service.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="grid gap-6">
            {STEPS.slice(0, 2).map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-4">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-700 text-white shadow-xl">
              <ArrowRight className="h-8 w-8" />
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">Flow</div>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-700 text-white shadow-xl rotate-180">
              <ArrowRight className="h-8 w-8" />
            </div>
          </div>

          <div className="grid gap-6">
            {STEPS.slice(2).map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-100 text-amber-700">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>

          <div className="lg:hidden">
            <div className="grid gap-6">
              {STEPS.slice(0, 4).map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
