
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  auth_id: string;
  name: string;
  email: string;
  mobile: string;
  referral_code: string;
  sponsor_id?: string;
  sponsor_name?: string;
  preferred_side?: 'left' | 'right' | null;
  join_date: string;
  kyc_status: 'pending' | 'verified' | 'rejected';
  rank: string;
  profile_image?: string;
}

interface Wallet {
  id: string;
  user_id: string;
  main_balance: number;
  topup_balance: number;
  purchased_amount: number;
  referral_bonus: number;
  business_volume: number;
  stk_balance: number;
}

interface AuthContextType {
  user: SupabaseUser | null;
  profile: Profile | null;
  wallet: Wallet | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, mobile: string, sponsorCode?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  retryAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  const fetchUserData = async (userId: string, retryCount = 0): Promise<{ profile: Profile | null, wallet: Wallet | null }> => {
    const MAX_RETRIES = 3;
    
    try {
      setError(null);
      
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_id', userId)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw new Error(`Profile fetch error: ${profileError.message}`);
      }

      if (!profileData) {
        throw new Error('Profile not found');
      }

      // Ensure preferred_side is properly typed
      const typedProfile: Profile = {
        ...profileData,
        preferred_side: profileData.preferred_side as 'left' | 'right' | null
      };

      // Fetch wallet
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', profileData.id)
        .single();

      if (walletError) {
        console.error('Wallet fetch error:', walletError);
        throw new Error(`Wallet fetch error: ${walletError.message}`);
      }

      if (!walletData) {
        throw new Error('Wallet not found');
      }

      // Update state
      setProfile(typedProfile);
      setWallet(walletData);
      
      return { profile: typedProfile, wallet: walletData };
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying fetch user data (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
        return fetchUserData(userId, retryCount + 1);
      }
      
      setError(error.message || 'Failed to load user data');
      throw error;
    }
  };

  const refreshUserData = async () => {
    if (user) {
      try {
        await fetchUserData(user.id);
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
  };

  const retryAuth = async () => {
    if (user) {
      setLoading(true);
      setError(null);
      try {
        await fetchUserData(user.id);
      } catch (error) {
        console.error('Error retrying auth:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      console.log('Sign in successful, waiting for auth state change...');
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string, mobile: string, sponsorCode?: string) => {
    setError(null);
    setLoading(true);
    
    try {
      let sponsor = null;
      
      if (sponsorCode) {
        const { data: sponsorData } = await supabase
          .from('profiles')
          .select('id, name')
          .eq('referral_code', sponsorCode)
          .single();
        
        if (sponsorData) {
          sponsor = sponsorData;
        }
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            mobile,
            sponsor_id: sponsor?.id,
            sponsor_name: sponsor?.name,
          }
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setWallet(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setError(error.message);
          return;
        }

        if (!mounted) return;

        if (session?.user) {
          console.log('Found existing session for user:', session.user.id);
          setUser(session.user);
          
          try {
            await fetchUserData(session.user.id);
            console.log('User data fetched successfully');
          } catch (error) {
            console.error('Initial user data fetch failed:', error);
          }
        } else {
          console.log('No existing session found');
          setUser(null);
          setProfile(null);
          setWallet(null);
        }
      } catch (error: any) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setError(error.message || 'Authentication initialization failed');
        }
      } finally {
        if (mounted) {
          setAuthInitialized(true);
          setLoading(false);
          console.log('Auth initialization complete');
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.id);
        
        try {
          if (event === 'SIGNED_OUT') {
            console.log('User signed out');
            setUser(null);
            setProfile(null);
            setWallet(null);
            setError(null);
            setLoading(false);
          } else if (session?.user) {
            console.log('User session detected:', session.user.id);
            setUser(session.user);
            
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
              console.log('Fetching user data for event:', event);
              setLoading(true);
              try {
                await fetchUserData(session.user.id);
                console.log('User data fetch completed');
              } catch (error) {
                console.error('Auth state change user data fetch failed:', error);
              } finally {
                setLoading(false);
              }
            }
          } else {
            console.log('No user in session');
            setUser(null);
            setProfile(null);
            setWallet(null);
            setLoading(false);
          }
        } catch (error: any) {
          console.error('Error in auth state change handler:', error);
          setError(error.message);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      wallet,
      loading,
      error,
      signIn,
      signUp,
      signOut,
      refreshUserData,
      retryAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};
