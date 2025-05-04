import express from "express";
import { sendOtp, verifyOtp } from "../utils/SendOtp.js";
import { clearotp, ifUserExistsMobile } from "../utils/MiddleWares.js";
let router = express.Router();
router.post("/generateOtpMobile", ifUserExistsMobile, (req, res) => {
  sendOtp(req, res);
});
router.post("/resendOtpMobile", clearotp, (req, res) => {
  sendOtp(req, res);
});
router.post("/verifyOtpMobile", verifyOtp);

export default router;
