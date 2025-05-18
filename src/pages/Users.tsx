import React, { useEffect, useState } from 'react';
import { Search, Filter, Download, MoreVertical, User, Shield } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';


function Users() {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const handleEdit = (user: any) => {
  console.log('Edit user:', user);
  // Add edit logic here (e.g., open modal)
  setOpenMenuId(null);
};
interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  bookingsCount: number;
  joinDate: string;
  status: string;
}

const handleDelete = async (userId: string) => {
  try {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } else {
      const err = await response.json();
      alert('Delete failed: ' + err.error);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    alert('An error occurred while deleting the user.');
  }
};




  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:4000/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        

        // Map API data to expected shape
        const mappedUsers = data.map((user: any) => ({
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          mobile: user.phone || '',
          bookingsCount: user.bookingsCount || 0, // ✅ Use actual count from API
          joinDate: user.created_at,
          status: 'active', // Default status if not provided
          }));


        setUsersData(mappedUsers);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading users...</div>;
  }

  // Filter users based on search term
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile.includes(searchTerm)
  );

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
    setActiveTab('profile');
  };

  const closeModal = () => setShowUserModal(false);
  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Users Management</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Filter size={18} className="mr-2 text-gray-500" />
            <span>Filter</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Download size={18} className="mr-2 text-gray-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Search input */}
      <div className="bg-white rounded-lg shadow-custom">
        <div className="p-4 border-b border-gray-200">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* User table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50 ${user.status === 'blocked' ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <User size={18} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text-primary">
                        {user.name}
                        {user.status === 'blocked' && (
                          <span className="text-red-600 ml-2 group relative">
                            <Shield size={14} />
                            <span className="hidden group-hover:block absolute -top-8 left-0 bg-red-100 text-red-800 text-xs rounded py-1 px-2 whitespace-nowrap">
                              User access restricted
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">ID: {user.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{user.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{user.bookingsCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{new Date(user.joinDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={user.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-primary-600 hover:text-primary-900 mr-4"
                      onClick={() => handleViewUser(user)}
                    >
                      View Profile
                    </button>
                   <div className="relative inline-block text-left">
  <button
    onClick={() =>
      setOpenMenuId(openMenuId === user.id ? null : user.id)
    }
    className="text-gray-600 hover:text-gray-900 focus:outline-none"
  >
    <MoreVertical size={16} />
  </button>

  {openMenuId === user.id && (
    <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
      <div className="py-1">
        
        <button
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )}
</div>


                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">User Profile</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>

                <div className="border-b border-gray-200 mb-4">
                  <nav className="flex -mb-px">
                    <button
                      className={`mr-6 py-4 px-1 text-sm font-medium border-b-2 ${
                        activeTab === 'profile'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => handleTabChange('profile')}
                    >
                      Profile
                    </button>
                    <button
                      className={`mr-6 py-4 px-1 text-sm font-medium border-b-2 ${
                        activeTab === 'bookings'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => handleTabChange('bookings')}
                    >
                      Bookings
                    </button>
                    <button
                      className={`mr-6 py-4 px-1 text-sm font-medium border-b-2 ${
                        activeTab === 'tickets'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => handleTabChange('tickets')}
                    >
                      Support Tickets
                    </button>
                    <button
                      className={`py-4 px-1 text-sm font-medium border-b-2 ${
                        activeTab === 'payments'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => handleTabChange('payments')}
                    >
                      Payments
                    </button>
                  </nav>
                </div>

                {/* Tab contents */}
                <div>
                  {activeTab === 'profile' && (
                    <div>
                      <p><strong>Name:</strong> {selectedUser.name}</p>
                      <p><strong>Email:</strong> {selectedUser.email}</p>
                      <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
                      <p><strong>Bookings:</strong> {selectedUser.bookingsCount}</p>
                      <p><strong>Joined:</strong> {new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                      <p><strong>Status:</strong> {selectedUser.status}</p>
                    </div>
                  )}
                  {activeTab === 'bookings' && <div>Bookings content here</div>}
                  {activeTab === 'tickets' && <div>Support Tickets content here</div>}
                  {activeTab === 'payments' && <div>Payments content here</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
