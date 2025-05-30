
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ArrowUp, ArrowDown, Star, Lock, Calendar, Shield, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Candlestick } from 'recharts';

interface STKWalletTabProps {
  user: User;
}

const STKWalletTab = ({ user }: STKWalletTabProps) => {
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  
  const stkData = {
    availableSTK: user.stkBalance,
    lockedSTK: 500,
    currentPrice: 25.50,
    availableValue: user.stkBalance * 25.50,
  };

  // Mock candlestick data for different timeframes
  const chartData = {
    '1D': [
      { time: '09:00', open: 25.20, high: 25.60, low: 25.10, close: 25.50 },
      { time: '10:00', open: 25.50, high: 25.80, low: 25.40, close: 25.75 },
      { time: '11:00', open: 25.75, high: 25.90, low: 25.65, close: 25.80 },
      { time: '12:00', open: 25.80, high: 25.95, low: 25.70, close: 25.85 },
      { time: '13:00', open: 25.85, high: 26.00, low: 25.75, close: 25.90 },
      { time: '14:00', open: 25.90, high: 26.20, low: 25.85, close: 26.10 },
      { time: '15:00', open: 26.10, high: 26.30, low: 26.00, close: 26.25 },
    ],
    '1W': [
      { time: 'Mon', open: 24.50, high: 25.20, low: 24.30, close: 25.00 },
      { time: 'Tue', open: 25.00, high: 25.60, low: 24.90, close: 25.40 },
      { time: 'Wed', open: 25.40, high: 25.80, low: 25.20, close: 25.70 },
      { time: 'Thu', open: 25.70, high: 26.00, low: 25.50, close: 25.90 },
      { time: 'Fri', open: 25.90, high: 26.30, low: 25.80, close: 26.25 },
    ],
    '1M': [
      { time: 'Week 1', open: 23.50, high: 24.20, low: 23.20, close: 24.00 },
      { time: 'Week 2', open: 24.00, high: 24.80, low: 23.80, close: 24.60 },
      { time: 'Week 3', open: 24.60, high: 25.40, low: 24.40, close: 25.20 },
      { time: 'Week 4', open: 25.20, high: 26.30, low: 25.00, close: 26.25 },
    ],
    '3M': [
      { time: 'Jan', open: 20.50, high: 22.20, low: 20.20, close: 22.00 },
      { time: 'Feb', open: 22.00, high: 23.80, low: 21.80, close: 23.60 },
      { time: 'Mar', open: 23.60, high: 25.40, low: 23.40, close: 25.20 },
      { time: 'Apr', open: 25.20, high: 26.30, low: 25.00, close: 26.25 },
    ],
  };

  const timeframes = ['1D', '1W', '1M', '3M'];

  const CustomCandlestick = (props: any) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;

    const { open, close, high, low } = payload;
    const isUp = close > open;
    const color = isUp ? '#10b981' : '#ef4444';
    
    const bodyHeight = Math.abs(close - open) * height / (payload.high - payload.low);
    const bodyY = y + (Math.max(high - Math.max(open, close), 0) * height / (high - low));
    
    return (
      <g>
        {/* Wick */}
        <line
          x1={x + width / 2}
          y1={y}
          x2={x + width / 2}
          y2={y + height}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={x + width * 0.25}
          y={bodyY}
          width={width * 0.5}
          height={bodyHeight}
          fill={color}
        />
      </g>
    );
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
                <h4 className="font-semibold text-amber-800 mb-2">15-Month Lock Period</h4>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span><strong>ALL STK from ANY source</strong> is automatically locked for 15 months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span>This includes STK purchased with main balance, rewards, referrals, bonuses, and any other source</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span>Locked STK cannot be sold, transferred, or traded during the lock period</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span>Locked STK will automatically become available after exactly 15 months from the date received</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">•</span>
                    <span>Lock period ensures long-term commitment and ecosystem stability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* STK Overview - Compact 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 text-white shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
              <Star className="h-5 w-5" />
            </div>
            <p className="text-yellow-100 text-xs font-medium">Available STK</p>
            <p className="text-lg font-bold">{stkData.availableSTK.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
              <Lock className="h-5 w-5" />
            </div>
            <p className="text-red-100 text-xs font-medium">Locked STK</p>
            <p className="text-lg font-bold">{stkData.lockedSTK.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-green-100 text-xs font-medium">Current Price</p>
            <p className="text-lg font-bold">₹{stkData.currentPrice}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-blue-100 text-xs font-medium">Available Value</p>
            <p className="text-lg font-bold">₹{stkData.availableValue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* STK Price Chart */}
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">STK Price Chart</CardTitle>
              <CardDescription>Live market data with candlestick view</CardDescription>
            </div>
            <div className="flex gap-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className="text-xs"
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData[selectedTimeframe as keyof typeof chartData]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  domain={['dataMin - 0.1', 'dataMax + 0.1']}
                  stroke="#6b7280"
                  fontSize={12}
                />
                <ChartTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0]?.payload;
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg">
                          <p className="font-semibold">{label}</p>
                          <div className="space-y-1 text-sm">
                            <p>Open: <span className="font-medium">₹{data.open}</span></p>
                            <p>High: <span className="font-medium text-green-600">₹{data.high}</span></p>
                            <p>Low: <span className="font-medium text-red-600">₹{data.low}</span></p>
                            <p>Close: <span className="font-medium">₹{data.close}</span></p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {chartData[selectedTimeframe as keyof typeof chartData].map((entry, index) => (
                  <CustomCandlestick key={index} {...entry} />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
