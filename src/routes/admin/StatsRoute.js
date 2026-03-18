import {Router}from "express";
import verifyToken from "../../middlewares/authorization.js";
import checkAdminAccess from "../../middlewares/AdminAccessCheckMiddleWare.js";
import {statsController } from "../../Controllers/admin/StatsController.js";

const router=Router();
router.route("/").get(verifyToken,checkAdminAccess,statsController);
export default router;