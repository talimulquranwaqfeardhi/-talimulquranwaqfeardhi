import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';

import MainLayout from '@/layouts/MainLayout';

import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import TafsirPage from '@/pages/talim/TafsirPage';
import TajweedPage from '@/pages/talim/TajweedPage';
import TarjumatPage from '@/pages/talim/TarjumatPage';
import ArabicPage from '@/pages/ArabicPage';
import WaqfPage from '@/pages/WaqfPage';
import ResourcesPage from '@/pages/ResourcesPage';

import HuffaazDBPage from '@/pages/HuffaazDBPage';
import MadrasasPage from '@/pages/MadrasasPage';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />

            {/* Ta'lim Classes */}
            <Route path="talim">
              <Route path="tafsir" element={<TafsirPage />} />
              <Route path="tajweed" element={<TajweedPage />} />
              <Route path="tarjumat" element={<TarjumatPage />} />
              
            </Route>
            <Route path="huffaaz-db" element={<HuffaazDBPage />} />
            <Route path="arabic" element={<ArabicPage />} />
            <Route path="huffaaz-db" element={<HuffaazDBPage />} />
            <Route path="madrasatu-tahfiz" element={<MadrasasPage />} />
            <Route path="waqf" element={<WaqfPage />} />
            <Route path="resources" element={<ResourcesPage />} />

            {/* ... other routes */}
          </Route>
        </Routes>

        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;