// src/dashboards/ManufacturerDashboard.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ManufacturerHome from "./manufacturer/ManufacturerHome";
import { Package, BarChart3, ClipboardList, User, Menu, X } from "lucide-react";

const ManufacturerDashboard = ({ previewMode = false }) => {
  const { user, token, products } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- Orders + Metrics ---
  const [pendingOrders, setPendingOrders] = useState(0);
  const [stockValue, setStockValue] = useState(0);

  useEffect(() => {
    // Calculate stock value (sum of price * stock for all products)
    if (products && products.length > 0) {
      const totalValue = products.reduce(
        (sum, p) => sum + (p.price || 0) * (p.stock || 0),
        0
      );
      setStockValue(totalValue);
    }
  }, [products]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          const pending = data.reduce(
  (count, o) => (o.status === "pending" ? count + 1 : count),
  0
);
          setPendingOrders(pending);
        } else {
          console.error(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Orders fetch error:", err);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  const sidebarLinks = [
    { name: "Home", path: "home", icon: BarChart3 },
    { name: "Inventory", path: "inventory", icon: Package },
    { name: "Sales History", path: "sales-history", icon: ClipboardList },
    {name: "Orders" , path: "Orders" , icon:ClipboardList},
    { name: "Profile", path: "profile", icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-dark-200 text-light-100 font-body overflow-hidden">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-72 bg-dark-300 border-r border-dark-400 flex-col shrink-0">
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

      {/* Mobile sidebar (drawer) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer */}
          <div className="relative bg-dark-300 w-64 h-full shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex items-center justify-between p-4 border-b border-dark-400">
              <h3 className="text-lg font-heading font-bold text-primary">
                Manufacturer
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-light-300 hover:text-light-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
              {sidebarLinks.map(({ name, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setSidebarOpen(false)}
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
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full overflow-x-hidden">
        {/* Top nav (mobile) */}
        <div className="md:hidden w-full bg-dark-300 border-b border-dark-400">
          <div className="flex items-center justify-between p-3">
            <div className="min-w-0">
              <h3 className="text-lg font-heading font-bold text-primary">
                Manufacturer
              </h3>
              <p className="text-sm text-light-400 truncate max-w-[200px]">
                {user?.email || "you@company.com"}
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="ml-2 text-light-300 hover:text-light-100"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto w-full overflow-x-hidden">
          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-dark-800 border border-dark-700 p-4 sm:p-6 rounded-2xl shadow-sm">
              <p className="text-sm text-light-500">Total Products</p>
              <h2 className="text-xl sm:text-2xl font-bold text-light-100">
                {products.length}
              </h2>
            </div>
            <div className="bg-dark-800 border border-dark-700 p-4 sm:p-6 rounded-2xl shadow-sm">
              <p className="text-sm text-light-500">Stock Value</p>
              <h2 className="text-xl sm:text-2xl font-bold text-light-100">
                ₹ {stockValue.toLocaleString()}
              </h2>
            </div>
            <div className="bg-dark-800 border border-dark-700 p-4 sm:p-6 rounded-2xl shadow-sm">
              <p className="text-sm text-light-500">Pending Orders</p>
              <h2 className="text-xl sm:text-2xl font-bold text-light-100">
                {pendingOrders}
              </h2>
            </div>
          </div>

          {/* Subpages */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl shadow-card p-4 sm:p-6 w-full overflow-x-hidden">
            {previewMode ? <ManufacturerHome /> : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManufacturerDashboard;
