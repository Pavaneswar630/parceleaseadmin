import React, { useEffect, useState } from 'react';
import { CreditCard } from 'lucide-react';

interface Payment {
  id: number;
  user_id: number;
  parcel_id: string | null;
  amount: number;
  payment_method: string;
  payment_status: 'Pending' | 'Confirmed' | 'Failed' | null;
  transaction_id: string;
  created_at: string;
}

function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch('http://localhost:4000/api/payments'); // Adjust your API URL if needed
        if (!res.ok) {
          throw new Error(`Failed to fetch payments: ${res.statusText}`);
        }
        const data: Payment[] = await res.json();

        // Convert amount string to number if needed (some APIs send amount as string)
        const parsedData = data.map(payment => ({
          ...payment,
          amount: typeof payment.amount === 'string' ? parseFloat(payment.amount) : payment.amount,
          parcel_id: payment.parcel_id ?? null,
          payment_status: payment.payment_status ?? 'Pending',
        }));

        setPayments(parsedData);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Payments & Transactions</h1>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white p-10 rounded-lg shadow-custom flex flex-col items-center justify-center text-center">
          <CreditCard size={48} className="text-primary-300 mb-4" />
          <h2 className="text-xl font-semibold text-text-primary mb-2">No Payments Found</h2>
          <p className="text-text-secondary max-w-md mb-6">
            No payment transactions are available at the moment.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-custom">
          <table className="w-full table-auto border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">User ID</th>
                <th className="border border-gray-300 px-4 py-2">Parcel ID</th>
                <th className="border border-gray-300 px-4 py-2">Amount (rupees)</th>
                <th className="border border-gray-300 px-4 py-2">Payment Method</th>
                <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{payment.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.user_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.parcel_id ?? 'N/A'}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.amount.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.payment_method}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.payment_status ?? 'Pending'}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.transaction_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(payment.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Payments;
