
import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BusinessVolumeTabProps {
  user: User;
}

interface TeamStructure {
  id: string;
  user_id: string;
  sponsor_id?: string;
  side?: 'left' | 'right';
  level: number;
  total_team: number;
  direct_team: number;
  left_team: number;
  right_team: number;
}

interface BVTransaction {
  id: string;
  type: string;
  amount: number;
  created_at: string;
  description: string;
}

const BusinessVolumeTab = ({ user }: BusinessVolumeTabProps) => {
  const [teamStructure, setTeamStructure] = useState<TeamStructure | null>(null);
  const [bvTransactions, setBvTransactions] = useState<BVTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBusinessVolumeData();
  }, [user.id]);

  const fetchBusinessVolumeData = async () => {
    try {
      // Fetch team structure
      const { data: teamData, error: teamError } = await supabase
        .from('team_structure')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (teamError && teamError.code !== 'PGRST116') throw teamError;
      setTeamStructure(teamData);

      // Fetch BV-related transactions
      const { data: transactionData, error: transactionError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .in('type', ['purchase', 'referral_bonus'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (transactionError) throw transactionError;
      setBvTransactions(transactionData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch business volume data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMonthlyBV = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return bvTransactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.created_at);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      })
      .reduce((total, transaction) => total + Number(transaction.amount), 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* BV Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">Total BV</p>
            <p className="text-xl font-bold text-gray-900">{user.businessVolume.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Award className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-gray-600">Total Team</p>
            <p className="text-xl font-bold text-gray-900">{teamStructure?.total_team || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Left Team</p>
            <p className="text-xl font-bold text-gray-900">{teamStructure?.left_team || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-orange-600 mb-2" />
            <p className="text-sm text-gray-600">Right Team</p>
            <p className="text-xl font-bold text-gray-900">{teamStructure?.right_team || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Monthly Progress
          </CardTitle>
          <CardDescription>Your BV accumulation this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {getMonthlyBV().toLocaleString()} BV
            </div>
            <p className="text-gray-600">Earned this month</p>
          </div>
        </CardContent>
      </Card>

      {/* BV History */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">BV History</CardTitle>
          <CardDescription>Recent BV credits from your network</CardDescription>
        </CardHeader>
        <CardContent>
          {bvTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No BV transactions found.
            </div>
          ) : (
            <div className="space-y-4">
              {bvTransactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{transaction.type.replace('_', ' ')}</p>
                      <p className="text-sm text-gray-600">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{formatDate(transaction.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+{Number(transaction.amount).toLocaleString()}</p>
                    <Badge variant="outline" className="text-xs">
                      {transaction.type === 'purchase' ? 'Purchase' : 'Referral'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessVolumeTab;
