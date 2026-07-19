import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/Footer';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';

const MainLayout = () => {
  const location = useLocation();
  useRevealOnScroll(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950">
      <Navbar />
      <main className="flex-1 page-transition">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
