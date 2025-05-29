
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, ArrowUp, ArrowDown, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface STKWalletTabProps {
  user: User;
}

const STKWalletTab = ({ user }: STKWalletTabProps) => {
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  
  const stkData = {
    availableSTK: user.stkBalance,
    lockedSTK: 500,
    currentPrice: 25.50,
    availableValue: user.stkBalance * 25.50,
  };

  const handleBuySTK = () => {
    const totalCost = Number(buyAmount) * stkData.currentPrice;
    
    if (user.mainBalance >= totalCost) {
      toast({
        title: "STK Purchase Successful",
        description: `Purchased ${buyAmount} STK for ₹${totalCost.toLocaleString()}`,
      });
      setBuyAmount('');
    } else {
      toast({
        title: "Insufficient Balance",
        description: "Not enough balance in your main wallet",
        variant: "destructive",
      });
    }
  };

  const handleSellSTK = () => {
    const sellValue = Number(sellAmount) * stkData.currentPrice;
    
    if (Number(sellAmount) <= stkData.availableSTK) {
      toast({
        title: "STK Sale Successful",
        description: `Sold ${sellAmount} STK for ₹${sellValue.toLocaleString()}`,
      });
      setSellAmount('');
    } else {
      toast({
        title: "Insufficient STK",
        description: "Not enough STK available for sale",
        variant: "destructive",
      });
    }
  };

  // Mock STK transaction history
  const stkTransactions = [
    {
      id: '1',
      type: 'buy',
      amount: 100,
      price: 25.00,
      total: 2500,
      status: 'available',
      source: 'Purchase',
      date: '2024-01-22',
    },
    {
      id: '2',
      type: 'reward',
      amount: 50,
      price: 25.50,
      total: 1275,
      status: 'locked',
      source: 'First Purchase Bonus',
      date: '2024-01-20',
    },
    {
      id: '3',
      type: 'referral-bonus',
      amount: 25,
      price: 24.80,
      total: 620,
      status: 'available',
      source: 'Level 1 Referral',
      date: '2024-01-18',
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case 'sell':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'reward':
      case 'referral-bonus':
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'locked':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* STK Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Star className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-sm text-gray-600">Available STK</p>
            <p className="text-xl font-bold">{stkData.availableSTK.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Star className="mx-auto h-8 w-8 text-orange-500 mb-2" />
            <p className="text-sm text-gray-600">Locked STK</p>
            <p className="text-xl font-bold">{stkData.lockedSTK.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-xl font-bold">₹{stkData.currentPrice}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">Available Value</p>
            <p className="text-xl font-bold">₹{stkData.availableValue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Buy/Sell Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <ArrowDown className="mr-2 h-5 w-5" />
              Buy STK
            </CardTitle>
            <CardDescription>Purchase STK using your main balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                Available Balance: ₹{user.mainBalance.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="buyAmount">STK Amount</Label>
              <Input
                id="buyAmount"
                type="number"
                placeholder="Enter STK amount to buy"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                min="1"
              />
              {buyAmount && (
                <p className="text-sm text-gray-600">
                  Total Cost: ₹{(Number(buyAmount) * stkData.currentPrice).toLocaleString()}
                </p>
              )}
            </div>

            <Button 
              onClick={handleBuySTK}
              className="w-full bg-gradient-to-r from-green-500 to-green-600"
              disabled={!buyAmount || Number(buyAmount) * stkData.currentPrice > user.mainBalance}
            >
              Buy STK
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <ArrowUp className="mr-2 h-5 w-5" />
              Sell STK
            </CardTitle>
            <CardDescription>Sell your available STK for main balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                Available STK: {stkData.availableSTK.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellAmount">STK Amount</Label>
              <Input
                id="sellAmount"
                type="number"
                placeholder="Enter STK amount to sell"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                min="1"
                max={stkData.availableSTK}
              />
              {sellAmount && (
                <p className="text-sm text-gray-600">
                  You'll receive: ₹{(Number(sellAmount) * stkData.currentPrice).toLocaleString()}
                </p>
              )}
            </div>

            <Button 
              onClick={handleSellSTK}
              className="w-full bg-gradient-to-r from-red-500 to-red-600"
              disabled={!sellAmount || Number(sellAmount) > stkData.availableSTK}
            >
              Sell STK
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* STK Transaction History */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle>STK Transaction History</CardTitle>
          <CardDescription>Your STK trading and reward history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stkTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/20"
              >
                <div className="flex items-center space-x-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium capitalize">
                      {transaction.type.replace('-', ' ')}
                    </p>
                    <p className="text-sm text-gray-600">{transaction.source}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {transaction.amount.toLocaleString()} STK
                  </p>
                  <p className="text-sm text-gray-600">
                    @ ₹{transaction.price} = ₹{transaction.total.toLocaleString()}
                  </p>
                  <Badge className={`mt-1 ${getStatusColor(transaction.status)}`}>
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

export default STKWalletTab;
