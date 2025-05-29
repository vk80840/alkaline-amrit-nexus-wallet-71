
import { User } from '../types/user';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Home, 
  ArrowDown, 
  ArrowUp, 
  Wallet, 
  User as UserIcon, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

const Sidebar = ({ 
  user, 
  activeTab, 
  setActiveTab, 
  sidebarOpen, 
  setSidebarOpen, 
  onLogout 
}: SidebarProps) => {
  const isMobile = useIsMobile();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'withdraw', label: 'Withdraw', icon: ArrowUp },
    { id: 'deposit', label: 'Deposit', icon: ArrowDown },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'team', label: 'Team', icon: Settings },
    { id: 'tree-view', label: 'Tree View', icon: Settings },
    { id: 'shop', label: 'Shop', icon: Settings },
    { id: 'stk-wallet', label: 'STK Wallet', icon: Wallet },
    { id: 'business-volume', label: 'Business Volume', icon: Settings },
    { id: 'salary', label: 'Salary', icon: Settings },
    { id: 'support', label: 'Support', icon: Settings },
    { id: 'announcements', label: 'Announcements', icon: Settings },
  ];

  if (isMobile && !sidebarOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl z-50
        transition-all duration-300 ease-in-out
        ${isMobile ? 'w-80' : sidebarOpen ? 'w-64' : 'w-16'}
      `}>
        {/* Mobile Close Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        <div className="flex flex-col h-full p-4">
          {/* Wallet Balance Card */}
          {(sidebarOpen || isMobile) && (
            <Card className="p-4 mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/30">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Balance</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  ₹{(user.mainBalance + user.topupBalance).toLocaleString()}
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <div>
                    <span className="block">Main</span>
                    <span className="font-semibold">₹{user.mainBalance.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block">Top-up</span>
                    <span className="font-semibold">₹{user.topupBalance.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`
                    w-full justify-start h-12 transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-white/50 text-gray-700'
                    }
                    ${!sidebarOpen && !isMobile ? 'px-3' : 'px-4'}
                  `}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                >
                  <Icon className={`h-5 w-5 ${!sidebarOpen && !isMobile ? '' : 'mr-3'}`} />
                  {(sidebarOpen || isMobile) && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <Button
            variant="outline"
            className={`
              w-full mt-4 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300
              ${!sidebarOpen && !isMobile ? 'px-3' : 'px-4'}
            `}
            onClick={onLogout}
          >
            <LogOut className={`h-5 w-5 ${!sidebarOpen && !isMobile ? '' : 'mr-3'}`} />
            {(sidebarOpen || isMobile) && <span>Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
