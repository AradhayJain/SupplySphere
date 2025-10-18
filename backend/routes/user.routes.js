import express from "express"
import { 
    registerUser,
    loginUser,
    allUsers,
    googleAuth,
    forgotPassword,
    resetPassword, 
    registerRequestOtp,
    registerVerifyOtp,
    getUserProfile,
    updateUserProfile,
    changePassword,
    assignRole
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// --- Registration, Login, and Search ---
router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/", protect, allUsers);

// --- Google OAuth ---
router.post("/google-login", googleAuth);
router.post("/assign-role", assignRole);

// --- Password Reset ---
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resettoken", resetPassword);
router.post("/register-verify-otp", registerVerifyOtp);
router.post("/register-request-otp", upload.single("pic"), registerRequestOtp);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect,updateUserProfile);
router.put("/change-password", protect, changePassword);



export default router;
