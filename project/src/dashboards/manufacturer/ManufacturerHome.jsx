import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Boxes, ClipboardList, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const ManufacturerHome = () => {
  const navigate = useNavigate();
  const { user, token, products } = useAuth();

  // Orders & metrics state
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setOrders(data.orders || []);

          // Calculate metrics
          const pending = data.orders.filter(
            (o) => o.status === "Pending"
          ).length;
          const currentMonth = new Date().getMonth();
          const revenue = data.orders
            .filter((o) => new Date(o.createdAt).getMonth() === currentMonth)
            .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

          setPendingOrders(pending);
          setMonthlyRevenue(revenue);
        } else {
          console.error(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Orders fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-5 sm:p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
          Welcome back, {user?.companyName || "Manufacturer"}!
        </h1>
        <p className="text-sm sm:text-base text-emerald-100">
          Here’s a quick snapshot of your operations today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <div
          onClick={() => navigate("/dashboard/manufacturer/inventory")}
          className="bg-dark-800 border border-dark-700 p-4 sm:p-5 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition max-w-full"
        >
          <Boxes className="w-6 h-6 text-teal-400 mb-2" />
          <h3 className="font-semibold text-light-100 truncate">
            Manage Inventory
          </h3>
          <p className="text-sm text-light-500">
            Add, update, and track your products.
          </p>
        </div>
        <div
          onClick={() => navigate("/dashboard/manufacturer/sales-history")}
          className="bg-dark-800 border border-dark-700 p-4 sm:p-5 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition max-w-full"
        >
          <ClipboardList className="w-6 h-6 text-emerald-400 mb-2" />
          <h3 className="font-semibold text-light-100 truncate">
            Sales History
          </h3>
          <p className="text-sm text-light-500">
            Review past transactions and revenue.
          </p>
        </div>
        <div
          onClick={() => navigate("/dashboard/manufacturer/profile")}
          className="bg-dark-800 border border-dark-700 p-4 sm:p-5 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition max-w-full"
        >
          <User className="w-6 h-6 text-teal-400 mb-2" />
          <h3 className="font-semibold text-light-100 truncate">Profile</h3>
          <p className="text-sm text-light-500">
            Update your company details and settings.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <div className="bg-dark-800 border border-dark-700 p-4 sm:p-5 rounded-2xl shadow-sm max-w-full">
          <p className="text-sm text-light-500">Products in Catalog</p>
          <h2 className="text-xl sm:text-2xl font-bold text-light-100">
            {products.length}
          </h2>
        </div>
        <div className="bg-dark-800 border border-dark-700 p-4 sm:p-5 rounded-2xl shadow-sm max-w-full">
          <p className="text-sm text-light-500">Orders Pending</p>
          <h2 className="text-xl sm:text-2xl font-bold text-light-100">
            {loading ? "..." : pendingOrders}
          </h2>
        </div>
        <div className="bg-dark-800 border border-dark-700 p-4 sm:p-5 rounded-2xl shadow-sm max-w-full">
          <p className="text-sm text-light-500">Revenue This Month</p>
          <h2 className="text-xl sm:text-2xl font-bold text-light-100">
            {loading ? "..." : `₹ ${monthlyRevenue.toLocaleString()}`}
          </h2>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl shadow-sm p-4 sm:p-5 w-full overflow-x-auto">
        <h3 className="text-base sm:text-lg font-semibold text-light-100 mb-3">
          Recent Orders
        </h3>
        <table className="min-w-full text-sm">
          <thead className="bg-dark-700 text-light-300">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Buyer</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-3 text-light-400">
                  Loading...
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.slice(0, 3).map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-dark-600 hover:bg-dark-700/40"
                >
                  <td className="px-4 py-2 text-light-200">{order._id}</td>
                  <td className="px-4 py-2 text-light-200">
                    {order.buyer?.name || "Unknown"}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      order.status === "Pending"
                        ? "text-yellow-400"
                        : order.status === "Shipped"
                        ? "text-blue-400"
                        : "text-green-400"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-2 text-light-400">
                    {new Date(order.createdAt).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3 text-light-400">
                  No recent orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Notifications */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl shadow-sm p-4 sm:p-5 w-full max-w-full">
        <h3 className="text-base sm:text-lg font-semibold text-light-100 mb-3">
          Notifications
        </h3>
        <ul className="space-y-2 text-sm text-light-300">
          {pendingOrders > 0 && (
            <li className="border-b border-dark-600 pb-2">
              {pendingOrders} new orders awaiting confirmation
            </li>
          )}
          {products.some((p) => p.stock < 10) && (
            <li className="border-b border-dark-600 pb-2">
              Stock alert: Some products are low on stock
            </li>
          )}
          <li>Keep track of your shipments regularly.</li>
        </ul>
      </div>
    </div>
  );
};

export default ManufacturerHome;
