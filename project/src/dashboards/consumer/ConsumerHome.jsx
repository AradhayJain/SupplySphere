import React from "react";
import { ShoppingCart, Package, HeadphonesIcon } from "lucide-react";

const ConsumerHome = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Welcome back, Consumer!</h1>
        <p className="text-sm mt-2 opacity-90">
          Track your orders, manage your cart, and get support easily.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition transform cursor-pointer">
          <ShoppingCart className="w-6 h-6 text-teal-400 mb-3" />
          <h3 className="font-semibold text-light-100">Go to Cart</h3>
          <p className="text-sm text-light-500 mt-1">
            View and manage your cart items.
          </p>
        </div>
        <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition transform cursor-pointer">
          <Package className="w-6 h-6 text-emerald-400 mb-3" />
          <h3 className="font-semibold text-light-100">Check Orders</h3>
          <p className="text-sm text-light-500 mt-1">
            See your order history and status.
          </p>
        </div>
        <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition transform cursor-pointer">
          <HeadphonesIcon className="w-6 h-6 text-teal-400 mb-3" />
          <h3 className="font-semibold text-light-100">Support</h3>
          <p className="text-sm text-light-500 mt-1">
            Contact support for help with issues.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-light-100 mb-4">
          Recent Highlights
        </h2>
        <ul className="space-y-4">
          <li className="pb-3 border-b border-dark-600">
            <p className="font-medium text-light-200">
              Order #1234 delivered
            </p>
            <span className="text-sm text-light-500">2 days ago</span>
          </li>
          <li className="pb-3 border-b border-dark-600">
            <p className="font-medium text-light-200">
              New promotional offers available
            </p>
            <span className="text-sm text-light-500">5 days ago</span>
          </li>
          <li>
            <p className="font-medium text-light-200">
              Support ticket resolved
            </p>
            <span className="text-sm text-light-500">1 week ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConsumerHome;
