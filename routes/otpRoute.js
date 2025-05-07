import express from "express";
import { sendOtp, verifyOtp } from "../utils/SendOtp.js";
import ifUserExistsMobile from "../middlewares/userExistance.js";

import connection from "../db/connection.js";
let router = express.Router();
router.post("/generateOtpMobile", ifUserExistsMobile, (req, res) => {
  sendOtp(req, res);
});
router.post("/resendOtpMobile", ifUserExistsMobile, (req, res) => {
  let phone = req.body.nameValuePairs.phone;
  connection.query(
    `delete from otpmodel where phone ='${phone}'`,
    (err, result) => {}
  );
  sendOtp(req, res);
});
router.post("/verifyOtpMobile", verifyOtp);

export default router;
