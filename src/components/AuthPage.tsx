
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sponsorName, setSponsorName] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '+91 9876543210',
        userId: 'AU00001',
        referralCode: 'JD001',
        joinDate: '2024-01-15',
        kycStatus: 'verified',
        rank: 'Silver',
        mainBalance: 45000,
        topupBalance: 12000,
        purchasedAmount: 25000,
        referralBonus: 15000,
        totalTeam: 45,
        directTeam: 8,
        businessVolume: 125000,
        stkBalance: 1500,
      };

      onLogin(mockUser);
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to your account.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: '2',
        name: 'New User',
        email: 'newuser@example.com',
        mobile: '+91 9876543211',
        userId: 'AU00002',
        referralCode: 'NU002',
        sponsorName: sponsorName || undefined,
        joinDate: new Date().toISOString().split('T')[0],
        kycStatus: 'pending',
        rank: 'Wood',
        mainBalance: 0,
        topupBalance: 0,
        purchasedAmount: 0,
        referralBonus: 0,
        totalTeam: 0,
        directTeam: 0,
        businessVolume: 0,
        stkBalance: 0,
      };

      onLogin(newUser);
      toast({
        title: "Account created!",
        description: "Welcome to AlkalineAmrit. Please complete your KYC.",
      });
      setIsLoading(false);
    }, 2000);
  };

  const verifyReferralCode = (code: string) => {
    if (code) {
      // Simulate API call to verify referral code
      setTimeout(() => {
        setSponsorName('Jane Smith');
        toast({
          title: "Referral verified",
          description: "Sponsor: Jane Smith",
        });
      }, 500);
    } else {
      setSponsorName('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">AA</span>
          </div>
          <CardTitle className="text-2xl text-white">AlkalineAmrit</CardTitle>
          <CardDescription className="text-gray-300">
            Transform your health, transform your wealth
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" className="space-y-4">
            <TabsList className="grid grid-cols-2 w-full bg-white/10 border border-white/20">
              <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white/20">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email or User ID</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Enter email or user ID"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter email"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-white">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter mobile number"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="side" className="text-white">Preferred Side</Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select side" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referral" className="text-white">Referral Code (Optional)</Label>
                  <Input
                    id="referral"
                    type="text"
                    placeholder="Enter referral code"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    onChange={(e) => verifyReferralCode(e.target.value)}
                  />
                  {sponsorName && (
                    <p className="text-green-400 text-sm">Sponsor: {sponsorName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create password"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm password"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
