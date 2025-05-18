import { useState } from 'react';
import { Search, Bell, ChevronDown, User, Settings, HelpCircle, LogOut } from 'lucide-react';

interface NavbarProps {
  sidebarCollapsed: boolean;
}

function Navbar({ sidebarCollapsed }: NavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 z-30">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center w-full max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-text-primary">New booking received</p>
                      <p className="text-xs text-text-muted mt-1">Booking #BD8723 from client John Doe</p>
                      <p className="text-xs text-text-muted mt-1">2 minutes ago</p>
                    </div>
                  ))}
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium text-text-primary">Support ticket updated</p>
                    <p className="text-xs text-text-muted mt-1">Jane Smith responded to ticket #4321</p>
                    <p className="text-xs text-text-muted mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-xs font-medium text-primary-500 hover:text-primary-600">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                A
              </div>
              {!sidebarCollapsed && (
                <>
                  <span className="text-sm font-medium text-text-primary">Admin User</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </>
              )}
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-text-primary">Admin User</p>
                  <p className="text-xs text-text-muted">admin@parcelease.com</p>
                </div>
                <ul>
                  <li>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-gray-50">
                      <User size={16} className="mr-2" />
                      Profile
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-gray-50">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-gray-50">
                      <HelpCircle size={16} className="mr-2" />
                      Help & Support
                    </button>
                  </li>
                  <li className="border-t border-gray-100">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-gray-50">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;