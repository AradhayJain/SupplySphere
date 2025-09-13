import express from "express";
import { 
  createOrder, 
  getMyOrders, 
  getOrderById, 
  updateOrderStatus, 
  updatePaymentStatus,
  getAllOrders,
  getSellerOrders
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getManProductsById } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/retailer",protect,getSellerOrders)
router.get("/manufacturer",protect,getManProductsById)
router.route("/myorders").get(protect, getMyOrders);  // Get logged-in user's orders
router.route("/get",protect,getAllOrders)
router.route("/").post(protect, createOrder);         // Create order
// routes/orderRoutes.js
router.route("/:id").get(protect, getOrderById);      // Get single order
router.route("/:id/status").put(protect, updateOrderStatus);  // Update order status
router.route("/:id/pay").put(protect, updatePaymentStatus);




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
