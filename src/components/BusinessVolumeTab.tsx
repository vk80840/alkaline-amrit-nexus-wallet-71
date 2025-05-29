
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Calendar, Award, Clock } from 'lucide-react';

interface BusinessVolumeTabProps {
  user: User;
}

const BusinessVolumeTab = ({ user }: BusinessVolumeTabProps) => {
  const bvData = {
    totalBV: user.businessVolume,
    activeBV: 85000,
    expiredBV: 15000,
    leftTeam: 62000,
    rightTeam: 58000,
    monthlyProgress: 75,
  };

  // Mock BV breakdown data
  const bvBreakdown = [
    {
      id: '1',
      amount: 25000,
      expiryDate: '2024-12-15',
      referrer: 'Alice Johnson (AU00003)',
      daysLeft: 329,
    },
    {
      id: '2',
      amount: 15000,
      expiryDate: '2024-11-20',
      referrer: 'Bob Smith (AU00004)',
      daysLeft: 304,
    },
    {
      id: '3',
      amount: 30000,
      expiryDate: '2024-10-10',
      referrer: 'Charlie Brown (AU00005)',
      daysLeft: 263,
    },
    {
      id: '4',
      amount: 15000,
      expiryDate: '2024-09-05',
      referrer: 'David Wilson (AU00006)',
      daysLeft: 228,
    },
  ];

  // Mock BV history
  const bvHistory = [
    {
      id: '1',
      date: '2024-01-22',
      source: 'AU00003',
      level: 1,
      type: 'Purchase',
      amount: 50,
    },
    {
      id: '2',
      date: '2024-01-21',
      source: 'AU00007',
      level: 2,
      type: 'Purchase',
      amount: 30,
    },
    {
      id: '3',
      date: '2024-01-20',
      source: 'AU00004',
      level: 1,
      type: 'Purchase',
      amount: 40,
    },
    {
      id: '4',
      date: '2024-01-19',
      source: 'AU00008',
      level: 3,
      type: 'Purchase',
      amount: 25,
    },
  ];

  const getExpiryStatus = (daysLeft: number) => {
    if (daysLeft <= 30) return 'bg-red-100 text-red-800';
    if (daysLeft <= 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getExpiryLabel = (daysLeft: number) => {
    if (daysLeft <= 30) return 'Expiring Soon';
    if (daysLeft <= 90) return 'Expiring in 3 months';
    return 'Active';
  };

  return (
    <div className="space-y-6">
      {/* BV Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">Total BV</p>
            <p className="text-xl font-bold">{bvData.totalBV.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Award className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-gray-600">Active BV</p>
            <p className="text-xl font-bold">{bvData.activeBV.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm text-gray-600">Left Team</p>
            <p className="text-xl font-bold">{bvData.leftTeam.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-orange-500 mb-2" />
            <p className="text-sm text-gray-600">Right Team</p>
            <p className="text-xl font-bold">{bvData.rightTeam.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Monthly Progress
          </CardTitle>
          <CardDescription>Your BV accumulation progress this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Month's Goal</span>
              <span className="font-semibold">10,000 BV</span>
            </div>
            <Progress value={bvData.monthlyProgress} className="h-3" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Progress: {bvData.monthlyProgress}%</span>
              <span className="text-gray-600">
                {Math.floor(10000 * (bvData.monthlyProgress / 100)).toLocaleString()} / 10,000 BV
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BV Breakdown */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle>BV Breakdown & Expiry</CardTitle>
          <CardDescription>Track when your BV credits expire (12 months from credit date)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bvBreakdown.map((bv) => (
              <div 
                key={bv.id}
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/20"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{bv.amount.toLocaleString()} BV</p>
                    <p className="text-sm text-gray-600">From: {bv.referrer}</p>
                    <p className="text-xs text-gray-500">Expires: {bv.expiryDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getExpiryStatus(bv.daysLeft)}>
                    {getExpiryLabel(bv.daysLeft)}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {bv.daysLeft} days left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* BV History */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle>BV History</CardTitle>
          <CardDescription>Recent BV credits from your network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bvHistory.map((entry) => (
              <div 
                key={entry.id}
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/20"
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{entry.type}</p>
                    <p className="text-sm text-gray-600">From: {entry.source}</p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+{entry.amount} BV</p>
                  <Badge variant="outline" className="text-xs">
                    Level {entry.level}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessVolumeTab;
