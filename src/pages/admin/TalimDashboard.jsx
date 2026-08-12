import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import {
  Search,
  Users,
  Building2,
  School,
  BookOpen,
  ChartBar,
  Loader2,
  AlertCircle,
  Filter,
  Sparkles,
  Tag,
} from 'lucide-react';

const LEARNERS_TABLE = import.meta.env.VITE_SUPABASE_LEARNING_REGISTRATIONS_TABLE || 'learning_registrations';
const TEACHERS_TABLE = import.meta.env.VITE_SUPABASE_TEACHERS_TABLE || 'teachers';
const CENTRES_TABLE = import.meta.env.VITE_SUPABASE_MADRASAS_TABLE || 'madrasas';
const OPPORTUNITIES_TABLE = import.meta.env.VITE_SUPABASE_LEARNING_OPPORTUNITIES_TABLE || 'learning_opportunities';
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

function renderStatusBadge(value) {
  const normalized = String(value || 'Unknown').toLowerCase();
  const mapping = {
    active: 'bg-emerald-100 text-emerald-800',
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-emerald-100 text-emerald-800',
    completed: 'bg-slate-100 text-slate-700',
    rejected: 'bg-rose-100 text-rose-700',
    unknown: 'bg-slate-100 text-slate-700',
  };
  const styles = mapping[Object.keys(mapping).find((key) => normalized.includes(key))] ?? mapping.unknown;
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {String(value || 'Unknown')}
    </span>
  );
}

