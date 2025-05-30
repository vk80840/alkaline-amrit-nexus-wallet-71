
import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Info, Package, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Announcement } from '../types/user';

interface AnnouncementsTabProps {
  user: User;
}

const AnnouncementsTab = ({ user }: AnnouncementsTabProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'promotion':
        return <FileText className="h-4 w-4" />;
      case 'welcome':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'promotion':
        return 'bg-purple-100 text-purple-800';
      case 'welcome':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
      {/* Announcement Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <Bell className="mx-auto h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm text-gray-600">Total Announcements</p>
            <p className="text-2xl font-bold">{announcements.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border-white/30">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-orange-500 mb-2" />
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold">{announcements.filter(a => a.is_active).length}</p>
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
          {announcements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No announcements available at the moment.
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div 
                  key={announcement.id}
                  className="p-4 rounded-lg border bg-white/30 border-gray-200 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getTagColor(announcement.type)}>
                            <div className="flex items-center space-x-1">
                              {getTagIcon(announcement.type)}
                              <span className="capitalize">{announcement.type}</span>
                            </div>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {announcement.content}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>By: Admin</span>
                    <span>{formatDate(announcement.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {announcements.length > 0 && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={fetchAnnouncements}>
                Refresh Announcements
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsTab;
