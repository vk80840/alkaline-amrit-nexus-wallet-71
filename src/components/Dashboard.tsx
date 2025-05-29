
import React, { useState } from 'react';
import { User } from '../types/user';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardContent from './DashboardContent';
import WithdrawTab from './WithdrawTab';
import DepositTab from './DepositTab';
import WalletTab from './WalletTab';
import ProfileTab from './ProfileTab';
import TeamTab from './TeamTab';
import TreeViewTab from './TreeViewTab';
import ShopTab from './ShopTab';
import STKWalletTab from './STKWalletTab';
import BusinessVolumeTab from './BusinessVolumeTab';
import SalaryTab from './SalaryTab';
import SupportTab from './SupportTab';
import AnnouncementsTab from './AnnouncementsTab';
import BottomNavigation from './BottomNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent user={user} />;
      case 'withdraw':
        return <WithdrawTab user={user} />;
      case 'deposit':
        return <DepositTab user={user} />;
      case 'wallet':
        return <WalletTab user={user} />;
      case 'profile':
        return <ProfileTab user={user} />;
      case 'team':
        return <TeamTab user={user} />;
      case 'tree-view':
        return <TreeViewTab user={user} />;
      case 'shop':
        return <ShopTab user={user} />;
      case 'stk-wallet':
        return <STKWalletTab user={user} />;
      case 'business-volume':
        return <BusinessVolumeTab user={user} />;
      case 'salary':
        return <SalaryTab user={user} />;
      case 'support':
        return <SupportTab user={user} />;
      case 'announcements':
        return <AnnouncementsTab user={user} />;
      default:
        return <DashboardContent user={user} />;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex">
      {/* Animated Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           linear-gradient(45deg, rgba(236, 72, 153, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)`
        }}
      ></div>
      
      {/* Sidebar */}
      <Sidebar 
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
        isMobile ? 'ml-0' : sidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        <Header 
          user={user}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
        />
        
        <main className="flex-1 p-3 md:p-6 pb-20 md:pb-6 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {renderActiveTab()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <BottomNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default Dashboard;
