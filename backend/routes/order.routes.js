import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/order.controller.js";

import { protect, admin , sellerOrAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
// Create new order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/my", protect, getMyOrders);

// Get all orders (Admin only)
router.get("/", protect, admin, getAllOrders);

// Get order by ID
router.get("/:id", protect, getOrderById);

// Cancel an order
router.put("/:id/cancel", protect, cancelOrder);

// Update order status (Seller/Admin)
router.put("/:id/status", protect, sellerOrAdmin, updateOrderStatus);

export default router;
