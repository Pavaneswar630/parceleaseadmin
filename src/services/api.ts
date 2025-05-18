import pool from './db';

// Types based on your MySQL schema
export interface Branch {
  branch_id: number;
  branch_name: string;
  latitude: number;
  longitude: number;
  created_at: Date;
}

export interface Driver {
  driver_id: number;
  name: string;
  email: string;
  phone: string;
  vehicle_number: string;
  license_number: string;
  status: 'Active' | 'Inactive';
  driver_status: 'Available' | 'Not Available';
  status_: 'Pending' | 'Approved' | 'rejected';
  created_at: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  created_at: Date;
  status: 'pending' | 'active';
}

export interface Parcel {
  parcel_id: string;
  user_id: number;
  pickup_location: string;
  drop_location: string;
  weight: number;
  status: string;
  driver_id: number | null;
  sender_name: string;
  sender_phone: string;
  receiver_name: string;
  receiver_phone: string;
  deliverytype: string;
  package_type: string;
  thing_type: string;
  amount: number;
  vehicle_type: string | null;
  delivery_time: string | null;
  created_at: Date;
}

export interface Payment {
  id: number;
  user_id: number;
  parcel_id: string | null;
  amount: number;
  payment_method: string;
  payment_status: 'Pending' | 'Confirmed' | 'Failed';
  transaction_id: string;
  created_at: Date;
}

export interface SupportRequest {
  id: number;
  user_id: number;
  subject: string;
  message: string;
  response: string | null;
  status: 'Pending' | 'In Progress' | 'Resolved';
  created_at: Date;
}

class ApiService {
  // Branches
  async getBranches(): Promise<Branch[]> {
    const [rows] = await pool.query('SELECT * FROM branches');
    return rows as Branch[];
  }

  // Drivers
  async getDrivers(): Promise<Driver[]> {
    const [rows] = await pool.query('SELECT * FROM drivers');
    return rows as Driver[];
  }

  // Users
  async getUsers(): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows as User[];
  }

  // Parcels
  async getParcels(): Promise<Parcel[]> {
    const [rows] = await pool.query('SELECT * FROM parcels');
    return rows as Parcel[];
  }

  async getParcelById(id: string): Promise<Parcel | null> {
    const [rows] = await pool.query('SELECT * FROM parcels WHERE parcel_id = ?', [id]);
    const parcels = rows as Parcel[];
    return parcels[0] || null;
  }

  // Payments
  async getPayments(): Promise<Payment[]> {
    const [rows] = await pool.query('SELECT * FROM payments');
    return rows as Payment[];
  }

  // Support Requests
  async getSupportRequests(): Promise<SupportRequest[]> {
    const [rows] = await pool.query('SELECT * FROM support_requests');
    return rows as SupportRequest[];
  }

  // FAQs
  async getFaqs() {
    const [rows] = await pool.query('SELECT * FROM faqs');
    return rows;
  }

  // Tracking
  async getTracking(parcelId: string) {
    const [rows] = await pool.query('SELECT * FROM tracking WHERE parcel_id = ?', [parcelId]);
    return rows;
  }
}

export const apiService = new ApiService();