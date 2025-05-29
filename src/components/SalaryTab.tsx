
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
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

  // Salary slabs
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
      bvRequired: '60K-60K',
      salary: 1000,
      eligible: true,
      current: true,
    },
    {
      level: 4,
      bvRequired: '150K-150K',
      salary: 2000,
      eligible: false,
      current: false,
    },
    {
      level: 5,
      bvRequired: '350K-350K',
      salary: 4000,
      eligible: false,
      current: false,
    },
    {
      level: 6,
      bvRequired: '1M-1M',
      salary: 8000,
      eligible: false,
      current: false,
    },
    {
      level: 7,
      bvRequired: '2.5M-2.5M',
      salary: 20000,
      eligible: false,
      current: false,
    },
    {
      level: 8,
      bvRequired: '6M-6M',
      salary: 40000,
      eligible: false,
      current: false,
    },
    {
      level: 9,
      bvRequired: '20M-20M',
      salary: 100000,
      eligible: false,
      current: false,
    },
    {
      level: 10,
      bvRequired: '50M+',
      salary: 100000,
      eligible: false,
      current: false,
    },
    {
      level: 11,
      bvRequired: 'Special CTO',
      salary: '2%',
      eligible: false,
      current: false,
    },
  ];

  // Mock salary history
  const salaryHistory = [
    {
      id: '1',
      month: 'January 2024',
      balancedBV: '60K-60K',
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
    balanced: Math.min(62000, 58000),
  };

  const nextLevelProgress = (currentBVBalance.balanced / 150000) * 100;

  return (
    <div className="space-y-6">
      {/* Salary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Award className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-gray-600">Total Earned</p>
            <p className="text-xl font-bold">₹{salaryData.totalEarned.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-xl font-bold">₹{salaryData.thisMonth.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Calendar className="mx-auto h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm text-gray-600">Eligible Salary</p>
            <p className="text-xl font-bold">₹{salaryData.eligibleSalary.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Lock className="mx-auto h-8 w-8 text-orange-500 mb-2" />
            <p className="text-sm text-gray-600">Salary Status</p>
            <Badge variant={salaryData.salaryStatus === 'unlocked' ? 'default' : 'destructive'}>
              {salaryData.salaryStatus}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Current Rank & Progress */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle>Current Rank & Next Level Progress</CardTitle>
          <CardDescription>Your BV balance and progression status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Left Side BV</p>
              <p className="text-2xl font-bold text-blue-600">{currentBVBalance.left.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Balanced BV</p>
              <p className="text-2xl font-bold text-green-600">{currentBVBalance.balanced.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Right Side BV</p>
              <p className="text-2xl font-bold text-purple-600">{currentBVBalance.right.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progress to Level 4 (150K-150K BV)</span>
              <span className="font-semibold">{nextLevelProgress.toFixed(1)}%</span>
            </div>
            <Progress value={nextLevelProgress} className="h-3" />
            <p className="text-sm text-gray-500 text-center">
              {currentBVBalance.balanced.toLocaleString()} / 150,000 BV balanced required for next level
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Salary Slabs */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle>Salary Levels</CardTitle>
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
                  {slab.current && <Badge variant="default">Current</Badge>}
                  {slab.eligible && !slab.current && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {!slab.eligible && <Lock className="h-4 w-4 text-gray-400" />}
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">{slab.bvRequired} BV</p>
                  <p className="text-lg font-bold text-green-600">
                    {typeof slab.salary === 'number' ? `₹${slab.salary.toLocaleString()}` : slab.salary}
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
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle>Salary History</CardTitle>
          <CardDescription>Your monthly salary payments (paid on 30th of each month)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salaryHistory.map((salary) => (
              <div 
                key={salary.id}
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/20"
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">{salary.month}</p>
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
                  <Badge variant="default" className="text-xs">
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
