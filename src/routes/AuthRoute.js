import {Router} from "express";
import verifyToken from "../middlewares/authorization.js";
import { ResetPasswordController } from "../Controllers/authController.js";
const router=Router();
router.route("/resetPassword").post(verifyToken,ResetPasswordController);
export default router;