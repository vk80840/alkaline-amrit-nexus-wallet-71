
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WithdrawTabProps {
  user: User;
}

const WithdrawTab = ({ user }: WithdrawTabProps) => {
  const [method, setMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Withdrawal Request Submitted",
        description: "Your withdrawal request is being processed. You'll receive confirmation within 7 business days.",
      });
      setAmount('');
      setPassword('');
      setMethod('');
      setIsSubmitting(false);
    }, 2000);
  };

  // Mock withdrawal history
  const withdrawHistory = [
    {
      id: '1',
      amount: 10000,
      netAmount: 8600,
      type: 'bank',
      status: 'completed',
      date: '2024-01-20',
    },
    {
      id: '2',
      amount: 5000,
      netAmount: 4300,
      type: 'crypto',
      status: 'pending',
      date: '2024-01-18',
    },
    {
      id: '3',
      amount: 15000,
      netAmount: 12900,
      type: 'bank',
      status: 'rejected',
      date: '2024-01-15',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Withdrawal Form */}
        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowUp className="mr-2 h-5 w-5" />
              Withdraw Funds
            </CardTitle>
            <CardDescription>
              Minimum withdrawal: ₹1,000 | Processing time: 7 business days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Withdrawable Balance</p>
              <p className="text-2xl font-bold text-gray-900">₹{user.mainBalance.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                Charges: 12% processing fee + 2% TDS will be deducted
              </p>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="method">Withdrawal Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select withdrawal method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1000"
                  max={user.mainBalance}
                  required
                />
                {amount && (
                  <p className="text-xs text-gray-500">
                    Net amount after charges: ₹{Math.floor(Number(amount) * 0.86).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password for Verification</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                disabled={isSubmitting || !method || !amount || !password}
              >
                {isSubmitting ? 'Processing...' : 'Submit Withdrawal Request'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Withdrawal History */}
        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
            <CardDescription>Your recent withdrawal requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {withdrawHistory.map((withdrawal) => (
                <div 
                  key={withdrawal.id} 
                  className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/20"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(withdrawal.status)}
                    <div>
                      <p className="font-medium">₹{withdrawal.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        Net: ₹{withdrawal.netAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{withdrawal.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`mb-1 ${getStatusColor(withdrawal.status)}`}>
                      {withdrawal.status}
                    </Badge>
                    <p className="text-xs text-gray-600 capitalize">{withdrawal.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WithdrawTab;
