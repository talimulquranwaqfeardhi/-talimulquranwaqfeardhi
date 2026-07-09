import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About Us */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Ta'limul Qur'an & Waqfe Ardhi Nigeria logo"
                className="h-10 w-10 rounded-full object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-white">Talim ul Quran</span>
                <span className="text-xs text-slate-400">Waqf Centre</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Advancing Qur'anic education across Nigeria through community programs, teacher training, and sustainable Waqf initiatives.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white mb-3">Our Mission</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                To empower communities with access to quality Qur'anic education and Islamic knowledge.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/talim/tafsir" className="text-sm text-slate-400 hover:text-white transition">
                  Ta'lim Classes
                </Link>
              </li>
              <li>
                <Link to="/ITQARegistration/student" className="text-sm text-slate-400 hover:text-white transition">
                  ITQA Registration
                </Link>
              </li>
              <li>
                <Link to="/huffaaz-db" className="text-sm text-slate-400 hover:text-white transition">
                  Hufaaz Database
                </Link>
              </li>
              <li>
                <Link to="/madrasatu-tahfiz" className="text-sm text-slate-400 hover:text-white transition">
                  Madrasas
                </Link>
              </li>
              <li>
                <Link to="/waqf" className="text-sm text-slate-400 hover:text-white transition">
                  Waqf-e-Ardhi
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-slate-400 hover:text-white transition">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Headquarters</p>
                  <p className="text-xs text-slate-400 mt-1">Abuja, Nigeria</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <a href="tel:+2348012345678" className="text-sm text-slate-400 hover:text-white transition">
                  +234 (0) 801 234 5678
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@talim-qa.org" className="text-sm text-slate-400 hover:text-white transition">
                  info@talim-qa.org
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Follow Us</h3>
            <p className="text-sm text-slate-400 mb-6">
              Connect with us on social media for updates and announcements.
            </p>
            {/* TODO: href="#" placeholders — swap in your real social URLs when ready */}
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center justify-center text-white transition"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center justify-center text-white transition"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center justify-center text-white transition"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center justify-center text-white transition"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800" />

        {/* Bottom Section */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {currentYear} Talim ul Quran Waqf Centre. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;