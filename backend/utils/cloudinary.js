import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// --- Configuration (Should be at the top level of your app) ---
// Make sure you have this configured somewhere before you call these utils
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });


// --- UPLOAD FUNCTION (You already have this) ---
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Let Cloudinary detect the file type
      folder: "supply_sphere", // Optional: specify a folder in your Cloudinary account
      use_filename: true,
      unique_filename: false
    });

    fs.unlinkSync(localFilePath);
    return response; // Return the full response object
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

// --- DELETE FUNCTION (Add this part) ---
export const deleteFromCloudinary = async (cloudinaryUrl) => {
  try {
    if (!cloudinaryUrl) return null;

    // Example Cloudinary URL:
    // https://res.cloudinary.com/<cloud_name>/image/upload/v1698765432/supply_sphere/sample.jpg

    // Extract the part after `/upload/` and remove version number & extension
    const parts = cloudinaryUrl.split("/");
    // Remove domain + upload + version
    const publicIdWithExtension = parts.slice(parts.indexOf("upload") + 2).join("/");
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // remove extension (.jpg, .png, etc.)

    // Now we have: supply_sphere/sample
    const result = await cloudinary.uploader.destroy(publicId);

    console.log("✅ Cloudinary deletion result:", result);
    return result;
  } catch (error) {
    console.error("❌ Error deleting from Cloudinary:", error);
    return null;
  }
};


// --- EXPORTS (Update your exports) ---
export default uploadOnCloudinary;