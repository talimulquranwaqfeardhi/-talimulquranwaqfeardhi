import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isLoading, isAdmin, userRoles } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
        <p className="text-sm text-slate-600">Verifying access. Please wait…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0) {
    const normalizedAllowed = allowedRoles.map((role) => String(role || '').toLowerCase());
    const normalizedUserRoles = userRoles.map((role) => String(role || '').toLowerCase());
    const hasAllowedRole = normalizedUserRoles.some((role) => normalizedAllowed.includes(role));

    if (!hasAllowedRole && !isAdmin) {
      return (
        <div className="mx-auto my-20 max-w-2xl rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-sm">
          <h1 className="text-xl font-semibold">Access denied</h1>
          <p className="mt-3 text-sm leading-7">
            Your account does not have the required admin role to view this page. Please sign in with a verified admin account.
          </p>
        </div>
      );
    }
  }

  return children;
}
