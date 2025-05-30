
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ArrowUp, ArrowDown, Star, Lock, Calendar, Shield, Info } from 'lucide-react';
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
        description: `Purchased ${buyAmount} STK for ₹${totalCost.toLocaleString()} (Locked for 15 months)`,
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

  // Mock STK transaction history with lock dates
  const stkTransactions = [
    {
      id: '1',
      type: 'buy',
      amount: 100,
      price: 25.00,
      total: 2500,
      status: 'locked',
      source: 'Purchase',
      date: '2024-01-22',
      lockUntil: '2025-04-22',
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
      lockUntil: '2025-04-20',
    },
    {
      id: '3',
      type: 'referral-bonus',
      amount: 25,
      price: 24.80,
      total: 620,
      status: 'available',
      source: 'Level 1 Referral',
      date: '2023-01-18',
      lockUntil: '2024-04-18',
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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'locked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* STK Lock Policy Notice */}
      <Card className="border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-amber-800">
            <Shield className="mr-3 h-6 w-6" />
            STK Lock Policy - 15 Month Security Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white/70 rounded-lg p-4 border border-amber-200">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Universal Lock Mechanism</h4>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span><strong>ALL STK from ANY source</strong> is automatically locked for exactly 15 months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span>Includes: purchased STK, rewards, referral bonuses, level bonuses, and any other source</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span>Locked STK cannot be sold, transferred, or traded during the lock period</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span>STK automatically becomes available after exactly 15 months from date received</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span>This policy ensures long-term commitment and ecosystem stability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* STK Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 text-white shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Star className="h-8 w-8" />
            </div>
            <p className="text-yellow-100 text-sm font-medium">Available STK</p>
            <p className="text-2xl font-bold">{stkData.availableSTK.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Lock className="h-8 w-8" />
            </div>
            <p className="text-red-100 text-sm font-medium">Locked STK</p>
            <p className="text-2xl font-bold">{stkData.lockedSTK.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8" />
            </div>
            <p className="text-green-100 text-sm font-medium">Current Price</p>
            <p className="text-2xl font-bold">₹{stkData.currentPrice}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8" />
            </div>
            <p className="text-blue-100 text-sm font-medium">Available Value</p>
            <p className="text-2xl font-bold">₹{stkData.availableValue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Buy/Sell Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <ArrowDown className="h-5 w-5" />
              </div>
              Buy STK
            </CardTitle>
            <CardDescription className="text-green-100">Purchase STK using your main balance</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="p-4 bg-green-100 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 font-medium">
                💰 Available Balance: ₹{user.mainBalance.toLocaleString()}
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center">
                <Lock className="h-4 w-4 text-amber-600 mr-2" />
                <p className="text-sm text-amber-700 font-medium">
                  15-Month Lock Period Applies
                </p>
              </div>
              <p className="text-xs text-amber-600 mt-1">
                All purchased STK will be locked for exactly 15 months
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="buyAmount" className="text-sm font-semibold">STK Amount</Label>
              <Input
                id="buyAmount"
                type="number"
                placeholder="Enter STK amount to buy"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                min="1"
                className="text-lg"
              />
              {buyAmount && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Total Cost: <span className="font-bold text-lg">₹{(Number(buyAmount) * stkData.currentPrice).toLocaleString()}</span>
                  </p>
                </div>
              )}
            </div>

            <Button 
              onClick={handleBuySTK}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3 text-lg"
              disabled={!buyAmount || Number(buyAmount) * stkData.currentPrice > user.mainBalance}
            >
              <Lock className="mr-2 h-5 w-5" />
              Buy STK (15-Month Lock)
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-red-50 to-rose-50">
          <CardHeader className="bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <ArrowUp className="h-5 w-5" />
              </div>
              Sell STK
            </CardTitle>
            <CardDescription className="text-red-100">Sell your available (unlocked) STK</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="p-4 bg-red-100 rounded-lg border border-red-200">
              <p className="text-sm text-red-800 font-medium">
                🔓 Available STK: {stkData.availableSTK.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellAmount" className="text-sm font-semibold">STK Amount</Label>
              <Input
                id="sellAmount"
                type="number"
                placeholder="Enter STK amount to sell"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                min="1"
                max={stkData.availableSTK}
                className="text-lg"
              />
              {sellAmount && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    You'll receive: <span className="font-bold text-lg">₹{(Number(sellAmount) * stkData.currentPrice).toLocaleString()}</span>
                  </p>
                </div>
              )}
            </div>

            <Button 
              onClick={handleSellSTK}
              className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 py-3 text-lg"
              disabled={!sellAmount || Number(sellAmount) > stkData.availableSTK}
            >
              <ArrowUp className="mr-2 h-5 w-5" />
              Sell STK
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* STK Transaction History */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">STK Transaction History</CardTitle>
          <CardDescription>Your complete STK trading and reward history with lock status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stkTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-gray-100">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-semibold capitalize text-gray-900">
                      {transaction.type.replace('-', ' ')}
                    </p>
                    <p className="text-sm text-gray-600">{transaction.source}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {transaction.date}
                    </p>
                    {transaction.status === 'locked' && (
                      <p className="text-xs text-red-600 flex items-center mt-1">
                        <Lock className="h-3 w-3 mr-1" />
                        Unlocks: {transaction.lockUntil}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">
                    {transaction.amount.toLocaleString()} STK
                  </p>
                  <p className="text-sm text-gray-600">
                    @ ₹{transaction.price} = ₹{transaction.total.toLocaleString()}
                  </p>
                  <Badge className={`mt-2 ${getStatusColor(transaction.status)}`}>
                    {transaction.status === 'locked' ? (
                      <span className="flex items-center">
                        <Lock className="h-3 w-3 mr-1" />
                        Locked
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Available
                      </span>
                    )}
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
