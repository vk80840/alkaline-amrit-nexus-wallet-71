
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
  Settings,
  LogOut,
  Menu,
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
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-blue-500 to-purple-600' },
    { id: 'withdraw', label: 'Withdraw', icon: ArrowUp, color: 'from-red-500 to-pink-600' },
    { id: 'deposit', label: 'Deposit', icon: ArrowDown, color: 'from-green-500 to-emerald-600' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, color: 'from-yellow-500 to-orange-600' },
    { id: 'profile', label: 'Profile', icon: UserIcon, color: 'from-indigo-500 to-blue-600' },
    { id: 'team', label: 'Team', icon: Users, color: 'from-purple-500 to-pink-600' },
    { id: 'tree-view', label: 'Tree View', icon: TreePine, color: 'from-green-600 to-teal-600' },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, color: 'from-orange-500 to-red-600' },
    { id: 'stk-wallet', label: 'STK Wallet', icon: Coins, color: 'from-cyan-500 to-blue-600' },
    { id: 'business-volume', label: 'Business Volume', icon: TrendingUp, color: 'from-violet-500 to-purple-600' },
    { id: 'salary', label: 'Salary', icon: DollarSign, color: 'from-emerald-500 to-green-600' },
    { id: 'support', label: 'Support', icon: MessageSquare, color: 'from-blue-500 to-indigo-600' },
    { id: 'announcements', label: 'Announcements', icon: Bell, color: 'from-pink-500 to-rose-600' },
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
        fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl border-r border-purple-500/20 shadow-2xl z-50
        transition-all duration-300 ease-in-out overflow-y-auto
        ${isMobile ? 'w-80' : sidebarOpen ? 'w-64' : 'w-16'}
      `}>
        {/* Mobile Close Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        <div className="flex flex-col h-full p-4">
          {/* Logo Section */}
          {(sidebarOpen || isMobile) && (
            <div className="mb-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">AA</span>
              </div>
              <h1 className="text-white font-bold text-lg">AlkalineAmrit</h1>
              <p className="text-purple-300 text-xs">Transform your wealth</p>
            </div>
          )}

          {/* Wallet Balance Card */}
          {(sidebarOpen || isMobile) && (
            <Card className="p-4 mb-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg border-purple-400/30 shadow-xl">
              <div className="text-center">
                <h3 className="text-sm font-bold text-purple-200 mb-2">💰 Total Balance</h3>
                <div className="text-2xl font-bold text-white mb-3">
                  ₹{(user.mainBalance + user.topupBalance).toLocaleString()}
                </div>
                <div className="flex justify-between text-xs">
                  <div className="bg-green-500/20 rounded-lg p-2 flex-1 mr-1">
                    <span className="block text-green-300 font-semibold">Main</span>
                    <span className="font-bold text-white">₹{user.mainBalance.toLocaleString()}</span>
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-2 flex-1 ml-1">
                    <span className="block text-blue-300 font-semibold">Top-up</span>
                    <span className="font-bold text-white">₹{user.topupBalance.toLocaleString()}</span>
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
                    w-full justify-start h-12 transition-all duration-300 border border-transparent
                    ${isActive 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg border-white/20 transform scale-105` 
                      : 'hover:bg-white/10 text-purple-200 hover:text-white hover:border-purple-400/30'
                    }
                    ${!sidebarOpen && !isMobile ? 'px-3' : 'px-4'}
                  `}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                >
                  <Icon className={`h-5 w-5 ${!sidebarOpen && !isMobile ? '' : 'mr-3'} ${isActive ? 'drop-shadow-lg' : ''}`} />
                  {(sidebarOpen || isMobile) && (
                    <span className="truncate font-semibold">{item.label}</span>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <Button
            variant="outline"
            className={`
              w-full mt-6 border-red-400/30 text-red-300 hover:bg-red-500/20 hover:border-red-300 hover:text-white transition-all duration-300
              ${!sidebarOpen && !isMobile ? 'px-3' : 'px-4'}
            `}
            onClick={onLogout}
          >
            <LogOut className={`h-5 w-5 ${!sidebarOpen && !isMobile ? '' : 'mr-3'}`} />
            {(sidebarOpen || isMobile) && <span className="font-semibold">Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
