
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
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, mobile: string, sponsorCode?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
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

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_id', userId)
        .single();

      if (profileError) throw profileError;

      // Fetch wallet
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', profileData.id)
        .single();

      if (walletError) throw walletError;

      setProfile(profileData);
      setWallet(walletData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, name: string, mobile: string, sponsorCode?: string) => {
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
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
    setWallet(null);
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserData(session.user.id);
        } else {
          setProfile(null);
          setWallet(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      wallet,
      loading,
      signIn,
      signUp,
      signOut,
      refreshUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};
