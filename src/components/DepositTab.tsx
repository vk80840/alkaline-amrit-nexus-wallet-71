
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Clock, CheckCircle, XCircle, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DepositTabProps {
  user: User;
}

const DepositTab = ({ user }: DepositTabProps) => {
  const [method, setMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [proofLink, setProofLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Deposit Request Submitted",
        description: "Your deposit request has been submitted for verification. You'll receive confirmation once approved.",
      });
      setAmount('');
      setTransactionId('');
      setProofLink('');
      setMethod('');
      setIsSubmitting(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    });
  };

  // Mock deposit history
  const depositHistory = [
    {
      id: '1',
      amount: 25000,
      type: 'bank',
      status: 'completed',
      date: '2024-01-22',
    },
    {
      id: '2',
      amount: 10000,
      type: 'crypto',
      status: 'pending',
      date: '2024-01-21',
    },
    {
      id: '3',
      amount: 5000,
      type: 'bank',
      status: 'rejected',
      date: '2024-01-19',
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
        {/* Deposit Form */}
        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowDown className="mr-2 h-5 w-5" />
              Add Funds
            </CardTitle>
            <CardDescription>
              Choose your preferred deposit method and follow the instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="method">Deposit Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select deposit method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {method && (
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                  {method === 'bank' ? (
                    <div>
                      <h4 className="font-semibold mb-2">Bank Details</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Account Name:</strong> AlkalineAmrit Pvt Ltd</p>
                        <p><strong>Account Number:</strong> 1234567890</p>
                        <p><strong>IFSC Code:</strong> SBIN0001234</p>
                        <p><strong>Bank:</strong> State Bank of India</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold mb-2">Crypto Address</h4>
                      <div className="flex items-center space-x-2 bg-white/50 p-2 rounded">
                        <code className="flex-1 text-xs font-mono">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code>
                        <Button 
                          size="sm" 
                          variant="outline"
                          type="button"
                          onClick={() => copyToClipboard('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Send only USDT (TRC20) to this address
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID / UTR</Label>
                <Input
                  id="transactionId"
                  type="text"
                  placeholder="Enter transaction ID or UTR number"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proofLink">Proof Link (G-Drive)</Label>
                <Input
                  id="proofLink"
                  type="url"
                  placeholder="Enter Google Drive link for payment proof"
                  value={proofLink}
                  onChange={(e) => setProofLink(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Upload screenshot/receipt to Google Drive and share the link
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                disabled={isSubmitting || !method || !amount || !transactionId || !proofLink}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Deposit Request'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Deposit History */}
        <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle>Deposit History</CardTitle>
            <CardDescription>Your recent deposit requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {depositHistory.map((deposit) => (
                <div 
                  key={deposit.id} 
                  className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/20"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(deposit.status)}
                    <div>
                      <p className="font-medium">₹{deposit.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{deposit.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`mb-1 ${getStatusColor(deposit.status)}`}>
                      {deposit.status}
                    </Badge>
                    <p className="text-xs text-gray-600 capitalize">{deposit.type}</p>
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

export default DepositTab;
