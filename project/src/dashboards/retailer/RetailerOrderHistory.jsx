import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/retailOrders/retailer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [token]);

  // Color coding for status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-600/20 text-green-400";
      case "pending":
        return "bg-yellow-600/20 text-yellow-400";
      case "cancelled":
        return "bg-red-600/20 text-red-400";
      default:
        return "bg-gray-600/20 text-gray-300";
    }
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-gray-200">
      <h2 className="text-2xl font-bold mb-6">📦 My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse bg-slate-800 text-gray-200">
            <thead className="bg-slate-700">
              <tr>
                <th className="p-3 text-left text-sm font-semibold">Order ID</th>
                <th className="p-3 text-left text-sm font-semibold">Status</th>
                <th className="p-3 text-left text-sm font-semibold">Total</th>
                <th className="p-3 text-left text-sm font-semibold">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr
                  key={order._id}
                  className={`${
                    idx % 2 === 0 ? "bg-slate-800" : "bg-slate-850"
                  } hover:bg-slate-700 transition`}
                >
                  <td className="p-3 text-sm">{order._id || "Not Available"}</td>
                  <td className="p-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status || "Not Available"}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    ₹{order.totalAmount ?? "Not Available"}
                  </td>
                  <td className="p-3 text-sm">
                    {order.products?.length > 0 ? (
                      <ul className="list-disc ml-4">
                        {order.products.map((item) => (
                          <li key={item._id}>
                            {item.productId?.name || "Not Available"} ×{" "}
                            {item.quantity ?? "N/A"} @ ₹{item.price ?? "N/A"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "Not Available"
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
};

export default CustomerOrders;
