import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, MessageCircleQuestion } from 'lucide-react';

// ✅ Define the FAQ type
interface Faq {
  id: number;
  question: string;
  answer: string;
  created_at: string;
}

function Reports() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Faq[]>('http://localhost:4000/api/faqs')
      .then((res) => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch FAQs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Reports / FAQs</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-primary-500" size={32} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-custom">
          {faqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <MessageCircleQuestion size={48} className="text-gray-400 mb-4" />
              <p className="text-gray-600">No FAQs available.</p>
            </div>
          ) : (
            <table className="w-full table-auto text-left border-collapse">
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
      )}
    </div>
  );
}

export default Reports;
