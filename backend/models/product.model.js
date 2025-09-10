import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    images: [String],
  
    price: { type: Number, required: true },
    minOrderQty: { type: Number, default: 1 },
    pricingTiers: [
      {
        minQty: Number,
        price: Number
      }
    ],
    role: { type: String, enum: ['Consumer', 'Manufacturer','Retailer', 'Logistics'], default: 'Consumer', required: true },
    stock: { type: Number, required: true },
    dynamicPricing: { type: Boolean, default: false },
    isExclusive: { 
        retailerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        type: Boolean, 
        default: false 
    },
    createdAt: { type: Date, default: Date.now }
  });
  
export const Product = mongoose.model("Product", productSchema);
  