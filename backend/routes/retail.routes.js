import express from "express"
import { createRetailMarket, getRetailMarkets } from "../controllers/reatail.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createRetailMarket); // Create a new retail market
router.get("/",protect,getRetailMarkets);
export default router;
