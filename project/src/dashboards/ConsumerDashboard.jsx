import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import ConsumerHome from "./consumer/ConsumerHome";
import { ShoppingCart, Package, LifeBuoy, User, Home } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";

const ConsumerDashboard = ({ previewMode = false }) => {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const sidebarLinks = [
    { name: "Home", path: "home", icon: Home },
    {
      name: `Cart ${itemCount > 0 ? `(${itemCount})` : ""}`,
      path: "cart",
      icon: ShoppingCart,
    },
    { name: "Order History", path: "order-history", icon: Package },
    { name: "Support", path: "support", icon: LifeBuoy },
    { name: "Profile", path: "profile", icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-dark-200 text-light-100 font-body overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-300/80 backdrop-blur-xl border-r border-dark-400 hidden md:flex flex-col">
        <div className="p-6 border-b border-dark-400">
          <h3 className="text-xl font-heading font-bold text-primary">
            Consumer
          </h3>
          <p className="text-xs text-light-400 truncate">
            {user?.email || "consumer@supply.com"}
          </p>
        </div>

        <nav className="p-3 flex-1 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-primary/20 text-primary font-semibold"
                    : "text-light-300 hover:bg-dark-400 hover:text-primary-light"
                }`
              }
            >
              <link.icon size={18} />
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-dark-400 text-center text-xs text-light-500">
          SupplySphere • Consumer
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <div className="md:hidden w-full bg-dark-300/80 backdrop-blur-xl border-b border-dark-400">
        <div className="flex items-center justify-between p-3">
          <div>
            <h3 className="text-lg font-heading font-bold text-primary">
              Consumer
            </h3>
            <p className="text-xs text-light-400 truncate">
              {user?.email || "consumer@supply.com"}
            </p>
          </div>
          <span className="text-sm text-light-300 capitalize">
            {location.pathname.split("/").pop()}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="My Orders"
            value="15"
            icon={Package}
            change="+3 this month"
          />
          <StatCard
            title="Cart Items"
            value={itemCount}
            icon={ShoppingCart}
            change="Updated live"
          />
          <StatCard
            title="Support Tickets"
            value="2"
            icon={LifeBuoy}
            change="1 open"
          />
        </div>

        {/* Subpages */}
        <div className="bg-dark-300/80 backdrop-blur-xl rounded-2xl shadow-card p-6 border border-dark-400">
          {previewMode ? <ConsumerHome /> : <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;
