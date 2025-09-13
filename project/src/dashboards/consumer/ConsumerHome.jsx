// src/dashboards/consumer/ConsumerHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import {
  ShoppingCart,
  Package,
  HeadphonesIcon,
  Star,
  Home,
} from "lucide-react";

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 7499,
    image:
      "https://images.unsplash.com/photo-1580894908361-96719503329a?w=400&auto=format&fit=crop&q=80",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 11999,
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400&auto=format&fit=crop&q=80",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&auto=format&fit=crop&q=80",
    rating: 4.7,
  },
];

const ConsumerHome = () => {
  const { cartItems, addToCart, itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-8 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Consumer!</h1>
          <p className="text-sm mt-2 opacity-90">
            Discover products, manage your cart, and track your orders easily.
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 bg-white text-teal-600 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <Home size={18} /> Back to Landing
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/dashboard/consumer/cart")}
          className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition transform cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6 text-teal-400 mb-3" />
          <h3 className="font-semibold text-light-100">Go to Cart</h3>
          <p className="text-sm text-light-500 mt-1">
            View and manage your cart items ({itemCount} items).
          </p>
        </div>
        <div
          onClick={() => navigate("/dashboard/consumer/order-history")}
          className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition transform cursor-pointer"
        >
          <Package className="w-6 h-6 text-emerald-400 mb-3" />
          <h3 className="font-semibold text-light-100">Check Orders</h3>
          <p className="text-sm text-light-500 mt-1">
            See your order history and status.
          </p>
        </div>
        <div
          onClick={() => navigate("/dashboard/consumer/support")}
          className="bg-dark-800 border border-dark-700 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition transform cursor-pointer"
        >
          <HeadphonesIcon className="w-6 h-6 text-teal-400 mb-3" />
          <h3 className="font-semibold text-light-100">Support</h3>
          <p className="text-sm text-light-500 mt-1">
            Contact support for help with issues.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <h2 className="text-2xl font-bold text-light-100 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-dark-800 border border-dark-700 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition transform overflow-hidden flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-light-100 mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  ))}
                  <span className="text-xs text-light-400 ml-1">
                    {product.rating}
                  </span>
                </div>
                <p className="text-lg font-bold text-primary mb-3">
                  {formatter.format(product.price)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerHome;
