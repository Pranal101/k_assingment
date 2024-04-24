import express, { Router } from "express";
import { forgotPassword, loginUser, logout, registerUser, resetpassword, updatePassword, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/logout",logout)    
router.post("/password/forgot",forgotPassword)
router.put("/password/reset/:token",resetpassword)
router.put("/password/update",updatePassword);
router.put("/me/update",updateProfile);

export default router;