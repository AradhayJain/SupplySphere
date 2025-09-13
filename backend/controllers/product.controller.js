import asyncHandler from 'express-async-handler';
import {Product} from '../models/product.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';

// @desc    Fetch all products with search and pagination
// @route   GET /api/products
// @access  Public


export const getProductsManufacturer = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("sellerId", "companyName name email"); 
    // 👆 Assuming your Product schema has: user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

  res.json({
    products
  });
});


// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).polygonate("sellerId", "companyName name email");

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export const getManProductsById = asyncHandler(async (req, res) => {
  const ids = req.user._id;
  const products = await Product.find({ sellerId: ids });
  if (products) {
      res.json(products);
  }
  else {
      res.status(404);
      throw new Error('Products not found');
  }
});

// @desc    Create a new product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });

    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});




// ----------------------
// Add Product Controller
// ----------------------
export const addProduct = asyncHandler(async (req, res) => {
  try {
    const {
      role,
      sellerId,
      name,
      category,
      description,
      price,
      minOrderQty,
      pricingTiers,
      stock,
      dynamicPricing,
      isExclusive,
      exclusiveRetailer,
    } = req.body;

    if (!sellerId || !name || !price || !stock) {
      res.status(400);
      throw new Error("Seller ID, name, price, and stock are required.");
    }

    let imageUrls = null;
    if (req.file) {
      console.log(req.file.path)
      const result = await uploadOnCloudinary(req.file.path);
      if (result) imageUrls=result.secure_url;
    }
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
      role:role,
      sellerId,
      name,
      category,
      description,
      images: imageUrls,
      price,
      minOrderQty: minOrderQty || 1,
      pricingTiers: parsedPricingTiers,
      stock,
      dynamicPricing: dynamicPricing === "true",
      isExclusive: isExclusive === "true",
      exclusiveRetailer: isExclusive === "true" ? exclusiveRetailer : "",
    });

    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      message: "✅ Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ success: false, message: "Error adding product" });
  }
});

// ----------------------
// Update Product Controller
// ----------------------
export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // productId
    const updates = req.body;

    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Handle image replacement if a new file is uploaded
    if (req.file) {
      // Delete old images if they exist
      if (product.images && product.images.length > 0) {
        for (const oldUrl of product.images) {
          await deleteFromCloudinary(oldUrl);
        }
      }

      // Upload new image
      const result = await uploadOnCloudinary(req.file.path);
      if (result) {
        updates.images = [result.secure_url];
      }
    }

    // If client sent pricingTiers as JSON string → parse it
    if (updates.pricingTiers && typeof updates.pricingTiers === "string") {
      updates.pricingTiers = JSON.parse(updates.pricingTiers);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "✅ Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
});



export {  getProductById, createProductReview };
