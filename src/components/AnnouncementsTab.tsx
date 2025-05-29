
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Info, Package, FileText } from 'lucide-react';

interface AnnouncementsTabProps {
  user: User;
}

const AnnouncementsTab = ({ user }: AnnouncementsTabProps) => {
  // Mock announcements data
  const announcements = [
    {
      id: '1',
      title: 'New Product Launch: Advanced Water Filter',
      description: 'We are excited to announce the launch of our new Advanced Alkaline Water Filter System. This state-of-the-art filtration technology provides the purest alkaline water with enhanced mineral content.',
      tag: 'product',
      priority: 'high',
      by: 'Admin Team',
      createdDate: '2024-01-23',
      isRead: false,
    },
    {
      id: '2',
      title: 'Updated KYC Verification Process',
      description: 'To comply with new regulations, we have updated our KYC verification process. All users are required to submit additional documentation for identity verification.',
      tag: 'policies',
      priority: 'medium',
      by: 'Compliance Team',
      createdDate: '2024-01-22',
      isRead: true,
    },
    {
      id: '3',
      title: 'Scheduled Maintenance - January 25th',
      description: 'Our platform will undergo scheduled maintenance on January 25th from 2:00 AM to 6:00 AM IST. During this time, some services may be temporarily unavailable.',
      tag: 'maintenance',
      priority: 'medium',
      by: 'Technical Team',
      createdDate: '2024-01-21',
      isRead: false,
    },
    {
      id: '4',
      title: 'Enhanced Referral Bonus Program',
      description: 'We have enhanced our referral bonus structure! Starting February 1st, enjoy increased commission rates and additional level bonuses.',
      tag: 'policies',
      priority: 'high',
      by: 'Management',
      createdDate: '2024-01-20',
      isRead: true,
    },
    {
      id: '5',
      title: 'Winter Sale - Up to 30% Off',
      description: 'Take advantage of our winter sale with discounts up to 30% on all alkaline water products. Limited time offer valid until January 31st.',
      tag: 'product',
      priority: 'low',
      by: 'Sales Team',
      createdDate: '2024-01-18',
      isRead: true,
    },
  ];

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'policies':
        return <FileText className="h-4 w-4" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'policies':
        return 'bg-purple-100 text-purple-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const stats = {
    total: announcements.length,
    unread: announcements.filter(a => !a.isRead).length,
  };

  return (
    <div className="space-y-6">
      {/* Announcement Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Bell className="mx-auto h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">Total Announcements</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-orange-500 mb-2" />
            <p className="text-sm text-gray-600">Unread</p>
            <p className="text-2xl font-bold">{stats.unread}</p>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Company Announcements
          </CardTitle>
          <CardDescription>
            Stay updated with the latest news and updates from AlkalineAmrit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  announcement.isRead 
                    ? 'bg-white/30 border-gray-200' 
                    : 'bg-blue-50/50 border-blue-200 ring-1 ring-blue-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {!announcement.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    )}
                    <div className="flex-1">
                      <h3 className={`font-semibold ${!announcement.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                        {announcement.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getTagColor(announcement.tag)}>
                          <div className="flex items-center space-x-1">
                            {getTagIcon(announcement.tag)}
                            <span className="capitalize">{announcement.tag}</span>
                          </div>
                        </Badge>
                        <Badge className={getPriorityColor(announcement.priority)}>
                          {announcement.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {!announcement.isRead && (
                    <Button variant="outline" size="sm">
                      Mark as Read
                    </Button>
                  )}
                </div>
                
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {announcement.description}
                </p>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>By: {announcement.by}</span>
                  <span>{announcement.createdDate}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">
              Load More Announcements
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsTab;
