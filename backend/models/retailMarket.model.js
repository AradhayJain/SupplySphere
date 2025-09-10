import mongoose from "mongoose";

const retailMarketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    establishedDate: { type: Date },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
export const RetailMarket = mongoose.model("RetailMarket", retailMarketSchema);
