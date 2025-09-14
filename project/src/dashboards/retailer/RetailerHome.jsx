import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { Package, PlusCircle, ClipboardList, BarChart3, X } from "lucide-react";
import axios from "axios";

// ===================================================================================
// UI Components (Defined in the same file for consolidation)
// ===================================================================================

const ActionCard = ({ title, desc, icon, btn }) => (
  <div className="bg-dark-800/70 backdrop-blur-lg border border-dark-700 p-6 rounded-2xl shadow-lg hover:shadow-primary/30 hover:border-primary transition-all duration-300 flex flex-col">
    <h3 className="font-semibold text-light-100 mb-3 flex items-center gap-3 text-lg">
      {icon} {title}
    </h3>
    <p className="text-sm text-light-400 mb-4 flex-grow">{desc}</p>
    <button className="mt-auto bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform duration-200 w-full">
      {btn}
    </button>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="p-5 border border-dark-600 rounded-xl text-center bg-dark-700/70 hover:border-primary transition-colors">
    <p className="text-sm text-light-400">{label}</p>
    <h3 className="text-3xl font-extrabold text-light-100 mt-1">{value}</h3>
  </div>
);

const ProductCard = ({ product, onBuyNow,boughtPro }) => {
  const hasBought = boughtPro.some((p) => p.productId === product._id);
  return (
  <div className="bg-dark-700/70 border border-dark-600 p-5 rounded-2xl shadow-md hover:shadow-primary/20 hover:border-primary transition-all duration-300 flex flex-col group">
    <div className="w-full h-44 mb-4 rounded-lg overflow-hidden">
      <img
        src={product.images && product.images.length > 0 ? product.images : "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <h3 className="text-lg font-semibold text-light-100 mb-1">{product.name}</h3>
    <p className="text-sm text-light-400 mb-3 line-clamp-2 flex-grow">{product.description}</p>
    <p className="text-2xl font-bold text-primary mb-4">₹ {product.price}</p>
    
{hasBought ? (
  <button
    className="mt-auto bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform duration-200 w-full"
  >
    Bought
  </button>
) : (
  <button
    onClick={() => onBuyNow(product)}
    className="mt-auto bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform duration-200 w-full"
  >
    Buy Now
  </button>
)}
    
  </div>
  )
};


const COUPON_DISCOUNT = 50;

const CheckoutSidebar = ({ isOpen, onClose, product, onSubmit, isSubmitting }) => {
  const [form, setForm] = useState({
    address: "",
    coupon: "",
    quantity:1,
    deliveryMethod: "home-delivery",
    paymentMethod: "razorpay",
  });

  useEffect(() => {
    if (product) {
      setForm({ address: "", coupon: "", quantity:1, deliveryMethod: "home-delivery", paymentMethod: "razorpay" });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const discount = form.coupon ? COUPON_DISCOUNT : 0;
    const totalAmount = product.price - discount;
    console.log(form)
    onSubmit({ ...form, discount, totalAmount });
  };

  const isCouponApplied = form.coupon.length > 0;
  const subtotal = product ? product.price : 0;
  const total = isCouponApplied ? subtotal - COUPON_DISCOUNT : subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-900 shadow-2xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-dark-700 flex-shrink-0">
              <h2 className="text-xl font-bold text-light-100">🛒 Checkout</h2>
              <button onClick={onClose} className="text-light-400 hover:text-white p-1 rounded-full hover:bg-dark-700 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            {product && (
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex items-center gap-4 p-4 bg-dark-800 rounded-xl border border-dark-700">
                  <img src={product.images} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-semibold text-light-100">{product.name}</h3>
                    <p className="text-primary font-bold text-lg">₹ {product.price}</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-light-400 mb-1.5">Shipping Address</label>
                  <textarea id="address" name="address" rows="3" className="form-input w-full text-black" value={form.address} onChange={handleInputChange} placeholder="Enter your shipping address" />
                </div>
                <div>
                  <label htmlFor="coupon" className="block text-sm font-medium text-light-400 mb-1.5">Coupon Code</label>
                  <input id="coupon" type="text" name="coupon" className="form-input w-full text-black" value={form.coupon} onChange={handleInputChange} placeholder="Enter coupon code" />
                </div>
                <div>
                  <label htmlFor="deliveryMethod" className="block text-sm font-medium text-light-400 mb-1.5">Delivery Method</label>
                  <select id="deliveryMethod" name="deliveryMethod" className="form-input w-full text-black" value={form.deliveryMethod} onChange={handleInputChange}>
                    {["home-delivery", "Express", "Same Day"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-light-400 mb-1.5">Payment Method</label>
                  <select id="paymentMethod" name="paymentMethod" className="form-input w-full text-black" value={form.paymentMethod} onChange={handleInputChange}>
                    {["razorpay", "UPI", "Card"].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-light-400 mb-1.5">Quantity</label>
                  <input
                    type="number"
                    name="quantity"   // ✅ add this so handleInputChange works
                    min="1"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))
                    }
                    className="text-black w-full"
                    placeholder="Enter Quantity"
                  />
                </div>
                <div className="bg-dark-800 p-4 rounded-lg border border-dark-700 space-y-2">
                  <div className="flex justify-between text-light-300"><span>Subtotal:</span> <span className="font-medium">₹ {subtotal.toFixed(2)}</span></div>
                  {isCouponApplied && (
                    <div className="flex justify-between text-green-400"><span>Discount:</span> <span>- ₹ {COUPON_DISCOUNT.toFixed(2)}</span></div>
                  )}
                  <div className="border-t border-dark-600 my-2"></div>
                  <div className="flex justify-between text-light-100 text-lg font-bold"><span>Total:</span> <span className="text-primary">₹ {total.toFixed(2)}</span></div>
                </div>
              </form>
            )}
            <div className="p-5 border-t border-dark-700 flex-shrink-0">
              <button type="submit" onClick={handleSubmit} disabled={isSubmitting || !product} className="w-full bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3.5 rounded-xl font-semibold hover:scale-[1.02] active:scale-100 transition-transform duration-200 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                {isSubmitting ? (<div>Processing...</div>) : ("✅ Complete Order")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


// ===================================================================================
// Main Page Component
// ===================================================================================

const RetailerHome = () => {
  const { products, token,allMarkets } = useAuth();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boughtPro,setBoughtPro] = useState([]);

  useEffect(()=>{
    const fetchBought = async () =>{
      const boughtRes = await fetch(
        "http://localhost:3000/api/retail/products/bought",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const boughtData = await boughtRes.json();
      setBoughtPro(boughtData);


    }
    fetchBought();
  },[token])

  // Mock Data (moved inside for better encapsulation)
  const count = allMarkets.filter(m=>m.status==='Active').length
  const quickActions = [
    { title: "Create Market", desc: "Start a new market and expand your reach.", icon: <PlusCircle className="w-6 h-6 text-primary" />, btn: "New Market" },
    { title: "Recent Orders", desc: "Check the latest customer orders in your queue.", icon: <ClipboardList className="w-6 h-6 text-primary" />, btn: "View Orders" },
    { title: "Sales Reports", desc: "Get insights into your performance and revenue.", icon: <BarChart3 className="w-6 h-6 text-primary" />, btn: "View Reports" },
  ];

  const monthOverviewStats = [
    { label: "Orders", value: "98" },
    { label: "Revenue", value: "₹ 2,40,000" },
    { label: "New Customers", value: "42" },
    { label: "Markets Active", value: `${count}` },
  ];

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
    setTimeout(() => setSelectedProduct(null), 300); // Delay for animation
  };

  const handlePlaceOrder = async (orderDetails) => {
    if (!selectedProduct) return;
    setIsSubmitting(true);

    try {
      
      const payload = {
        products: [{ productId: selectedProduct._id, quantity: orderDetails.quantity, price: selectedProduct.price }],
        totalAmount: orderDetails.totalAmount,
        discountApplied: orderDetails.discount,
        paymentMethod: orderDetails.paymentMethod,
        deliveryMethod: orderDetails.deliveryMethod,
        address: orderDetails.address,
      };

      const res = await axios.post("http://localhost:3000/api/orders", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 201) {
        alert(`✅ Order placed for ${selectedProduct.name}!`); // Consider a toast notification library
        setBoughtPro([...boughtPro,res.data])
        // console.log(res.data)
        handleCloseCheckout();
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("❌ Failed to place order. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    
    }
  };

  return (
    <>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-8 rounded-3xl shadow-2xl shadow-primary/20">
          <h1 className="text-3xl font-bold text-white">Welcome Back, Retailer!</h1>
          <p className="text-light-200 mt-2 text-lg">
            Manage your markets, explore manufacturer products, and grow your sales 🚀
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((item, idx) => (
            <ActionCard key={idx} {...item} />
          ))}
        </div>

        {/* Analytics Overview */}
        <div className="bg-dark-800/70 backdrop-blur-lg border border-dark-700 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-light-100 mb-6">📊 This Month's Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {monthOverviewStats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>

        {/* Manufacturer Products */}
        <div className="bg-dark-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-light-100 mb-6 flex items-center gap-3">
            <Package className="w-7 h-7 text-primary" /> Manufacturer Products
          </h2>
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} onBuyNow={handleBuyNow} boughtPro={boughtPro} />
              ))}
            </div>
          ) : (
            <p className="text-light-400 text-center py-8">No products available at the moment.</p>
          )}
        </div>
      </div>

      {/* Checkout Sidebar Component */}
      <CheckoutSidebar
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        product={selectedProduct}
        onSubmit={handlePlaceOrder}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default RetailerHome;