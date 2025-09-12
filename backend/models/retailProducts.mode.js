import mongoose from "mongoose";

const retailerProductSchema = new mongoose.Schema(
  {
    retailerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or "Retailer" model
      required: true,
    },
    marketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RetailMarket", // or "Retailer" model
        required: false,
    },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, trim: true },

    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },

    visibility: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },

    images: [{ type: String }],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const RetailerProduct = mongoose.model(
  "RetailerProduct",
  retailerProductSchema
);

export default RetailerProduct;
