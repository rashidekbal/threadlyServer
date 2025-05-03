import express from "express";
import { sendOtp, verifyOtp } from "../utils/SendOtp.js";
let router = express.Router();
router.post("/generateOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
export default router;
