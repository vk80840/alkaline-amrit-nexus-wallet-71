
import React from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Award,
  Copy,
  ExternalLink,
  Shield,
  Star
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DashboardContentProps {
  user: User;
}

const DashboardContent = ({ user }: DashboardContentProps) => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const ranks = [
    { name: 'Wood', required: 0, image: '🪵' },
    { name: 'Silver', required: 50000, image: '🥈' },
    { name: 'Gold', required: 100000, image: '🥇' },
    { name: 'Platinum', required: 250000, image: '💎' },
    { name: 'Diamond', required: 500000, image: '💍' },
    { name: 'Ruby', required: 1000000, image: '💎' }
  ];

  const currentRankIndex = ranks.findIndex(rank => rank.name === user.rank);
  const nextRank = ranks[currentRankIndex + 1];
  const progress = nextRank ? (user.businessVolume / nextRank.required) * 100 : 100;

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-lg border-blue-200/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
            <UserIcon className="mr-3 h-8 w-8 text-blue-600" />
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                <Badge className={`mt-1 ${user.kycStatus === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  <Shield className="mr-1 h-3 w-3" />
                  KYC: {user.kycStatus}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <UserIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">User ID</p>
                  <p className="font-semibold text-gray-800">{user.userId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Mobile</p>
                  <p className="font-semibold text-gray-800">{user.mobile}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Joined Date</p>
                  <p className="font-semibold text-gray-800">{user.joinDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Current Rank</p>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Star className="mr-1 h-3 w-3" />
                    {user.rank}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Salary Level</p>
                  <p className="font-semibold text-gray-800">Level {currentRankIndex + 1}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-700">Main Balance</p>
                <p className="text-2xl font-bold text-green-800">₹{user.mainBalance.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-700">Top-up Balance</p>
                <p className="text-2xl font-bold text-blue-800">₹{user.topupBalance.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-purple-700">Purchased Amount</p>
                <p className="text-2xl font-bold text-purple-800">₹{user.purchasedAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-100 to-red-100 border-orange-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-orange-700">Referral Bonus</p>
                <p className="text-2xl font-bold text-orange-800">₹{user.referralBonus.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team & Business Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-100 to-blue-100 border-indigo-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-700">Total Team</p>
                <p className="text-2xl font-bold text-indigo-800">{user.totalTeam}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-100 to-green-100 border-teal-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-teal-700">Direct Team</p>
                <p className="text-2xl font-bold text-teal-800">{user.directTeam}</p>
              </div>
              <Users className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-yellow-700">Business Volume</p>
                <p className="text-2xl font-bold text-yellow-800">{user.businessVolume.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Section */}
      <Card className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-lg border-purple-200/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">🔗 Referral Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 rounded-lg p-4 border border-purple-200/50">
            <p className="text-sm font-semibold text-gray-700 mb-2">Your Referral Code</p>
            <div className="flex items-center space-x-2">
              <code className="bg-gray-100 px-3 py-2 rounded-lg font-mono text-lg font-bold text-purple-700">
                {user.referralCode}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(user.referralCode, 'Referral code')}
                className="hover:bg-purple-50"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-lg p-4 border border-purple-200/50">
              <p className="text-sm font-semibold text-gray-700 mb-2">Left Referral Link</p>
              <div className="flex items-center space-x-2">
                <input 
                  readOnly 
                  value={`https://alkalineamrit.com/register?ref=${user.referralCode}&side=left`}
                  className="flex-1 text-xs bg-gray-100 px-2 py-1 rounded border"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(`https://alkalineamrit.com/register?ref=${user.referralCode}&side=left`, 'Left link')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4 border border-purple-200/50">
              <p className="text-sm font-semibold text-gray-700 mb-2">Right Referral Link</p>
              <div className="flex items-center space-x-2">
                <input 
                  readOnly 
                  value={`https://alkalineamrit.com/register?ref=${user.referralCode}&side=right`}
                  className="flex-1 text-xs bg-gray-100 px-2 py-1 rounded border"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(`https://alkalineamrit.com/register?ref=${user.referralCode}&side=right`, 'Right link')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rank Progress */}
      <Card className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 backdrop-blur-lg border-yellow-200/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">🏆 Rank Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{ranks[currentRankIndex]?.image}</span>
                <div>
                  <p className="font-bold text-lg text-gray-800">Current: {user.rank}</p>
                  {nextRank && (
                    <p className="text-sm text-gray-600">Next: {nextRank.name}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Business Volume</p>
                <p className="font-bold text-lg">{user.businessVolume.toLocaleString()}</p>
              </div>
            </div>
            
            {nextRank && (
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress to {nextRank.name}</span>
                  <span>{Math.min(progress, 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Required BV: {nextRank.required.toLocaleString()} | Remaining: {Math.max(0, nextRank.required - user.businessVolume).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
