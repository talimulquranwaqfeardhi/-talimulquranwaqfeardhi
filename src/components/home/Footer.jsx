import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#04110f] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10 lg:grid-cols-3">
        <div>
          <h4 className="font-semibold text-white mb-3">Talim ul Quran</h4>
          <p className="text-sm leading-7 text-slate-300">
            Advancing Qur'anic education through community programs and sustainable Waqf projects.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link to="/talim/tafsir" className="transition hover:text-white">Ta'lim Classes</Link></li>
            <li><Link to="/ITQARegistration/student" className="transition hover:text-white">ITQA Registration</Link></li>
            <li><Link to="/huffaaz-db" className="transition hover:text-white">Hufaaz DB</Link></li>
            <li><Link to="/madrasatu-tahfiz" className="transition hover:text-white">Madrasatu Tahfiz</Link></li>
            <li><Link to="/waqf" className="transition hover:text-white">Waqf-e-Ardhi</Link></li>
            <li><Link to="/resources" className="transition hover:text-white">Resources</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm text-slate-300">info@talim-qa.org</p>
          <p className="mt-4 text-sm text-slate-500">© {new Date().getFullYear()} Talim ul Quran Waqf Centre</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;