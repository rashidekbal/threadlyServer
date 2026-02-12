import { Router } from "express";
import { LoginController } from "../../Controllers/admin/Admin.Auth.controller.js";
const router = Router();
router.route("/login").post(LoginController);
export default router;
