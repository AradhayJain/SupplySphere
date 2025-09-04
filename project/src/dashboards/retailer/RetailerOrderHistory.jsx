import React from "react";

const RetailerOrderHistory = () => {
  const orders = [
    { id: "ORD123", customer: "Amit Sharma", date: "2025-09-01", amount: 4500, status: "Completed" },
    { id: "ORD124", customer: "Neha Verma", date: "2025-09-02", amount: 8200, status: "Pending" },
    { id: "ORD125", customer: "Ravi Kumar", date: "2025-09-03", amount: 12000, status: "Cancelled" },
    { id: "ORD126", customer: "Priya Singh", date: "2025-09-04", amount: 7600, status: "Completed" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order History</h1>
      <p className="text-gray-500">View and manage all customer orders.</p>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Order ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Customer</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{order.id}</td>
                <td className="px-4 py-3 text-sm">{order.customer}</td>
                <td className="px-4 py-3 text-sm">{order.date}</td>
                <td className="px-4 py-3 text-sm">₹ {order.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
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

export default RetailerOrderHistory;
