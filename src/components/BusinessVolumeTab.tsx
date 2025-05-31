
import { useState, useEffect } from 'react';
import { User, TeamStructure } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BusinessVolumeTabProps {
  user: User;
}

const BusinessVolumeTab = ({ user }: BusinessVolumeTabProps) => {
  const [teamStructure, setTeamStructure] = useState<TeamStructure | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamStructure();
  }, [user.id]);

  const fetchTeamStructure = async () => {
    try {
      const { data, error } = await supabase
        .from('team_structure')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching team structure:', error);
        return;
      }

      if (data) {
        // Ensure side is properly typed
        const typedData: TeamStructure = {
          ...data,
          side: data.side as 'left' | 'right' | undefined
        };
        setTeamStructure(typedData);
      }
    } catch (error) {
      console.error('Error fetching team structure:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Calculate BV targets and achievements
  const currentBV = user.businessVolume;
  const nextRankTarget = 50000; // Example target for next rank
  const progress = (currentBV / nextRankTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-white/30 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total BV</p>
                <p className="text-2xl font-bold text-gray-900">{currentBV.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-white/30 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Team Size</p>
                <p className="text-2xl font-bold text-gray-900">{teamStructure?.total_team || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/30 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Left Team</p>
                <p className="text-2xl font-bold text-gray-900">{teamStructure?.left_team || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-lg border-white/30 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-500/20 rounded-full">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Right Team</p>
                <p className="text-2xl font-bold text-gray-900">{teamStructure?.right_team || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full bg-white/60 backdrop-blur-lg border border-white/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="targets">Targets</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle>Business Volume Overview</CardTitle>
              <CardDescription>Your current business performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Next Rank</span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Current: {currentBV.toLocaleString()} BV</span>
                  <span>Target: {nextRankTarget.toLocaleString()} BV</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Current Rank</h4>
                  <p className="text-2xl font-bold text-blue-600">{user.rank}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900">Total Earnings</h4>
                  <p className="text-2xl font-bold text-green-600">₹{user.referralBonus.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets">
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle>Rank Advancement Targets</CardTitle>
              <CardDescription>Requirements for achieving higher ranks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 'Silver', bv: 25000, team: 10, status: currentBV >= 25000 ? 'achieved' : 'pending' },
                  { rank: 'Gold', bv: 50000, team: 25, status: currentBV >= 50000 ? 'achieved' : 'pending' },
                  { rank: 'Platinum', bv: 100000, team: 50, status: currentBV >= 100000 ? 'achieved' : 'pending' },
                  { rank: 'Diamond', bv: 250000, team: 100, status: currentBV >= 250000 ? 'achieved' : 'pending' },
                ].map((target) => (
                  <div key={target.rank} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{target.rank}</h4>
                      <p className="text-sm text-gray-600">
                        {target.bv.toLocaleString()} BV • {target.team} Team Members
                      </p>
                    </div>
                    <Badge variant={target.status === 'achieved' ? 'default' : 'outline'}>
                      {target.status === 'achieved' ? 'Achieved' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your business metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Team Balance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Left Team:</span>
                        <span className="font-medium">{teamStructure?.left_team || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Right Team:</span>
                        <span className="font-medium">{teamStructure?.right_team || 0}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Balance Ratio:</span>
                        <span className="font-medium">
                          {teamStructure ? 
                            `${Math.min(teamStructure.left_team, teamStructure.right_team)}:${Math.max(teamStructure.left_team, teamStructure.right_team)}` 
                            : '0:0'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Growth Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Direct Team:</span>
                        <span className="font-medium">{teamStructure?.direct_team || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Team:</span>
                        <span className="font-medium">{teamStructure?.total_team || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Level:</span>
                        <span className="font-medium">{teamStructure?.level || 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessVolumeTab;
