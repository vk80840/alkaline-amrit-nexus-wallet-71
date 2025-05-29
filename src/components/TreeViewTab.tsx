
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
  // Generate mock tree data with 10 direct referrals, each with their own network up to level 10
  const generateMember = (level: number, parentId: string, index: number, side: 'left' | 'right'): TeamMember => {
    const userId = `AU${String(1000 + level * 100 + index).padStart(5, '0')}`;
    const names = [
      'Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Eva Brown',
      'Frank Miller', 'Grace Lee', 'Henry Clark', 'Ivy White', 'Jack Taylor',
      'Kate Anderson', 'Liam Garcia', 'Maya Rodriguez', 'Noah Martinez', 'Olivia Lopez'
    ];
    
    const member: TeamMember = {
      userId,
      name: names[index % names.length],
      level,
      side,
      profileImage: index % 3 === 0 ? '/placeholder.svg' : undefined,
    };

    // Add children if level is less than 10 and we want to show some depth
    if (level < 4) { // Limiting display depth for performance, but showing more members
      const childCount = Math.min(level === 1 ? 10 : Math.max(2, 8 - level), 10);
      member.children = [];
      
      for (let i = 0; i < childCount; i++) {
        const childSide = i % 2 === 0 ? 'left' : 'right';
        member.children.push(generateMember(level + 1, userId, i, childSide));
      }
    }

    return member;
  };

  const treeData: TeamMember = {
    userId: user.userId,
    name: user.name,
    level: 0,
    side: 'left',
    profileImage: user.profileImage,
    children: [
      // Generate 10 direct referrals
      ...Array.from({ length: 10 }, (_, i) => 
        generateMember(1, user.userId, i, i % 2 === 0 ? 'left' : 'right')
      )
    ],
  };

  const TreeNode = ({ member, isRoot = false }: { member: TeamMember; isRoot?: boolean }) => (
    <div className="flex flex-col items-center">
      <div 
        className={`
          p-3 rounded-lg border cursor-pointer transition-all hover:shadow-lg min-w-[120px]
          ${isRoot 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-300' 
            : 'bg-white border-gray-200 hover:bg-gray-50'
          }
        `}
      >
        <div className="text-center space-y-2">
          {/* Profile Picture */}
          <div className="w-10 h-10 mx-auto">
            {member.profileImage ? (
              <img 
                src={member.profileImage} 
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isRoot ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                <UserIcon className={`h-5 w-5 ${isRoot ? 'text-white' : 'text-gray-600'}`} />
              </div>
            )}
          </div>
          
          <div>
            <p className={`font-semibold text-xs ${isRoot ? 'text-white' : 'text-gray-900'}`}>
              {member.name}
            </p>
            <p className={`text-xs ${isRoot ? 'text-blue-100' : 'text-gray-600'}`}>
              {member.userId}
            </p>
            {!isRoot && (
              <div className="mt-1 space-y-1">
                <Badge variant="outline" className="text-xs">
                  L{member.level}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ml-1 ${
                    member.side === 'left' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {member.side === 'left' ? 'L' : 'R'}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {member.children && member.children.length > 0 && (
        <div className="mt-4">
          {/* Connection line */}
          <div className="w-0.5 h-4 bg-gray-300 mx-auto mb-4"></div>
          <div className="flex flex-wrap justify-center gap-4 max-w-[800px]">
            {member.children.map((child, index) => (
              <div key={child.userId} className="relative">
                <TreeNode member={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const teamStats = {
    totalMembers: 156, // Updated to reflect larger network
    leftTeam: 78,
    rightTeam: 78,
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
              <CardDescription>Hierarchical view of your referral network (showing 4 levels)</CardDescription>
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
              <li>• The tree shows your complete referral network up to 10 levels</li>
              <li>• L/R badges indicate left and right sides of the binary tree</li>
              <li>• Profile pictures are displayed for visual identification</li>
              <li>• Use zoom controls for better navigation of large teams</li>
              <li>• Each member can have up to 10 direct referrals</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeViewTab;
