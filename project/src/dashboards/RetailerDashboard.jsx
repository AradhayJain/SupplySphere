import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RetailerHome from "./retailer/RetailerHome"; // import home page

const RetailerDashboard = ({ previewMode = false }) => {
  const { user } = useAuth();
  const location = useLocation();

  const sidebarLinks = [
    { name: "Home", path: "home" },
    { name: "Order History", path: "order-history" },
    { name: "Create Market", path: "create-market" },
    { name: "Sales History", path: "sales-history" },
    { name: "Profile", path: "profile" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r hidden md:block">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">Retailer</h3>
          <p className="text-sm text-gray-500">{user?.email || "retailer@supply.com"}</p>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                  isActive ? "bg-orange-500 text-white font-semibold" : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <small className="text-xs text-gray-400">SupplySphere • Retailer</small>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden w-full bg-white border-b">
        <div className="flex items-center justify-between p-3">
          <div>
            <h3 className="text-lg font-bold">Retailer</h3>
            <p className="text-sm text-gray-500">{user?.email || "retailer@supply.com"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">{location.pathname.split("/").pop()}</span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-1 p-6">
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-2xl font-bold">342</h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold">₹ 8,75,000</h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Markets Created</p>
            <h2 className="text-2xl font-bold">12</h2>
          </div>
        </div>

        {/* Subpages */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {previewMode ? <RetailerHome /> : <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default RetailerDashboard;
