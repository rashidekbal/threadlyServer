import express from "express";
import { sendOtp, verifyOtp } from "../utils/SendOtp.js";
import ifUserExistsMobile from "../middlewares/userExistance.js";
import clearotp from "../middlewares/clearOtp.js";
let router = express.Router();
router.post("/generateOtpMobile", ifUserExistsMobile, (req, res) => {
  sendOtp(req, res);
});
router.post("/resendOtpMobile", clearotp, (req, res) => {
  sendOtp(req, res);
});
router.post("/verifyOtpMobile", verifyOtp);

export default router;
