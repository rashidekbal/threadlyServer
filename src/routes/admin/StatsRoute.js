import {Router}from "express";

import checkAdminAccess from "../../middlewares/AdminAccessCheckMiddleWare.js";
import {statsController } from "../../Controllers/admin/StatsController.js";
import adminAuthorizationVerification from "../../middlewares/adminAuthorizationMiddleWare.js";

const router=Router();
router.route("/").get(adminAuthorizationVerification,checkAdminAccess,statsController);
export default router;