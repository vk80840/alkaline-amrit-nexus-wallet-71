
import React, { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Check } from 'lucide-react';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [selectedSide, setSelectedSide] = useState('');
  
  // Forgot password states
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [associatedUserId, setAssociatedUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    setReferralCode(code);
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
      setSelectedSide('');
    }
  };

  const handleForgotPasswordEmailSubmit = () => {
    if (forgotEmail) {
      // Simulate finding associated user ID
      setAssociatedUserId('AU00001');
      setForgotPasswordStep(2);
      toast({
        title: "User found",
        description: "Associated User ID displayed below",
      });
    }
  };

  const handleSendOTP = () => {
    setForgotPasswordStep(3);
    toast({
      title: "OTP Sent",
      description: "Please check your email for the verification code",
    });
  };

  const handleOTPVerification = () => {
    if (otp.length === 6) {
      setForgotPasswordStep(4);
      toast({
        title: "OTP Verified",
        description: "Please set your new password",
      });
    }
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      setForgotPasswordStep(5);
      toast({
        title: "Password Changed Successfully",
        description: "You can now login with your new password",
      });
      // Reset after 3 seconds
      setTimeout(() => {
        setForgotPasswordOpen(false);
        setForgotPasswordStep(1);
        setForgotEmail('');
        setAssociatedUserId('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
      }, 3000);
    } else {
      toast({
        title: "Password Error",
        description: "Passwords don't match or are too short",
        variant: "destructive",
      });
    }
  };

  const resetForgotPassword = () => {
    setForgotPasswordStep(1);
    setForgotEmail('');
    setAssociatedUserId('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl relative z-10">
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
                
                <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="w-full text-white/80 hover:text-white">
                      Forgot Password?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        {forgotPasswordStep > 1 && forgotPasswordStep < 5 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetForgotPassword}
                            className="mr-2"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                        )}
                        Reset Password
                      </DialogTitle>
                      <DialogDescription>
                        {forgotPasswordStep === 1 && "Enter your email to find your user ID"}
                        {forgotPasswordStep === 2 && "Your associated user ID"}
                        {forgotPasswordStep === 3 && "Enter the OTP sent to your email"}
                        {forgotPasswordStep === 4 && "Set your new password"}
                        {forgotPasswordStep === 5 && "Password changed successfully!"}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {forgotPasswordStep === 1 && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="forgot-email">Email Address</Label>
                            <Input
                              id="forgot-email"
                              type="email"
                              placeholder="Enter your email"
                              value={forgotEmail}
                              onChange={(e) => setForgotEmail(e.target.value)}
                            />
                          </div>
                          <Button 
                            onClick={handleForgotPasswordEmailSubmit}
                            className="w-full"
                            disabled={!forgotEmail}
                          >
                            Find User ID
                          </Button>
                        </>
                      )}

                      {forgotPasswordStep === 2 && (
                        <>
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-green-800">
                              Associated User ID: <span className="font-bold">{associatedUserId}</span>
                            </p>
                          </div>
                          <Button onClick={handleSendOTP} className="w-full">
                            Send OTP
                          </Button>
                        </>
                      )}

                      {forgotPasswordStep === 3 && (
                        <>
                          <div className="space-y-2">
                            <Label>Enter 6-digit OTP</Label>
                            <InputOTP
                              maxLength={6}
                              value={otp}
                              onChange={(value) => setOtp(value)}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                          <Button 
                            onClick={handleOTPVerification}
                            className="w-full"
                            disabled={otp.length !== 6}
                          >
                            Verify OTP
                          </Button>
                        </>
                      )}

                      {forgotPasswordStep === 4 && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                              id="new-password"
                              type="password"
                              placeholder="Enter new password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                            <Input
                              id="confirm-new-password"
                              type="password"
                              placeholder="Confirm new password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </div>
                          <Button 
                            onClick={handlePasswordChange}
                            className="w-full"
                            disabled={!newPassword || !confirmPassword}
                          >
                            Change Password
                          </Button>
                        </>
                      )}

                      {forgotPasswordStep === 5 && (
                        <div className="text-center py-6">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-green-800 mb-2">
                            Password Changed Successfully!
                          </h3>
                          <p className="text-sm text-gray-600">
                            You can now login with your new password
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
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
                  <Label htmlFor="referral" className="text-white">Referral Code (Optional)</Label>
                  <Input
                    id="referral"
                    type="text"
                    placeholder="Enter referral code"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    value={referralCode}
                    onChange={(e) => verifyReferralCode(e.target.value)}
                  />
                  {sponsorName && (
                    <p className="text-green-400 text-sm">Sponsor: {sponsorName}</p>
                  )}
                </div>
                {referralCode && (
                  <div className="space-y-2">
                    <Label htmlFor="side" className="text-white">Preferred Side</Label>
                    <Select value={selectedSide} onValueChange={setSelectedSide}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select side" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
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
