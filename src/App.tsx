
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import AuthPage from "@/components/AuthPage";
import Dashboard from "@/components/Dashboard";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, profile, wallet, loading, error, retryAuth, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading...</h2>
          <p className="text-gray-500">Please wait while we set up your account</p>
          <div className="mt-4 text-sm text-gray-400">
            {user ? 'Loading user data...' : 'Checking authentication...'}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          
          <Alert className="mb-6 text-left">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button 
              onClick={retryAuth} 
              className="w-full"
              variant="default"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            <Button 
              onClick={signOut} 
              variant="outline" 
              className="w-full"
            >
              Sign Out & Restart
            </Button>
            
            <Button 
              onClick={() => window.location.reload()} 
              variant="ghost" 
              className="w-full"
            >
              Refresh Page
            </Button>
          </div>
        </div>
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
        <Route path="/" element={<Dashboard user={dashboardUser} onLogout={signOut} />} />
        <Route path="*" element={<Dashboard user={dashboardUser} onLogout={signOut} />} />
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
