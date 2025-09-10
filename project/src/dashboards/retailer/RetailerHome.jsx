// src/dashboards/retailer/RetailerHome.jsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Package, PlusCircle, ClipboardList, BarChart3 } from "lucide-react";

const RetailerHome = () => {
  const { products } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-dark to-primary p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-white">Welcome Back, Retailer!</h1>
        <p className="text-sm text-light-200">
          Manage your markets, explore manufacturer products, and grow your sales.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-800 border border-dark-700 p-5 rounded-2xl shadow-card hover:border-primary transition">
          <h3 className="font-semibold text-light-100 mb-2 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-primary" /> Create Market
          </h3>
          <p className="text-sm text-light-400 mb-3">
            Start a new market and expand your reach.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition w-full">
            New Market
          </button>
        </div>
        <div className="bg-dark-800 border border-dark-700 p-5 rounded-2xl shadow-card hover:border-primary transition">
          <h3 className="font-semibold text-light-100 mb-2 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" /> Recent Orders
          </h3>
          <p className="text-sm text-light-400 mb-3">
            Check the latest customer orders in your queue.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition w-full">
            View Orders
          </button>
        </div>
        <div className="bg-dark-800 border border-dark-700 p-5 rounded-2xl shadow-card hover:border-primary transition">
          <h3 className="font-semibold text-light-100 mb-2 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Sales Reports
          </h3>
          <p className="text-sm text-light-400 mb-3">
            Get insights into your performance and revenue.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition w-full">
            View Reports
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-card">
        <h2 className="text-xl font-bold text-light-100 mb-4">
          This Month's Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-dark-600 rounded-lg text-center bg-dark-700">
            <p className="text-sm text-light-400">Orders</p>
            <h3 className="text-2xl font-bold text-light-100">98</h3>
          </div>
          <div className="p-4 border border-dark-600 rounded-lg text-center bg-dark-700">
            <p className="text-sm text-light-400">Revenue</p>
            <h3 className="text-2xl font-bold text-light-100">₹ 2,40,000</h3>
          </div>
          <div className="p-4 border border-dark-600 rounded-lg text-center bg-dark-700">
            <p className="text-sm text-light-400">New Customers</p>
            <h3 className="text-2xl font-bold text-light-100">42</h3>
          </div>
          <div className="p-4 border border-dark-600 rounded-lg text-center bg-dark-700">
            <p className="text-sm text-light-400">Markets Active</p>
            <h3 className="text-2xl font-bold text-light-100">5</h3>
          </div>
        </div>
      </div>

      {/* Manufacturer Products */}
      <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-card">
        <h2 className="text-xl font-bold text-light-100 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" /> Manufacturer Products
        </h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-dark-700 border border-dark-600 p-4 rounded-lg shadow-sm hover:border-primary transition"
              >
                {product.images && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold text-light-100">
                  {product.name}
                </h3>
                <p className="text-sm text-light-400 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-sm text-light-300 font-medium">
                  ₹ {product.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-light-400">No products available yet.</p>
        )}
      </div>
    </div>
  );
};

export default RetailerHome;
