import express from "express";
import {
  createDeliveryAddress,
  getUserProfile,
  loginUser,
  logoutUser,
  signUp,
  updateProfile,
} from "../Controller/Auth.controller.js";

const router = express.Router();

// POST route for user sign-up
router.post("/signup", signUp);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.post("/logout", logoutUser);
router.put("/update-profile", updateProfile);
router.post("/delivery-address", createDeliveryAddress);

export default router;
