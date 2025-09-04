import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const ConsumerCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product A", price: 1200, quantity: 2 },
    { id: 2, name: "Product B", price: 800, quantity: 1 },
    { id: 3, name: "Product C", price: 500, quantity: 3 },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-light-100">🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-light-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-dark-300/80 backdrop-blur-lg border border-dark-400 p-5 rounded-xl shadow-card"
            >
              {/* Product Info */}
              <div>
                <h3 className="font-semibold text-light-100">{item.name}</h3>
                <p className="text-sm text-light-400">₹{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-400 text-light-200 hover:bg-primary hover:text-white transition"
                >
                  -
                </button>
                <span className="font-semibold text-light-100">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-400 text-light-200 hover:bg-primary hover:text-white transition"
                >
                  +
                </button>
              </div>

              {/* Price + Remove */}
              <div className="flex items-center space-x-4">
                <p className="font-semibold text-light-100">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="bg-dark-300/80 backdrop-blur-lg border border-dark-400 p-5 rounded-xl flex justify-between items-center">
            <h3 className="font-bold text-light-100">Total</h3>
            <p className="text-lg font-bold text-primary">₹{total}</p>
          </div>

          {/* Checkout */}
          <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition shadow-md">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsumerCart;
