
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Copy, Star, TrendingUp, Users, Wallet, Award } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DashboardContentProps {
  user: User;
}

const DashboardContent = ({ user }: DashboardContentProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const ranks = [
    { name: 'Wood', bv: 0, image: '🥉' },
    { name: 'Silver', bv: 25000, image: '🥈' },
    { name: 'Gold', bv: 75000, image: '🥇' },
    { name: 'Platinum', bv: 200000, image: '🏆' },
    { name: 'Diamond', bv: 500000, image: '💎' },
    { name: 'Ruby', bv: 1000000, image: '🔴' },
  ];

  const currentRankIndex = ranks.findIndex(rank => rank.name === user.rank);
  const nextRank = ranks[currentRankIndex + 1];
  const progressPercentage = nextRank ? (user.businessVolume / nextRank.bv) * 100 : 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-20 h-20 rounded-full" />
              ) : (
                <span className="text-white font-bold text-2xl">{user.name.charAt(0)}</span>
              )}
            </div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription className="space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <Badge variant="secondary">{user.userId}</Badge>
                <Badge variant={user.kycStatus === 'verified' ? 'default' : 'destructive'}>
                  {user.kycStatus}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.mobile}</p>
              <p className="text-sm text-gray-600">Joined: {user.joinDate}</p>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Wallet Info */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ₹{(user.mainBalance + user.topupBalance).toLocaleString()}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-gray-600">Main Balance</p>
                  <p className="font-semibold text-lg">₹{user.mainBalance.toLocaleString()}</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-gray-600">Top-up Balance</p>
                  <p className="font-semibold text-lg">₹{user.topupBalance.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rank Progress */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Current Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl">{ranks[currentRankIndex]?.image}</div>
              <Badge variant="outline" className="text-lg font-semibold px-4 py-1">
                {user.rank}
              </Badge>
              {nextRank && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Progress to {nextRank.name}</p>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-gray-500">
                    {user.businessVolume.toLocaleString()} / {nextRank.bv.toLocaleString()} BV
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-lg">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">Purchased Amount</p>
            <p className="text-xl font-bold">₹{user.purchasedAmount.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-lg">
          <CardContent className="p-4 text-center">
            <Star className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-gray-600">Referral Bonus</p>
            <p className="text-xl font-bold">₹{user.referralBonus.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-lg">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm text-gray-600">Total Team</p>
            <p className="text-xl font-bold">{user.totalTeam}</p>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-lg">
          <CardContent className="p-4 text-center">
            <Award className="mx-auto h-8 w-8 text-orange-500 mb-2" />
            <p className="text-sm text-gray-600">Business Volume</p>
            <p className="text-xl font-bold">{user.businessVolume.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Section */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle>Referral Information</CardTitle>
          <CardDescription>Share your referral links to grow your network</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Referral Code</p>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                  {user.referralCode}
                </code>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(user.referralCode, 'Referral code')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Left Link</p>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-xs font-mono truncate">
                  https://alkalineamrit.com/signup?ref={user.referralCode}&side=left
                </code>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(`https://alkalineamrit.com/signup?ref=${user.referralCode}&side=left`, 'Left referral link')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Right Link</p>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-xs font-mono truncate">
                  https://alkalineamrit.com/signup?ref={user.referralCode}&side=right
                </code>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(`https://alkalineamrit.com/signup?ref=${user.referralCode}&side=right`, 'Right referral link')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
