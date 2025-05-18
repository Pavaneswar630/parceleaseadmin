import { useState } from 'react';
import { Search, MapPin, Clock, User, Package, Calendar, Truck } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { bookingsData } from '../utils/mockData';

function TrackShipment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    
    if (!value) {
      setSelectedBooking(null);
    }
  };

  const handleBookingSelect = (booking: any) => {
    setSelectedBooking(booking);
    setSearchTerm(booking.id);
    setShowSuggestions(false);
  };

  const filteredBookings = bookingsData.filter(booking => 
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock tracking updates
  const trackingUpdates = selectedBooking ? [
    { 
      time: new Date(selectedBooking.date.getTime() - 24 * 60 * 60 * 1000).toLocaleString(), 
      status: 'Order Placed', 
      location: selectedBooking.pickup 
    },
    { 
      time: new Date(selectedBooking.date.getTime() - 18 * 60 * 60 * 1000).toLocaleString(), 
      status: 'Pickup Scheduled', 
      location: selectedBooking.pickup 
    },
    { 
      time: new Date(selectedBooking.date.getTime() - 12 * 60 * 60 * 1000).toLocaleString(), 
      status: 'Picked Up', 
      location: selectedBooking.pickup 
    },
    ...(selectedBooking.status === 'delivered' || selectedBooking.status === 'in-transit' ? [
      { 
        time: new Date(selectedBooking.date.getTime() - 6 * 60 * 60 * 1000).toLocaleString(), 
        status: 'In Transit', 
        location: 'Distribution Center' 
      },
    ] : []),
    ...(selectedBooking.status === 'delivered' ? [
      { 
        time: new Date(selectedBooking.date.getTime() + 24 * 60 * 60 * 1000).toLocaleString(), 
        status: 'Out for Delivery', 
        location: selectedBooking.drop 
      },
      { 
        time: new Date(selectedBooking.date.getTime() + 30 * 60 * 60 * 1000).toLocaleString(), 
        status: 'Delivered', 
        location: selectedBooking.drop 
      },
    ] : []),
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Track Shipment</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-custom">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Booking ID (e.g., BD1234)"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(searchTerm.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-md hover:bg-primary-600 transition-colors">
              Track
            </button>

            {showSuggestions && filteredBookings.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10 max-h-60 overflow-y-auto">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                    onClick={() => handleBookingSelect(booking)}
                  >
                    <div>
                      <div className="font-medium text-text-primary">{booking.id}</div>
                      <div className="text-sm text-text-secondary">{booking.user}</div>
                    </div>
                    <StatusBadge status={booking.status as any} size="sm" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedBooking && (
            <div className="mt-8 animate-fade-in">
              <div className="bg-secondary-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-primary-500">
                      <Package size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Booking ID</h3>
                      <p className="text-text-primary font-semibold">{selectedBooking.id}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-primary-500">
                      <User size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                      <p className="text-text-primary">{selectedBooking.user}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-primary-500">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Booking Date</h3>
                      <p className="text-text-primary">{selectedBooking.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-primary-500">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <div className="mt-1">
                        <StatusBadge status={selectedBooking.status as any} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-4">Shipment Progress</h3>
              
              <div className="relative pb-8">
                <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-gray-200"></div>
                {trackingUpdates.map((update, index) => (
                  <div key={index} className="relative flex items-start mb-6">
                    <div className={`absolute top-0 left-7 -ml-px h-full w-0.5 ${
                      index === trackingUpdates.length - 1 ? 'bg-white' : 'bg-gray-200'
                    }`}></div>
                    <div className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ${
                      index === trackingUpdates.length - 1 
                        ? 'border-primary-500 bg-primary-500' 
                        : 'border-gray-400 bg-white'
                    } z-10 mt-1.5 ml-5`}></div>
                    <div className="min-w-0 flex-1 ml-4">
                      <div className="text-sm font-semibold text-text-primary">{update.status}</div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock size={14} className="mr-1" />
                        {update.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin size={14} className="mr-1" />
                        {update.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedBooking.status === 'delivered' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                  <h3 className="text-green-800 font-semibold flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Delivery Completed
                  </h3>
                  <p className="text-green-700 mt-1">
                    Package was delivered on {new Date(selectedBooking.date.getTime() + 30 * 60 * 60 * 1000).toLocaleDateString()} at 2:45 PM
                  </p>
                  <p className="text-green-700 mt-1">
                    Received by: John Smith
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackShipment;