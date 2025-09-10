import { RetailMarket } from "../models/retailMarket.model.js";
import asyncHandler from 'express-async-handler';
import { Product } from "../models/product.model.js";

export const createRetailMarket = asyncHandler(async (req, res) => {
    const { name, location,description } = req.body;
    const owner = req.user._id; // Assuming req.user is set by auth middleware
    const newMarket = new RetailMarket({
        name,
        location,
        description,
        establishedDate: new Date(),
        owner
    });
    const createdMarket = await newMarket.save();
    res.status(201).json(createdMarket);
});

export const getRetailMarkets = asyncHandler(async (req, res) => {
    const markets = await RetailMarket.find().populate('owner', 'companyName email PhoneNumber');
    res.json(markets);
});


// @desc    Add a product (Retailer only)
// @route   POST /api/products/retailer
// @access  Private (Retailer)
export const addProductRetailer = asyncHandler(async (req, res) => {
  try {
    const { name, category, description, price, minOrderQty, pricingTiers, stock, isExclusive } = req.body;
    
    const sellerId = req.user._id; // Assume req.user is set by auth middleware

    if (!sellerId || !name || !price || !stock) {
      res.status(400);
      throw new Error("Seller ID, name, price, and stock are required.");
    }

    // Handle image upload
    let imageUrls = [];
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (result) imageUrls.push(result.secure_url);
    }

    // Parse pricingTiers if sent as JSON string
    let parsedPricingTiers = [];
    if (pricingTiers) {
      try {
        parsedPricingTiers = JSON.parse(pricingTiers);
      } catch (err) {
        console.warn("⚠️ Invalid JSON for pricingTiers:", pricingTiers);
        parsedPricingTiers = [];
      }
    }

    const product = new Product({
      sellerId,
      name,
      category,
      description,
      images: imageUrls,
      price,
      minOrderQty: minOrderQty || 1,
      pricingTiers: parsedPricingTiers,
      stock,
      isExclusive: isExclusive === "true" || isExclusive === true,
    });

    const createdProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "✅ Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.error("Retailer Add Product error:", error);
    res.status(500).json({ success: false, message: "Error adding product" });
  }
});


