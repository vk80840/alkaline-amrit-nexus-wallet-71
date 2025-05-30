
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, ZoomIn, ZoomOut, User as UserIcon, ChevronDown, ChevronRight } from 'lucide-react';

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
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([user.userId]));

  const toggleNode = (userId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedNodes(newExpanded);
  };

  const expandAll = () => {
    const allUserIds = new Set<string>();
    const collectIds = (member: TeamMember) => {
      allUserIds.add(member.userId);
      member.children?.forEach(collectIds);
    };
    collectIds(treeData);
    setExpandedNodes(allUserIds);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set([user.userId]));
  };

  // Generate example tree data up to level 10
  const generateMember = (level: number, parentId: string, index: number, side: 'left' | 'right'): TeamMember => {
    const userId = `AU${String(10000 + level * 1000 + index).padStart(6, '0')}`;
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
      profileImage: index % 4 === 0 ? '/placeholder.svg' : undefined,
    };

    // Add children up to level 10
    if (level < 10) {
      const childCount = level < 3 ? 3 : Math.max(1, Math.floor(Math.random() * 2) + 1);
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
      ...Array.from({ length: 10 }, (_, i) => 
        generateMember(1, user.userId, i, i % 2 === 0 ? 'left' : 'right')
      )
    ],
  };

  const TreeNode = ({ member, isRoot = false }: { member: TeamMember; isRoot?: boolean }) => {
    const hasChildren = member.children && member.children.length > 0;
    const isExpanded = expandedNodes.has(member.userId);

    return (
      <div className="flex flex-col items-center">
        {/* Node */}
        <div className="flex flex-col items-center relative">
          {/* Expand/Collapse button */}
          {hasChildren && !isRoot && (
            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 mb-1 absolute -top-8 z-10"
              onClick={() => toggleNode(member.userId)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* Member card */}
          <div 
            className={`
              p-3 rounded-xl border cursor-pointer transition-all hover:shadow-lg min-w-[160px] relative
              ${isRoot 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-300 shadow-xl' 
                : 'bg-white border-gray-200 hover:bg-gray-50 shadow-md'
              }
            `}
          >
            <div className="text-center space-y-2">
              {/* Profile Picture */}
              <div className="w-14 h-14 mx-auto relative">
                {member.profileImage ? (
                  <img 
                    src={member.profileImage} 
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-lg"
                  />
                ) : (
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                    isRoot ? 'bg-white/20 border-3 border-white' : 'bg-gray-200 border-2 border-gray-300'
                  }`}>
                    <UserIcon className={`h-7 w-7 ${isRoot ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                )}
              </div>
              
              <div>
                <p className={`font-semibold text-sm ${isRoot ? 'text-white' : 'text-gray-900'}`}>
                  {member.name}
                </p>
                <p className={`text-xs ${isRoot ? 'text-blue-100' : 'text-gray-600'} font-mono`}>
                  {member.userId}
                </p>
                {!isRoot && (
                  <div className="mt-2 flex justify-center space-x-1">
                    <Badge variant="outline" className="text-xs px-2">
                      L{member.level}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-2 ${
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

            {/* Expand button for root */}
            {hasChildren && isRoot && (
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 border border-blue-200 rounded-full"
                onClick={() => toggleNode(member.userId)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Connecting line down */}
          {hasChildren && isExpanded && (
            <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
          )}
        </div>

        {/* Children - Horizontal Layout */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col items-center mt-4">
            {/* Horizontal line */}
            <div className="w-full h-0.5 bg-gray-300 mb-4"></div>
            
            {/* Children nodes */}
            <div className="flex flex-wrap justify-center gap-8">
              {member.children!.map((child, index) => (
                <div key={child.userId} className="flex flex-col items-center">
                  {/* Vertical line up to child */}
                  <div className="w-0.5 h-6 bg-gray-300 mb-2"></div>
                  <TreeNode member={child} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const teamStats = {
    totalMembers: 156,
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
              <CardDescription>Horizontal view of your referral network (up to 10 levels)</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={collapseAll}>
                Collapse All
              </Button>
              <Button variant="outline" size="sm" onClick={expandAll}>
                Expand All
              </Button>
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
          <div className="overflow-auto p-8 bg-gray-50 rounded-lg border border-gray-200">
            <div className="min-w-max flex justify-center">
              <TreeNode member={treeData} isRoot={true} />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Tree View Instructions:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Click expand/collapse buttons to navigate the tree structure</li>
              <li>• The tree shows your complete referral network up to 10 levels horizontally</li>
              <li>• L/R badges indicate left and right sides of the binary tree</li>
              <li>• Profile pictures are displayed for visual identification</li>
              <li>• Use zoom controls and expand/collapse for better navigation</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeViewTab;
