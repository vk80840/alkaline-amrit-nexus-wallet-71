
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, Award, Eye } from 'lucide-react';
import TeamSpreadsheetView from './TeamSpreadsheetView';

interface TeamTabProps {
  user: User;
}

const TeamTab = ({ user }: TeamTabProps) => {
  const [showSpreadsheet, setShowSpreadsheet] = useState(false);
  const [spreadsheetTitle, setSpreadsheetTitle] = useState('');
  const [spreadsheetData, setSpreadsheetData] = useState<any[]>([]);

  const teamStats = {
    totalTeam: user.totalTeam,
    leftTeam: 22,
    rightTeam: 23,
    directRefer: user.directTeam,
    growlineRefer: user.totalTeam - user.directTeam,
    amountEarned: user.referralBonus,
    active: 38,
    inactive: 7,
  };

  const levels = [
    { level: 1, unlocked: true, directRequired: 0, reward: '15%', earned: 12500 },
    { level: 2, unlocked: true, directRequired: 2, reward: '5%', earned: 8750 },
    { level: 3, unlocked: true, directRequired: 3, reward: '4%', earned: 3200 },
    { level: 4, unlocked: false, directRequired: 4, reward: '3%', earned: 0 },
    { level: 5, unlocked: false, directRequired: 5, reward: '2%', earned: 0 },
    { level: 6, unlocked: false, directRequired: 6, reward: '1%', earned: 0 },
    { level: 7, unlocked: false, directRequired: 7, reward: '1%', earned: 0 },
    { level: 8, unlocked: false, directRequired: 8, reward: '1%', earned: 0 },
    { level: 9, unlocked: false, directRequired: 9, reward: '1%', earned: 0 },
    { level: 10, unlocked: false, directRequired: 10, reward: '2%', earned: 0 },
  ];

  // Mock team data for spreadsheet views
  const mockTeamData = {
    total: [
      { userId: 'AU00003', name: 'Alice Johnson', joinDate: '2024-01-10', level: 1, side: 'left' as const, purchased: true, amount: 15000, status: 'active' as const },
      { userId: 'AU00004', name: 'Bob Smith', joinDate: '2024-01-12', level: 1, side: 'right' as const, purchased: true, amount: 8000, status: 'active' as const },
      { userId: 'AU00005', name: 'Charlie Brown', joinDate: '2024-01-15', level: 2, side: 'left' as const, purchased: false, amount: 0, status: 'inactive' as const },
      { userId: 'AU00006', name: 'David Wilson', joinDate: '2024-01-18', level: 2, side: 'right' as const, purchased: true, amount: 12000, status: 'active' as const },
    ],
    left: [
      { userId: 'AU00003', name: 'Alice Johnson', joinDate: '2024-01-10', level: 1, side: 'left' as const, purchased: true, amount: 15000, status: 'active' as const },
      { userId: 'AU00005', name: 'Charlie Brown', joinDate: '2024-01-15', level: 2, side: 'left' as const, purchased: false, amount: 0, status: 'inactive' as const },
    ],
    right: [
      { userId: 'AU00004', name: 'Bob Smith', joinDate: '2024-01-12', level: 1, side: 'right' as const, purchased: true, amount: 8000, status: 'active' as const },
      { userId: 'AU00006', name: 'David Wilson', joinDate: '2024-01-18', level: 2, side: 'right' as const, purchased: true, amount: 12000, status: 'active' as const },
    ],
    direct: [
      { userId: 'AU00003', name: 'Alice Johnson', joinDate: '2024-01-10', level: 1, side: 'left' as const, purchased: true, amount: 15000, status: 'active' as const },
      { userId: 'AU00004', name: 'Bob Smith', joinDate: '2024-01-12', level: 1, side: 'right' as const, purchased: true, amount: 8000, status: 'active' as const },
      { userId: 'AU00005', name: 'Charlie Brown', joinDate: '2024-01-15', level: 1, side: 'left' as const, purchased: false, amount: 0, status: 'inactive' as const },
    ]
  };

  const handleViewDetails = (type: 'total' | 'left' | 'right' | 'direct') => {
    const titles = {
      total: 'Total Team Details',
      left: 'Left Team Details',
      right: 'Right Team Details',
      direct: 'Direct Team Details'
    };
    
    setSpreadsheetTitle(titles[type]);
    setSpreadsheetData(mockTeamData[type]);
    setShowSpreadsheet(true);
  };

  // Mock direct team data
  const directTeam = [
    {
      userId: 'AU00003',
      name: 'Alice Johnson',
      joinDate: '2024-01-10',
      purchased: true,
      amount: 15000,
    },
    {
      userId: 'AU00004',
      name: 'Bob Smith',
      joinDate: '2024-01-12',
      purchased: true,
      amount: 8000,
    },
    {
      userId: 'AU00005',
      name: 'Charlie Brown',
      joinDate: '2024-01-15',
      purchased: false,
      amount: 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">Total Team</p>
            <p className="text-xl font-bold text-gray-900">{teamStats.totalTeam}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600">Amount Earned</p>
            <p className="text-xl font-bold text-gray-900">₹{teamStats.amountEarned.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Award className="mx-auto h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Active Members</p>
            <p className="text-xl font-bold text-gray-900">{teamStats.active}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-8 w-8 text-orange-600 mb-2" />
            <p className="text-sm text-gray-600">Left/Right</p>
            <p className="text-xl font-bold text-gray-900">{teamStats.leftTeam}/{teamStats.rightTeam}</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Team Overview</CardTitle>
          <CardDescription>Detailed statistics of your referral network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{teamStats.totalTeam}</p>
              <p className="text-sm text-gray-600">Total Team</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => handleViewDetails('total')}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{teamStats.leftTeam}</p>
              <p className="text-sm text-gray-600">Left Team</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => handleViewDetails('left')}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{teamStats.rightTeam}</p>
              <p className="text-sm text-gray-600">Right Team</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => handleViewDetails('right')}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{teamStats.directRefer}</p>
              <p className="text-sm text-gray-600">Direct Referrals</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => handleViewDetails('direct')}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Levels */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Referral Levels</CardTitle>
          <CardDescription>Your unlocked levels and earning potential</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {levels.map((level) => (
              <div 
                key={level.level}
                className={`p-4 rounded-lg border ${
                  level.unlocked 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={level.unlocked ? "default" : "secondary"}>
                      Level {level.level}
                    </Badge>
                    <span className="text-sm font-medium">{level.reward}</span>
                  </div>
                  <Badge variant={level.unlocked ? "default" : "outline"}>
                    {level.unlocked ? 'Unlocked' : 'Locked'}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  Requires {level.directRequired} direct referrals with purchases
                </p>
                
                {level.unlocked && (
                  <div className="text-sm">
                    <p className="font-semibold text-green-600">
                      Earned: ₹{level.earned.toLocaleString()}
                    </p>
                  </div>
                )}
                
                {!level.unlocked && (
                  <div className="mt-2">
                    <Progress 
                      value={(user.directTeam / level.directRequired) * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {user.directTeam}/{level.directRequired} direct referrals
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Direct Team */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Direct Team</CardTitle>
          <CardDescription>Members directly referred by you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {directTeam.map((member) => (
              <div 
                key={member.userId}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.userId}</p>
                  <p className="text-xs text-gray-500">Joined: {member.joinDate}</p>
                </div>
                <div className="text-right">
                  <Badge variant={member.purchased ? "default" : "destructive"}>
                    {member.purchased ? 'Purchased' : 'Not Purchased'}
                  </Badge>
                  {member.purchased && (
                    <p className="text-sm font-semibold text-green-600 mt-1">
                      ₹{member.amount.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <TeamSpreadsheetView
        open={showSpreadsheet}
        onOpenChange={setShowSpreadsheet}
        title={spreadsheetTitle}
        members={spreadsheetData}
      />
    </div>
  );
};

export default TeamTab;
