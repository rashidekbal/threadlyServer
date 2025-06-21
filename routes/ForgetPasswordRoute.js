import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import { resetPasswordMobileContorler } from "../Controllers/ForgetPasswordController.js";

let router = Router();

router.post("/Mobile", verifyToken, resetPasswordMobileContorler);
export default router;
