import { faker } from '@faker-js/faker';
import { format, subDays } from 'date-fns';

// Generate consistent data with seeded faker
faker.seed(123);

// Chart data
export const revenueChartData = {
  labels: Array.from({ length: 7 }, (_, i) => 
    format(subDays(new Date(), 6 - i), 'MMM dd')
  ),
  datasets: [
    {
      label: 'This Week',
      data: Array.from({ length: 7 }, () => faker.number.int({ min: 5000, max: 12000 })),
      borderColor: '#0066FF',
      backgroundColor: 'rgba(0, 102, 255, 0.1)',
    },
    {
      label: 'Last Week',
      data: Array.from({ length: 7 }, () => faker.number.int({ min: 4000, max: 10000 })),
      borderColor: '#d4dbe6',
      backgroundColor: 'rgba(212, 219, 230, 0.1)',
    },
  ],
};

export const bookingTypesChartData = {
  labels: ['Express', 'Standard', 'Economy', 'Bulk'],
  datasets: [
    {
      label: 'Booking Types',
      data: [35, 40, 20, 5],
      backgroundColor: ['#0066FF', '#5668a5', '#8294bf', '#d4dbe6'],
      borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      borderWidth: 2,
    },
  ],
};

// KPI data
export const kpiData = [
  {
    title: 'Total Bookings',
    value: '1,243',
    icon: 'Package',
    change: { value: 12.5, type: 'increase' },
    tooltipText: 'Total number of bookings in the last 30 days',
  },
  {
    title: 'Revenue',
    value: '$48,352',
    icon: 'DollarSign',
    change: { value: 8.3, type: 'increase' },
    tooltipText: 'Total revenue generated in the last 30 days',
  },
  {
    title: 'Active Deliveries',
    value: '78',
    icon: 'Truck',
    change: { value: 2.1, type: 'decrease' },
    tooltipText: 'Number of packages currently in transit',
  },
  {
    title: 'Open Tickets',
    value: '12',
    icon: 'LifeBuoy',
    change: { value: 5.4, type: 'decrease' },
    tooltipText: 'Number of unresolved support tickets',
  },
];

// Generate bookings data
export const bookingsData = Array.from({ length: 15 }, (_, i) => ({
  id: `BD${faker.string.numeric(4)}`,
  user: faker.person.fullName(),
  pickup: faker.location.city(),
  drop: faker.location.city(),
  type: faker.helpers.arrayElement(['Express', 'Standard', 'Economy', 'Bulk']),
  date: faker.date.recent({ days: 14 }),
  status: faker.helpers.arrayElement(['pending', 'in-transit', 'delivered', 'cancelled']),
}));

// Generate users data
export const usersData = Array.from({ length: 10 }, (_, i) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  mobile: faker.phone.number(),
  bookingsCount: faker.number.int({ min: 0, max: 30 }),
  status: faker.helpers.arrayElement(['active', 'blocked']),
  joinDate: faker.date.past({ years: 1 }),
}));

// Generate tickets data
export const ticketsData = Array.from({ length: 8 }, (_, i) => ({
  id: `TK${faker.string.numeric(4)}`,
  subject: faker.helpers.arrayElement([
    'Package damaged during transit',
    'Delivery delay issue',
    'Wrong delivery address',
    'Payment refund request',
    'Driver behavior complaint',
    'Package not received',
    'Tracking not updating',
  ]),
  user: faker.person.fullName(),
  status: faker.helpers.arrayElement(['open', 'closed']),
  createdDate: faker.date.recent({ days: 20 }),
  assignedTo: faker.helpers.arrayElement(['John Smith', 'Mary Johnson', 'Unassigned']),
}));

// Generate payment transactions
export const paymentsData = Array.from({ length: 12 }, (_, i) => ({
  id: `TR${faker.string.numeric(6)}`,
  bookingId: `BD${faker.string.numeric(4)}`,
  amount: faker.finance.amount({ min: 50, max: 500, dec: 2, symbol: '$' }),
  method: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer', 'Cash']),
  status: faker.helpers.arrayElement(['success', 'failed', 'pending']),
  date: faker.date.recent({ days: 30 }),
  customer: faker.person.fullName(),
}));

// Generate vehicles data
export const vehiclesData = Array.from({ length: 8 }, (_, i) => ({
  id: `VH${faker.string.numeric(3)}`,
  type: faker.helpers.arrayElement(['Van', 'Truck', 'Bike', 'Car']),
  driver: faker.person.fullName(),
  licenseNumber: faker.vehicle.vrm(),
  status: faker.helpers.arrayElement(['active', 'maintenance', 'inactive']),
  lastLocation: faker.location.city(),
}));