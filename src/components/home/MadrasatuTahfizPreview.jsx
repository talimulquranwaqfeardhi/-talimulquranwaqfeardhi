import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const schools = [
  {
    id: 1,
    name: 'Madrasah Al-Quran',
    state: 'Lagos',
    phone: '+234 (0) 901 234 5678',
    email: 'info@alquran.edu.ng',
    students: '150+',
    teachers: '12',
  },
  {
    id: 2,
    name: 'Dar ul-Hana',
    state: 'Abuja',
    phone: '+234 (0) 702 987 6543',
    email: 'contact@darulhana.org',
    students: '120+',
    teachers: '10',
  },
  {
    id: 3,
    name: 'Tahfiz Academy',
    state: 'Kano',
    phone: '+234 (0) 803 456 7890',
    email: 'admin@tahfizacademy.ng',
    students: '180+',
    teachers: '15',
  },
];

const MadrasatuTahfizPreview = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-2">
              Network Directory
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
              Madrasatu Tahfiz
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Partner schools across Nigeria dedicated to Qur'anic memorization and Islamic education.
            </p>
          </div>
          <Link
            to="/madrasatu-tahfiz"
            className="inline-flex items-center gap-2 bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition whitespace-nowrap"
          >
            Browse All Schools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* School Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schools.map(({ id, name, state, phone, email, students, teachers }) => (
            <div
              key={id}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-emerald-200 transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {name}
                  </h3>
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold text-sm">
                    <MapPin className="w-4 h-4" />
                    {state}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-slate-200">
                <div>
                  <p className="text-2xl font-bold text-emerald-700">{students}</p>
                  <p className="text-xs text-slate-600">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-700">{teachers}</p>
                  <p className="text-xs text-slate-600">Teachers</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-700 mt-1 flex-shrink-0" />
                  <a href={`tel:${phone}`} className="text-sm text-slate-600 hover:text-emerald-700">
                    {phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-700 mt-1 flex-shrink-0" />
                  <a href={`mailto:${email}`} className="text-sm text-slate-600 hover:text-emerald-700">
                    {email}
                  </a>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-3 text-emerald-700 font-semibold border-2 border-emerald-700 rounded-lg hover:bg-emerald-50 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MadrasatuTahfizPreview;
