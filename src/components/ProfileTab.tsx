
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User as UserIcon, MapPin, CreditCard, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProfileTabProps {
  user: User;
}

const ProfileTab = ({ user }: ProfileTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    walletAddress: 'wallet123456789',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [shippingData, setShippingData] = useState({
    mobile: user.mobile,
    alternateMobile: '',
    address: '',
    pincode: '',
    landmark: '',
    state: '',
    district: '',
  });

  const [bankData, setBankData] = useState({
    accountHolder: user.name,
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branch: '',
  });

  const [kycData, setKycData] = useState({
    panNumber: '',
    aadharNumber: '',
    panImage: null,
    aadharFront: null,
    aadharBack: null,
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleShippingUpdate = () => {
    toast({
      title: "Shipping Address Updated",
      description: "Your shipping address has been saved successfully.",
    });
  };

  const handleBankUpdate = () => {
    toast({
      title: "Bank Details Updated",
      description: "Your bank details have been saved successfully.",
    });
  };

  const handleKycSubmit = () => {
    toast({
      title: "KYC Submitted",
      description: "Your KYC documents have been submitted for verification.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full bg-white/60 backdrop-blur-lg border border-white/20">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
          <TabsTrigger value="kyc">KYC</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Manage your personal information and password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="w-20 h-20 rounded-full" />
                  ) : (
                    <span className="text-white font-bold text-2xl">{user.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <Button variant="outline">Upload Image</Button>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    value={user.mobile}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">Mobile cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input
                    id="walletAddress"
                    value={profileData.walletAddress}
                    onChange={(e) => setProfileData({...profileData, walletAddress: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referralCode">Referral Code</Label>
                  <Input
                    id="referralCode"
                    value={user.referralCode}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label>User ID</Label>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{user.userId}</Badge>
                    <Badge variant={user.kycStatus === 'verified' ? 'default' : 'destructive'}>
                      {user.kycStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Password Change Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <>
                    <Button onClick={handleProfileUpdate}>Update Profile</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Shipping Address
              </CardTitle>
              <CardDescription>Manage your delivery address information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    value={shippingData.mobile}
                    onChange={(e) => setShippingData({...shippingData, mobile: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternateMobile">Alternate Mobile</Label>
                  <Input
                    id="alternateMobile"
                    value={shippingData.alternateMobile}
                    onChange={(e) => setShippingData({...shippingData, alternateMobile: e.target.value})}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                    placeholder="Enter complete address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={shippingData.pincode}
                    onChange={(e) => setShippingData({...shippingData, pincode: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    value={shippingData.landmark}
                    onChange={(e) => setShippingData({...shippingData, landmark: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={shippingData.state}
                    onChange={(e) => setShippingData({...shippingData, state: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={shippingData.district}
                    onChange={(e) => setShippingData({...shippingData, district: e.target.value})}
                  />
                </div>
              </div>

              <Button onClick={handleShippingUpdate} className="w-full md:w-auto">
                Save Address
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank">
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Bank Details
              </CardTitle>
              <CardDescription>Manage your banking information for withdrawals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountHolder">Account Holder Name</Label>
                  <Input
                    id="accountHolder"
                    value={bankData.accountHolder}
                    onChange={(e) => setBankData({...bankData, accountHolder: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={bankData.accountNumber}
                    onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    value={bankData.ifscCode}
                    onChange={(e) => setBankData({...bankData, ifscCode: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={bankData.bankName}
                    onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    value={bankData.branch}
                    onChange={(e) => setBankData({...bankData, branch: e.target.value})}
                  />
                </div>
              </div>

              <Button onClick={handleBankUpdate} className="w-full md:w-auto">
                Save Bank Details
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyc">
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                KYC Verification
              </CardTitle>
              <CardDescription>Upload your documents for identity verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={kycData.panNumber}
                    onChange={(e) => setKycData({...kycData, panNumber: e.target.value})}
                    placeholder="ABCDE1234F"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadharNumber">Aadhaar Number</Label>
                  <Input
                    id="aadharNumber"
                    value={kycData.aadharNumber}
                    onChange={(e) => setKycData({...kycData, aadharNumber: e.target.value})}
                    placeholder="1234 5678 9012"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="panImage">PAN Card Image</Label>
                  <Input
                    id="panImage"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadharFront">Aadhaar Front</Label>
                  <Input
                    id="aadharFront"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadharBack">Aadhaar Back</Label>
                  <Input
                    id="aadharBack"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Guidelines:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Ensure all documents are clear and readable</li>
                  <li>• Upload images in JPG, PNG format (max 2MB each)</li>
                  <li>• All details must match your profile information</li>
                  <li>• KYC verification may take 2-3 business days</li>
                </ul>
              </div>

              <Button onClick={handleKycSubmit} className="w-full md:w-auto">
                Submit for Verification
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTab;
