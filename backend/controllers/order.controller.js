import asyncHandler from "express-async-handler";
import {Order} from "../models/order.model.js";
import { User } from "../models/user.model.js";

/**
 * @desc Create new order
 * @route POST /api/orders
 * @access Private (Customer/Retailer)
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { sellerId, products, totalAmount, discountApplied, paymentMethod, deliveryMethod } = req.body;

  if (!products || products.length === 0) {
    res.status(400);
    throw new Error("No products provided in the order");
  }

  const order = new Order({
    buyerId: req.user._id,
    sellerId,
    products,
    totalAmount,
    discountApplied,
    paymentMethod,
    deliveryMethod,
    orderNumber: "ORD-" + Date.now() // simple unique order number
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

/**
 * @desc Get logged-in user's orders
 * @route GET /api/orders/my
 * @access Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ buyerId: req.user._id })
    .populate("products.productId", "name price")
    .populate("sellerId", "name email");
  res.json(orders);
});

/**
 * @desc Get single order by ID
 * @route GET /api/orders/:id
 * @access Private
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("products.productId", "name price")
    .populate("buyerId", "name email")
    .populate("sellerId", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc Cancel order
 * @route PUT /api/orders/:id/cancel
 * @access Private (Buyer only)
 */
export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.buyerId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to cancel this order");
  }

  if (order.status === "shipped" || order.status === "delivered") {
    res.status(400);
    throw new Error("Order cannot be cancelled at this stage");
  }

  order.status = "cancelled";
  await order.save();

  res.json({ message: "Order cancelled successfully" });
});

/**
 * @desc Update order status (seller/admin)
 * @route PUT /api/orders/:id/status
 * @access Private (Seller/Admin)
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, paymentStatus } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Seller check
  if (order.sellerId.toString() !== req.user._id.toString() && req.user.Role !== "Admin") {
    res.status(401);
    throw new Error("Not authorized to update this order");
  }

  if (status) order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;

  await order.save();
  res.json(order);
});

/**
 * @desc Get all orders (Admin only)
 * @route GET /api/orders
 * @access Private/Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("buyerId", "name email")
    .populate("sellerId", "name email");
  res.json(orders);
});
