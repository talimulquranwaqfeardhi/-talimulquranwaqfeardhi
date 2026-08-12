import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import {
  Search,
  ClipboardList,
  CheckCircle2,
  Layers,
  Sparkles,
  Loader2,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Award,
} from 'lucide-react';

const APPLICATIONS_TABLE = import.meta.env.VITE_SUPABASE_WAQFE_ARDHI_TABLE || 'waqfe_ardhi_applications';
const SERVICES_TABLE = import.meta.env.VITE_SUPABASE_WAQFE_SERVICES_TABLE || 'waqfe_services';
const SKILLS_TABLE = import.meta.env.VITE_SUPABASE_SKILLS_TABLE || 'skills_database';
const hasBackend = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

function filterByQuery(item, query, keys = []) {
  if (!query) return true;
  const lower = query.toLowerCase();
  return keys.some((key) => {
    const value = item?.[key];
    if (!value) return false;
    if (Array.isArray(value)) return value.some((entry) => String(entry).toLowerCase().includes(lower));
    return String(value).toLowerCase().includes(lower);
  });
}

function badgeClass(value) {
  const normalized = String(value || '').toLowerCase();
  if (normalized.includes('approved') || normalized.includes('active') || normalized.includes('completed')) {
    return 'bg-emerald-100 text-emerald-800';
  }
  if (normalized.includes('pending') || normalized.includes('review')) {
    return 'bg-amber-100 text-amber-800';
  }
  if (normalized.includes('rejected') || normalized.includes('cancelled')) {
    return 'bg-rose-100 text-rose-800';
  }
  return 'bg-slate-100 text-slate-700';
}

