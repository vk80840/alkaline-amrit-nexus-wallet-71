
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
  Users,
  LogOut,
  X,
  ShoppingBag,
  TreePine,
  Coins,
  TrendingUp,
  DollarSign,
  MessageSquare,
  Bell
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
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'withdraw', label: 'Withdraw', icon: ArrowUp, color: 'text-red-600 bg-red-50 border-red-200' },
    { id: 'deposit', label: 'Deposit', icon: ArrowDown, color: 'text-green-600 bg-green-50 border-green-200' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { id: 'profile', label: 'Profile', icon: UserIcon, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'team', label: 'Team', icon: Users, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { id: 'tree-view', label: 'Tree View', icon: TreePine, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, color: 'text-pink-600 bg-pink-50 border-pink-200' },
    { id: 'stk-wallet', label: 'STK Wallet', icon: Coins, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { id: 'business-volume', label: 'Business Volume', icon: TrendingUp, color: 'text-violet-600 bg-violet-50 border-violet-200' },
    { id: 'salary', label: 'Salary', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { id: 'support', label: 'Support', icon: MessageSquare, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'announcements', label: 'Announcements', icon: Bell, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  ];

  if (isMobile && !sidebarOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-50
        transition-all duration-300 ease-in-out overflow-y-auto
        ${isMobile ? 'w-80' : sidebarOpen ? 'w-64' : 'w-16'}
      `}>
        {/* Mobile Close Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10 text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        <div className="flex flex-col h-full p-4">
          {/* Logo Section */}
          {(sidebarOpen || isMobile) && (
            <div className="mb-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-white font-bold text-xl">AA</span>
              </div>
              <h1 className="text-gray-900 font-bold text-lg">AlkalineAmrit</h1>
              <p className="text-gray-600 text-xs">Transform your wealth</p>
            </div>
          )}

          {/* Wallet Balance Card */}
          {(sidebarOpen || isMobile) && (
            <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">💰 Total Balance</h3>
                <div className="text-2xl font-bold text-gray-900 mb-3">
                  ₹{(user.mainBalance + user.topupBalance).toLocaleString()}
                </div>
                <div className="flex justify-between text-xs">
                  <div className="bg-green-100 border border-green-200 rounded-lg p-2 flex-1 mr-1">
                    <span className="block text-green-700 font-medium">Main</span>
                    <span className="font-bold text-green-800">₹{user.mainBalance.toLocaleString()}</span>
                  </div>
                  <div className="bg-blue-100 border border-blue-200 rounded-lg p-2 flex-1 ml-1">
                    <span className="block text-blue-700 font-medium">Top-up</span>
                    <span className="font-bold text-blue-800">₹{user.topupBalance.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`
                    w-full justify-start h-12 transition-all duration-200 border
                    ${isActive 
                      ? `${item.color} border shadow-sm font-medium` 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent hover:border-gray-200'
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
                    <span className="truncate font-medium">{item.label}</span>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <Button
            variant="outline"
            className={`
              w-full mt-6 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200
              ${!sidebarOpen && !isMobile ? 'px-3' : 'px-4'}
            `}
            onClick={onLogout}
          >
            <LogOut className={`h-5 w-5 ${!sidebarOpen && !isMobile ? '' : 'mr-3'}`} />
            {(sidebarOpen || isMobile) && <span className="font-medium">Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
