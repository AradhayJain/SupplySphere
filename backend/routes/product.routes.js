import express from 'express';
const router = express.Router();
import { getProductsManufacturer, getProductById, createProductReview, addProduct } from '../controllers/product.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

// @desc    Fetch all products
// @route   GET /api/products
router.route('/').get(getProductsManufacturer);

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
router.route('/:id').get(getProductById);

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
router.route('/:id/reviews').post(protect, createProductReview);

router.route('/add').post(protect,upload.single('images'),addProduct);

export default router;
