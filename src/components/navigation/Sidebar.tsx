import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Map, Users, LifeBuoy, 
  CreditCard, Truck, HelpCircle, Settings, BarChart2, 
  ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: JSX.Element;
  badge?: number;
}

function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/bookings', label: 'Bookings', icon: <Package size={20} />, badge: 12 },
    { path: '/track', label: 'Track Shipment', icon: <Map size={20} /> },
    { path: '/users', label: 'Users', icon: <Users size={20} /> },
    { path: '/support', label: 'Support Tickets', icon: <LifeBuoy size={20} />, badge: 3 },
    { path: '/payments', label: 'Payments', icon: <CreditCard size={20} /> },
    { path: '/vehicles', label: 'Vehicles', icon: <Truck size={20} /> },
    { path: '/faq', label: 'FAQ', icon: <HelpCircle size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
    { path: '/reports', label: 'Reports', icon: <BarChart2 size={20} /> },
  ];

  return (
    <aside 
      className={`bg-white h-full flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-primary-500">Parcel Ease</h1>
        )}
        {collapsed && (
          <div className="mx-auto">
            <span className="text-primary-500 font-bold text-xl">PE</span>
          </div>
        )}
        <button 
          onClick={onToggle} 
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-3 py-2.5 rounded-md transition-colors
              ${isActive 
                ? 'bg-primary-50 text-primary-600' 
                : 'text-text-secondary hover:bg-gray-100'}
            `}
            end={item.path === '/'}
          >
            <span className="relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 flex items-center justify-center w-5 h-5 bg-accent-500 text-white text-xs font-semibold rounded-full">
                  {item.badge}
                </span>
              )}
            </span>
            {!collapsed && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        {!collapsed ? (
          <div className="flex items-center p-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-text-primary">Admin User</p>
              <p className="text-xs text-text-muted">admin@parcelease.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              A
            </div>
          </div>
        )}
        <button className={`mt-4 flex items-center justify-center w-full p-2 text-sm font-medium text-text-secondary hover:bg-gray-100 rounded-md ${collapsed ? 'px-0' : 'px-3'}`}>
          <LogOut size={18} />
          {!collapsed && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;