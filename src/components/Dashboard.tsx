
import { useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M0 0h20v20H0zm20 20h20v20H20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isMobile ? 'ml-0' : sidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        <Header 
          user={user}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
        />
        
        <main className="flex-1 p-4 pb-20 md:pb-4 overflow-auto">
          {renderActiveTab()}
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
