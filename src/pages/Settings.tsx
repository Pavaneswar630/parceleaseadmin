// Basic placeholder for now
import { Settings as SettingsIcon } from 'lucide-react';

function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Admin Settings</h1>
      </div>
      
      <div className="bg-white p-10 rounded-lg shadow-custom flex flex-col items-center justify-center text-center">
        <SettingsIcon size={48} className="text-primary-300 mb-4" />
        <h2 className="text-xl font-semibold text-text-primary mb-2">System Settings</h2>
        <p className="text-text-secondary max-w-md mb-6">
          This section allows you to configure system settings, manage admin users, set up payment gateways, and customize notification templates.
        </p>
        <p className="text-sm text-primary-600">
          The complete implementation will be coming soon!
        </p>
      </div>
    </div>
  );
}

export default Settings;