import express from "express";
import { loginUser, signUp } from "../Controller/Auth.controller.js";

const router = express.Router();

// POST route for user sign-up
router.post("/signup", signUp);
router.post("/login", loginUser);

export default router;
