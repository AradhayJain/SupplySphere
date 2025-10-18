import React from "react";

const ConsumerOrderHistory = () => {
  const orders = [
    {
      id: "ORD1234",
      date: "2025-09-01",
      total: 3200,
      status: "Delivered",
    },
    {
      id: "ORD1235",
      date: "2025-08-25",
      total: 1500,
      status: "Shipped",
    },
    {
      id: "ORD1236",
      date: "2025-08-15",
      total: 2200,
      status: "Cancelled",
    },
  ];

  const statusClasses = {
    Delivered: "bg-emerald-500/20 text-emerald-400",
    Shipped: "bg-yellow-500/20 text-yellow-400",
    Cancelled: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-light-100">Order History</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-dark-700 text-left text-sm text-light-400">
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-dark-700 hover:bg-dark-700/50 transition"
              >
                <td className="p-4 font-medium text-light-200">{order.id}</td>
                <td className="p-4 text-sm text-light-500">{order.date}</td>
                <td className="p-4 font-semibold text-light-100">
                  ₹{order.total}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsumerOrderHistory;
