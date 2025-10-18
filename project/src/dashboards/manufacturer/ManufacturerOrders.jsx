import React, { useEffect, useState } from "react";
import { Loader2, Package, Search, MessageSquare, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function ManufacturerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const { token } = useAuth();

  // --- Support Ticket States ---
  const [tickets, setTickets] = useState([
    { id: 1, subject: "Shipment Delay", status: "Resolved" },
    { id: 2, subject: "Bulk Discount Inquiry", status: "Pending" },
  ]);
  const [newTicket, setNewTicket] = useState("");

  // --- Fetch Orders from API ---
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/orders/retailer", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const statusColors = {
    pending: "bg-yellow-600 text-yellow-100",
    completed: "bg-green-600 text-green-100",
    shipped: "bg-blue-600 text-blue-100",
    cancelled: "bg-red-600 text-red-100",
  };

  const ticketStatus = {
    Resolved: "bg-green-600/20 text-green-400",
    Pending: "bg-yellow-600/20 text-yellow-400",
  };

  const filteredOrders = orders.filter(
    (o) =>
      o._id?.toLowerCase().includes(search.toLowerCase()) ||
      o.buyerId?.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTicket.trim()) return;

    const newEntry = {
      id: tickets.length + 1,
      subject: newTicket,
      status: "Pending",
    };

    setTickets([newEntry, ...tickets]);
    setNewTicket("");
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen text-gray-100 space-y-10">
      {/* ===== Orders Section ===== */}
      <section>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-400" />
            Manufacturer Orders
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by Order ID or Retailer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-100 placeholder-gray-400"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-800 shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center p-8 text-gray-400">
              <Loader2 className="animate-spin w-6 h-6 text-indigo-400" />
              <span className="ml-2">Loading Orders...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center gap-2 text-red-400 p-6">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Order ID</th>
                    <th className="px-6 py-3 text-left">Retailer</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-3 font-medium text-gray-100 break-all">
                        {order._id}
                      </td>
                      <td className="px-6 py-3 break-words">
                        {order.buyerId?.email || "N/A"}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            statusColors[order.status] || "bg-gray-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 font-semibold text-gray-200">
                        ₹{order.totalAmount?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ===== Support Center Section ===== */}
      <section>
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-teal-400" />
          Support Center
        </h2>

        {/* Create new support ticket */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <input
            type="text"
            value={newTicket}
            onChange={(e) => setNewTicket(e.target.value)}
            placeholder="Describe your issue..."
            className="flex-1 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition w-full sm:w-auto"
          >
            Submit
          </button>
        </form>

        {/* Ticket list */}
        <div className="overflow-x-auto bg-gray-800 border border-gray-700 rounded-xl mt-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Ticket ID</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-gray-700 transition-colors">
                  <td className="p-4 font-medium text-gray-100 whitespace-nowrap">#{t.id}</td>
                  <td className="p-4 text-gray-300 break-words">{t.subject}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticketStatus[t.status]
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-400 italic">
                    No tickets yet. Create one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ManufacturerOrders;
