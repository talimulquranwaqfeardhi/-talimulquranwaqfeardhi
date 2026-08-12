import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, Search, CheckCircle, Users, ShieldCheck, Repeat } from 'lucide-react';

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Application',
    description: 'Submit your availability, skills and Jama&#39;at service interest through a simple departmental request process.',
  },
  {
    icon: Search,
    title: 'Review',
    description: 'The department reviews each request carefully to match skills with genuine Jama&#39;at work needs.',
  },
  {
    icon: CheckCircle,
    title: 'Recommendation',
    description: 'Qualified volunteers receive a service recommendation based on the programme and community priority.',
  },
  {
    icon: Users,
    title: 'Approval / Rejection',
    description: 'Requests are approved or declined transparently, with clear guidance for the next steps.',
  },
  {
    icon: ShieldCheck,
    title: 'Service Assignment',
    description: 'Approved members are assigned to Jama&#39;at work that fits their time and skills.',
  },
  {
    icon: Repeat,
    title: 'Monitoring',
    description: 'Every service placement is monitored to ensure smooth coordination and accountability.',
  },
  {
    icon: ClipboardList,
    title: 'Completion / Renewal',
    description: 'Assignments end with review and optional renewal, preserving the temporary nature of Waqfe Ardhi service.',
  },
];

export default function WaqfPreview() {
  return (
    <section className="py-24 bg-slate-50" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Waqfe Ardhi</p>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Temporary Jama'at service coordination — not land or property.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Waqfe Ardhi in this platform refers to the dedication of time, skills and service to support Jama&#39;at work through an organised review and assignment process.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white">{index + 1}</span>
                {title}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-white p-8 shadow-lg border border-slate-200">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-emerald-700 p-6 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Core Commitment</p>
              <p className="mt-4 text-lg font-semibold">Service first, not property.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Waqfe Ardhi within this platform focuses on matching volunteers with temporary Jama&#39;at service assignments.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">We avoid land/property management claims and concentrate on community service, review, and renewal.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/waqf"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-800"
            >
              Explore Waqfe Ardhi Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
