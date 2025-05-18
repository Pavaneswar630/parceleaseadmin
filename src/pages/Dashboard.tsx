import { useEffect, useState } from 'react';
import { Package, DollarSign, Truck, LifeBuoy, Eye, PlusCircle } from 'lucide-react';
import KpiCard from '../components/dashboard/KpiCard';
import LineChart from '../components/dashboard/LineChart';
import PieChart from '../components/dashboard/PieChart';
import StatusBadge from '../components/common/StatusBadge';

type StatusType =
  | 'pending'
  | 'in-transit'
  | 'delivered'
  | 'cancelled'
  | 'active'
  | 'blocked'
  | 'open'
  | 'closed'
  | 'Confirmed'
  | 'failed';

type Kpi = {
  title: string;
  value: string;
  icon: 'Package' | 'DollarSign' | 'Truck' | 'LifeBuoy';
  change: { value: number; type: 'increase' | 'decrease' };
  tooltipText: string;
};

type Booking = {
  parcel_id: number;
  user_id: number;
  pickup_location: string;
  drop_location: string;
  deliverytype: string;
  created_at: string;
  status: string;
};

type RevenueChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

function Dashboard() {
  const [kpiData, setKpiData] = useState<Kpi[]>([]);
  const [kpiLoading, setKpiLoading] = useState(true);
  const [kpiError, setKpiError] = useState<string | null>(null);

  const [revenueChartData, setRevenueChartData] = useState<RevenueChartData | null>(null);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState<string | null>(null);

  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  const [selectedBookingType, setSelectedBookingType] = useState<string | null>(null);
  

  useEffect(() => {
    setKpiLoading(true);
    setKpiError(null);
    fetch('http://localhost:4000/api/dashboard/kpis')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch KPIs');
        return res.json();
      })
      .then(data => setKpiData(data))
      .catch(err => setKpiError(err.message))
      .finally(() => setKpiLoading(false));
  }, []);

  useEffect(() => {
    setRevenueLoading(true);
    setRevenueError(null);
    fetch('http://localhost:4000/api/dashboard/revenue')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch revenue data');
        return res.json();
      })
      .then(data => setRevenueChartData(data))
      .catch(err => setRevenueError(err.message))
      .finally(() => setRevenueLoading(false));
  }, []);

  useEffect(() => {
    setBookingsLoading(true);
    setBookingsError(null);
    fetch('http://localhost:4000/api/bookings')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then(data => setBookingsData(data))
      .catch(err => setBookingsError(err.message))
      .finally(() => setBookingsLoading(false));
  }, []);

  const filteredData = selectedBookingType
    ? bookingsData.filter(booking => booking.deliverytype === selectedBookingType)
    : bookingsData;
    

  const bookingTypeCounts = bookingsData.reduce<Record<string, number>>((acc, booking) => {
    acc[booking.deliverytype] = (acc[booking.deliverytype] || 0) + 1;
    return acc;
  }, {});

  const bookingTypesChartData = {
   labels: ['Pending', 'In Transit', 'Delivered', 'Cancelled'],
  datasets: [
    {
      label: 'Parcel Status',
      data: [12, 19, 7, 3],
      backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f87171'],
      borderColor: ['#2563eb', '#059669', '#7c3aed', '#ef4444'], // Add border colors
      borderWidth: 1, // Add border width
    },
  ],
};

  const iconMap: Record<string, JSX.Element> = {
    Package: <Package size={24} />,
    DollarSign: <DollarSign size={24} />,
    Truck: <Truck size={24} />,
    LifeBuoy: <LifeBuoy size={24} />,
  };

  const handleChartClick = (element: any) => {
    if (element.length > 0) {
      const clickedType = bookingTypesChartData.labels[element[0].index];
      setSelectedBookingType(prev => (prev === clickedType ? null : clickedType));
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="btn flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            <PlusCircle size={18} className="mr-2" />
            Add Vehicle
          </button>
          <button className="btn flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Eye size={18} className="mr-2" />
            View All Tickets
          </button>
        </div>
      </div>

      {selectedBookingType && (
        <div className="bg-primary-50 border border-primary-100 rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-primary-600 font-semibold">
              Filtered by: {selectedBookingType}
            </span>
          </div>
          <button
            onClick={() => setSelectedBookingType(null)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear Filter
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiLoading && <p>Loading KPIs...</p>}
        {kpiError && <p className="text-red-600">Error: {kpiError}</p>}
        {!kpiLoading &&
          !kpiError &&
          kpiData.map((kpi, idx) => (
            <KpiCard
              key={idx}
              title={kpi.title}
              value={kpi.value}
              icon={iconMap[kpi.icon]}
              change={kpi.change}
              tooltipText={kpi.tooltipText}
            />
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-custom">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Revenue Trend</h2>
          {revenueLoading && <p>Loading revenue data...</p>}
          {revenueError && <p className="text-red-600">Error: {revenueError}</p>}
          {revenueChartData && !revenueLoading && !revenueError && (
            <LineChart data={revenueChartData} />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-custom">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Booking Types</h2>
          <div className="flex justify-center items-center h-full">
            <PieChart
              data={bookingTypesChartData}
              // @ts-ignore
              getElementAtEvent={handleChartClick}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-custom">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recent Bookings</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700">
            View All
          </button>
        </div>
        {bookingsLoading && <p>Loading bookings...</p>}
        {bookingsError && <p className="text-red-600">Error: {bookingsError}</p>}
        {!bookingsLoading && !bookingsError && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pickup Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Drop Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((booking) => (
                  <tr key={booking.parcel_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.parcel_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.user_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.pickup_location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.drop_location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.deliverytype}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.created_at).toLocaleString()}
                    </td>
                    
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
