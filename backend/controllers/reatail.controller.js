import { RetailMarket } from "../models/retailMarket.model.js";
import asyncHandler from 'express-async-handler';
import RetailerProduct from "../models/retailProducts.mode.js";

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
    const { marketId, name, category, description, purchasePrice, sellingPrice, stock, visibility } = req.body;
    const retailerId = req.user._id; // set by auth middleware

    // ✅ Validate required fields
    if (!retailerId || !marketId || !name || !purchasePrice || !sellingPrice || !stock) {
      res.status(400);
      throw new Error("Retailer ID, marketId, name, purchasePrice, sellingPrice, and stock are required.");
    }

    // ✅ Handle image upload
    let imageUrls = [];
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (result) imageUrls.push(result.secure_url);
    }

    // ✅ Create product
    const product = new RetailerProduct({
      retailerId,
      marketId,
      name,
      category,
      description,
      purchasePrice,
      sellingPrice,
      stock,
      visibility: visibility === "false" ? false : true, // ensure boolean
      images: imageUrls,
    });

    const createdProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "✅ Retailer product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.error("Retailer Add Product error:", error);
    res.status(500).json({ success: false, message: "Error adding product" });
  }
});

export const getRetailerProducts = asyncHandler(async (req, res) => {
    const retailerId = req.user._id; // set by auth middleware
    const products = await RetailerProduct.find({ retailerId }).populate('marketId', 'name location');
    res.json(products);
});

export const getProductsByMarket = asyncHandler(async (req, res) => {
  try {
    const { marketId } = req.query;

    if (!marketId) {
      res.status(400);
      throw new Error("Market ID is required.");
    }

    const products = await RetailerProduct.find({ marketId }).populate("retailerId", "companyName email");

    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products by Market error:", error);
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
});