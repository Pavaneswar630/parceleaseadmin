import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

// Create MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',   // Update this
  database: 'parcelease',    // Update this
});

// Define your row types extending RowDataPacket
interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface FaqRow extends RowDataPacket {
  id: number;
  question: string;
  answer: string;
  created_at: string;
}

interface TicketRow extends RowDataPacket {
  id: number;
  subject: string;
  status: string;
  created_at: string;
}

interface PaymentRow extends RowDataPacket {
  id: number;
  parcel_id: number;
  amount: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

interface TotalUsersRow extends RowDataPacket {
  totalUsers: number;
}

interface TotalRevenueRow extends RowDataPacket {
  totalRevenue: number | null;
}

interface OpenTicketsRow extends RowDataPacket {
  openTickets: number;
}

async function fetchDashboardData() {
  try {
    const [usersData] = await db.query<UserRow[]>(`
      SELECT id, name, email, phone, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 10
    `);

    const [faqsData] = await db.query<FaqRow[]>(`
      SELECT id, question, answer, created_at
      FROM faqs
      ORDER BY created_at DESC
      LIMIT 5
    `);

    const [ticketsData] = await db.query<TicketRow[]>(`
      SELECT id, subject, status, created_at
      FROM support_requests
      ORDER BY created_at DESC
      LIMIT 8
    `);

    const [paymentsData] = await db.query<PaymentRow[]>(`
      SELECT id, parcel_id, amount, payment_method, payment_status, created_at
      FROM payments
      ORDER BY created_at DESC
      LIMIT 12
    `);

    const [totalUsersResult] = await db.query<TotalUsersRow[]>(`
      SELECT COUNT(*) AS totalUsers FROM users
    `);
    const totalUsers = totalUsersResult[0]?.totalUsers ?? 0;

    const [totalRevenueResult] = await db.query<TotalRevenueRow[]>(`
      SELECT SUM(amount) AS totalRevenue FROM payments
    `);
    const totalRevenue = totalRevenueResult[0]?.totalRevenue ?? 0;

    const [openTicketsResult] = await db.query<OpenTicketsRow[]>(`
      SELECT COUNT(*) AS openTickets FROM support_requests WHERE status != 'Resolved'
    `);
    const openTickets = openTicketsResult[0]?.openTickets ?? 0;

    const dashboardData = {
      kpis: {
        totalUsers,
        totalRevenue,
        openTickets,
      },
      usersData,
      faqsData,
      ticketsData,
      paymentsData,
    };

    console.log(JSON.stringify(dashboardData, null, 2));
    return dashboardData;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    process.exit(1);
  }
}

fetchDashboardData();
