import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (!mounted) return;

        if (sessionError) {
          setError(sessionError);
        }

        setSession(data?.session ?? null);
        setUser(data?.session?.user ?? null);
      } catch (err) {
        if (!mounted) return;
        setError(err);
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    }

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, payload) => {
      if (!mounted) return;
      setSession(payload.session ?? null);
      setUser(payload.session?.user ?? null);
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  const signInWithEmail = async (email) => {
    setIsLoading(true);
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    setIsLoading(false);
    if (signInError) throw signInError;
  };

  const signOut = async () => {
    setIsLoading(true);
    const { error: signOutError } = await supabase.auth.signOut();
    setIsLoading(false);
    if (signOutError) throw signOutError;
  };

  const adminEmails = useMemo(() => {
    const configured = import.meta.env.VITE_ADMIN_EMAILS || '';
    return configured
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const userRoles = useMemo(() => {
    const roles = new Set();

    const pushRole = (value) => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach((item) => item && roles.add(String(item).toLowerCase()));
      } else {
        roles.add(String(value).toLowerCase());
      }
    };

    pushRole(user?.user_metadata?.role);
    pushRole(user?.user_metadata?.roles);
    pushRole(user?.app_metadata?.role);
    pushRole(user?.app_metadata?.roles);

    return Array.from(roles);
  }, [user]);

  const isAdmin = useMemo(() => {
    if (!user) return false;
    if (adminEmails.includes(user.email?.toLowerCase())) return true;

    const normalizedRoles = new Set(userRoles.map((role) => role.toLowerCase()));
    const adminRoleNames = ['admin', 'administrator', 'superadmin', 'waqf-admin', 'talim-admin', 'waqfe-admin'];

    return adminRoleNames.some((allowedRole) => normalizedRoles.has(allowedRole));
  }, [user, userRoles, adminEmails]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        error,
        signInWithEmail,
        signOut,
        isAdmin,
        userRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
