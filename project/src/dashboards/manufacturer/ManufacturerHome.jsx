import React from "react";
import { useNavigate } from "react-router-dom";
import { Boxes, ClipboardList, User } from "lucide-react";

const ManufacturerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Manufacturer!</h1>
        <p className="text-sm text-emerald-100">
          Here’s a quick snapshot of your operations today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => navigate("/manufacturer/inventory")}
          className="bg-dark-800 border border-dark-700 p-5 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition"
        >
          <Boxes className="w-6 h-6 text-teal-400 mb-2" />
          <h3 className="font-semibold text-light-100">Manage Inventory</h3>
          <p className="text-sm text-light-500">
            Add, update, and track your products.
          </p>
        </div>
        <div
          onClick={() => navigate("/manufacturer/sales-history")}
          className="bg-dark-800 border border-dark-700 p-5 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition"
        >
          <ClipboardList className="w-6 h-6 text-emerald-400 mb-2" />
          <h3 className="font-semibold text-light-100">Sales History</h3>
          <p className="text-sm text-light-500">
            Review past transactions and revenue.
          </p>
        </div>
        <div
          onClick={() => navigate("/manufacturer/profile")}
          className="bg-dark-800 border border-dark-700 p-5 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition"
        >
          <User className="w-6 h-6 text-teal-400 mb-2" />
          <h3 className="font-semibold text-light-100">Profile</h3>
          <p className="text-sm text-light-500">
            Update your company details and settings.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-800 border border-dark-700 p-5 rounded-2xl shadow-sm">
          <p className="text-sm text-light-500">Products in Catalog</p>
          <h2 className="text-2xl font-bold text-light-100">128</h2>
        </div>
        <div className="bg-dark-800 border border-dark-700 p-5 rounded-2xl shadow-sm">
          <p className="text-sm text-light-500">Orders Pending</p>
          <h2 className="text-2xl font-bold text-light-100">23</h2>
        </div>
        <div className="bg-dark-800 border border-dark-700 p-5 rounded-2xl shadow-sm">
          <p className="text-sm text-light-500">Revenue This Month</p>
          <h2 className="text-2xl font-bold text-light-100">₹ 5,40,000</h2>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-light-100 mb-3">
          Recent Orders
        </h3>
        <div className="overflow-x-auto">
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
              <tr className="border-t border-dark-600 hover:bg-dark-700/40">
                <td className="px-4 py-2 text-light-200">PO-1001</td>
                <td className="px-4 py-2 text-light-200">Retailer A</td>
                <td className="px-4 py-2 text-yellow-400">Pending</td>
                <td className="px-4 py-2 text-light-400">2025-09-01</td>
              </tr>
              <tr className="border-t border-dark-600 hover:bg-dark-700/40">
                <td className="px-4 py-2 text-light-200">PO-1002</td>
                <td className="px-4 py-2 text-light-200">Retailer B</td>
                <td className="px-4 py-2 text-blue-400">Shipped</td>
                <td className="px-4 py-2 text-light-400">2025-09-02</td>
              </tr>
              <tr className="border-t border-dark-600 hover:bg-dark-700/40">
                <td className="px-4 py-2 text-light-200">PO-1003</td>
                <td className="px-4 py-2 text-light-200">Retailer C</td>
                <td className="px-4 py-2 text-green-400">Delivered</td>
                <td className="px-4 py-2 text-light-400">2025-09-03</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-light-100 mb-3">
          Notifications
        </h3>
        <ul className="space-y-2 text-sm text-light-300">
          <li className="border-b border-dark-600 pb-2">
            3 new orders awaiting confirmation
          </li>
          <li className="border-b border-dark-600 pb-2">
            Stock alert: Low on product X
          </li>
          <li>2 shipments are delayed</li>
        </ul>
      </div>
    </div>
  );
};

export default ManufacturerHome;
