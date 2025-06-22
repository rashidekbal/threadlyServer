import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  resetPasswordEmailContorler,
  resetPasswordMobileContorler,
} from "../Controllers/ForgetPasswordController.js";

let router = Router();

router.post("/Mobile", verifyToken, resetPasswordMobileContorler);
router.post("/Email", verifyToken, resetPasswordEmailContorler);
export default router;
