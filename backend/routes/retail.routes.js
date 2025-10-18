import express from "express"
import { addProductRetailer, createRetailMarket, getAllMarkets, getProductsByMarket, getRetailBought, getRetailerProducts, getRetailMarkets } from "../controllers/reatail.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createRetailMarket); // Create a new retail market
router.get("/",protect,getRetailMarkets);
router.post("/add", protect, addProductRetailer); // Add product (Retailer only)
router.get("/:id", protect, getRetailerProducts); // Get products (Retailer only)
router.get("/products", protect, getProductsByMarket); // Get products by retailer ID (Retailer only)
router.get('/markets/all',protect,getAllMarkets);
router.get("/products/bought",protect,getRetailBought);
export default router;
