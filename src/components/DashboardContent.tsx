
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Calendar, 
  Wallet,
  Users,
  TrendingUp,
  Award,
  Gift,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface DashboardContentProps {
  user: User;
}

const DashboardContent = ({ user }: DashboardContentProps) => {
  const kycStatusColor = {
    verified: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    rejected: 'bg-red-100 text-red-800 border-red-200'
  };

  const kycStatusIcon = {
    verified: <CheckCircle className="h-4 w-4" />,
    pending: <Clock className="h-4 w-4" />,
    rejected: <XCircle className="h-4 w-4" />
  };

  const generatedBV = 1250; // Generated BV to referrer

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-blue-100">Here's your business overview for today</p>
      </div>

      {/* Personal Information */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <UserIcon className="mr-2 h-5 w-5 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <UserIcon className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-semibold text-gray-900">{user.userId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Mobile</p>
                <p className="font-semibold text-gray-900">{user.mobile}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Joined Date</p>
                <p className="font-semibold text-gray-900">{user.joinDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {kycStatusIcon[user.kycStatus]}
              </div>
              <div>
                <p className="text-sm text-gray-600">KYC Status</p>
                <Badge className={kycStatusColor[user.kycStatus]}>
                  {user.kycStatus}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Award className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Current Rank</p>
                <p className="font-semibold text-gray-900">{user.rank}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Wallet className="mr-2 h-5 w-5 text-green-600" />
            Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Main Balance</p>
                  <p className="text-2xl font-bold text-green-800">₹{user.mainBalance.toLocaleString()}</p>
                </div>
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Top-up Balance</p>
                  <p className="text-2xl font-bold text-blue-800">₹{user.topupBalance.toLocaleString()}</p>
                </div>
                <Wallet className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700">Purchased Amount</p>
                  <p className="text-2xl font-bold text-purple-800">₹{user.purchasedAmount.toLocaleString()}</p>
                </div>
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700">Referral Bonus</p>
                  <p className="text-2xl font-bold text-orange-800">₹{user.referralBonus.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team & Business */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Team Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Total Team</span>
                <span className="font-bold text-gray-900">{user.totalTeam}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Direct Team</span>
                <span className="font-bold text-gray-900">{user.directTeam}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Business Volume</span>
                <span className="font-bold text-gray-900">{user.businessVolume.toLocaleString()} BV</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-700">Generated BV to Referrer</span>
                <span className="font-bold text-green-800">+{generatedBV} BV</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Award className="mr-2 h-5 w-5 text-indigo-600" />
              Rank & Referral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Current Rank</span>
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">{user.rank}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Referral Code</span>
                <span className="font-bold text-gray-900">{user.referralCode}</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Referral Links</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Left Link
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Right Link
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Salary Level</span>
                <span className="font-bold text-gray-900">Level 3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 bg-green-600 hover:bg-green-700 text-white">
              <div className="text-center">
                <Wallet className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm">Deposit</span>
              </div>
            </Button>
            <Button className="h-16 bg-red-600 hover:bg-red-700 text-white">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm">Withdraw</span>
              </div>
            </Button>
            <Button className="h-16 bg-blue-600 hover:bg-blue-700 text-white">
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm">Invite</span>
              </div>
            </Button>
            <Button className="h-16 bg-purple-600 hover:bg-purple-700 text-white">
              <div className="text-center">
                <Gift className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm">Shop</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
