import express from "express";
import { 
  createOrder, 
  getMyOrders, 
  getOrderById, 
  updateOrderStatus, 
  updatePaymentStatus,
  getAllOrders
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);         // Create order
router.route("/myorders").get(protect, getMyOrders);  // Get logged-in user's orders
router.route("/:id").get(protect, getOrderById);      // Get single order
router.route("/:id/status").put(protect, updateOrderStatus);  // Update order status
router.route("/:id/pay").put(protect, updatePaymentStatus);
router.route("/get",protect,getAllOrders)


export default router;
