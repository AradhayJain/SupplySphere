import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Boxes, ClipboardList, User, ShoppingCart } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const ManufacturerHome = () => {
  const navigate = useNavigate();
  const { user, token, products } = useAuth();

  // Orders & metrics state
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    console.log(products)
  },[])

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setOrders(data || []);

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
    <div className="space-y-8 w-full max-w-full overflow-x-hidden bg-gray-950 min-h-screen p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.companyName || "Manufacturer"}!
        </h1>
        <p className="text-emerald-100 text-base">
          Here’s a quick snapshot of your operations today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Boxes className="w-6 h-6 text-teal-400 mb-2" />,
            title: "Manage Inventory",
            desc: "Add, update, and track your products.",
            path: "/dashboard/manufacturer/inventory",
          },
          {
            icon: <ClipboardList className="w-6 h-6 text-emerald-400 mb-2" />,
            title: "Sales History",
            desc: "Review past transactions and revenue.",
            path: "/dashboard/manufacturer/sales-history",
          },
          {
            icon: <User className="w-6 h-6 text-teal-400 mb-2" />,
            title: "Profile",
            desc: "Update your company details and settings.",
            path: "/dashboard/manufacturer/profile",
          },
        ].map((action, idx) => (
          <div
            key={idx}
            onClick={() => navigate(action.path)}
            className="bg-gray-900 border border-gray-800 p-5 rounded-2xl cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-transform"
          >
            {action.icon}
            <h3 className="font-semibold text-white">{action.title}</h3>
            <p className="text-sm text-gray-400">{action.desc}</p>
          </div>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-400">Products in Catalog</p>
          <h2 className="text-2xl font-bold text-white">{products.length}</h2>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-400">Orders Pending</p>
          <h2 className="text-2xl font-bold text-white">
            {loading ? "..." : pendingOrders}
          </h2>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-400">Revenue This Month</p>
          <h2 className="text-2xl font-bold text-white">
            {loading ? "..." : `₹ ${monthlyRevenue.toLocaleString()}`}
          </h2>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-sm p-5 overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Orders
        </h3>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-gray-300">
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
                <td colSpan="4" className="text-center py-3 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.slice(0, 3).map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-800 hover:bg-gray-800/50"
                >
                  <td className="px-4 py-2 text-gray-200">{order._id}</td>
                  <td className="px-4 py-2 text-gray-200">
                    {order.buyerId || "Unknown"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "Pending"
                          ? "bg-yellow-400/20 text-yellow-300"
                          : order.status === "Shipped"
                          ? "bg-blue-400/20 text-blue-300"
                          : "bg-green-400/20 text-green-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-400">
                    {new Date(order.createdAt).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3 text-gray-400">
                  No recent orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Products Showcase */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-white mb-4">
          Your Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.slice(0, 3).map((p) => (
              <div
                key={p._id}
                className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:shadow-lg hover:scale-[1.02] transition"
              >
                <img
                  src={p.images[0] || "https://via.placeholder.com/150"}
                  alt={p.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="text-white font-semibold truncate">{p.name}</h4>
                <p className="text-gray-400 text-sm">{p.category}</p>
                <p className="text-emerald-400 font-bold mt-1">
                  ₹ {p.price.toLocaleString()}
                </p>
                <button className="mt-3 w-full bg-emerald-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-600 transition">
                  <ShoppingCart size={16} /> Buy Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No products yet</p>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-white mb-3">
          Notifications
        </h3>
        <ul className="space-y-2 text-sm text-gray-300">
          {pendingOrders > 0 && (
            <li className="border-b border-gray-800 pb-2">
              {pendingOrders} new orders awaiting confirmation
            </li>
          )}
          {products.some((p) => p.stock < 10) && (
            <li className="border-b border-gray-800 pb-2">
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
