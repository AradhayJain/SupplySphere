import React from "react";
import { useCart } from "../../contexts/CartContext";
import { Trash2 } from "lucide-react";

const ConsumerCart = () => {
  const { cartItems, updateQuantity, removeFromCart, total } = useCart();

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
              className="flex items-center justify-between bg-dark-300/80 border border-dark-400 p-5 rounded-xl"
            >
              {/* Product Info */}
              <div>
                <h3 className="font-semibold text-light-100">{item.name}</h3>
                <p className="text-sm text-light-400">₹{item.price}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-full bg-dark-400 text-light-200 hover:bg-primary hover:text-white"
                >
                  -
                </button>
                <span className="font-semibold text-light-100">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-full bg-dark-400 text-light-200 hover:bg-primary hover:text-white"
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
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="bg-dark-300/80 border border-dark-400 p-5 rounded-xl flex justify-between items-center">
            <h3 className="font-bold text-light-100">Total</h3>
            <p className="text-lg font-bold text-primary">₹{total}</p>
          </div>

          {/* Checkout */}
          <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsumerCart;
