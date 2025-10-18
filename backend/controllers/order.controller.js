import asyncHandler from "express-async-handler";
import { Order } from "../models/order.model.js";
import {User} from "../models/user.model.js"; 
import { Product } from "../models/product.model.js"; // Product model might be needed for inventory updates etc.

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { address,products, totalAmount, discountApplied, paymentMethod, deliveryMethod } = req.body;

  if (!products || products.length === 0) {
    res.status(400);
    throw new Error("No products in order");
  }
  

  // Assuming all products in one order come from the same seller for simplicity
  // A more complex system might group items by seller in the cart itself
  const productRecord = await Product.findById(products[0].productId);
  if (!productRecord) {
      res.status(404);
      throw new Error(`Product with ID ${products[0].productId} not found`);
  }
  const sellerId = productRecord.sellerId; // Assuming sellerId is a field in your Product model

  const order = new Order({
    buyerId: req.user._id,
    sellerId: sellerId,
    products,
    totalAmount,
    discountApplied,
    paymentMethod,
    deliveryMethod
  });

  const createdOrder = await order.save();
  
  // Optional: Clear user's cart after order creation
  const user = await User.findById(req.user._id);
  user.Address = address || user.Address; // Update address if provided
  await user.save();
  res.status(201).json(createdOrder);
});

// @desc    Get logged-in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ sellerId: req.user._id })
  .populate("buyerId","name email")
  .populate("products.productId", "name price");

  console.log(orders)
  console.log(orders)
  res.json(orders);
});

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("buyerId", "name email")
    .populate("products.productId", "name price");

  if (order && (order.buyerId._id.toString() === req.user._id.toString() /* || req.user.isAdmin */)) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found or not authorized");
  }
});

// @desc    Update order status (for seller/admin)
// @route   PUT /api/orders/:id/status
// @access  Private (seller/admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  
  // Authorization check: ensure the user is the seller or an admin
  // if(order.sellerId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
  //    res.status(401);
  //    throw new Error("Not authorized to update this order");
  // }

  order.status = status || order.status;
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc    Update payment status
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentStatus } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  
  // Authorization check: ensure the user is the buyer or an admin
  // if(order.buyerId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
  //    res.status(401);
  //    throw new Error("Not authorized to update payment");
  // }

  order.paymentStatus = paymentStatus || order.paymentStatus;
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

/**
 * @desc Get all orders (Admin only)
 * @route GET /api/orders
 * @access Private/Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
    // if(!req.user.isAdmin) {
    //     res.status(401);
    //     throw new Error("Not authorized as an admin");
    // }
  const orders = await Order.find()
    .populate("buyerId", "name email")
    .populate("sellerId", "name email");
  res.json(orders);
});

// @desc    Get orders received by logged-in seller
// @route   GET /api/orders/seller
// @access  Private (seller/retailer/manufacturer)
export const getSellerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ sellerId: req.user._id })
    .populate("buyerId", "name email")
    .populate("products.productId", "name category price");

  res.json(orders);
});

