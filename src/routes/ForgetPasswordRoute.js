import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  resetPasswordEmailContorler,
  resetPasswordMobileContorler,
} from "../Controllers/ForgetPasswordController.js";
import verifyOtpSignedToken from "../middlewares/verify-otp-validated-token.js";

let router = Router();

router.post("/Mobile", verifyOtpSignedToken, resetPasswordMobileContorler);
router.post("/Email", verifyOtpSignedToken, resetPasswordEmailContorler);
export default router;
