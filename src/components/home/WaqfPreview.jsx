import { Link } from 'react-router-dom';
import { Sprout, Users, MapPin, ArrowRight } from 'lucide-react';

const WaqfPreview = () => {
  const progress = 65; // 65% funded
  const amountRaised = 325000;
  const goalAmount = 500000;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 mb-2">
            Community Development
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Waqf-e-Ardhi
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Support sustainable land endowment projects that will secure Qur'anic education for generations to come.
          </p>
        </div>

        {/* Featured Project */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image/Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-3xl blur-2xl opacity-40" />
            <div className="relative bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl p-12 flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Sprout className="w-12 h-12 text-emerald-700" />
                </div>
                <p className="text-emerald-900 font-semibold text-lg">Quranic Learning Center</p>
                <p className="text-emerald-700 text-sm mt-2">Kano State, Nigeria</p>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Establishment of Regional Learning Center
            </h3>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              This Waqf project aims to establish a modern Qur'anic learning facility in Kano State. The center will serve as a hub for teacher training, student education, and community Islamic programs.
            </p>

            {/* Project Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <span className="text-slate-700">Kano State, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <span className="text-slate-700">Benefiting 500+ students and teachers</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-slate-900">Funding Progress</p>
                <p className="text-sm font-bold text-emerald-700">{progress}%</p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Amount Info */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600 uppercase font-semibold mb-1">Raised</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {formatCurrency(amountRaised)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase font-semibold mb-1">Goal</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(goalAmount)}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/waqf-e-ardhi/donate"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition"
              >
                Donate Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/waqf-e-ardhi"
                className="inline-flex items-center justify-center gap-2 border-2 border-emerald-700 text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Make a Lasting Impact
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Every contribution to Waqf-e-Ardhi creates an ongoing source of benefit for Qur'anic education.
          </p>
          <Link
            to="/waqf-e-ardhi"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            Explore All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WaqfPreview;
