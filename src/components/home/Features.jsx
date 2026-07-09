import { Link } from 'react-router-dom';
import { Download, FileText, Play, BookOpen } from 'lucide-react';

const FeatureCard = ({ icon, title, description, to }) => (
  <Link
    to={to}
    className="group flex flex-col gap-4 rounded-[2rem] border border-slate-900 bg-[#081514] p-6 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:shadow-2xl"
  >
    <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-100 text-amber-900 shadow-sm">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-amber-300 transition group-hover:text-amber-200">
      Explore
    </span>
  </Link>
);

const Features = () => {
  return (
    <section className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 py-20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Our Services</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">What We Offer</h2>
          <p className="mt-3 text-base text-slate-400 max-w-2xl mx-auto">
            Access our most important programs, from skills development to land endowment initiatives that support sustainable Qur'anic education.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard icon={<Download className="h-6 w-6" />} title="Ta'lim Classes" description="Find and join local Ta'lim classes." to="/talim/tafsir" />
          <FeatureCard icon={<FileText className="h-6 w-6" />} title="ITQA Registration" description="Register for ITQA student programs." to="/ITQARegistration/student" />
          <FeatureCard icon={<Play className="h-6 w-6" />} title="Hufaaz Database" description="Browse the Hufaaz database and recordings." to="/huffaaz-db" />
          <FeatureCard icon={<BookOpen className="h-6 w-6" />} title="Waqf-e-Ardhi" description="Learn about our Waqf land initiatives." to="/waqf" />
        </div>
      </div>
    </section>
  );
};

export default Features;