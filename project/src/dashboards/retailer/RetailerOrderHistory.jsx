import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const {token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try { 
        const res = await fetch("http://localhost:3000/api/retailOrders/retailer", {
          headers: { Authorization: `Bearer ${token}`},
        });
        const data = await res.json(); 
        if (res.ok) setOrders(data);     
      } catch (err) { 
        console.error("Error fetching orders:", err);  
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded shadow">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <ul className="ml-4 mt-2 list-disc">
                {order.products.map((item) => (
                  <li key={item._id}>
                    {item.productId?.name} × {item.quantity} @ ₹{item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerOrders;
