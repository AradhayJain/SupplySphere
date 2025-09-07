import express from 'express';
const router = express.Router();
import { getProducts, getProductById, createProductReview } from '../controllers/product.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

// @desc    Fetch all products
// @route   GET /api/products
router.route('/').get(getProducts);

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
router.route('/:id').get(getProductById);

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
