// Basic placeholder for now
import { Truck } from 'lucide-react';

function Vehicles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Vehicles Management</h1>
      </div>
      
      <div className="bg-white p-10 rounded-lg shadow-custom flex flex-col items-center justify-center text-center">
        <Truck size={48} className="text-primary-300 mb-4" />
        <h2 className="text-xl font-semibold text-text-primary mb-2">Vehicles Fleet Management</h2>
        <p className="text-text-secondary max-w-md mb-6">
          This section allows you to manage your delivery fleet, track vehicle status, assign drivers, and monitor maintenance schedules.
        </p>
        <p className="text-sm text-primary-600">
          The complete implementation will be coming soon!
        </p>
      </div>
    </div>
  );
}

export default Vehicles;