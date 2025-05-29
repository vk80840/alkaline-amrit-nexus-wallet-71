
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet, ArrowUp, ArrowDown, RefreshCw, Send, Plus, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WalletTabProps {
  user: User;
}

const WalletTab = ({ user }: WalletTabProps) => {
  const [topupAmount, setTopupAmount] = useState('');
  const [topupTarget, setTopupTarget] = useState('self');
  const [transferUserId, setTransferUserId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [verifiedUser, setVerifiedUser] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleTopup = () => {
    if (topupTarget === 'self') {
      toast({
        title: "Top-up Successful",
        description: `₹${topupAmount} transferred to your top-up balance`,
      });
    } else {
      toast({
        title: "Top-up Sent",
        description: `₹${topupAmount} sent to ${verifiedUser}'s top-up balance`,
      });
    }
    setTopupAmount('');
    setTransferUserId('');
    setVerifiedUser('');
  };

  const handleTransfer = () => {
    const chargeAmount = Number(transferAmount) * 0.08;
    const netAmount = Number(transferAmount) - chargeAmount;
    
    toast({
      title: "Transfer Successful",
      description: `₹${netAmount} sent to ${verifiedUser}. Charge: ₹${chargeAmount}`,
    });
    setTransferAmount('');
    setTransferUserId('');
    setVerifiedUser('');
  };

  const verifyUserId = () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      if (transferUserId) {
        setVerifiedUser('John Smith');
        toast({
          title: "User Verified",
          description: `User ID ${transferUserId} belongs to John Smith`,
        });
      }
      setIsVerifying(false);
    }, 1000);
  };

  // Mock transaction history
  const transactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 25000,
      status: 'completed',
      date: '2024-01-22',
      description: 'Bank deposit'
    },
    {
      id: '2',
      type: 'withdraw',
      amount: -10000,
      status: 'pending',
      date: '2024-01-21',
      description: 'Bank withdrawal'
    },
    {
      id: '3',
      type: 'transfer',
      amount: -5000,
      status: 'completed',
      date: '2024-01-20',
      description: 'Transfer to AU00003'
    },
    {
      id: '4',
      type: 'topup',
      amount: -3000,
      status: 'completed',
      date: '2024-01-19',
      description: 'Top-up balance transfer'
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case 'withdraw':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'transfer':
        return <Send className="h-4 w-4 text-blue-500" />;
      case 'topup':
        return <RefreshCw className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Main Balance
            </CardTitle>
            <CardDescription>Withdrawable balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              ₹{user.mainBalance.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Available for withdrawal and transfers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Top-up Balance
            </CardTitle>
            <CardDescription>Shopping balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              ₹{user.topupBalance.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Available for product purchases</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-16 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
              <div className="text-center">
                <ArrowDown className="h-6 w-6 mx-auto mb-1" />
                <span>Deposit</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Deposit</DialogTitle>
              <DialogDescription>
                This will redirect you to the deposit tab
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-16 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
              <div className="text-center">
                <ArrowUp className="h-6 w-6 mx-auto mb-1" />
                <span>Withdraw</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Withdraw</DialogTitle>
              <DialogDescription>
                This will redirect you to the withdraw tab
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-16 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-1" />
                <span>Top-up</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Top-up Balance</DialogTitle>
              <DialogDescription>
                Transfer from main balance to top-up balance
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="topup-target">Target</Label>
                <Select value={topupTarget} onValueChange={setTopupTarget}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {topupTarget === 'friend' && (
                <div className="space-y-2">
                  <Label htmlFor="friend-userid">Friend's User ID</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="friend-userid"
                      value={transferUserId}
                      onChange={(e) => setTransferUserId(e.target.value)}
                      placeholder="Enter User ID"
                    />
                    <Button variant="outline" onClick={verifyUserId} disabled={isVerifying}>
                      {isVerifying ? 'Verifying...' : 'Verify'}
                    </Button>
                  </div>
                  {verifiedUser && (
                    <p className="text-sm text-green-600">Verified: {verifiedUser}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="topup-amount">Amount (₹)</Label>
                <Input
                  id="topup-amount"
                  type="number"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  placeholder="Enter amount"
                  max={user.mainBalance}
                />
              </div>

              <Button 
                onClick={handleTopup}
                className="w-full"
                disabled={!topupAmount || (topupTarget === 'friend' && !verifiedUser)}
              >
                Transfer to Top-up
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-16 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <div className="text-center">
                <Send className="h-6 w-6 mx-auto mb-1" />
                <span>Transfer</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer to User</DialogTitle>
              <DialogDescription>
                Send money to another user (6% charge + 2% TDS applied)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="transfer-userid">User ID</Label>
                <div className="flex space-x-2">
                  <Input
                    id="transfer-userid"
                    value={transferUserId}
                    onChange={(e) => setTransferUserId(e.target.value)}
                    placeholder="Enter User ID"
                  />
                  <Button variant="outline" onClick={verifyUserId} disabled={isVerifying}>
                    {isVerifying ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
                {verifiedUser && (
                  <p className="text-sm text-green-600">Verified: {verifiedUser}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="transfer-amount">Amount (₹)</Label>
                <Input
                  id="transfer-amount"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter amount"
                  max={user.mainBalance}
                />
                {transferAmount && (
                  <p className="text-xs text-gray-500">
                    Charges: ₹{(Number(transferAmount) * 0.08).toFixed(2)} | 
                    Net amount: ₹{(Number(transferAmount) * 0.92).toFixed(2)}
                  </p>
                )}
              </div>

              <Button 
                onClick={handleTransfer}
                className="w-full"
                disabled={!transferAmount || !verifiedUser}
              >
                Send Transfer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transaction History */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/20"
              >
                <div className="flex items-center space-x-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium capitalize">{transaction.type}</p>
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {transaction.status}
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

export default WalletTab;
