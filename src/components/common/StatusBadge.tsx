type StatusType = 'pending' | 'in-transit' | 'delivered' | 'cancelled' | 'active' | 'blocked' | 'open' | 'closed' | 'Confirmed' | 'failed';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusConfig = {
    'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
    'in-transit': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Transit' },
    'delivered': { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
    'cancelled': { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
    'active': { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
    'blocked': { bg: 'bg-red-100', text: 'text-red-800', label: 'Blocked' },
    'open': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Open' },
    'closed': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Closed' },
    'Confirmed': { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
    'failed': { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' },
  };

  const config = statusConfig[status];
  
  return (
    <span 
      className={`inline-flex items-center rounded-full ${config.bg} ${config.text} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } font-medium`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.text.replace('text', 'bg')}`}></span>
      {config.label}
    </span>
  );
}

export default StatusBadge;