import express from "express";
import { signUp } from "../Controller/Auth.controller.js";

const router = express.Router();

// POST route for user sign-up
router.post("/signup", signUp);

export default router;
