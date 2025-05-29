
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, ZoomIn, ZoomOut, User as UserIcon } from 'lucide-react';

interface TeamMember {
  userId: string;
  name: string;
  level: number;
  side: 'left' | 'right';
  profileImage?: string;
  children?: TeamMember[];
}

interface TreeViewTabProps {
  user: User;
}

const TreeViewTab = ({ user }: TreeViewTabProps) => {
  // Mock tree data
  const treeData: TeamMember = {
    userId: user.userId,
    name: user.name,
    level: 0,
    side: 'left', // This is the root
    profileImage: user.profileImage,
    children: [
      {
        userId: 'AU00003',
        name: 'Alice Johnson',
        level: 1,
        side: 'left',
        children: [
          {
            userId: 'AU00006',
            name: 'David Wilson',
            level: 2,
            side: 'left',
          },
          {
            userId: 'AU00007',
            name: 'Eva Davis',
            level: 2,
            side: 'right',
          },
        ],
      },
      {
        userId: 'AU00004',
        name: 'Bob Smith',
        level: 1,
        side: 'right',
        children: [
          {
            userId: 'AU00008',
            name: 'Frank Miller',
            level: 2,
            side: 'left',
          },
        ],
      },
    ],
  };

  const TreeNode = ({ member, isRoot = false }: { member: TeamMember; isRoot?: boolean }) => (
    <div className="flex flex-col items-center">
      <div 
        className={`
          p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg
          ${isRoot 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-300' 
            : 'bg-white border-gray-200 hover:bg-gray-50'
          }
        `}
      >
        <div className="text-center space-y-2">
          {/* Profile Picture */}
          <div className="w-12 h-12 mx-auto">
            {member.profileImage ? (
              <img 
                src={member.profileImage} 
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isRoot ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                <UserIcon className={`h-6 w-6 ${isRoot ? 'text-white' : 'text-gray-600'}`} />
              </div>
            )}
          </div>
          
          <div>
            <p className={`font-semibold text-sm ${isRoot ? 'text-white' : 'text-gray-900'}`}>
              {member.name}
            </p>
            <p className={`text-xs ${isRoot ? 'text-blue-100' : 'text-gray-600'}`}>
              {member.userId}
            </p>
            {!isRoot && (
              <div className="mt-1 space-y-1">
                <Badge variant="outline" className="text-xs">
                  Level {member.level}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ml-1 ${
                    member.side === 'left' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {member.side}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {member.children && member.children.length > 0 && (
        <div className="mt-4 flex space-x-8">
          {member.children.map((child) => (
            <div key={child.userId} className="relative">
              {/* Connection line */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-300"></div>
              <TreeNode member={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const teamStats = {
    totalMembers: user.totalTeam + 1, // Including self
    leftTeam: 22,
    rightTeam: 23,
  };

  return (
    <div className="space-y-6">
      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-2xl font-bold text-gray-900">{teamStats.totalMembers}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600">Left Team</p>
            <p className="text-2xl font-bold text-gray-900">{teamStats.leftTeam}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Right Team</p>
            <p className="text-2xl font-bold text-gray-900">{teamStats.rightTeam}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tree View */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">Team Tree View</CardTitle>
              <CardDescription>Hierarchical view of your referral network</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="min-w-max">
              <TreeNode member={treeData} isRoot={true} />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Tree View Instructions:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Click on any member to view their detailed information</li>
              <li>• The tree shows up to 10 levels of your referral network</li>
              <li>• Left and right sides are clearly marked with colored badges</li>
              <li>• Profile pictures are displayed for visual identification</li>
              <li>• Use zoom controls for better navigation of large teams</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeViewTab;
