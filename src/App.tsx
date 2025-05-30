
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import AuthPage from "@/components/AuthPage";
import Dashboard from "@/components/Dashboard";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, profile, wallet, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || !profile || !wallet) {
    return <AuthPage />;
  }

  // Convert database profile to User type for Dashboard
  const dashboardUser = {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    mobile: profile.mobile,
    userId: profile.id,
    referralCode: profile.referral_code,
    sponsorName: profile.sponsor_name,
    joinDate: profile.join_date,
    kycStatus: profile.kyc_status,
    rank: profile.rank,
    profileImage: profile.profile_image,
    mainBalance: wallet.main_balance,
    topupBalance: wallet.topup_balance,
    purchasedAmount: wallet.purchased_amount,
    referralBonus: wallet.referral_bonus,
    totalTeam: 0, // Will be fetched from team_structure
    directTeam: 0, // Will be fetched from team_structure
    businessVolume: wallet.business_volume,
    stkBalance: wallet.stk_balance,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard user={dashboardUser} onLogout={() => {}} />} />
        <Route path="*" element={<Dashboard user={dashboardUser} onLogout={() => {}} />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
