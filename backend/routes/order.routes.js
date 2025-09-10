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
// routes/orderRoutes.js



// Get orders for a manufacturer (sellerId = logged in manufacturer)
router.get("/manufacturer/orders",protect, async (req, res) => {
  try {
    const manufacturerId = req.user._id; // from auth middleware

    const orders = await Order.find({ sellerId: manufacturerId })
      .populate("buyerId", "companyName email") // so you can show buyer name
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales history" });
  }
});




export default router;
