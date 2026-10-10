import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { UserRole, CreatorProfile, BrandProfile } from '../lib/types';
import { MOCK_CREATORS, MOCK_BRANDS } from '../lib/mockData';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: UserRole | null;
  profileId: string | null;
  loading: boolean;
  isDemo: boolean;
  currentCreator: CreatorProfile;
  currentBrand: BrandProfile;
  signUp: (email: string, password: string, role: UserRole, metadata: Record<string, string>) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  loginAsDemo: (role: UserRole) => void;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateCreatorProfile: (updates: Partial<CreatorProfile>) => void;
  updateBrandProfile: (updates: Partial<BrandProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    return (localStorage.getItem('inomark_demo_role') as UserRole) || null;
  });
  const [profileId, setProfileId] = useState<string | null>(() => {
    const role = localStorage.getItem('inomark_demo_role');
    return role === 'brand' ? 'b-aura-botanica' : (role === 'creator' ? 'c-elena-vance' : null);
  });
  const [isDemo, setIsDemo] = useState<boolean>(() => {
    return localStorage.getItem('inomark_demo_active') === 'true';
  });
  const [loading, setLoading] = useState(true);

  const [currentCreator, setCurrentCreator] = useState<CreatorProfile>(MOCK_CREATORS[0]);
  const [currentBrand, setCurrentBrand] = useState<BrandProfile>(MOCK_BRANDS[0]);

  async function fetchUserRole(userId: string, fallbackRole?: UserRole) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', userId)
        .single();

      if (error || !data) {
        const detected = fallbackRole || 'creator';
        setUserRole(detected);
        setProfileId(userId);
      } else if (data) {
        setUserRole(data.role as UserRole);
        setProfileId(data.id);
      }
    } catch {
      setUserRole(fallbackRole || 'creator');
      setProfileId(userId);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Get initial Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUser(session.user);
        setIsDemo(false);
        localStorage.removeItem('inomark_demo_active');
        fetchUserRole(session.user.id, session.user.user_metadata?.role);
      } else {
        // If not authenticated via Supabase, check if a demo session was active
        const demoActive = localStorage.getItem('inomark_demo_active') === 'true';
        if (demoActive) {
          const role = (localStorage.getItem('inomark_demo_role') as UserRole) || 'creator';
          setUserRole(role);
          setProfileId(role === 'brand' ? 'b-aura-botanica' : 'c-elena-vance');
        }
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          setSession(session);
          setUser(session.user);
          setIsDemo(false);
          localStorage.removeItem('inomark_demo_active');
          await fetchUserRole(session.user.id, session.user.user_metadata?.role);
        } else {
          setSession(null);
          setUser(null);
          const demoActive = localStorage.getItem('inomark_demo_active') === 'true';
          if (!demoActive) {
            setUserRole(null);
            setProfileId(null);
          }
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  function loginAsDemo(role: UserRole) {
    setIsDemo(true);
    setUserRole(role);
    setProfileId(role === 'brand' ? 'b-aura-botanica' : 'c-elena-vance');
    localStorage.setItem('inomark_demo_active', 'true');
    localStorage.setItem('inomark_demo_role', role);
    setLoading(false);
  }

  async function signUp(
    email: string,
    password: string,
    role: UserRole,
    metadata: Record<string, string>
  ) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            full_name: metadata.full_name || '',
            company_name: metadata.company_name || '',
          },
        },
      });

      if (error) return { error };

      if (data.user) {
        // Try to insert profile directly if trigger isn't configured
        try {
          await supabase.from('profiles').insert([
            {
              id: data.user.id,
              email: email,
              role: role,
              full_name: metadata.full_name || '',
            }
          ]);

          if (role === 'creator') {
            await supabase.from('creator_profiles').insert([
              {
                user_id: data.user.id,
                display_name: metadata.full_name || 'AI Creator',
                headline: 'Generative AI Creator',
              }
            ]);
          } else {
            await supabase.from('brand_profiles').insert([
              {
                user_id: data.user.id,
                company_name: metadata.company_name || 'Brand Partner',
              }
            ]);
          }
        } catch (dbErr) {
          console.warn('Initial profile insert note:', dbErr);
        }
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { error };
      if (data.user) {
        setIsDemo(false);
        localStorage.removeItem('inomark_demo_active');
        localStorage.removeItem('inomark_demo_role');
      }
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore network errors on signout
    }
    setIsDemo(false);
    setUserRole(null);
    setProfileId(null);
    setSession(null);
    setUser(null);
    localStorage.removeItem('inomark_demo_active');
    localStorage.removeItem('inomark_demo_role');
  }

  async function resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) return { error };
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  }

  function updateCreatorProfile(updates: Partial<CreatorProfile>) {
    setCurrentCreator(prev => ({ ...prev, ...updates }));
  }

  function updateBrandProfile(updates: Partial<BrandProfile>) {
    setCurrentBrand(prev => ({ ...prev, ...updates }));
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        profileId,
        loading,
        isDemo,
        currentCreator,
        currentBrand,
        signUp,
        signIn,
        loginAsDemo,
        signOut,
        resetPassword,
        updateCreatorProfile,
        updateBrandProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
