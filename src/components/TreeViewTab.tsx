
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, ZoomIn, ZoomOut } from 'lucide-react';

interface TeamMember {
  userId: string;
  name: string;
  level: number;
  side: 'left' | 'right';
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
          p-3 rounded-lg border cursor-pointer transition-all hover:shadow-lg
          ${isRoot 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-300' 
            : 'bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90'
          }
        `}
      >
        <div className="text-center">
          <p className={`font-semibold text-sm ${isRoot ? 'text-white' : 'text-gray-900'}`}>
            {member.name}
          </p>
          <p className={`text-xs ${isRoot ? 'text-blue-100' : 'text-gray-600'}`}>
            {member.userId}
          </p>
          {!isRoot && (
            <Badge variant="outline" className="mt-1 text-xs">
              Level {member.level} - {member.side}
            </Badge>
          )}
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
        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-2xl font-bold">{teamStats.totalMembers}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-gray-600">Left Team</p>
            <p className="text-2xl font-bold">{teamStats.leftTeam}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Users className="mx-auto h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm text-gray-600">Right Team</p>
            <p className="text-2xl font-bold">{teamStats.rightTeam}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tree View */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Tree View</CardTitle>
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
          <div className="overflow-auto p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
            <div className="min-w-max">
              <TreeNode member={treeData} isRoot={true} />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Tree View Instructions:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Click on any member to view their detailed information</li>
              <li>• The tree shows up to 10 levels of your referral network</li>
              <li>• Left and right sides are clearly marked</li>
              <li>• Use zoom controls for better navigation of large teams</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeViewTab;
