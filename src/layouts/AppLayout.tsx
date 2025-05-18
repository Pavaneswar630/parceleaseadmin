import { useState, ReactNode } from 'react';
import Sidebar from '../components/navigation/Sidebar';
import Navbar from '../components/navigation/Navbar';

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-secondary-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;