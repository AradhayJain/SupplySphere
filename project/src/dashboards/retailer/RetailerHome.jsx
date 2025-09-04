import React from "react";

const RetailerHome = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Welcome Back, Retailer!</h1>
        <p className="text-sm text-orange-100">Manage your markets, track sales, and fulfill orders efficiently.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h3 className="font-semibold mb-2">Create Market</h3>
          <p className="text-sm text-gray-500 mb-3">Start a new market and expand your reach.</p>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
            New Market
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h3 className="font-semibold mb-2">Recent Orders</h3>
          <p className="text-sm text-gray-500 mb-3">Check the latest customer orders in your queue.</p>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
            View Orders
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <h3 className="font-semibold mb-2">Sales Reports</h3>
          <p className="text-sm text-gray-500 mb-3">Get insights into your performance and revenue.</p>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
            View Reports
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">This Month's Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <p className="text-sm text-gray-500">Orders</p>
            <h3 className="text-2xl font-bold">98</h3>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <p className="text-sm text-gray-500">Revenue</p>
            <h3 className="text-2xl font-bold">₹ 2,40,000</h3>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <p className="text-sm text-gray-500">New Customers</p>
            <h3 className="text-2xl font-bold">42</h3>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <p className="text-sm text-gray-500">Markets Active</p>
            <h3 className="text-2xl font-bold">5</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerHome;
