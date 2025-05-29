
import { useState } from 'react';
import { User } from '../types/user';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Bell, Menu, User as UserIcon, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import AnnouncementsTab from './AnnouncementsTab';

interface HeaderProps {
  user: User;
  onToggleSidebar: () => void;
  onLogout: () => void;
  setActiveTab: (tab: string) => void;
}

const Header = ({ user, onToggleSidebar, onLogout, setActiveTab }: HeaderProps) => {
  const [notificationCount] = useState(3);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const isMobile = useIsMobile();

  const handleNotificationClick = () => {
    setShowAnnouncements(true);
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="hover:bg-gray-100"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">AA</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">
                  AlkalineAmrit
                </h1>
                <p className="text-xs text-gray-600 font-medium">Transform your health, transform your wealth</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover:bg-gray-100"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5 text-gray-700" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0 animate-pulse">
                  {notificationCount}
                </Badge>
              )}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 hover:bg-gray-100 pr-2"
                  onClick={handleProfileClick}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <UserIcon className="h-4 w-4 text-white" />
                    )}
                  </div>
                  {!isMobile && (
                    <div className="text-left">
                      <div className="text-sm font-bold text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-600">{user.userId}</div>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200">
                <div className="px-3 py-2">
                  <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                  <Badge variant="secondary" className="mt-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    {user.rank}
                  </Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="hover:bg-gray-50"
                  onClick={handleProfileClick}
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-gray-50"
                  onClick={handleNotificationClick}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={onLogout}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Announcements Popup */}
      <Dialog open={showAnnouncements} onOpenChange={setShowAnnouncements}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Announcements</DialogTitle>
          </DialogHeader>
          <AnnouncementsTab user={user} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
