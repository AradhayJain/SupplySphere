import React, { useEffect, useState } from "react";
import { Loader2, Package, Search } from "lucide-react";

function ManufacturerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setOrders([
        {
          id: "ORD1234",
          retailer: "City Retailers Pvt Ltd",
          date: "2025-09-14",
          status: "pending",
          total: 12500,
        },
        {
          id: "ORD1235",
          retailer: "MegaMart",
          date: "2025-09-12",
          status: "completed",
          total: 7890,
        },
        {
          id: "ORD1236",
          retailer: "QuickShop",
          date: "2025-09-10",
          status: "shipped",
          total: 4500,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const statusColors = {
    pending: "bg-yellow-600 text-yellow-100",
    completed: "bg-green-600 text-green-100",
    shipped: "bg-blue-600 text-blue-100",
    cancelled: "bg-red-600 text-red-100",
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.retailer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Package className="w-6 h-6 text-indigo-400" />
          Manufacturer Orders
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-80">
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
        ) : filteredOrders.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No orders found.</div>
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
                    key={order.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-3 font-medium text-gray-100">
                      {order.id}
                    </td>
                    <td className="px-6 py-3">{order.retailer}</td>
                    <td className="px-6 py-3">{order.date}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-semibold text-gray-200">
                      ₹{order.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManufacturerOrders;
