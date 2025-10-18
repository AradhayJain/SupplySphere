import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, Users, BarChart, Settings, Truck } from 'lucide-react';

const Sidebar = () => {
  const userRole = localStorage.getItem('supply_user_role');

  const getNavLinks = () => {
    const baseLinks = [{ name: 'Overview', href: '/dashboard', icon: Home }];

    switch (userRole) {
      case 'Manufacturer':
        return [
          ...baseLinks,
          { name: 'Products', href: '/dashboard/products', icon: Package },
          { name: 'Orders', href: '/dashboard/orders', icon: BarChart },
        ];
      case 'Retailer':
        return [
          ...baseLinks,
          { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
          { name: 'Purchase Orders', href: '/dashboard/purchase-orders', icon: Users },
        ];
      case 'Consumer':
        return [...baseLinks, { name: 'My Orders', href: '/dashboard/my-orders', icon: Package }];
      case 'Logistics':
        return [...baseLinks, { name: 'Shipments', href: '/dashboard/shipments', icon: Truck }];
      default:
        return baseLinks;
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside className="w-64 bg-dark-200 border-r border-dark-300 flex-col hidden md:flex">
      {/* Logo / Header */}
      <div className="h-16 flex items-center justify-center border-b border-dark-300">
        <h1 className="text-2xl font-bold flex items-center gap-x-2 bg-gradient-primary bg-clip-text text-transparent">
          <Truck className="text-primary" />
          SupplySphere
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            end={link.href === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-primary text-white shadow-card'
                  : 'text-light-300 hover:bg-dark-300 hover:text-light-100'
              }`
            }
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Settings Link */}
      <div className="px-4 py-6 border-t border-dark-300">
        <NavLink
          to="/dashboard/settings"
          className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-light-300 hover:bg-dark-300 hover:text-light-100 transition-colors"
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
