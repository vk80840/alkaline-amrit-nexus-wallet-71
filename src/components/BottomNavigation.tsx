
import { Button } from '@/components/ui/button';
import { Home, Users, User, Wallet } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, setActiveTab }: BottomNavigationProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/10 shadow-lg z-40">
      <div className="grid grid-cols-4 gap-1 p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={`
                flex flex-col items-center space-y-1 h-16 transition-all duration-300 bg-transparent
                ${isActive 
                  ? 'text-blue-500' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className={`h-5 w-5 transition-all duration-300 ${
                isActive 
                  ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] filter brightness-110' 
                  : ''
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 ${
                isActive 
                  ? 'text-blue-500 drop-shadow-[0_0_4px_rgba(59,130,246,0.3)]' 
                  : ''
              }`}>
                {tab.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
