import { useState, useEffect } from 'react';
import { Filter, Download, Search, X } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { StatusType, DeliveryType } from '../utils/types'; // adjust the path as needed



interface Booking {
  parcel_id: string;
  user_id: string;
  pickup_location: string;
  drop_location: string;
  deliverytype: string;
  created_at: string; // ISO date string
  status: StatusType;
}
const validStatuses: StatusType[] = [
  'pending', 'in-transit', 'delivered', 'cancelled',
  'active', 'blocked', 'open', 'closed', 'Confirmed', 'failed',
];
const validDeliveryTypes: DeliveryType[] = ['normal', 'expressdelivery'];

function isValidStatus(status: string): status is StatusType {
  return validStatuses.includes(status as StatusType);
}
function isValidDeliveryType(type: string): type is DeliveryType {
  return validDeliveryTypes.includes(type as DeliveryType);
}
function convertBooking(raw: any): Booking {
  return {
    ...raw,
    status: isValidStatus(raw.status) ? raw.status : 'pending',
    delivery_type: isValidDeliveryType(raw.delivery_type) ? raw.delivery_type : 'normal',
  };
}



function Bookings() {
  type BookingTab = StatusType | 'all';
  const [activeTab, setActiveTab] = useState<BookingTab>('all');
  
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  

useEffect(() => {
  fetch('http://localhost:4000/api/bookings')
    .then((res) => res.json())
    .then((data) => {
      const converted = data.map(convertBooking);
      setBookings(converted);
    })
    .catch((err) => console.error('Failed to fetch bookings:', err));
}, []);



  const handleTabChange = (tab: StatusType) => setActiveTab(tab);

  const handleSelectBooking = (id: string) => {
    setSelectedBookings((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedBookings(filteredBookings.map((b) => b.parcel_id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDrawer(true);
  };
  

  const closeDrawer = () => setShowDrawer(false);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = activeTab === 'all' || b.status === activeTab;
    const search = searchTerm.toLowerCase();
    return (
      matchesStatus &&
      (b.parcel_id.toLowerCase().includes(search) ||
        b.user_id.toLowerCase().includes(search) ||
        b.pickup_location.toLowerCase().includes(search) ||
        b.drop_location.toLowerCase().includes(search))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Bookings Management</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Filter size={18} className="mr-2 text-gray-500" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Download size={18} className="mr-2 text-gray-500" />
            Export
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-1 border-b border-gray-200">
          {['all', 'pending', 'in-transit', 'delivered', 'cancelled'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleTabChange(tab as StatusType)}
            >
              {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search bookings..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {selectedBookings.length > 0 && (
        <div className="bg-primary-50 p-3 rounded-md flex justify-between items-center">
          <span className="text-sm text-primary-700">
            {selectedBookings.length} booking{selectedBookings.length > 1 && 's'} selected
          </span>
          <div className="flex space-x-3">
            <button className="text-sm text-primary-600 hover:text-primary-700">Assign Vehicle</button>
            <button className="text-sm text-error hover:text-red-700">Cancel Bookings</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-custom overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600"
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pickup → Drop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.parcel_id}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600"
                      checked={selectedBookings.includes(booking.parcel_id)}
                      onChange={() => handleSelectBooking(booking.parcel_id)}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{booking.parcel_id}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{booking.user_id}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {booking.pickup_location} → {booking.drop_location}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{booking.deliverytype}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      className="text-primary-600 hover:text-primary-900 mr-4"
                      onClick={() => handleViewBooking(booking)}
                    >
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDrawer && selectedBooking && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={closeDrawer}></div>
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Booking #{selectedBooking.parcel_id}</h2>
              <button onClick={closeDrawer}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>User ID:</strong> {selectedBooking.user_id}</p>
              <p><strong>Pickup:</strong> {selectedBooking.pickup_location}</p>
              <p><strong>Drop:</strong> {selectedBooking.drop_location}</p>
              <p><strong>Type:</strong> {selectedBooking.deliverytype}</p>
              <p><strong>Status:</strong> {selectedBooking.status}</p>
              <p><strong>Date:</strong> {new Date(selectedBooking.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
