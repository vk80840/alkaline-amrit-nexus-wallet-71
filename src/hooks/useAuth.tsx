
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
  preferred_side?: 'left' | 'right';
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

// Local storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'alkaline_user_profile',
  USER_WALLET: 'alkaline_user_wallet',
  AUTH_STATE: 'alkaline_auth_state'
};

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

  // Load cached data from localStorage
  const loadCachedData = () => {
    try {
      const cachedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      const cachedWallet = localStorage.getItem(STORAGE_KEYS.USER_WALLET);
      
      if (cachedProfile) {
        setProfile(JSON.parse(cachedProfile));
      }
      if (cachedWallet) {
        setWallet(JSON.parse(cachedWallet));
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
      // Clear corrupted cache
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      localStorage.removeItem(STORAGE_KEYS.USER_WALLET);
    }
  };

  // Save data to localStorage
  const cacheUserData = (profileData: Profile | null, walletData: Wallet | null) => {
    try {
      if (profileData) {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profileData));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      }
      
      if (walletData) {
        localStorage.setItem(STORAGE_KEYS.USER_WALLET, JSON.stringify(walletData));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER_WALLET);
      }
    } catch (error) {
      console.error('Error caching user data:', error);
    }
  };

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
        throw new Error(`Profile fetch error: ${profileError.message}`);
      }

      if (!profileData) {
        throw new Error('Profile not found');
      }

      // Fetch wallet
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', profileData.id)
        .single();

      if (walletError) {
        throw new Error(`Wallet fetch error: ${walletError.message}`);
      }

      if (!walletData) {
        throw new Error('Wallet not found');
      }

      // Update state and cache
      setProfile(profileData);
      setWallet(walletData);
      cacheUserData(profileData, walletData);
      
      return { profile: profileData, wallet: walletData };
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying fetch user data (${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
        return fetchUserData(userId, retryCount + 1);
      }
      
      setError(error.message || 'Failed to load user data');
      
      // If we have cached data and fetch fails, keep using cached data
      if (profile && wallet) {
        console.log('Using cached user data due to fetch failure');
        return { profile, wallet };
      }
      
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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, name: string, mobile: string, sponsorCode?: string) => {
    setError(null);
    let sponsor = null;
    
    // If sponsor code is provided, find the sponsor
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
  };

  const signOut = async () => {
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear state and cache
    setUser(null);
    setProfile(null);
    setWallet(null);
    cacheUserData(null, null);
    localStorage.removeItem(STORAGE_KEYS.AUTH_STATE);
  };

  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      try {
        // Load cached data first for faster UI
        loadCachedData();
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setError(error.message);
          return;
        }

        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          
          try {
            await fetchUserData(session.user.id);
          } catch (error) {
            console.error('Initial user data fetch failed:', error);
            // Don't set error here if we have cached data
            if (!profile || !wallet) {
              setError('Failed to load user data. Please try refreshing.');
            }
          }
        } else {
          // No session, clear everything
          setUser(null);
          setProfile(null);
          setWallet(null);
          cacheUserData(null, null);
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
        }
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setWallet(null);
          cacheUserData(null, null);
          setError(null);
        } else if (session?.user) {
          setUser(session.user);
          
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            try {
              await fetchUserData(session.user.id);
            } catch (error) {
              console.error('Auth state change user data fetch failed:', error);
              if (!profile || !wallet) {
                setError('Failed to load user data. Please try refreshing.');
              }
            }
          }
        }
        
        if (authInitialized) {
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Additional effect to handle loading state more precisely
  useEffect(() => {
    if (authInitialized) {
      // Only stop loading if we have auth state determined
      if (user === null || (user && profile && wallet)) {
        setLoading(false);
      } else if (user && (!profile || !wallet) && !error) {
        // We have a user but missing profile/wallet data, keep loading
        setLoading(true);
      }
    }
  }, [user, profile, wallet, authInitialized, error]);

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
