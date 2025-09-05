// src/dashboards/ManufacturerDashboard.jsx
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ManufacturerHome from "./manufacturer/ManufacturerHome";
import { Package, BarChart3, ClipboardList, User } from "lucide-react";

const ManufacturerDashboard = ({ previewMode = false }) => {
  const { user } = useAuth();
  const location = useLocation();

  const sidebarLinks = [
    { name: "Home", path: "home", icon: BarChart3 },
    { name: "Inventory", path: "inventory", icon: Package },
    { name: "Sales History", path: "sales-history", icon: ClipboardList },
    { name: "Profile", path: "profile", icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-dark-200 text-light-100 font-body overflow-hidden">
      {/* Sidebar (desktop only) */}
      <aside className="w-72 bg-dark-300 border-r border-dark-400 hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-dark-400">
          <h3 className="text-xl font-heading font-bold text-primary">
            Manufacturer
          </h3>
          <p className="text-sm text-light-400 truncate max-w-full">
            {user?.email || "you@company.com"}
          </p>
        </div>

        <nav className="p-4 flex-1 space-y-1">
          {sidebarLinks.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary-dark text-white font-semibold"
                    : "text-light-300 hover:bg-dark-400 hover:text-primary-light"
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-dark-400">
          <small className="text-xs text-light-500 block truncate">
            SupplySphere • Manufacturer
          </small>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden w-full bg-dark-300 border-b border-dark-400">
        <div className="flex items-center justify-between p-3 overflow-hidden">
          <div className="min-w-0">
            <h3 className="text-lg font-heading font-bold text-primary">
              Manufacturer
            </h3>
            <p className="text-sm text-light-400 truncate max-w-[200px]">
              {user?.email || "you@company.com"}
            </p>
          </div>
          <div className="ml-2 flex-shrink-0">
            <span className="text-sm text-light-300 truncate">
              {location.pathname.split("/").pop()}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm overflow-hidden">
            <p className="text-sm text-light-500">Total Products</p>
            <h2 className="text-2xl font-bold text-light-100">128</h2>
          </div>
          <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm overflow-hidden">
            <p className="text-sm text-light-500">Stock Value</p>
            <h2 className="text-2xl font-bold text-light-100">₹ 1,250,000</h2>
          </div>
          <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm overflow-hidden">
            <p className="text-sm text-light-500">Pending Orders</p>
            <h2 className="text-2xl font-bold text-light-100">23</h2>
          </div>
        </div>

        {/* Subpages */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl shadow-card p-6 overflow-hidden">
          {previewMode ? <ManufacturerHome /> : <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default ManufacturerDashboard;
