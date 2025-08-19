import mongoose from "mongoose";

const retailerDiscountSchema = new mongoose.Schema({
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // seller providing the discount
  
  retailerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // retailer receiving benefits

  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  }, // product for which discount applies

  discountType: { 
    type: String, 
    enum: ["percentage", "flat"], 
    required: true 
  }, 

  discountValue: { 
    type: Number, 
    required: true 
  }, // discount amount or percentage

  creditLimit: { 
    type: Number, 
    default: 0 
  },

  dueDays: { 
    type: Number, 
    default: 30 
  }, // payment due period in days
  
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("RetailerDiscount", retailerDiscountSchema);
