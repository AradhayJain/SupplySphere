import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // retailer or customer
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // manufacturer or retailer
  
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number
      }
    ],
  
    totalAmount: { type: Number, required: true },
    discountApplied: { type: Number, default: 0 },
    
    status: { 
      type: String, 
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled", "returned"], 
      default: "pending" 
    },
  
    paymentMethod: { type: String, enum: ["razorpay", "cod"], default: "razorpay" },
    paymentStatus: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
  
    deliveryMethod: { type: String, enum: ["pickup", "home-delivery"], default: "home-delivery" },
  
    createdAt: { type: Date, default: Date.now }
  });
  
const Order = mongoose.model("Order", orderSchema);
  