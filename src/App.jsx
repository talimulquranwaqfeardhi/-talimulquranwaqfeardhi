import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';

import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/layouts/ProtectedRoute';
import { AuthProvider } from '@/context/AuthProvider';

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
import TeacherDirectoryPage from '@/pages/TeacherDirectoryPage';
import LearningRegistrationPage from '@/pages/LearningRegistrationPage';
// import SearchPage from '@/pages/SearchPage';
import LoginPage from '@/pages/LoginPage';
import TalimDashboard from '@/pages/admin/TalimDashboard';
import WaqfeArdhiDashboard from '@/pages/admin/WaqfeArdhiDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
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
              <Route path="teacher-directory" element={<TeacherDirectoryPage />} />
              <Route path="learning-registration" element={<LearningRegistrationPage />} />
              {/* <Route path="search" element={<SearchPage />} /> */}
              <Route path="arabic" element={<ArabicPage />} />
              <Route path="madrasatu-tahfiz" element={<MadrasasPage />} />
              <Route path="waqf" element={<WaqfPage />} />
              <Route path="resources" element={<ResourcesPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin', 'talim-admin', 'waqfe-admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="talim" replace />} />
              <Route path="talim" element={<TalimDashboard />} />
              <Route path="waqfe-ardhi" element={<WaqfeArdhiDashboard />} />
            </Route>
          </Routes>

          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;