
import { useState } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SupportTabProps {
  user: User;
}

const SupportTab = ({ user }: SupportTabProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Support Ticket Created",
        description: "Your ticket has been submitted. We'll respond within 24 hours.",
      });
      setTitle('');
      setDescription('');
      setIsSubmitting(false);
    }, 1500);
  };

  // Mock ticket history
  const ticketHistory = [
    {
      id: 'TKT001',
      title: 'Withdrawal not processed',
      description: 'My withdrawal request from last week is still pending...',
      status: 'open',
      priority: 'high',
      createdDate: '2024-01-22',
      lastUpdate: '2024-01-23',
    },
    {
      id: 'TKT002',
      title: 'KYC verification query',
      description: 'Need clarification on KYC document requirements...',
      status: 'resolved',
      priority: 'medium',
      createdDate: '2024-01-20',
      lastUpdate: '2024-01-21',
    },
    {
      id: 'TKT003',
      title: 'Referral bonus not credited',
      description: 'Referral bonus for level 2 member not showing in wallet...',
      status: 'closed',
      priority: 'low',
      createdDate: '2024-01-18',
      lastUpdate: '2024-01-19',
    },
    {
      id: 'TKT004',
      title: 'Product delivery issue',
      description: 'Ordered product 2 weeks ago but not delivered yet...',
      status: 'open',
      priority: 'medium',
      createdDate: '2024-01-15',
      lastUpdate: '2024-01-16',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ticketStats = {
    total: ticketHistory.length,
    open: ticketHistory.filter(t => t.status === 'open').length,
    resolved: ticketHistory.filter(t => t.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full bg-white/60 backdrop-blur-lg border border-white/20">
          <TabsTrigger value="create">Create Ticket</TabsTrigger>
          <TabsTrigger value="history">Ticket History</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Create Support Ticket
              </CardTitle>
              <CardDescription>
                Describe your issue and our support team will assist you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Ticket Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Brief description of your issue"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Before submitting:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Check our FAQ section for common solutions</li>
                    <li>• Include your User ID: {user.userId}</li>
                    <li>• Provide transaction IDs if relevant</li>
                    <li>• Our support team responds within 24 hours</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={isSubmitting || !title || !description}
                >
                  {isSubmitting ? 'Submitting...' : 'Create Support Ticket'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          {/* Ticket Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/30">
              <CardContent className="p-4 text-center">
                <MessageCircle className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold">{ticketStats.total}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-white/30">
              <CardContent className="p-4 text-center">
                <Clock className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-2xl font-bold">{ticketStats.open}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg border-white/30">
              <CardContent className="p-4 text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">{ticketStats.resolved}</p>
              </CardContent>
            </Card>
          </div>

          {/* Ticket History */}
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle>Support Ticket History</CardTitle>
              <CardDescription>Track your support requests and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticketHistory.map((ticket) => (
                  <div 
                    key={ticket.id}
                    className="p-4 bg-white/50 rounded-lg border border-white/20 hover:bg-white/70 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(ticket.status)}
                        <h3 className="font-semibold">{ticket.title}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {ticket.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Ticket ID: {ticket.id}</span>
                      <div className="space-x-4">
                        <span>Created: {ticket.createdDate}</span>
                        <span>Updated: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportTab;
