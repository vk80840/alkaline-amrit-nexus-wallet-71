
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, TrendingUp, Lock, CheckCircle, Calendar } from 'lucide-react';

interface SalaryTabProps {
  user: User;
}

const SalaryTab = ({ user }: SalaryTabProps) => {
  const salaryData = {
    totalEarned: 48750,
    thisMonth: 8000,
    upcomingSalary: 2000,
    eligibleSalary: 6000,
    ineligibleSalary: 2000,
    referralBalance: user.referralBonus,
    salaryStatus: 'unlocked',
  };

  // Salary slabs with corrected BV requirements
  const salarySlabs = [
    {
      level: 1,
      bvRequired: '10K-10K',
      salary: 250,
      eligible: true,
      current: false,
    },
    {
      level: 2,
      bvRequired: '25K-25K',
      salary: 500,
      eligible: true,
      current: false,
    },
    {
      level: 3,
      bvRequired: '50K-50K', // Fixed: Changed from 60K to 50K to match 58K balanced
      salary: 1000,
      eligible: true,
      current: true,
    },
    {
      level: 4,
      bvRequired: '100K-100K', // Fixed: Adjusted from 150K to 100K
      salary: 2000,
      eligible: false,
      current: false,
    },
    {
      level: 5,
      bvRequired: '250K-250K',
      salary: 4000,
      eligible: false,
      current: false,
    },
    {
      level: 6,
      bvRequired: '500K-500K',
      salary: 8000,
      eligible: false,
      current: false,
    },
    {
      level: 7,
      bvRequired: '1M-1M',
      salary: 20000,
      eligible: false,
      current: false,
    },
    {
      level: 8,
      bvRequired: '2M-2M',
      salary: 40000,
      eligible: false,
      current: false,
    },
    {
      level: 9,
      bvRequired: '5M-5M',
      salary: 100000,
      eligible: false,
      current: false,
    },
    {
      level: 10,
      bvRequired: '10M+',
      salary: 200000,
      eligible: false,
      current: false,
    },
  ];

  // Mock salary history
  const salaryHistory = [
    {
      id: '1',
      month: 'January 2024',
      balancedBV: '58K-58K', // Updated to reflect current balanced BV
      level: 3,
      amount: 1000,
      status: 'paid',
      date: '2024-01-30',
    },
    {
      id: '2',
      month: 'December 2023',
      balancedBV: '25K-25K',
      level: 2,
      amount: 500,
      status: 'paid',
      date: '2023-12-30',
    },
    {
      id: '3',
      month: 'November 2023',
      balancedBV: '10K-10K',
      level: 1,
      amount: 250,
      status: 'paid',
      date: '2023-11-30',
    },
  ];

  const currentBVBalance = {
    left: 62000,
    right: 58000,
    balanced: Math.min(62000, 58000), // 58K balanced
  };

  const nextLevelProgress = (currentBVBalance.balanced / 100000) * 100; // Progress to Level 4 (100K)

  return (
    <div className="space-y-6">
      {/* Salary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Award className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600">Total Earned</p>
            <p className="text-xl font-bold text-gray-900">₹{salaryData.totalEarned.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-xl font-bold text-gray-900">₹{salaryData.thisMonth.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Calendar className="mx-auto h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Eligible Salary</p>
            <p className="text-xl font-bold text-gray-900">₹{salaryData.eligibleSalary.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600">Salary Status</p>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Unlocked
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Current Rank & Progress */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Current Rank & Next Level Progress</CardTitle>
          <CardDescription>Your BV balance and progression status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">Left Side BV</p>
              <p className="text-2xl font-bold text-blue-800">{currentBVBalance.left.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">Balanced BV</p>
              <p className="text-2xl font-bold text-green-800">{currentBVBalance.balanced.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700">Right Side BV</p>
              <p className="text-2xl font-bold text-purple-800">{currentBVBalance.right.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progress to Level 4 (100K-100K BV)</span>
              <span className="font-semibold">{nextLevelProgress.toFixed(1)}%</span>
            </div>
            <Progress value={nextLevelProgress} className="h-3" />
            <p className="text-sm text-gray-500 text-center">
              {currentBVBalance.balanced.toLocaleString()} / 100,000 BV balanced required for next level
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Salary Slabs */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Salary Levels</CardTitle>
          <CardDescription>BV-based salary criteria and eligibility status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salarySlabs.map((slab) => (
              <div 
                key={slab.level}
                className={`p-4 rounded-lg border transition-all ${
                  slab.current 
                    ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-300' 
                    : slab.eligible 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={slab.eligible ? "default" : "secondary"}>
                    Level {slab.level}
                  </Badge>
                  {slab.current && <Badge className="bg-blue-100 text-blue-800 border-blue-200">Current</Badge>}
                  {slab.eligible && !slab.current && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {!slab.eligible && <Lock className="h-4 w-4 text-gray-400" />}
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">{slab.bvRequired} BV</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{slab.salary.toLocaleString()}
                  </p>
                  <Badge variant={slab.eligible ? "default" : "outline"} className="text-xs">
                    {slab.eligible ? 'Eligible' : 'Locked'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salary History */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Salary History</CardTitle>
          <CardDescription>Your monthly salary payments (paid on 30th of each month)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salaryHistory.map((salary) => (
              <div 
                key={salary.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">{salary.month}</p>
                    <p className="text-sm text-gray-600">
                      Level {salary.level} - {salary.balancedBV} BV
                    </p>
                    <p className="text-xs text-gray-500">{salary.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    ₹{salary.amount.toLocaleString()}
                  </p>
                  <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                    {salary.status}
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

export default SalaryTab;
