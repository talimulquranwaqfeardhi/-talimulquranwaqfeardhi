import { Link } from 'react-router-dom';
import { User, MapPin, Calendar, CheckCircle } from 'lucide-react';

const TEACHERS = [
  {
    name: 'Mu\'allim Idris Suleiman',
    specialization: 'Tajweed & Recitation',
    location: 'Kano State',
    availability: 'Mon, Wed, Fri - evenings',
  },
  {
    name: 'Ustadhah Amina Yusuf',
    specialization: 'Tafsir & Qur\'anic Studies',
    location: 'Lagos State',
    availability: 'Tue, Thu - afternoons',
  },
  {
    name: 'Mu\'allim Musa Ahmed',
    specialization: 'Tarjamatul Qur\'an',
    location: 'Abuja',
    availability: 'Sat, Sun - mornings',
  },
];

export default function TeacherDirectoryPreview() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">Teacher Directory</p>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Discover Qualified Mu'allims
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            A preview of available teacher profiles, specializations, locations and availability. Full directory search will be connected as part of the next phase.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {TEACHERS.map((teacher) => (
            <article key={teacher.name} className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                <User className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{teacher.name}</h3>
              <p className="mt-3 text-sm font-semibold text-slate-700">{teacher.specialization}</p>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-700" />
                  {teacher.location}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-700" />
                  {teacher.availability}
                </p>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                <CheckCircle className="h-4 w-4" />
                Profile preview
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:justify-center">
          <Link
            to="/talim/tafsir"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-800"
          >
            Explore Qur'anic Teaching
          </Link>
          <Link
            to="/resources"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Browse Learning Resources
          </Link>
        </div>
      </div>
    </section>
  );
}
