import React from "react";

const ManufacturerHome = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Manufacturer!</h1>
        <p className="text-sm text-red-100">Here’s a quick snapshot of your operations today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Products in Catalog</p>
          <h2 className="text-2xl font-bold">128</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Orders Pending</p>
          <h2 className="text-2xl font-bold">23</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Revenue This Month</p>
          <h2 className="text-2xl font-bold">₹ 5,40,000</h2>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Buyer</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">PO-1001</td>
                <td className="px-4 py-2">Retailer A</td>
                <td className="px-4 py-2 text-yellow-600">Pending</td>
                <td className="px-4 py-2">2025-09-01</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">PO-1002</td>
                <td className="px-4 py-2">Retailer B</td>
                <td className="px-4 py-2 text-blue-600">Shipped</td>
                <td className="px-4 py-2">2025-09-02</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">PO-1003</td>
                <td className="px-4 py-2">Retailer C</td>
                <td className="px-4 py-2 text-green-600">Delivered</td>
                <td className="px-4 py-2">2025-09-03</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-3">Notifications</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="border-b pb-2">3 new orders awaiting confirmation</li>
          <li className="border-b pb-2">Stock alert: Low on product X</li>
          <li className="">2 shipments are delayed</li>
        </ul>
      </div>
    </div>
  );
};

export default ManufacturerHome;