function SectionCard({ title, value, subtitle, icon: Icon, accent }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-extrabold text-slate-900">{value}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</p>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-3xl ${accent}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
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
          <p className="font-semibold">Unable to load dashboard data.</p>
          <p className="text-sm text-rose-700">{message || 'Please check your database connection and try again.'}</p>
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

export default function TalimDashboard() {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const learnersQuery = useQuery(
    ['admin-learners'],
    async () => {
      const { data, error } = await supabase.from(LEARNERS_TABLE).select('*');
      if (error) throw error;
      return data ?? [];
    },
    { enabled: hasBackend, retry: false }
  );

  const teachersQuery = useQuery(
    ['admin-teachers'],
    async () => {
      const { data, error } = await supabase.from(TEACHERS_TABLE).select('*');
      if (error) throw error;
      return data ?? [];
    },
    { enabled: hasBackend, retry: false }
  );

  const centresQuery = useQuery(
    ['admin-centres'],
    async () => {
      const { data, error } = await supabase.from(CENTRES_TABLE).select('*');
      if (error) throw error;
      return data ?? [];
    },
    { enabled: hasBackend, retry: false }
  );

  const categoriesQuery = useQuery(
    ['admin-opportunities'],
    async () => {
      const { data, error } = await supabase.from(OPPORTUNITIES_TABLE).select('*');
      if (error) throw error;
      return data ?? [];
    },
    { enabled: hasBackend, retry: false }
  );

  const learners = learnersQuery.data ?? [];
  const teachers = teachersQuery.data ?? [];
  const centres = centresQuery.data ?? [];
  const opportunities = categoriesQuery.data ?? [];

  const categoryOptions = useMemo(() => {
    const values = new Set();
    opportunities.forEach((opportunity) => {
      if (opportunity.category) values.add(String(opportunity.category));
      if (opportunity.type) values.add(String(opportunity.type));
    });
    learners.forEach((learner) => {
      if (learner.interests) {
        const interests = Array.isArray(learner.interests)
          ? learner.interests
          : String(learner.interests).split(',');
        interests.forEach((interest) => values.add(interest.trim()));
      }
    });
    return [...values].filter(Boolean).sort();
  }, [learners, opportunities]);

  const filteredLearners = useMemo(() => {
    return learners.filter((learner) => {
      const matchesQuery = filterByQuery(
        learner,
        query,
        ['full_name', 'jamaat', 'email', 'phone', 'age_category', 'country']
      );
      if (!matchesQuery) return false;
      if (!categoryFilter) return true;
      const interests = Array.isArray(learner.interests)
        ? learner.interests
        : String(learner.interests || '').split(',');
      return interests.some((interest) => String(interest).toLowerCase().includes(categoryFilter.toLowerCase()));
    });
  }, [learners, query, categoryFilter]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesQuery = filterByQuery(
        teacher,
        query,
        ['name', 'title', 'specialization', 'location', 'state', 'email']
      );
      if (!matchesQuery) return false;
      return !categoryFilter || String(teacher.specialization || '').toLowerCase().includes(categoryFilter.toLowerCase());
    });
  }, [teachers, query, categoryFilter]);

  const filteredCentres = useMemo(() => {
    return centres.filter((centre) => {
      const matchesQuery = filterByQuery(
        centre,
        query,
        ['name', 'state', 'lga', 'type', 'address', 'status']
      );
      if (!matchesQuery) return false;
      return !categoryFilter || String(centre.programmes || centre.type || '').toLowerCase().includes(categoryFilter.toLowerCase());
    });
  }, [centres, query, categoryFilter]);

  const categories = useMemo(() => {
    const values = new Set();
    opportunities.forEach((opportunity) => {
      if (opportunity.category) values.add(String(opportunity.category));
      if (opportunity.type) values.add(String(opportunity.type));
    });
    return [...values].filter(Boolean).sort();
  }, [opportunities]);

  const hasError = learnersQuery.error || teachersQuery.error || centresQuery.error || categoriesQuery.error;
  const isLoading = learnersQuery.isLoading || teachersQuery.isLoading || centresQuery.isLoading || categoriesQuery.isLoading;

  const statistics = useMemo(() => {
    const participationByState = learners.reduce((acc, learner) => {
      const state = String(learner.state || learner.country || 'Unknown');
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(participationByState)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [learners]);

  return (
    <div className="space-y-10">
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Talimul Qur’an Dashboard</p>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Administrative overview for learners, teachers and centres</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Monitor core participation metrics, manage live directory records, and review learning categories with summaries and search filters.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search className="h-5 w-5 text-slate-500" />
              <p className="text-sm text-slate-700">Search across records</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Filter className="h-5 w-5 text-slate-500" />
              <p className="text-sm text-slate-700">Filter by category</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-5">
          <SectionCard
            title="Learners"
            value={learners.length}
            subtitle="Registered learning requests"
            icon={Users}
            accent="bg-emerald-700"
          />
          <SectionCard
            title="Teachers"
            value={teachers.length}
            subtitle="Active Mu’allim profiles"
            icon={School}
            accent="bg-amber-600"
          />
          <SectionCard
            title="Centres"
            value={centres.length}
            subtitle="Registered Qur’an centres"
            icon={Building2}
            accent="bg-sky-600"
          />
          <SectionCard
            title="Categories"
            value={categories.length}
            subtitle="Learning categories visible"
            icon={BookOpen}
            accent="bg-violet-600"
          />
          <SectionCard
            title="Participation"
            value={`${learners.length + teachers.length}`}
            subtitle="Learner + teacher records"
            icon={ChartBar}
            accent="bg-emerald-900"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr] xl:grid-cols-[1.8fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Quick search</h2>
                <p className="mt-1 text-sm text-slate-600">Filter learners, teachers and centres together.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Search query</span>
                <div className="mt-2 relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search name, email, location…"
                    className="w-full rounded-3xl border border-slate-200 bg-white px-10 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Category filter</span>
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">All categories</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Participation highlights</h2>
            <div className="mt-5 space-y-3">
              {statistics.length === 0 ? (
                <p className="text-sm text-slate-600">No participation data is available yet.</p>
              ) : (
                statistics.map(([region, count]) => (
                  <div key={region} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                    <span>{region}</span>
                    <span className="font-semibold text-slate-900">{count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {hasError ? (
        <ErrorPanel
          message={hasError.message ?? hasError[0]?.message}
          onRetry={() => {
            learnersQuery.refetch();
            teachersQuery.refetch();
            centresQuery.refetch();
            categoriesQuery.refetch();
          }}
        />
      ) : isLoading ? (
        <LoadingGrid />
      ) : (
        <div className="space-y-10">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Learners</h2>
                <p className="mt-1 text-sm text-slate-600">Recent learning registrations and profile details.</p>
              </div>
              <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">{filteredLearners.length} records</div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Learner</th>
                    <th className="px-4 py-3 font-semibold">Jama’at</th>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Interest</th>
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredLearners.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-sm text-slate-500">
                        No matching learner records.
                      </td>
                    </tr>
                  ) : (
                    filteredLearners.slice(0, 8).map((learner) => (
                      <tr key={learner.id ?? learner.email ?? learner.phone ?? Math.random()}>
                        <td className="px-4 py-4 text-slate-900">{learner.full_name || learner.name || 'Unknown'}</td>
                        <td className="px-4 py-4 text-slate-600">{learner.jamaat || learner.circuit || 'N/A'}</td>
                        <td className="px-4 py-4 text-slate-600">{learner.email || learner.phone || 'No contact'}</td>
                        <td className="px-4 py-4 text-slate-600">
                          {Array.isArray(learner.interests)
                            ? learner.interests.join(', ')
                            : learner.interests || 'Not specified'}
                        </td>
                        <td className="px-4 py-4 text-slate-600">{learner.created_at ? new Date(learner.created_at).toLocaleDateString() : 'Unknown'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-10 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Teachers</h2>
                <p className="mt-1 text-sm text-slate-600">Browse Mu’allim profiles and monitor active teaching specialists.</p>
              </div>
              <div className="space-y-4">
                {filteredTeachers.slice(0, 6).map((teacher) => (
                  <div key={teacher.id ?? teacher.email ?? teacher.name} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-slate-900">{teacher.name || teacher.full_name || 'Unknown teacher'}</p>
                        <p className="text-sm text-slate-600">{teacher.title || teacher.specialization || 'No role provided'}</p>
                      </div>
                      <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                        {teacher.availability || teacher.status || 'Unknown'}
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                        <p className="font-semibold text-slate-900">Location</p>
                        <p className="mt-2">{teacher.state || teacher.location || 'Unknown'}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                        <p className="font-semibold text-slate-900">Specialization</p>
                        <p className="mt-2">{teacher.specialization || teacher.subject || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Learning categories</h2>
              <p className="mt-2 text-sm text-slate-600">Popular categories drawn from live opportunity and interest data.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {categoryOptions.length === 0 ? (
                  <p className="text-sm text-slate-500">No categories available.</p>
                ) : (
                  categoryOptions.slice(0, 12).map((category) => (
                    <span key={category} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
                      <Tag className="mr-2 inline-block h-3.5 w-3.5 text-emerald-600" />
                      {category}
                    </span>
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
