import { useEffect, useState } from "react";
import { BookOpen, MoreVertical, Trash2 } from "lucide-react";

type SupportTicket = {
  id: number;
  user_id: number;
  subject: string;
  message: string;
  response: string;
  status: string;
  created_at: string;
};

function SupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpenId, setDropdownOpenId] = useState<number | null>(null);

  const fetchTickets = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/support-tickets");
      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:4000/api/support-tickets/${id}`, {
        method: "DELETE",
      });
      setTickets(prev => prev.filter(ticket => ticket.id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Support Tickets</h1>
      </div>

      {loading ? (
        <p className="text-center text-sm text-gray-600">Loading support tickets...</p>
      ) : tickets.length === 0 ? (
        <div className="bg-white p-10 rounded-lg shadow flex flex-col items-center justify-center text-center">
          <BookOpen size={48} className="text-blue-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Support Tickets</h2>
          <p className="text-gray-500 max-w-md mb-4">
            There are currently no support tickets available.
          </p>
        </div>
      ) : (
        <div className="overflow-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Response</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 relative">
                  <td className="px-4 py-3">{ticket.id}</td>
                  <td className="px-4 py-3">{ticket.user_id}</td>
                  <td className="px-4 py-3">{ticket.subject}</td>
                  <td className="px-4 py-3 max-w-sm truncate">{ticket.message}</td>
                  <td className="px-4 py-3 max-w-sm truncate">{ticket.response || '-'}</td>
                  <td className="px-4 py-3 capitalize">{ticket.status}</td>
                  <td className="px-4 py-3">{ticket.created_at}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() =>
                        setDropdownOpenId(dropdownOpenId === ticket.id ? null : ticket.id)
                      }
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {dropdownOpenId === ticket.id && (
                      <div className="absolute right-4 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10">
                        <button
                          onClick={() => handleDelete(ticket.id)}
                          className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SupportTickets;
