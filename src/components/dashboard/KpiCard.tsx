import { ReactNode } from 'react';
import { Info } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  tooltipText?: string;
}

function KpiCard({ title, value, icon, change, tooltipText }: KpiCardProps) {
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition-shadow duration-300 overflow-hidden group">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-text-secondary text-sm font-semibold">{title}</h3>
            {tooltipText && (
              <div className="relative">
                <Info size={16} className="text-gray-400 cursor-help" />
                <div className="absolute left-0 bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {tooltipText}
                </div>
              </div>
            )}
          </div>
          <p className="text-text-primary text-2xl font-bold mt-2">{value}</p>
          
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change.type === 'increase' ? 'text-success' : 'text-error'
            }`}>
              <span>{change.type === 'increase' ? '↑' : '↓'}</span>
              <span className="ml-1">{Math.abs(change.value)}% vs yesterday</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary-50 text-primary-500">
          {icon}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-500 opacity-5 rounded-full"></div>
    </div>
  );
}

export default KpiCard;