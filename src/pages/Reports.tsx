import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Package, DollarSign, Truck, LifeBuoy, BarChart, Loader2, MessageCircleQuestion
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// KPI structure
interface KPI {
  title: string;
  value: string;
  icon: string;
  tooltipText: string;
}

interface RevenueDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

interface RevenueResponse {
  labels: string[];
  datasets: RevenueDataset[];
}

interface Faq {
  id: number;
  question: string;
  answer: string;
  created_at: string;
}

function Reports() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [revenue, setRevenue] = useState<RevenueResponse | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [kpiRes, revenueRes, faqRes] = await Promise.all([
          axios.get('http://localhost:4000/api/dashboard/kpis'),
          axios.get('http://localhost:4000/api/dashboard/revenue'),
          axios.get('http://localhost:4000/api/faqs'),
        ]);
        setKpis(kpiRes.data);
        setRevenue(revenueRes.data);
        setFaqs(faqRes.data);
      } catch (error) {
        console.error('Error loading reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const iconMap: Record<string, JSX.Element> = {
    Package: <Package className="text-blue-600" />,
    DollarSign: <DollarSign className="text-green-600" />,
    Truck: <Truck className="text-yellow-600" />,
    LifeBuoy: <LifeBuoy className="text-red-600" />,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Reports & Analytics</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-primary-500" size={32} />
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.title} className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gray-100">{iconMap[kpi.icon]}</div>
                <div>
                  <div className="text-sm text-gray-500">{kpi.title}</div>
                  <div className="text-xl font-bold text-text-primary">{kpi.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Weekly Revenue Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenue?.labels.map((label, i) => ({
                name: label,
                thisWeek: revenue?.datasets[0].data[i],
                lastWeek: revenue?.datasets[1].data[i],
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="thisWeek" stroke="#0066FF" name="This Week" />
                <Line type="monotone" dataKey="lastWeek" stroke="#d4dbe6" name="Last Week" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* FAQs Table */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
            {faqs.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <MessageCircleQuestion size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-600">No FAQs available.</p>
              </div>
            ) : (
              <table className="w-full table-auto border-collapse text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Question</th>
                    <th className="px-4 py-2 border">Answer</th>
                    <th className="px-4 py-2 border">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq) => (
                    <tr key={faq.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{faq.id}</td>
                      <td className="px-4 py-2 border">{faq.question}</td>
                      <td className="px-4 py-2 border">{faq.answer}</td>
                      <td className="px-4 py-2 border">{new Date(faq.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