function StatusBadge({ value }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(value)}`}>
      {String(value || 'Unknown')}
    </span>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-3xl border border-slate-200 bg-slate-100 p-6">
          <div className="mb-4 h-6 w-24 rounded-full bg-slate-200" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorPanel({ message, onRetry }) {
  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5" />
        <div>
          <p className="font-semibold">Unable to load Waqfe Ardhi data.</p>
          <p className="text-sm text-rose-700">{message || 'Please verify the database schema and try again.'}</p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
      >
        Retry
      </button>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, accent }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-extrabold text-slate-900">{value}</p>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-3xl ${accent}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function WaqfeArdhiDashboard() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const applicationsQuery = useQuery(
    ['admin-applications'],
    async () => {
      const { data, error } = await supabase.from(APPLICATIONS_TABLE).select('*');
      if (error) throw error;
      return data ?? [];
    },
    { enabled: hasBackend, retry: false }
  );

  const servicesQuery = useQuery(
    ['admin-services'],
    async () => {
      const { data, error } = await supabase.from(SERVICES_TABLE).select('*');
      if (error) throw error;
      return data ?? [];
    },
    { enabled: hasBackend, retry: false }
  );

  const skillsQuery = useQuery(
    ['admin-skills'],
    async () => {
      const { data, error } = await supabase.from(SKILLS_TABLE).select('*');
      if (error) throw error;
      return data ?? [];
    },
    { enabled: hasBackend, retry: false }
  );

  const applications = applicationsQuery.data ?? [];
  const services = servicesQuery.data ?? [];
  const skills = skillsQuery.data ?? [];

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesQuery = filterByQuery(
        application,
        query,
        ['full_name', 'jamaat', 'email', 'phone', 'preferred_department', 'skills']
      );
      if (!matchesQuery) return false;
      if (!statusFilter) return true;
      return String(application.status || '').toLowerCase().includes(statusFilter.toLowerCase());
    });
  }, [applications, query, statusFilter]);

  const statusOptions = useMemo(() => {
    return [...new Set(applications.map((app) => String(app.status || 'Unknown')))].filter(Boolean).sort();
  }, [applications]);

  const approvedCount = useMemo(() => applications.filter((app) => String(app.status || '').toLowerCase().includes('approved')).length, [applications]);
  const activeCount = useMemo(() => services.filter((service) => String(service.status || '').toLowerCase().includes('active')).length, [services]);
  const completedCount = useMemo(() => services.filter((service) => String(service.status || '').toLowerCase().includes('completed')).length, [services]);
  const skillsCount = skills.length;

  const hasError = applicationsQuery.error || servicesQuery.error || skillsQuery.error;
  const isLoading = applicationsQuery.isLoading || servicesQuery.isLoading || skillsQuery.isLoading;

  return (
    <div className="space-y-10">
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Waqfe Ardhi Dashboard</p>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Administration for applications, services and skills</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Review applicants, manage active service dedications, and track Jama’at skills on a single admin screen.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search className="h-5 w-5 text-slate-500" />
              <p className="text-sm text-slate-700">Global search</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <ShieldCheck className="h-5 w-5 text-slate-500" />
              <p className="text-sm text-slate-700">Protected view only</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-4">
          <StatCard title="Applicants" value={applications.length} icon={ClipboardList} accent="bg-emerald-700" />
          <StatCard title="Approved dedications" value={approvedCount} icon={CheckCircle2} accent="bg-cyan-700" />
          <StatCard title="Active services" value={activeCount} icon={Layers} accent="bg-sky-700" />
          <StatCard title="Completed commitments" value={completedCount} icon={Award} accent="bg-violet-700" />
        </div>
      </section>

      {hasError ? (
        <ErrorPanel
          message={hasError.message ?? hasError[0]?.message}
          onRetry={() => {
            applicationsQuery.refetch();
            servicesQuery.refetch();
            skillsQuery.refetch();
          }}
        />
      ) : isLoading ? (
        <LoadingGrid />
      ) : (
        <div className="space-y-10">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Applicants</h2>
                <p className="mt-1 text-sm text-slate-600">Latest Waqfe Ardhi applications and status overview.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search applicants…"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">All statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Applicant</th>
                    <th className="px-4 py-3 font-semibold">Jama’at</th>
                    <th className="px-4 py-3 font-semibold">Department</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-sm text-slate-500">
                        No applications match your search or filters.
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.slice(0, 8).map((application) => (
                      <tr key={application.id ?? application.email ?? application.phone ?? Math.random()}>
                        <td className="px-4 py-4 text-slate-900">{application.full_name || application.name || 'Unknown'}</td>
                        <td className="px-4 py-4 text-slate-600">{application.jamaat || application.circuit || 'N/A'}</td>
                        <td className="px-4 py-4 text-slate-600">{application.preferred_department || 'Not specified'}</td>
                        <td className="px-4 py-4"><StatusBadge value={application.status || 'Pending'} /></td>
                        <td className="px-4 py-4 text-slate-600">{application.created_at ? new Date(application.created_at).toLocaleDateString() : 'Unknown'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Active services</h2>
              <p className="mt-1 text-sm text-slate-600">Active and completed Waqfe Ardhi commitments.</p>
              <div className="mt-6 space-y-4">
                {services.length === 0 ? (
                  <p className="text-sm text-slate-500">No service records found.</p>
                ) : (
                  services.slice(0, 6).map((service) => (
                    <div key={service.id ?? Math.random()} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-base font-semibold text-slate-900">{service.title || service.service_name || 'Service record'}</p>
                          <p className="mt-1 text-sm text-slate-600">{service.assigned_to || service.assignee || 'Unassigned'}</p>
                        </div>
                        <StatusBadge value={service.status || 'Unknown'} />
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                          <p className="font-semibold text-slate-900">Start date</p>
                          <p className="mt-2">{service.start_date ? new Date(service.start_date).toLocaleDateString() : 'TBD'}</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                          <p className="font-semibold text-slate-900">Duration</p>
                          <p className="mt-2">{service.duration || 'Not set'}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Skills database</h2>
              <p className="mt-1 text-sm text-slate-600">Skills contributed by applicants and service volunteers.</p>
              <div className="mt-6 space-y-3">
                {skills.length === 0 ? (
                  <p className="text-sm text-slate-500">No skills recorded yet.</p>
                ) : (
                  skills.slice(0, 10).map((skill) => (
                    <div key={skill.id ?? skill.name ?? Math.random()} className="rounded-3xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                      <p className="font-semibold text-slate-900">{skill.name || skill.skill || 'Unnamed skill'}</p>
                      <p className="mt-1 text-slate-600">{skill.level || skill.expertise || 'Not specified'}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
