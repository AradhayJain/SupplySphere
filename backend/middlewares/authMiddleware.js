import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";

// --- Protect Route (Require login) ---
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Attach user to request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found, authorization denied");
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// --- Admin Middleware ---
export const admin = (req, res, next) => {
  if (req.user && req.user.Role === "Admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as admin");
  }
};

// --- Seller/Manufacturer Middleware (optional) ---
export const sellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.Role === "Manufacturer" || req.user.Role === "Retailer" || req.user.Role === "Admin")) {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as seller or admin");
  }
};
