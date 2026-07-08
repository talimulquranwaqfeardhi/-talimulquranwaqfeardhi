import { Link } from 'react-router-dom';
import { FileText, Music, BookMarked, Download, ArrowRight } from 'lucide-react';

const resources = [
  {
    id: 'pdfs',
    icon: FileText,
    title: 'PDF Guides',
    description: 'Comprehensive learning materials, syllabi, and study guides in PDF format.',
    count: '50+',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'audio',
    icon: Music,
    title: 'Audio Lectures',
    description: 'Recorded sessions, recitations, and lectures available for download.',
    count: '200+',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'teaching',
    icon: BookMarked,
    title: 'Teaching Materials',
    description: 'Resources for educators including lesson plans and classroom materials.',
    count: '100+',
    color: 'from-purple-500 to-purple-600',
  },
];

const ResourcesPreview = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-2">
            Learning Materials
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Resources
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Access our complete library of educational materials to support your Qur'anic learning journey.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {resources.map(({ id, icon: Icon, title, description, count, color }) => (
            <div
              key={id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100"
            >
              {/* Header with icon */}
              <div className={`bg-gradient-to-br ${color} p-8 text-white`}>
                <Icon className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-white/80 text-sm mt-1">{count} items</p>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-slate-600 mb-6">
                  {description}
                </p>

                {/* CTA Button */}
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900"
                >
                  <Download className="w-4 h-4" />
                  Download
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-100">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Need Learning Support?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Browse our complete resource library or get personalized recommendations from our educators.
          </p>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition"
          >
            View All Resources
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
