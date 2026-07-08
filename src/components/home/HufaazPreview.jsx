import { Link } from 'react-router-dom';
import { Database, Lock, UserCheck, ArrowRight } from 'lucide-react';

const HufaazPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-3xl overflow-hidden">
          {/* Content */}
          <div className="relative px-8 py-16 sm:px-12 sm:py-20 text-center">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 right-8 w-32 h-32 bg-white rounded-full blur-2xl" />
              <div className="absolute bottom-8 left-8 w-40 h-40 bg-white rounded-full blur-2xl" />
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6 backdrop-blur">
                <Database className="w-8 h-8 text-white" />
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                Certified Huffaaz Directory
              </h2>

              {/* Description */}
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Access verified records of certified Huffaaz across our network. Search by region, specialization, and availability.
              </p>

              {/* Notice */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-white/30">
                <Lock className="w-4 h-4" />
                Login Required to Access
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
                >
                  <UserCheck className="w-5 h-5" />
                  Access Database
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-emerald-700 mb-2">2,000+</div>
            <p className="text-slate-600">Huffaaz Profiles</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-emerald-700 mb-2">50+</div>
            <p className="text-slate-600">States Covered</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-emerald-700 mb-2">100%</div>
            <p className="text-slate-600">Verified Records</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HufaazPreview;
