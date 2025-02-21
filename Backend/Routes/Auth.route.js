import express from "express";
import {
  getUserProfile,
  loginUser,
  signUp,
} from "../Controller/Auth.controller.js";

const router = express.Router();

// POST route for user sign-up
router.post("/signup", signUp);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);

export default router;
