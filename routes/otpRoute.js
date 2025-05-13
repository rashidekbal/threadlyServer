import express from "express";
import { sendOtp, verifyOtp } from "../Controllers/SendOtpController.js";
import ifUserExistsMobile from "../middlewares/userExistance.js";

import connection from "../db/connection.js";
let router = express.Router();
router.post("/generateOtpMobile", ifUserExistsMobile, (req, res) => {
  sendOtp(req, res);
});
router.post("/resendOtpMobile", ifUserExistsMobile, async (req, res) => {
  let phone = req.body.nameValuePairs.phone;
  let response = await new Promise((resolve, reject) => {
    connection.query(
      `delete from otpmodel where phone ='${phone}'`,
      (err, result) => {
        if (!err) resolve(result);
        else reject("error deleting otp");
      }
    );
  });
  sendOtp(req, res);
});
router.post("/verifyOtpMobile", verifyOtp);

export default router;
